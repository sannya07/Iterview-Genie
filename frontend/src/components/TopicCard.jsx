import { useNavigate } from "react-router-dom";

const TopicCard = ({ topic }) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white p-4 shadow-lg rounded-xl cursor-pointer hover:scale-105 transition"
      onClick={() => navigate(`/quiz/${topic}`)}
    >
      <h2 className="text-xl font-semibold">{topic}</h2>
    </div>
  );
};

export default TopicCard;
