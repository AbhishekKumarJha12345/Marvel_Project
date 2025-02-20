import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register required chart components
ChartJS.register(ArcElement, Tooltip, Legend);

const chartColors = [
  "#8884d8", // Muted Purple
  "#82ca9d", // Soft Green
];

const PolicePunishment = () => {
  // Data for the pie chart
  const data = {
    labels: ["No. of Cases Registered", "Cases in which Forensic Team Visited"],
    datasets: [
      {
        label: "Case Distribution",
        data: [13939, 2587],
        backgroundColor: chartColors,
        borderColor: chartColors,
        borderWidth: 1,
      },
    ],
  };

  // Custom tooltip content (showing percentage for each slice)
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Cases & Forensic Team Visits",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const value = data.datasets[0].data[tooltipItem.dataIndex];
            const total = data.datasets[0].data.reduce((acc, val) => acc + val, 0);
            const percentage = ((value / total) * 100).toFixed(2) + "%";
            return `${data.labels[tooltipItem.dataIndex]}: ${value} (${percentage})`;
          },
        },
      },
    },
  };

  return (
    <div className="p-6 rounded-lg flex flex-col">
      <div className="h-[450px]">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default PolicePunishment;
