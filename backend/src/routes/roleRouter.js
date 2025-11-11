import express from 'express'
import {assignRoleController } from '../controllers/role.js'
import {authenticateToken} from '../middlewares/authToken.js'

const router = express.Router()

router.post('/assign-role', authenticateToken, assignRoleController)

export default router;
