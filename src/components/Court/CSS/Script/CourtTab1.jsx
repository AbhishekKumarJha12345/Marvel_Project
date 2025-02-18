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

const CourtTab1 = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Court System Dashboard</h1>
      <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>

        {/* Pie Chart */}
        <div style={{ width: '45%', marginBottom: '30px' }}>
          <h3>Case Status Distribution</h3>
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
        <div style={{ width: '45%', marginBottom: '30px' }}>
          <h3>Cases Processed Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={caseData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="total" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="pending" stroke="#82ca9d" />
              <Line type="monotone" dataKey="disposed" stroke="#FF6347" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Area Chart */}
        <div style={{ width: '45%', marginBottom: '30px' }}>
          <h3>Average Resolution Time Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={caseData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="avgResolutionTime" fill="#8884d8" stroke="#8884d8" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
};

export default CourtTab1;
