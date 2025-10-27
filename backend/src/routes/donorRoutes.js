import express from 'express';
import { createDonorController } from '../controllers/donor.js';
import {getCampaigns } from '../controllers/compaign.js';
import { authenticateToken } from '../middlewares/authToken.js';
import { getMyDonationsController } from '../controllers/mydonationController.js';
import { handleCreatePayment } from '../controllers/payment.js';
const router = express.Router();

router.post('/form', authenticateToken, createDonorController);
router.get('/dashboard', authenticateToken, getCampaigns);
router.get('/my-donations', authenticateToken, getMyDonationsController);
router.post('/create-payment', authenticateToken, handleCreatePayment);


export default router;