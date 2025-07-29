import QuizAttempt from '../models/QuizAttempt.js';

// Save a new quiz attempt
export const createQuizAttempt = async (req, res) => {
  try {
    const { topic, difficulty, questions, userAnswers, score } = req.body;
    const user = req.user.userId;
    const attempt = await QuizAttempt.create({
      user,
      topic,
      difficulty,
      questions,
      userAnswers,
      score,
    });
    res.status(201).json({ success: true, attempt });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get all quiz attempts for the logged-in user
export const getUserQuizAttempts = async (req, res) => {
  try {
    const user = req.user.userId;
    const attempts = await QuizAttempt.find({ user }).sort({ date: -1 });
    res.json({ success: true, attempts });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}; 