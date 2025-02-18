import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axiosInstance from '../../utils/axiosInstance';

// Register chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PoliceOfficers = () => {
  const [trainingData, setTrainingData] = useState([]);

  // Fetch training data
  const getTrainingData = async () => {
    try {
      const response = await axiosInstance.get('/live_data');
      setTrainingData(response.data.latest_trainings);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getTrainingData();
  }, []);

  // Prepare data for the bar chart
  const data = {
    labels: trainingData.length > 1 ? [trainingData[0].rank, trainingData[1].rank] : [],
    datasets: [
      {
        label: 'Available Officers',
        data: trainingData.length > 1 ? [trainingData[0].available_officers, trainingData[0].trained_officers] : [],
        backgroundColor: '#4CAF50',
        borderColor: '#388E3C',
        borderWidth: 1,
        barThickness: 20,
      },
      {
        label: 'Total Trained Officers',
        data: trainingData.length > 1 ? [trainingData[1].available_officers, trainingData[1].trained_officers] : [],
        backgroundColor: '#2196F3',
        borderColor: '#1976D2',
        borderWidth: 1,
        barThickness: 20,
      },
    ],
  };

  // Function to download the PDF report
  const downloadReport = async () => {
    if (trainingData.length < 2) {
      alert("Not enough data to generate a report.");
      return;
    }

    const requestData = {
      chart_type: "bar",
      data: {
        labels: [trainingData[0].rank, trainingData[1].rank],
        values: [trainingData[0].available_officers, trainingData[1].trained_officers],
        title: "Police Officers Training Report",
        y_label: "Number of Officers",
        colors: ["#4CAF50", "#2196F3"]
      }
    };

    try {
      const response = await axiosInstance.post('/generate_report', requestData, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'police_report.pdf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading report:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg w-full h-[500px] text-center">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Police Officers</h1>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg" onClick={downloadReport}>
          Download Report
        </button>
      </div>
      <div className="h-[400px] w-full">
        <Bar data={data} options={{ responsive: true, maintainAspectRatio: false }} />
      </div>
    </div>
  );
};

export default PoliceOfficers;
