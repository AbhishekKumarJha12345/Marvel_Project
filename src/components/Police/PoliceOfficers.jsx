import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip as RechartsTooltip } from "recharts";
import axiosInstance from "../../utils/axiosInstance";
import ModalComponent from "./ModalComponent";

// Register necessary Chart.js elements
ChartJS.register(ArcElement, Tooltip);

const PoliceOfficers = ({ getDate }) => {
  const [showModal, setShowModal] = useState(false);
  const [trainingData, setTrainingData] = useState([]);
  const chartColors = ["#82ca9d", "#8884d8"];

  const formatRank = (rank) => {
    return rank.replace(/\b[a-z]/g, (char) => char.toUpperCase()) 
               .replace(/\((.*?)\)/g, (match, p1) => `(${p1.toUpperCase()})`); 
  };

  const getTrainingData = async () => {
    try {
      const response = await axiosInstance.get('/live_data');
      const formattedData = response.data.latest_trainings.map((item) => ({
        ...item,
        rank: formatRank(item.rank),
        available_officers: parseInt(item.available_officers, 10),
        trained_officers: parseInt(item.trained_officers, 10),
      }));
      setTrainingData(formattedData);

      if (formattedData.length > 0) {
        getDate(formattedData[0].uploaded_date);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTrainingData();
  }, []);

  const totalOfficers = trainingData.reduce((acc, item) => acc + item.trained_officers, 0);
  const availableOfficers = trainingData.reduce((acc, item) => acc + item.available_officers, 0);
  const total = totalOfficers + availableOfficers;

  const pieData = [
    { name: "Total Trained Officers", value: totalOfficers, percentage: total ? (totalOfficers / total) * 100 : 0 },
    { name: "Available Officers", value: availableOfficers, percentage: total ? (availableOfficers / total) * 100 : 0 },
  ];

  return (
    <div className="bg-white  rounded-lg w-[100%] h-[500px] text-center rounded-xl shadow-md">
      <div className="flex items-left mb-5 p-3">
        <h1 className="text-xl font-semibold">Police Officers</h1>
      </div>
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height={300} style={{}}>
          <PieChart width={400} height={400}>
            <Pie
              data={pieData}
              dataKey="percentage"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={({ name, percentage }) => `${name}: ${percentage.toFixed(1)}%`}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
              ))}
            </Pie>
            <RechartsTooltip formatter={(value) => `${value.toFixed(1)}%`} />
            <Legend verticalAlign="bottom" align="center" layout="horizontal" />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <ModalComponent open={showModal} type="police" onClose={() => setShowModal(false)} />
    </div>
  );
};

export default PoliceOfficers;
