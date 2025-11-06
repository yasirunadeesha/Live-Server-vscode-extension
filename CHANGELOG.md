# Change Log

All notable changes to the "yasiru" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [0.0.2] - 2025-10-31

### Changed
- Changed keyboard shortcuts to avoid conflicts with other applications:
  - Start server: Now `Ctrl+Shift+L Ctrl+Shift+O` (was `Alt+L Alt+O`)
  - Stop server: Now `Ctrl+Shift+L Ctrl+Shift+C` (was `Alt+L Alt+C`)
  - For macOS: Use `Cmd` instead of `Ctrl`

### Added
- Port auto-retry: if the default port is in use, tries up to 10 alternative ports
- Status bar now shows the active port number
- Support for VS Code Live Share (experimental)
- Update notifications when new versions are installed

## [0.0.1] - 2025-10-30

### Initial Release
- Local development server with live reload
- HTML file detection and automatic browser opening
- Support for custom browser configuration
- HTTPS support
- CORS support
- Proxy configuration support
- File watching with customizable ignore patterns