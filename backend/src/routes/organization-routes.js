import { Router } from "express";
import {
  createOrgHandler,
  getUploadUrl,
} from "../controllers/organization-controller.js";

const router = Router();

router.post("/upload-url", getUploadUrl);
router.post("/", createOrgHandler);

export default router;
