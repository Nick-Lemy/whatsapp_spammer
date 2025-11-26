import { execSync } from "child_process";
import { existsSync } from "fs";
import { platform } from "os";

const getChromePath = (): string | null => {
  const paths: Record<string, string[]> = {
    linux: [
      "google-chrome",
      "google-chrome-stable",
      "chromium-browser",
      "chromium",
    ],
    darwin: [
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      "/Applications/Chromium.app/Contents/MacOS/Chromium",
    ],
    win32: [
      "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
      "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
      `${process.env.LOCALAPPDATA}\\Google\\Chrome\\Application\\chrome.exe`,
      `${process.env.PROGRAMFILES}\\Google\\Chrome\\Application\\chrome.exe`,
      `${process.env["PROGRAMFILES(X86)"]}\\Google\\Chrome\\Application\\chrome.exe`,
    ],
  };

  const os = platform();
  console.log(os)
  const osPaths = paths[os] || paths.linux;
  console.log(osPaths)

  for (const path of osPaths) {
    // On Linux/Mac, check if command exists in PATH
    console.log(existsSync(path))
    if (os === "linux" || os === "darwin") {
      if (commandExists(path)) {
        return path; // Assume it's in PATH
      }
    }
    // Check if file exists
    if (existsSync(path)) {
      return path;
    }
  }

  return null;
};


const commandExists = (command: string): boolean => {
  try {
    execSync(`which ${command}`, { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
};

export { getChromePath };
