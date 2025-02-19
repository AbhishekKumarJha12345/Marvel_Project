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

const CorrectionalInstitutions = () => {
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

  // Data for the bar graph (grouped by different categories related to correctional institutions)
  const data = {
    labels: [
      'Correctional Institutions', // Shortened from 'No. of Correctional Institutions'
      'Inmate Population', // Shortened from 'Current Inmate Population'
      'Admission (NCL)', // Shortened from 'Admission as per NCL'
      'Inmates % (NCL)' // Shortened from 'Percentage of inmates inside Correctional Institutions as per NCL'
    ],
    datasets: [
      {
        label: "Data",
        data: [60, 39564, 11221, 28.4], // Data for each label
        backgroundColor: chartColors, // Different colors for each bar
        borderColor: chartColors,
        borderWidth: 1,
        barThickness: 50,
      },
    ],
  };

  // Options to display the chart with custom tooltips and legend
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow full-width resizing
    plugins: {
      legend: {
        display: true,
        position: 'right', // Move legend to the right
        labels: {
          generateLabels: (chart) => {
            const labels = chart.data.labels;
            return labels.map((label, index) => ({
              text: label, // Use label text for each category
              fillStyle: chart.data.datasets[0].backgroundColor[index], // Set color for each label
              strokeStyle: chart.data.datasets[0].borderColor[index], // Border color
              lineWidth: 1, // Border width
            }));
          },
        },
      },
      tooltip: {
        callbacks: {
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
      <h1 className="text-xl font-semibold mb-4">Correctional Institutions</h1>
      <div className="w-full h-[300px]"> {/* Full width, fixed height 300px */}
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default CorrectionalInstitutions;
