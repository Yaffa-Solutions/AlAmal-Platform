import prisma from "../config/db.js";

export const confirmDonation = async (donor_id, campaigns_id, amount, stripePaymentId) => {
    try {
        const donation = await prisma.donations.create({
            data: {
                donor_id,
                campaigns_id,
                amount,
                paymentMethod: 'card',
                stripePaymentId,

            }
        });
        const updatedCampaign = await prisma.campaigns.update({
            where: { id: campaigns_id },
            data: {
                collected_amount: {
                    increment: Number(amount)
                }
            }
        })
        return { donation, updatedCampaign }
    } catch (err) {
        console.error('confirmDonation error:', err);
        throw err;
    }
}