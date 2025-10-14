import express from 'express';
import {
  requestOTPController,
  verifyOTPController,
  verifyMagicLinkController

} from '../controllers/otp.js';

const router = express.Router();

router.post('/request', requestOTPController);
router.post('/verify', verifyOTPController);
router.post('/magic-link', verifyMagicLinkController);

export default router;
