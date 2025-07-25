import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const QuizPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const topic = searchParams.get("topic");

  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMCQs = async () => {
      try {
        const res = await axios.get(`/api/ai/mcq?topic=${encodeURIComponent(topic)}`);
        if (res.data?.questions?.length > 0) {
          setQuestions(res.data.questions);
        } else {
          console.error("No questions received");
        }
      } catch (err) {
        console.error("Failed to fetch MCQs", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMCQs();
  }, [topic]);

  const handleAnswer = (qIndex, selected) => {
    if (userAnswers[qIndex] !== undefined) return;
    const isCorrect = questions[qIndex]?.answer === selected;

    setUserAnswers((prev) => ({
      ...prev,
      [qIndex]: selected
    }));

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const getScoreColor = () => {
    if (questions.length === 0) return "bg-indigo-600";
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return "bg-emerald-600";
    if (percentage >= 60) return "bg-yellow-600";
    return "bg-red-600";
  };

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
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="relative">
                <div className="w-12 h-12 border-4 border-gray-700 border-t-indigo-500 rounded-full animate-spin"></div>
              </div>
              <p className="text-center text-lg text-gray-400 mt-6 animate-pulse">Loading...</p>
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
