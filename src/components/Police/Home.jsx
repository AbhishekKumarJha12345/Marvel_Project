// import React, { useState, useRef, useEffect } from "react";
// import { FaChevronDown, FaChevronUp } from "react-icons/fa";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../../styles/Home.css";
// import background from "../../assets/SVGBG_Image.svg";
// import axios from "axios";


// const TrainingComponent = ({
//   sections,
//   activeSections,
//   setActiveSections,
//   cardName,
// }) => {
//   const handleToggle = (section) => {
//     setActiveSections((prev) => ({
//       ...prev,
//       [cardName]: prev[cardName] === section ? null : section,
//     }));
//   };

//   const [apiData, setApiData] = useState(null);
  

//   const insights = {
//     training: {
//       DescriptiveAnalysis: [
//         "Training percentages varied, with peaks in May 2024, January 2025, and March 2025 (100%) and dips in September 2024 (40%).",
//         "Officers were consistently better trained than personnel.",
//         "October 2024 had the highest training volume but moderate completion (71.86%).",
//       ],
//       PrescriptiveInsights: [
//         "Success Stories: May 2024, January & March 2025 (100% trained), November 2024 (99%).",
//       ],
//       PredictiveEstimations: [
//         "Needs Improvement: September 2024 (40%), April 2024 (62.5%), October 2024 (high personnel but only 71.86% trained).",
//       ],
//     },
//     fir: [
//       "FIR Registration Process Optimization",
//       "Crime Data Analysis & Trends",
//       "Digital Evidence Collection & Storage",
//     ],
//     prosecution: ["Prosecution insights here..."],
//     ICJSCaseProcessing: ["ICJS Case Processing"],
//     eSummonsDigitalRecords: ["eSummons & Digital Records"],
//     VideoHearingsDisposalRate: ["Video Hearings & Disposal Rate"],
//     ProsecutionForensicsIntegration: ["Prosecution & Forensics Integration"],
//     NYAYSHRUTIImplementation: ["NYAYSHRUTI Implementation"],
//     ComplianceSection: ["Compliance Section"],
//     ComplianceSection479: ["Compliance Section 479"],
//     CorrectionalInstitutions: ["Correctional Institutions"],
//     ForensicLabPendencyMonitoring: ["Forensic Lab Pendency Monitoring"],
//     MobileForensicVansDeployment: ["Mobile Forensic Vans Deployment"],
//     Forensic: [
//       "Forensic Lab Pendency Monitoring",
//       "Mobile Forensic Vans Deployment",
//     ],
//   };







//   const fetchData = async () => {
//     try {
//     //   const response = await axios.get("https://mhmarvel.org/api2/train_llm");
//       const response = await axios.get("http://192.168.1.44:5555/api/train_llm");
    
//       setApiData(response.data.data.report);

//     } catch (err) {
//       console.error("API Error:", err);
//     } 
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);



//   useEffect(()=>{
    
//     console.log("Repoert Data : ",apiData);

//   },[apiData])




//   return (
//     <div className="mt-3">
//       {sections.map((section) => (
//         <div key={section}>
//           {/* Section Title with Toggle */}
//           <div
//             className="p-1 border rounded bg-gray-200 shadow-sm d-flex justify-content-between align-items-center mb-2"
//             onClick={() => handleToggle(section)}
//             style={{ cursor: "pointer" }}
//           >
//             <h5 className=" text-dark text-capitalize">
//               {section.replace(/([A-Z])/g, " $1")}
//             </h5>
//             {activeSections[cardName] === section ? (
//               <FaChevronUp />
//             ) : (
//               <FaChevronDown />
//             )}
//           </div>

