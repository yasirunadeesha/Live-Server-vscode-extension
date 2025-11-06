import * as vscode from 'vscode';
import express from 'express';
import * as http from 'http';
import * as https from 'https';
import * as ws from 'ws';
import * as path from 'path';
import * as chokidar from 'chokidar';
import * as fs from 'fs';
import cors from 'cors';
import httpProxy from 'http-proxy';

let server: http.Server | https.Server | null = null;
let wss: ws.Server | null = null;
let watcher: chokidar.FSWatcher | null = null;
let statusBarItem: vscode.StatusBarItem;
let runningPort: number | null = null;
let runningRoot: string | null = null;
let runningHttps: boolean = false;

// Update status bar item based on workspace state
async function updateStatusBarVisibility() {
    if (!statusBarItem) {
        return;
    }

    const hasHtmlFiles = await checkWorkspaceForHtmlFiles();
    if (hasHtmlFiles || server) {
        statusBarItem.show();
    } else {
        statusBarItem.hide();
    }
}

// Check if workspace has any HTML files
async function checkWorkspaceForHtmlFiles(): Promise<boolean> {
    if (!vscode.workspace.workspaceFolders) {
        return false;
    }

    const htmlFiles = await vscode.workspace.findFiles('**/*.{html,htm}', '**/node_modules/**');
    return htmlFiles.length > 0;
}

interface ServerConfig {
    port: number;
    browser: string;
    root: string;
    https: boolean;
    cors: boolean;
    proxy: { [key: string]: string };
    ignoreFiles: string[];
}

function getConfig(): ServerConfig {
    const config = vscode.workspace.getConfiguration('liveServer');
    return {
        port: config.get('port') || 5500,
        browser: config.get('browser') || '',
        root: config.get('root') || '/',
        https: config.get('https') || false,
        cors: config.get('cors') || true,
        proxy: config.get('proxy') || {},
        ignoreFiles: config.get('ignoreFiles') || ['.git', '.vscode', 'node_modules']
    };
}

export function activate(context: vscode.ExtensionContext) {
    const startCmd = vscode.commands.registerCommand('liveServer.start', (resource: vscode.Uri) => {
        startServer(resource);
    });
    const stopCmd = vscode.commands.registerCommand('liveServer.stop', stopServer);

    // Create status bar item that will be visible at all times
    statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBarItem.text = `$(rocket) Go Live`;
    statusBarItem.tooltip = 'Click to Open with Live Server';
    statusBarItem.command = 'liveServer.start';
    
    // Show status bar item immediately and update its visibility
    updateStatusBarVisibility();
    
    // Keep status bar visible when workspace contains HTML files
    const fileWatcher = vscode.workspace.createFileSystemWatcher('**/*.{html,htm}');
    fileWatcher.onDidCreate(() => updateStatusBarVisibility());
    fileWatcher.onDidDelete(() => updateStatusBarVisibility());
    context.subscriptions.push(fileWatcher);
    
    statusBarItem.show();

    // Show announcements or update notice when the extension activates
    try {
        showAnnouncements(context);
    } catch (err) {
        console.error('Failed to show announcements:', err);
    }

    context.subscriptions.push(startCmd, stopCmd, statusBarItem);
}

