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
import "../styles/Dashboard.scss";
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
import html2canvas from "html2canvas";
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
import ReportGencomp from "./ReportGen/ReportGenComp";import training from '../assets/police/training.svg'
import forensicvisit from '../assets/police/forinsic_visit.svg'
import fir from '../assets/police/fir.svg'
import awareness from '../assets/police/awareness.svg'



const exportDataDetails = [
  {
    name: "Police Department",
    data: `
Generated Summary:
In the provided data, there are two sets of statistics related to court cases for the months September 2021 and February 2025. Here's a summary comparison between the two months:

 Total Charge-Sheeted:  
- Both months have a total of 7 charge-sheeted cases. However, it’s unclear whether these are the same or different cases.

 Pending Cases:  
- September 2021: 432 pending cases  
- February 2025: 7 pending cases  
-  Significant reduction in pending cases from 432 to 7.

 Acquittals:  
- September 2021: 44 acquitted cases  
- February 2025: 7 acquitted cases  
-  Decrease in acquittals over time.

 Convictions:  
- September 2021: 233 convicted cases  
- February 2025: 7 convicted cases  
-  Sharp drop in convictions.

 Overall Summary:  
There has been a major decrease in pending, acquitted, and convicted cases from September 2021 to February 2025.  
However, more data would be needed to confirm if this trend is long-term or an anomaly.
    `
  },
  {
    name: "Forensic Department",
    data: `
Generated Summary:  
 Analysis of Forensic Department Performance (July 2024 - January 2025)

 Monthly Performance Trends:
- Disposal Cases:  Highest in October 2024 (32,313),  Lowest in July 2024 (21,122).  
- Pending Cases:  Peaked in August 2024 (186,321), declined to January 2025 (183,394).  
- Received Cases:  Most in December 2024 (25,258),  Least in July 2024 (22,211).  
- Disposal Exhibits:  Highest in October 2024 (59,104),  Lowest in July 2024 (42,617).  
- Pending Exhibits:  Highest in August 2024 (6,65,143), decreased until January 2025 (6,74,863).  
- Received Exhibits:  Most in December 2024 (53,470),  Least in July 2024 (49,066).  

 Peak & Low Performance Months:
-  Best Month (Highest Disposal Cases): October 2024  
-  Worst Month (Highest Pending Cases & Exhibits): August 2024  
-  Lowest Disposal Cases: July 2024  
-  Lowest Pending Cases & Exhibits: January 2025  

Overall Trends & Recommendations:
- Pending cases increasing despite disposal improvements → Possible processing bottleneck.  
- Stable efficiency until August 2024, then signs of decreasing efficiency.  
- Suggested Improvements:
  - Increase staffing
  - Enhance processing efficiency
  - Prioritize high-impact cases
  - Reduce case-processing time
    `
  }
];

