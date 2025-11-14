import { spawn } from "child_process";
import { platform } from "os";
import { getChromePath } from "./helpers";

const launchChrome = (port: number = 3005) => {
  const chromePath = getChromePath();

  if (!chromePath) {
    throw new Error(
      "Chrome/Chromium not found. Please install Google Chrome or Chromium."
    );
  }

  console.log(`Launching Chrome from: ${chromePath}`);

  const chrome = spawn(
    chromePath,
    [`--remote-debugging-port=${port}`, "--user-data-dir=/tmp/chrome-profile"],
    {
      detached: true,
      stdio: "ignore",
      shell: platform() === "win32",
    }
  );

  chrome.unref();
  console.log("Chrome launched with PID:", chrome.pid);

  return new Promise((resolve) => setTimeout(resolve, 2000));
};

export default launchChrome;
