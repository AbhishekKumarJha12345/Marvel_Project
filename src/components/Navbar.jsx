import { useState, useEffect, useRef } from "react";
import { BiCube } from "react-icons/bi";
import { AiTwotoneThunderbolt } from "react-icons/ai";
import { TbTable } from "react-icons/tb";
import { Home, FileText } from "lucide-react";
import MasterTrainers from "./Police/MasterTrainers";
import Dashboard1 from "./Forensic/Scripts/Dashboard1";
import CriminalPages from "./Prosecution/Criminalpages";
import PoliceOfficers from "./Police/PoliceOfficers";
import Carousel from "./Police/Carousel";
import Forensicvisits from "./Police/Forensicvisits";
import Dashboard2 from "./Court/CSS/Script/Dashboard2";
import Firchargesheets from "./Police/FIR/Chargesheets/Firchargesheets";
import Efir from "./Police/FIR/Efir/Efir";
import FirNewcriminal from "./Police/FIR/Newcriminal/FirNewcriminal";
import FirZero from "./Police/FIR/Zerofir/FirZero";
import Correctionalservicetab from "./Correctional Services/Correctionalservicetab";
import "../styles/Dashboard.scss";
import axios from "axios";
import axiosInstance from "../utils/axiosInstance";
import GavelIcon from '@mui/icons-material/Gavel';
import BiotechIcon from '@mui/icons-material/Biotech';
import BalanceIcon from '@mui/icons-material/Balance';

import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

import FluorescentIcon from '@mui/icons-material/Fluorescent';
import logo from '../../dist/assets/logo22-DGid_2oD.png'
import ModalComponent from './Police/ModalComponent'

import Demo from '../components/Police/Demo'

import MaharashtraPoliceMap from './CS/Csstartpage'

import Adminviewe from '../../src/components/Admin/Adminviewe'
import Adminregister from '../../src/components/Admin/Admincontroll'
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
  IconButton,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import ReportGencomp from "./ReportGen/ReportGenComp";
import training from '../assets/police/training.svg'
import forensicvisit from '../assets/police/forinsic_visit.svg'
import fir from '../assets/police/fir.svg'
import awareness from '../assets/police/awareness.svg'
import PoliceTraining from "./Police/PoliceTraining";

import { DialogActions } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";


import Csdashboard from './Police/Home';



const exporttrainingRefDetails = [
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
    `,
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
    `,
  },
];

