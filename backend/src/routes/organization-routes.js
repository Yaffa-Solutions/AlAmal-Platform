import { Router } from "express";
import {
  createOrgHandler,
  getUploadUrl,
  getOrgByIdHandler,
  getRecentCampaignsHandler,
  getActiveCampaignsHandler,
  getOrgByUserHandler,
} from "../controllers/organization-controller.js";
import { getSignedUrlForFile } from "../services/s3-service.js";
import { getOrganizationById } from "../services/organization-service.js";
const router = Router();
console.log("in routes", router);

router.post("/upload-url", getUploadUrl);
router.post("/", createOrgHandler);
router.get("/by-user/:userId", getOrgByUserHandler);
router.get("/:id/recent/campaigns", getRecentCampaignsHandler);
router.get("/:id/active/campaigns", getActiveCampaignsHandler);
router.get("/:id", getOrgByIdHandler);
router.get("/:id/documents", async (req, res) => {
  try {
    const org = await getOrganizationById(req.params.id);

    if (!org) {
      return res.status(404).json({ message: "لم يتم العثور على المؤسسة" });
    }

    console.log("✅ Org fetched:", org);

    const registrationUrl = org.registrationCertificate
      ? await getSignedUrlForFile(org.registrationCertificate)
      : null;

    const licenseUrl = org.professionalLicense
      ? await getSignedUrlForFile(org.professionalLicense)
      : null;

    res.json({ registrationUrl, licenseUrl });
  } catch (err) {
    console.error("❌ Error while fetching docs:", err);
    res.status(500).json({ message: "خطأ في استرجاع الوثائق" });
  }
});

export default router;
