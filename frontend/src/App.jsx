import { Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store  from './utils/store.js';
import RegisterComponent from './pages/RegisterComponent';
import LoginComponent from './pages/LoginComponent';
import Home from './pages/Home';
import Activity from './pages/Activity.jsx';
import Profile from './pages/Profile.jsx';
import Report from './pages/Report.jsx';
import QuizPage from './pages/QuizPage.jsx';
import LandingPage from './pages/LandingPage.jsx';
import UpdateProfile from './pages/update-profile.jsx';
import './App.css';
import Contact from './pages/Contact.jsx';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterComponent />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path='/contact' element={<Contact/>}/>
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/activity"
          element={
            <ProtectedRoute>
              <Activity />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
        path='/update-profile'
        element={
          <ProtectedRoute>
            <UpdateProfile />
          </ProtectedRoute>
        }
        />
        <Route
          path="/report"
          element={
            <ProtectedRoute>
              <Report />
            </ProtectedRoute>
          }
        />
        <Route
          path="/quiz/:topic"
          element={
            <ProtectedRoute>
              <QuizPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Provider>
  );
}

export default App;
