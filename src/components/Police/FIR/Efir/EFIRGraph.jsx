import { React, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import ModalComponent from '../../ModalComponent';

// Register required chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const EFIRsChart = () => {
  const [showModal, setShowModal] = useState(false);

  const chartColors = [
    "#8884d8", // Muted Purple
    "#82ca9d", // Soft Green
    "#f2c57c", // Warm Sand
    "#6a8caf", // Steel Blue
    "#d4a5a5", // Soft Rose
    "#a28bd3", // Lavender
    "#ff9a76", // Muted Coral
    "#74b49b", // Muted Teal
    "#c08497", // Mauve
    "#b0a8b9"  // Dusty Lilac
  ];

  const data = {
    labels: ['Total eFIRs Received', 'Total eFIRs Converted to Proper FIRs'],
    datasets: [
      {
        label: 'Total eFIRs Received',
        data: [365, 0],
        backgroundColor: chartColors[0], // Muted Purple
        borderColor: chartColors[0], // Soft Green
        borderWidth: 1,
        barThickness: 50,
      },
      {
        label: 'Total eFIRs Converted',
        data: [0, 87],
        backgroundColor: chartColors[1], // Warm Sand
        borderColor: chartColors[1], // Steel Blue
        borderWidth: 1,
        barThickness: 50,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'eFIRs Data Overview' },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw.toLocaleString()}`;
          },
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="bg-white p-6 mx-auto rounded-lg w-[80%] h-[600px]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-semibold text-center flex-grow">eFIRs Overview</h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          style={{ backgroundColor: '#2d3748' }}
          onClick={() => setShowModal(true)}
        >
          Add On
        </button>
      </div>

      <div className="h-[500px]">
        <Bar data={data} options={options} />
      </div>

      <ModalComponent open={showModal} type="fir_4" onClose={() => setShowModal(false)} />
    </div>
  );
};

export default EFIRsChart;
