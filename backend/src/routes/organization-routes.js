import { Router } from "express";
import {
  createOrgHandler,
  getUploadUrl,
  getOrgByIdHandler,
} from "../controllers/organization-controller.js";

const router = Router();

router.post("/upload-url", getUploadUrl);
router.post("/", createOrgHandler);
router.get("/:id", getOrgByIdHandler);

export default router;
