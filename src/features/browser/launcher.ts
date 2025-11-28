import { spawn } from "child_process";
import { platform } from "os";
import { detectBrowser } from "./detector";

const launchBrowser = (port: number = 3005, browser?: string | null) => {
  try {
    const chromePath = browser ? browser : detectBrowser();

    if (!chromePath) {
      throw new Error(
        "Chrome/Chromium not found. Please install Google Chrome or Chromium."
      );
    }

    console.log(`Launching Chrome from: ${chromePath}`);

    const openBrowser = spawn(
      chromePath,
      [
        `--remote-debugging-port=${port}`,
        "--user-data-dir=/tmp/chrome-profile",
      ],
      {
        detached: true,
        stdio: "ignore",
        shell: platform() === "win32",
      }
    );

    openBrowser.unref();
    console.log("Chrome launched with PID:", openBrowser.pid);

    return new Promise((resolve) => setTimeout(resolve, 2000));
  } catch (error) {
    console.error("Error launching browser:", error);
    process.exit(1);
  }
};

export default launchBrowser;
