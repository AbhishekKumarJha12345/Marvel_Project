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

const PolicePunishment = () => {
  // Data for the bar graph
  const data = {
    labels: ["No. of Cases Registered", "Cases in which Forensic Team Visited"], // Labels for both categories
    datasets: [
      {
        label: "No. of Cases Registered", // Label for the first dataset
        data: [13939, 0], // Only data for "No. of Cases Registered"
        backgroundColor: "#FF5733", // Orange for "No. of Cases Registered"
        borderColor: "#D84315", // Darker border shade
        borderWidth: 1,
        barThickness: 50,
      },
      {
        label: "Cases in which Forensic Team Visited", // Label for the second dataset
        data: [0, 2587], // Only data for "Cases in which Forensic Team Visited"
        backgroundColor: "#2196F3", // Blue for "Cases in which Forensic Team Visited"
        borderColor: "#1976D2", // Darker border shade
        borderWidth: 1,
        barThickness: 50,
      },
    ],
  };

  // Custom tooltip content (showing percentage for both bars)
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true, // ✅ Enables the legend
        position: "top",
      },
      title: {
        display: true,
        text: "Cases & Forensic Team Visits",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const value = tooltipItem.raw;
            const percentage = "18.55%"; // Fixed percentage for both bars
            return `${tooltipItem.label}: ${value} (${percentage})`;
          },
        },
      },
    },
  };

  return (
    <div className="p-6 rounded-lg w-[50%] h-[400px] flex flex-col">
      <div className="flex-grow">
        {" "}
        {/* Increased height for the chart container */}
        <Bar data={data} options={options} height={450} />
      </div>
    </div>
  );
};

export default PolicePunishment;
