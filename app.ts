import puppeteer from "puppeteer-core";
import { spawn } from "child_process";

async function sendWhatsAppMessage(
  contact: string = "You",
  message: string = "Hello from Nick's Spammer",
  port: number = 3005
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
  for (let i = 0; i < 1000; i++) {
    await messageBox.type(`${message} ${i}`);
    await page.keyboard.press("Enter");
  }

  console.log(`Sent message to ${contact}: "${message}"`);

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

  chrome.unref(); // Let Chrome run independently
  console.log("Chrome launched with PID:", chrome.pid);

  // Wait a bit for Chrome to start
  return new Promise((resolve) => setTimeout(resolve, 3000));
}

const args = process.argv.slice(2);
const contact = args[0];
const message = args[1];
const port = args[2] ? parseInt(args[2], 10) : 3005;

launchChrome(port).then(() => {
  sendWhatsAppMessage(contact, message, port).catch(console.error);
});
