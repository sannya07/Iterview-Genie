import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { isTokenExpired } from '../utils/tokenUtils'
import Navbar from '../components/Navbar';
import TopicCard from '../components/TopicCard';

const Home = () => {
  const navigate=useNavigate();

  useEffect(()=>{
    if(isTokenExpired()){
      localStorage.removeItem('token');
      navigate('/login');
    }
  },[navigate]);

  const topics=["Java", "Python", "JavaScript", "C++", "React", "DBMS"]
  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Choose a Topic</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {topics.map((topic, index) => (
          <TopicCard key={index} topic={topic} />
        ))}
      </div>
    </div>
    </>
  )
}

export default Home