import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/Home.css";
import background from "../../assets/SVGBG_Image.svg";

const parseApiResponse = (response) => {
  const parsedInsights = {
    training: {
      DescriptiveAnalysis: [],
      PrescriptiveInsights: [],
      PredictiveEstimations: [],
    },
  };

  // Ensure response.report exists before attempting to split
  if (!response || !response.report || typeof response.report !== "string") {
    return parsedInsights; // Return empty insights if report is not available
  }

  // Split the response by the section headers (sections are separated by double newlines)
  const sections = response.report.split("\n\n");

  let currentSection = null;

  sections.forEach((section) => {
    if (section.startsWith("**Descriptive Analysis**")) {
      // Extract DescriptiveAnalysis
      currentSection = "DescriptiveAnalysis";
      const descriptiveText = section
        .replace("**Descriptive Analysis**", "")
        .trim()
        .split("\n")
        .map((item) => item.replace(/^\* /, "").trim()); // Remove leading '*' and spaces
      parsedInsights.training.DescriptiveAnalysis = descriptiveText;
    } else if (section.startsWith("**Prescriptive Insights**")) {
      // Extract PrescriptiveInsights
      currentSection = "PrescriptiveInsights";
      const prescriptiveText = section
        .replace("**Prescriptive Insights**", "")
        .trim()
        .split("\n")
        .map((item) => item.replace(/^\* /, "").trim());
      parsedInsights.training.PrescriptiveInsights = prescriptiveText;
    } else if (section.startsWith("**Actionable Predictions**")) {
      // Extract PredictiveEstimations
      currentSection = "PredictiveEstimations";
      const predictiveText = section
        .replace("**Actionable Predictions**", "")
        .trim()
        .split("\n")
        .map((item) => item.replace(/^\d+\./, "").trim());
      parsedInsights.training.PredictiveEstimations = predictiveText;
    } else if (currentSection) {
      // Add additional content to the current section (handling case if content follows headers)
      const contentText = section
        .split("\n")
        .map((item) => item.replace(/^\* /, "").trim());

      // Add content text to the respective section if applicable
      if (currentSection === "DescriptiveAnalysis") {
        parsedInsights.training.DescriptiveAnalysis = [
          ...parsedInsights.training.DescriptiveAnalysis,
          ...contentText,
        ];
      } else if (currentSection === "PrescriptiveInsights") {
        parsedInsights.training.PrescriptiveInsights = [
          ...parsedInsights.training.PrescriptiveInsights,
          ...contentText,
        ];
      } else if (currentSection === "PredictiveEstimations") {
        parsedInsights.training.PredictiveEstimations = [
          ...parsedInsights.training.PredictiveEstimations,
          ...contentText,
        ];
      }
    }
  });

  return parsedInsights;
};

