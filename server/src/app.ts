import express from "express";
import "reflect-metadata";
import { DBConnection } from "@/connections";
import { checkScreenshotsDir } from "@/constants";
import cron from "node-cron";
import { takeScreenshot } from "@/cronjobs";
import cors from "cors";
import dotenv from "dotenv";
import monitoringDataRouter from "routes/monitoringDataRoute";
import screenshotsRouter from "routes/screenshotsRoute";

dotenv.config();
checkScreenshotsDir();

const dataSource = DBConnection.getConnection();

dataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
    throw err;
  });

const app = express();
app.use(express.json());

app.use(cors());

app.use("/monitoring-data", monitoringDataRouter);
app.use("/screenshots", screenshotsRouter);

cron.schedule(`*/${process.env.INTERVAL_IN_MINUTES || 1} * * * *`, takeScreenshot);

const port = process.env.PORT ? parseInt(process.env.PORT) : 4000;

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
