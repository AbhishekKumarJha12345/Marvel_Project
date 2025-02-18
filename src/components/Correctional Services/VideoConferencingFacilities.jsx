import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register the necessary chart components
ChartJS.register(ArcElement, Tooltip, Legend);

const VideoConferencingFacilities = () => {
  // Data for the Pie Chart
  const data = {
    labels: [
      "No. of Correctional Institutions",
      "No. of Courts",
      "No. of V.C. Sets available in Correctional Institutions",
      "No. of separate cubicles (Cabin) available in Correctional Institutions for V.C.",
    ],
    datasets: [
      {
        data: [60, 2200, 437, 281], // Updated values
        backgroundColor: ["#FF5733", "#33FF57", "#3357FF", "#FFD700"], // Different colors for each section
        borderColor: ["#FF5733", "#33FF57", "#3357FF", "#FFD700"], // Border colors to match
        borderWidth: 1,
      },
    ],
  };

  // Options for the Pie chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const label = tooltipItem.label || "";
            const value = tooltipItem.raw || 0;
            return `${label}: ${value}`; // Show label and value on hover
          },
        },
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md w-[100%] h-[100%] mx-auto">
      {/* Header Section with Left-Aligned Text and Right-Aligned Button */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold text-left">
          Video Conferencing Facilities
        </h1>
        <button
          className="text-white px-4 py-2 rounded-lg"
          style={{ backgroundColor: "rgb(45, 55, 72)" }}
        >
          Add On
        </button>
      </div>

      {/* Centering the Pie Chart */}
      <div className="flex justify-center items-center">
        <div className="w-[400px] h-[350px] flex justify-center items-center">
          <Pie
            data={data}
            options={{ ...options, maintainAspectRatio: false }}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoConferencingFacilities;
