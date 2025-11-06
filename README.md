# Live Server Extension

[![Version](https://img.shields.io/badge/version-0.0.2-blue.svg)](https://marketplace.visualstudio.com/items?itemName=yasiru.live-server)
[![Installs](https://img.shields.io/badge/installs-growing-success)](https://marketplace.visualstudio.com/items?itemName=yasiru.live-server)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE.md)

A powerful VS Code extension that launches a development server with live reload capability for web development. Edit your HTML, CSS, or JavaScript files, and see the changes instantly in your browser without manual refresh.

## ✨ Features

- **🚀 Instant Live Reload**: Changes reflect immediately in the browser
- **🔒 HTTPS Support**: Optional secure server with HTTPS
- **🔄 Multiple Port Support**: Auto-retries different ports if default is occupied
- **🌐 CORS Support**: Configurable Cross-Origin Resource Sharing
- **🔀 Proxy Configuration**: Route API requests to different servers
- **📁 Custom Root Directory**: Serve from any project subfolder
- **🎯 Smart File Watching**: Excludes unnecessary files/folders
- **🖥️ Multi-Browser Support**: Use your preferred browser
- **📊 Status Bar Integration**: Quick access to server controls
- **⚡ Live Share Support**: Collaborate with VS Code Live Share
- **🛡️ Secure by Default**: Local-only server with configurable options

## 📋 Requirements

- Visual Studio Code 1.105.0
- A modern web browser
- No additional dependencies needed for basic usage

## 🚀 Installation

### Manual Installation
1. Download the VSIX file: [live-server-0.0.2.vsix](https://github.com/yasirunadeesha/Live-Server-vscode-extension/releases/latest)
2. In VS Code: `Ctrl+Shift+X` → `...` → `Install from VSIX...`
3. Select the downloaded file

You can also clone and build from source:
```bash
git clone https://github.com/yasirunadeesha/Live-Server-vscode-extension.git
cd Live-Server-vscode-extension
npm install
npm run compile
```

## 🎮 How to Use

### Starting the Server

Choose any method:
- **Keyboard**: `Ctrl+Shift+L Ctrl+Shift+O` (macOS: `Cmd+Shift+L Cmd+Shift+O`)
- **Status Bar**: Click `$(rocket) Go Live`
- **Command Palette**: `Ctrl+Shift+P` → "Live Server: Start"
- **Context Menu**: Right-click HTML file → "Open with Live Server"

### Stopping the Server

Choose any method:
- **Keyboard**: `Ctrl+Shift+L Ctrl+Shift+C` (macOS: `Cmd+Shift+L Cmd+Shift+C`)
- **Status Bar**: Click `$(debug-pause) Stop Live (Port: XXXX)`
- **Command Palette**: `Ctrl+Shift+P` → "Live Server: Stop"

## ⚙️ Configuration

Configure in VS Code settings (`settings.json`):

```jsonc
{
  "liveServer.port": 5500,        // Server port (default: 5500)
  "liveServer.browser": "",       // Browser path (empty = system default)
  "liveServer.root": "/",        // Root directory to serve
  "liveServer.https": false,     // Enable HTTPS
  "liveServer.cors": true,       // Enable CORS
  "liveServer.proxy": {          // Proxy configuration
    "/api": "http://localhost:3000"
  },
  "liveServer.ignoreFiles": [    // Files to ignore
    ".git",
    ".vscode",
    "node_modules"
  ]
}
```

### Advanced Settings

#### HTTPS Configuration
For HTTPS, place your certificates in:
- Key: `certificates/key.pem`
- Cert: `certificates/cert.pem`

#### Proxy Rules
Example proxy configuration:
```jsonc
{
  "liveServer.proxy": {
    "/api": "http://localhost:3000",
    "/auth": "https://auth-server.com"
  }
}
```

## 🔍 Troubleshooting

### Port Already in Use
The extension automatically tries up to 10 alternative ports if the default port (5500) is occupied.

### Browser Not Opening
1. Check `liveServer.browser` setting
2. Ensure you have a default browser set
3. Try specifying full browser path

### Live Reload Not Working
1. Ensure WebSocket connection is not blocked
2. Check if file is in `ignoreFiles` list
3. Verify file has correct permissions

## 🛠️ Development

### Building from Source
```bash
git clone https://github.com/yasirunadeesha/Live-Server-vscode-extension.git
cd Live-Server-vscode-extension
npm install
npm run compile
```

### Development Commands
- `npm run compile`: Build the extension
- `npm run watch`: Watch for changes
- `npm run package`: Create VSIX package
- `npm run lint`: Run ESLint
- `npm test`: Run tests

### Creating VSIX Package
```bash
npm install -g @vscode/vsce
vsce package
```

## 📝 Release Notes

### 0.0.2 (2025-10-31)
- Changed keyboard shortcuts for better compatibility
- Added port auto-retry feature
- Improved status bar display with port number
- Added VS Code Live Share support
- Added update notifications

### 0.0.1 (2025-10-30)
- Initial release
- Basic live server functionality
- Live reload capability
- HTTPS/CORS support
- Proxy configuration
- File watching

## 📜 License

This extension is licensed under the [MIT License](LICENSE.md).

## 🔗 Links

- [GitHub Repository](https://github.com/yasirunadeesha/Live-Server-vscode-extension)
- [Changelog](CHANGELOG.md)
- [Issues](https://github.com/yasirunadeesha/Live-Server-vscode-extension/issues)
- [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=yasiru.live-server)
- [Download Latest Release](https://github.com/yasirunadeesha/Live-Server-vscode-extension/releases/latest)

## ⚠️ Security Notes

- This extension is designed for development purposes only
- CORS and proxy features should be used cautiously
- HTTPS certificates should be properly managed
- Default settings prioritize security

## 👥 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 💖 Support

If you find this extension helpful, please:
- Star the repository
- Leave a review on the marketplace
- Report issues or suggest features

---

Made with ❤️ by Yasiru

**Enjoy!**  
