import { getAllCampaigns } from "../services/displayCampaign.js";


export const getCampaigns = async (req, res, next) => {
    try {
        const campaigns = await getAllCampaigns();
        res.status(200).json(campaigns);
    } catch (err) {
        console.error("Error fetching campaigns:", err);
        next(err);
    }
}