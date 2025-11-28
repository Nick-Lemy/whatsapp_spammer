import { execSync } from "child_process";
import { platform } from "os";
import { BrowserPaths } from "./constants";

const detectBrowser = (): string | null => {

  const os = platform();
  const osPaths = BrowserPaths[os] || BrowserPaths.linux;

  for (const path of osPaths) {
    const result = commandExists(path, os);
    if (result) {
      return typeof result === "string" ? result : path;
    }
  }

  return null;
};

const commandExists = (command: string, os: NodeJS.Platform): string | null => {
  try {
    const finalCommand =
      os === "darwin" || os === "linux"
        ? `which ${command}`
        : `where ${command}`;
    const result = execSync(finalCommand, { encoding: "utf-8" }).trim();
    return result;
  } catch {
    return null;
  }
};

export { detectBrowser };
