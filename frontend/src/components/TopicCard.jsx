import React from 'react';
import { useNavigate } from 'react-router-dom';

const TopicCard = ({ topic, description }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/quiz/${encodeURIComponent(topic)}`); // ✅ Fixed
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer bg-[#000C66] hover:bg-[#0000FF] border-white text-white rounded-2xl shadow-lg p-6 text-center transition duration-300 ease-in-out transform hover:scale-105"
    >
      <h2 className="text-2xl font-semibold mb-2">{topic}</h2>
      <p className="text-sm text-blue-200">{description}</p>
    </div>
  );
};

export default TopicCard;
