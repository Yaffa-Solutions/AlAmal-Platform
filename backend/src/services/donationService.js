import prisma from "../config/db.js";

export const createDonation = async (donor_id, campaigns_id, amount) => {

    const donation = await prisma.donations.create({
        data:{
            donor_id,
            campaigns_id,
            amount:Number(amount)
        },
    });

    await prisma.campaigns.update({
        where: { id: campaigns_id },
        data: {
            collected_amount:{
                increment: Number(amount)
            }
        }
    })
    return donation;
}