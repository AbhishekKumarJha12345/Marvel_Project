import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axiosInstance from '../../utils/axiosInstance';
import ModalComponent from './ModalComponent';
// Register required chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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
        backgroundColor: '#4CAF50', 
        borderColor: '#388E3C',
        borderWidth: 1,
        barThickness: 20,
      },
      {
        label: 'Total Trained Officers',
        data: [
          trainingData && trainingData[1] ? trainingData[1].available_officers || 0 : 0, 
          trainingData && trainingData[1] ? trainingData[1].trained_officers || 0 : 0
        ],
        backgroundColor: '#2196F3', 
        borderColor: '#1976D2',
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

  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
     <div className="bg-white p-6 rounded-lg w-full h-[500px] text-center">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-semibold mb-4">Police Officers</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          style={{backgroundColor:'#2d3748'}}
          onClick={() => {
            console.log("Open modal");
            setShowModal(true);
          }}
        >
          Add On
        </button>
      </div>
      <div className="h-[400px] w-full">
        <Bar data={data} options={options} />
      </div>
    </div>
    <ModalComponent open={showModal} type='police' onClose={() => setShowModal(false)} />
  </div>

  );
};

export default PoliceOfficers;
