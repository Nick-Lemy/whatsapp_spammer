  const BrowserPaths: Record<string, string[]> = {
    linux: [
      "google-chrome",
      "google-chrome-stable",
      "chromium-browser",
      "chromium",
    ],
    darwin: ["google-chrome", "chromium"],
    win32: ["chrome.exe"],
  };

  export { BrowserPaths };