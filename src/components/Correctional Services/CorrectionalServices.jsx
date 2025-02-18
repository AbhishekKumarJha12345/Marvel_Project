import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register required chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CorrectionalServices = () => {
  // Data for the bar graph (grouped by Available Strength and Personnel Trained)
  const data = {
    labels: ['Class-1', 'Class-2', 'Class-3'], // Group labels
    datasets: [
      {
        label: 'Available Strength',
        data: [4232, 1500, 4147], // Data for Available Strength
        backgroundColor: '#FF5733', // Orange for "Available Strength"
        borderColor: '#D84315',
        borderWidth: 1,
        barThickness: 50,
      },
      {
        label: 'No. of Personnel Trained in New Laws',
        data: [3980, 1000, 3895], // Data for Trained Personnel
        backgroundColor: '#2196F3', // Blue for "No. of Personnel Trained in New Laws"
        borderColor: '#1976D2',
        borderWidth: 1,
        barThickness: 50,
      },
    ],
  };

  // Static title for the chart
  const chartTitle = `Available Strength: 4,232, No. of Personnel Trained in New Laws: 3,980, Percentage: 94.05%`;

  // Options to display the chart with custom tooltips and legend
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,  // Display legend at the top
        position: 'top',
      },
      title: {
        display: true,
        text: chartTitle, // Display the static title
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
    <div className="bg-white p-4 rounded-xl shadow-md">
      <h1 className="text-xl font-semibold mb-4">Personnel Trained in New Laws
      </h1>
      <div className="h-[250px]">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default CorrectionalServices;
