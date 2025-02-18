import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register the necessary chart components
ChartJS.register(ArcElement, Tooltip, Legend);

const PoliceChargeSheet = () => {
  // Data for the Donut Chart
  const data = {
    labels: [
      'Total Charge Sheeted',
      'Convicted',
      'Acquitted',
      'Pending',
    ],
    datasets: [
      {
        data: [71107, 16211, 12741, 42155], // Corresponding values for each section
        backgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#FF8C00'], // Different colors for each section
        borderColor: ['#FF5733', '#33FF57', '#3357FF', '#FF8C00'], // Border colors to match
        borderWidth: 1,
      },
    ],
  };

  // Options for the Donut chart
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
            return `${label}: ${value.toLocaleString()}`; // Formatting numbers with commas
          },
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 mx-auto rounded-lg w-[60%] h-[500px]">
      <h1 className="text-4xl font-bold mb-8">Charge Sheet Status</h1>
      <div className="h-full">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default PoliceChargeSheet;
