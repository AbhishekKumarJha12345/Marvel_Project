import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register the necessary chart components
ChartJS.register(ArcElement, Tooltip, Legend);

const VideoConferencingFacilities = () => {
  // Data for the Pie Chart
  const data = {
    labels: [
      'No. of Correctional Institutions',
      'No. of Courts',
      'No. of V.C. Sets available in Correctional Institutions',
      'No. of separate cubicles (Cabin) available in Correctional Institutions for V.C.',
    ],
    datasets: [
      {
        data: [60, 2200, 437, 281], // Updated values
        backgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#FFD700'], // Different colors for each section
        borderColor: ['#FF5733', '#33FF57', '#3357FF', '#FFD700'], // Border colors to match
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
            return `${label}: ${value}`; // Show label and value on hover
          },
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 mx-auto rounded-lg w-[60%] h-[500px]">
      <h1 className="text-4xl font-bold mb-8">Video Conferencing Facilities</h1>
      <div className="h-[250px]">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default VideoConferencingFacilities;
