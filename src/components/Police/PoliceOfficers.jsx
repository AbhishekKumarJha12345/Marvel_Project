import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register required chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PoliceOfficers = () => {
  // Data for the bar graph
  const data = {
    labels: ['Police Officers(PSI to SP/DCP)', 'Police Personnel(PC to ASI)'], // Labels for the two roles
    datasets: [
      {
        label: 'Available Officers',
        data: [13247, 152363], // Available Officers for AP and TS
        backgroundColor: '#4CAF50', // Green color for Available Officers
        borderColor: '#388E3C', // Darker green border
        borderWidth: 1,
        barThickness: 20,
      },
      {
        label: 'Total Trained Officers',
        data: [12234, 137901], // Total Trained Officers for AP and TS
        backgroundColor: '#2196F3', // Blue color for Trained Officers
        borderColor: '#1976D2', // Darker blue border
        borderWidth: 1,
        barThickness: 20,
      },
    ],
  };

  // Custom tooltip content (percentage display for each group)
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Officers Data Comparison',
      },
      tooltip: {
        callbacks: {
          // Custom tooltip label (percentage for each group)
          label: function (tooltipItem) {
            const label = tooltipItem.dataset.label || '';
            const dataIndex = tooltipItem.dataIndex;
            let percentage = '';

            // Predefined percentages for the whole groups
            if (dataIndex === 0) { // Police Officers(PSI to SP/DCP) group
              percentage = '92.35%'; // Percentage for Police Officers group
            } else if (dataIndex === 1) { // Police Personnel(PC to ASI) group
              percentage = '90.50%'; // Percentage for Police Personnel group
            }

            // Return custom label with percentage for the group
            return `${label}: ${percentage}`;
          },
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 mx-auto rounded-lg w-[60%] h-[500px]">
    <h1 className="text-4xl font-bold mb-8">Police Officers</h1>
    <div className="h-[250px]">
      <Bar data={data} options={options} />
    </div>
  </div>
  );
};

export default PoliceOfficers;
