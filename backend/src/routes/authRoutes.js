import express from 'express';
import { logoutController } from '../controllers/logout.js';
const router = express.Router();

router.post('/', logoutController);

export default router;
