Live Server (Yasiru)

A simple yet powerful VS Code extension for launching a local development server with live reload capability for static and dynamic pages.

Features

HTTP/HTTPS Server – Launch a local server for your project.

Live Reload – Automatically reloads your browser when you save files.

CORS Support – Option to enable or disable Cross-Origin Resource Sharing.

Proxy Support – Proxy API requests to another server.

Customizable – Configure port, root directory, browser, and more.

File Watching with Ignores – Exclude specific files/folders from triggering reload.

Status Bar Control – Easily start and stop the server via the VS Code status bar.

Context Menu Integration – Right-click on an HTML file to open with Live Server.

Keyboard Shortcuts – Start/stop the server instantly from the keyboard.

Installation
1. From VS Code Marketplace (Recommended)

Open VS Code.

Go to the Extensions view (Ctrl+Shift+X).

Search for Live Server (Yasiru).

Click Install.

2. From a .vsix File

If you have a packaged file (e.g. yasiru-0.0.1.vsix):

Open VS Code.

Go to Extensions view (Ctrl+Shift+X).

Click … (More Actions) → Install from VSIX...

Select the .vsix file.

Usage

You can start and stop the server using any of these methods:

▶️ Start the Server

Keyboard Shortcut:

Windows/Linux: Ctrl+Shift+L Ctrl+Shift+O

macOS: Cmd+Shift+L Cmd+Shift+O

Status Bar: Click $(rocket) Go Live.

Command Palette: Ctrl+Shift+P → “Live Server: Start”.

Context Menu: Right-click an HTML file → Open with Live Server.

⏹ Stop the Server

Keyboard Shortcut:

Windows/Linux: Ctrl+Shift+L Ctrl+Shift+C

macOS: Cmd+Shift+L Cmd+Shift+C

Status Bar: Click the port indicator (e.g. $(debug-pause) Stop Live (Port: 5500)).

Command Palette: Ctrl+Shift+P → “Live Server: Stop”.

Configuration

Customize settings in your VS Code settings.json file.

Setting	Description	Default
liveServer.port	The port number for the server.	5500
liveServer.browser	Custom browser path to open.	"" (uses default)
liveServer.root	Root directory to serve from (relative to workspace).	/
liveServer.https	Enable HTTPS.	false
liveServer.cors	Enable CORS.	true
liveServer.proxy	Proxy rules (e.g., {"/api": "http://localhost:3000"}).	{}
liveServer.ignoreFiles	Files/folders to ignore for reload.	[".git", ".vscode", "node_modules"]
Development & Contribution

If you'd like to contribute or modify this project:

🧩 Development Setup
git clone https://github.com/your-username/yasiru.git
cd yasiru
npm install

🔧 Scripts
Command	Description
npm run compile	Compiles TypeScript using webpack.
npm run watch	Watches for file changes and recompiles.
npm run test	Runs the test suite.
npm run lint	Lints source files with ESLint.
npm run package	Packages the extension into a .vsix file.
▶️ Run in Development Mode

Run the watcher:

npm run watch


In VS Code, open Run and Debug (Ctrl+Shift+D).

Choose Run Extension and press F5.

📦 Package to VSIX
npm run package


Generates a file like yasiru-x.x.x.vsix for installation or publishing.
For publishing, install vsce globally:

npm install -g @vscode/vsce

Security Notice

This extension is designed for local development only.
Be cautious when enabling features like CORS or proxy, as they may expose security risks in production.
Review your configuration and contributions are welcome to improve security.

Release Notes
0.0.1

Initial release featuring:

Local HTTP/HTTPS server

Live reload support

CORS and proxy configuration

Keyboard shortcuts for quick control

License

This project is licensed under the MIT License.
See the LICENSE.md
 file for details.

Enjoy coding with instant live reload! 🚀