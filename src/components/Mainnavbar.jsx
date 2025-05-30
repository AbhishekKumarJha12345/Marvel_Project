import React, { Profiler } from "react";
import { useState, useEffect, useRef } from "react";

import {
  FaBell,
  FaEnvelope,
  FaUser,
  FaChevronDown,
  FaSearch,
  FaGlobe,
} from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { IoIosNotificationsOutline } from "react-icons/io";
import logo from "../assets/logo.png";
import Forensic_logo from "../assets/Forensic_logo_1.png";
import Correctional_service_logo from "../assets/Correctional_service_logo.png";

import Flag from "react-world-flags";
import Navbar from "./Navbar";
import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logocs from "../assets/cs_court_prosection_logo.png";
import { PiPowerDuotone } from "react-icons/pi";
import "../styles/mainnavbar.css"


import ProfileView from './Profile/Profile'

function Mainnavbar() {
  const [isOpen, setIsOpen] = useState({ language: false, notifications: false, profile: false });
  const [user, setUser] = useState(null);
  const profileRef = useRef(null);

  const location = useLocation(); // Access location state
  const { users, userName } = location.state || {};
  // const { users = "", userName = "" } = location.state || {}; // Default to empty string   


  const [profileview,setProfileview] = useState(false)

  console.log(users, "users_details");

  const navigate = useNavigate();
  const logoMapping = {
    Prosecutor: logocs,
    police: logo,
    "chief secretary": logocs,
    ACS: logocs,
    DGP: logocs,
    admin: logocs,
    Court: logocs,
    Forensic: Forensic_logo,
    Correction: Correctional_service_logo,
  };
  const userLogo = logoMapping[users];

  // const toggleDropdown = (dropdown) => {
  //   setIsOpen((prevState) => ({
  //     ...prevState,
  //     [dropdown]: !prevState[dropdown],
  //   }));
  // };
  const toggleDropdown = (dropdown) => {
    setIsOpen((prevState) => ({
      notifications: dropdown === "notifications" ? !prevState.notifications : false,
      profile: dropdown === "profile" ? !prevState.profile : false,
    }));
  };

  const handelLogout = () => {
    localStorage.clear();
    navigate("/");
  };


  const handelProfile = () =>{
    // navigate('/profile')

    setProfileview(true)
  }


  if (users === undefined) {
    handelLogout();
  }

  const toCamelCase = (str) => {
    return str
      .toLowerCase()
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  useEffect(() => {
    const storedUser = {
      token: localStorage.getItem("token"),
      role: localStorage.getItem("role"),
      email: localStorage.getItem("email"),
      emp_id: localStorage.getItem("emp_id"),
      userName: localStorage.getItem("userName"),
      rank: localStorage.getItem("rank"),
      state: localStorage.getItem("state"),
      district: localStorage.getItem("district"),
      mobile_number: localStorage.getItem("mobile_number"),
      sub_role: localStorage.getItem("sub_role"),
      zone: localStorage.getItem("zone"),
    };

    if (storedUser.token) {
      setUser(storedUser);
    } else {
      handelLogout();
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsOpen({ notifications: false, profile: false });
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#f4f4f4",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <nav
        className="px-2 py-3 flex items-center justify-between"
        style={{
          marginBottom: "0.2rem",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="flex items-center ml-6">
          <img
            src={userLogo}
            alt="Logo"
            className={
              users === "admin" || //added_25   
                users === "Prosecutor" ||
                users === "chief secretary" ||
                users === "ACS" ||
                users === "DGP" ||
                users === "Court" ||
                users == "Forensic" ||
                users == "Correction"
                ? "w-10"
                : "w-20"
            }
          />

          <div
            className="text-4xl font-bold mr-5 cursor-pointer"
            style={{ color: "#2d3748" }}
            onClick={() => window.location.reload()}
          // Navigate to the route
          >
            MARVEL
          </div>
        </div>

        <div className="flex items-center space-x-6 ">
          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown("notifications")}
              className="relative text-black-900 hover:text-blue-500 mt-2"
            >
              <IoIosNotificationsOutline size={30} />
            </button>
            {isOpen.notifications && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-lg p-2">
                <p className="text-gray-600 text-sm">No new notifications</p>
              </div>
            )}
          </div>



          {/* Profile Dropdown */}
          {/* <div className="relative"> */}
          <div className="relative flex items-center space-x-4" ref={profileRef}>
            <button
              onClick={() => toggleDropdown("profile")}
              className="flex items-center space-x-2 text-gray-700 hover:[#2d3748]" style={{ display: "flex", alignItems: "center" }}
            >
              <FaUser size={22} />
              <span>{user?.userName}</span>
              {/* <span>{users ? toCamelCase(users) : "Guest"}</span> */}


              <FaChevronDown size={16} className="text-gray-400" />
            </button>

            {/* Profile Dropdown */}
            {isOpen.profile && (
              <div className="absolute top-[-15px] right-[-5px] mt-5 w-[12vw] bg-white border border-gray-200 rounded-lg shadow-lg z-[1000]">
                <div className="p-1 space-y-2">

                  <div
                    className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md cursor-pointer"
                    onClick={handelProfile}
                  >
                    Profile
                  </div>

                  <div
                    className="px-4 py-2 text-red-600 hover:bg-red-500 hover:text-white rounded-md cursor-pointer"
                    onClick={handelLogout}
                  >
                    Log Out
                  </div>

                </div>
              </div>
            )}

            {/*           
            <button title="logout" onClick={handelLogout} className="power">
              <PiPowerDuotone size={29} />
              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-white bg-red-600 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                Logout
              </span>
            </button> */}
          </div>
        </div>
      </nav>
      
      
      
{
      
      profileview ? (<ProfileView />) : (<Navbar users={users} />)

      
}
      
    </div>
  );
}

export default Mainnavbar;
