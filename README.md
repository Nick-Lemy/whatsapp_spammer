# WhatsApp Spammer

A simple CLI tool to send automated WhatsApp messages using Puppeteer and Chrome's remote debugging.

## Prerequisites

- Node.js installed
- Google Chrome installed

## Installation

1. Clone or download this project
2. Install dependencies:

```bash
npm install
```

## Usage

Run the script with the following command:

```bash
npm run dev <contact> <message> [--port PORT] [--count NUMBER]
```

### Arguments

- `contact` (required): The name of the contact as it appears in WhatsApp
- `message` (required): The message to send (use quotes for multi-word messages)
- `--port` or `-p` (optional): Chrome remote debugging port (default: 3005)
- `--count` or `-c` or `--messages` or `-m` (optional): Number of messages to send (default: 1000)

### Examples

```bash
# Basic usage (default port 3005, 1000 messages)
npm run dev "John Doe" "Hello there!"

# Send only 10 messages
npm run dev zkaynl7 "Testing 123" --count 10

# Custom port with 500 messages
npm run dev Mom "Miss you" --port 9222 --count 500

# Just custom port (default 1000 messages)
npm run dev "Best Friend" "Spam test" --port 9222

# Using short flags
npm run dev "John" "Hello" -p 3005 -c 50

# Mix and match flags in any order
npm run dev "Alice" "Test message" --count 20 --port 9000
```

## Alternative: Build and Run

You can also build the TypeScript file and run the compiled JavaScript:

```bash
# Build
npm run build

# Run
npm start <contact> <message> [--port PORT] [--count NUMBER]
```

Example:

```bash
npm run build
npm start zkaynl7 "Hello World" --port 3005 --count 100
```

## How it works

1. The script automatically launches Chrome with remote debugging enabled
2. Connects to Chrome using Puppeteer
3. Opens WhatsApp Web
4. Searches for the specified contact
5. Sends the message the specified number of times (numbered 1 to N)
6. Disconnects from the browser

## Notes

- You must be logged into WhatsApp Web before running the script
- Chrome will stay open after the script finishes
- The script uses `/tmp/chrome-profile` as the user data directory
- The script automatically launches Chrome - no need to start it manually
- Make sure WhatsApp Web is accessible and you're logged in
- Messages are numbered from 1 to the number you specify (e.g., "Hello 1", "Hello 2", etc.)

## Troubleshooting

- **"Could not find the search box"**: Wait for WhatsApp Web to fully load, you may need to scan the QR code first
- **Connection refused**: The script auto-launches Chrome, wait 3 seconds for it to start
- **Contact not found**: Ensure the contact name matches exactly as shown in WhatsApp
- **Port already in use**: Chrome might already be running on that port, use a different port number

## Warning

⚠️ **Use responsibly!** This tool can send many messages rapidly. Make sure you have permission from the recipient before using it. Start with a small number to test!
