import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

const firstData = [
  { name: "Director", value: 1 },
  { name: "Deputy Director", value: 6 },
  { name: "Assistant Director & Public Prosecutor", value: 35 },
  { name: "Additional Public Prosecutor", value: 489 },
  { name: "Assistant Public Prosecutors", value: 879 },
];

const secondData = [
  { name: "Cadre 1", prosecutors: 50, percentage: 20 },
  { name: "Cadre 2", prosecutors: 100, percentage: 40 },
  { name: "Cadre 3", prosecutors: 75, percentage: 30 },
];

const thirdData = [
  { name: "Login A", value: 300 },
  { name: "Login B", value: 500 },
  { name: "Login C", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A569BD"];

const Home = () => {
  return (
    <div className=" rounded-lg w-full max-w-full h-auto">
      <h1 className="text-2xl font-bold mb-6">Prosecution Dashboard</h1>

      {/* Pie and Donut Charts in One Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Prosecution Sanctioned Positions</h2>
          <PieChart width={400} height={400}>
            <Pie data={firstData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
              {firstData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        {/* Donut Chart */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Login Data Statistics</h2>
          <PieChart width={400} height={400}>
            <Pie data={thirdData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={100} fill="#8884d8" label>
              {thirdData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>

      {/* Bar Chart in a Separate Row */}
      <div className="bg-white p-4 rounded-xl shadow-md mt-6">
        <div style={{ width: "500px" }}>
          <h2 className="text-xl font-semibold mb-4">Number of Prosecutors by Cadre</h2>
          <BarChart width={500} height={300} data={secondData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="prosecutors" fill="#82ca9d" />
          </BarChart>
        </div>
      </div>
    </div>
  );
};

export default Home;

