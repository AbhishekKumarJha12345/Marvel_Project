import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';

// Dummy Data for Charts
const caseData = [
  { month: 'Jan', total: 1200, pending: 400, disposed: 800, avgResolutionTime: 30 },
  { month: 'Feb', total: 1300, pending: 500, disposed: 800, avgResolutionTime: 28 },
  { month: 'Mar', total: 1400, pending: 300, disposed: 1100, avgResolutionTime: 35 },
  { month: 'Apr', total: 1250, pending: 350, disposed: 900, avgResolutionTime: 32 },
  { month: 'May', total: 1500, pending: 200, disposed: 1300, avgResolutionTime: 25 },
  { month: 'Jun', total: 1100, pending: 450, disposed: 650, avgResolutionTime: 28 },
  { month: 'Jul', total: 1400, pending: 300, disposed: 1100, avgResolutionTime: 33 },
  { month: 'Aug', total: 1350, pending: 400, disposed: 950, avgResolutionTime: 29 },
  { month: 'Sep', total: 1450, pending: 500, disposed: 950, avgResolutionTime: 27 },
  { month: 'Oct', total: 1300, pending: 450, disposed: 850, avgResolutionTime: 31 },
  { month: 'Nov', total: 1200, pending: 400, disposed: 800, avgResolutionTime: 30 },
  { month: 'Dec', total: 1500, pending: 200, disposed: 1300, avgResolutionTime: 25 },
];

// Pie chart data
const caseStatusData = [
  { name: 'Pending', value: 500 },
  { name: 'Disposed', value: 9500 }
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

const CourtTab1 = () => {
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg w-full max-w-full h-auto">
      <h1 className="text-2xl font-bold mb-6">Court System Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Pie Chart */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-4">Case Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={caseStatusData} dataKey="value" nameKey="name" outerRadius={100} fill="#8884d8">
                {
                  caseStatusData.map((entry, index) => <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#82ca9d' : '#8884d8'} />)
                }
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-4">Cases Processed Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={caseData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="total" stroke={chartColors[0]} activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="pending" stroke={chartColors[1]} />
              <Line type="monotone" dataKey="disposed" stroke={chartColors[2]} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Area Chart */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-4">Average Resolution Time Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={caseData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="avgResolutionTime" fill={chartColors[0]} stroke="#8884d8" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
};

export default CourtTab1;
