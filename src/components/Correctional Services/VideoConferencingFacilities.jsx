import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register the necessary chart components
ChartJS.register(ArcElement, Tooltip, Legend);

const VideoConferencingFacilities = () => {
  // Data for the Pie Chart
  const chartColors = [
    "#8884d8", // Muted Purple
    "#82ca9d", // Soft Green
    "#f2c57c", // Warm Sand
    "#6a8caf", // Steel Blue
    "#d4a5a5", // Soft Rose
    "#a28bd3", // Lavender
    "#ff9a76", // Muted Coral
    "#74b49b", // Muted Teal
    "#c08497", // Mauve
    "#b0a8b9" // Dusty Lilac
  ];

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
        backgroundColor: chartColors, // Different colors for each section
        borderColor: chartColors, // Border colors to match
        borderWidth: 1,
      },
    ],
  };

  // Options for the Pie chart
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow full width resizing
    plugins: {
      legend: {
        position: 'right',
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
    <div className="bg-white p-4 rounded-xl shadow-md w-full">
      <h1 className="text-xl font-semibold mb-4">Video Conferencing Facilities</h1>
      <div className="w-full h-[300px]"> 
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default VideoConferencingFacilities;
