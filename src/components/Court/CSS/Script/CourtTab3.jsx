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
const COLORS = ['#8884d8', '#82ca9d', '#FFBB28', '#FF8042', '#FF6347'];

const VideoConferencingDashboard = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '40px', color: '#333' }}>Video Conferencing Hearings & Case Disposal Rate Dashboard</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>

        {/* Case Disposal and Backlog Reduction Line Chart */}
        <div style={{ width: '48%', marginBottom: '30px', backgroundColor: '#f7f7f7', borderRadius: '10px', padding: '20px' }}>
          <h3>Case Disposal & Backlog Reduction</h3>
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
        <div style={{ width: '48%', marginBottom: '30px', backgroundColor: '#f7f7f7', borderRadius: '10px', padding: '20px' }}>
          <h3>Impact of Video Conferencing on Case Disposal</h3>
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
        <div style={{ width: '48%', marginBottom: '30px', backgroundColor: '#f7f7f7', borderRadius: '10px', padding: '20px' }}>
          <h3>Infrastructure Readiness</h3>
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
