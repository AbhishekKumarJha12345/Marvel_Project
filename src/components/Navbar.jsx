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
import '../styles/Dashboard.scss';
import axiosInstance from "../utils/axiosInstance";
import GavelIcon from '@mui/icons-material/Gavel';
import BiotechIcon from '@mui/icons-material/Biotech';
import BalanceIcon from '@mui/icons-material/Balance';
import FluorescentIcon from '@mui/icons-material/Fluorescent';
import logo from '../assets/logo22.png'
import TrainingDataGraph from "./Police/TrainingDataGraph";
import TrainingDataGraph2 from "./Police/TrainingDataGraph2";
import PoliceTraining from "./Police/PoliceTraining";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { faL } from "@fortawesome/free-solid-svg-icons";
import jsPDF from "jspdf";
import pdflogo from "../assets/pdflogo.png";
import background from "../assets/rbg3.jpg"; // Add your background image
import {
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  FormControlLabel,
  RadioGroup,
  Radio,
  Button,
  TextField,
  Select,
  MenuItem,
  Box,
  Typography,
  IconButton,InputLabel,FormHelperText
} from "@mui/material";
import ReportGencomp from "./ReportGen/ReportGenComp";
export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [activeSection, setActiveSection] = useState(null); // Unified state for all sections

  const resetContent = () => {
    setActiveSection(null); // Reset active section
    setIsOpen(false); // Close main dropdown
    setActiveSubMenu(null); // Close sub-dropdown
  };

  const dropdownRef = useRef(null);

  const handleSectionClick = (section, subSection = null) => {
    resetContent();
    setActiveSection({ section, subSection });
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const toggleSubMenu = (index) => {
    if (activeSubMenu === index) {
      setActiveSubMenu(null); // Close if same submenu is clicked again
    } else {
      setActiveSubMenu(index); // Open new submenu and close others
    }
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

const [trainingData,setTrainingData]=useState('')
const getTrainingData = async()=>{
  try{
    const response =await axiosInstance.get('/live_data')
    console.log(response.data,'Trainig data response ----------')
    setTrainingData(response.data)

  }catch(error){
    console.log(error)
  }
}
useEffect(() => {
  // getTrainingData();
}, []);

  const contentMap = {
    "training"              : <div className="content"><h1 className="heading">Police - Training</h1><PoliceTraining/></div>,
    "awareness/campaign"    : <div className="content"><h1 className="heading">Awareness Campaigns</h1><Carousel /></div>,
    "forensic/visits"       : <div className="content"><h1 className="heading">Forensic Visits</h1><Forensicvisits /></div>,
    "court"                 : <div className="content"><h1 className="heading">Court Visits</h1><Dashboard2 /></div>,
    "science"               : <div className="content"><h1 className="heading">Forensic Science Department</h1><Dashboard1 /></div>,
    "prosecution"           : <div className="content"><h1 className="heading">Prosecution Visits</h1><CriminalPages /></div>,
    "correctionalservices"  : <div className="content"><h1 className="heading">Correctional services</h1><Correctionalservicetab /></div>,
    "newcriminal"           : <div className="content"><FirNewcriminal /></div>,
    "chargesheet"           : <div className="content"><Firchargesheets  /></div>,
    "zerofir"               : <div className="content"><FirZero /></div>,
    "efir"                  : <div className="content"><Efir /></div>,
  };
const [openmodal,setOpenmodal]=useState(false)
  const openreportmodal =()=>{
    setOpenmodal(true)

  }


  const generatePDF = () => {
    const doc = new jsPDF();

    // Add background image
    const bgImg = new Image();
    bgImg.src = background;
    doc.addImage(bgImg, "PNG", 0, 0, 210, 297); // A4 size background

    // Title
    doc.setFontSize(18);
    doc.setTextColor(255, 255, 255); // White color
    doc.text("Interoperable Criminal Justice System Report", 40, 10);

    // Add logo
    const img = new Image();
    img.src = pdflogo;
    doc.addImage(img, "PNG", 80, 16, 50, 30);

    // Add a line break
    // doc.setLineWidth(0.5);
    // doc.line(10, 60, 200, 60);

    // Summary
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0)
    doc.text("Summary :",10, 90, { maxWidth: 190 });
    doc.text("In the provided data, there are two sets of statistics related to court cases for the months September 2021 and February 2025. Here's a summary comparison between the two months:", 10, 100, { maxWidth: 190 });
    doc.text("- Total charge-sheeted: Both months have a total of 7 charges sheeted, but it's not clear if this is the same set of cases or different ones.", 10, 120, { maxWidth: 190 });
    doc.text("- Pending Cases: In September 2021, there were 432 pending cases, while in February 2025, there were 7 pending cases. It appears that the number of pending cases has significantly decreased from September 2021 to February 2025.", 10, 140, { maxWidth: 190 });
    doc.text("- Acquittals: In September 2021, there were 44 acquitted cases, while in February 2025, there were 7 acquitted cases. It seems that the number of acquitted cases has decreased from September 2021 to February 2025.", 10, 160, { maxWidth: 190 });
    doc.text("- Convictions: In September 2021, there were 233 convicted cases, while in February 2025, there were only 7 convicted cases. This suggests a significant decrease in the number of convictions from September 2021 to February 2025.", 10, 180, { maxWidth: 190 });
    doc.text("- In summary, it appears that there has been a significant reduction in the number of pending, acquitted, and convicted cases from September 2021 to February 2025. However, more data would be needed to definitively determine if this is a trend or an anomaly.", 10, 200, { maxWidth: 190 });

    // Footer
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255); // White color
    doc.text("Generated on: " + new Date().toLocaleString(), 10, 280);

    // Save PDF
    doc.save("Overall_Report.pdf");
  };




  return (
    <div className="dashboard">
      <div className="navbar">
        <ul className="nav-items">
          {/* Police Section */}
          <div className="nav_main" ref={dropdownRef}>
            <button className={`nav-link ${isOpen ? "active" : ""}`} onClick={toggleDropdown}>
              <BiCube size={25} /> Police
            </button>

            {isOpen && (
              <div className="dropdown">
                <button className="dropdown-item" onClick={() => handleSectionClick('training')}>Training</button>
                <button className="dropdown-item" onClick={() => toggleSubMenu(1)}>FIR's</button>
                {activeSubMenu === 1 && (
                  <div className="sub-dropdown">
                    <button className="sub-dropdown-item" onClick={() => handleSectionClick('newcriminal')}>A New Criminal Law</button>
                    <button className="sub-dropdown-item" onClick={() => handleSectionClick('chargesheet')}>Charge Sheet</button>
                    <button className="sub-dropdown-item" onClick={() => handleSectionClick('zerofir')}>Zero FIR</button>
                    <button className="sub-dropdown-item" onClick={() => handleSectionClick('efir')}>E FIR</button>
                  </div>
                )}
                {/* <button className="dropdown-item" onClick={() => handleSectionClick('awareness/campaign')}>Awareness/Campaign</button> */}
                <button className="dropdown-item" onClick={() => handleSectionClick('forensic/visits')}>Forensic Visits</button>
              </div>
            )}
          </div>

          <div className="nav-divider"></div>

          {/* Prosecution Section */}
          <li className={`nav-link ${activeSection?.section === 'prosecution' ? 'active' : ''}`} onClick={() => handleSectionClick('prosecution')}>
            {/* <Home /> Prosecution */}
            <GavelIcon /> Prosecution
          </li>

          <div className="nav-divider"></div>

          {/* Court Section */}
          <li className={`nav-link ${activeSection?.section === 'court' ? 'active' : ''}`} onClick={() => handleSectionClick('court')}>
            {/* <TbTable size={25} /> Court */}
            <BalanceIcon size={25} /> Court
          </li>

          <div className="nav-divider"></div>

          {/* Correctional Services Section */}
          <li className={`nav-link ${activeSection?.section === 'correctionalservices' ? 'active' : ''}`} onClick={() => handleSectionClick('correctionalservices')}>
            {/* <AiTwotoneThunderbolt /> Correctional Services */}
            <FluorescentIcon /> Correctional Services
          </li>

          <div className="nav-divider"></div>

          {/* Forensic Science Section */}
          <li className={`nav-link ${activeSection?.section === 'science' ? 'active' : ''}`} onClick={() => handleSectionClick('science')}>
            {/* <TbTable size={25} /> Forensic Science Department */}
            <BiotechIcon size={25} /> Forensic Science Department
          </li>
          <li className={`nav-link ${activeSection?.section === 'science' ? 'active' : ''}`} 
          // onClick={() => openreportmodal()}
          onClick={generatePDF}
          >
            {/* <TbTable size={25} /> Forensic Science Department */}
            <PictureAsPdfIcon size={25} /> Generate Report
          </li>

          {/* <div className="nav-divider"></div> */}

          {/* Admin Section */}
          {/* <li className="nav-link">
            <FileText /> Admin
          </li> */}
        </ul>
      </div>

      {/* Conditionally render the content */}
      {contentMap[activeSection?.section] || 
      <div style={{height:"74vh",marginTop:"3rem",display:"flex",flexDirection:"column",gap:"1rem",alignItems:"center"}}>

        <h2 style={{fontSize:"29px",fontWeight:"500"}}>Interoperable Criminal Justice System</h2>
        <p style={{fontSize:"18px"}}>MAHARASHTRA RESEARCH & VIGILANCE MARVEL
        FOR ENHANCED LAW ENFORCEMENT LIMITED</p>
        <img src={logo} alt="Logo"  style={{
    width: "20rem", 
    padding: "10px", 
    borderRadius: "8px"
  }}  />

      </div>
      }

      {
        openmodal && 
        <ReportGencomp />
      }

    </div>
  );
}
