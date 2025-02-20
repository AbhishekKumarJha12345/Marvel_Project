import React, { useState } from 'react';
import PolicePunishment from '../Police/PolicePunishment ';
import PolicevisitsforensicTeams from '../Police/Policevisitsforensicteams';
import Policevisitsforensic from '../Police/Policevisitsforesic';
import axiosInstance from '../../utils/axiosInstance';



function Forensicvisits() {
  const [activeTab, setActiveTab] = useState("home");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };



  const generateReport = async () => {
    try {
      const response = await axiosInstance.post(
        "/generate_report",
        {
          chart_type: "bar",
          data: {
            labels: [
              "No. of Cases Registered",
              "Cases in which Forensic Team Visited",
            ],
            values: [13939, 2587], // Values instead of datasets
            title: "Forensic Visits Report",
            y_label: "Number of Cases",
          },
        },
        { responseType: "blob" } // Handle PDF response correctly
      );

      // Create a downloadable PDF file
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "forensic_visits_report.pdf";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating report:", error);
    }
  };

  return (
    <div>
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
        <button
          onClick={() => handleTabChange("newCriminals")}
          className={`py-2 px-4 text-[14px] font-[Work Sans] ${
            activeTab === "newCriminals"
            ? "relative text-[#03045E] font-bold after:content-[''] after:absolute after:left-1/2 after:transform after:-translate-x-1/2 after:w-16 after:h-[2px] after:bg-[#03045E] after:bottom-0"
            : "text-[#8B8A8A]"
          }`}
        >
          Forensic
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {activeTab === 'home' ? (
         <div className="col-6">
         <div className="card shadow-sm bg-white text-right p-2">
         {/* <button
                  onClick={generateReport}
                  className="mt-4 px-4 py-2 bg-[#2d3748] text-white rounded"
                >
                  Download Report
                </button> */}
           <div className="card-body">
             <PolicePunishment />
           </div>
         </div>
       </div>
       
        ) : (
          <div className="flex space-x-4">  {/* flex container with space between items */}
    <div className="flex-1">
        {/* <h2 className="text-2xl font-bold">Forensic visits</h2> */}
        <PolicevisitsforensicTeams />
    </div>
    <div className="flex-1">
        <Policevisitsforensic />
    </div>
</div>
        )}
      </div>
    </div>
  );
}

export default Forensicvisits;
