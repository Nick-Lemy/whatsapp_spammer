#!/usr/bin/env node
import process from "node:process";
import { launchBrowser, sendWhatsappMessage } from "./features";

const args = process.argv.slice(2);
if (args.length < 2) {
  console.error(
    "Usage: npm run dev <contact> <message> [--port PORT] [--count NUMBER]"
  );
  console.error("Example: npm run dev 'John' 'Hello' --port 3005 --count 10");
  process.exit(1);
}

const [contact, message] = args;

let port = 3005;
let numberOfMessages = 1000;
let browser: string | null = null;

for (let i = 2; i < args.length; i++) {
  if (args[i] === "--port" || args[i] === "-p") {
    port = parseInt(args[i + 1], 10);
    i++;
  } else if (args[i] === "--count" || args[i] === "-c") {
    numberOfMessages = parseInt(args[i + 1], 10);
    i++;
  } else if (args[i] === "--browser" || args[i] === "-b") {
    browser = args[i + 1];
    i++;
  } else if (args[i] === "--help" || args[i] === "-h") {
    console.log(
      "Usage: npm run dev <contact> <message> [--port PORT] [--count NUMBER] [--browser BROWSER]"
    );
    console.log(
      "Example: npm run dev 'John' 'Hello' --port 3005 --count 10 --browser chrome"
    );
    process.exit(0);
  }
}

async function main() {
  try {
    await launchBrowser(port, browser);
    await sendWhatsappMessage(contact, message, port, numberOfMessages);
  } catch (error) {
    throw error;
  }
}

main();
