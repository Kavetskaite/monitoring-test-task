import path from "path";
import puppeteer from "puppeteer";
import fs from "fs";
import { screenshotsDir } from "@/constants";
import { addScreenshot } from "@/services/screenshotsService";

export const takeScreenshot = () => {
  puppeteer
    .launch({
      defaultViewport: {
        width: 1280,
        height: 2000,
      },
    })
    .then(async (browser) => {
      try {
        const page = await browser.newPage();

        await page.goto(process.env.APP_URL || "");

        const screenshotBuffer = await page.screenshot();

        const fileName = `screenshot-${Date.now()}.png`;
        const filePath = path.join(screenshotsDir, fileName);

        fs.writeFileSync(filePath, screenshotBuffer);

        await browser.close();

        addScreenshot(fileName);
      } catch (err) {
        console.log(`An error occurred while taking screenshot: ${err}.`);
      }
    });
};
