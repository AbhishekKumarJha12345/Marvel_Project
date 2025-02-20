import React, { useState } from "react";
import Efirgraph from "./EFIRGraph";
import axiosInstance from '../../../../utils/axiosInstance';


function Efir() {
  const [activeTab, setActiveTab] = useState("home");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const generateReport = async () => {
    try {
      const response = await axiosInstance.post("/generate_report", {
        chart_type: "bar",
        data: {
          labels: ["Category A", "Category B", "Category C"],
          values: [10, 20, 15],
          title: "Efir Data Bar Chart",
          y_label: "Frequency",
        },
      }, { responseType: "blob" }); // Ensure response is treated as a binary blob

      // Create a downloadable PDF file
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "efir_report.pdf";
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
      </div>

      <div className="mt-4">
        {activeTab === "home" ? (
          <div className="row pb-6">
            <div className="col-6">
              <div className="card shadow-sm bg-white">
                <div className="card-body">
                  <Efirgraph generateReport={generateReport} />
                  {/* <button
                    onClick={generateReport}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Download Report
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-center text-2xl font-bold">NO DATA</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Efir;
