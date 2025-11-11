import { createPayment } from "../services/stripe.js";
import { confirmDonation } from "../services/confirm-donation.js";

 const handleCreatePayment = async (req, res) => {
    try {
        const { amount } = req.body;

        if (!amount) {
            return res.status(400).json({ message: "Missing required fields" });

        }
        const { paymentIntent } = await createPayment(amount);

        res.status(200).json({
            message: "Payment created successfully",
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id,

        })


    } catch (err) {
        console.error('handleCreatePayment error:', err);
        res.status(500).json({ message: "failed to create payment", error: err.message });

    }
}
const handleConfirmDonation = async (req, res) => {
    try {
        const { donor_id, campaigns_id, amount, stripePaymentId } = req.body;

        if (!donor_id || !campaigns_id || !amount || !stripePaymentId) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const result = await confirmDonation(donor_id, campaigns_id, amount, stripePaymentId);

        res.status(200).json({
            message: "Donation confirmed successfully",
            donation: result.donation,
            updatedCampaign: result.updatedCampaign,
        });
    } catch (err) {
        console.error("handleConfirmDonation error:", err);
        res.status(500).json({ message: "Failed to confirm donation", error: err.message });
    }
};
export { handleCreatePayment, handleConfirmDonation };
