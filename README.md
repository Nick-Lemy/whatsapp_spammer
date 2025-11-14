# WhatsApp Spammer

A simple CLI tool to send automated WhatsApp messages using Puppeteer and Chrome's remote debugging.

## Prerequisites

- Node.js (>= 18.0.0)
- Google Chrome or Chromium installed (supports Linux, macOS, and Windows)

## Installation

### From npm (recommended)

```bash
# Run directly with npx
npx whatsapp-spammer-cli <contact> "<message>" [--port PORT] [--count NUMBER]

# Or install globally
npm install -g whatsapp-spammer-cli
whatsapp-spammer <contact> "<message>" [--port PORT] [--count NUMBER]
```

### From source (development)

1. Clone or download this project
2. Install dependencies:

```bash
npm install
```

## Usage

### Installed package

After installing globally or using npx:

```bash
whatsapp-spammer <contact> "<message>" [--port PORT] [--count NUMBER]
```

### Development mode

Run the script directly from source:

```bash
npm run dev <contact> <message> [--port PORT] [--count NUMBER]
```

### Arguments

- `contact` (required): The name of the contact as it appears in WhatsApp
- `message` (required): The message to send (use quotes for multi-word messages)
- `--port` or `-p` (optional): Chrome remote debugging port (default: 3005)
- `--count` or `-c` or `--messages` or `-m` (optional): Number of messages to send (default: 1000)

### Examples

**Using installed CLI:**

```bash
# Basic usage (default port 3005, 1000 messages)
whatsapp-spammer "John Doe" "Hello there!"

# Send only 10 messages
whatsapp-spammer zkaynl7 "Testing 123" --count 10

# Custom port with 500 messages
whatsapp-spammer Mom "Miss you" --port 9222 --count 500

# Using short flags
whatsapp-spammer "John" "Hello" -p 3005 -c 50

# Mix and match flags in any order
whatsapp-spammer "Alice" "Test message" --count 20 --port 9000
```

**Development mode:**

```bash
# Basic usage
npm run dev "John Doe" "Hello there!"

# With custom options
npm run dev zkaynl7 "Testing 123" --count 10 --port 3005
```

## Build from source

Build the TypeScript source to JavaScript:

```bash
# Build the project
npm run build

# Run the built version
npm start <contact> <message> [--port PORT] [--count NUMBER]
```

Example:

```bash
npm run build
npm start zkaynl7 "Hello World" --port 3005 --count 100
```

The build output goes to `./build/` directory. The package is configured to run the compiled `build/app.js` when installed via npm.

## How it works

1. The script automatically detects and launches Chrome/Chromium with remote debugging enabled
   - Supports Linux, macOS, and Windows
   - Checks common installation paths for Google Chrome and Chromium
   - Throws a helpful error if Chrome is not found
2. Connects to Chrome using Puppeteer
3. Opens WhatsApp Web
4. Searches for the specified contact
5. Sends the message the specified number of times
6. Disconnects from the browser

## Notes

- You must be logged into WhatsApp Web before running the script
- Chrome will stay open after the script finishes
- The script uses `/tmp/chrome-profile` as the user data directory on Linux/macOS
- The script automatically launches Chrome - no need to start it manually
- Make sure WhatsApp Web is accessible and you're logged in
- Cross-platform support: Works on Linux, macOS, and Windows
- If Chrome is not found, install Google Chrome or Chromium browser

## Troubleshooting

- **"Chrome/Chromium not found"**: Install Google Chrome or Chromium browser for your platform
  - Linux: `sudo apt install google-chrome-stable` or `sudo apt install chromium-browser`
  - macOS: Download from [google.com/chrome](https://www.google.com/chrome/)
  - Windows: Download from [google.com/chrome](https://www.google.com/chrome/)
- **"Could not find the search box"**: Wait for WhatsApp Web to fully load, you may need to scan the QR code first
- **Connection refused**: The script auto-launches Chrome, wait 3 seconds for it to start
- **Contact not found**: Ensure the contact name matches exactly as shown in WhatsApp
- **Port already in use**: Chrome might already be running on that port, use a different port number

## Warning

⚠️ **Use responsibly!** This tool can send many messages rapidly. Make sure you have permission from the recipient before using it. Start with a small number to test!
