import express from "express";
import {register,login, verifyOtp} from "../controllers/authController.js";
import jwt from 'jsonwebtoken';
import { authenticateToken } from "../middleware/protect.js";


const router=express.Router();

router.post("/register", register);
router.post("/login",login);
router.post("/verify-otp", verifyOtp);

router.get('/home',authenticateToken,(req,res)=>{
    res.json({message:`Welcome user ${req.user.userId}`})
})
export default router;