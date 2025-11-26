import { execSync } from "child_process";
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
      "google-chrome",
      "chromium",
    ],
    win32: [
      "chrome.exe",
    ],
  };

  const os = platform();
  const osPaths = paths[os] || paths.linux;

  for (const path of osPaths) {
    const result = commandExists(path, os);
      if (result) {
        return typeof result === "string" ? result : path;
      }
  }

  return null;
};


const commandExists = (command: string, os: NodeJS.Platform): string | null=> {
  try {
    const finalCommand = os === "darwin" || os === "linux" ? `which ${command}` : `where ${command}`;
    const result = execSync(finalCommand, { encoding: "utf-8" }).trim();
    return result;
  } catch {
    return null;
  }
};

export { getChromePath };
