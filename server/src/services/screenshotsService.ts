import { DBConnection } from "@/connections";
import { Screenshot } from "@/entity";

export const getFirstScreenshot = async () => {
  const dataSource = DBConnection.getConnection();

  const [fisrtScreenshot] = await dataSource.getRepository(Screenshot).find({
    where: {
      appUrl: process.env.APP_URL,
    },
    order: { createdBy: "ASC" },
    take: 1,
  });

  return fisrtScreenshot;
};

export const getScreenshotsByCurrentPageAndLimit = async (currentPage: number, limit: number) => {
  const dataSource = DBConnection.getConnection();

  const [screenshots, total] = await dataSource.getRepository(Screenshot).findAndCount({
    where: {
      appUrl: process.env.APP_URL,
    },
    order: { createdBy: "DESC" },
    skip: (currentPage - 1) * limit,
    take: limit,
  });

  screenshots.forEach((screenshot) => {
    screenshot.screenshotPath = `${process.env.BASE_API_URL}/screenshots${screenshot.screenshotPath}`;
  });

  return {
    screenshots,
    total,
  };
};

export const addScreenshot = async (fileName: string) => {
  const dataSource = DBConnection.getConnection();

  await dataSource.getRepository(Screenshot).insert({
    appUrl: process.env.APP_URL,
    screenshotPath: `/${fileName}`,
  });
};
