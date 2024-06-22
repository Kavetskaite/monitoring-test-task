import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
import { DBConnection } from "./connections/dataSource";

dotenv.config();

console.log(process.env);

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

const port = process.env.PORT ? parseInt(process.env.PORT) : 4000;

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
