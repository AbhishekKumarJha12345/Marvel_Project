import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register the necessary chart components
ChartJS.register(ArcElement, Tooltip, Legend);

const MasterTrainers = () => {
  // Data for the Pie Chart
  const data = {
    labels: [
      'Training Workshops Conducted',
      'Training through E-Academy Online',
      'Master Trainers (Police Personnel)',
    ],
    datasets: [
      {
        data: [1647, 50434, 635], // Corresponding values for each section
        backgroundColor: ['#FF5733', '#33FF57', '#3357FF'], // Different colors for each section
        borderColor: ['#FF5733', '#33FF57', '#3357FF'], // Border colors to match
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
            return `${label}: ${value}`;
          },
        },
      },
    },
  };

  return (
    <div className="bg-white p-6  mx-auto rounded-lg w-[60%] h-[500px]">
    <h1 className="text-4xl font-bold mb-8">Master Trainers</h1>
    <div className="h-[250px]">
      <Pie data={data} options={options} />
    </div>
  </div>
  
  );
};

export default MasterTrainers;
