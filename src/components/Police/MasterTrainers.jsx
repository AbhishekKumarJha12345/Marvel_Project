import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import axiosInstance from '../../utils/axiosInstance';

// Register chart components
ChartJS.register(ArcElement, Tooltip, Legend);

const MasterTrainers = () => {
  const [trainingData, setTrainingData] = useState(null);

  // Fetch training data
  const getTrainingData = async () => {
    try {
      const response = await axiosInstance.get('/live_data');
      setTrainingData(response.data.latest_workshop);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getTrainingData();
  }, []);

  // Prepare data for the Pie Chart
  const data = {
    labels: [
      'Training Workshops Conducted',
      'Training through E-Academy Online',
      'Master Trainers (Police Personnel)',
    ],
    datasets: [
      {
        data: trainingData
          ? [
              trainingData.training_workshops,
              trainingData.e_academy_online,
              trainingData.master_trainers,
            ]
          : [0, 0, 0], // Default values if no data available
        backgroundColor: ['#FF5733', '#33FF57', '#3357FF'],
        borderColor: ['#FF5733', '#33FF57', '#3357FF'],
        borderWidth: 1,
      },
    ],
  };

  // Function to send data to Flask and download the report
  const downloadReport = async () => {
    if (!trainingData) {
      alert("No data available for the report.");
      return;
    }

    const requestData = {
      chart_type: "pie",
      data: {
        labels: [
          "Training Workshops Conducted",
          "Training through E-Academy Online",
          "Master Trainers (Police Personnel)",
        ],
        values: [
          trainingData.training_workshops,
          trainingData.e_academy_online,
          trainingData.master_trainers,
        ],
        title: "Master Trainers Report",
        colors: ["#FF5733", "#33FF57", "#3357FF"]
      }
    };

    try {
      const response = await axiosInstance.post('/generate_report', requestData, {
        responseType: 'blob',
      });

      // Create a URL for the PDF blob and trigger download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'master_trainers_report.pdf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading report:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg w-full h-[500px] flex flex-col ">
      <div className="flex justify-between items-center mb-8">
        
      <h1 className="text-4xl font-bold mb-4">Master Trainers</h1>
      <button className="bg-green-600 text-white px-4 py-2 rounded-lg" onClick={downloadReport}>
          Download Report
        </button>
      </div>
      <div className="flex flex-col lg:flex-row w-full justify-center items-center">
        <div className="w-full lg:w-2/3 h-[400px] p-3 flex justify-center items-center">
          <Pie data={data} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
      </div>
      
    </div>
  );
};

export default MasterTrainers;
