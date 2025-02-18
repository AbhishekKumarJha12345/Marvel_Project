import { useState, useEffect, useRef } from "react";
import { BiCube } from "react-icons/bi";
import { AiTwotoneThunderbolt } from "react-icons/ai";
import { IoDocumentOutline } from "react-icons/io5";
import { CiMicrochip } from "react-icons/ci";
import { TbTable } from "react-icons/tb";

import MasterTrainers from './Police/MasterTrainers';
import Dashboard1 from './Forensic/Scripts/Dashboard1';
import CriminalPages from './Prosecution/Criminalpages';
import PoliceOfficers from './Police/PoliceOfficers';  
import Carousel from './Police/Carousel';
import Forensicvisits from './Police/Forensicvisits';
import Dashboard2 from './Court/CSS/Script/Dashboard2';
import Firchargesheets from './Police/FIR/Chargesheets/Firchargesheets';
import Efir from './Police/FIR/Efir/Efir';
import FirNewcriminal from './Police/FIR/Newcriminal/FirNewcriminal';
import FirZero from './Police/FIR/Zerofir/FirZero';
import Correctionalservicetab from "./Correctional Services/Correctionalservicetab";

import "../styles/Dashboard.scss"; 

export default function Dashboard() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [activeContent, setActiveContent] = useState(null);
  const [activeServices, setActiveServices] = useState(null);

  const dropdownRef = useRef(null);

  // Function to handle dropdown toggle
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Function to handle sub menu toggle
  const toggleSubMenu = (index) => {
    setActiveSubMenu(index === activeSubMenu ? null : index);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="dashboard">
      <nav className="navbar">
        <ul className="nav-list">
          <li className="nav-item dropdown" ref={dropdownRef}>
            <button className="nav-link" onClick={toggleDropdown}>
              <BiCube size={25} /> Police
            </button>
            {isOpen && (
              <div className="dropdown-menu">
                <button className="dropdown-item" onClick={() => setActiveContent("training")}>
                  Training
                </button>
                <button className="dropdown-item" onClick={() => toggleSubMenu(1)}>
                  FIR'S
                </button>
                {activeSubMenu === 1 && (
                  <div className="submenu">
                    <button className="submenu-item" onClick={() => setActiveContent("newcriminal")}>
                      A New Criminal Law
                    </button>
                    <button className="submenu-item" onClick={() => setActiveContent("chargesheet")}>
                      Charge Sheet
                    </button>
                    <button className="submenu-item" onClick={() => setActiveContent("zerofir")}>
                      Zero FIR
                    </button>
                    <button className="submenu-item" onClick={() => setActiveContent("efir")}>
                      E FIR
                    </button>
                  </div>
                )}
                <button className="dropdown-item" onClick={() => setActiveContent("awareness")}>
                  Awareness/Campaign
                </button>
                <button className="dropdown-item" onClick={() => setActiveContent("forensic")}>
                  Forensic Visits
                </button>
              </div>
            )}
          </li>

          <li className="nav-item" onClick={() => setActiveContent("prosecution")}>
            <Home /> Prosecution
          </li>

          <li className="nav-item" onClick={() => setActiveContent("court")}>
            <CiMicrochip size={25} /> Court
          </li>

          <li className="nav-item" onClick={() => setActiveServices("correctionalservices")}>
            <AiTwotoneThunderbolt /> Correctional Services 
          </li>

          <li className="nav-item" onClick={() => setActiveContent("science")}>
            <TbTable size={25} /> Forensic Science Department  
          </li>

          <li className="nav-item">
            <FileText /> Admin 
          </li>
        </ul>
      </nav>

      <div className="content">
        {activeContent === 'training' && (
          <div className="content-grid">
            <h1 className="content-title">Police - Training</h1>
            <PoliceOfficers />
            <MasterTrainers />
          </div>
        )}
        {activeContent === 'awareness' && <Carousel />}
        {activeContent === 'forensic' && <Forensicvisits />}
        {activeContent === 'court' && <Dashboard2 />}
        {activeContent === 'science' && <Dashboard1 />}
        {activeContent === 'prosecution' && <CriminalPages />}
        {activeServices === 'correctionalservices' && <Correctionalservicetab />}
        {activeContent === 'chargesheet' && <Firchargesheets />}
        {activeContent === 'newcriminal' && <FirNewcriminal />}
        {activeContent === 'zerofir' && <FirZero />}
        {activeContent === 'efir' && <Efir />}
      </div>
    </div>
  );
}
