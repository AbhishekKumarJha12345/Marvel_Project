import { React, useState } from 'react';
// import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip  } from 'chart.js';
import ModalComponent from '../../ModalComponent';
import {  ResponsiveContainer,PieChart, Pie, Cell,Legend } from "recharts";


// Register required chart components
ChartJS.register(ArcElement, Tooltip);

const EFIRsChart = ({ generateReport }) => {
  const [showModal, setShowModal] = useState(false);

  const chartColors = [
    "#8884d8", "#82ca9d"
  ];

  const pieData = [
    { name: "Total eFIRs Received", value: 365 },
    { name: "Total eFIRs Converted to Proper FIRs", value: 87 },
  ];
  return (
    <div className="bg-white p-6 mx-auto rounded-lg w-[100%] h-[400px] ">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-semibold text-center flex-grow">eFIRs Overview</h2>
        <div className="flex space-x-4">
          {localStorage.getItem('role') !== 'chief secretary' && (
            <button
              className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-all"
              onClick={() => setShowModal(true)}
            >
              Add On
            </button>
          )}
        </div>
      </div>

      <div className="h-[250px]">
        {/* <Pie data={data} options={options} />
         */}
         <ResponsiveContainer width="100%" height={300}>
  <PieChart>
  <Legend 
  verticalAlign="bottom" 
  align="center" 
  layout="horizontal" />
    <Pie 
      data={pieData} 
      dataKey="value" 
      nameKey="name" 
      cx="50%" 
      cy="50%" 
      outerRadius={100} 
      label
    >
      {pieData.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
      ))}
    </Pie>
    <Tooltip />
  </PieChart>
</ResponsiveContainer>
      </div>

      <ModalComponent open={showModal} type="fir_4" onClose={() => setShowModal(false)} />
    </div>
  );
};

export default EFIRsChart;
