import { createOrganization } from "../services/organization-service.js";
import { generatePresignedUrl } from "../services/s3-service.js";
import { z } from "zod";
import {
  getOrganizationById,
  getOrganizationByUserId,
} from "../services/organization-service.js";
import {
  getRecentCampaignsByOrg,
  getActiveCampaignsByOrg,
} from "../services/organization-service.js";

export const getUploadUrl = async (req, res) => {
  console.log(req.body);

  try {
    const { filename, contentType } = req.body;

    const { url, key } = await generatePresignedUrl(filename, contentType);
    res.json({ url, key });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to generate upload URL" });
  }
};

export const getRecentCampaignsHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { limit } = req.query;
    const items = await getRecentCampaignsByOrg(id, limit ?? 5);
    res.json(items);
  } catch (err) {
    console.error("getRecentCampaignsHandler error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getActiveCampaignsHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { limit } = req.query;
    const items = await getActiveCampaignsByOrg(id, limit ?? 3);
    res.json(items);
  } catch (err) {
    console.error("getActiveCampaignsHandler error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getOrgByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const org = await getOrganizationById(id);
    if (!org)
      return res.status(404).json({ message: "Organization not found" });
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
      user_id: z.union([z.string(), z.number()]),
      registrationCertificate: z.string().optional(),
      professionalLicense: z.string().optional(),
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
      user_id,
      registrationCertificate,
      professionalLicense,
    } = parsed.data;

    const org = await createOrganization({
      name,
      type,
      phone,
      user_id: Number(user_id),
      address,
      registrationCertificate,
      professionalLicense,
    });

    res.status(201).json(org);
    localStorage.setItem("orgId", org.id);
    localStorage.setItem("orgName", org.name);
  } catch (err) {
    console.error("createOrgHandler error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getOrgByUserHandler = async (req, res) => {
  try {
    const { userId } = req.params;
    const org = await getOrganizationByUserId(userId);

    if (!org) {
      return res.status(404).json({ message: "Organization not found" });
    }

    res.status(200).json(org);
  } catch (error) {
    console.error("Error fetching organization by user ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
