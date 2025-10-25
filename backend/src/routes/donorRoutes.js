import express from 'express';
import { createDonorController } from '../controllers/donor.js';
import {getCampaigns } from '../controllers/compaign.js';
import { authenticateToken } from '../middlewares/authToken.js';
import { createDonationController } from '../controllers/donationController.js';
import { getMyDonationsController } from '../controllers/mydonationController.js';
const router = express.Router();

router.post('/form', authenticateToken, createDonorController);
router.get('/dashboard', authenticateToken, getCampaigns);
router.post('/donate', authenticateToken, createDonationController);
router.get('/my-donations', authenticateToken, getMyDonationsController);

export default router;