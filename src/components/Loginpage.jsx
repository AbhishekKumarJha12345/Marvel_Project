
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import logo from "../assets/logo22.png";
import ResetPasswordModal from "./resetpassword";
import image2 from "../assets/logo22.png";

// import resetpassword from "../components/"

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const otpRefs = useRef([...Array(6)].map(() => React.createRef()));

  const [showOTPField, setShowOTPField] = useState(false);
  const [otpSent, setOTPSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);


  const navigate = useNavigate();

  localStorage.clear();


  const handleOTPChange = (e, index) => {
    const value = e.target.value;

    if (/^\d?$/.test(value)) { // Allow only single digit
      if (value !== "" && index < 5) {
        otpRefs.current[index + 1].current.focus();
      }
    }
  };

  const handleOTPKeyDown = (e, index) => {
    if (e.key === "Backspace" && index > 0 && e.target.value === "") {
      otpRefs.current[index - 1].current.focus();
    }
  };

  // ✅ Send OTP
  const handleSendOTP = async () => {
    const email = emailRef.current?.value.trim();

    if (!email) {
      setError("Please enter an email.");
      return;
    }

    try {
      console.log("Sending OTP request to:", axiosInstance.defaults.baseURL + "/send-otp"); // Debugging

      const response = await axiosInstance.post("/send-otp", { email });

      if (response.status === 200) {
        setOTPSent(true);
        setShowOTPField(true);
        setError("");
      } else {
        setError("Failed to send OTP. Try again.");
      }
    } catch (err) {
      console.error("Error sending OTP:", err);
      setError("Error sending OTP. Please check the email and try again.");
    }
  };

  
  const handleLogin = async () => {
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const response = await axiosInstance.post("/login", payload);

      const allowedRoles = [
        "chief secretary",
        "police",
        "Prosecutor",
        "court",
        "correctionalservices",
        "Forensic",
        "admin"
      ];

      console.log("Response received:", response.data);

      if (
        response.status === 200
      ) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        
        const responseData = response.data;
        Object.entries(responseData).forEach(([key, value]) => {
          localStorage.setItem(key,value); // Convert value to string if it's not already
        });

        navigate("/mainnavbar", { state: { users: response.data.role, email: response.data.email } });
      } else {
        setError("User doesn't have access to log in.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred. Please try again.");
    }
  };

  // ✅ Auto-clear error messages after 2 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 1000);
      return () => clearTimeout(timer);
    }
  }, [error]);


  const [emailExists, setEmailExists] = useState(null);
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (email) {
      const timeout = setTimeout(checkEmail, 500); // Debounce API call (wait 500ms)
      return () => clearTimeout(timeout);
    }
  }, [email]);

  const checkEmail = async () => {
    try {
      const response = await axiosInstance.post("/check_email", { email });

      console.log("Response:", response); // Debugging
      console.log("Response Data:", response.data); // Check what is returned

      const data = response.data; // Axios automatically parses JSON

      setEmailExists(data.exists);
      setVerificationStatus(data.verification !== undefined ? data.verification : "Not Available");
    } catch (error) {
      console.error("Error checking email:", error.response ? error.response.data : error.message);
    }
  };



  const handleResetPassword = () => {
    setShowResetPasswordModal(true);
  };

  // const handleUpdatePassword = (newPassword) => {
  //   // Handle password update logic
  //   console.log("New Password:", newPassword);
  //   setShowResetPasswordModal(false); // Close the modal after updating
  // };
  const handleUpdatePassword = async (data) => {
    try {
      const response = await axiosInstance.post("/reset_password", data);
      if (response.status === 200) {
        alert("Password updated successfully!");
        window.location.reload(); // Refresh the page after success
      } else {
        alert("Error updating password.");
      }
      setShowResetPasswordModal(false); // Close the modal after updating
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to reset password.");
    }
  };


  return (
    <div className="bg-gray-800 p-4">
<div 
  className="flex items-center justify-center min-h-[95vh] w-[90%] rounded-2xl mx-auto p-[50px]" 
  style={{ backgroundColor: "white", maxHeight: "calc(100vh - 150px)" }} 
>  {error && (
        <div className="fixed top-5 right-5 p-2 z-50 bg-red-500 text-white rounded-lg shadow-lg">
          <div className="flex justify-between items-center px-4 py-2">
            <div className="px-4 py-2">{error}</div>
            <button className="text-xl font-bold" onClick={() => setError("")}>
              &times;
            </button>
          </div>
        </div>
      )}


<div className="col-span-6 w-[700px] p-8 space-y-6 bg-[#f7fbff] shadow-lg rounded-2xl h-[650px] mx-auto flex flex-col items-center ">
  
  {/* Logo & Title Section at the Top */}
  <div className="flex items-center">
    <img src={logo} alt="Logo" className="w-16 h-16 mb-2" />
    <h2 className="text-3xl font-bold text-[#1d1f21] ml-3">MARVEL</h2>
  </div>

  {/* Centered Form Content */}
  <div className="w-full max-w-md">
    <div className="mt-4">
      <label className="block text-[#7a7e8c] font-black">Login</label>
      <input
        ref={emailRef}
        type="text"
        placeholder="Example@gmail.com"
        className="w-full px-3 py-2 border rounded-md"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>

    <div className="mt-4">
      <label className="block text-gray-700"></label>
      <div className="relative">
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
      </div>
    </div>

    <div className="flex items-center space-x-2 mt-4">
      <input
        type="checkbox"
        id="rememberMe"
        className="w-4 h-4 text-[#27445d] accent-[#27445d] cursor-pointer"
      />
      <label
        htmlFor="rememberMe"
        className="text-gray-700 text-sm cursor-pointer"
      >
        Remember Me
      </label>
    </div>

    <div className="mt-6">
      <button
        className="w-full px-4 py-2 font-bold text-white rounded-[10px] bg-[#27445d]"
        onClick={handleLogin}
      >
        Log In
      </button>
    </div>
    <div className="mt-4 text-center">
              <button className="text-blue-500 underline" onClick={handleResetPassword}>
              ResetPassword
              </button>
            </div>
  </div>
</div>

      <div className="col-span-6 flex  items-center m-auto">
    <img src={image2} alt="Logo" className="w-[400px] h-[400px]" />
  </div>


      {showResetPasswordModal && (
        <ResetPasswordModal onClose={() => setShowResetPasswordModal(false)} onUpdate={handleUpdatePassword} email={email} />
      )}
</div>
    </div >
  );
}

export default Login;
