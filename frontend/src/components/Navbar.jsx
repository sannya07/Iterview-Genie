import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Home, Activity, FileText, User, LogOut } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-[#050A30] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo */}
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-lg bg-blue-700 flex items-center justify-center mr-3">
            <span className="text-white font-bold text-lg">IG.</span>
          </div>
          <span className="text-white text-xl font-semibold">Interview Genie</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-4 items-center">
          <Link to="/home" className="text-white hover:text-blue-200 flex items-center space-x-1">
            <Home className="w-4 h-4" /> <span>Dashboard</span>
          </Link>
          <Link to="/activity" className="text-white hover:text-blue-200 flex items-center space-x-1">
            <Activity className="w-4 h-4" /> <span>Activity</span>
          </Link>
          <Link to="/report" className="text-white hover:text-blue-200 flex items-center space-x-1">
            <FileText className="w-4 h-4" /> <span>Report</span>
          </Link>
          <Link to="/profile" className="text-white hover:text-blue-200 flex items-center space-x-1">
            <User className="w-4 h-4" /> <span>My Profile</span>
          </Link>
          <button onClick={handleLogout} className="text-white hover:text-red-300 flex items-center space-x-1">
            <LogOut className="w-4 h-4" /> <span>Logout</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#000C66] px-4 pb-4 pt-2 space-y-2">
          <Link to="/dashboard" onClick={toggleMenu} className="block text-white hover:text-blue-200">
            <Home className="inline w-4 h-4 mr-2" /> Dashboard
          </Link>
          <Link to="/activity" onClick={toggleMenu} className="block text-white hover:text-blue-200">
            <Activity className="inline w-4 h-4 mr-2" /> Activity
          </Link>
          <Link to="/report" onClick={toggleMenu} className="block text-white hover:text-blue-200">
            <FileText className="inline w-4 h-4 mr-2" /> Report
          </Link>
          <Link to="/profile" onClick={toggleMenu} className="block text-white hover:text-blue-200">
            <User className="inline w-4 h-4 mr-2" /> My Profile
          </Link>
          <button
            onClick={() => {
              handleLogout();
              setIsOpen(false);
            }}
            className="block text-white hover:text-red-300"
          >
            <LogOut className="inline w-4 h-4 mr-2" /> Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
