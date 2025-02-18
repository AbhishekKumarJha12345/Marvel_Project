import React from "react";
import { useState } from "react";
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
import logo from '../assets/logo.png'
import Flag from 'react-world-flags';
import Navbar from './Navbar'
import { Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";




function Mainnavbar() {
  const [isOpen, setIsOpen] = useState({ language: false });

  const location = useLocation();  // Access location state
  const { users } = location.state || {};  // Extract users from state

    const navigate = useNavigate();
  

  const toggleDropdown = (dropdown) => {
    setIsOpen((prevState) => ({
      ...prevState,
      [dropdown]: !prevState[dropdown],
    }));
  };

  const handelLogout = ()=>{
    localStorage.clear()
    navigate("/")
  }


  return (
    <div style={{backgroundColor:"#f4f4f4", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"}}>
    <nav className="px-2 py-3 flex items-center justify-between" style={{marginBottom:"0.2rem", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"}}>
       <div className="flex items-center space-x-3">
        <img src={logo} alt="Logo" className='w-20' />
        <div className="text-3xl font-bold " style={{color:"#2d3748"}}>ICJS</div>
          <div className="relative w-[400px] hidden md:block">
        <FaSearch className="absolute left-3 top-2.5 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search..."
          className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
        />
      </div>
      </div>

      <div className="flex items-center space-x-6 ">
 

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown("notifications")}
            className="relative text-gray-700 hover:text-blue-500 mt-1"
          >
            <IoIosNotificationsOutline size={25} />
          </button>
          {isOpen.notifications && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-lg p-2">
              <p className="text-gray-600 text-sm">No new notifications</p>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown("profile")}
            className="flex items-center space-x-2 text-gray-700 hover:[#2d3748]"
          >
            <FaUser size={22} />
            <p>{users}</p>
            <FaChevronDown size={16} className="text-gray-400"/>
          </button>
          {isOpen.profile && (
            <div className="absolute right-0 mt-2 w-36 bg-white shadow-md rounded-lg">
              <button className="block px-4 py-2 w-full text-left hover:bg-gray-100">Profile</button>
              <button className="block px-4 py-2 w-full text-left hover:bg-gray-100" onClick={handelLogout}>Logout</button>
            </div>    
          )}
        </div>
      </div>
    </nav>
    {/* <Navbar/> */}
    <Navbar users={users} />
    </div>
  );
}

export default Mainnavbar;
