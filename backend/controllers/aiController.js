import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const mcqget = async (req, res) => {
  try {
    // Get topic, count, and difficulty from query params (with defaults)
    const topic = req.query.topic || "Java";
    const count = parseInt(req.query.count) || 10;
    const difficulty = req.query.difficulty || "Medium";

    // Prompt for Gemini to generate MCQs in clean JSON format
    const prompt = `
Generate ${count} multiple-choice questions on the topic "${topic}" programming.
Each question should include exactly 4 options and one correct answer.
The questions should be at the ${difficulty} difficulty level.
Return ONLY a raw JSON array (no markdown or explanation) in the following format:
[
  {
    "question": "Your question here?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "answer": "Correct Option"
  }
]
    `.trim();

    // Call Gemini Flash model
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    const rawText = response.text;

    // Clean the response to remove ```json ... ``` if present
    const cleanJson = rawText
      .replace(/^```json\s*/i, '')  // remove ```json
      .replace(/^```\s*/i, '')      // or just ```
      .replace(/```$/, '');         // remove trailing ```

    // Parse JSON safely
    let questions;
    try {
      questions = JSON.parse(cleanJson);
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to parse AI response as JSON.",
        raw: cleanJson,
      });
    }

    // Send structured response
    res.status(200).json({
      success: true,
      topic,
      totalQuestions: questions.length,
      questions,
    });
  } catch (error) {
    console.error("❌ Error generating MCQs:", error.message);
    res.status(500).json({
      success: false,
      message: "Something went wrong while generating MCQs.",
      error: error.message,
    });
  }
};
