import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, LineChart, Line } from "recharts";

const dataMoUs = [
  { name: "Signed", value: 40 },
  { name: "In Progress", value: 30 },
  { name: "Pending", value: 20 },
  { name: "Expired", value: 10 },
];

const dataInfrastructure = [
  { project: "New Labs", count: 25 },
  { project: "Tech Upgradation", count: 40 },
  { project: "Facility Expansion", count: 35 },
];

const dataMoUsMonthly = [
  { month: "Jan 2024", Signed: 5, InProgress: 8, Pending: 4, Expired: 2 },
  { month: "Feb 2024", Signed: 7, InProgress: 9, Pending: 5, Expired: 3 },
  { month: "Mar 2024", Signed: 6, InProgress: 7, Pending: 3, Expired: 1 },
  { month: "Apr 2024", Signed: 9, InProgress: 10, Pending: 6, Expired: 4 },
  { month: "May 2024", Signed: 8, InProgress: 12, Pending: 7, Expired: 3 },
  { month: "Jun 2024", Signed: 10, InProgress: 14, Pending: 8, Expired: 5 },
  { month: "Jul 2024", Signed: 11, InProgress: 13, Pending: 6, Expired: 4 },
  { month: "Aug 2024", Signed: 9, InProgress: 11, Pending: 5, Expired: 2 },
  { month: "Sep 2024", Signed: 7, InProgress: 10, Pending: 4, Expired: 3 },
  { month: "Oct 2024", Signed: 10, InProgress: 12, Pending: 6, Expired: 2 },
  { month: "Nov 2024", Signed: 8, InProgress: 9, Pending: 5, Expired: 3 },
  { month: "Dec 2024", Signed: 6, InProgress: 8, Pending: 4, Expired: 2 },
];
const dataInfrastructureMonthly = [
  { month: "Jan 2024", NewLabs: 2, TechUpgradation: 4, FacilityExpansion: 3 },
  { month: "Feb 2024", NewLabs: 3, TechUpgradation: 5, FacilityExpansion: 4 },
  { month: "Mar 2024", NewLabs: 2, TechUpgradation: 4, FacilityExpansion: 3 },
  { month: "Apr 2024", NewLabs: 4, TechUpgradation: 6, FacilityExpansion: 5 },
  { month: "May 2024", NewLabs: 3, TechUpgradation: 7, FacilityExpansion: 4 },
  { month: "Jun 2024", NewLabs: 5, TechUpgradation: 8, FacilityExpansion: 6 },
  { month: "Jul 2024", NewLabs: 6, TechUpgradation: 7, FacilityExpansion: 5 },
  { month: "Aug 2024", NewLabs: 4, TechUpgradation: 6, FacilityExpansion: 4 },
  { month: "Sep 2024", NewLabs: 3, TechUpgradation: 5, FacilityExpansion: 3 },
  { month: "Oct 2024", NewLabs: 5, TechUpgradation: 7, FacilityExpansion: 4 },
  { month: "Nov 2024", NewLabs: 4, TechUpgradation: 6, FacilityExpansion: 5 },
  { month: "Dec 2024", NewLabs: 3, TechUpgradation: 5, FacilityExpansion: 3 },
];


const dataResourceAllocation = [
  { category: "Land Acquisition", value: 50 },
  { category: "Resource Allocation", value: 70 },
  { category: "Facility Expansion", value: 60 },
];

const dataRecruitment = [
  { category: "Deputy Director (Filled)", value: 2 },
  { category: "Assistant Director (Filled)", value: 3 },
  { category: "Assistant Chemical Analyser (Filled)", value: 33 },
  { category: "Scientific Officer (Filled)", value: 15 },
  { category: "Class 3 Cadre (In Progress)", value: 125 },
  { category: "Contract Basis (Hired)", value: 336 },
  { category: "Contract Basis (In Progress)", value: 189 },
];
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
// const COLORS_MOUS = chartColors
// const COLORS_INFRA = chartColors
// const COLORS_RESOURCE = chartColors
// const COLORS_RECRUIT = chartColors

