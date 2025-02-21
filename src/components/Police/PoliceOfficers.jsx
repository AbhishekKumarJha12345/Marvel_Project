import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import axiosInstance from '../../utils/axiosInstance'; 
import ModalComponent from './ModalComponent';

// Register chart components
ChartJS.register(ArcElement, Tooltip, Legend);

const PoliceOfficers = ({ getDate }) => {
  const [showModal, setShowModal] = useState(false);
  const [trainingData, setTrainingData] = useState([]);

  const formatRank = (rank) => {
    return rank.replace(/\b[a-z]/g, (char) => char.toUpperCase()) // Capitalize first letter outside parentheses
               .replace(/\((.*?)\)/g, (match, p1) => `(${p1.toUpperCase()})`); // Convert text inside parentheses to uppercase
  };

  const getTrainingData = async () => {
    try {
      const response = await axiosInstance.get('/live_data');
      console.log(response.data, 'Training data response ----------');
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

  console.log(trainingData, 'training props data------');

  const totalOfficers = trainingData.reduce((acc, item) => acc + item.trained_officers, 0);
  const availableOfficers = trainingData.reduce((acc, item) => acc + item.available_officers, 0);

  const data = {
    labels: ['Total Trained Officers', 'Available Officers'],
    datasets: [
      {
        label: 'Officers Data',
        data: [totalOfficers, availableOfficers],
        backgroundColor: ['#82ca9d', '#8884d8'],
        hoverBackgroundColor: ['#4CAF50', '#2196F3'],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        // text: 'Officers Data Comparison',
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg w-[50%] h-[500px] text-center rounded-xl shadow-md">
      <div className="flex items-left mb-8">
        <h1 className="text-xl" style={{ fontWeight: '600' }}>Police Officers</h1>
      </div>
      <div className="h-[400px] w-full">
        <Pie data={data} options={options} />
      </div>
      <ModalComponent
        open={showModal}
        type="police"
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default PoliceOfficers;
