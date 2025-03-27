import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const data = [
  { name: "Constabulary", value: 120 }, // Example data
  { name: "Officers", value: 30 },
];

const COLORS = ["#0088FE", "#FFBB28"]; // Colors for slices

const PieChartComponent = () => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-semibold mb-2">Police Force Distribution</h2>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          label
          outerRadius={150}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default PieChartComponent;
