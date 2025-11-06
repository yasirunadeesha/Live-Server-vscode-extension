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

- Visual Studio Code ^1.105.0
- A modern web browser
- No additional dependencies needed for basic usage

## 🚀 Installation

### Via VS Code Marketplace
1. Open VS Code
2. Press `Ctrl+P` or `Cmd+P`
3. Type `ext install yasiru.live-server`
4. Press Enter

### Manual Installation
1. Download the VSIX file: [live-server-0.0.2.vsix](https://github.com/yasirunadeesha/Live-Server-vscode-extenson/releases/latest)
2. In VS Code: `Ctrl+Shift+X` → `...` → `Install from VSIX...`
3. Select the downloaded file

You can also clone and build from source:
```bash
git clone https://github.com/yasirunadeesha/Live-Server-vscode-extenson.git
cd Live-Server-vscode-extenson
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
git clone https://github.com/yasirunadeesha/Live-Server-vscode-extenson.git
cd Live-Server-vscode-extenson
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

- [GitHub Repository](https://github.com/yasirunadeesha/Live-Server-vscode-extenson)
- [Changelog](CHANGELOG.md)
- [Issues](https://github.com/yasirunadeesha/Live-Server-vscode-extenson/issues)
- [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=yasiru.live-server)
- [Download Latest Release](https://github.com/yasirunadeesha/Live-Server-vscode-extenson/releases/latest)

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

A simple live development server with live reload capability for VS Code.

## Features

- Launch a local development server with live reload functionality
- Supports various file types (HTML, CSS, JavaScript, etc.)
- Easy to use with keyboard shortcuts
- Real-time browser reload on file changes

## Requirements

No additional requirements. This extension works out of the box with VS Code.

## How to Use

1. Open a folder containing your web files in VS Code
2. Use one of these methods to start the server:
   - Press `Ctrl+Shift+L Ctrl+Shift+O` (macOS: `Cmd+Shift+L Cmd+Shift+O`)
   - Use command palette (`Ctrl+Shift+P`) and search for "Live Server: Start"
   - Right-click in the editor and select "Live Server: Start"

To stop the server:
- Press `Ctrl+Shift+L Ctrl+Shift+C` (macOS: `Cmd+Shift+L Cmd+Shift+C`)
- Use command palette and search for "Live Server: Stop"

## Release Notes

### 0.0.1

Initial release of Live Server extension with basic functionality:
- Local development server
- Live reload capability
- Keyboard shortcuts for easy access

---

## Following extension guidelines

Ensure that you've read through the extensions guidelines and follow the best practices for creating your extension.

* [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

## Working with Markdown

You can author your README using Visual Studio Code. Here are some useful editor keyboard shortcuts:

* Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux).
* Toggle preview (`Shift+Cmd+V` on macOS or `Shift+Ctrl+V` on Windows and Linux).
* Press `Ctrl+Space` (Windows, Linux, macOS) to see a list of Markdown snippets.

## For more information

* [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**