//           {/* Collapsible Content */}
//           {activeSections[cardName] === section && (
//             <div
//               className="mt-2 p-3 bg-white rounded shadow-sm font-inter font-medium mb-2"
//               style={{
//                 maxHeight: "200px", // Adjust height as needed
//                 overflowY: "auto", // Enables vertical scrolling
//                 scrollbarWidth: "thin", // For Firefox
//                 scrollbarColor: "#ccc transparent", // Custom scrollbar color
//               }}
//             >
//               {Array.isArray(insights[section])
//                 ? insights[section].map((item, index) => (
//                     <p
//                       key={index}
//                       className="mb-1 font-inter text-start font-weight-700"
//                     >
//                       • {item}
//                     </p>
//                   ))
//                 : Object.entries(insights[section] || {}).map(
//                     ([category, items]) => (
//                       <div key={category}>
//                         <h6 className="fw-bold text-start">
//                           {category.replace(/([A-Z])/g, " $1")}
//                         </h6>
//                         {items.map((item, index) => (
//                           <p
//                             key={index}
//                             className="mb-1 font-inter text-start font-weight-700"
//                           >
//                             • {item}
//                           </p>
//                         ))}
//                       </div>
//                     )
//                   )}
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// const Dashboard3 = () => {
//   // Store active sections for multiple cards
//   const [activeSections, setActiveSections] = useState({
//     Police: "training",
//     Court: "ICJSCaseProcessing",
//     "Correctional Service": "ComplianceSection",
//     Prosecution: "prosecution",
//     "Forensic Department": "ForensicLabPendencyMonitoring",
//   });

//   // Reference for content height detection
//   const contentRef = useRef(null);
//   const [contentHeight, setContentHeight] = useState("100vh");

//   useEffect(() => {
//     if (contentRef.current) {
//       setContentHeight(`${contentRef.current.scrollHeight}px`);
//     }
//   }, [activeSections]); // Update height when content expands/collapses

//   return (
// <div style={{ position: "relative", zIndex: "1",height:"750px"}}>
// {/* Background Cover */}
//       <div
//         className="position-absolute top-0 start-0 w-100 h-100"
//         style={{
//           // minHeight: "auto",
//           height: contentHeight, // Dynamically adjusts to match content height
//           backgroundImage: `url(${background})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           backgroundRepeat: "no-repeat",
//           zIndex: "-1",
//           backgroundColor: "white",
//           borderRadius:"10px",
//           transition: "height 0.3s ease-in-out", // Smooth height adjustment
//         }}
//       />

//       {/* Main Content */}
//       <div ref={contentRef} className="container py-2">
//         <h3 className="text-center">Welcome to MARVEL</h3>

//         <div className="row g-4 justify-content-center align-items-stretch">
//   {/* First Row - 3 Cards */}
//   <div className="col-md-4 d-flex">
//     <div className="p-2 rounded shadow text-center w-100 d-flex flex-column bg-gray-300">
//       <h4>Police</h4>
//       <TrainingComponent
//         sections={["training", "fir", "Forensic"]}
//         activeSections={activeSections}
//         setActiveSections={setActiveSections}
//         cardName="Police"
//       />
//     </div>
//   </div>

//   <div className="col-md-4 d-flex">
//     <div className="p-2 rounded shadow text-center w-100 d-flex flex-column bg-gray-300">
//       <h4>Court</h4>
//       <TrainingComponent
//         sections={["ICJSCaseProcessing", "eSummonsDigitalRecords", "VideoHearingsDisposalRate"]}
//         activeSections={activeSections}
//         setActiveSections={setActiveSections}
//         cardName="Court"
//       />
//     </div>
//   </div>

//   <div className="col-md-4 d-flex">
//     <div className="p-2 rounded shadow text-center w-100 d-flex flex-column bg-gray-300">
//       <h4>Correctional Service</h4>
//       <TrainingComponent
//         sections={["ComplianceSection", "ComplianceSection479", "CorrectionalInstitutions"]}
//         activeSections={activeSections}
//         setActiveSections={setActiveSections}
//         cardName="Correctional Service"
//       />
//     </div>
//   </div>

//   {/* Second Row - 2 Cards */}
//   <div className="col-md-6 d-flex">
//     <div className="p-2 rounded shadow text-center w-100 d-flex flex-column bg-gray-300">
//       <h4>Prosecution</h4>
//       <TrainingComponent
//         sections={["prosecution"]}
//         activeSections={activeSections}
//         setActiveSections={setActiveSections}
//         cardName="Prosecution"
//       />
//     </div>
//   </div>

