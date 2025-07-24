import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
// import update-profile from './update-profile';

const Profile = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  useEffect(()=>{
    
  })

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-gradient-to-br from-blue-100 to-blue-300">
      {/* Navbar at the top */}
      <div className="shrink-0">
        <Navbar />
      </div>

      {/* Profile content fills remaining space */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="bg-white shadow-xl rounded-3xl p-8 sm:p-10 w-full max-w-4xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-blue-800 mb-6">👤 Your Profile</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-800 text-base sm:text-lg">
            <div>
              <p className="font-semibold">Name</p>
              <p className="text-gray-600">{user?.name || '—'}</p>
            </div>
            <div>
              <p className="font-semibold">Email</p>
              <p className="text-gray-600">{user?.email || '—'}</p>
            </div>
            <div>
              <p className="font-semibold">Age</p>
              <p className="text-gray-600">{user?.age || '—'}</p>
            </div>
            <div>
              <p className="font-semibold">Course</p>
              <p className="text-gray-600">{user?.course || '—'}</p>
            </div>
            <div>
              <p className="font-semibold">College</p>
              <p className="text-gray-600">{user?.college || '—'}</p>
            </div>
            <div>
              <p className="font-semibold">Passing Year</p>
              <p className="text-gray-600">{user?.passingYear || '—'}</p>
            </div>
          </div>

          <button
            onClick={() => navigate('/update-profile')}
            className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-lg font-semibold transition-all duration-300 shadow-md"
          >
            ✏️ Update Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
