import { getMyDonationsService } from "../services/myDonations.js";

export const getMyDonationsController = async (req, res, next) => {
    try {
        const donor_id = req.user.id;
        const donations = await getMyDonationsService(donor_id);
        res.status(200).json({ donations });
    } catch (err) {
        console.error('error fetching my donations:', err);
        next(err);
    }
}