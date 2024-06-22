import { getMonitoringData } from "@/controllers/monitoringDataController";
import express from "express";

const router = express.Router();

router.get("", getMonitoringData);

export default router;
