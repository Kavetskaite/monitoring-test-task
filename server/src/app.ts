import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const port = process.env.PORT ? parseInt(process.env.PORT) : 4000;

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});