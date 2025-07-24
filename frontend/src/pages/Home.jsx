import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isTokenExpired } from '../utils/tokenUtils';
import Navbar from '../components/Navbar';
import TopicCard from '../components/TopicCard';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isTokenExpired()) {
      localStorage.removeItem('token');
      navigate('/login');
    }
  }, [navigate]);

  const topics = [
    { name: "Java", desc: "Object-oriented programming for backend and Android" },
    { name: "Python", desc: "Beginner-friendly scripting and data science tool" },
    { name: "JavaScript", desc: "Dynamic web programming for the browser" },
    { name: "C++", desc: "Powerful low-level programming for system-level work" },
    { name: "React", desc: "Popular frontend library for building UIs" },
    { name: "DBMS", desc: "Core concepts of database management systems" },
    { name: "Computer Networks", desc: "Study of internet, protocols, and communication" },
    { name: "Numerical Aptitude", desc: "Quantitative aptitude for placement & exams" },
    { name: "SQL", desc: "Structured Query Language for database operations" },
  ];

  return (
    <>
      <Navbar />
      <div 
        className="min-h-screen p-6 text-white relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #050A30 0%, #000C66 50%, #050A30 100%)',
        }}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-10 w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-700"></div>
          <div className="absolute -bottom-20 left-1/2 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        </div>

        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(0, 0, 255, 0.3) 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }}
        ></div>

        {/* Main content */}
        <div className="relative z-10">
          <div className="text-center mb-16 pt-8">
            <div className="inline-block relative">
              <h1 
                className="text-6xl font-black mb-4 tracking-tight"
                style={{
                  background: 'linear-gradient(135deg, #0000FF 0%, #ffffff 50%, #0000FF 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 4px 8px rgba(0, 0, 255, 0.3))'
                }}
              >
                Choose a Topic
              </h1>
              <div className="w-32 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto"></div>
            </div>

            <p className="text-xl text-blue-100 mt-6 font-light max-w-2xl mx-auto leading-relaxed">
              Select your preferred programming language or technology to start your academic journey
            </p>
          </div>

          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
              {topics.map((topic, index) => (
                <div
                  key={index}
                  className="transform transition-all duration-300"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: 'fadeInUp 0.6s ease-out forwards'
                  }}
                >
                  <TopicCard topic={topic.name} description={topic.desc} />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-20 text-center">
            <div className="inline-flex items-center space-x-2 text-blue-300 text-sm font-medium">
              <div className="w-8 h-px bg-gradient-to-r from-transparent to-blue-400"></div>
              <span>Ready to test your skills?</span>
              <div className="w-8 h-px bg-gradient-to-l from-transparent to-blue-400"></div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default Home;