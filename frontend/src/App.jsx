import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Login from './pages/login';
// import Home from './pages/Home';
import './App.css'
import RegisterComponent from './pages/RegisterComponent';
import LoginComponent from './pages/LoginComponent';
import Home from './pages/Home';
function App() {
  const [count, setCount] = useState(0)
  const token = localStorage.getItem("token");
  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<Navigate to={token ? "/home" : "/login"} />} />
        <Route path="/register" element={<RegisterComponent />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/home" element={token ? <Home /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
