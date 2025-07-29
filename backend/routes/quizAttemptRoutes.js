import express from 'express';
import { createQuizAttempt, getUserQuizAttempts } from '../controllers/quizAttemptController.js';
import { authenticateToken } from '../middleware/protect.js';

const router = express.Router();

// Save a new quiz attempt
router.post('/', authenticateToken, createQuizAttempt);
// Get all quiz attempts for the logged-in user
router.get('/', authenticateToken, getUserQuizAttempts);

export default router; 