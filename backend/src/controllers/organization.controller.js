import { createOrganization } from "../services/organization.service.js";
import { generatePresignedUrl } from "../services/s3.service.js";

export const getUploadUrl = async (req, res) => {
  try {
    const { filename, contentType } = req.body;

    const { url, key } = await generatePresignedUrl(filename, contentType);
    res.json({ url, key });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to generate upload URL" });
  }
};

export const createOrgHandler = async (req, res) => {
  try {
    console.log(req.body);
    const {
      user_id,
      name,
      type,
      phone,
      address,
      registration_certificate_key,
      professional_license_key,
    } = req.body;

    if (!name || !user_id || !address) {
      return res
        .status(400)
        .json({ message: "name, user_id and address are required" });
    }

    const registrationUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${registration_certificate_key}`;
    const licenseUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${professional_license_key}`;

    if (!registrationUrl || !licenseUrl) {
      return res.status(400).json({
        message:
          "Both registrationCertificate and professionalLicense files are required",
      });
    }

    let addressJson;
    try {
      addressJson = typeof address === "string" ? JSON.parse(address) : address;
    } catch (err) {
      return res.status(400).json({ message: "address must be valid JSON" });
    }

    const org = await createOrganization({
      name,
      type,
      phone: phone || null,
      userId: 1,
      address: addressJson,
      registrationCertificate: registrationUrl,
      professionalLicense: licenseUrl,
    });

    res.status(201).json(org);
  } catch (err) {
    console.error("createOrgHandler error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
