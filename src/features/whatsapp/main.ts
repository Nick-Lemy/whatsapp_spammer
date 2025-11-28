import puppeteer from "puppeteer-core";
import { WHATSAPP_LOAD_TIMEOUT_MS } from "../../../utils/contants";

const sendWhatsappMessage = async (
  contact: string = "You",
  message: string = "Hello from Nick's Spammer",
  port: number = 3005,
  numberOfMessages: number = 1000
) => {
  const browser = await puppeteer.connect({
    browserURL: `http://localhost:${port}`,
  });

  const pages = await browser.pages();

  const page = pages[0];

  await page.goto("https://web.whatsapp.com", {
    waitUntil: "networkidle2",
    timeout: WHATSAPP_LOAD_TIMEOUT_MS,
  });

  const searchSelector = 'div[contenteditable="true"][data-tab="3"]';
  await page.waitForSelector(searchSelector, {
    visible: true,
    timeout: WHATSAPP_LOAD_TIMEOUT_MS,
  });

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
        timeout: WHATSAPP_LOAD_TIMEOUT_MS,
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
};

export default sendWhatsappMessage;
