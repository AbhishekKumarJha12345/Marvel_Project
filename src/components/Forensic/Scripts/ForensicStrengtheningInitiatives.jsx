import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, RadialBarChart, RadialBar } from "recharts";
import { UserPlus, ShieldCheck, TrendingUp, BarChart as BarChartIcon } from "lucide-react";

// ✅ Dummy Data for Recruitment
const recruitmentData = [
  { name: "Forensic Experts", value: 15, color: "#4CAF50" },
  { name: "Analysts", value: 10, color: "#FF9800" },
  { name: "Technicians", value: 8, color: "#03A9F4" },
];

// ✅ Dummy Data for Cyber Forensic Advancements
const cyberForensicData = [
  { name: "AI in Forensics", value: 85, color: "#4CAF50" },
  { name: "Cloud Evidence Analysis", value: 75, color: "#FF9800" },
  { name: "Blockchain Security", value: 65, color: "#03A9F4" },
  { name: "Automation", value: 90, color: "#E91E63" },
];

// ✅ Dummy Data for Operational Efficiency (Gauge Chart)
const efficiencyData = [{ name: "Compliance", value: 92, fill: "#6a0dad" }];

const ForensicStrengtheningInitiatives = () => {
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg w-full max-w-full h-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <BarChartIcon size={28} className="text-blue-600" />
        Forensic Strengthening Initiatives
      </h2>

      {/* Recruitment Efforts with Pie Chart */}
      <div className="p-5 bg-gray-100 rounded-lg mb-6 w-full">
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
      <div className="p-5 bg-gray-100 rounded-lg mb-6 w-full">
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
      <div className="p-5 bg-gray-100 rounded-lg w-full">
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
  );
};

export default ForensicStrengtheningInitiatives;
