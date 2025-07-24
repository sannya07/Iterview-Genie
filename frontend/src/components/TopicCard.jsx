import React from 'react';
import { useNavigate } from 'react-router-dom';

const TopicCard = ({ topic }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/quiz?topic=${encodeURIComponent(topic)}`);
  };

  return (
    <div 
      onClick={handleClick}
      className="group cursor-pointer relative overflow-hidden rounded-3xl shadow-xl p-8 text-center transition-all duration-500 ease-in-out transform hover:scale-[1.02] hover:-translate-y-2"
      style={{
        background: 'linear-gradient(135deg, #000C66 0%, #050A30 100%)',
        boxShadow: '0 8px 32px rgba(0, 12, 102, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
      }}
    >
      {/* Glassmorphic overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Animated border glow */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
           style={{
             background: 'linear-gradient(135deg, #0000FF, #000C66, #0000FF)',
             padding: '2px',
             WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
             WebkitMaskComposite: 'xor',
             maskComposite: 'exclude'
           }}>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <h2 className="text-2xl font-bold text-white group-hover:text-blue-100 transition-colors duration-300">
          {topic}
        </h2>
        
        {/* Subtle accent line */}
        <div className="w-0 group-hover:w-16 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto mt-4 transition-all duration-500 ease-out"></div>
      </div>
      
      {/* Floating particles effect */}
      <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-60 transition-all duration-700 group-hover:animate-pulse"></div>
      <div className="absolute bottom-6 left-6 w-1 h-1 bg-blue-300 rounded-full opacity-0 group-hover:opacity-40 transition-all duration-500 delay-200"></div>
    </div>
  );
};

export default TopicCard;