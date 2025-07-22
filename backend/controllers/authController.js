import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendEmail } from '../utils/sendEmail.js';
import { generateOTP } from '../utils/generateOTP.js';
import Otp from "../models/Otp.js";
import {emailcheck}  from  "../utils/useValidateEmail.js";
import { passwordcheck } from "../utils/useValidatePassword.js";


export const verifyOtp=async(req,res)=>{
    const {name,email,password,otp}=req.body;
    try{
        emailcheck(email);
        passwordcheck(password);
        const existingOtp=await Otp.findOne({email});
        if(!existingOtp){
            return res.status(400).json({error:"Otp not found, Please register again"});
        }
        if(existingOtp.otp!==otp){
            return res.status(401).json({error:"Invalid Otp"});
        }
        if(existingOtp.expiresAt<new Date()){
            await Otp.deleteOne({email});
            return res.status(410).json({error:"OTP has expired"})
        }
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(409).json({error:"User already exists"})
        }
        const user=await User.create({name:existingOtp.name,email,password:existingOtp.hashedPassword});
        await Otp.deleteOne({email});
        res.status(201).json({ message: "User verified and registered successfully", user });
    }catch(err){
        console.error("OTP verification error:", err);
        res.status(500).json({ error: "OTP verification failed" });
    }
}
export const register=async(req,res)=>{
    const {name,email,password}=req.body;
    try{
        emailcheck(email);
        passwordcheck(password);
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({error:"User already exists!"})
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const otpCode=generateOTP();
        const expiresAt=new Date(Date.now()+5*60*1000);

        await Otp.deleteMany({email});
        await Otp.create({
            email,
            otp:otpCode,
            expiresAt,
            hashedPassword,
            name
        });
        await sendEmail(email,"Your OTP Code", `Your OTP is: ${otpCode}`);
        res.status(200).json({
            message:"OTP sent to email",
        })

        // const user=await User.create({
        //     name,email,password:hashedPassword
        // })
        // res.status(201).json({message:"User registered", user});
    
    }catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: "Something went wrong" });
}
};

export const login=async(req,res)=>{
    const {email,password}=req.body;
    try{
        emailcheck(email);
        passwordcheck(password);
        const user=await User.findOne({email});
        if(!user){
            return res.status(404).json({error:"User not found"});
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({error:"Invalid credentials"});
        }
        const token=jwt.sign({userId:user._id}, process.env.JWT_SECRET,{expiresIn: "24h"});
        res.cookie("token",token);
        res.json({
            user:{
                name:user.name,
                email:user.email,
            },
        })
    }catch(err){
        res.status(500).json({ error: err.message});
    }
}