import express from 'express';
import { createDonorController } from '../controllers/donor.js';
import { authenticateToken } from '../middlewares/authToken.js';

const router = express.Router();

router.post('/form', authenticateToken, createDonorController);

export default router;