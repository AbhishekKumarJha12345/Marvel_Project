import {React,useState} from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ModalComponent from '../../ModalComponent';
import FirBarGraph from './FirBarGraph';
// Register the necessary chart components
ChartJS.register(ArcElement, Tooltip, Legend);
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
  "#b0a8b9" // Dusty Lilac
];
const PoliceFirs = ({apidata}) => {
  // Data for the Pie Chart
  const [showModal, setShowModal] = useState(false);

  const data = {
    labels: [
      "FIRs Registered (BNS & IPC)",
      "FIRs Registered (BNS)",
      "FIRs under BNS (%)",
      "Chargesheets Filed (BNS)",
      "Chargesheets Not Filed",
      "Chargesheets Filed (%)",
    ],
    datasets: [
      {
        data: [apidata ?apidata.total_no_fir_registered_under_bns_ipc:"", apidata ?apidata.no_of_fir_registered_under_bns:"", apidata ?apidata.percentage_of_fir_under_bns_against_total_firs:"", apidata ?apidata.no_of_chargesheets_filed_under_bns:"", apidata ?apidata.no_of_chargesheets_not_filed_within_the_stipulated_time:"", apidata ?apidata.percentage_of_chargesheets_filed_on_the_basis_of_firs_under_bns:""], // Corresponding values for each section
        backgroundColor: chartColors, // Different colors for each section
        borderColor: chartColors, // Border colors to match
        borderWidth: 1,
      },
    ],
  };

  // Options for the Pie chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const label = tooltipItem.label || "";
            const value = tooltipItem.raw || 0;

            // If the label is related to percentage, add the '%' sign.
            if (label.includes("Percentage")) {
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
    <div className="bg-white p-6 mx-auto rounded-lg w-[100%] h-[600px]">
  <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-center flex-grow">
        FIRs New Criminal Laws
        </h2>
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
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px" }}>
  {/* First Chart (Pie Chart) */}
  <div style={{ flex: "1 1 45%", maxWidth: "100%", height: "400px", display: "flex", justifyContent: "center" }}>
    <Pie data={data} options={options} />
  </div>

  {/* Second Chart (FirBarGraph) */}
  <div style={{ flex: "1 1 45%", maxWidth: "100%", height: "30vh", display: "flex", justifyContent: "center" }}>
    <FirBarGraph />
  </div>
</div>



  <ModalComponent open={showModal} type='fir_1'  onClose={() => setShowModal(false)} />
    </div>
  );
};

export default PoliceFirs;
