# WhatsApp Spammer

A simple CLI tool to send automated WhatsApp messages using Puppeteer and Chrome's remote debugging.

## Prerequisites

- Node.js installed
- Google Chrome installed
- TypeScript (`npm install -g typescript ts-node`)

## Installation

1. Clone or download this project
2. Install dependencies:

```bash
npm install puppeteer-core
```

## Usage

Run the script with the following command:

```bash
npx ts-node app.ts <contact> <message> [port]
```

### Arguments

- `contact` (required): The name of the contact as it appears in WhatsApp
- `message` (required): The message to send (use quotes for multi-word messages)
- `port` (optional): Chrome remote debugging port (default: 3005)

### Examples

```bash
# Basic usage (default port 3005)
npx ts-node app.ts "John Doe" "Hello there!"

# With custom port
npx ts-node app.ts zkaynl7 "Testing 123" 9222

# Single word contact and message
npx ts-node app.ts Mom "Miss you"
```

## How it works

1. The script launches Chrome with remote debugging enabled
2. Connects to Chrome using Puppeteer
3. Opens WhatsApp Web
4. Searches for the specified contact
5. Sends the message 1000 times (numbered 0-999)
6. Disconnects from the browser

## Notes

- You must be logged into WhatsApp Web before running the script
- Chrome will stay open after the script finishes
- The script uses `/tmp/chrome-profile` as the user data directory
- Make sure WhatsApp Web is accessible and you're logged in

## Troubleshooting

- **"Could not find the search box"**: Wait for WhatsApp Web to fully load before running
- **Connection refused**: Make sure Chrome is running on the specified port
- **Contact not found**: Ensure the contact name matches exactly as shown in WhatsApp

## Warning

**Use responsibly!** This tool sends 1000 messages. Make sure you have permission from the recipient before using it.
