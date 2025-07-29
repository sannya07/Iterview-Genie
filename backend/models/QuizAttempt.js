import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [String],
  answer: { type: String, required: true },
});

const QuizAttemptSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  topic: { type: String, required: true },
  difficulty: { type: String, required: true },
  questions: [QuestionSchema],
  userAnswers: [{ type: String }], // index matches questions
  score: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

export default mongoose.model('QuizAttempt', QuizAttemptSchema); 