import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area
} from 'recharts';

// Dummy Data for Prosecution & Forensic Departments
const dataSharingEffectivenessData = [
  { department: 'Judicial', effectiveness: 75 },
  { department: 'Prosecution', effectiveness: 85 },
  { department: 'Forensic', effectiveness: 80 },
];

const forensicDataUsageData = [
  { name: 'Used Forensic Data', value: 70 },
  { name: 'Did Not Use Forensic Data', value: 30 },
];

const responseTimeData = [
  { month: 'Jan', responseTime: 5 },
  { month: 'Feb', responseTime: 6 },
  { month: 'Mar', responseTime: 4 },
  { month: 'Apr', responseTime: 3 },
  { month: 'May', responseTime: 7 },
  { month: 'Jun', responseTime: 5 },
  { month: 'Jul', responseTime: 4 },
  { month: 'Aug', responseTime: 3 },
  { month: 'Sep', responseTime: 6 },
  { month: 'Oct', responseTime: 5 },
  { month: 'Nov', responseTime: 4 },
  { month: 'Dec', responseTime: 3 },
];

// Colors for Pie chart segments
const COLORS = ['#8884d8', '#FF6347'];

const CourtTab4 = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '40px', color: '#333' }}>Prosecution & Forensic Departments Dashboard</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>

        {/* Effectiveness of Data Sharing Mechanisms (Bar Chart) */}
        <div style={{ width: '48%', marginBottom: '30px', backgroundColor: '#f7f7f7', borderRadius: '10px', padding: '20px' }}>
          <h3>Effectiveness of Data-Sharing Mechanisms</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dataSharingEffectivenessData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="department" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="effectiveness" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Percentage of Cases Using Forensic Data (Pie Chart) */}
        <div style={{ width: '48%', marginBottom: '30px', backgroundColor: '#f7f7f7', borderRadius: '10px', padding: '20px' }}>
          <h3>Percentage of Cases Using Forensic Data</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={forensicDataUsageData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {forensicDataUsageData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Response Time for Evidence Retrieval (Line Chart) */}
        <div style={{ width: '48%', marginBottom: '30px', backgroundColor: '#f7f7f7', borderRadius: '10px', padding: '20px' }}>
          <h3>Response Time for Evidence Retrieval</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={responseTimeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="responseTime" stroke="#FF6347" />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
};

export default CourtTab4;
