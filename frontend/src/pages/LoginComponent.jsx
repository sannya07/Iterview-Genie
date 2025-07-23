import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';

const LoginComponent = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [focusedField, setFocusedField] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (message) setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        navigate('/home');
      } else {
        setMessage(data.error || 'Login failed. Please try again.');
      }
    } catch {
      setMessage('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-950 to-blue-700 p-4">
      <div className="w-full max-w-md bg-white/10 p-8 rounded-2xl backdrop-blur-md border border-white/20 shadow-md">
        <h2 className="text-2xl text-white font-bold text-center mb-6">Login to Your Account</h2>

        {message && (
          <div className="bg-red-500 text-white text-sm p-3 rounded mb-4 text-center">{message}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-blue-300 w-5 h-5" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              autoComplete="username"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField('')}
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-blue-300 w-5 h-5" />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              required
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              onFocus={() => setFocusedField('password')}
              onBlur={() => setFocusedField('')}
              className="w-full pl-10 pr-10 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-blue-300"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition disabled:opacity-50"
          >
            {isLoading ? 'Logging In...' : 'Login'}
          </button>
        </form>

        <div className="text-center text-sm text-blue-200 mt-6">
          New here?{' '}
          <Link to="/register" className="text-blue-300 hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
