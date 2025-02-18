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

// Updated Pie chart data for compliance
const complianceData = [
  { name: 'Compliant', value: 85 },
  { name: 'Non-Compliant', value: 15 },
];

const accessibilityData = [
  { name: 'Accessible', value: 80 },
  { name: 'Inaccessible', value: 20 },
];

const COLORS = ['#0088FE', '#FF8042'];

const CourtTab2 = () => {
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg w-full max-w-full h-auto">
      <h1 className="text-2xl font-bold mb-6">eSummons & Digital Case Records Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Adoption Rate Line Chart */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-4">Adoption Rate of eSummons & Digital Case Records</h3>
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
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-4">Percentage of Court Summons Delivered Electronically</h3>
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

        {/* Updated Pie Chart for Compliance */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-4">Data Security Compliance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Tooltip />
              <Pie data={complianceData} dataKey="value" nameKey="name" outerRadius={100} fill="#8884d8" label>
                {complianceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Updated Pie Chart for Accessibility */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-4">Accessibility Compliance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Tooltip />
              <Pie data={accessibilityData} dataKey="value" nameKey="name" outerRadius={100} fill="#82ca9d" label>
                {accessibilityData.map((entry, index) => (
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

export default CourtTab2;
