import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar2 = () => {
   const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-black text-white py-4 shadow-lg fixed top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-6">
        <div className="text-3xl font-extrabold text-purple-500">
          <a href='/'>Interview Genie.</a>
          </div>

        {/* Links for Desktop */}
        <div className="hidden md:flex gap-6">
          <Link to='/' className='hover:text-purple-400 transition'>About</Link>  
          <Link to='/register' className='hover:text-purple-400 transition'>Sign Up</Link>
          
          <Link to='/login' className='hover:text-purple-400'> Sign In</Link>
          
          <Link to='/contact' className='hover:text-purple-400'> Contact</Link>
        </div>

        {/* Hamburger Menu for Mobile */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white focus:outline-none"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.1 }}
          className="flex flex-col items-center bg-black text-white md:hidden"
        >
            <Link to='/register' className="py-2 hover:text-purple-400" onClick={() => setIsOpen(false)}>
            Sign up
            </Link>
            <Link to='/login' className="py-2 hover:text-purple-400" onClick={() => setIsOpen(false)}>
            Sign in
            </Link>
            <Link to='/' className="py-2 hover:text-purple-400" onClick={() => setIsOpen(false)}>
            About
            </Link>
            <Link to='/contact' className="py-2 hover:text-purple-400" onClick={() => setIsOpen(false)}>
            Contact
           </Link>
        </motion.div>
      )}
    </nav>
  );
}

export default Navbar2