export default function Dashboard({ users }) {

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

  const [trainingData, setTrainingData] = useState('')
  const getTrainingData = async () => {
    try {
      const response = await axiosInstance.get('/live_data')
      console.log(response.data, 'Trainig data response ----------')
      setTrainingData(response.data)

    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    // getTrainingData();
  }, []);


const trainingRef = useRef(null); // Reference to PoliceTraining component

const handleExportPoliceTraining = async () => {
  const pdf = new jsPDF("p", "mm", "a4"); // Create A4 size PDF
  const margin = 10;
  let yPosition = 20; // Start position for text
  
  // Capture PoliceTraining as an image
  if (trainingRef.current) {
    const canvas = await html2canvas(trainingRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const imgWidth = 180; // Fit image width into A4
    const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio

    pdf.addImage(imgData, "PNG", margin, yPosition, imgWidth, imgHeight);
    yPosition += imgHeight + 10; // Move below image
  }

  // Add a separator
  pdf.setDrawColor(0);
  pdf.line(10, yPosition, 200, yPosition);
  yPosition += 10;

  // Loop through exportDataDetails and add formatted text
  exportDataDetails.forEach((item, index) => {
    pdf.setFontSize(14);
    pdf.setFont("helvetica", "bold");
    pdf.text(item.name, margin, yPosition);
    yPosition += 6;

    pdf.setFontSize(11);
    pdf.setFont("helvetica", "normal");

    // Properly format long text for PDF
    const textLines = pdf.splitTextToSize(item.data, 180);
    
    // Check if text fits on the page, if not add a new page
    let linesPerPage = 50; // Approximate lines per page
    let lineChunks = [];
    
    for (let i = 0; i < textLines.length; i += linesPerPage) {
      lineChunks.push(textLines.slice(i, i + linesPerPage));
    }
    
    lineChunks.forEach((chunk, chunkIndex) => {
      if (yPosition > 270) {
        pdf.addPage();
        yPosition = 20;
      }
      pdf.text(chunk, margin, yPosition);
      yPosition += chunk.length * 5 + 10; // Adjust spacing
    });

    // Add a separator for sections
    if (index !== exportDataDetails.length - 1) {
      pdf.line(10, yPosition, 200, yPosition);
      yPosition += 10;
    }
  });

  // Save the PDF
  pdf.save("PoliceTraining_Report.pdf");
};



  const contentMap = {
    "training"              : <div className="content"><div className="ContentSpace"><h1 className="heading">Police - Training</h1><button className="ExportButton" onClick={handleExportPoliceTraining}>Export</button></div><PoliceTraining ref={trainingRef}/></div>,
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
    doc.addImage(img, "PNG", 80, 16, 45, 30);

    // Summary Section
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);

    doc.text("Police Department:", 10, 90);
    doc.setFont("helvetica", "normal");

    doc.text("In the provided data, there are two sets of statistics related to court cases for the months September 2021 and February 2025:", 10, 110, { maxWidth: 190 });
    doc.text("- Total charge-sheeted: Both months have a total of 7 charges sheeted, but it's not clear if this is the same set of cases or different ones.", 10, 130, { maxWidth: 190 });
    doc.text("- Pending Cases: In September 2021, there were 432 pending cases, while in February 2025, there were 7 pending cases.", 10, 150, { maxWidth: 190 });
    doc.text("- Acquittals: In September 2021, there were 44 acquitted cases, while in February 2025, there were 7 acquitted cases.", 10, 170, { maxWidth: 190 });
    doc.text("- Convictions: In September 2021, there were 233 convicted cases, while in February 2025, there were only 7 convicted cases.", 10, 190, { maxWidth: 190 });
    doc.text("- In summary, it appears that there has been a significant reduction in the number of pending, acquitted, and convicted cases from September 2021 to February 2025.", 10, 210, { maxWidth: 190 });

    // Footer - Page number
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255); // White color
    doc.text(`Page 1`, 180, 290);

    // Add new page
    doc.addPage();
    doc.addImage(bgImg, "PNG", 0, 0, 210, 297); // A4 size background

    doc.setFontSize(18);
    doc.setTextColor(255, 255, 255); // White color
    doc.text("Interoperable Criminal Justice System Report", 40, 10);

    const img2 = new Image();
    img2.src = pdflogo;
    doc.addImage(img2, "PNG", 80, 16, 45, 30);

    // Forensic Department Performance
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);

    doc.text("Forensic Department:", 10, 90);
    doc.setFont("helvetica", "normal");

    doc.text("Analysis of Forensic Department Performance from July 2024 to January 2025 Over the six months analyzed, the forensic department exhibited some notable trends in case and exhibit disposal, intake, and pending status.", 10, 110, { maxWidth: 190 });
    doc.text("- Disposal cases: Highest in October 2024 (32,313), lowest in July 2024 (21,122).", 10, 130, { maxWidth: 190 });
    doc.text("- Pending cases: Peaked in August 2024 (186,321), steadily decreased to January 2025 (183,394).", 10, 150, { maxWidth: 190 });
    doc.text("- Received cases: Highest intake in December 2024 (25,258), lowest in July 2024 (22,211).", 10, 160, { maxWidth: 190 });
    doc.text("- Disposal exhibits: Highest in October 2024 (59,104), lowest in July 2024 (42,617).", 10, 170, { maxWidth: 190 });
    doc.text("- Pending exhibits: Peaked in August 2024 (6,65,143), declined to January 2025 (6,74,863).", 10, 180, { maxWidth: 190 });
    doc.text("- Received exhibits: Highest in December 2024 (53,470), lowest in July 2024 (49,066).", 10, 190, { maxWidth: 190 });
    doc.text("- Overall Trends: Increasing pending cases despite fluctuations suggests a processing bottleneck.", 10, 200, { maxWidth: 190 });
    doc.text("  Consider increasing staffing levels, streamlining procedures, and prioritizing high-impact cases.", 10, 210, { maxWidth: 190 });

    // Footer - Page number

    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255); // White color
    doc.text("Generated on: " + new Date().toLocaleString(), 10, 290);

    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255); // White color
    doc.text(`Page 2`, 180, 290);

    // Save PDF
    doc.save("Overall_Report.pdf");
};






  return (
    <div className="dashboard">
      <div className="navbar">
        <ul className="nav-items">


          {(users === 'chief secretary' || users === 'police') && (


            users === "chief secretary" ? (
              <div className="nav_main" ref={dropdownRef}>
                <button className={`nav-link ${isOpen ? "active" : ""}`} onClick={toggleDropdown}>
                  <BiCube size={25} /> Police
                </button>

                {isOpen && (
                  <div className="dropdown">
                    <button className="dropdown-item" onClick={() => handleSectionClick("training")}>
                      Training
                    </button>
                    <button className="dropdown-item" onClick={() => toggleSubMenu(1)}>FIR's</button>

                    {activeSubMenu === 1 && (
                      <div className="sub-dropdown">
                        <button className="sub-dropdown-item" onClick={() => handleSectionClick("newcriminal")}>
                          A New Criminal Law
                        </button>
                        <button className="sub-dropdown-item" onClick={() => handleSectionClick("chargesheet")}>
                          Charge Sheet
                        </button>
                        <button className="sub-dropdown-item" onClick={() => handleSectionClick("zerofir")}>
                          Zero FIR
                        </button>
                        <button className="sub-dropdown-item" onClick={() => handleSectionClick("efir")}>
                          E FIR
                        </button>
                      </div>
                    )}
                    <button className="dropdown-item" onClick={() => handleSectionClick("awareness/campaign")}>
                      Awareness/Campaign
                    </button>
                    <button className="dropdown-item" onClick={() => handleSectionClick("forensic/visits")}>
                      Forensic Visits
                    </button>
                  </div>
                )}
              </div>
            )
              :
              (

                <div className="nav_main" style={{ display: "flex" }}>
                  <button className={`nav-link ${activeSection?.section === 'training' ? 'active' : ''}`} onClick={() => handleSectionClick("training")}><img src={training} alt="Training Icon" className="nav-icon" /> Training</button>
                  <div className="nav-divider"></div>
                  <button className={`nav-link ${['newcriminal', 'chargesheet', 'zerofir', 'efir'].includes(activeSection?.section) ? 'active' : ''}`} onClick={() => toggleSubMenu(1)}> <img src={fir} alt="Training Icon" className="nav-icon" /> FIR's ▾ </button>
                  <div className="nav-divider"></div>

                  {activeSubMenu === 1 && (
                    <div className="dropdown" style={{ top: "140px", left: "7rem" }}>

                      <div className="sub-dropdown">
                        <button className="sub-dropdown-item" onClick={() => handleSectionClick("newcriminal")}>
                          A New Criminal Law
                        </button>
                        <button className="sub-dropdown-item" onClick={() => handleSectionClick("chargesheet")}>
                          Charge Sheet
                        </button>
                        <button className="sub-dropdown-item" onClick={() => handleSectionClick("zerofir")}>
                          Zero FIR
                        </button>
                        <button className="sub-dropdown-item" onClick={() => handleSectionClick("efir")}>
                          E FIR
                        </button>
                      </div>
                    </div>
                  )}

                  <button className={`nav-link ${activeSection?.section === 'awareness/campaign' ? 'active' : ''}`} onClick={() => handleSectionClick("awareness/campaign")}>
                    <img src={awareness} alt="Training Icon" className="nav-icon" />
                    Awareness/Campaign
                  </button>

                  <div className="nav-divider"></div>


                  <button className={`nav-link ${activeSection?.section === 'forensic/visits' ? 'active' : ''}`} onClick={() => handleSectionClick("forensic/visits")}><img src={forensicvisit} alt="Training Icon" className="nav-icon" />  Forensic Visits</button>
                </div>


              )

          )}

          {users === 'chief secretary' ? <div className="nav-divider"></div> : null}


          {(users === 'chief secretary' || users === 'prosecution') && (
            <li className={`nav-link ${activeSection?.section === 'prosecution' ? 'active' : ''}`} onClick={() => handleSectionClick('prosecution')}>
              {/* <Home /> Prosecution */}
              <GavelIcon /> Prosecution
            </li>
          )}

          {users === 'chief secretary' ? <div className="nav-divider"></div> : null}


          {(users === 'chief secretary' || users === 'court') && (
            <li className={`nav-link ${activeSection?.section === 'court' ? 'active' : ''}`} onClick={() => handleSectionClick('court')}>
              {/* <TbTable size={25} /> Court */}
              <BalanceIcon size={25} /> Court
            </li>
          )}

          {users === 'chief secretary' ? <div className="nav-divider"></div> : null}


          {(users === 'chief secretary' || users === 'correctionalservices') && (
            <li className={`nav-link ${activeSection?.section === 'correctionalservices' ? 'active' : ''}`} onClick={() => handleSectionClick('correctionalservices')}>
              {/* <AiTwotoneThunderbolt /> Correctional Services */}
              <FluorescentIcon /> Correctional Services
            </li>
          )}


          {users === 'chief secretary' ? <div className="nav-divider"></div> : null}


          {(users === 'chief secretary' || users === 'forensic') && (
              <>
                {/* Forensic Science Section */}
                <li 
                  className={`nav-link ${activeSection?.section === 'science' ? 'active' : ''}`} 
                  onClick={() => handleSectionClick('science')}
                >
                  <BiotechIcon size={25} /> Forensic Science Department
                </li>
                <li 
                  className={`nav-link ${activeSection?.section === 'report' ? 'active' : ''}`} 
                  onClick={() => {handleSectionClick('report');
                    generatePDF()}}
                >
                  <PictureAsPdfIcon size={25} /> Generate Report
                </li>
              </>
            )}


        </ul>
      </div>


      {
        users === 'chief secretary' ? contentMap[activeSection?.section] || (

          <div style={{ height: "74vh", marginTop: "3rem", display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center" }}>
            <h2 style={{ fontSize: "29px", fontWeight: "500" }}>ICJS-Interoperable Criminal Justice System</h2>
            <p style={{ fontSize: "18px" }}>MAHARASHTRA RESEARCH & VIGILANCE MARVEL
              FOR ENHANCED LAW ENFORCEMENT LIMITED</p>
            <img src={logo} alt="Logo" style={{ width: "20rem" }} />

          </div>) : contentMap[activeSection?.section] || (users === "police" ? contentMap["training"]
            : users === "court" ? contentMap["court"]
              : users === "forensic" ? contentMap["science"]
                : users === "prosecution" ? contentMap["prosecution"]
                  : contentMap["correctionalservices"])
      }

      {
        openmodal && 
        <ReportGencomp />
      }

    </div>
  );
}
