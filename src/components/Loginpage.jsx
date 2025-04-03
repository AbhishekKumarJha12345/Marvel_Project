import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import logo from "../assets/logo22.png";
import ResetPasswordModal from "./resetpassword";
import image2 from "../assets/logo22.png";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(16, "Password cannot exceed 16 characters.")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
    .regex(/\d/, "Password must contain at least one number.")
    .regex(/[!@#$%^&*()\[\]{}\-=+_~`|\\:;"'<>,.?\/]/, "Password must contain at least one special character."),
});

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const navigate = useNavigate();

  localStorage.clear();

  const handleLogin = async () => {
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value;

    try {
      loginSchema.parse({ email, password }); // Validate with Zod
      setErrors({}); // Clear previous errors

      const payload = { email, password };
      const response = await axiosInstance.post("/login", payload);

      if (response.status === 200) {
        Object.entries(response.data).forEach(([key, value]) => {
          localStorage.setItem(key, value);
        });
        navigate("/mainnavbar", { state: { users: response.data.role, email: response.data.email } });
      } else {
        setErrors({ general: "User doesn't have access to log in." });
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors = {};
        err.errors.forEach(error => {
          fieldErrors[error.path[0]] = error.message;
        });
        setErrors(fieldErrors);
      } else {
        console.error("Login error:", err);
        setErrors({ general: "An error occurred. Please try again." });
      }
    }
  };

  const handleResetPassword = () => {
    setShowResetPasswordModal(true);
  };

  return (
    <div className="bg-gray-800 p-4">
      <div className="flex items-center justify-center min-h-[95vh] w-[90%] rounded-2xl mx-auto p-[50px] bg-white max-h-[calc(100vh-150px)]">
        <div className="col-span-6 w-[700px] p-8 space-y-6 bg-[#f7fbff] shadow-lg rounded-2xl h-[650px] mx-auto flex flex-col items-center ">
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="w-16 h-16 mb-2" />
            <h2 className="text-3xl font-bold text-[#1d1f21] ml-3">MARVEL</h2>
          </div>

          <div className="w-full max-w-md">
            <div className="mt-4">
              <label className="block text-[#7a7e8c] font-black text-lg">Login</label>
              <input
                ref={emailRef}
                type="text"
                placeholder="Example@gmail.com"
                className="w-full px-3 py-2 border rounded-md mt-2"
              />
              {errors.email &&   <p className="text-red-800 !text-sm font-bold mt-1">
    {errors.email}
  </p>}
            </div>

            <div className="mt-4 relative">
              <input
                ref={passwordRef}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full px-3 py-2 border rounded-md"
              />
              <span
                className="absolute right-3 top-3 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                👁
              </span>
              {errors.password && <p className="text-red-800 !text-sm mt-1">{errors.password}</p>}
            </div>

            {errors.general && <p className="text-red-800 !text-sm mt-1">{errors.general}</p>}

            <div className="mt-6">
              <button
                className="w-full px-4 py-2 font-bold text-white rounded-[10px] bg-[#27445d]"
                onClick={handleLogin}
              >
                Log In
              </button>
            </div>

            <div className="mt-4 text-center">
              <button className="text-blue-500 underline" onClick={handleResetPassword}>Reset Password</button>
            </div>
          </div>
        </div>

        <div className="col-span-6 flex items-center m-auto">
          <img src={image2} alt="Logo" className="w-[400px] h-[400px]" />
        </div>

        {showResetPasswordModal && (
          <ResetPasswordModal onClose={() => setShowResetPasswordModal(false)} onUpdate={() => {}} />
        )}
      </div>
    </div>
  );
}

export default Login;
