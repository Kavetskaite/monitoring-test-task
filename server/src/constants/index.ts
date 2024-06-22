import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const screenshotsDir = path.join(
  __dirname,
  "..",
  "..",
  process.env.SCREENSHOTS_DIRECTORY || "screenshots"
);

export const checkScreenshotsDir = () => {
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir);
  }
};
