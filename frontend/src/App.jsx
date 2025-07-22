import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import {store} from './utils/store.js';
import { Provider } from 'react-redux';
import RegisterComponent from './pages/RegisterComponent';
import LoginComponent from './pages/LoginComponent';
import Home from './pages/Home';
import './App.css';

function App() {
  const token = localStorage.getItem("token");

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to={token ? "/home" : "/login"} />} />
          <Route path="/register" element={<RegisterComponent />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/home" element={token ? <Home /> : <Navigate to="/login" />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
