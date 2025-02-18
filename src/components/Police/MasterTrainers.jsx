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
        backgroundColor: ['#FF5733', '#4CAF50', '#2196F3'], // Different colors for each section
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
        labels: {
          boxWidth: 20,
        },
      },
      tooltip: {
        displayColors: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleAlign: 'center',
        bodyAlign: 'center',
        padding: 10,
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
    <div className="bg-white p-6 rounded-lg w-full h-[500px] flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-4">Master Trainers</h1>
      <div className="flex flex-col lg:flex-row w-full justify-center items-center">
        <div className="w-full lg:w-2/3 h-[400px] p-3 d-flex justify-center items-center">
          <Pie data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default MasterTrainers;