import { React, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ModalComponent from '../../ModalComponent';

// Register required chart components
ChartJS.register(ArcElement, Tooltip, Legend);

const EFIRsChart = ({ generateReport }) => {
  const [showModal, setShowModal] = useState(false);

  const chartColors = [
    "#8884d8", "#82ca9d"
  ];

  const data = {
    labels: ['Total eFIRs Received', 'Total eFIRs Converted to Proper FIRs'],
    datasets: [
      {
        label: 'eFIRs Data',
        data: [365, 87],
        backgroundColor: chartColors,
        borderColor: chartColors,
        borderWidth: 1,
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
            return `${tooltipItem.label}: ${tooltipItem.raw.toLocaleString()}`;
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
          {localStorage.getItem('role') !== 'chief secretary' && (
            <button
              className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-all"
              onClick={() => setShowModal(true)}
            >
              Add On
            </button>
          )}
        </div>
      </div>

      <div className="h-[350px]">
        <Pie data={data} options={options} />
      </div>

      <ModalComponent open={showModal} type="fir_4" onClose={() => setShowModal(false)} />
    </div>
  );
};

export default EFIRsChart;
