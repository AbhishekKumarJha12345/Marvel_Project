import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

// Dummy Data for eSummons & Digital Case Records
const adoptionData = [
  { month: 'Jan', adoptionRate: 40 },
  { month: 'Feb', adoptionRate: 45 },
  { month: 'Mar', adoptionRate: 55 },
  { month: 'Apr', adoptionRate: 60 },
  { month: 'May', adoptionRate: 70 },
  { month: 'Jun', adoptionRate: 75 },
  { month: 'Jul', adoptionRate: 80 },
  { month: 'Aug', adoptionRate: 85 },
  { month: 'Sep', adoptionRate: 90 },
  { month: 'Oct', adoptionRate: 95 },
  { month: 'Nov', adoptionRate: 100 },
  { month: 'Dec', adoptionRate: 100 },
];

// Percentage of eSummons Delivered Electronically (for each month)
const summonsData = [
  { month: 'Jan', deliveredElectronically: 30 },
  { month: 'Feb', deliveredElectronically: 40 },
  { month: 'Mar', deliveredElectronically: 50 },
  { month: 'Apr', deliveredElectronically: 60 },
  { month: 'May', deliveredElectronically: 70 },
  { month: 'Jun', deliveredElectronically: 75 },
  { month: 'Jul', deliveredElectronically: 80 },
  { month: 'Aug', deliveredElectronically: 85 },
  { month: 'Sep', deliveredElectronically: 90 },
  { month: 'Oct', deliveredElectronically: 95 },
  { month: 'Nov', deliveredElectronically: 98 },
  { month: 'Dec', deliveredElectronically: 100 },
];

// Pie chart data for evaluating Digital Case Records
const securityComplianceData = [
  { name: 'Secure', value: 85 },
  { name: 'Non-Secure', value: 15 },
];

const accessibilityComplianceData = [
  { name: 'Accessible', value: 80 },
  { name: 'Inaccessible', value: 20 },
];

const CourtTab2 = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>eSummons & Digital Case Records Dashboard</h1>
      <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>

        {/* Adoption Rate Line Chart */}
        <div style={{ width: '45%', marginBottom: '30px' }}>
          <h3>Adoption Rate of eSummons & Digital Case Records</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={adoptionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="adoptionRate" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* eSummons Delivered Electronically Bar Chart */}
        <div style={{ width: '45%', marginBottom: '30px' }}>
          <h3>Percentage of Court Summons Delivered Electronically</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={summonsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="deliveredElectronically" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart for Data Security Compliance */}
        <div style={{ width: '45%', marginBottom: '30px' }}>
          <h3>Data Security Compliance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={securityComplianceData} dataKey="value" nameKey="name" outerRadius={100} fill="#8884d8">
                {
                  securityComplianceData.map((entry, index) => <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#82ca9d' : '#FF6347'} />)
                }
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart for Accessibility Compliance */}
        <div style={{ width: '45%', marginBottom: '30px' }}>
          <h3>Accessibility Compliance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={accessibilityComplianceData} dataKey="value" nameKey="name" outerRadius={100} fill="#8884d8">
                {
                  accessibilityComplianceData.map((entry, index) => <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#82ca9d' : '#FF6347'} />)
                }
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
};

export default CourtTab2;
