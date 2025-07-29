import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import jsPDF from "jspdf";

const DIFFICULTY_LEVELS = [
  { label: "Beginner", emoji: "🟢" },
  { label: "Easy", emoji: "😀" },
  { label: "Medium", emoji: "😎" },
  { label: "Hard", emoji: "🔥" },
  { label: "Hardcore", emoji: "💀" },
];

const QuizPage = () => {
  const { topic } = useParams();
  const navigate = useNavigate();

  const [difficulty, setDifficulty] = useState(2); // Default to Medium
  const [difficultySelected, setDifficultySelected] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [aiError, setAiError] = useState("");

  // Fetch MCQs only after difficulty is selected
  useEffect(() => {
    if (!difficultySelected) return;
    const fetchMCQs = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/ai/mcq?topic=${encodeURIComponent(topic)}&difficulty=${DIFFICULTY_LEVELS[difficulty].label}`);
        if (res.data?.questions?.length > 0) {
          setQuestions(res.data.questions);
          setAiError("");
        } else {
          setAiError("No questions received for this topic.");
          console.error("No questions received");
        }
      } catch (err) {
        let msg = "Failed to fetch MCQs. Please try again.";
        if (err.response && err.response.data && err.response.data.message) {
          if (err.response.data.message.includes("model is overloaded") || err.response.status === 503) {
            msg = "The quiz generator is busy right now. Please try again in a few minutes.";
          } else {
            msg = err.response.data.message;
          }
        }
        setAiError(msg);
        console.error("Failed to fetch MCQs", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMCQs();
  }, [topic, difficultySelected, difficulty]);

  // Save quiz attempt when finished
  useEffect(() => {
    if (questions.length > 0 && Object.keys(userAnswers).length === questions.length) {
      const saveAttempt = async () => {
        try {
          await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/quiz-attempts`, {
            topic,
            difficulty: DIFFICULTY_LEVELS[difficulty].label,
            questions: questions.map(q => ({ question: q.question, options: q.options, answer: q.answer })),
            userAnswers: Object.values(userAnswers),
            score,
          }, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
        } catch (err) {
          console.error('Failed to save quiz attempt', err);
        }
      };
      saveAttempt();
    }
    // eslint-disable-next-line
  }, [userAnswers, questions, score, difficulty, topic]);

  const handleAnswer = (qIndex, selected) => {
    if (userAnswers[qIndex] !== undefined) return;
    const isCorrect = questions[qIndex]?.answer === selected;
    setUserAnswers((prev) => ({ ...prev, [qIndex]: selected }));
    if (isCorrect) setScore((prev) => prev + 1);
  };

  const getScoreColor = () => {
    if (questions.length === 0) return "bg-indigo-600";
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return "bg-emerald-600";
    if (percentage >= 60) return "bg-yellow-600";
    return "bg-red-600";
  };

  // PDF download logic remains unchanged
  const handleDownloadQuiz = () => {
    if (!questions.length) return;
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth() - 20;
    let y = 15;
    doc.setFontSize(16);
    doc.text(`Quiz on ${topic || ''} (${DIFFICULTY_LEVELS[difficulty].label})`, 10, y);
    y += 10;
    doc.setFontSize(12);
    questions.forEach((q, idx) => {
      if (y > 270) { doc.addPage(); y = 15; }
      const questionLines = doc.splitTextToSize(`${idx + 1}. ${q.question}`, pageWidth);
      doc.text(questionLines, 10, y);
      y += questionLines.length * 8;
      q.options.forEach((opt, i) => {
        if (y > 270) { doc.addPage(); y = 15; }
        const optionLines = doc.splitTextToSize(`   ${String.fromCharCode(65 + i)}. ${opt}`, pageWidth - 4);
        doc.text(optionLines, 14, y);
        y += optionLines.length * 7;
      });
      if (y > 270) { doc.addPage(); y = 15; }
      doc.setTextColor(34, 139, 34);
      const answerLines = doc.splitTextToSize(`   Correct Answer: ${q.answer}`, pageWidth - 4);
      doc.text(answerLines, 14, y);
      doc.setTextColor(0, 0, 0);
      y += answerLines.length * 10;
    });
    doc.save(`quiz_${topic || 'download'}_${DIFFICULTY_LEVELS[difficulty].label}.pdf`);
  };

  // Show difficulty selection if not selected yet
  if (!difficultySelected) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 p-6">
          <div className="bg-white/10 p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
            <h2 className="text-2xl font-bold mb-6 text-white">Select Difficulty</h2>
            <div className="flex flex-col items-center mb-6">
              <input
                type="range"
                min={0}
                max={DIFFICULTY_LEVELS.length - 1}
                value={difficulty}
                onChange={e => setDifficulty(Number(e.target.value))}
                className="w-64 accent-blue-600"
                style={{ background: 'linear-gradient(90deg, #22c55e, #facc15, #ef4444)' }}
              />
              <div className="flex justify-between w-64 mt-2">
                {DIFFICULTY_LEVELS.map((d, i) => (
                  <div key={d.label} className={`flex flex-col items-center text-xs ${i === difficulty ? 'font-bold text-blue-400' : 'text-gray-400'}`}>
                    <span style={{ fontSize: 24 }}>{d.emoji}</span>
                    <span>{d.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={() => setDifficultySelected(true)}
              className="mt-4 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow-lg transition-all duration-300"
            >
              Start Quiz
            </button>
          </div>
        </div>
      </>
    );
  }

  // Quiz UI (existing code, but add difficulty display)
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 p-6 relative">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-96 h-96 bg-indigo-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-full mb-4 shadow-lg">
              <span className="text-2xl">✨</span>
            </div>
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
              Quiz on {topic}
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-blue-500 mx-auto rounded-full"></div>
            <div className="mt-4 text-lg font-semibold text-blue-300 flex items-center justify-center gap-2">
              <span style={{ fontSize: 22 }}>{DIFFICULTY_LEVELS[difficulty].emoji}</span>
              <span>Difficulty: {DIFFICULTY_LEVELS[difficulty].label}</span>
            </div>
            {questions.length > 0 && (
              <button
                onClick={handleDownloadQuiz}
                className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow-lg transition-all duration-300"
              >
                Download Quiz
              </button>
            )}
          </div>
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="relative">
                <div className="w-12 h-12 border-4 border-gray-700 border-t-indigo-500 rounded-full animate-spin"></div>
              </div>
              <p className="text-center text-lg text-gray-400 mt-6 animate-pulse">Loading...</p>
            </div>
          ) : aiError ? (
            <div className="text-center text-red-400 text-lg font-semibold mt-10">
              {aiError}
            </div>
          ) : questions.length === 0 ? (
            <div className="text-center text-red-400 text-lg font-semibold mt-10">
              No questions found for this topic.
            </div>
          ) : (
            <div className="space-y-8 max-w-4xl mx-auto">
              {questions.map((q, i) => (
                <div
                  key={i}
                  className="bg-gray-800/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-gray-700/50 shadow-xl hover:shadow-2xl hover:bg-gray-800/90 hover:border-gray-600/50"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                      {i + 1}
                    </div>
                    <h2 className="font-semibold text-lg sm:text-xl text-gray-100 leading-relaxed">
                      {q.question}
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ml-12">
                    {q.options.map((opt, j) => {
                      const selected = userAnswers[i];
                      const isCorrect = q.answer === opt;
                      const isSelected = selected === opt;
                      let buttonClasses =
                        "bg-gray-700/50 border-gray-600 text-gray-200 hover:bg-gray-600/60 hover:border-gray-500";
                      if (selected !== undefined) {
                        if (isSelected && isCorrect) {
                          buttonClasses =
                            "bg-emerald-600/20 border-emerald-500 text-emerald-200 shadow-emerald-500/25";
                        } else if (isSelected && !isCorrect) {
                          buttonClasses =
                            "bg-red-600/20 border-red-500 text-red-200 shadow-red-500/25";
                        } else if (isCorrect) {
                          buttonClasses =
                            "bg-emerald-600/10 border-emerald-600/50 text-emerald-300";
                        } else {
                          buttonClasses =
                            "bg-gray-700/30 border-gray-600/50 text-gray-400";
                        }
                      }
                      return (
                        <button
                          key={j}
                          onClick={() => handleAnswer(i, opt)}
                          className={`px-4 py-3 rounded-xl border-2 text-left font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 disabled:cursor-not-allowed shadow-lg ${buttonClasses}`}
                          disabled={selected !== undefined}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {userAnswers[i] !== undefined && (
                    <div className="mt-6 ml-12 animate-fadeIn">
                      {userAnswers[i] === q.answer ? (
                        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-600/10 border border-emerald-600/30 rounded-lg">
                          <span className="text-emerald-400 text-lg">✅</span>
                          <span className="text-emerald-300 font-semibold text-sm">
                            Correct
                          </span>
                        </div>
                      ) : (
                        <div className="px-4 py-2 bg-red-600/10 border border-red-600/30 rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-red-400 text-lg">❌</span>
                            <span className="text-red-300 font-semibold text-sm">
                              Incorrect
                            </span>
                          </div>
                          <span className="text-red-200/80 text-sm">
                            Correct answer:{" "}
                            <span className="font-bold text-red-200">
                              {q.answer}
                            </span>
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          {/* Score and Go Back */}
          {!loading && questions.length > 0 && (
            <div className="mt-12 flex flex-col items-center gap-6">
              <div
                className={`inline-flex items-center gap-3 px-8 py-4 ${getScoreColor()} text-white rounded-full shadow-xl text-xl font-bold transition-all duration-300 hover:scale-105`}
              >
                <span className="text-2xl">🏆</span>
                <span>
                  Final Score: {score} / {questions.length}
                </span>
              </div>
              <button
                onClick={() => navigate("/home")}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full font-semibold transition-all shadow-lg"
              >
                ← Go Back to Home
              </button>
            </div>
          )}
        </div>
        {/* CSS Keyframes Animation */}
        <style>
          {`
            @keyframes fadeIn {
              from {
                opacity: 0;
                transform: translateY(10px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            .animate-fadeIn {
              animation: fadeIn 0.4s ease-out;
            }
          `}
        </style>
      </div>
    </>
  );
};

export default QuizPage;