export default function ForensicDashboard() {
  return (
    <div className="rounded-lg w-full max-w-full h-auto">
      <h1 className="text-2xl font-bold mb-6">Forensic Development Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* MOnthly Infrastructure Development Bar Chart */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-bold mb-4">Monthly Infrastructure Development Projects</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={dataInfrastructureMonthly}>
            <XAxis
              dataKey="month"
              stroke="#6b7280"
              tick={{ fontSize: 14 }}
              label={{
                value: "Month",
                position: "insideBottom",
                offset: -5,
              }}
            />
            <YAxis
              stroke="#6b7280"
              tick={{ fontSize: 14 }}
              label={{
                value: "Count",
                angle: -90,
                position: "insideLeft",
                offset: 0,
                style: { textAnchor: "middle" },
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#f9fafb",
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
              }}
            />
            <Legend iconType="circle" wrapperStyle={{ paddingBottom: 10, paddingTop: 10 }} />
            {["NewLabs", "TechUpgradation", "FacilityExpansion"].map((key, index) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={chartColors[index]}
                strokeWidth={3}
                dot={{ r: 5 }}
                name={key}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

        {/* monthly MoUs Chart */}

      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-bold mb-4">Monthly MoUs with NFSU</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={dataMoUsMonthly}>
            <XAxis
              dataKey="month"
              stroke="#6b7280"
              tick={{ fontSize: 14 }}
              label={{
                value: "Month",
                position: "insideBottom",
                offset: -5,
              }}
            />
            <YAxis
              stroke="#6b7280"
              tick={{ fontSize: 14 }}
              label={{
                value: "Count",
                angle: -90,
                position: "insideLeft",
                offset: 0,
                style: { textAnchor: "middle" },
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#f9fafb",
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
              }}
            />
            <Legend iconType="circle" wrapperStyle={{ paddingBottom: 10, paddingTop: 10 }} />
            {["Signed", "InProgress", "Pending", "Expired"].map((key, index) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={chartColors[index]}
                strokeWidth={3}
                dot={{ r: 5 }}
                name={key}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      {/* Infrastructure Development Bar Chart */}
      <div className="bg-white p-4 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Recent Entry:{dataInfrastructureMonthly[dataInfrastructureMonthly.length-1]?.month}</h2>

        <h2 className="text-xl font-semibold mb-4">Infrastructure Development Projects</h2>

        <ResponsiveContainer width="100%" height={300}>
<PieChart>
  <Pie 
    data={dataInfrastructure} 
    dataKey="count" 
    nameKey="project" 
    cx="50%" 
    cy="50%" 
    outerRadius={100} 
    fill="#8884d8" 
    label={({ name, percent }) => ` ${(percent * 100).toFixed(1)}%`}

  >
    {dataInfrastructure.map((entry, index) => (
      <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
    ))}
  </Pie>
  <Tooltip />
  <Legend />
</PieChart>
</ResponsiveContainer>

      </div>

      {/* MoUs Pie Chart */}
      <div className="bg-white p-4 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Recent Entry:{dataMoUsMonthly[dataMoUsMonthly.length-1]?.month}</h2>

                <h2 className="text-xl font-semibold mb-4">MoUs with NFSU</h2>

                <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={dataMoUs}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => ` ${(percent * 100).toFixed(1)}%`}

          >
            {dataMoUs.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend/>
        </PieChart>
      </ResponsiveContainer>

      </div>

      {/* Resource Allocation Line Chart */}
      <div className="bg-white p-4 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Resource Allocation & Facility Expansion</h2>
        <ResponsiveContainer width="100%" height={300}>
<BarChart data={dataResourceAllocation}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="category" />
  <YAxis />
  <Tooltip />
  <Legend />
  <Bar dataKey="value" fill="#82ca9d" />
</BarChart>
</ResponsiveContainer>

      </div>

      {/* Recruitment Line Chart */}
      <div className="bg-white p-4 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Recruitment & Hiring of Forensic Experts</h2>
        <ResponsiveContainer width="100%" height={300}>
<BarChart data={dataRecruitment}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="category" />
  <YAxis />
  <Tooltip />
  <Legend />
  <Bar dataKey="value" fill="#FF8042" barSize={30} />
</BarChart>
</ResponsiveContainer>

      </div>
        
      </div>
    </div>
  );
}
