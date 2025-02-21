import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";
import ModalComponent from "../../ModalComponent";
import FirBarGraph from "./FirBarGraph";

// Register necessary chart components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const chartColors = [
  "#8884d8", "#82ca9d", "#f2c57c", "#6a8caf", "#d4a5a5",
  "#a28bd3", "#ff9a76", "#74b49b", "#c08497", "#b0a8b9",
];

const PoliceFirs = ({ apidata, downloadReport }) => {
  const [showModal, setShowModal] = useState(false);

  // Ensure `apidata` is valid and use default values if it's undefined
  const data = {
    labels: [
      "FIRs Registered (BNS & IPC)",
      "FIRs Registered (BNS)",
      "FIRs under BNS (%)",
      "Chargesheets Filed (BNS)",
      "Chargesheets Not Filed",
      "Chargesheets Filed (%)",
    ],
    datasets: [
      {
        label: "FIR Statistics",
        data: [
          Number(apidata?.total_no_fir_registered_under_bns_ipc) || 0,
          Number(apidata?.no_of_fir_registered_under_bns) || 0,
          Number(apidata?.percentage_of_fir_under_bns_against_total_firs) || 0,
          Number(apidata?.no_of_chargesheets_filed_under_bns) || 0,
          Number(apidata?.no_of_chargesheets_not_filed_within_the_stipulated_time) || 0,
          Number(apidata?.percentage_of_chargesheets_filed_on_the_basis_of_firs_under_bns) || 0,
        ],
        backgroundColor: chartColors,
        borderColor: chartColors,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "category",
        title: {
          display: true,
          text: "FIR Categories",
        },
        ticks: {
          autoSkip: false,
          maxRotation: 45,
          minRotation: 0,
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of FIRs",
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 mx-auto rounded-lg shadow-lg mt-6">
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
      <div style={{ width: "100%", display: "flex", gap: "20px" }}>
        {/* First Chart (Bar Chart) */}
        <div style={{ flex: "1 1 45%", backgroundColor: "#f4f4f4", padding: "1rem", maxWidth: "100%", height: "400px", display: "flex", justifyContent: "center" }}>
          <div style={{ backgroundColor: "white", width: "100%", padding: "1rem", display: "flex", justifyContent: "space-around", borderRadius: "5px" }}>
            <Bar data={data} options={options} width={600} height={400} />
          </div>
        </div>

        {/* Second Chart (FirBarGraph) */}
        <div style={{ flex: "1 1 45%", backgroundColor: "#f4f4f4", padding: "1rem", maxWidth: "100%", height: "400px", display: "flex", justifyContent: "center" }}>
          <div style={{ backgroundColor: "white", width: "100%", padding: "1rem", display: "flex", justifyContent: "space-around", borderRadius: "5px" }}>
            <FirBarGraph />
          </div>
        </div>
      </div>

      {/* Modal Component */}
      <ModalComponent open={showModal} type="fir_1" onClose={() => setShowModal(false)} />
    </div>
  );
};

export default PoliceFirs;
