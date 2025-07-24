import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config()

const ai = new GoogleGenAI({ apiKey:  process.env.API_KEY});

export const mcqget = async(req,res)=>{
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: "Java ?",
  });
  res.json(response.text);
}

