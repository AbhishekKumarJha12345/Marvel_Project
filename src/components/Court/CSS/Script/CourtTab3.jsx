import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';

// Dummy Data for Video Conferencing Hearings & Case Disposal Rate
const caseDisposalData = [
  { month: 'Jan', disposedCases: 30, backlogReduction: 5 },
  { month: 'Feb', disposedCases: 40, backlogReduction: 10 },
  { month: 'Mar', disposedCases: 50, backlogReduction: 15 },
  { month: 'Apr', disposedCases: 60, backlogReduction: 20 },
  { month: 'May', disposedCases: 70, backlogReduction: 25 },
  { month: 'Jun', disposedCases: 85, backlogReduction: 35 },
  { month: 'Jul', disposedCases: 95, backlogReduction: 45 },
  { month: 'Aug', disposedCases: 100, backlogReduction: 50 },
  { month: 'Sep', disposedCases: 110, backlogReduction: 60 },
  { month: 'Oct', disposedCases: 120, backlogReduction: 70 },
  { month: 'Nov', disposedCases: 130, backlogReduction: 80 },
  { month: 'Dec', disposedCases: 140, backlogReduction: 90 },
];

// Pie chart data for infrastructure readiness
const readinessData = [
  { subject: 'Video Call', value: 80 },
  { subject: 'Audio Call', value: 85 },
  { subject: 'Case Filing', value: 75 },
  { subject: 'Judiciary Systems', value: 90 },
  { subject: 'Legal Professionals', value: 70 },
];

// Colors for Pie chart segments
// const COLORS = ['#8884d8', '#82ca9d', '#FFBB28', '#FF8042', '#FF6347'];
const COLORS = [
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
const VideoConferencingDashboard = () => {
  return (
    <div className="rounded-lg w-full max-w-full h-auto">
      <h1 className="text-2xl font-bold mb-6">Video Conferencing Hearings & Case Disposal Rate Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Case Disposal and Backlog Reduction Line Chart */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-4">Case Disposal & Backlog Reduction</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={caseDisposalData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="disposedCases" stroke="#8884d8" name="Disposed Cases" />
              <Line type="monotone" dataKey="backlogReduction" stroke="#82ca9d" name="Backlog Reduction" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Video Conferencing Impact Bar Chart */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-4">Impact of Video Conferencing on Case Disposal</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={caseDisposalData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="disposedCases" fill="#8884d8" name="Disposed Cases" />
              <Bar dataKey="backlogReduction" fill="#82ca9d" name="Backlog Reduction" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Infrastructure Readiness Pie Chart */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-4">Infrastructure Readiness</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={readinessData}
                dataKey="value"
                nameKey="subject"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {readinessData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
};

export default VideoConferencingDashboard;
