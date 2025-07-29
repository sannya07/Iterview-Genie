import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
// import { set } from 'mongoose';
import { setUser } from "../utils/UserSlice";

const UpdateProfile = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    age: user?.age || "",
    course: user?.course || "",
    college: user?.college || "",
    passingYear: user?.passingYear || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // const res = await fetch('/api/auth/update', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //      authorization: `Bearer ${localStorage.getItem('token')}` // Use token from localStorage
      //    },
      //   body: JSON.stringify(formData),
      //   credentials: 'include', // if you're using cookies/session
      // });
      const response = await fetch('https://iterview-genie.onrender.com/api/auth/update', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    authorization: `Bearer ${localStorage.getItem('token')}`,
  },
  body: JSON.stringify(formData),
});


      if (!response.ok)
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      const updatedUser = await response.json();
      // console.log(updatedUser);
      // Dispatch to Redux store if needed
      dispatch(setUser(updatedUser.user));
      console.log(user)
      navigate("/profile");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="shrink-0">
        <Navbar />
      </div>

      <div className="flex-1 flex items-center justify-center px-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl rounded-3xl p-8 sm:p-10 w-full max-w-3xl"
        >
          <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">
            📝 Update Your Profile
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-base text-gray-800">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="border p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="border p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Age"
              className="border p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="text"
              name="course"
              value={formData.course}
              onChange={handleChange}
              placeholder="Course"
              className="border p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="text"
              name="college"
              value={formData.college}
              onChange={handleChange}
              placeholder="College"
              className="border p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="number"
              name="passingYear"
              value={formData.passingYear}
              onChange={handleChange}
              placeholder="Passing Year"
              className="border p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <button
            type="submit"
            className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-lg font-semibold transition-all duration-300 shadow-md"
          >
            ✅ Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