export default function Dashboard({ users }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [activeSection, setActiveSection] = useState({}); // Unified state for all sections
  // const [activeSection, setActiveSection] = useState(null); // Unified state for all sections

  const sub_role = localStorage.getItem("sub_role")

  console.log("sub_role : ", sub_role);
  console.log("users : ", users);


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

  const [trainingData, setTrainingData] = useState("");
  const getTrainingData = async () => {
    try {
      const response = await axiosInstance.get("/live_data");
      console.log(response.data, "Trainig data response ----------");
      setTrainingData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // getTrainingData();
  }, []);

  const trainingRef = useRef(null); // Reference to PoliceTraining component
  const [rloading, setRloading] = useState(false)
  const handleExportPoliceTraining = async () => {
    setRloading(true)
    const pdf = new jsPDF("p", "mm", "a4"); // Create A4 size PDF
    const margin = 10;
    let yPosition = 20; // Start position for text

    // 📌 Capture PoliceTraining component as an image
    if (trainingRef.current) {
      const canvas = await html2canvas(trainingRef.current, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");

      const imgWidth = 180; // Fit image width into A4
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio

      pdf.addImage(imgData, "PNG", margin, yPosition, imgWidth, imgHeight);
      yPosition += imgHeight + 10; // Move below image
    }

    // 📌 Add a separator
    pdf.setDrawColor(0);
    pdf.line(10, yPosition, 200, yPosition);
    yPosition += 10;

    // 📌 Loop through exporttrainingRefDetails and add formatted text
    exporttrainingRefDetails.forEach((item, index) => {
      pdf.setFontSize(14);
      pdf.setFont("helvetica", "bold");

      // 🟢 Check if title fits, else move to a new page
      if (yPosition + 10 > 280) {
        pdf.addPage();
        yPosition = 20;
      }
      pdf.text(item.name, margin, yPosition);
      yPosition += 6;

      pdf.setFontSize(11);
      pdf.setFont("helvetica", "normal");

      // 📌 Properly format long text for PDF
      const textLines = pdf.splitTextToSize(item.data, 180);
      let pageHeight = 280; // Usable page height
      let lineHeight = 6; // Space between lines

      textLines.forEach((line) => {
        // 🟢 Check if line fits on the current page
        if (yPosition + lineHeight > pageHeight) {
          pdf.addPage(); // Add a new page
          yPosition = 20; // Reset yPosition for new page
        }
        pdf.text(line, margin, yPosition);
        yPosition += lineHeight;
      });

      // 📌 Add separator for sections
      if (index !== exporttrainingRefDetails.length - 1) {
        pdf.line(10, yPosition, 200, yPosition);
        yPosition += 10;
      }
    });

    // 📌 Save the PDF
    pdf.save("PoliceTraining_Report.pdf");
    setRloading(false)
  };


  const zoneMapping = {
    Amravati: ["Akola", "Amravati Rural", "Buldana", "Washim", "Yavatmal"],
    'Chhatrapati Sambhajinagar': ["Chhatrapati Sambhajinagar", "Beed", "Hingoli", "Jalna", "Latur", "Nanded", "Osmanabad", "Parbhani"],
    Konkan: ["Mumbai", "Mumbai Suburban", "Palghar", "Raigad", "Ratnagiri", "Sindhudurg", "Thane Rural"],
    'Nagpur Rural': ["Bhandara", "Chandrapur", "Gadchiroli", "Gondia", "Nagpur Rural", "Wardha"],
    Nashik: ["Ahmednagar", "Dhule", "Jalgaon", "Nandurbar", "Nashik"],
    Pune: ["Kolhapur", "Pune Rural", "Sangli", "Satara", "Solapur Rural"],
  };

    const downloadPDF = (newData, subrole) => {
      console.log("newData:", newData);
  
      const doc = new jsPDF({ orientation: "landscape" });
      let pageHeight = doc.internal.pageSize.height;
      let pageWidth = doc.internal.pageSize.width;
      let y = 15; // Start vertical position
      let pageNumber = 1;
  
      const { timeStamp, submited_by, email, rang, district, sampleDataIN } = newData;
     
  
      
      // Function to add footer
      const addFooter = () => {
          doc.setFontSize(10);
          doc.setTextColor(100);
          doc.text(`Email: ${email}`, 14, pageHeight - 10);
          doc.text(`Page ${pageNumber}`, pageWidth - 30, pageHeight - 10);
      };
  
      // Add Header Logo

      
      doc.addImage(logo, "PNG", pageWidth / 2 - 15, y, 30, 30);
      y += 40;
  
      // Title
      doc.setFontSize(22);
      doc.setTextColor(30, 30, 120);
      doc.setFont("helvetica", "bold");
      doc.text("MARVEL CONSOLIDATED REPORT", pageWidth / 2 - 55, y);
      y += 12;
  
      // Divider Line
      doc.setDrawColor(100, 100, 100);
      doc.line(10, y, pageWidth - 10, y);
      y += 8;
  
      // Report Metadata
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.setFont("helvetica", "bold");
      doc.text(`Download On:`, 14, y);
      doc.text(`Download by:`, 14, y + 8);
      doc.text(`Email:`, 14, y + 16);



      // doc.setDrawColor(100, 100, 100);
      // doc.line(10, y, pageWidth - 10, y);
      // y += 8;
  
      doc.setFont("helvetica", "normal");
      doc.text(timeStamp, 50, y);
      doc.text(submited_by, 50, y + 8);
      doc.text(email, 50, y + 16);
      doc.text(subrole, 50, y + 24);
      doc.text(rang, 50, y + 32);
      doc.text(district, 50, y + 40);
  
      y += 50;
  
      if (Object.keys(sampleDataIN).length === 0) {
          doc.setTextColor(255, 0, 0);
          doc.setFontSize(14);
          doc.text("⚠ No data available for the assigned zone/district.", 14, y);
          addFooter();
          doc.save("Marvel_Consolidated_Report.pdf");
          return;
      }
  
      // // Iterate Over Zones
      // Object.entries(filteredData).forEach(([zone, districts]) => {
      //     doc.setFontSize(14);
      //     doc.setTextColor(200, 0, 0);
      //     doc.setFont("helvetica", "bold");
      //     y += 8;
      //     doc.setDrawColor(200, 0, 0);
      //     doc.line(14, y, pageWidth - 14, y);
      //     y += 6;
  
      //     Object.entries(districts).forEach(([district, forms]) => {
      //         doc.setFontSize(12);
      //         doc.setTextColor(0, 0, 255);
      //         doc.setFont("helvetica", "bold");
      //         y += 5;
  
      const formatColumnName = (str) => {
        return str
            .split('_')  // Split by underscore
            .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
            .join(' '); // Join with space
    };
    
    Object.entries(sampleDataIN).forEach(([formType, records]) => {
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        doc.setFont("helvetica", "bold");
    
        // Format the form type title
        const formattedFormType = formatColumnName(formType);
        doc.text(`${formattedFormType}`, 10, y);  
        y += 4;
    
        if (records.length > 0) {
            // Convert keys to formatted headers
            const tableColumn = Object.keys(records[0]).map(formatColumnName);
            const tableRows = records.map(row => Object.values(row));
    
            doc.autoTable({
                startY: y + 2,
                head: [tableColumn],
                body: tableRows,
                theme: "grid",
                margin: { left: 14, right: 14 },
                styles: {
                    fontSize: 9,
                    cellPadding: 3,
                    halign: "center",
                    textColor: [50, 50, 50],
                },
                headStyles: {
                    fillColor: [41, 128, 185],
                    textColor: [255, 255, 255],
                    fontSize: 10,
                    fontStyle: "bold",
                },
                bodyStyles: {
                    fillColor: (rowIndex) => (rowIndex % 2 === 0 ? [245, 245, 245] : [255, 255, 255]),
                },
                alternateRowStyles: {
                    fillColor: [235, 235, 235],
                },
                didDrawPage: () => {
                    addFooter();
                },
            });
    
            y = doc.autoTable.previous.finalY + 10;
    
            if (y > pageHeight - 20) {
                doc.addPage();
                pageNumber++;
                y = 15;
            }
        } else {
            doc.setFont("helvetica", "italic");
            doc.setTextColor(150, 0, 0);
            doc.text("No data available", 30, y);
            y += 5;
        }
    });
  
      //         y += 8;
      //     });
  
      //     y += 12;
      // });
  
      addFooter();
      doc.save("Marvel_Consolidated_Report.pdf");
  };
  

// ---------------------------------------------------------------------------------------
  const handleReport = async () => {
    try {
      const district = localStorage.getItem("district");
      const zone = localStorage.getItem("zone");
      // const type = "police_training";
      const type = ['police_training','pendency_in_bns','offences_against_body','sections_in_bns','property_offenses',
        'untraced_missing','esakshya_unit','itsso_compliance','esakshya_7_more','stolen_recovered_property',"conviction_rate_in_bns" ,'fir_and_zero_firs' ,
        'e_firs','forensic_visits'];
      const token = localStorage.getItem("token"); // Ensure token is available
  
      const requestBody = {
        district,
        zone,
        type,
      };
  
      const response = await axiosInstance.post("/get_reports", requestBody, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`, // Include token
        },
      });
  
      console.log("Report Data:", response.data);

      

      const subrole = localStorage.getItem('sub_role')

      const newData = {
        timeStamp: (() => {
          const date = new Date();
          const day = String(date.getDate()).padStart(2, '0'); // Add leading zero for single digits
          const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
          const year = date.getFullYear();
          const hours = String(date.getHours()).padStart(2, '0');
          const minutes = String(date.getMinutes()).padStart(2, '0');
          const seconds = String(date.getSeconds()).padStart(2, '0');
          return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
        })(),
        submited_by: localStorage.getItem('userName') || "",
        email: localStorage.getItem('email') || "",
        rang: localStorage.getItem('zone') || "",
        district: localStorage.getItem('district') || "",
        sampleDataIN:response.data
      };
      
      downloadPDF(newData,subrole);

    } catch (error) {
      console.error("Error fetching report:", error);
    }
  };
  // -----------------------------------------------------------------------------------



  const GenerateReportButton = () => (
    users === "chief secretary" || users === "ACS" || users === "DGP" ? (
      // <div style={{ display: "flex", justifyContent: "flex-end",position:"relative",top:"-45px" }}>
      //   <button
      //     onClick={() => handleReport()}
      //     style={{
      //       padding: "10px 20px",
      //       fontSize: "16px",
      //       fontWeight: "bold",
      //       backgroundColor: "#007BFF",
      //       color: "#fff",
      //       border: "none",
      //       borderRadius: "5px",
      //       cursor: "pointer",
      //       transition: "background 0.3s ease"
      //     }}
      //     onMouseOver={(e) => e.target.style.backgroundColor = "#0056b3"}
      //     onMouseOut={(e) => e.target.style.backgroundColor = "#007BFF"}
      //   >
      //     Generate Report
      //   </button>
      // </div>
      null
    ) : null
  );

  const contentMap = {
    "training": (
    <div className="content">
      <h1 className="heading" style={{ textAlign: "center" }}>New Criminal Laws Training</h1>
      <GenerateReportButton />
      <MaharashtraPoliceMap catogoryBar="Training" />
    </div>
  ),
  "forensic/visits": (
    <div className="content">
      <h1 className="heading" style={{ textAlign: "center" }}>Forensic Visits</h1>
      <GenerateReportButton />
      <MaharashtraPoliceMap catogoryBar="FORENSIC" />
    </div>
  ),
    "court": <div className="content"><h1 className="heading">Court Visits</h1><Dashboard2 /></div>,
    "science": <div className="content"><h1 className="heading">Forensic Science Department</h1><Dashboard1 /></div>,
    "prosecution": <div className="content"><h1 className="heading">Prosecution Visits</h1><CriminalPages /></div>,
    "correctionalservices": <div className="content"><h1 className="heading">Correctional services</h1><Correctionalservicetab /></div>,
    "newcriminal": <div className="content"><FirNewcriminal /></div>,
    "chargesheet": <div className="content"><Firchargesheets /></div>,
    "zerofir": <div className="content"><FirZero /></div>,
    "efir": <div className="content"><Efir /></div>,
    "FIR": (
      <div className="content">
        <h1 className="heading" style={{ textAlign: "center" }}>FIR</h1>
        <GenerateReportButton />
        <MaharashtraPoliceMap catogoryBar="FIR" />
      </div>
    ),
    "admin": <div className="content"><Adminviewe /> </div>,

  };
  const [openmodal, setOpenmodal] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const openreportmodal = () => {
    setOpenmodal(true);
  };






  const [showDateRangeModal, setShowDateRangeModal] = useState(false); // Show date picker first
  const [dateRange, setDateRange] = useState({
    fromDate: localStorage.getItem("from_date") || "",
    toDate: localStorage.getItem("to_date") || new Date().toISOString().split("T")[0], // Default to today's date
  });


  useEffect(() => {
  if (!localStorage.getItem("to_date")) {
    localStorage.setItem("to_date", dateRange.toDate);
  }
}, [dateRange.toDate]);

const handleDateSelection = () => {
  setDateRange((prev) => {
    const updatedToDate = prev.toDate || new Date().toISOString().split("T")[0]; // Ensure toDate is set
    localStorage.setItem("to_date", updatedToDate); // Store in localStorage

    return { ...prev, toDate: updatedToDate };
  });

  setShowDateRangeModal(false); // Close Date Picker
  setShowModal(true); // Show Main Modal
};





  return (
    <div className="dashboard">
      <div className="navbar">
        <ul className="nav-items">

          {users === 'admin' && (

            <li className={`nav-link active`} onClick={() => handleSectionClick('admin')}>
              <SupervisorAccountIcon /> All Users
            </li>

          )

          }


          {(users === 'chief secretary' || users === 'police' || users === 'ACS' || users == 'DGP') && (


            (users === "chief secretary" || users === 'ACS' || users == 'DGP') ? (
              <div className="nav_main flex" ref={dropdownRef}>
                {/* <button
                  className={`nav-link ${activeSection?.section === "Home" ? "active" : "" }`}
                  onClick={() => handleSectionClick("Home")}

                >
                  <BiCube size={25} /> Home
                </button> */}

                <button
                  className={`nav-link ${activeSection?.section === "training" || activeSection?.section === "FIR" || activeSection?.section === "forensic/visits" ? "active" : ""}`}
                  onClick={toggleDropdown}
                >
                  <BiCube size={25} /> Police
                </button>

                {isOpen && (
                  <div className="dropdown" style={{ zIndex: "999" }}>
                    
                    <button
                      className="dropdown-item"
                      onClick={() => handleSectionClick("training")}
                    >
                      Training
                    </button>
                    <button
                      className="dropdown-item"
                      // onClick={() => toggleSubMenu(1)}
                      onClick={() => handleSectionClick("FIR")}
                    >
                      FIR
                    </button>
                    <button
                      className="dropdown-item"
                      onClick={() => handleSectionClick("forensic/visits")}
                    >
                      Forensic Visits
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                {['SP', 'CP'].some(role => sub_role.includes(role)) ? (
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                    style={{ backgroundColor: "#2d3748", position: "absolute", right: "0", top: "70px" }}
                    onClick={() => {
                      console.log("Open modal : ",activeSection);
                      // setShowDateRangeModal(true);
                      setShowModal(true);
                    }}
                  >
                    Add Data
                  </button>
                ) : null}
                <div className="nav_main" style={{ display: "flex" }}>
                  <button
                    className={`nav-link ${activeSection?.section === "training" ? "active" : ""
                      }`}
                    onClick={() => handleSectionClick("training")}
                  >
                    <img
                      src={training}
                      alt="Training Icon"
                      className="nav-icon"
                    />{" "}
                    Police
                  </button>
                  <div className="nav-divider"></div>
                  <button
                    className={`nav-link ${activeSection?.section === "FIR" ? "active" : ""
                      }`}
                    onClick={() => handleSectionClick("FIR")}
                  >
                    <img
                      src={fir}
                      alt="Training Icon"
                      className="nav-icon"
                    />{" "}
                    FIR
                  </button>

                  <div className="nav-divider"></div>

                  <button
                    className={`nav-link ${activeSection?.section === "forensic/visits" ? "active" : ""
                      }`}
                    onClick={() => handleSectionClick("forensic/visits")}
                  >
                    <img
                      src={forensicvisit}
                      alt="Training Icon"
                      className="nav-icon"
                    />{" "}
                    Forensic Visits
                  </button>
                </div>
              </>
            ))}

          {/* {users === "chief secretary" ? (
            <div className="nav-divider"></div>
          ) : null} */}

          {/* {(users === "chief secretary" || users === "Prosecutor") && (
            <li
              className={`nav-link ${activeSection?.section === "prosecution" ? "active" : ""
                }`}
              onClick={() => handleSectionClick("prosecution")}
            >
              <GavelIcon /> Prosecution
            </li>
          )}

          {users === "chief secretary" ? (
            <div className="nav-divider"></div>
          ) : null}

          {(users === "chief secretary" || users === "Court") && (
            <li
              className={`nav-link ${activeSection?.section === "court" ? "active" : ""
                }`}
              onClick={() => handleSectionClick("court")}
            >
              <BalanceIcon size={25} /> Court
            </li>
          )}

          {users === "chief secretary" ? (
            <div className="nav-divider"></div>
          ) : null}

          {(users === "chief secretary" ||
            users === "Correction") && (
              <li
                className={`nav-link ${activeSection?.section === "correctionalservices"
                  ? "active"
                  : ""
                  }`}
                onClick={() => handleSectionClick("correctionalservices")}
              >
                <FluorescentIcon /> Correctional Services
              </li>
            )}

          {users === "chief secretary" ? (
            <div className="nav-divider"></div>
          ) : null}

          {(users === "chief secretary" || users === "Forensic") && (
            <>


              <li
                className={`nav-link ${activeSection?.section === "science" ? "active" : ""
                  }`}
                onClick={() => handleSectionClick("science")}
              >
                <BiotechIcon size={25} /> Forensic Science Department
              </li>

              {(users === "chief secretary") ?

                (<li
                  className={`nav-link ${activeSection?.section === "report" ? "active" : ""
                    }`}
                  onClick={() => {
                    handleSectionClick("report");
                    generatePDF();
                  }}
                >
                  <PictureAsPdfIcon size={25} /> Generate Report
                </li>) : null

              }

            </>
          )} */}
        </ul>
      </div>


      {
        contentMap[activeSection?.section] ||
        (users === "chief secretary"
          ? contentMap["training"]:
          users === "ACS"
          ? contentMap["training"] :
          users === "DGP"
          ? contentMap["training"]
          : users === "police"
            ? contentMap["training"] && setActiveSection({ section: "training" })
            : users === "Court"
              ? contentMap["court"]
              : users === "Forensic"
                ? contentMap["science"]
                : users === "Prosecutor"
                  ? contentMap["prosecution"]
                  : users === "admin"
                    ? contentMap["admin"]
                    : contentMap["correctionalservices"])
      }

      {/* <ModalComponent
        open={showModal}
        type="police"
        training_active={activeSection} // Pass the selected section as a prop
        onClose={() => setShowModal(false)}
      /> */}


      {/* Date Range Picker Modal */}
      <Dialog open={showDateRangeModal} fullWidth maxWidth="sm" onClose={() => setShowDateRangeModal(false)}>
        <DialogTitle sx={{ backgroundColor: "#2d3748", color: "white", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          Select Date Range
          <IconButton onClick={() => setShowDateRangeModal(false)} sx={{ color: "white" }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <Box display="flex" gap={2} flexDirection="column">
            <TextField
              label="From Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={dateRange.fromDate}
              onChange={(e) => {
                const newFromDate = e.target.value;
                setDateRange((prev) => ({ ...prev, fromDate: newFromDate }));
                localStorage.setItem("from_date", newFromDate);
              }}
              fullWidth
              className="mt-5"
            />
            <TextField
              label="As on Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={dateRange.toDate} // Default to today's date
              fullWidth
              InputProps={{ readOnly: true }} // Read-only, cannot be changed manually
            />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleDateSelection} color="primary" variant="contained" sx={{ backgroundColor: "#4a5568", "&:hover": { backgroundColor: "#5a667a" } }}>
            OK
          </Button>
        </DialogActions>
      </Dialog>

      {/* Main Modal (Opens after selecting Date Range) */}
      {showModal && (
        <ModalComponent
          open={showModal}
          type="police"
          training_active={activeSection} // Pass the selected section
          onClose={() => setShowModal(false)}
          dateRange={dateRange} // Pass selected date range
        />
      )}


    </div>
  );
}
