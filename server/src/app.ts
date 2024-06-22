import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
import cron from "node-cron";
import { DBConnection } from "./connections/dataSource";
import { checkScreenshotsDir } from "./constants";
import { takeScreenshot } from "./cronjobs";

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

cron.schedule(`*/${process.env.INTERVAL_IN_MINUTES || 1} * * * *`, takeScreenshot);

const port = process.env.PORT ? parseInt(process.env.PORT) : 4000;

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
