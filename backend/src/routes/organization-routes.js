import { Router } from "express";
import {
  createOrgHandler,
  getUploadUrl,
  getOrgByIdHandler,
  getOrgByUserHandler,
  getOrgDocumentsHandler,
} from "../controllers/organization-controller.js";

const router = Router();
console.log("in routes", router);

router.post("/upload-url", getUploadUrl);
router.post("/", createOrgHandler);
router.get("/by-user/:userId", getOrgByUserHandler);

router.get("/:id", getOrgByIdHandler);
router.get("/:id/documents", getOrgDocumentsHandler);

export default router;
