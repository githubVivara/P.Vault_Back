import express from "express";
import UipathController from "../controllers/uipathController.js";

const router = express.Router();
router.post("/api/", UipathController.getSecToken);
router.post("/api/job/start/", UipathController.startJob);
router.post("/api/job/consult", UipathController.ConsultJobState);
router.post("/api/job/stop", UipathController.StopJobState);
export default router;
