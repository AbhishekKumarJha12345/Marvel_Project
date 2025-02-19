import React, { useState, useRef, useEffect } from "react";
import { FiUser } from "react-icons/fi";
import { CgLock } from "react-icons/cg";
import { LuEye } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo22.png";
import axiosInstance from "../utils/axiosInstance";

function Login() {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = async () => {
    const payload = {
      user_name: usernameRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const response = await axiosInstance.post("/login", payload);

      const allowedRoles = [
        "chief secretary",
        "police",
        "prosecution",
        "court",
        "correctionalservices",
        "forensic",
      ];

      console.log("Response received:", response.data);

      if (
        response.status === 200 &&
        allowedRoles.includes(response.data.role?.toLowerCase())
      ) {
        localStorage.setItem("token", response.data.token);
        navigate("/mainnavbar", { state: { users: response.data.role } });
      } else {
        setError("User doesn't have access to log in.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred. Please try again.");
    }
  };

  // Automatically clear error after 2 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 2000);
      return () => clearTimeout(timer); // Cleanup on unmount
    }
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {error && (
        <div
          className="fixed top-5 right-5 p-1 z-50 bg-red-500 text-white rounded-lg shadow-lg transition-opacity duration-500"
          role="alert"
        >
          <div className="flex justify-between items-center px-4 py-2">
            <div className="px-4 py-2">{error}</div>
            <button
              className="text-xl font-bold"
              onClick={() => setError("")}
            >
              &times;
            </button>
          </div>
        </div>
      )}

      <div className="w-full max-w-lg p-8 space-y-6 bg-white shadow-lg rounded-2xl">
        <img
          src={logo}
          alt="Logo"
          className="mx-auto"
          style={{ width: "200px", height: "auto" }}
        />
        <h2 className="text-3xl font-bold text-center text-gray-600">Sign In</h2>
        <h6 className="text-sm text-center text-gray-400">
          Log in to your account to continue.
        </h6>

        <div className="space-y-4 pt-4">
          <div>
            <label className="block text-gray-700">Username</label>
            <div className="relative">
              <FiUser className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                ref={usernameRef}
                type="text"
                placeholder="User Name"
                className="w-full px-10 py-2 text-gray-900 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2d3748] placeholder-gray-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700">Password</label>
            <div className="relative">
              <CgLock className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                ref={passwordRef}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full px-10 py-2 text-gray-900 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2d3748] placeholder-gray-500"
              />
              <span
                className="absolute right-3 top-3 cursor-pointer text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                <LuEye className="w-5 h-5" />
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              className="w-full px-4 py-2 font-bold text-white rounded-sm"
              style={{ backgroundColor: "#2d3748" }}
              onClick={handleLogin}
            >
              Log In
            </button>
          </div>
        </div>

        <p className="text-sm text-center text-gray-600 pt-5 font-medium">
          Not registered?{" "}
          <a
            href="#"
            className="font-bold underline"
            style={{ color: "#2d3748" }}
          >
            Create an account
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
