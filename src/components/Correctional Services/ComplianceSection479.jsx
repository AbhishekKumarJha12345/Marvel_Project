import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register required chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ComplianceSection479 = () => {
  // Data for the bar graph (grouped by First Time UTPs and Other UTPs)
  const data = {
    labels: ["First Time UTPs", "Other UTPs"], // Group labels for First Time UTPs and Other UTPs
    datasets: [
      {
        label: "No. of UTPs who have served 1/3rd of the maximum sentence",
        data: [45, 9], // Data for UTPs who served 1/3rd of the maximum sentence
        backgroundColor: "#FF5733", // Orange for "First Time UTPs"
        borderColor: "#D84315",
        borderWidth: 1,
        barThickness: 50,
      },
      {
        label:
          "No. of applications preferred in the Court by Jail Superintendent",
        data: [45, 9], // Data for applications preferred in the Court by Jail Superintendent
        backgroundColor: "#2196F3", // Blue for "Applications Preferred"
        borderColor: "#1976D2",
        borderWidth: 1,
        barThickness: 50,
      },
      {
        label: "No. of UTPs released on bond",
        data: [27, 5], // Data for UTPs released on bond
        backgroundColor: "#FFEB3B", // Yellow for "UTPs released on bond"
        borderColor: "#FBC02D",
        borderWidth: 1,
        barThickness: 50,
      },
    ],
  };

  // Options to display the chart with custom tooltips and legend
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true, // Display legend at the top
        position: "top",
      },
      tooltip: {
        callbacks: {
          // Custom tooltip to display value
          label: function (tooltipItem) {
            const dataset = tooltipItem.dataset;
            const value = tooltipItem.raw;
            return `${dataset.label}: ${value}`; // Return the individual value for the tooltip
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          offset: true, // Add offset to prevent overlapping
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md w-[100%] h-[100%] mx-auto">
      {/* Left-aligned heading */}
      <h1 className="text-xl font-semibold mb-4 text-left">
        Compliance of Section 479 of BNSS
      </h1>

      {/* Centering the Bar Chart and removing extra space */}
      <div className="flex justify-center">
        <div className="w-[400px] h-[250px]">
          <Bar
            data={data}
            options={{ ...options, maintainAspectRatio: false }}
          />
        </div>
      </div>
    </div>
  );
};

export default ComplianceSection479;
