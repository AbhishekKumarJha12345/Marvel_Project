import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register the necessary chart components
ChartJS.register(ArcElement, Tooltip, Legend);

const ComplianceSection = () => {
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
    <div className="bg-white p-4 rounded-xl shadow-md">
      <h1 className="text-xl font-semibold mb-4">Compliance of Section 472 of BNSS</h1>
      <div className="h-[250px]">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default ComplianceSection;
