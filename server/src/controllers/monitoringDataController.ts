import {
  getFirstScreenshot,
  getScreenshotsByCurrentPageAndLimit,
} from "@/services/screenshotsService";
import { Request, Response } from "express";

export const getMonitoringData = async (req: Request, res: Response) => {
  try {
    const currentPage = Number(req.query.currentPage || 1);
    const limit = Number(req.query.limit || 10);

    const firstScreenshot = await getFirstScreenshot();

    const screenshotsData = await getScreenshotsByCurrentPageAndLimit(currentPage, limit);

    res.send({
      screenshots: screenshotsData.screenshots,
      currentPage,
      pagesCount: Math.ceil(screenshotsData.total / limit),
      startTime: firstScreenshot?.createdBy || null,
      appUrl: process.env.APP_URL,
    });
  } catch (error) {
    console.log(`An error occurred while fetching monitoring data: ${error}`);
    res.status(500).send({ error: "An error occurred while fetching monitoring data." });
  }
};
