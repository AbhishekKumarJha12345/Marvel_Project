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

  // Data for the bar graph (grouped by First Time UTPs and Other UTPs)
  const data = {
    labels: ['First Time UTPs', 'Other UTPs'], // Group labels
    datasets: [
      {
        label: 'No. of UTPs who have served 1/3rd of the maximum sentence',
        data: [45, 9],
        backgroundColor: chartColors[0], // Muted Purple
        borderWidth: 1,
        barThickness: 50,
      },
      {
        label: 'No. of applications preferred in the Court by Jail Superintendent',
        data: [45, 9],
        backgroundColor: chartColors[1], // Soft Green
        borderWidth: 1,
        barThickness: 50,
      },
      {
        label: 'No. of UTPs released on bond',
        data: [27, 5],
        backgroundColor: chartColors[2], // Warm Sand
        borderWidth: 1,
        barThickness: 50,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow full-width resizing
    plugins: {
      legend: {
        display: true, 
        position: 'right',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const dataset = tooltipItem.dataset;
            const value = tooltipItem.raw;
            return `${dataset.label}: ${value}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          offset: true,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md w-full">
      <h1 className="text-xl font-semibold mb-4">Compliance of Section 479 of BNSS</h1>
      <div className="w-full h-[300px]"> {/* Full width, fixed height 300px */}
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default ComplianceSection479;
