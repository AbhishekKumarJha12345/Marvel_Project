import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { RxCross1 } from "react-icons/rx";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CorrectionalServices = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const host = import.meta.env.VITE_APP_API_URL;

  const [selectedOption, setSelectedOption] = useState('fillForm');
  const [selectedFile, setSelectedFile] = useState(null);
  
  const [formData, setFormData] = useState({
    class1_strength: '',
    class1_trained: '',
    class2_strength: '',
    class2_trained: '',
    class3_strength: '',
    class3_trained: '',
  });
  useEffect(() => {
    fetch(`${host}/get_personnel_trained`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setFormData(data.data); // Update formData with the data from the backend
        } else {
          console.error('Error fetching data:', data.error);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
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
    "#b0a8b9" // Dusty Lilac
    ];
  const data = {
    labels: ['Class-1', 'Class-2', 'Class-3'],
    datasets: [
      {
        label: 'Available Strength',
        data: [formData.class1_strength, formData.class2_strength, formData.class3_strength],
        backgroundColor: chartColors[0], 
        borderColor: chartColors[0],
        borderWidth: 1,
        barThickness: 50,
      },
      {
        label: 'No. of Personnel Trained in New Laws',
        data: [formData.class1_trained, formData.class2_trained, formData.class3_trained],
        backgroundColor: chartColors[1],
        borderColor: chartColors[1],
        borderWidth: 1,
        barThickness: 50,
      },
    ]
  };


  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow flexible width
    plugins: {
      legend: {
        display: true, // Display legend at the top
        position: 'bottom',
      },
      title: {
        display: true,
        // text: chartTitle, // Display the dynamic title based on the form data
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const dataset = tooltipItem.dataset;
            const value = tooltipItem.raw;
            return `${dataset.label}: ${value}`; // Return value for tooltip
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          offset: true, // Prevent overlap
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  
    // Send form data to the backend and update the data in the `personnel_trained` table
    fetch(`${host}/add_personnel_trained`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log('Data updated successfully');
          alert('Personnel data updated successfully');
          setIsModalOpen(false);
  
          // Ensure the formData state is updated with the updated data
          setFormData({
            class1_strength: data.data.class1_strength || 0,
            class1_trained: data.data.class1_trained || 0,
            class2_strength: data.data.class2_strength || 0,
            class2_trained: data.data.class2_trained || 0,
            class3_strength: data.data.class3_strength || 0,
            class3_trained: data.data.class3_trained || 0,
          });
        } else {
          console.error('Error:', data.error);
          alert(`Error: ${data.error}`);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  
  
  const handleFileUpload = (file) => {
    if (!file) {
      alert('Please select a file before uploading');
      return;
    }
  

      const formData = new FormData();
      console.log("File selected:", file);  // Log to check the selected file
      formData.append('file', file);
      
      // Log FormData to ensure it's populated correctly
      console.log("FormData being sent:", formData);
      
      fetch(`${host}/upload_personnel_data`, {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            console.log('File uploaded and data updated');
            alert('File uploaded and data updated successfully');
            setIsModalOpen(false);
  
            // Fetch updated data from the backend to refresh the chart
            fetchPersonnelData();
          } else {
            console.error('Error:', data.error);
            alert(`Error: ${data.error}`);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          alert('File upload failed');
        });
    
  };
  
  const fetchPersonnelData = () => {
    fetch(`${host}/get_personnel_trained`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setFormData(data.data); // Update formData with the data from the backend
        } else {
          console.error('Error fetching data:', data.error);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };
  
  return (
    <div className="bg-white mx-auto rounded-lg w-[90%] h-[500px]">
      {/* Button to open the modal */}
      <div className="w-full flex justify-end mb-4">
        {localStorage.getItem('role') !== 'chief secretary' && <button
          onClick={() => setIsModalOpen(true)}
          className="bg-gray-700 text-white py-2 px-4 rounded"
        >
          Add
        </button>}
      </div>

      <h1 className="text-4xl font-bold text-center">Personnel Trained in New Laws</h1>
      <div className="h-[400px] w-[400px] w-full flex justify-center items-center">
  <Bar data={data} options={options} />
</div>


      {/* Modal for form or upload */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
        <div className="bg-white rounded-lg w-[50%] relative">
         <button
                      className="absolute top-2 right-5 text-white text-xl mt-4"
                      onClick={() => setIsModalOpen(false)}
                    >
                      <RxCross1/>
                    </button>  
        <div className="bg-gray-700 text-white p-4 rounded-t-lg">

        <h2 className="text-2xl font-bold">Add Personnel Data</h2>
</div>
<div className='p-6'>
            {/* Radio Buttons for Form or File Upload */}
            <div className="mb-4 flex gap-4">
              <label className="flex items-center gap-2 font-bold">
                <input
                  className="cursor-pointer"
                  type="radio"
                  name="option"
                  value="fillForm"
                  checked={selectedOption === 'fillForm'}
                  onChange={() => setSelectedOption('fillForm')}
                />
                Fill Form
              </label>

              <label className="flex items-center gap-2 font-bold">
                <input
                  className="cursor-pointer"
                  type="radio"
                  name="option"
                  value="upload"
                  checked={selectedOption === 'upload'}
                  onChange={() => setSelectedOption('upload')}
                />
                Upload File
              </label>
            </div>

            {/* Form for filling data */}
            {selectedOption === 'fillForm' && (
              <form onSubmit={handleFormSubmit}>
                {/* Class-1 Personnel */}
                <div className="mb-4">
                  <input
                    type="number"
                    name="class1_strength"
                    placeholder="Enter Class-1 personnel trained"

                    // value={formData.class1_strength}
                    onChange={handleFormChange}
                    className="w-full p-3 border border-gray-300 rounded"
                    required
                  />
                </div>

                <div className="mb-4">
                  <input
                    type="number"
                    name="class1_trained"
                    placeholder='Enter Class-1 - Personnel Trained'
                    // value={formData.class1_trained}
                    onChange={handleFormChange}
                    className="w-full p-3 border border-gray-300 rounded"
                    required
                  />
                </div>

                {/* Class-2 Personnel */}
                <div className="mb-4">
                  <input
                    type="number"
                    name="class2_strength"
                    placeholder='Enter Class-2 - Available Strength'
                    // value={formData.class2_strength}
                    onChange={handleFormChange}
                    className="w-full p-3 border border-gray-300 rounded"
                    required
                  />
                </div>

                <div className="mb-4">
                  <input
                    type="number"
                    placeholder='Enter Class-2 - Personnel Trained'
                    name="class2_trained"
                    // value={formData.class2_trained}
                    onChange={handleFormChange}
                    className="w-full p-3 border border-gray-300 rounded"
                    required
                  />
                </div>

                {/* Class-3 Personnel */}
                <div className="mb-4">
                  <input
                    type="number"
                    name="class3_strength"
                    placeholder='Enter Class-3 - Available Strength'
                    // value={formData.class3_strength}
                    onChange={handleFormChange}
                    className="w-full p-3 border border-gray-300 rounded"
                    required
                  />
                </div>

                <div className="mb-4">
                  <input
                    type="number"
                    name="class3_trained"
                    placeholder='Enter Class-3 - Personnel Trained'
                    // value={formData.class3_trained}
                    onChange={handleFormChange}
                    className="w-full p-3 border border-gray-300 rounded"
                    required
                  />
                </div>

                <div className="flex justify-end">  
                  <button type="submit" className="bg-gray-700 text-white py-2 px-4 rounded">
                    Submit
                  </button>
                  
                </div>
              </form>
            )}

            {/* File upload section */}
            {selectedOption === 'upload' && (
              <div className="flex flex-col items-end mb-4 mt-4">
                <input
                  type="file"
                  accept=".csv, .xlsx, .xls"
                  onChange={handleFileChange}
                  className="mb-4 border border-gray-300 p-3 rounded w-full"
                />
                <button
                  type="button"
                  className="bg-gray-700 text-white py-2 px-4 rounded mt-3"
                  onClick={() => handleFileUpload(selectedFile)} 
                >
                  Upload File
                </button>
                
              </div>
            )}
          </div>
        </div>
        </div>
      )}
    </div>
  );
};

export default CorrectionalServices;