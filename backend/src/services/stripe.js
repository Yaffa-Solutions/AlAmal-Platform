import Stripe from 'stripe';
import prisma from "../config/db.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createPayment = async (donor_id, campaigns_id,amount) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100,
            payment_method_types: ['card'],
            currency: 'usd',
        });
        const donation = await prisma.donations.create({
            data: {
                donor_id,
                campaigns_id,
                amount,
                paymentMethod: 'card',
                stripePaymentId: paymentIntent.id,

            }
        });
        const updatedCampaign  = await prisma.campaigns.update({
        where: { id: campaigns_id },
        data: {
            collected_amount:{
                increment: Number(amount)
            }
        }
    })
        return { paymentIntent, donation ,updatedCampaign};

    } catch (err) {
        console.error('createPayment error:', err);
        throw err;
    }
};
