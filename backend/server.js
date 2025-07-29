import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import airoute from "./routes/airoute.js";
import quizAttemptRoutes from './routes/quizAttemptRoutes.js';
import reportRoutes from './routes/reportRoutes.js';

dotenv.config();

const app = express();
app.use(cors({
  origin: "https://iterview-genie.vercel.app/", // Reflects the request origin
  credentials: true,
}));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/ai", airoute);
app.use("/api/quiz-attempts", quizAttemptRoutes);
app.use("/api/quiz-report", reportRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(5500, () => {
      console.log("✅ Server running at http://localhost:5500");
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));
