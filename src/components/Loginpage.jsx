// import React, { useState, useRef, useEffect } from "react";
// import { FiUser } from "react-icons/fi";
// import { CgLock } from "react-icons/cg";
// import { LuEye } from "react-icons/lu";
// import { useNavigate } from "react-router-dom";
// import logo from "../assets/logo22.png";
// import axiosInstance from "../utils/axiosInstance";

// function Login() {
//   const usernameRef = useRef();
//   const passwordRef = useRef();

//   const otpRef = useRef(null);
//   const [showOTPField, setShowOTPField] = useState(false);
//   const [otpSent, setOTPSent] = useState(false);

//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();
//   const [error, setError] = useState("");
//   const otpRefs = useRef([...Array(6)].map(() => React.createRef()));


//   localStorage.clear()

//   const handleOTPChange = (e, index) => {
//     const value = e.target.value;

//     if (/^\d?$/.test(value)) { // Allow only single digit
//       if (value !== "" && index < 5) {
//         otpRefs.current[index + 1].current.focus();
//       }
//     }
//   };

//   const handleOTPKeyDown = (e, index) => {
//     if (e.key === "Backspace" && index > 0 && e.target.value === "") {
//       otpRefs.current[index - 1].current.focus();
//     }
//   };

//   // const handleLogin = async () => {
//   //   const payload = {
//   //     user_name: usernameRef.current.value,
//   //     password: passwordRef.current.value,
//   //   };

//   //   try {
//   //     const response = await axiosInstance.post("/login", payload);

//   //     const allowedRoles = [
//   //       "chief secretary",
//   //       "police",
//   //       "Prosecutor",
//   //       "court",
//   //       "correctionalservices",
//   //       "Forensic",
//   //       "admin"
//   //     ];

//   //     console.log("Response received:", response.data);

//   //     if (
//   //       response.status === 200
//   //     ) {
//   //       localStorage.setItem("token", response.data.token);
//   //       localStorage.setItem("role", response.data.role);
//   //       navigate("/mainnavbar", { state: { users: response.data.role, userName: response.data.userName } });
//   //     } else {
//   //       setError("User doesn't have access to log in.");
//   //     }
//   //   } catch (err) {
//   //     console.error("Login error:", err);
//   //     setError("An error occurred. Please try again.");
//   //   }
//   // };

//   // -------------------------------------------------------------------------------------------------------------------------------
//   const emailRef = useRef();

//   const handleSendOTP = async () => {
//     const email = emailRef.current.value.trim();

//     if (!email) {
//       setError("Please enter an email.");
//       return;
//     }

//     try {
//       const response = await axiosInstance.post("/send-otp", { email });

//       if (response.status === 200) {
//         setOTPSent(true);
//         setShowOTPField(true);
//         setError("");
//       } else {
//         setError("Failed to send OTP. Try again.");
//       }
//     } catch (err) {
//       console.error("Error sending OTP:", err);
//       setError("Error sending OTP. Please check the email and try again.");
//     }
//   };

//   const handleLogin = async () => {
//     const email = emailRef.current.value.trim();
//     const password = passwordRef.current.value.trim();
//     const otp = otpRef.current.value.trim();

//     if (!email || !password || !otp) {
//       setError("All fields are required.");
//       return;
//     }

//     try {
//       const response = await axiosInstance.post("/login", { email, password, otp });

//       if (response.status === 200) {
//         localStorage.setItem("token", response.data.token);
//         localStorage.setItem("role", response.data.role);
//         navigate("/mainnavbar", { state: { users: response.data.role, userName: response.data.userName } });
//       } else {
//         setError("Login failed. Check your credentials.");
//       }
//     } catch (err) {
//       console.error("Login error:", err);
//       setError("Error logging in. Check your details and try again.");
//     }
//   };
//   // -------------------------------------------------------------------------------------------------------------------------------

//   // Automatically clear error after 2 seconds
//   useEffect(() => {
//     if (error) {
//       const timer = setTimeout(() => setError(""), 2000);
//       return () => clearTimeout(timer); // Cleanup on unmount
//     }
//   }, [error]);

//   const handleKeyDown = (event) => {
//     if (event.key === "Enter") {
//       handleLogin();
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: "#f4f4f4" }}>
//       {error && (
//         <div
//           className="fixed top-5 right-5 p-1 z-50 bg-red-500 text-white rounded-lg shadow-lg transition-opacity duration-500"
//           role="alert"
//         >
//           <div className="flex justify-between items-center px-4 py-2">
//             <div className="px-4 py-2">{error}</div>
//             <button
//               className="text-xl font-bold"
//               onClick={() => setError("")}
//             >
//               &times;
//             </button>
//           </div>
//         </div>
//       )}

//       <div className="w-full max-w-lg p-8 space-y-6 bg-white shadow-lg rounded-2xl">
//         <img
//           src={logo}
//           alt="Logo"
//           className="mx-auto"
//           style={{ width: "200px", height: "auto" }}
//         />
//         <h2 className="text-3xl font-bold text-center text-gray-600">Sign In</h2>
//         <h6 className="text-sm text-center text-gray-400">
//           Log in to your account to continue.
//         </h6>




