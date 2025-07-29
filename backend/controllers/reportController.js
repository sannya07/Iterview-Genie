import QuizAttempt from '../models/QuizAttempt.js';

export const getUserReport = async (req, res) => {
  try {
    const user = req.user.userId;
    const { startDate, endDate, topic, difficulty } = req.query;
    const filter = { user };
    if (topic) filter.topic = topic;
    if (difficulty) filter.difficulty = difficulty;
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }
    const attempts = await QuizAttempt.find(filter).sort({ date: -1 });
    // Numerical stats
    const totalQuizzes = attempts.length;
    const totalQuestions = attempts.reduce((sum, a) => sum + (a.questions?.length || 0), 0);
    const averageScore = totalQuizzes ? (attempts.reduce((sum, a) => sum + a.score, 0) / totalQuizzes).toFixed(2) : 0;
    const bestScore = attempts.reduce((max, a) => Math.max(max, a.score), 0);
    // Score per topic
    const topicStats = {};
    const difficultyStats = {};
    attempts.forEach(a => {
      topicStats[a.topic] = topicStats[a.topic] || { quizzes: 0, totalScore: 0 };
      topicStats[a.topic].quizzes++;
      topicStats[a.topic].totalScore += a.score;
      difficultyStats[a.difficulty] = difficultyStats[a.difficulty] || { quizzes: 0, totalScore: 0 };
      difficultyStats[a.difficulty].quizzes++;
      difficultyStats[a.difficulty].totalScore += a.score;
    });
    // Progress over time
    const progress = attempts.map(a => ({ date: a.date, score: a.score }));
    // Recent attempts
    const recentAttempts = attempts.slice(0, 10).map(a => ({
      topic: a.topic,
      difficulty: a.difficulty,
      score: a.score,
      date: a.date,
    }));
    res.json({
      totalQuizzes,
      totalQuestions,
      averageScore: Number(averageScore),
      bestScore,
      topicStats,
      difficultyStats,
      progress,
      recentAttempts,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}; 