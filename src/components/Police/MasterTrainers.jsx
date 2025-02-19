import React, { useEffect, useState } from 'react';
import { Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import axiosInstance from '../../utils/axiosInstance';

// Register the necessary chart components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);

const MasterTrainers = () => {
  const [trainingData, setTrainingData] = useState('');
  const [lineChartData, setLineChartData] = useState({ labels: [], datasets: [] });

  const getTrainingData = async () => {
    try {
      const [response1, response2] = await Promise.all([
        axiosInstance.get('/live_data'),
        axiosInstance.get('/live_data?type=line')
      ]);

      console.log(response1.data, 'FIR2 Data ----------');
      console.log(response2.data, 'Line Data ----------');

      setTrainingData(response1.data.latest_workshop);

      // Transform the line chart data
      const transformedData = {
        dates: [],
        psi_sp_dcp_trained: [],
        pc_asi_trained: []
      };

      response2.data.data_dict.forEach(entry => {
        const date = new Date(entry.date).toLocaleDateString('en-GB', {
          day: '2-digit', month: 'short', year: 'numeric'
        });

        if (!transformedData.dates.includes(date)) {
          transformedData.dates.push(date);
        }

        if (entry.latest_training_psi_sp_dcp) {
          transformedData.psi_sp_dcp_trained.push(parseInt(entry.latest_training_psi_sp_dcp.trained_officers));
        }

        if (entry.latest_training_pc_asi) {
          transformedData.pc_asi_trained.push(parseInt(entry.latest_training_pc_asi.trained_officers));
        }
      });

      setLineChartData({
        labels: transformedData.dates,
        datasets: [
          {
            label: 'PSI/SP/DCP Trained Officers',
            data: transformedData.psi_sp_dcp_trained,
            fill: false,
            backgroundColor: '#007BFF',
            borderColor: '#007BFF',
          },
          {
            label: 'PC/ASI Trained Officers',
            data: transformedData.pc_asi_trained,
            fill: false,
            backgroundColor: '#FF5733',
            borderColor: '#FF5733',
          }
        ]
      });
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
      "Training Workshops Conducted",
      "Training through E-Academy Online",
      "Master Trainers (Police Personnel)",
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
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    }

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
        {/* Pie Chart */}
        <div className="w-full lg:w-1/2 h-[400px] p-3 d-flex justify-center items-center">
          <Pie data={pieData} options={options} />
        </div>
        {/* Line Chart */}
        <div className="w-full lg:w-1/2 h-[400px] p-3 d-flex justify-center items-center">
          <Line data={lineChartData} options={options} />
        </div>
      </div>
      
    </div>
  );
};

export default MasterTrainers;