async function startServer(resource?: vscode.Uri) {
    // If server is already running, allow opening additional files/tabs
    if (server) {
        if (resource && runningPort && runningRoot) {
            try {
                const protocol = runningHttps ? 'https' : 'http';
                const relativePath = path.relative(runningRoot, resource.fsPath);
                const targetUrl = `${protocol}://localhost:${runningPort}/${relativePath}`;
                const cfg = getConfig();
                if (cfg.browser) {
                    await import('child_process').then(cp => cp.exec(`"${cfg.browser}" ${targetUrl}`));
                } else {
                    const open = (await import('open')).default;
                    await open(targetUrl);
                }
                return;
            } catch (err) {
                vscode.window.showErrorMessage('Failed to open file in browser: ' + String(err));
                return;
            }
        }
        vscode.window.showInformationMessage('Live Server is already running!');
        return;
    }

    const config = getConfig();
    const folder = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
    if (!folder) {
        vscode.window.showErrorMessage('No workspace folder found!');
        return;
    }

    const app = express();
    
    // Configure CORS if enabled
    if (config.cors) {
        app.use(cors());
    }

    // Configure root directory
    const rootDir = path.join(folder, config.root);

    // HTML injection for live reload - must run before static serving so we can modify HTML
    app.use((req, res, next) => {
        try {
            const accept = (req.headers && req.headers.accept) || '';
            // only inject into HTML requests
            if (!accept.includes('text/html')) {
                return next();
            }

            const requested = req.path === '/' ? '/index.html' : req.path;
            const filePath = path.join(rootDir, requested);
            if (fs.existsSync(filePath) && /\.html?$/.test(filePath)) {
                let content = fs.readFileSync(filePath, 'utf-8');
                const reloadScript = `\n<script>\n(function(){\n  const protocol = location.protocol === 'https:' ? 'wss' : 'ws';\n  const socket = new WebSocket(protocol + '://' + location.host);\n  socket.addEventListener('message', function(e){ if (e.data === 'reload') location.reload(); });\n})();\n</script>\n</head>`;
                // insert before closing </head> if present, otherwise append
                if (/<\/head>/i.test(content)) {
                    content = content.replace(/<\/head>/i, reloadScript);
                } else {
                    content = content + reloadScript;
                }
                res.setHeader('content-type', 'text/html');
                res.send(content);
                return;
            }
        } catch (err) {
            console.error('Error injecting reload script', err);
        }
        next();
    });

    app.use(express.static(rootDir));

    // Configure proxy if any
    const proxy = httpProxy.createProxyServer();
    Object.entries(config.proxy).forEach(([proxyPath, target]) => {
        app.use(proxyPath, (req, res) => {
            proxy.web(req, res, { target });
        });
    });

    // (single injection middleware is already registered before static serving)

    // Create server (HTTP or HTTPS)
    let srv: http.Server | https.Server;
    if (config.https) {
        const options = {
            key: fs.readFileSync(path.join(__dirname, '../certificates/key.pem')),
            cert: fs.readFileSync(path.join(__dirname, '../certificates/cert.pem'))
        };
        srv = https.createServer(options, app);
    } else {
        srv = http.createServer(app);
    }

    // Setup WebSocket server
    const wsServer = new ws.Server({ server: srv });
    wss = wsServer;

    wsServer.on('connection', socket => {
        console.log('Client connected');
    });

    // Configure file watcher
    const ignoredFiles = config.ignoreFiles.map(pattern => 
        path.join(folder, '**', pattern, '**')
    );

    watcher = chokidar.watch(folder, { 
        ignored: ignoredFiles,
        ignoreInitial: true
    });

    watcher.on('change', () => {
        wsServer.clients.forEach(client => {
            if (client.readyState === ws.OPEN) {
                client.send('reload');
            }
        });
    });

    // Start server with retry if the port is occupied
    try {
        const finalPort = await tryListenWithRetry(srv, config.port, 10);
    const protocol = config.https ? 'https' : 'http';
    const url = `${protocol}://localhost:${finalPort}`;
    // remember running server details so we can open other files without restarting
    runningPort = finalPort;
    runningRoot = rootDir;
    runningHttps = !!config.https;
        vscode.window.showInformationMessage(`Live Server running at ${url}`);
        
        if (resource && (resource.fsPath.endsWith('.html') || resource.fsPath.endsWith('.htm'))) {
            const relativePath = path.relative(rootDir, resource.fsPath);
            const targetUrl = `${url}/${relativePath}`;
            if (config.browser) {
                await import('child_process').then(cp => 
                    cp.exec(`"${config.browser}" ${targetUrl}`)
                );
            } else {
                const open = (await import('open')).default;
                await open(targetUrl);
            }
        } else {
            const open = (await import('open')).default;
            await open(url);
        }

        statusBarItem.text = `$(debug-pause) Stop Live (Port: ${finalPort})`;
        statusBarItem.command = 'liveServer.stop';

        // If Live Share extension is available, attempt to share the server (best-effort)
        try {
            const lsExt = vscode.extensions.getExtension('ms-vsliveshare.vsliveshare');
            if (lsExt) {
                if (!lsExt.isActive) {
                    await lsExt.activate();
                }
                const api: any = lsExt.exports;
                if (api && typeof api.shareServer === 'function') {
                    try {
                        await api.shareServer(finalPort);
                        vscode.window.showInformationMessage('Live Server shared via Live Share');
                    } catch (err) {
                        console.error('Live Share: shareServer failed', err);
                    }
                }
            }
        } catch (err) {
            // non-fatal
            console.error('Live Share integration check failed', err);
        }
    } catch (err: any) {
        const msg = err && err.message ? err.message : String(err);
        vscode.window.showErrorMessage(`Live Server failed to start: ${msg}`);
        console.error('Live Server start error', err);
    }

    server = srv;
}

