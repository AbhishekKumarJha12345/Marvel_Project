import { useState, useEffect, useRef } from "react";
import { Menu, X, Home, FileText } from "lucide-react";
import { BiCube } from "react-icons/bi";
import { AiTwotoneThunderbolt } from "react-icons/ai";
import { IoDocumentOutline } from "react-icons/io5";
import { CiCirclePlus, CiMicrochip } from "react-icons/ci";
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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [activeContent, setActiveContent] = useState(null);
  const [activeContentawareness, setActiveContentawareness] = useState(null);
  const [activeContentforensic, setActiveContentforensic] = useState(null);
  const [activeContentProsecution, setActiveContentProsecution] = useState(null);

  const [activeContentCourt, setActiveContentCourt] = useState(null);
  const [activeContentScience, setActiveContentScience] = useState(null); // New state for tracking content
  const [activeForensic, setActiveForensic] = useState(null);
  const [activeServices, setActiveServices] = useState(null);  

  const resetContent = () => {
    setActiveContent(null);
    setActiveContentawareness(null);
    setActiveContentProsecution(null);
    setActiveContentforensic(null);
    setActiveContentScience(null);
    setActiveContentCourt(null);
    setActiveForensic(null);
    setActiveServices(null);
  };

  const dropdownRef = useRef(null);
  const slides = ["Slide 1", "Slide 2", "Slide 3"];
  const [activeSlide, setActiveSlide] = useState(0);
  // const handleTrainingClick = () => {
  //   resetContent();
  //   setActiveContent('training');
  // };

  // const handleCauroselClick = () => {
  //   resetContent();
  //   setActiveContentawareness('awareness/campaign');
  // };

  // const handleForensicClick = () => {
  //   resetContent();
  //   setActiveForensic('forensicvisits');
  // };

  const handleServicesClick = () => {
    resetContent();
    setActiveServices('correctionalservices');
  };
  // Toggle main dropdown
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const toggleSubMenu = (index) => {
    setActiveSubMenu(index === activeSubMenu ? null : index);
  };

  // Set the active content when the "Training" button is clicked
  const handleTrainingClick = () => {
    resetContent();
    setActiveContent('training'); 
    
  };
  const handleCauroselClick = () => {
    resetContent();
    setActiveContentawareness('awareness/campaign'); 
  };

  const handleForensicClick = () => {
    resetContent();
    setActiveContentforensic('forensic/visits');
  };
  const handleProsecutionClick = () => {
    resetContent();
    setActiveContentProsecution('prosecution');
  };
  const handleCourtClick = () => {
    resetContent();
    // setActiveContentProsecution(null);// Reset awareness content
    setActiveContentCourt('court');
  };
  const handleScienceClick = () => {
    resetContent();
    setActiveContentScience('science');
  };

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
            <button
              className="dropdown-item"
              onClick={handleTrainingClick} // Trigger content change on "Training" click
            >
              Training
            </button>
            <button className="dropdown-item" onClick={() => toggleSubMenu(1)}>
              FIR'S
            </button>
            {activeSubMenu === 1 && (
              <div className="submenu">
                <button
                  className="submenu-item"
                  onClick={() => setActiveContent("newcriminal")}
                >
                  A New Criminal Law
                </button>
                <button
                  className="submenu-item"
                  onClick={() => setActiveContent("chargesheet")}
                >
                  Charge Sheet
                </button>
                <button
                  className="submenu-item"
                  onClick={() => setActiveContent("zerofir")}
                >
                  Zero FIR
                </button>
                <button
                  className="submenu-item"
                  onClick={() => setActiveContent("efir")}
                >
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
