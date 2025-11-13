#!/usr/bin/env node
import { launchChrome, sendWhatsappMessage } from "./features";

const args = process.argv.slice(2);

if (args.length < 2) {
  console.error(
    "Usage: npm run dev <contact> <message> [--port PORT] [--count NUMBER]"
  );
  console.error("Example: npm run dev 'John' 'Hello' --port 3005 --count 10");
  process.exit(1);
}

const contact = args[0];
const message = args[1];

let port = 3005;
let numberOfMessages = 1000;

for (let i = 2; i < args.length; i++) {
  if (args[i] === "--port" || args[i] === "-p") {
    port = parseInt(args[i + 1], 10);
    i++;
  } else if (
    args[i] === "--count" ||
    args[i] === "-c" ||
    args[i] === "--messages" ||
    args[i] === "-m"
  ) {
    numberOfMessages = parseInt(args[i + 1], 10);
    i++;
  }
}

async function main() {
  try {
    await Promise.all([
      launchChrome(port),
      sendWhatsappMessage(contact, message, port, numberOfMessages),
    ]);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

main();
