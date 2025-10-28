import { createDonation } from "../services/donationService.js";

export const createDonationController = async (req, res, next) => {
    try {
        const { campaigns_id, amount } = req.body;
        const donor_id = req.user.id;

        if (!campaigns_id || !amount) {
            return res.status(400).json({ message: "campaigns_id and amount are required" });
        }

        const donation = await createDonation(donor_id, campaigns_id, amount);
        res.status(201).json({ message: "Donation created successfully", donation });

    } catch (err) {
        console.error('error creating donation:', err);
        next(err);
    }

}