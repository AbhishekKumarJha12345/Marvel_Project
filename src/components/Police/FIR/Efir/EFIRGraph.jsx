import {React,useState} from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import ModalComponent from '../../ModalComponent';
// Register required chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const EFIRsChart = () => {
  // Data for the bar graph
        const [showModal, setShowModal] = useState(false);
  
  const data = {
    labels: ["Total eFIRs Received", "Total eFIRs Converted to Proper FIRs"], // Categories
    datasets: [
      {
        label: "Total eFIRs Received",
        data: [365, 0], // Value only for the first label
        backgroundColor: "#FF5733", // Orange for Total eFIRs Received
        borderColor: "#D84315", // Darker Orange
        borderWidth: 1,
        barThickness: 50,
      },
      {
        label: "Total eFIRs Converted",
        data: [0, 87], // Value only for the second label
        backgroundColor: "#3357FF", // Blue for Converted FIRs
        borderColor: "#1A237E", // Darker Blue
        borderWidth: 1,
        barThickness: 50,
      },
    ],
  };

  // Options for the bar chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "eFIRs Data Overview",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${
              tooltipItem.dataset.label
            }: ${tooltipItem.raw.toLocaleString()}`;
          },
        },
      },
    },
    maintainAspectRatio: false, // Ensures the chart doesn't shrink when resizing
  };

  return (
    <div className="bg-white p-6 mx-auto rounded-lg w-[80%] h-[600px]"> {/* Increased width and height */}
    <div className="flex justify-between items-center mb-8">
    <h1 className="text-4xl font-bold mb-8">eFIRs Overview</h1>
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

      <div className="h-[500px]"> {/* Increased height for the chart container */}
        <Bar data={data} options={options} />
      </div>
    <ModalComponent open={showModal} type='fir_4' onClose={() => setShowModal(false)} />

    </div>
  );
};

export default EFIRsChart;
