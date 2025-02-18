import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register the necessary chart components
ChartJS.register(ArcElement, Tooltip, Legend);

const PoliceFirs = () => {
  // Data for the Pie Chart
  const data = {
    labels: [
      'FIRs Registered (BNS & IPC)',
      'FIRs Registered (BNS)',
      'FIRs under BNS (%)',
      'Chargesheets Filed (BNS)',
      'Chargesheets Not Filed',
      'Chargesheets Filed (%)',
    ],
    datasets: [
      {
        data: [221008, 207273, 94, 71107, 35480, 34.30], // Corresponding values for each section
        backgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#FF8C00', '#DAF7A6', '#900C3F'], // Different colors for each section
        borderColor: ['#FF5733', '#33FF57', '#3357FF', '#FF8C00', '#DAF7A6', '#900C3F'], // Border colors to match
        borderWidth: 1,
      },
    ],
  };

  // Options for the Pie chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const label = tooltipItem.label || '';
            const value = tooltipItem.raw || 0;

            // If the label is related to percentage, add the '%' sign.
            if (label.includes('Percentage')) {
              return `${label}: ${value.toFixed(2)}%`; // Formatting the percentage to two decimals
            } else {
              return `${label}: ${value.toLocaleString()}`; // Formatting numbers with commas
            }
          },
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 mx-auto rounded-lg w-[60%] h-[500px]">
      <h1 className="text-4xl font-bold mb-8">FIRs New Criminal Laws</h1>
      <div className="h-full">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default PoliceFirs;
