import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register the necessary chart components
ChartJS.register(ArcElement, Tooltip, Legend);

const ComplianceSection = () => {
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

  // Data for the Pie Chart with the updated values
  const data = {
    labels: [
      'Correctional Institutions',
      'Prisoners awarded Death Sentence',
      'Prisoners Appeals/Confirmed Death Sentence',
      'Prisoners filed Mercy Petition (u/s 472 of BNSS)',
    ],
    datasets: [
      {
        data: [60, 44, 2, 2], // Updated values for each section
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
            const label = tooltipItem.label || '';
            const value = tooltipItem.raw || 0;
            return `${label}: ${value}`; // Show label and value on hover
          },
        },
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md w-full">
      <h1 className="text-xl font-semibold mb-4">Compliance of Section 472 of BNSS</h1>
      <div className="w-full h-[300px]"> {/* Full width with fixed height of 300px */}
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default ComplianceSection;
