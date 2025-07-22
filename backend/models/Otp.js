import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  email: String,
  otp: String,
  expiresAt:{
    type:Date,
    default:()=> new Date(Date.now()+5*60*1000),
    index:{expires:'5m'}
  },
  hashedPassword: String,
  name: String
});

const Otp = mongoose.model("Otp", otpSchema);
export default Otp;
