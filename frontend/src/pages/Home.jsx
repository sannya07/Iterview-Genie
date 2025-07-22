import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { isTokenExpired } from '../utils/tokenUtils'
import Navbar from '../components/Navbar';

const Home = () => {
  const navigate=useNavigate();

  useEffect(()=>{
    if(isTokenExpired()){
      localStorage.removeItem('token');
      navigate('/login');
    }
  },[navigate]);

  return (
    <>
    <Navbar/>
    <div>Welcome to Home</div>
    </>
  )
}

export default Home