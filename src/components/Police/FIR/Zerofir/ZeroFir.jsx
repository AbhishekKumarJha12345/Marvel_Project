import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register the necessary chart components
ChartJS.register(ArcElement, Tooltip, Legend);

const ZeroFIRStatus = () => {
  // Data for the Doughnut Chart
  const data = {
    labels: [
      'Total Zero FIR Registered',
      'Registered as Regular FIR',
      'Yet to be Regularly Registered Zero FIR',
    ],
    datasets: [
      {
        data: [5120, 3790, 543], // Corresponding values for each section
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], // Different colors for each section
        borderColor: ['#FF6384', '#36A2EB', '#FFCE56'], // Border colors to match
        borderWidth: 1,
      },
    ],
  };

  // Options for the Doughnut chart
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
      <h1 className="text-4xl font-bold mb-8">Zero FIR Status</h1>
      <div className="h-full">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default ZeroFIRStatus;
