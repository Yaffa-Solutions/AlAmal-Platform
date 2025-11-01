import { Router } from "express";
import {
  createOrgHandler,
  getUploadUrl,
  getOrgByIdHandler,
  getRecentInventoryHandler,
  getRecentCampaignsHandler,
  getActiveCampaignsHandler,
  getOrgByUserHandler,
} from "../controllers/organization-controller.js";
const router = Router();
console.log("in routes", router);

router.post("/upload-url", getUploadUrl);
router.post("/", createOrgHandler);
router.get("/by-user/:userId", getOrgByUserHandler);
router.get("/:id/recent/inventory", getRecentInventoryHandler);
router.get("/:id/recent/campaigns", getRecentCampaignsHandler);
router.get("/:id/active/campaigns", getActiveCampaignsHandler);
router.get("/:id", getOrgByIdHandler);

export default router;
