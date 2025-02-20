import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axiosInstance from '../../utils/axiosInstance';
import ModalComponent from './ModalComponent';

// Register chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
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
const PoliceOfficers = () => {
  const [showModal, setShowModal] = useState(false);
  const [trainingData,setTrainingData]=useState('')
const getTrainingData = async()=>{
  try{
    const response =await axiosInstance.get('/live_data')
    console.log(response.data,'Trainig data response ----------')
    setTrainingData(response.data.latest_trainings)

  }catch(error){
    console.log(error)
  }
}
useEffect(() => {
  getTrainingData();
}, []);
  console.log(trainingData,'training props data------')
  // Data for the bar graph
  const data = {
    labels: [
      trainingData && trainingData[0] && trainingData[0].rank ? trainingData[0].rank : "", 
      trainingData && trainingData[1] && trainingData[1].rank ? trainingData[1].rank : ""
    ],
    
    // labels: [trainingData?trainingData[0].rank :"", trainingData ?trainingData[1].rank:""], // Labels for the two roles
    datasets: [
      {
        label: 'Available Officers',
        data: [
          trainingData && trainingData[0] ? trainingData[0].available_officers || 0 : 0, 
          trainingData && trainingData[0] ? trainingData[0].trained_officers || 0 : 0
        ], 
        backgroundColor: chartColors[0], 
        borderColor: chartColors[0],
        borderWidth: 1,
        barThickness: 20,
      },
      {
        label: 'Total Trained Officers',
        data: [
          trainingData && trainingData[1] ? trainingData[1].available_officers || 0 : 0, 
          trainingData && trainingData[1] ? trainingData[1].trained_officers || 0 : 0
        ],
        backgroundColor: chartColors[1], 
        borderColor: chartColors[1],
        borderWidth: 1,
        barThickness: 20,
      },
      
    ],
  };

  // Custom tooltip content (percentage display for each group)
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Ensures full width usage
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Officers Data Comparison',
      },
      tooltip: {
        callbacks: {
          // Custom tooltip label (percentage for each group)
          label: function (tooltipItem) {
            const label = tooltipItem.dataset.label || '';
            const dataIndex = tooltipItem.dataIndex;
            let percentage = '';

            // Predefined percentages for the whole groups
            if (dataIndex === 0) { // Police Officers(PSI to SP/DCP) group
              percentage = '92.35%'; // Percentage for Police Officers group
            } else if (dataIndex === 1) { // Police Personnel(PC to ASI) group
              percentage = '90.50%'; // Percentage for Police Personnel group
            }

            // Return custom label with percentage for the group
            return `${label}: ${percentage}`;
          },
        },
      },
    },
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
      <div className="flex justify-around items-center mb-8">
        <h1 className="text-4xl font-bold">Police Officers</h1>
        {/* <button className="bg-green-600 text-white px-4 py-2 rounded-lg" onClick={downloadReport}>
          Download Report
        </button> */}
        {/* <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          style={{backgroundColor:'#2d3748'}}
          onClick={() => {
            console.log("Open modal");
            setShowModal(true);
          }}
        >
          Add On
        </button> */}
      </div>
      <div className="h-[400px] w-full">
        <Bar data={data} options={{ responsive: true, maintainAspectRatio: false }} />
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
