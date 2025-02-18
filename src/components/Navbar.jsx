



import { useState, useEffect, useRef } from "react";
import { Menu, X, Home, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/Ui/Card";
import { AiTwotoneThunderbolt } from "react-icons/ai";
import { IoDocumentOutline } from "react-icons/io5";
import { CiCirclePlus, CiMicrochip } from "react-icons/ci";
import { BiCube } from "react-icons/bi";
import { TbTable } from "react-icons/tb";
import MasterTrainers from './Police/MasterTrainers';
import Dashboard1 from './Forensic/Scripts/Dashboard1'
import PoliceOfficers from './Police/PoliceOfficers';  
import Carousel from './Police/Carousel';
import Forensicvisits from './Police/Forensicvisits';
// import CourtTab1 from './Court/CSS/'
import Dashboard2 from './Court/CSS/Script/Dashboard2'
export default function Dashboard() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [activeContent, setActiveContent] = useState(null);
  const [activeContentawareness, setActiveContentawareness] = useState(null);
  const [activeContentforensic, setActiveContentforensic] = useState(null);
  const [activeContentCourt, setActiveContentCourt] = useState(null);
  const [activeContentScience, setActiveContentScience] = useState(null); // New state for tracking content
   // New state for tracking content
   // New state for tracking content
   // New state for tracking content
   // New state for tracking content
  const dropdownRef = useRef(null);
  const slides = ["Slide 1", "Slide 2", "Slide 3"];
  const [activeSlide, setActiveSlide] = useState(0);

  // Toggle main dropdown
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // Toggle individual submenus
  const toggleSubMenu = (index) => {
    setActiveSubMenu(index === activeSubMenu ? null : index);
  };

  // Set the active content when the "Training" button is clicked
  const handleTrainingClick = () => {
    setActiveContent('training'); 
    setActiveContentawareness(null);
    setActiveContentforensic(null);
    setActiveContentCourt(null);
    setActiveContentScience(null);
    
    // You can use any identifier here like 'training'
  };
  const handleCauroselClick = () => {
    setActiveContentawareness('awareness/campaign'); 
    setActiveContent(null);// You can use any identifier here like 'training'
  };

  const handleForensicClick = () => {
    setActiveContentawareness(null);  // Reset awareness content
    setActiveContentforensic('forensic/visits');
    setActiveContentCourt(null);
    setActiveContentScience(null);
    setActiveContent(null); // Set forensic content as active handleCourtClick
  };
  const handleCourtClick = () => {
    setActiveContentawareness(null);  // Reset awareness content
    setActiveContentCourt('court');
    setActiveContentScience(null);
    setActiveContent(null); 
    setActiveContentforensic(null);// Set forensic content as active handleScienceClick
  };
  const handleScienceClick = () => {
    setActiveContentawareness(null);  // Reset awareness content
    setActiveContentScience('science');
    setActiveContent(null); 
    setActiveContentCourt(null);
    setActiveContentforensic(null);// Set forensic content as active handleScienceClick
  };

  useEffect(() => {
    // Function to handle clicks outside the dropdown
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false); // Close the dropdown if clicked outside
      }
    };

    // Add event listener for clicks outside
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);        
    };
  }, []);

  return (
    <div className="flex h-screen flex-col">
      <div className="px-2">
        <div className="flex justify-between bg-gray-900 text-white p-3 hidden md:flex rounded-lg">
          <ul className="flex gap-6">
            {/* Police Section */}
            <div className="relative border-l-2 border-gray-900 h-full" ref={dropdownRef}>
              <button
                className="flex items-center gap-2 py-2 px-4 hover:text-[#48CAE4] cursor-pointer w-full text-left"
                onClick={toggleDropdown}
              >
                <BiCube size={25} /> Police
              </button>

              {isOpen && (
                <div className="absolute left-0 top-full mt-2 w-[200px] bg-white text-black rounded shadow-md p-2 z-10">
                  <button
                    className="block w-full text-left py-1 px-2 hover:text-blue-500"
                    onClick={handleTrainingClick} // Trigger content change on "Training" click
                  >
                    Training
                  </button>
                  <button className="block w-full text-left py-1 px-2 hover:text-blue-500" onClick={() => toggleSubMenu(1)}>
                    FIR'S 
                  </button>
                  {activeSubMenu === 1 && (
                    <div className="absolute left-full top-10 ml-1 w-[200px] bg-gray-100 text-black rounded shadow-md p-2">
                      <button className="block w-full text-left py-1 px-2 hover:text-blue-500">A New Criminal Law</button>
                      <button className="block w-full text-left py-1 px-2 hover:text-blue-500">Charge Sheet</button>
                      <button className="block w-full text-left py-1 px-2 hover:text-blue-500">Zero FIR</button>
                      <button className="block w-full text-left py-1 px-2 hover:text-blue-500">E FIR</button>
                    </div>
                  )}
                  <button className="block w-full text-left py-1 px-2 hover:text-blue-500" onClick={handleCauroselClick} >Awareness/Campaign</button>
                  {/* <button className="block w-full text-left py-1 px-2 hover:text-blue-500">Forensic Visits</button> */}
                  <button className="block w-full text-left py-1 px-2 hover:text-blue-500" onClick={handleForensicClick}>Forensic Visits</button>

                </div>
              )}
            </div>

            <div className="border-l-2 border-gray-500 h-full"></div>

            {/* Prosecution Section */}
            <li className="flex items-center gap-2">
              <Home /> Prosecution
            </li>

            <div className="border-l-2 border-gray-500 h-full"></div>

            {/* Other sections */}
            <li className="flex items-center gap-2" onClick={handleCourtClick}>
              <CiMicrochip size={25} /> Court
            </li>

            <div className="border-l-2 border-gray-500 h-full"></div>
            <li className="flex items-center gap-2">
              <AiTwotoneThunderbolt /> Correctional Services 
            </li>
            <div className="border-l-2 border-gray-500 h-full"></div>
            <li className="flex items-center gap-2" onClick={handleScienceClick}>
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

      {activeContent === 'training' && (
        <div className="grid grid-cols-12 gap-6 p-6">
        <>

          <h1 className="col-span-12 text-center text-4xl font-bold mb-8">Police - Training</h1>
          {/* Home page or dashboard with charts */}
          <div className="col-span-6">
            <PoliceOfficers />
          </div>
          <div className="col-span-6">
            <MasterTrainers />
          </div>
        </>
        </div>
      )}
      {activeContentawareness === 'awareness/campaign' && (
        <div className="grid grid-cols-24 gap-5 p-4">
        <>

        <h1 className="col-span-24 text-center text-4xl font-bold mb-8">Awareness Campaigns</h1>
        <div className="col-span-24">
            <Carousel />
          </div>
          
        </>  
        </div>
      )}
{/* activeContentforensic */}
{activeContentforensic === 'forensic/visits' && (  
  <div className="grid grid-cols-24 gap-5 p-4">
    <>
      <h1 className="col-span-24 text-center text-4xl font-bold mb-8">Forensic Visits</h1>
      <div className="col-span-24">
        <Forensicvisits />
      </div>
    </>
  </div>
)}
{activeContentCourt === 'court' && (
  <div className="grid grid-cols-24 gap-5 p-4">
    <>
      <h1 className="col-span-24 text-center text-4xl font-bold mb-8">Court Visits</h1>
      <div className="col-span-24">
        <Dashboard2 />
      </div>
    </>
  </div>
)}
{/* science */}
{activeContentScience === 'science' && (
  <div className="grid grid-cols-24 gap-5 p-4">
    <>
      <h1 className="col-span-24 text-center text-4xl font-bold mb-8">Forensic Visits</h1>
      <div className="col-span-24">
        <Dashboard1 />
      </div>
    </>
  </div>
)}

      
    </div>
    
  );
}















