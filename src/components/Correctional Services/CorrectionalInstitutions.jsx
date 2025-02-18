import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register required chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CorrectionalInstitutions = () => {
  // Data for the bar graph (grouped by different categories related to correctional institutions)
  const data = {
    labels: [
        'Correctional Institutions', // Shortened from 'No. of Correctional Institutions'
        'Inmate Population', // Shortened from 'Current Inmate Population'
        'Admission (NCL)', // Shortened from 'Admission as per NCL'
        'Inmates % (NCL)' // Shortened from 'Percentage of inmates inside Correctional Institutions as per NCL'
      ],
      
    datasets: [
      {
        label: 'Data',
        data: [60, 39564, 11221, 28.4], // Data for each label
        backgroundColor: ['#FF5733', '#2196F3', '#FFEB3B', '#4CAF50'], // Different colors for each bar
        borderColor: ['#D84315', '#1976D2', '#FBC02D', '#388E3C'],
        borderWidth: 1,
        barThickness: 50,
      },
    ],
  };

  // Options to display the chart with custom tooltips and legend
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,  // Show the legend with color blocks
        position: 'top', // Position the legend at the top of the chart
        labels: {
          generateLabels: (chart) => {
            const labels = chart.data.labels;
            return labels.map((label, index) => {
              return {
                text: label, // Use label text for each category
                fillStyle: chart.data.datasets[0].backgroundColor[index], // Set the color for each label
                strokeStyle: chart.data.datasets[0].borderColor[index], // Border color for the label
                lineWidth: 1, // Border width for the label
              };
            });
          },
        },
      },
      tooltip: {
        callbacks: {
          // Custom tooltip to display value
          label: function (tooltipItem) {
            const dataset = tooltipItem.dataset;
            const value = tooltipItem.raw;
            return `${dataset.label}: ${value}`; // Return the individual value for the tooltip
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          offset: true, // Add offset to prevent overlapping
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <h1 className="text-xl font-semibold mb-4">Correctional Institutions</h1>
      <div className="h-[250px]">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default CorrectionalInstitutions;
