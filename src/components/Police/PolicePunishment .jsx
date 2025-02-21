import React from "react";
// import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  
} from "chart.js";
import {  ResponsiveContainer,PieChart, Pie, Cell,Legend } from "recharts";

// Register required chart components
ChartJS.register(ArcElement, Tooltip);

const chartColors = [
  "#8884d8", // Muted Purple
  "#82ca9d", // Soft Green
];

const PolicePunishment = () => {
  // Data for the pie chart
  const pieData = [
    { name: "No. of Cases Registered", value: 13939 },
    { name: "Cases in which Forensic Team Visited", value: 2587 },
  ];
  

  // Custom tooltip content (showing percentage for each slice)
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
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
    <div className="p-6 rounded-lg flex flex-col" style={{backgroundColor:"white",width:"48%",display:"flex",justifyContent:"center"}}>
      <div className="h-[360px]" style={{display:"flex",justifyContent:"center"}}>
        {/* <Pie data={data} options={options} /> */}
        <ResponsiveContainer width="100%" height={300}>
  <PieChart>
    <Pie 
      data={pieData} 
      dataKey="value" 
      nameKey="name" 
      cx="50%" 
      cy="50%" 
      outerRadius={100} 
      label
    >
      {pieData.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
      ))}
    </Pie>
    <Tooltip />
    <Legend verticalAlign="bottom" align="center" layout="horizontal" />
  </PieChart>
</ResponsiveContainer>

      </div>
    </div>
  );
};

export default PolicePunishment;