//   <div className="col-md-6 d-flex">
//     <div className="p-2 rounded shadow text-center w-100 d-flex flex-column bg-gray-300">
//       <h4>Forensic Department</h4>
//       <TrainingComponent
//         sections={["ForensicLabPendencyMonitoring", "MobileForensicVansDeployment"]}
//         activeSections={activeSections}
//         setActiveSections={setActiveSections}
//         cardName="Forensic Department"
//       />
//     </div>
//   </div>
// </div>

//       </div>
//     </div>
//   );
// };
// export default Dashboard3;




import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/Home.css";
import background from "../../assets/SVGBG_Image.svg";
import axios from "axios";
// import axiosInstance from "../";
// import axiosInstance from "../utils/axiosInstance";

const TrainingComponent = ({
  sections,
  activeSections,
  setActiveSections,
  cardName,
}) => {
  const handleToggle = (section) => {
    setActiveSections((prev) => ({
      ...prev,
      [cardName]: prev[cardName] === section ? null : section,
    }));
  };

  // const insights = {
  //   training: {
  //     DescriptiveAnalysis: [
  //       "Training percentages varied, with peaks in May 2024, January 2025, and March 2025 (100%) and dips in September 2024 (40%).",
  //       "Officers were consistently better trained than personnel.",
  //       "October 2024 had the highest training volume but moderate completion (71.86%).",
  //     ],
  //     PrescriptiveInsights: [
  //       "Success Stories: May 2024, January & March 2025 (100% trained), November 2024 (99%).",
  //     ],
  //     PredictiveEstimations: [
  //       "Needs Improvement: September 2024 (40%), April 2024 (62.5%), October 2024 (high personnel but only 71.86% trained).",
  //     ],
  //   },
  //   fir: [
  //     "FIR Registration Process Optimization",
  //     "Crime Data Analysis & Trends",
  //     "Digital Evidence Collection & Storage",
  //   ],
  //   prosecution: ["Prosecution insights here..."],
  //   ICJSCaseProcessing: ["ICJS Case Processing"],
  //   eSummonsDigitalRecords: ["eSummons & Digital Records"],
  //   VideoHearingsDisposalRate: ["Video Hearings & Disposal Rate"],
  //   ProsecutionForensicsIntegration: ["Prosecution & Forensics Integration"],
  //   NYAYSHRUTIImplementation: ["NYAYSHRUTI Implementation"],
  //   ComplianceSection: ["Compliance Section"],
  //   ComplianceSection479: ["Compliance Section 479"],
  //   CorrectionalInstitutions: ["Correctional Institutions"],
  //   ForensicLabPendencyMonitoring: ["Forensic Lab Pendency Monitoring"],
  //   MobileForensicVansDeployment: ["Mobile Forensic Vans Deployment"],
  //   Forensic: [
  //     "Forensic Lab Pendency Monitoring",
  //     "Mobile Forensic Vans Deployment",
  //   ],
  // };

  const [error, setError] = useState(null);
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState("100vh");
  const [apiData, setApiData] = useState(null); // ✅ Define setApiData

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://192.168.1.44:5555/api/train_llm"
      );
      console.log("API Response:", response.data.data);
      setApiData(response.data.data); // ✅ Extract the nested data
    } catch (err) {
      setError("Failed to load data from server");
      console.error("API Error:", err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="mt-3">
      {sections.map((section) => (
        <div key={section}>
          {/* Section Title with Toggle */}
          <div
            className="p-1 border rounded bg-gray-200 shadow-sm d-flex justify-content-between align-items-center mb-2"
            onClick={() => handleToggle(section)}
            style={{ cursor: "pointer" }}
          >
            <h5 className=" text-dark text-capitalize">
              {section.replace(/([A-Z])/g, " $1")}
            </h5>
            {activeSections[cardName] === section ? (
              <FaChevronUp />
            ) : (
              <FaChevronDown />
            )}
          </div>

          {/* Collapsible Content */}
          {activeSections[cardName] === section && (
            <div
              className="mt-2 p-3 bg-white rounded shadow-sm font-inter font-medium mb-2"
              style={{
                maxHeight: "200px", // Adjust height as needed
                overflowY: "auto", // Enables vertical scrolling
                scrollbarWidth: "thin", // For Firefox
                scrollbarColor: "#ccc transparent", // Custom scrollbar color
              }}
            >
              {apiData?.report &&
              (section.toLowerCase().includes("police") ||
                section.toLowerCase().includes("training")) ? (
                <p>{apiData.report}</p>
              ) : (
                <p>No report available</p>
              )}

              {/* ---------print ----here report--------------- */}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const Dashboard3 = () => {
  // Store active sections for multiple cards
  const [activeSections, setActiveSections] = useState({
    Police: "training",
    Court: "ICJSCaseProcessing",
    "Correctional Service": "ComplianceSection",
    Prosecution: "prosecution",
    "Forensic Department": "ForensicLabPendencyMonitoring",
  });

  // Reference for content height detection
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState("100vh");

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(`${contentRef.current.scrollHeight}px`);
    }
  }, [activeSections]); // Update height when content expands/collapses

  return (
    <div style={{ position: "relative", zIndex: "1", height: "750px" }}>
      {/* Background Cover */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          // minHeight: "auto",
          height: contentHeight, // Dynamically adjusts to match content height
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: "-1",
          backgroundColor: "white",
          borderRadius: "10px",
          transition: "height 0.3s ease-in-out", // Smooth height adjustment
        }}
      />

      {/* Main Content */}
      <div ref={contentRef} className="container py-2">
        <h3 className="text-center">Welcome to MARVEL</h3>

        <div className="row g-4 justify-content-center align-items-stretch">
          {/* First Row - 3 Cards */}
          <div className="col-md-4 d-flex">
            <div className="p-2 rounded shadow text-center w-100 d-flex flex-column bg-gray-300">
              <h4>Police</h4>
              <TrainingComponent
                sections={["training", "fir", "Forensic"]}
                activeSections={activeSections}
                setActiveSections={setActiveSections}
                cardName="Police"
              />
            </div>
          </div>

          <div className="col-md-4 d-flex">
            <div className="p-2 rounded shadow text-center w-100 d-flex flex-column bg-gray-300">
              <h4>Court</h4>
              <TrainingComponent
                sections={[
                  "ICJSCaseProcessing",
                  "eSummonsDigitalRecords",
                  "VideoHearingsDisposalRate",
                ]}
                activeSections={activeSections}
                setActiveSections={setActiveSections}
                cardName="Court"
              />
            </div>
          </div>

          <div className="col-md-4 d-flex">
            <div className="p-2 rounded shadow text-center w-100 d-flex flex-column bg-grey-300">
              <h4>Correctional Service</h4>
              <TrainingComponent
                sections={[
                  "ComplianceSection",
                  "ComplianceSection479",
                  "CorrectionalInstitutions",
                ]}
                activeSections={activeSections}
                setActiveSections={setActiveSections}
                cardName="Correctional Service"
              />
            </div>
          </div>

          {/* Second Row - 2 Cards */}
          <div className="col-md-6 d-flex">
            <div className="p-2 rounded shadow text-center w-100 d-flex flex-column bg-gray-300">
              <h4>Prosecution</h4>
              <TrainingComponent
                sections={["prosecution"]}
                activeSections={activeSections}
                setActiveSections={setActiveSections}
                cardName="Prosecution"
              />
            </div>
          </div>

          <div className="col-md-6 d-flex">
            <div className="p-2 rounded shadow text-center w-100 d-flex flex-column bg-grey-300">
              <h4>Forensic Department</h4>
              <TrainingComponent
                sections={[
                  "ForensicLabPendencyMonitoring",
                  "MobileForensicVansDeployment",
                ]}
                activeSections={activeSections}
                setActiveSections={setActiveSections}
                cardName="Forensic Department"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard3;