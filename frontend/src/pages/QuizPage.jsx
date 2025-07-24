// pages/QuizPage.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const QuizPage = () => {
  const { topic } = useParams();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMCQs = async () => {
      try {
        const res = await axios.get(`/api/ai/mcq?topic=${topic}`);
        setQuestions(res.data.questions);
      } catch (err) {
        console.error("Failed to fetch MCQs", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMCQs();
  }, [topic]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">
        MCQs on {topic}
      </h1>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="space-y-6 max-w-3xl mx-auto">
          {questions.map((q, i) => (
            <div key={i} className="bg-white p-4 rounded shadow">
              <h2 className="font-semibold mb-2">{i + 1}. {q.question}</h2>
              <ul className="list-disc pl-5">
                {q.options.map((opt, j) => (
                  <li key={j}>{opt}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuizPage;
