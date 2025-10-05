import { Router } from "express";
import {
  createOrgHandler,
  getUploadUrl,
} from "../controllers/organization.controller.js";
import { validateOrganization } from "../middlewares/validateRequest.js";

const router = Router();

router.post("/upload-url", getUploadUrl);

router.post("/", validateOrganization, createOrgHandler);

export default router;