// Try to listen on a port, retrying with incremental ports if EADDRINUSE is encountered
async function tryListenWithRetry(srv: http.Server | https.Server, startPort: number, maxAttempts = 10): Promise<number> {
    for (let i = 0; i < maxAttempts; i++) {
        const port = startPort + i;
        // wrap in promise to await listening or error
        try {
            await new Promise<void>((resolve, reject) => {
                const onError = (err: any) => {
                    srv.removeListener('listening', onListening);
                    reject(err);
                };
                const onListening = () => {
                    srv.removeListener('error', onError);
                    resolve();
                };
                srv.once('error', onError);
                srv.once('listening', onListening);
                try {
                    srv.listen(port);
                } catch (err) {
                    // synchronous error
                    srv.removeListener('error', onError);
                    srv.removeListener('listening', onListening);
                    reject(err);
                }
            });
            // success
            return (srv.address() as any).port;
        } catch (err: any) {
            // if port in use, try next
            if (err && err.code === 'EADDRINUSE') {
                // remove any listeners attached and try next port
                try { srv.removeAllListeners('error'); } catch (_) {}
                try { srv.removeAllListeners('listening'); } catch (_) {}
                // continue loop
                continue;
            }
            throw err;
        }
    }
    throw new Error('No available ports found');
}

// Announcements: show a simple update notice when extension version changes
function showAnnouncements(context: vscode.ExtensionContext) {
    try {
        const pkgPath = path.join(__dirname, '../package.json');
        if (!fs.existsSync(pkgPath)) {
            return;
        }
        const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8')) as any;
        const current = pkg.version || '';
        const last = context.globalState.get('yasiru.lastVersion');
        if (last !== current) {
            context.globalState.update('yasiru.lastVersion', current);
            const msg = pkg.displayName ? `${pkg.displayName} updated to ${current}` : `Live Server updated to ${current}`;
            const showChangelog = 'Show changelog';
            vscode.window.showInformationMessage(msg, showChangelog).then(selection => {
                if (selection === showChangelog) {
                    const changelog = path.join(__dirname, '../changelog.md');
                    if (fs.existsSync(changelog)) {
                        vscode.commands.executeCommand('markdown.showPreview', vscode.Uri.file(changelog));
                    } else {
                        vscode.commands.executeCommand('workbench.action.openWorkspace');
                    }
                }
            });
        }
    } catch (err) {
        console.error('Announcement check failed', err);
    }
}

async function stopServer() {
    if (server) {
        server.close(() => {
            vscode.window.showInformationMessage('Live Server stopped');
        });
        server = null;
    }
    runningPort = null;
    runningRoot = null;
    runningHttps = false;
    if (watcher) {
        watcher.close();
        watcher = null;
    }
    if (wss) {
        wss.clients.forEach(client => client.close());
        wss.close();
        wss = null;
    }
    statusBarItem.text = `$(rocket) Go Live`;
    statusBarItem.command = 'liveServer.start';
    updateStatusBarVisibility();
}

export function deactivate() {
    stopServer();
}