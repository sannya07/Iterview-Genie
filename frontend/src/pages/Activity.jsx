import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';

const DIFFICULTY_LEVELS = [
  { label: "Beginner", emoji: "🟢" },
  { label: "Easy", emoji: "😀" },
  { label: "Medium", emoji: "😎" },
  { label: "Hard", emoji: "🔥" },
  { label: "Hardcore", emoji: "💀" },
];

const getDifficultyObj = (label) => DIFFICULTY_LEVELS.find(d => d.label === label) || { label, emoji: "❓" };

const Activity = () => {
  const [attempts, setAttempts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchAttempts = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/quiz-attempts`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setAttempts(res.data.attempts || []);
      } catch (err) {
        console.error('Failed to fetch attempts', err);
      }
    };
    fetchAttempts();
  }, []);

  const openModal = (attempt) => {
    setSelected(attempt);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setSelected(null);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen p-6 relative text-white bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-20 left-20 w-96 h-96 bg-indigo-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-10 text-center pt-8">My Quiz Activity</h2>
          {attempts.length === 0 ? (
            <div className="text-gray-400 text-center">No quiz attempts yet.</div>
          ) : (
            <ul className="space-y-6">
              {attempts.map((a) => {
                const diff = getDifficultyObj(a.difficulty);
                return (
                  <li
                    key={a._id}
                    className="bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-700/50 p-6 flex flex-col sm:flex-row sm:items-center justify-between cursor-pointer hover:bg-gray-800/90 hover:border-blue-500 transition-all duration-200"
                    onClick={() => openModal(a)}
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-2xl">{diff.emoji}</span>
                        <span className="font-semibold text-lg text-blue-200">{a.topic}</span>
                        <span className="text-blue-400 text-sm font-medium px-2 py-1 rounded-full bg-blue-900/40 ml-2">{diff.label}</span>
                      </div>
                      <div className="text-gray-400 text-xs mt-1">{new Date(a.date).toLocaleString()}</div>
                    </div>
                    <div className="mt-4 sm:mt-0 font-bold text-blue-400 text-lg">Score: {a.score}</div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        {/* Modal */}
        {modalOpen && selected && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-gray-900 rounded-2xl shadow-2xl p-8 max-w-2xl w-full relative border border-blue-900">
              <button className="absolute top-2 right-2 text-gray-400 hover:text-blue-400 text-2xl" onClick={closeModal}>&times;</button>
              <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                <span>{getDifficultyObj(selected.difficulty).emoji}</span>
                <span>{selected.topic}</span>
                <span className="text-blue-400 text-base font-medium px-2 py-1 rounded-full bg-blue-900/40 ml-2">{getDifficultyObj(selected.difficulty).label}</span>
              </h3>
              <div className="mb-2 text-gray-400 text-sm">Date: {new Date(selected.date).toLocaleString()}</div>
              <div className="mb-4 font-semibold text-blue-300">Score: {selected.score}</div>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {selected.questions.map((q, i) => (
                  <div key={i} className="border-b border-gray-700 pb-2">
                    <div className="font-medium text-white">Q{i + 1}: {q.question}</div>
                    <ul className="ml-4 mt-1">
                      {q.options.map((opt, j) => (
                        <li key={j} className={`pl-2 ${q.answer === opt ? 'text-green-400 font-semibold' : ''} ${selected.userAnswers[i] === opt && q.answer !== opt ? 'text-red-400' : ''}`}>
                          {String.fromCharCode(65 + j)}. {opt}
                          {selected.userAnswers[i] === opt && q.answer === opt && <span className="ml-2 text-green-400">(Your answer, Correct)</span>}
                          {selected.userAnswers[i] === opt && q.answer !== opt && <span className="ml-2 text-red-400">(Your answer)</span>}
                          {selected.userAnswers[i] !== opt && q.answer === opt && <span className="ml-2 text-green-300">(Correct)</span>}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Activity;