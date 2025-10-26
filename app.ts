import puppeteer from "puppeteer-core";
import { spawn } from "child_process";

async function sendWhatsAppMessage(
  contact: string = "You",
  message: string = "Hello from Nick's Spammer",
  port: number = 3005,
  numberOfMessages: number = 1000
) {
  const browser = await puppeteer.connect({
    browserURL: `http://localhost:${port}`,
  });

  const pages = await browser.pages();
  const page = pages[0];

  await page.goto("https://web.whatsapp.com", { waitUntil: "networkidle2" });

  const searchSelector = 'div[contenteditable="true"][data-tab="3"]';
  await page.waitForSelector(searchSelector, { visible: true, timeout: 60000 });

  const searchBox = await page.$(searchSelector);
  if (!searchBox) throw new Error("Could not find the search box");
  await searchBox.click({ clickCount: 3 });
  await searchBox.type(contact, { delay: 100 });
  await page.keyboard.press("Enter");

  const messageBoxSelectorCandidates = [
    'div[contenteditable="true"][data-tab="10"]',
    'div[contenteditable="true"][data-tab="1"]',
  ];

  let messageBox = null;
  for (const sel of messageBoxSelectorCandidates) {
    try {
      messageBox = await page.waitForSelector(sel, {
        visible: true,
        timeout: 5000,
      });
      if (messageBox) break;
    } catch {
      continue;
    }
  }

  if (!messageBox) throw new Error("Could not find message box");

  await messageBox.focus();
  for (let i = 1; i <= numberOfMessages; i++) {
    await messageBox.type(`${message}`);
    await page.keyboard.press("Enter");
  }

  console.log(`Sent ${numberOfMessages} messages to ${contact}: "${message}"`);

  await browser.disconnect();
}

function launchChrome(port: number = 3005) {
  const chrome = spawn(
    "google-chrome",
    [`--remote-debugging-port=${port}`, "--user-data-dir=/tmp/chrome-profile"],
    {
      detached: true,
      stdio: "ignore",
    }
  );

  chrome.unref();
  console.log("Chrome launched with PID:", chrome.pid);

  return new Promise((resolve) => setTimeout(resolve, 3000));
}

// Parse CLI arguments
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

// Parse optional flags
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

launchChrome(port).then(() => {
  sendWhatsAppMessage(contact, message, port, numberOfMessages).catch(
    console.error
  );
});
