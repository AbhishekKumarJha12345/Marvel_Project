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

const COLORS_MOUS = ["#4CAF50", "#FFC107", "#FF9800", "#F44336"];
const COLORS_INFRA = ["#2196F3", "#3F51B5", "#673AB7"];
const COLORS_RESOURCE = ["#009688", "#00BCD4", "#03A9F4"];
const COLORS_RECRUIT = ["#8BC34A", "#CDDC39", "#FFEB3B", "#FFC107", "#FF9800", "#FF5722", "#795548"];

export default function ForensicDashboard() {
  return (
    <div className="rounded-lg w-full max-w-full h-auto">
      <h1 className="text-2xl font-bold mb-6">Forensic Development Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
       
        {/* Infrastructure Development Bar Chart */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Infrastructure Development Projects</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dataInfrastructure}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="project" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" barSize={50} />
              {dataInfrastructure.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS_INFRA[index % COLORS_INFRA.length]} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Resource Allocation Line Chart */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Resource Allocation & Facility Expansion</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dataResourceAllocation}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#82ca9d" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Recruitment Line Chart */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Recruitment & Hiring of Forensic Experts</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dataRecruitment}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#FF8042" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
         {/* MoUs Pie Chart */}
         <div className="bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">MoUs with NFSU</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={dataMoUs}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {dataMoUs.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS_MOUS[index % COLORS_MOUS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
