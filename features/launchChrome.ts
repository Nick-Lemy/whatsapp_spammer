import { spawn } from "child_process";

const launchChrome = (port: number = 3005) => {
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
};

export default launchChrome;
