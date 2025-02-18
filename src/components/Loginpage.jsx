

import React, { useState } from 'react';
import { FiUser } from "react-icons/fi";
import { CgLock } from "react-icons/cg";
import { LuEye } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import logo from '../assets/logo.png';
import axiosInstance from '../utils/axiosInstance';
import { useRef } from 'react';

function Login() {
  const usernameRef = useRef();  
  const passwordRef = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();  // Initialize the navigate function

  const handleLogin = async() => {
    const payload={
      "user_name": usernameRef.current.value,
      "password": passwordRef.current.value
    }
    try {
      const response = await axiosInstance.post("/login", payload);
      console.log(response, "login rs");
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        navigate("/mainnavbar");
      }
    } catch (error) {
      console.log(error);
    }
    // Handle any validation or authentication logic here

    // Navigate to the /mainnavbar route after successful login
    // navigate('/mainnavbar');
  };

  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-lg p-8 space-y-6 bg-white shadow-lg rounded-2xl">
          <img
            src={logo}
            alt="Logo"
            style={{ width: '200px', height: 'auto', display: 'block', margin: '0 auto' }}
          />
          <h2 className="text-3xl font-small text-center text-gray-600">Sign In</h2>
          <h6 className="text-sm text-center text-gray-400">Log in to your account to continue.</h6>
          <div className="space-y-4 pt-4">
            <div>
              <label className="block text-gray-700 font-small">Username</label>
              <div className="relative">
                <FiUser className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <input ref={usernameRef}
                  type="text"
                  placeholder="e.g John_Doe"
                  className="w-full px-10 py-2 text-gray-900 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-gray-700 font-small">Password</label>
              <div className="relative">
                <CgLock className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <input ref={passwordRef}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full px-10 py-2 text-gray-900 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                />

                <span
                  className="absolute right-3 top-3 cursor-pointer text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <LuEye className="text-gray-400 w-5 h-5" />
                </span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <button 
                className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-sm hover:bg-blue-700"
                onClick={handleLogin}  // Add onClick handler for login
              >
                Log In
              </button>
            </div>
          </div>
          <p className="text-sm text-center text-gray-600 pt-5 font-medium">
            Not registered? <a href="#" className="text-blue-600 underline">Create an account</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
