import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";
import ModalComponent from "../../ModalComponent";
import FirBarGraph from "./FirBarGraph";

// Register necessary chart components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const chartColors = [
  "#8884d8", "#82ca9d", "#f2c57c", "#6a8caf", "#d4a5a5", "#a28bd3"
  ];
const labels = [
    "FIRs Registered (BNS & IPC)",
    "FIRs Registered (BNS)",
    "FIRs under BNS (%)",
    "Chargesheets Filed (BNS)",
    "Chargesheets Not Filed",
    "Chargesheets Filed (%)"
    ];

const PoliceFirs = ({ apidata, downloadReport }) => {
  const [showModal, setShowModal] = useState(false);
  const dataValues = [
    Number(apidata?.total_no_fir_registered_under_bns_ipc) || 0,
    Number(apidata?.no_of_fir_registered_under_bns) || 0,
    Number(apidata?.percentage_of_fir_under_bns_against_total_firs) || 0,
    Number(apidata?.no_of_chargesheets_filed_under_bns) || 0,
    Number(apidata?.no_of_chargesheets_not_filed_within_the_stipulated_time) || 0,
    Number(apidata?.percentage_of_chargesheets_filed_on_the_basis_of_firs_under_bns) || 0
    ];

  // Ensure `apidata` is valid and use default values if it's undefined
  const datasets = labels.map((label, index) => ({
    label: label, // Each dataset gets a unique label
    data: Array(labels.length).fill(0).map((_, i) => (i === index ? dataValues[index] : 0)),
    backgroundColor: chartColors[index], // Unique color for each label
    borderColor: chartColors[index],
    borderWidth: 1
    }));
    
    const data = {
    labels: labels, // X-axis labels remain the same
    datasets: datasets // Use multiple datasets
    };
    
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: "top",
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "FIR Categories",
            font: {
              weight: "bold", 
              size: 14,       
            },
          },
          stacked: false,
          ticks: {
            autoSkip: false,
            maxRotation: 45,
            minRotation: 0,
          },
          barPercentage: 0.9, // Adjusts the bar width relative to the available space (increase for thicker bars)
          categoryPercentage: 1.0, // Increases spacing between bars
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Number of FIRs",
            font: {
              weight: "bold", 
              size: 14,     
            },
            
          },
          stacked: false,
        },
      },
    };
    
  return (
    <div className="p-2 mx-auto rounded-lg  mt-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-center flex-grow">FIRs New Criminal Laws</h2>
        <div className="flex space-x-4">
          {localStorage.getItem("role") !== "chief secretary" && (
            <button
              className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-all"
              onClick={() => setShowModal(true)}
            >
              Add On
            </button>
          )}
        </div>
      </div>

      {/* Charts Section */}
     {/* Charts Section */}
<div style={{ width: "100%", display: "flex", gap: "10px" }}>
  {/* First Chart (Bar Chart) */}
  <div style={{ flex: "1", backgroundColor: "#f4f4f4", padding: "1rem", height: "600px", display: "flex", justifyContent: "center" }}>
    <div style={{ backgroundColor: "white", width: "100%", padding: "1rem", display: "flex", flexDirection: "column", borderRadius: "5px" }}>
      <h3 className="text-lg font-semibold  mb-4">FIRs under New Criminal Laws</h3>
      <div className='p-2' style={{ height: "500px", width: "100%" }}> {/* Adjusted height */}
      <Bar data={data} options={options} />
    </div>
    </div>
  </div>
  {/* Second Chart (FirBarGraph) */}
  <div style={{ flex: "1", backgroundColor: "#f4f4f4", padding: "1rem", height: "600px", display: "flex", justifyContent: "center" }}>
    <div style={{ backgroundColor: "white", width: "100%", padding: "1rem", display: "flex", justifyContent: "center", borderRadius: "5px" }}>
      <FirBarGraph  />
    </div>
  </div>
</div>

      {/* Modal Component */}
      <ModalComponent open={showModal} type="fir_1" onClose={() => setShowModal(false)} />
    </div>
  );
};

export default PoliceFirs;
