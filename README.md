# WhatsApp Spammer

A simple CLI tool to send automated WhatsApp messages using Puppeteer and Chrome's remote debugging.

## Prerequisites

- Node.js (>= 18.0.0)
- pnpm package manager
- Google Chrome or Chromium installed (supports Linux, macOS, and Windows)

## Installation

### From npm (recommended)

```bash
# Run directly with npx
npx whatsapp-spammer-cli <contact> "<message>" [--port PORT] [--count NUMBER] [--browser BROWSER]

# Or install globally
npm install -g whatsapp-spammer-cli
whatsapp-spammer <contact> "<message>" [--port PORT] [--count NUMBER] [--browser BROWSER]
```

### From source (development)

1. Clone or download this project
2. Install dependencies:

```bash
pnpm install
```

## Usage

### Installed package

After installing globally or using npx:

```bash
whatsapp-spammer <contact> "<message>" [--port PORT] [--count NUMBER] [--browser BROWSER]
```

### Development mode

Run the script directly from source:

```bash
pnpm run dev <contact> <message> [--port PORT] [--count NUMBER] [--browser BROWSER]
```

### Arguments

- `contact` (required): The name of the contact as it appears in WhatsApp
- `message` (required): The message to send (use quotes for multi-word messages)
- `--port` or `-p` (optional): Chrome remote debugging port (default: 3005)
- `--count` or `-c` (optional): Number of messages to send (default: 1)
- `--browser` or `-b` (optional): Path to browser executable (auto-detected if not specified)
- `--help` or `-h`: Display help information

### Examples

**Using installed CLI:**

```bash
# Basic usage (default port 3005, 1 message)
whatsapp-spammer "John Doe" "Hello there!"

# Send 10 messages
whatsapp-spammer zkaynl7 "Testing 123" --count 10

# Custom port with 500 messages
whatsapp-spammer Mom "Miss you" --port 9222 --count 500

# Using short flags
whatsapp-spammer "John" "Hello" -p 3005 -c 50

# Specify custom browser path
whatsapp-spammer "Alice" "Test message" --browser /usr/bin/chromium

# Mix and match flags in any order
whatsapp-spammer "Bob" "Hello" --count 20 --port 9000 --browser chrome
```

**Development mode:**

```bash
# Basic usage
pnpm run dev "John Doe" "Hello there!"

# With custom options
pnpm run dev zkaynl7 "Testing 123" --count 10 --port 3005

# Display help
pnpm run dev --help
```

## Build from source

Build the TypeScript source to JavaScript:

```bash
# Build the project
pnpm run build

# Run the built version
pnpm start <contact> <message> [--port PORT] [--count NUMBER] [--browser BROWSER]
```

Example:

```bash
pnpm run build
pnpm start zkaynl7 "Hello World" --port 3005 --count 100
```

The build output goes to the `./build/` directory. The package is configured to run the compiled [`build/index.js`](build/index.js) when installed via npm.

## How it works

1. The script automatically detects and launches Chrome/Chromium with remote debugging enabled via [`launchBrowser`](src/features/browser/launcher.ts)
   - Supports Linux, macOS, and Windows through [`detectBrowser`](src/features/browser/detector.ts)
   - Checks common installation paths defined in [`browserPaths`](src/features/browser/constants.ts)
   - Allows manual browser path specification via `--browser` flag
   - Throws a helpful error if Chrome is not found
2. Connects to Chrome using Puppeteer via [`sendWhatsappMessage`](src/features/whatsapp/client.ts)
3. Opens WhatsApp Web at the URL defined in [`WHATSAPP_WEB_URL`](src/shared/contants.ts)
4. Searches for the specified contact using selectors from [`selectors.ts`](src/features/whatsapp/selectors.ts)
5. Sends the message the specified number of times
6. Disconnects from the browser

## Project Structure

```
.
├── src/
│   ├── index.ts                    # Main CLI entry point
│   ├── features/
│   │   ├── browser/
│   │   │   ├── constants.ts        # Browser paths for different platforms
│   │   │   ├── detector.ts         # Auto-detect browser installation
│   │   │   ├── launcher.ts         # Launch Chrome with debugging
│   │   │   └── index.ts
│   │   └── whatsapp/
│   │       ├── client.ts           # WhatsApp message sender
│   │       ├── selectors.ts        # WhatsApp Web selectors
│   │       └── index.ts
│   └── shared/
│       └── contants.ts             # Shared constants
├── tests/                          # Test files
├── build/                          # Compiled JavaScript output
└── package.json
```

## Notes

- You must be logged into WhatsApp Web before running the script
- Chrome will stay open after the script finishes
- The script uses `/tmp/chrome-profile` as the user data directory on Linux/macOS
- The script automatically launches Chrome - no need to start it manually
- Make sure WhatsApp Web is accessible and you're logged in
- Cross-platform support: Works on Linux, macOS, and Windows
- If Chrome is not found, install Google Chrome or Chromium browser, or specify the path with `--browser`
- Default message count is 1 (changed from 1000 for safety)

## Troubleshooting

- **"Chrome/Chromium not found"**: Install Google Chrome or Chromium browser for your platform, or use `--browser` to specify the path
  - Linux: `sudo apt install google-chrome-stable` or `sudo apt install chromium-browser`
  - macOS: Download from [google.com/chrome](https://www.google.com/chrome/)
  - Windows: Download from [google.com/chrome](https://www.google.com/chrome/)
- **"Could not find the search box"**: Wait for WhatsApp Web to fully load (timeout is set to 120 seconds via [`WHATSAPP_LOAD_TIMEOUT_MS`](src/shared/contants.ts)), you may need to scan the QR code first
- **Connection refused**: The script auto-launches Chrome, wait a few seconds for it to start
- **Contact not found**: Ensure the contact name matches exactly as shown in WhatsApp
- **Port already in use**: Chrome might already be running on that port, use a different port number with `--port`

## Warning

⚠️ **Use responsibly!** This tool can send many messages rapidly. Make sure you have permission from the recipient before using it. Start with a small number to test!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Nick-Lemy (nicklemykayiranga@gmail.com)

## Repository

[https://github.com/Nick-Lemy/whatsapp_spammer](https://github.com/Nick-Lemy/whatsapp_spammer)