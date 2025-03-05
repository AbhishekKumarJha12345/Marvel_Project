import React, { useEffect, useState } from "react";
import PoliceFirs from "./PoliceFirs";
import FirstFirdata from "./FirstFirdata";
import Firnewoffence from "./Firnewoffences";
import axiosInstance from "../../../../utils/axiosInstance";

function FirNewcriminal() {
  const [activeTab, setActiveTab] = useState("home");
  const [trainingData, setTrainingData] = useState(null);

  // Fetch FIR data from Flask
  const getTrainingData = async () => {
    try {
      const response = await axiosInstance.get("/live_data?type=fir_1");
      console.log(response.data, "FIR1 Data ----------");
      setTrainingData(response.data.data_dict);
    } catch (error) {
      console.error("Error fetching FIR data:", error);
    }
  };

  useEffect(() => {
    getTrainingData();
  }, []);

  // Handle tab switching
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Function to send FIR data to Flask and download the report
  const downloadReport = async () => {
    if (!trainingData) {
      alert("No FIR data available for the report.");
      return;
    }

    const requestData = {
      chart_type: "pie", // Choose appropriate chart type
      data: {
        title: "FIR Statistics",
        labels: [
          "Total FIRs",
          "FIRs under BNS",
          "Chargesheets Filed",
          "Chargesheets Not Filed",
          "FIR % Under BNS",
          "Chargesheet % Filed",
        ],
        values: [
          parseFloat(trainingData.total_no_fir_registered_under_bns_ipc) || 0,
          parseFloat(trainingData.no_of_fir_registered_under_bns) || 0,
          parseFloat(trainingData.no_of_chargesheets_filed_under_bns) || 0,
          parseFloat(
            trainingData.no_of_chargesheets_not_filed_within_the_stipulated_time
          ) || 0,
          parseFloat(
            trainingData.percentage_of_fir_under_bns_against_total_firs
          ) || 0,
          parseFloat(
            trainingData.percentage_of_chargesheets_filed_on_the_basis_of_firs_under_bns
          ) || 0,
        ],
        colors: [
          "#FF5733",
          "#33FF57",
          "#3357FF",
          "#FF33A8",
          "#33FFF5",
          "#FFC300",
        ],
        y_label: "Count",
      },
    };
    try {
      const response = await axiosInstance.post(
        "/generate_report",
        requestData,
        {
          responseType: "blob",
        }
      );

      // Create a URL for the PDF blob and trigger download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "fir_report.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading FIR report:", error);
    }
  };

  return (
    <div>
      {/* Navigation Tabs */}
      <div className="flex space-x-4 mt-3">
        <button
          onClick={() => handleTabChange("home")}
          className={`py-2 px-4 text-[14px] font-[Work Sans] ${
            activeTab === "home"
              ? "relative text-[#03045E] font-bold after:content-[''] after:absolute after:left-1/2 after:transform after:-translate-x-1/2 after:w-12 after:h-[2px] after:bg-[#03045E] after:bottom-0"
              : "text-[#8B8A8A]"
          }`}
        >
          Home
        </button>
        {/* <button
          onClick={() => handleTabChange("newCriminals")}
          className={`py-2 px-4 text-[14px] font-[Work Sans] ${
            activeTab === "newCriminals"
              ? "relative text-[#03045E] font-bold after:content-[''] after:absolute after:left-1/2 after:transform after:-translate-x-1/2 after:w-28 after:h-[2px] after:bg-[#03045E] after:bottom-0"
              : "text-[#8B8A8A]"
          }`}
        >
          New Criminals
        </button> */}
      </div>

      {/* Tab Content */}
      <div className="mt-1">
        {activeTab === 'home' ? (
          <div className="col-6" style={{width:"100%"}}>
              
              {/* <div style={{ paddingBottom: "5rem",width:"100%"  }}> */}
                {/* Download Report Button */}
      {/* <div className="mt-4">
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg" onClick={downloadReport}>
          Download FIR Report
        </button>
      </div> */}
                <PoliceFirs apidata={trainingData} downloadReport={downloadReport} />
              </div>
            // </div>
        ) : (
          <div>
            <FirstFirdata />
            <Firnewoffence />
          </div>
        )}
      </div>
    </div>
  );
}

export default FirNewcriminal;
