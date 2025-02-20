import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, RadialBarChart, RadialBar } from "recharts";
import { UserPlus, ShieldCheck, TrendingUp, BarChart as BarChartIcon } from "lucide-react";
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
// ✅ Updated Dummy Data for Recruitment
const recruitmentData = [
  { name: "Forensic Experts", value: 15, color: chartColors[0] }, // Muted Purple
  { name: "Analysts", value: 10, color: chartColors[1] }, // Warm Sand
  { name: "Technicians", value: 8, color: chartColors[2] }, // Steel Blue
];

// ✅ Updated Dummy Data for Cyber Forensic Advancements
const cyberForensicData = [
  { name: "AI in Forensics", value: 85, color: chartColors[3] }, // Soft Rose
  { name: "Cloud Evidence Analysis", value: 75, color: chartColors[4] }, // Lavender
  { name: "Blockchain Security", value: 65, color: chartColors[5] }, // Muted Coral
  { name: "Automation", value: 90, color: chartColors[6] }, // Muted Teal
];

// ✅ Updated Dummy Data for Operational Efficiency (Gauge Chart)
const efficiencyData = [{ name: "Compliance", value: 92, fill: chartColors[7] }]; // Mauve

const ForensicStrengtheningInitiatives = () => {
  return (
    <div className="rounded-lg w-full max-w-full h-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <BarChartIcon size={28} className="text-blue-600" />
        Forensic Strengthening Initiatives
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      {/* Recruitment Efforts with Pie Chart */}
      <div className="bg-white p-4 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
            <UserPlus size={24} className="text-blue-600" />
            Recruitment Efforts
          </h3>
          <span className="text-gray-600 text-sm">Total: 33 Recruits</span>
        </div>
        <p className="text-gray-600 mb-3">
          Keeps track of recruitment efforts for forensic experts, analysts, and technicians.
        </p>

        {/* Pie Chart */}
        <div className="flex justify-center w-full">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={recruitmentData} dataKey="value" nameKey="name" outerRadius={100} label>
                {recruitmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Cyber Forensic Tools with Bar Chart */}
      <div className="bg-white p-4 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
            <ShieldCheck size={24} className="text-green-600" />
            Cyber Forensic Advancements
          </h3>
          <span className="text-gray-600 text-sm">Overall Adoption: 80%</span>
        </div>
        <p className="text-gray-600 mb-3">
          Monitors advancements in cyber forensic tools, digital evidence analysis, and automation.
        </p>

        {/* Bar Chart for Cyber Forensic Tools */}
        <div className="flex justify-center w-full">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={cyberForensicData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value">
                {cyberForensicData.map((entry, index) => (
                  <Cell key={`bar-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Operational Efficiency - Gauge Chart */}
      <div className="bg-white p-4 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
            <TrendingUp size={24} className="text-purple-600" />
            Operational Efficiency
          </h3>
          <span className="text-gray-600 text-sm">Compliance: 92%</span>
        </div>
        <p className="text-gray-600 mb-3">
          Evaluating efficiency and ensuring adherence to forensic best practices.
        </p>

        {/* Gauge Chart */}
        <div className="flex justify-center w-full">
          <ResponsiveContainer width="100%" height={250}>
            <RadialBarChart innerRadius="80%" outerRadius="100%" data={efficiencyData} startAngle={90} endAngle={-270}>
              <RadialBar minAngle={15} background clockWise dataKey="value" />
              <Tooltip />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>

        <p className="text-sm text-gray-500 mt-1">Target: 95% Compliance</p>
      </div>
      </div>
    </div>
  );
};

export default ForensicStrengtheningInitiatives;
