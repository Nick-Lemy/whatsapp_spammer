import { spawn, ChildProcess } from "child_process";
import { platform } from "os";
import { detectBrowser } from "./detector";

let browserProcess: ChildProcess | null = null;

const cleanup = () => {
  if (browserProcess && browserProcess.pid) {
    console.log(`Killing Chrome process (PID: ${browserProcess.pid})`);
    try {
      process.kill(-browserProcess.pid, "SIGKILL");
    } catch {
      try {
        browserProcess.kill("SIGKILL");
      } catch {
        // Process already dead
      }
    }
    browserProcess = null;
  }
};

process.on("exit", cleanup);
process.on("SIGINT", () => {
  cleanup();
  process.exit(130);
});
process.on("SIGTERM", () => {
  cleanup();
  process.exit(143);
});

const launchBrowser = (port: number = 3005, browser?: string | null) => {
  try {
    const chromePath = browser ? browser : detectBrowser();

    if (!chromePath) {
      throw new Error(
        "Chrome/Chromium not found. Please install Google Chrome or Chromium.",
      );
    }

    console.log(`Launching Chrome from: ${chromePath}`);

    browserProcess = spawn(
      chromePath,
      [
        `--remote-debugging-port=${port}`,
        "--user-data-dir=/tmp/chrome-profile",
        // "--headless",
      ],
      {
        detached: true,
        stdio: "ignore",
        shell: platform() === "win32",
      },
    );

    console.log("Chrome launched with PID:", browserProcess.pid);

    return new Promise((resolve) => setTimeout(resolve, 2000));
  } catch (error) {
    console.error("Error launching browser:", error);
    process.exit(1);
  }
};

export default launchBrowser;
