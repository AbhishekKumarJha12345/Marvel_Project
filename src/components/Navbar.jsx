import { useState, useEffect, useRef } from "react";
import { BiCube } from "react-icons/bi";
import { AiTwotoneThunderbolt } from "react-icons/ai";
import { CiMicrochip } from "react-icons/ci";
import { TbTable } from "react-icons/tb";
import { FileText } from "lucide-react";
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

export default function Dashboard() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeContent, setActiveContent] = useState(null);
  const [activeSubMenu, setActiveSubMenu] = useState(null);

  const resetContent = () => {
    setActiveSubMenu(null);
  };

  const dropdownRef = useRef(null);

  const handleSectionClick = (section) => {
    console.log(section,'clicked section is------')
    resetContent();
    setActiveContent(section);
  };

  const handleSubMenuClick = (subMenu) => {
    setActiveSubMenu(subMenu === activeSubMenu ? null : subMenu);
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
    <div className="flex h-screen flex-col">
      <div className="">
        <div
          className="flex justify-between bg-gray-900 text-white p-3 hidden md:flex"
          style={{ fontFamily: "Work Sans" }}
        >
          <ul className="flex gap-6">
            <div
              className="relative border-l-2 border-gray-900 h-full"
              ref={dropdownRef}
            >
              <button
                className="flex items-center gap-2 py-2 px-4 hover:text-[#48CAE4] cursor-pointer w-full text-left"
                onClick={() => setIsOpen((prev) => !prev)}
              >
                <BiCube size={25} /> Police
              </button>
              {isOpen && (
                <div className="absolute left-0 top-full mt-2 w-[200px] bg-white text-black rounded shadow-md p-2 z-10">
                  <button
                    className="block w-full text-left py-1 px-2 hover:text-blue-500"
                    onClick={() => handleSectionClick("training")}
                  >
                    Training
                  </button>
                  <button
                    className="block w-full text-left py-1 px-2 hover:text-blue-500"
                    onClick={() => handleSubMenuClick("fir")}
                  >
                    FIR'S
                  </button>
                  {activeSubMenu === "fir" && (
                    <div className="absolute left-full top-10 ml-1 w-[200px] bg-gray-100 text-black rounded shadow-md p-2">
                      <button
                        className="block w-full text-left py-1 px-2 hover:text-blue-500"
                        onClick={() => handleSectionClick("newcriminal")}
                      >
                        A New Criminal Law
                      </button>
                      <button
                        className="block w-full text-left py-1 px-2 hover:text-blue-500"
                        onClick={() => handleSectionClick("chargesheet")}
                      >
                        Charge Sheet
                      </button>
                      <button
                        className="block w-full text-left py-1 px-2 hover:text-blue-500"
                        onClick={() => handleSectionClick("zerofir")}
                      >
                        Zero FIR
                      </button>
                      <button
                        className="block w-full text-left py-1 px-2 hover:text-blue-500"
                        onClick={() => handleSectionClick("efir")}
                      >
                        E FIR
                      </button>
                    </div>
                  )}
                  <button
                    className="block w-full text-left py-1 px-2 hover:text-blue-500"
                    onClick={() => handleSectionClick("awareness/campaign")}
                  >
                    Awareness/Campaign
                  </button>
                  <button
                    className="block w-full text-left py-1 px-2 hover:text-blue-500"
                    onClick={() => handleSectionClick("forensic/visits")}
                  >
                    Forensic Visits
                  </button>
                </div>
              )}
            </div>
            <div className="border-l-2 border-gray-500 h-full"></div>

            <li
              className="flex items-center gap-2"
              onClick={() => handleSectionClick("prosecution")}
            >
              <AiTwotoneThunderbolt /> Prosecution
            </li>

            <div className="border-l-2 border-gray-500 h-full"></div>

            <li
              className="flex items-center gap-2"
              onClick={() => handleSectionClick("court")}
            >
              <CiMicrochip size={25} /> Court
            </li>

            <div className="border-l-2 border-gray-500 h-full"></div>

            <li
              className="flex items-center gap-2"
              onClick={() => handleSectionClick("services")}
            >
              <AiTwotoneThunderbolt /> Correctional Services
            </li>

            <div className="border-l-2 border-gray-500 h-full"></div>

            <li
              className="flex items-center gap-2"
              onClick={() => handleSectionClick("science")}
            >
              <TbTable size={25} /> Forensic Science Department
            </li>

            <div className="border-l-2 border-gray-500 h-full"></div>

            <li className="flex items-center gap-2">
              <FileText /> Admin
            </li>
          </ul>
        </div>
      </div>

      {/* Conditionally render the content */}
      {activeContent === "training" && (
        <div className="grid grid-cols-12 p-6">
          <h1 className="col-span-12 text-center text-4xl font-bold">
            Police - Training
          </h1>
          <div className="col-span-6">
            <PoliceOfficers />
          </div>
          <div className="col-span-6">
            <MasterTrainers />
          </div>
        </div>
      )}
      {activeContent === "awareness/campaign" && (
        <div className="grid grid-cols-24 p-4">
          <h1 className="col-span-24 text-center text-4xl font-bold">
            Awareness Campaigns
          </h1>
          <div className="col-span-24">
            <Carousel />
          </div>
        </div>
      )}
      {activeContent === "forensic/visits" && (
        <div className="grid grid-cols-24 p-4">
          <h1 className="col-span-24 text-center text-4xl font-bold">
            Forensic Visits
          </h1>
          <div className="col-span-24">
            <Forensicvisits />
          </div>
        </div>
      )}
      {activeContent === "prosecution" && (
        <div className="grid grid-cols-24 p-4">
          <h1 className="col-span-24 text-center text-4xl font-bold">
            Prosecution
          </h1>
          <div className="col-span-24">
            <CriminalPages />
          </div>
        </div>
      )}
      {activeContent === "court" && (
        <div className="grid grid-cols-24 p-4">
          <h1 className="col-span-24 text-center text-4xl font-bold">
            Court
          </h1>
          <div className="col-span-24">
            <Dashboard2 />
          </div>
        </div>
      )}
      {activeContent === "science" && (
        <div className="grid grid-cols-24 p-4">
          <h1 className="col-span-24 text-center text-4xl font-bold">
            Forensic Science Department
          </h1>
          <div className="col-span-24">
            <Dashboard1 />
          </div>
        </div>
      )}
      {activeContent === "services" && (
        <div className="grid grid-cols-24 p-4">
          <h1 className="col-span-24 text-center text-4xl font-bold">
            Correctional Services
          </h1>
          <div className="col-span-24">
            <Correctionalservicetab />
          </div>
        </div>
      )}
      {activeContent === "prosecution" && (
        <div className="grid grid-cols-24 p-4">
          <>
            {/* <h1 className="col-span-24 text-center text-4xl font-bold mb-8">Prosecution Visits</h1> */}
            <div className="col-span-24">
              <CriminalPages />
            </div>
          </>
        </div>
      )}
      {activeContent === "correctionalservices" && (
        <div className="grid grid-cols-24 p-4">
          {/* <h1 className="col-span-24 text-center text-4xl font-bold mb-8">Correctional Services</h1> */}
          <Correctionalservicetab />
        </div>
      )}
      {activeContent === "chargesheet" && (
        <div className="p-6">
          {/* <h1 className="text-center text-4xl font-bold mb-8">FIR - Charge Sheets</h1> */}
          <Firchargesheets />
        </div>
      )}
      {activeContent === "newcriminal" && (
        <div className="p-6">
          {/* <h1 className="text-center text-4xl font-bold mb-8">New Criminal</h1> */}
          <FirNewcriminal />
        </div>
      )}
      {activeContent === "zerofir" && (
        <div className="p-6">
          {/* <h1 className="text-center text-4xl font-bold mb-8">Zero FIR</h1> */}
          <FirZero />
        </div>
      )}
      {activeContent === "efir" && (
        <div className="p-6">
          {/* <h1 className="text-center text-4xl font-bold mb-8">E FIR</h1> */}
          <Efir />
        </div>
      )}
    </div>
  );
}
