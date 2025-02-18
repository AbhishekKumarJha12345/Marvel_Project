import React, { useEffect, useState } from 'react';
import { Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import axiosInstance from '../../utils/axiosInstance';

// Register the necessary chart components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);

const MasterTrainers = () => {
  const [trainingData, setTrainingData] = useState('');

  const getTrainingData = async () => {
    try {
      const response = await axiosInstance.get('/live_data');
      console.log(response.data, 'Training data response ----------');
      setTrainingData(response.data.latest_workshop);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTrainingData();
  }, []);

  // Data for the Pie Chart
  const pieData = {
    labels: [
      'Training Workshops Conducted',
      'Training through E-Academy Online',
      'Master Trainers (Police Personnel)',
    ],
    datasets: [
      {
        data: [
          trainingData ? trainingData.training_workshops || 0 : 0,
          trainingData ? trainingData.e_academy_online || 0 : 0,
          trainingData ? trainingData.master_trainers || 0 : 0,
        ],
        backgroundColor: ['#FF5733', '#33FF57', '#3357FF'],
        borderColor: ['#FF5733', '#33FF57', '#3357FF'],
        borderWidth: 1,
      },
    ],
  };

  // Data for the Line Chart
  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Monthly Workshops',
        data: trainingData ? trainingData.monthly_workshops || [] : [], // Assuming monthly_workshops is an array
        fill: false,
        backgroundColor: '#007BFF',
        borderColor: '#007BFF',
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg w-full h-[500px] flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-4">Master Trainers</h1>
      <div className="flex flex-col lg:flex-row w-full justify-center items-center">
        {/* Pie Chart */}
        <div className="w-full lg:w-1/2 h-[400px] p-3 d-flex justify-center items-center">
          <Pie data={pieData} options={options} />
        </div>
        {/* Line Chart */}
        <div className="w-full lg:w-1/2 h-[400px] p-3 d-flex justify-center items-center">
          <Line data={lineData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default MasterTrainers;
