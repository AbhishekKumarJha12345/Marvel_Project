import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axiosInstance from '../../utils/axiosInstance';

const chartColors = [
  "#8884d8", // Muted Purple
  "#82ca9d", // Soft Green
  "#f2c57c", // Warm Sand
];

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MasterTrainers = () => {
  const [trainingData, setTrainingData] = useState(null);

  const getTrainingData = async () => {
    try {
      const response = await axiosInstance.get('/live_data');
      console.log(response.data, 'Training Data ----------');
      setTrainingData(response.data.latest_workshop);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTrainingData();
  }, []);

  // Data for the Bar Chart
  const barData = {
    labels: [
      "Training Workshops Conducted",
      "Training through E-Academy Online",
      "Master Trainers (Police Personnel)",
    ],
    datasets: [
      {
        label: "Training Workshops Conducted",
        data: [trainingData?.training_workshops || 0, 0, 0], // Only for first category
        backgroundColor: chartColors[0],
        borderColor: chartColors[0],
        borderWidth: 1,
      },
      {
        label: "Training through E-Academy Online",
        data: [0, trainingData?.e_academy_online || 0, 0], // Only for second category
        backgroundColor: chartColors[1],
        borderColor: chartColors[1],
        borderWidth: 1,
      },
      {
        label: "Master Trainers (Police Personnel)",
        data: [0, 0, trainingData?.master_trainers || 0], // Only for third category
        backgroundColor: chartColors[2],
        borderColor: chartColors[2],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Master Trainers Statistics",
        position: "bottom",

      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Count", 
          font: { weight: "bold", size: 14 },         },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg w-full h-[500px] flex flex-col rounded-xl shadow-md" style={{ width: "95%" }}>
      <div className="flex mb-8">
        <h1 className="text-xl font-bold">Mode of Training</h1>
      </div>
      <div className="flex flex-col lg:flex-row w-full justify-center items-center">
        {/* Bar Chart */}
        <div className="w-full h-[380px] p-3 d-flex justify-center items-center">
          <Bar data={barData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default MasterTrainers;