const TrainingComponent = ({
  sections,
  activeSections,
  setActiveSections,
  cardName,
  apiData,
}) => {
  const handleToggle = (section) => {
    setActiveSections((prev) => ({
      ...prev,
      [cardName]: prev[cardName] === section ? null : section,
    }));
  };

  // Combine static insights with API data
  const getInsights = () => {
    // const staticInsights = {
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
    // };

    console.log("apiData : ", apiData);

    return apiData ? parseApiResponse(apiData) : staticInsights;
  };

  const insights = getInsights();

  return (
    <div className="mt-3">
      {sections.map((section) => (
        <div key={section}>
          <div
            className="p-1 border rounded bg-gray-200 shadow-sm d-flex justify-content-between align-items-center mb-2"
            onClick={() => handleToggle(section)}
            style={{ cursor: "pointer" }}
          >
            <h5 className="text-dark text-capitalize">
              {section.replace(/([A-Z])/g, " $1")}
            </h5>
            {activeSections[cardName] === section ? (
              <FaChevronUp />
            ) : (
              <FaChevronDown />
            )}
          </div>

          {activeSections[cardName] === section && (
            <div
              className="mt-2 p-3 bg-white rounded shadow-sm font-inter font-medium mb-2"
              style={{
                maxHeight: "200px",
                overflowY: "auto",
                scrollbarWidth: "thin",
                scrollbarColor: "#ccc transparent",
              }}
            >
              {Array.isArray(insights[section])
                ? insights[section].map((item, index) => (
                    <p key={index} className="mb-1 font-inter text-start">
                      • {item}
                    </p>
                  ))
                : insights[section] &&
                  Object.entries(insights[section]).map(([category, items]) => (
                    <div key={category}>
                      <h6 className="fw-bold text-start">
                        {category.replace(/([A-Z])/g, " $1")}
                      </h6>
                      {items.map((item, index) => (
                        <p key={index} className="mb-1 font-inter text-start">
                          • {item}
                        </p>
                      ))}
                    </div>
                  ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const Dashboard3 = () => {
  const [activeSections, setActiveSections] = useState({
    Police: "training",
    Court: "ICJSCaseProcessing",
    "Correctional Service": "ComplianceSection",
    Prosecution: "prosecution",
    "Forensic Department": "ForensicLabPendencyMonitoring",
  });

  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState("100vh");
  let data = "";
  // Fetch data from backend
  const fetchData = async () => {
    try {
    //   const response = await axios.get("https://mhmarvel.org/api2/train_llm");
      const response = await axios.get("https://192.168.1.44:5555/api/train_llm");
    
      setApiData(response.data.report);

      // Extract only the "report" field
      const reportText = data.report;

      console.log(reportText, ".............this ismeurs kiran ..............");
    } catch (err) {
      setError("Failed to load data from server");
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(`${contentRef.current.scrollHeight}px`);
    }
  }, [activeSections, apiData]);

  return (
    <div style={{ position: "relative", zIndex: "1", height: "750px" }}>
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          height: contentHeight,
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: "-1",
          backgroundColor: "white",
          borderRadius: "10px",
          transition: "height 0.3s ease-in-out",
        }}
      />

      <div ref={contentRef} className="container py-2">
        <h3 className="text-center">Welcome to MARVEL</h3>

        {loading && (
          <div className="text-center py-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p>Loading dashboard data...</p>
          </div>
        )}

        {error && (
          <div className="alert alert-warning text-center">
            {error}
            <button className="btn btn-sm btn-primary ms-3" onClick={fetchData}>
              Retry
            </button>
          </div>
        )}

        <div className="row g-4 justify-content-center align-items-stretch">
          <div className="col-md-4 d-flex">
            <div className="p-2 rounded shadow text-center w-100 d-flex flex-column bg-gray-300">
              <h4>Police</h4>
              <TrainingComponent
                sections={["training", "fir", "Forensic"]}
                activeSections={activeSections}
                setActiveSections={setActiveSections}
                cardName="Police"
                apiData={apiData}
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
                apiData={apiData}
              />
            </div>
          </div>

          <div className="col-md-4 d-flex">
            <div className="p-2 rounded shadow text-center w-100 d-flex flex-column bg-blue-100">
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
                apiData={apiData}
              />
            </div>
          </div>

          <div className="col-md-6 d-flex">
            <div className="p-2 rounded shadow text-center w-100 d-flex flex-column bg-gray-300">
              <h4>Prosecution</h4>
              <TrainingComponent
                sections={["prosecution"]}
                activeSections={activeSections}
                setActiveSections={setActiveSections}
                cardName="Prosecution"
                apiData={apiData}
              />
            </div>
          </div>

          <div className="col-md-6 d-flex">
            <div className="p-2 rounded shadow text-center w-100 d-flex flex-column bg-green-300">
              <h4>Forensic Department</h4>
              <TrainingComponent
                sections={[
                  "ForensicLabPendencyMonitoring",
                  "MobileForensicVansDeployment",
                ]}
                activeSections={activeSections}
                setActiveSections={setActiveSections}
                cardName="Forensic Department"
                apiData={apiData}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard3;