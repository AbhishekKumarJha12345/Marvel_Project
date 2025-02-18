import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register the necessary chart components
ChartJS.register(ArcElement, Tooltip, Legend);

const PoliceFirs = ({apidata}) => {
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
        data: [apidata ?apidata.total_no_fir_registered_under_bns_ipc:"", apidata ?apidata.no_of_fir_registered_under_bns:"", apidata ?apidata.percentage_of_fir_under_bns_against_total_firs:"", apidata ?apidata.no_of_chargesheets_filed_under_bns:"", apidata ?apidata.no_of_chargesheets_not_filed_within_the_stipulated_time:"", apidata ?apidata.percentage_of_chargesheets_filed_on_the_basis_of_firs_under_bns:""], // Corresponding values for each section
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
    <div className=" p-9 mx-auto rounded-lg w-[100%] h-[500px]">
      <h1 className="text-4xl font-bold mb-8">FIRs New Criminal Laws</h1>
      <div className="h-full">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default PoliceFirs;
