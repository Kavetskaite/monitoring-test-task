import { DBConnection } from "@/connections";
import { Screenshot } from "@/entity";

export const addScreenshot = async (fileName: string) => {
  const dataSource = DBConnection.getConnection();

  await dataSource.getRepository(Screenshot).insert({
    appUrl: process.env.APP_URL,
    screenshotPath: `/${fileName}`,
  });
};
