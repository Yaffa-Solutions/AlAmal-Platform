import {
  getRecentCampaigns,
  createCampaign,
  updateCampaign,
  deleteCampaign,
  getRecentCampaignsByOrg,
  getActiveCampaignsByOrg,
} from "../services/campaign-service.js";

import {
  generatePresignedUrl,
  getSignedUrlForFile,
} from "../services/s3-service.js";

export const getCampaignUploadUrl = async (req, res) => {
  try {
    const { filename, contentType } = req.body;
    if (!filename || !contentType)
      return res
        .status(400)
        .json({ message: "Filename and contentType required" });

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

export async function getActiveCampaignsHandler(req, res) {
  try {
    const orgId = req.params.id;
    const limit = parseInt(req.query.limit) || 3;

    const campaigns = await getActiveCampaignsByOrg(orgId, limit);

    const withUrls = await Promise.all(
      campaigns.map(async (c) => ({
        ...c,
        imageUrl: c.image ? await getSignedUrlForFile(c.image) : null,
      }))
    );

    res.json(withUrls);
  } catch (err) {
    console.error("Error fetching active campaigns:", err);
    res.status(500).json({ message: "خطأ في استرجاع الحملات" });
  }
}
export const getCampaignsHandler = async (req, res) => {
  try {
    const orgId = req.params.orgId;
    console.log("req.params", req.params);

    const campaigns = await getRecentCampaigns(orgId);

    const campaignsWithUrls = await Promise.all(
      campaigns.map(async (c) => ({
        ...c,
        imageUrl: c.image ? await getSignedUrlForFile(c.image) : null,
      }))
    );

    res.json(campaignsWithUrls);
  } catch (err) {
    console.error("❌ Error fetching campaigns:", err);
    res.status(500).json({ message: "خطأ في جلب الحملات" });
  }
};

export const createCampaignHandler = async (req, res) => {
  try {
    const data = {
      ...req.body,
      collected_amount: req.body.collected_amount || 0,
      status: req.body.status || "ACTIVE",
      start_date: new Date(req.body.start_date),
      end_date: new Date(req.body.end_date),
    };

    const newCampaign = await createCampaign(data);
    res.status(201).json(newCampaign);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create campaign" });
  }
};

export const updateCampaignHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const updated = await updateCampaign(id, req.body);
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update campaign" });
  }
};

export const deleteCampaignHandler = async (req, res) => {
  try {
    const id = req.params.id;
    await deleteCampaign(id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete campaign" });
  }
};
