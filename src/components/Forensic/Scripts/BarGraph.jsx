
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const chartColors = ["#8884d8", "#82ca9d", "#f2c57c", "#6a8caf", "#d4a5a5", "#a28bd3", "#ff9a76", "#74b49b"];

const BarGraph = ({ data }) => {
  const barData = {
    labels: ["Forensic Statistics"], // Single label, multiple datasets
    datasets: [
      {
        label: "Disposal Cases",
        data: [data.disposal_cases],
        backgroundColor: chartColors[0],
        borderColor: chartColors[0],
        borderWidth: 1,
      },
      {
        label: "Disposal Exhibits",
        data: [data.disposal_exhibits],
        backgroundColor: chartColors[1],
        borderColor: chartColors[1],
        borderWidth: 1,
      },
      {
        label: "Earlier Pending Cases",
        data: [data.earlier_pending],
        backgroundColor: chartColors[2],
        borderColor: chartColors[2],
        borderWidth: 1,
      },
      {
        label: "Earlier Pending Exhibits",
        data: [data.earlier_pending_exhibits],
        backgroundColor: chartColors[3],
        borderColor: chartColors[3],
        borderWidth: 1,
      },
      {
        label: "Pending Cases",
        data: [data.pending_cases],
        backgroundColor: chartColors[4],
        borderColor: chartColors[4],
        borderWidth: 1,
      },
      {
        label: "Pending Exhibits",
        data: [data.pending_exhibits],
        backgroundColor: chartColors[5],
        borderColor: chartColors[5],
        borderWidth: 1,
      },
      {
        label: "Received Cases",
        data: [data.received_cases],
        backgroundColor: chartColors[6],
        borderColor: chartColors[6],
        borderWidth: 1,
      },
      {
        label: "Received Exhibits",
        data: [data.received_exhibits],
        backgroundColor: chartColors[7],
        borderColor: chartColors[7],
        borderWidth: 1,
      },
    ],
  };
  
  // Chart Options
  const options = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" }, // Show legend at the bottom
      title: {
        display: false,
        // text: "Forensic Statistics",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Categories", // X-axis label
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "No of cases", // Y-axis label
        },
      },
    },
  };
  
  
  return (
  // <div className="bg-white p-4 rounded-xl shadow-md">
  <div className="bg-white p-4 rounded-xl w-full">

  <h2 className="text-xl font-semibold mb-4">Cases & Exhibits Overview</h2>
  <Bar data={barData} options={options} />
</div>
)
};

export default BarGraph;
