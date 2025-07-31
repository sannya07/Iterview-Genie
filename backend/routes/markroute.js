import express from "express";
import { addMarks, getMarks } from '../controllers/markController.js';
import { authenticateToken } from "../middleware/protect.js";
const router = express.Router();


router.post('/marks', authenticateToken, addMarks);
router.get('/marks', authenticateToken, getMarks);

export default router;