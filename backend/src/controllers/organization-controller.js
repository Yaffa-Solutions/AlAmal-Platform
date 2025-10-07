import { createOrganization } from "../services/organization-service.js";
import { generatePresignedUrl } from "../services/s3-service.js";
import { z } from "zod";
import { getOrganizationById } from "../services/organization-service.js";

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

export const getOrgByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const org = await getOrganizationById(id);
    if (!org) return res.status(404).json({ message: "Organization not found" });
    res.json(org);
  } catch (err) {
    console.error("getOrgByIdHandler error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createOrgHandler = async (req, res) => {
  try {
    const AddressSchema = z.preprocess((val) => {
      if (typeof val === "string") {
        try {
          return JSON.parse(val);
        } catch {
          throw new Error("Invalid JSON for address");
        }
      }
      return val;
    }, z.object({}).passthrough());

    const OrganizationCreateSchema = z.object({
      name: z.string({ required_error: "name is required" }).min(1),
      type: z.string({ required_error: "type is required" }),
      phone: z.string().min(1, "phone is required"),
      address: AddressSchema,
      registration_certificate_key: z.string().optional(),
      professional_license_key: z.string().optional(),
    });

    const parsed = OrganizationCreateSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parsed.error.format(),
      });
    }

    const {
      name,
      type,
      phone,
      address,
      registration_certificate_key,
      professional_license_key,
    } = parsed.data;

    const org = await createOrganization({
      name,
      type,
      phone,
      userId: 1,
      address,
      registrationCertificate: registration_certificate_key,
      professionalLicense: professional_license_key,
    });

    res.status(201).json(org);
  } catch (err) {
    console.error("createOrgHandler error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
