import {React,useState} from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ModalComponent from '../../ModalComponent';
// Register the necessary chart components
ChartJS.register(ArcElement, Tooltip, Legend);

const PoliceChargeSheet = () => {
  // Data for the Donut Chart
      const [showModal, setShowModal] = useState(false);
  
  const data = {
    labels: [
      'Total Charge Sheeted',
      'Convicted',
      'Acquitted',
      'Pending',
    ],
    datasets: [
      {
        data: [71107, 16211, 12741, 42155], // Corresponding values for each section
        backgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#FF8C00'], // Different colors for each section
        borderColor: ['#FF5733', '#33FF57', '#3357FF', '#FF8C00'], // Border colors to match
        borderWidth: 1,
      },
    ],
  };

  // Options for the Donut chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const label = tooltipItem.label || '';
            const value = tooltipItem.raw || 0;
            return `${label}: ${value.toLocaleString()}`; // Formatting numbers with commas
          },
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 mx-auto rounded-lg w-[60%]">
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-4xl font-bold">Charge Sheet Status</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        style={{ backgroundColor: '#2d3748' }}
        onClick={() => {
          console.log("Open modal");
          setShowModal(true);
        }}
      >
        Add On
      </button>
    </div>
    
    <div className="h-[300px] w-[300px] mx-auto">
      <Doughnut data={data} options={options} />
    </div>
  
    <ModalComponent open={showModal} type='fir_2' onClose={() => setShowModal(false)} />
  </div>
  
    
  );
};

export default PoliceChargeSheet;
