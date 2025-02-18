import { useState, useEffect, useRef } from "react";
import { BiCube } from "react-icons/bi";
import { AiTwotoneThunderbolt } from "react-icons/ai";
import { TbTable } from "react-icons/tb";
import { Home, FileText } from "lucide-react";
import MasterTrainers from './Police/MasterTrainers';
import Dashboard1 from './Forensic/Scripts/Dashboard1';
import CriminalPages from './Prosecution/Criminalpages';
import PoliceOfficers from './Police/PoliceOfficers';  
import Carousel from './Police/Carousel';
import Forensicvisits from './Police/Forensicvisits';
import Dashboard2 from './Court/CSS/Script/Dashboard2'
import Firchargesheets from './Police/FIR/Chargesheets/Firchargesheets';
import Efir from './Police/FIR/Efir/Efir';
import FirNewcriminal from './Police/FIR/Newcriminal/FirNewcriminal';
import FirZero from './Police/FIR/Zerofir/FirZero';
import Correctionalservicetab from "./Correctional Services/Correctionalservicetab";
import '../styles/Dashboard.scss'
export default function Dashboard() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeContent, setActiveContent] = useState(null);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
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
    setIsOpen(false); // Close main dropdown
    setActiveSubMenu(null); // Close subdropdown
  };
  

  const dropdownRef = useRef(null);

  const handleServicesClick = () => {
    resetContent();
    setActiveServices('correctionalservices');
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };
  const toggleSubMenu = (index) => {
    if (activeSubMenu === index) {
      setActiveSubMenu(null);
 // Close if the same submenu is clicked again
    } else {
      setActiveSubMenu(index); // Open new submenu and close others
    }
  };
  
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
      <div className="navbar">
        <ul className="nav-items">
          {/* Police Section */}
          <div className="nav_main" ref={dropdownRef}>
            <button
              className={`nav-link ${isOpen ? "active" : ""}`}
              onClick={toggleDropdown}
            >
              <BiCube size={25} /> Police
            </button>

            {isOpen && (
              <div className="dropdown">
                <button
                  className="dropdown-item"
                  onClick={handleTrainingClick}
                >
                  Training
                </button>
                <button className="dropdown-item" onClick={() => toggleSubMenu(1)}>
                  FIR's
                </button>
                {activeSubMenu === 1 && (
                  <div className="sub-dropdown">
                    <button
                      className="sub-dropdown-item"
                      onClick={() => {
                        resetContent();
                        setActiveContent("newcriminal");
                      }}
                    >
                      A New Criminal Law
                    </button>
                    <button
                      className="sub-dropdown-item"
                      onClick={() => {
                        resetContent();
                        setActiveContent("chargesheet");
                      }}
                    >
                      Charge Sheet
                    </button>
                    <button
                      className="sub-dropdown-item"
                      onClick={() => {
                        resetContent();
                        setActiveContent("zerofir");
                      }}
                    >
                      Zero FIR
                    </button>
                    <button
                      className="sub-dropdown-item"
                      onClick={() => {
                        resetContent();
                        setActiveContent("efir");
                      }}
                    >
                      E FIR
                    </button>
                  </div>
                )}
                <button className="dropdown-item" onClick={handleCauroselClick}>
                  Awareness/Campaign
                </button>
                <button className="dropdown-item" onClick={handleForensicClick}>
                  Forensic Visits
                </button>
              </div>
            )}
          </div>

          <div className="nav-divider"></div>

          {/* Prosecution Section */}
          <li
            className={`nav-link ${activeContentProsecution === 'prosecution' ? 'active' : ''}`}
            onClick={handleProsecutionClick}
          >
            <Home /> Prosecution
          </li>

          <div className="nav-divider"></div>

          {/* Court Section */}
          <li
            className={`nav-link ${activeContentCourt === 'court' ? 'active' : ''}`}
            onClick={handleCourtClick}
          >
            <TbTable size={25} /> Court
          </li>

          <div className="nav-divider"></div>

          {/* Correctional Services Section */}
          <li
            className={`nav-link ${activeServices === 'correctionalservices' ? 'active' : ''}`}
            onClick={handleServicesClick}
          >
            <AiTwotoneThunderbolt /> Correctional Services
          </li>

          <div className="nav-divider"></div>

          {/* Forensic Science Section */}
          <li
            className={`nav-link ${activeContentScience === 'science' ? 'active' : ''}`}
            onClick={handleScienceClick}
          >
            <TbTable size={25} /> Forensic Science Department
          </li>

          <div className="nav-divider"></div>

          {/* Admin Section */}
          <li className="nav-link">
            <FileText /> Admin
          </li>
        </ul>
      </div>

      {/* Conditionally render the content */}
      {activeContent === 'training' && (
        <div className="content">
          <h1 className="heading">Police - Training</h1>
          <PoliceOfficers />
          <MasterTrainers />
        </div>
      )}

      {activeContentawareness === 'awareness/campaign' && (
        <div className="content">
          <h1 className="heading">Awareness Campaigns</h1>
          <Carousel />
        </div>
      )}

      {activeContentforensic === 'forensic/visits' && (
        <div className="content">
          <h1 className="heading">Forensic Visits</h1>
          <Forensicvisits />
        </div>
      )}

      {activeContentCourt === 'court' && (
        <div className="content">
          <h1 className="heading">Court Visits</h1>
          <Dashboard2 />
        </div>
      )}

      {activeContentScience === 'science' && (
        <div className="content">
          <h1 className="heading">Forensic Science Department</h1>
          <Dashboard1 />
        </div>
      )}

      {activeContentProsecution === 'prosecution' && (
        <div className="content">
          <h1 className="heading">Prosecution Visits</h1>
          <CriminalPages />
        </div>
      )}

      {activeServices === 'correctionalservices' && (
        <div className="content">
          <h1 className="heading">Correctional Services</h1>
          <Correctionalservicetab />
        </div>
      )}

      {activeContent === "chargesheet" && (
        <div className="content">
          <Firchargesheets />
        </div>
      )}

      {activeContent === "newcriminal" && (
        <div className="content">
          <FirNewcriminal />
        </div>
      )}

      {activeContent === "zerofir" && (
        <div className="content">
          <FirZero />
        </div>
      )}

      {activeContent === "efir" && (
        <div className="content">
          <Efir />
        </div>
      )}
    </div>
  );
}
