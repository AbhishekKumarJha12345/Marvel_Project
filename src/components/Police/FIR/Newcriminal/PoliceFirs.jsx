import { React, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ModalComponent from "../../ModalComponent";
// Register the necessary chart components
ChartJS.register(ArcElement, Tooltip, Legend);

const PoliceFirs = ({ apidata }) => {
  // Data for the Pie Chart
  const [showModal, setShowModal] = useState(false);

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
        data: [
          apidata ? apidata.total_no_fir_registered_under_bns_ipc : "",
          apidata ? apidata.no_of_fir_registered_under_bns : "",
          apidata ? apidata.percentage_of_fir_under_bns_against_total_firs : "",
          apidata ? apidata.no_of_chargesheets_filed_under_bns : "",
          apidata
            ? apidata.no_of_chargesheets_not_filed_within_the_stipulated_time
            : "",
          apidata
            ? apidata.percentage_of_chargesheets_filed_on_the_basis_of_firs_under_bns
            : "",
        ], // Corresponding values for each section
        backgroundColor: [
          "#FF5733",
          "#33FF57",
          "#3357FF",
          "#FF8C00",
          "#DAF7A6",
          "#900C3F",
        ], // Different colors for each section
        borderColor: [
          "#FF5733",
          "#33FF57",
          "#3357FF",
          "#FF8C00",
          "#DAF7A6",
          "#900C3F",
        ], // Border colors to match
        borderWidth: 1,
      },
    ],
  };

  // Options for the Pie chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const label = tooltipItem.label || "";
            const value = tooltipItem.raw || 0;

            // If the label is related to percentage, add the '%' sign.
            if (label.includes("Percentage")) {
              return `${label}: ${value.toFixed(2)}%`; // Formatting the percentage to two decimals
            } else {
              return `${label}: ${value.toLocaleString()}`; // Formatting numbers with commas
            }
          },
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 ml-0 rounded-lg w-1/2 h-[600px]">
      {" "}
      {/* Align container to the left and set width to 50% */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-bold text-left">FIRs New Criminal Laws</h1>{" "}
        {/* Align heading to the left */}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          style={{ backgroundColor: "#2d3748" }}
          onClick={() => {
            console.log("Open modal");
            setShowModal(true);
          }}
        >
          Add On
        </button>
      </div>
      {/* Container for Pie chart */}
      <div className="h-[400px] flex justify-center items-center w-full">
        <Pie data={data} options={options} />
      </div>
      <ModalComponent
        open={showModal}
        type="fir_1"
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default PoliceFirs;
