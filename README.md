# WhatsApp Spammer CLI

[![npm](https://img.shields.io/npm/v/whatsapp-spammer-cli.svg)](https://www.npmjs.com/package/whatsapp-spammer-cli)
[![npm](https://img.shields.io/npm/dt/whatsapp-spammer-cli.svg)](https://www.npmjs.com/package/whatsapp-spammer-cli)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)

A lightweight CLI tool for sending automated WhatsApp messages via Puppeteer and Chrome remote debugging. Cross-platform support for Linux, macOS, and Windows.

## Quick Start

```bash
npx whatsapp-spammer-cli "John Doe" "Hello!" --count 5
```

Or install globally:

```bash
npm install -g whatsapp-spammer-cli
```

## Usage

```bash
whatsapp-spammer <contact> "<message>" [options]
```

### Options

| Flag | Alias | Default | Description |
|------|-------|---------|-------------|
| `--port` | `-p` | `3005` | Chrome remote debugging port |
| `--count` | `-c` | `1` | Number of messages to send |
| `--browser` | `-b` | auto-detect | Path to browser executable |
| `--help` | `-h` | — | Display help information |

### Examples

```bash
whatsapp-spammer "Alice" "Hey there!" -c 10
whatsapp-spammer "Mom" "Miss you" -p 9222 -c 50
whatsapp-spammer "Bob" "Hello" --browser /usr/bin/chromium
```

## Prerequisites

- **Node.js** >= 18.0.0
- **Google Chrome** or **Chromium** installed

> You must be logged into WhatsApp Web before running the script.

## How It Works

1. Auto-detects and launches Chrome with remote debugging enabled
2. Connects via Puppeteer and opens WhatsApp Web
3. Searches for the specified contact and sends the message(s)
4. Disconnects cleanly from the browser

## Development

```bash
git clone https://github.com/Nick-Lemy/whatsapp_spammer.git
cd whatsapp_spammer
pnpm install
pnpm run dev "John Doe" "Hello!" --count 5
```

Build from source:

```bash
pnpm run build
pnpm start "John Doe" "Hello!" --count 5
```

## Project Structure

```
src/
├── index.ts                     # CLI entry point
├── features/
│   ├── browser/                 # Browser detection & launch
│   └── whatsapp/                # WhatsApp Web client & selectors
└── shared/
    └── contants.ts              # Shared constants
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Chrome not found | Install Chrome/Chromium or use `--browser` to specify the path |
| Search box not found | Wait for WhatsApp Web to load; scan QR code if prompted |
| Port in use | Use a different port with `--port` |
| Contact not found | Ensure the name matches exactly as shown in WhatsApp |

## ⚠️ Disclaimer

Use responsibly. Ensure you have the recipient's permission before sending automated messages. Always start with a small count to test.

## License

[MIT](LICENSE) © [Nick-Lemy](mailto:nicklemykayiranga@gmail.com)
