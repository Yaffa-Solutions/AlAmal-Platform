import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createPayment = async (amount) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100,
            payment_method_types: ['card'],
            currency: 'usd',
        });
       
        return { paymentIntent};

    } catch (err) {
        console.error('createPayment error:', err);
        throw err;
    }
};
