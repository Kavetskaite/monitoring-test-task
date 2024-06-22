import express from "express";
import { screenshotsDir } from "@/constants";

const router = express.Router();

router.use("", (req, res, next) => {
  res.set("Cache-Control", "public, max-age=31536000");
  next();
});

router.use("", express.static(screenshotsDir));

export default router;
