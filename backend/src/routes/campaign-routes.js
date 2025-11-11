import { Router } from "express";
import {
  getCampaignsHandler,
  createCampaignHandler,
  updateCampaignHandler,
  deleteCampaignHandler,
  getRecentCampaignsHandler,
  getActiveCampaignsHandler,
} from "../controllers/campaign-controller.js";
import { getCampaignUploadUrl } from "../controllers/campaign-controller.js";

const router = Router();
router.post("/upload-url", getCampaignUploadUrl);

router.get("/:orgId", getCampaignsHandler);
router.get("/:id/recent/campaigns", getRecentCampaignsHandler);
router.get("/:id/active/campaigns", getActiveCampaignsHandler);
router.post("/", createCampaignHandler);
router.put("/:id", updateCampaignHandler);
router.delete("/:id", deleteCampaignHandler);

export default router;
