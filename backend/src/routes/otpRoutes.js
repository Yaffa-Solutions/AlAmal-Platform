import express from 'express';
import {
  requestOTPController,
  verifyOTPController,
} from '../controllers/otp.js';

const router = express.Router();

router.post('/request', requestOTPController);
router.post('/verify', verifyOTPController);

export default router;
