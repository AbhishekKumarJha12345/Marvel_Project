import { React, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, Tooltip, Legend, CategoryScale, LinearScale } from 'chart.js';
import ModalComponent from '../../ModalComponent';

// Register required chart components
ChartJS.register(LineElement, PointElement, Tooltip, Legend, CategoryScale, LinearScale);

const EFIRsChart2 = ({ generateReport }) => {
  const [showModal, setShowModal] = useState(false);

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Total eFIRs Received',
        data: [50, 40, 55, 65, 70, 85, 90, 100, 95, 80, 60, 75],
        borderColor: '#8884d8',
        backgroundColor: 'rgba(136, 132, 216, 0.5)',
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
      {
        label: 'Total eFIRs Converted to FIRs',
        data: [10, 15, 20, 18, 25, 30, 35, 45, 40, 38, 30, 25],
        borderColor: '#82ca9d',
        backgroundColor: 'rgba(130, 202, 157, 0.5)',
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'eFIRs Data Trend Over the Year' },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw.toLocaleString()}`;
          },
        },
      },
    },
    maintainAspectRatio: false,
    scales: {
      x: { title: { display: true, text: 'Month' } },
      y: { title: { display: true, text: 'Number of eFIRs' }, beginAtZero: true },
    },
  };

  return (
    <div className="bg-white p-6 mx-auto rounded-lg w-[100%] h-[400px]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-semibold text-center flex-grow">eFIRs Trend Over Time</h2>
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

      <div className="h-[300px]">
        <Line data={data} options={options} />
      </div>

      <ModalComponent open={showModal} type="fir_4" onClose={() => setShowModal(false)} />
    </div>
  );
};

export default EFIRsChart2;
