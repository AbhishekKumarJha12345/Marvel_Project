import { React, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import ModalComponent from "../../ModalComponent";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip as RechartTooltip } from "recharts";

// Register required chart components
ChartJS.register(ArcElement, Tooltip);

const EFIRsChart = ({ generateReport }) => {
  const [showModal, setShowModal] = useState(false);

  const chartColors = ["#8884d8", "#82ca9d"];

  const pieData = [
    { name: "eFIRs Received", value: 365 },
    { name: "eFIRs to Proper FIRs", value: 37 },
  ];

  // Function to render percentage labels inside the PieChart
  const renderLabel = ({ name, value }) => {
    const total = pieData.reduce((acc, curr) => acc + curr.value, 0);
    const percentage = ((value / total) * 100).toFixed(1); // Format to 1 decimal place
    return `${name} (${percentage}%)`;
  };

  // Custom Tooltip component to show percentage on hover
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const total = pieData.reduce((acc, curr) => acc + curr.value, 0);
      const percentage = ((payload[0].value / total) * 100).toFixed(1);
      return (
        <div className="bg-white p-2 rounded shadow border text-sm">
          <p className="font-semibold">{payload[0].name}</p>
          <p>{`Value: ${payload[0].value}`}</p>
          <p>{`Percentage: ${percentage}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-6 mx-auto rounded-lg w-[100%] h-[400px]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-semibold text-center flex-grow">
          eFIRs Overview
        </h2>
        <div className="flex space-x-4">
          {localStorage.getItem("role") !== "chief secretary" && (
            <button
              className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-all"
              onClick={() => setShowModal(true)}
            >
              Add On
            </button>
          )}
        </div>
      </div>

      <div className="h-[400px]" style={{ width: "100%", padding: "0", margin: "0", display: "flex", justifyContent: "center" }}>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Legend 
              verticalAlign="bottom" 
              align="center" 
              layout="horizontal" 
              iconSize={10}  // Makes the legend icon smaller
              wrapperStyle={{ fontSize: "12px" }}  // Makes the text smaller
            />
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80} // Reduced from 100 to 80
              label={renderLabel} // Using the custom label function
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={chartColors[index % chartColors.length]}
                />
              ))}
            </Pie>
            <RechartTooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <ModalComponent open={showModal} type="fir_4" onClose={() => setShowModal(false)} />
    </div>
  );
};

export default EFIRsChart;
