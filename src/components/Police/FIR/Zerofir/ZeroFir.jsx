import { React, useState } from "react";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ModalComponent from "../../ModalComponent";
// Register the necessary chart components
ChartJS.register(ArcElement, Tooltip, Legend);

const ZeroFIRStatus = () => {
  const [showModal, setShowModal] = useState(false);

  // Data for the Doughnut Chart
  const data = {
    labels: [
      "Total Zero FIR Registered",
      "Registered as Regular FIR",
      "Yet to be Regularly Registered Zero FIR",
    ],
    datasets: [
      {
        data: [5120, 3790, 543], // Corresponding values for each section
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"], // Different colors for each section
        borderColor: ["#FF6384", "#36A2EB", "#FFCE56"], // Border colors to match
        borderWidth: 1,
      },
    ],
  };

  // Options for the Doughnut chart
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
            return `${label}: ${value.toLocaleString()}`; // Formatting numbers with commas
          },
        },
      },
    },
  };

  return (
    <div className="bg-white  rounded-lg w-[100%]">
      {/* Title and button section */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-bold text-left">Zero FIR Status</h1>
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

      {/* Centered Graph */}
      <div className="flex justify-center">
        <div className=" rounded-lg w-[50%] flex flex-col items-center">
          <div className="flex-grow w-[400px] h-[400px] flex justify-center items-center">
            <Doughnut data={data} options={options} />
          </div>
        </div>
      </div>

      <ModalComponent
        open={showModal}
        type="fir_3"
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default ZeroFIRStatus;
