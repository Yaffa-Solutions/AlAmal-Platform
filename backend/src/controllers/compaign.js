import { getAllCampaigns } from "../services/displayCampaign.js";
import { getSignedUrlForFile } from "../services/s3-service.js";


export const getCampaigns = async (req, res, next) => {
    try {
        const campaigns = await getAllCampaigns();        
            const campaignsWithUrls = await Promise.all(
              campaigns.map(async (c) => ({
                ...c,
                image: c.image ? await getSignedUrlForFile(c.image) : null,
              }))
            );
        
        res.status(200).json(campaignsWithUrls);
    } catch (err) {
        console.error("Error fetching campaigns:", err);
        next(err);
    }
}