import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { store } from './utils/store.js';
import { Provider } from 'react-redux';
import RegisterComponent from './pages/RegisterComponent';
import LoginComponent from './pages/LoginComponent';
import Home from './pages/Home';
import Activity from './pages/Activity.jsx';
import Profile from './pages/Profile.jsx';
import Report from './pages/Report.jsx';
import './App.css';

function App() {
  const token = localStorage.getItem("token");

  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Navigate to={token ? "/home" : "/login"} />} />
        <Route path="/register" element={<RegisterComponent />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/home" element={token ? <Home /> : <Navigate to="/login" />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/report" element={<Report />} />
      </Routes>
    </Provider>
  );
}

export default App;
