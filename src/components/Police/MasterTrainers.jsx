import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axiosInstance from '../../utils/axiosInstance';

const chartColors = [
  "#8884d8", // Muted Purple
  "#82ca9d", // Soft Green
  "#f2c57c", // Warm Sand
  "#6a8caf", // Steel Blue
  "#d4a5a5", // Soft Rose
  "#a28bd3", // Lavender
  "#ff9a76", // Muted Coral
  "#74b49b", // Muted Teal
  "#c08497", // Mauve
  "#b0a8b9"  // Dusty Lilac
];

// Register the necessary chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MasterTrainers = () => {
  const [trainingData, setTrainingData] = useState('');

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
        label: 'Training Statistics',
        data: [
          trainingData ? trainingData.training_workshops || 0 : 0,
          trainingData ? trainingData.e_academy_online || 0 : 0,
          trainingData ? trainingData.master_trainers || 0 : 0,
        ],
        backgroundColor: [chartColors[2], chartColors[3], chartColors[4]],
        borderColor: [chartColors[2], chartColors[3], chartColors[4]],
        borderWidth: 1,
      },
    ],
  };

  // Options for the Bar chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Master Trainers Statistics',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg w-full h-[500px] flex flex-col rounded-xl shadow-md" style={{ width: "95%" }}>
      <div className="flex justify-around items-center mb-8">
        <h1 className="text-xl font-bold" style={{ textAlign: "center" }}>Mode of Training</h1>
      </div>
      <div className="flex flex-col lg:flex-row w-full justify-center items-center">
        {/* Bar Chart */}
        <div className="w-full h-[350px] p-3 d-flex justify-center items-center">
          <Bar data={barData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default MasterTrainers;