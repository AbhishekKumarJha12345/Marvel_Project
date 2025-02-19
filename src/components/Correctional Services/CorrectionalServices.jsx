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

const CorrectionalServices = () => {
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

  // Data for the bar graph (grouped by Available Strength and Personnel Trained)
  const data = {
    labels: ["Class-1", "Class-2", "Class-3"], // Group labels
    datasets: [
      {
        label: 'Available Strength',
        data: [4232, 1500, 4147], 
        backgroundColor: chartColors[0], // Muted Purple
        borderWidth: 1,
        barThickness: 50,
      },
      {
        label: 'No. of Personnel Trained in New Laws',
        data: [3980, 1000, 3895], 
        backgroundColor: chartColors[1], // Soft Green
        borderWidth: 1,
        barThickness: 50,
      },
    ]
  };

  // Static title for the chart
  const chartTitle = `Available Strength: 4,232, No. of Personnel Trained in New Laws: 3,980, Percentage: 94.05%`;

  // Options for the chart
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow flexible width
    plugins: {
      legend: {
        display: true,
        position: 'right', // Move legend to the right
      },
      title: {
        display: true,
        text: chartTitle, // Display static title
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const dataset = tooltipItem.dataset;
            const value = tooltipItem.raw;
            return `${dataset.label}: ${value}`; // Return value for tooltip
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          offset: true, // Prevent overlap
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md w-full">
      <h1 className="text-xl font-semibold mb-4">Personnel Trained in New Laws</h1>
      <div className="w-full h-[300px]"> {/* Full width, fixed height 300px */}
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default CorrectionalServices;
