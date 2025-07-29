import express from 'express';
import { getUserReport } from '../controllers/reportController.js';
import { authenticateToken } from '../middleware/protect.js';

const router = express.Router();

router.get('/', authenticateToken, getUserReport);

export default router; 