//         <div className="space-y-4 pt-4">
//           <div>
//             <label className="block text-gray-700">Email</label>
//             <div className="relative">
//               <input ref={emailRef} type="text" placeholder="Enter Email ID" className="w-full px-3 py-2 border rounded-md" />
//             </div>
//           </div>

//           <div>
//             <label className="block text-gray-700">Password</label>
//             <div className="relative">
//               <input ref={passwordRef} type={showPassword ? "text" : "password"} placeholder="Password" className="w-full px-3 py-2 border rounded-md" />
//               <span className="absolute right-3 top-3 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>👁</span>
//             </div>
//           </div>

//           {!otpSent && (
//             <button className="w-full px-4 py-2 bg-blue-600 text-white" onClick={handleSendOTP}>
//               Send OTP
//             </button>
//           )}

//           {/* {showOTPField && (
//             <div>
//               <label className="block text-gray-700">Enter OTP</label>
//               <input ref={otpRef} type="text" placeholder="Enter OTP" className="w-full px-3 py-2 border rounded-md" />
//             </div>
//           )} */}
//           {showOTPField && (
//             <div>
//               <label className="block text-gray-700 mb-2">Enter OTP</label>
//               <div className="flex space-x-2">
//                 {[...Array(6)].map((_, index) => (
//                   <input
//                     key={index}
//                     type="text"
//                     maxLength="1"
//                     className="w-10 h-10 text-center border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     onChange={(e) => handleOTPChange(e, index)}
//                     onKeyDown={(e) => handleOTPKeyDown(e, index)}
//                     ref={otpRefs.current[index]}
//                   />
//                 ))}
//               </div>
//             </div>
//           )}

//           {showOTPField && (
//             <button className="w-full px-4 py-2 bg-green-600 text-white" onClick={handleLogin}>
//               Log In
//             </button>
//           )}

//           {error && <p className="text-red-500">{error}</p>}
//         </div>

//       </div>
//     </div>
//   );
// }

// export default Login;




import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import logo from "../assets/logo22.png";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const otpRefs = useRef([...Array(6)].map(() => React.createRef()));

  const [showOTPField, setShowOTPField] = useState(false);
  const [otpSent, setOTPSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

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

  // ✅ Handle Login
  const handleLogin = async () => {
    const email = emailRef.current?.value.trim();
    const password = passwordRef.current?.value.trim();
    const otpValue = otpRefs.current.map((ref) => ref.current?.value || "").join("");

    if (!email || !password || (showOTPField && otpValue.length !== 6)) {
      setError("All fields are required.");
      return;
    }

    try {
      console.log("Logging in with:", { email, password, otp: otpValue });

      const response = await axiosInstance.post("/login", { email, password, otp: otpValue });

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        localStorage.setItem("role", response.data.state);
        console.log("Pavan_Kalyan");
        console.log(response.data);
        navigate("/mainnavbar", { state: { users: response.data.role, userName: response.data.userName } });
      } else {
        setError("Login failed. Check your credentials.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Error logging in. Check your details and try again.");
    }
  };

  // ✅ Auto-clear error messages after 2 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 1000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: "#f4f4f4" }}>
      {error && (
        <div className="fixed top-5 right-5 p-2 z-50 bg-red-500 text-white rounded-lg shadow-lg">
          <div className="flex justify-between items-center px-4 py-2">
            <div className="px-4 py-2">{error}</div>
            <button className="text-xl font-bold" onClick={() => setError("")}>
              &times;
            </button>
          </div>
        </div>
      )}

      <div className="w-full max-w-lg p-8 space-y-6 bg-white shadow-lg rounded-2xl">
        <img src={logo} alt="Logo" className="mx-auto" style={{ width: "200px", height: "auto" }} />
        <h2 className="text-3xl font-bold text-center text-gray-600">Sign In</h2>
        <h6 className="text-sm text-center text-gray-400">Log in to your account to continue.</h6>

        <div>
          <label className="block text-gray-700">Email</label>
          <input ref={emailRef} type="text" placeholder="Enter Email ID" className="w-full px-3 py-2 border rounded-md" />
        </div>

        <div>
          <label className="block text-gray-700">Password</label>
          <div className="relative">
            <input
              ref={passwordRef}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-3 py-2 border rounded-md"
            />
            <span className="absolute right-3 top-3 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>👁</span>
          </div>
        </div>

        {showOTPField && (
          <div>
            <label className="block text-gray-700 mb-2">Enter OTP</label>
            <div className="flex space-x-2">
              {[...Array(6)].map((_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  className="w-10 h-10 text-center border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => handleOTPChange(e, index)}
                  onKeyDown={(e) => handleOTPKeyDown(e, index)}
                  ref={otpRefs.current[index]}
                />
              ))}
            </div>
          </div>
        )}

        {!showOTPField ? (
          <button className="w-full px-4 py-2 bg-blue-600 text-white mt-4" onClick={handleSendOTP}>
            Send OTP
          </button>
        ) : (
          <button className="w-full px-4 py-2 bg-green-600 text-white mt-4" onClick={handleLogin}>
            Log In
          </button>
        )}
      </div>
    </div>
  );
}

export default Login;
