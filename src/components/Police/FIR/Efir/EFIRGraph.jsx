import { React, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import ModalComponent from '../../ModalComponent';

// Register required chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const EFIRsChart = ({ generateReport }) => {
  const [showModal, setShowModal] = useState(false);

  const chartColors = [
    "#8884d8", "#82ca9d", "#f2c57c", "#6a8caf", "#d4a5a5",
    "#a28bd3", "#ff9a76", "#74b49b", "#c08497", "#b0a8b9"
  ];

  const data = {
    labels: ['Total eFIRs Received', 'Total eFIRs Converted to Proper FIRs'],
    datasets: [
      {
        label: 'Total eFIRs Received',
        data: [365, 0],
        backgroundColor: chartColors[0],
        borderColor: chartColors[0],
        borderWidth: 1,
        barThickness: 50,
      },
      {
        label: 'Total eFIRs Converted',
        data: [0, 87],
        backgroundColor: chartColors[1],
        borderColor: chartColors[1],
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
    <div className="bg-white p-6 mx-auto rounded-lg w-[80%] h-[600px] shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-semibold text-center flex-grow">eFIRs Overview</h2>
        <div className="flex space-x-4">
          <button
            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-all"
            onClick={() => setShowModal(true)}
          >
            Add On
          </button>
          <button
            onClick={generateReport}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-blue-700 transition-all"
          >
            Download Report
          </button>
        </div>
      </div>

      <div className="h-[500px]">
        <Bar data={data} options={options} />
      </div>

      <ModalComponent open={showModal} type="fir_4" onClose={() => setShowModal(false)} />
    </div>
  );
};

export default EFIRsChart;
