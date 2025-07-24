import express from "express";
import { mcqget } from "../controllers/aiController.js";
import { authenticateToken } from "../middleware/protect.js";
import jwt from 'jsonwebtoken';

const router=express.Router();

router.get('/mcq',mcqget);
// router.get('/mcq',authenticateToken,mcqget);

export default router;