import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, User, Mail, Lock, CheckCircle, AlertCircle, Shield, Clock, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar2 from '../components/Navbar2';

const RegisterComponent = () => {

  const navigate=useNavigate()
  
  const [currentStep, setCurrentStep] = useState('register'); // 'register' or 'otp'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    otp: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [focusedField, setFocusedField] = useState('');
  const [countdown, setCountdown] = useState(0);


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear messages when user starts typing
    if (message.text) {
      setMessage({ type: '', text: '' });
    }
  };

  const handleRegister = async (e) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'OTP sent to your email! Please check your inbox.' });
        setCurrentStep('otp');
        setCountdown(300); // 5 minutes countdown
      } else {
        setMessage({ type: 'error', text: data.error || 'Registration failed' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'Account created successfully! Redirecting...' });
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setMessage({ type: 'error', text: data.error || 'OTP verification failed' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (countdown > 0) return;
    
    setIsLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'New OTP sent to your email!' });
        setCountdown(300); // Reset 5 minutes countdown
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to resend OTP' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: error.message});
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const FloatingBubble = ({ size, delay, duration, left, top }) => (
    <div
      className="absolute rounded-full opacity-20 animate-pulse"
      style={{
        width: size,
        height: size,
        left: left,
        top: top,
        background: 'linear-gradient(45deg, #000C66, #0000FF)',
        animation: `float ${duration}s ease-in-out infinite ${delay}s, pulse 2s ease-in-out infinite`,
      }}
    />
  );

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4" style={{ background: 'linear-gradient(135deg, #050A30 0%, #000C66 50%, #0000FF 100%)' }}>
      <Navbar2/>
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <FloatingBubble size="100px" delay="0" duration="6" left="10%" top="20%" />
        <FloatingBubble size="150px" delay="2" duration="8" left="80%" top="10%" />
        <FloatingBubble size="80px" delay="4" duration="7" left="70%" top="70%" />
        <FloatingBubble size="120px" delay="1" duration="9" left="20%" top="80%" />
        <FloatingBubble size="60px" delay="3" duration="5" left="90%" top="50%" />
        <FloatingBubble size="200px" delay="0" duration="12" left="50%" top="30%" />
        
        {/* Animated waves */}
        <div className="absolute bottom-0 left-0 w-full h-32 opacity-30">
          <svg className="w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path
              d="M0,0V46.29C47.79,22.44,103.59,52.52,158.44,52.52S314.09,22.44,369.44,46.29s103.59,30.25,158.44,0,103.59-30.25,158.44-6.4,103.59,52.52,158.44,22.27S947.21,22.44,1002.56,46.29,1200,76.54,1200,46.29V0Z"
              fill="#7ec8e3"
              className="animate-bounce"
              style={{
                animation: 'wave 10s ease-in-out infinite'
              }}
            />
          </svg>
        </div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-md">
        <div 
          className="backdrop-blur-lg bg-white/10 bg-opacity-10 rounded-3xl shadow-2xl p-8 border border-white border-opacity-20"
          style={{
            animation: 'slideUp 0.8s ease-out',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
          }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            {currentStep === 'otp' && (
              <button
                onClick={() => setCurrentStep('register')}
                className="absolute left-6 top-6 text-blue-300 hover:text-blue-200 transition-colors duration-200"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
            )}
            
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 mb-4 shadow-lg">
              {currentStep === 'register' ? (
                <User className="w-8 h-8 text-white" />
              ) : (
                <Shield className="w-8 h-8 text-white" />
              )}
            </div>
            
            <h1 className="text-3xl font-bold text-white mb-2">
              {currentStep === 'register' ? 'Create Account' : 'Verify OTP'}
            </h1>
            
            <p className="text-blue-200" style={{ color: '#7ec8e3' }}>
              {currentStep === 'register' 
                ? 'Join us and start your journey' 
                : `Enter the 6-digit code sent to ${formData.email}`
              }
            </p>
          </div>

          {/* Message Display */}
          {message.text && (
            <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${
              message.type === 'success' 
                ? 'bg-green-500 bg-opacity-20 text-green-100 border border-green-400 border-opacity-30' 
                : 'bg-red-500 bg-opacity-20 text-red-100 border border-red-400 border-opacity-30'
            }`}
            style={{ animation: 'slideDown 0.5s ease-out' }}>
              {message.type === 'success' 
                ? <CheckCircle className="w-5 h-5 text-green-400" />
                : <AlertCircle className="w-5 h-5 text-red-400" />
              }
              <span className="text-sm">{message.text}</span>
            </div>
          )}

          {/* Registration Form */}
          {currentStep === 'register' && (
            <div className="space-y-6">
              {/* Name Field */}
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
                  <User className={`w-5 h-5 transition-colors duration-200 ${
                    focusedField === 'name' ? 'text-blue-400' : 'text-blue-300'
                  }`} />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField('')}
                  placeholder="Full Name"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-opacity-10 border bg-white/5 border-white border-opacity-20 rounded-xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                  style={{
                    boxShadow: focusedField === 'name' ? '0 0 20px rgba(0, 12, 102, 0.5)' : 'none'
                  }}
                />
              </div>

              {/* Email Field */}
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
                  <Mail className={`w-5 h-5 transition-colors duration-200 ${
                    focusedField === 'email' ? 'text-blue-400' : 'text-blue-300'
                  }`} />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField('')}
                  placeholder="Email Address"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-opacity-10 border bg-white/5 border-white border-opacity-20 rounded-xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                  style={{
                    boxShadow: focusedField === 'email' ? '0 0 20px rgba(0, 12, 102, 0.5)' : 'none'
                  }}
                />
              </div>

              {/* Password Field */}
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
                  <Lock className={`w-5 h-5 transition-colors duration-200 ${
                    focusedField === 'password' ? 'text-blue-300' : 'text-blue-300'
                  }`} style={{ color: focusedField === 'password' ? '#7ec8e3' : '#93c5fd' }} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField('')}
                  placeholder="Password"
                  required
                  className="w-full pl-12 pr-12 py-4 bg-white/5 bg-opacity-10 border border-white border-opacity-20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                  style={{
                    boxShadow: focusedField === 'password' ? '0 0 20px rgba(126, 200, 227, 0.5)' : 'none'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-300 hover:text-blue-300 transition-colors duration-200"
                  style={{ color: '#7ec8e3' }}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {/* Submit Button */}
              <div
                onClick={handleRegister}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none cursor-pointer text-center"
                style={{
                  background: 'linear-gradient(to right, #000C66, #0000FF)',
                  boxShadow: '0 10px 30px rgba(0, 12, 102, 0.4)',
                  opacity: isLoading ? 0.5 : 1,
                  pointerEvents: isLoading ? 'none' : 'auto'
                }}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending OTP...</span>
                  </div>
                ) : (
                  'Send OTP'
                )}
              </div>
            </div>
          )}

          {/* OTP Verification Form */}
          {currentStep === 'otp' && (
            <div className="space-y-6">
              {/* Countdown Timer */}
              {countdown > 0 && (
                <div className="flex items-center justify-center gap-2 text-blue-200 mb-4">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">OTP expires in {formatTime(countdown)}</span>
                </div>
              )}

              {/* OTP Input */}
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
                  <Shield className={`w-5 h-5 transition-colors duration-200 ${
                    focusedField === 'otp' ? 'text-blue-400' : 'text-blue-300'
                  }`} />
                </div>
                <input
                  type="text"
                  name="otp"
                  value={formData.otp}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('otp')}
                  onBlur={() => setFocusedField('')}
                  placeholder="Enter 6-digit OTP"
                  maxLength="6"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-opacity-10 border bg-white/5 border-white border-opacity-20 rounded-xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm text-center text-2xl tracking-widest"
                  style={{
                    boxShadow: focusedField === 'otp' ? '0 0 20px rgba(0, 12, 102, 0.5)' : 'none'
                  }}
                />
              </div>

              {/* Verify Button */}
              <div
                onClick={handleVerifyOTP}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none cursor-pointer text-center"
                style={{
                  background: 'linear-gradient(to right, #000C66, #0000FF)',
                  boxShadow: '0 10px 30px rgba(0, 12, 102, 0.4)',
                  opacity: isLoading ? 0.5 : 1,
                  pointerEvents: isLoading ? 'none' : 'auto'
                }}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Verifying...</span>
                  </div>
                ) : (
                  'Verify & Create Account'
                )}
              </div>

              {/* Resend OTP */}
              <div className="text-center">
                <p className="text-blue-200 text-sm mb-2" style={{ color: '#7ec8e3' }}>
                  Didn't receive the code?
                </p>
                <button
                  onClick={handleResendOTP}
                  disabled={countdown > 0 || isLoading}
                  className="text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-200 hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ color: countdown > 0 ? '#6b7280' : '#7ec8e3' }}
                >
                  {countdown > 0 ? `Resend in ${formatTime(countdown)}` : 'Resend OTP'}
                </button>
              </div>
            </div>
          )}

          {/* Footer */}
          {currentStep === 'register' && (
            <div className="mt-8 text-center">
              <p className="text-blue-200 text-sm" style={{ color: '#7ec8e3' }}>
                Already have an account?{' '}
                <span 
                  onClick={() => navigate('/login')}
                  className="text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-200 hover:underline cursor-pointer" 
                  style={{ color: '#7ec8e3' }}
                >
                  Sign in
                </span>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes wave {
          0%, 100% { transform: translateX(0px); }
          50% { transform: translateX(-25px); }
        }
      `}</style>
    </div>
  );
};

export default RegisterComponent;