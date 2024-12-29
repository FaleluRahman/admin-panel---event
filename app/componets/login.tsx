"use client";

import React, { useState } from 'react';

const Login = () => {
  // State for form inputs
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ nameError: false, passwordError: false });

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Reset errors
    setErrors({ nameError: false, passwordError: false });

    // Basic validation
    if (!name) setErrors(prev => ({ ...prev, nameError: true }));
    if (!password) setErrors(prev => ({ ...prev, passwordError: true }));

    if (name && password) {
      // Proceed with login or redirect (if both fields are valid)
      window.location.href = 'https://kulliyathuimamrabbani.in';
    }
  };

  // Handle GuestLogin
  const handleGuestLogin = () => {
    // Guest login logic (e.g., navigate or provide guest access)
    alert('Guest login successful!');
    // Add logic for guest login if necessary
    window.location.href = 'https://rendezvous-ap.vercel.app';
  };

  // Handle StudentLogin
  const handleStudentLogin = () => {
    // Student login logic (e.g., authenticate student)
    alert('Student login successful!');
    // Add logic for student login if necessary
    window.location.href = 'https://rendezvous-ap.vercel.app';
  };

  const closeLogin = () => {
    // Logic to close the login (e.g., hiding a modal)
    alert('Close login modal');
  };

  return (
    <div className="login fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <i onClick={closeLogin} className="fa-solid fa-xmark text-gray-700 cursor-pointer absolute top-4 right-4"></i>

        <div className="mb-6 text-center">
          <img src="https://storage.googleapis.com/gweb-uniblog-publish-prod/original_images/SID_FB_001.gif" alt="Logo" />
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          {/* Name (Jamia No.) Input */}
          <div className="form-row mb-4 relative">
            <input
              type="text"
              id="form-name"
              className="form-box w-full p-3 border border-gray-300 rounded-lg"
              required
              placeholder='Jamia No.'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.nameError && (
              <div className="text-red-500 text-sm mt-1">Please fill up your Jamia No.</div>
            )}
          </div>

          {/* Password Input */}
          <div className="form-row mb-4 relative">
            <input
              type="password"
              id="form-part"
              className="form-box w-full p-3 border border-gray-300 rounded-lg"
              required
              value={password}
              placeholder='Password'
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.passwordError && (
              <div className="text-red-500 text-sm mt-1">Please fill up your password</div>
            )}
          </div>

          {/* Submit Button */}
          <div className="form-row flex justify-between mb-4">
            <button
              type="button"  // Prevent form submission
              className="form-submit w-fit bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 focus:outline-none"
              onClick={handleGuestLogin} // Handle guest login
            >
              Guest Login
            </button>

            <button
              type="button"  // Prevent form submission
              className="form-submit w-fit bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 focus:outline-none"
              onClick={handleStudentLogin} // Handle student login
            >
              Student Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
