import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register required chart components for a line chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const chartColors = {
  cases: "#8884d8",      // Muted Purple
  visits: "#82ca9d",     // Soft Green
  additional: "#ff7f50", // Coral
};

const PolicePunishment2 = () => {
  // Data for the line chart
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "No. of Cases Registered",
        data: [13939, 14000, 13800, 14100, 14200, 13900],
        fill: false,
        borderColor: chartColors.cases,
        backgroundColor: chartColors.cases,
        tension: 0.1,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: "#000",
      },
      {
        label: "Cases in which Forensic Team Visited",
        data: [2587, 2600, 2500, 2550, 2590, 2570],
        fill: false,
        borderColor: chartColors.visits,
        backgroundColor: chartColors.visits,
        tension: 0.1,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: "#000",
      },
      {
        label: "Additional Data",
        data: [3000, 3200, 3100, 3050, 3150, 3000],
        fill: false,
        borderColor: chartColors.additional,
        backgroundColor: chartColors.additional,
        tension: 0.1,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: "#000",
      },
    ],
  };

  // Options for the line chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Case and Forensic Visit Data",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.dataset.label}: ${tooltipItem.formattedValue}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="p-6 rounded-lg flex flex-col" style={{backgroundColor:"white",width:"48%"}}>
      <div className="h-[400px]">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default PolicePunishment2;