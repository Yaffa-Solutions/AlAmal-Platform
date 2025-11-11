import { Router } from "express";
import {
  getRecentRequestsAllHandler,
  getRecentRequestsHandler,
  updateRequestStatusHandler,
} from "../controllers/request-controller.js";

const router = Router();

router.get("/recent", getRecentRequestsAllHandler);
router.get("/:id/recent", getRecentRequestsHandler);
router.put("/:id/status", updateRequestStatusHandler);

export default router;
