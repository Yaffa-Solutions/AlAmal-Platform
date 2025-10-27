import { createPayment } from "../services/stripe.js";

export const handleCreatePayment = async(req,res)=>{
    try {
        const { donor_id, campaigns_id, amount } = req.body;

        if(!donor_id || !campaigns_id || !amount){
            return res.status(400).json({message: "Missing required fields"});

        }
        const { paymentIntent, donation } = await createPayment(donor_id, campaigns_id, amount);

        res.status(200).json({
            message: "Payment created successfully",
            clientSecret: paymentIntent.client_secret,
            donation
        })
        
        
    } catch (err) {
        console.error('handleCreatePayment error:', err);
        res.status(500).json({message: "failed to create payment",error: err.message});
        
    }
}
