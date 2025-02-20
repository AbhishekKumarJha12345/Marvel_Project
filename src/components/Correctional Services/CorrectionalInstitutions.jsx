import { useState, useEffect } from 'react';
import { RxCross1 } from "react-icons/rx";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
// Register required chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
const CorrectionalInstitutions = () => {  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const host = import.meta.env.VITE_APP_API_URL;


  const [selectedOption, setSelectedOption] = useState('fillForm');
  const [formData, setFormData] = useState({
    correctional_institution: 0,      
    InmatePopulation: 0,
    Admission: 0,
    Inmates_percentage: 0,
  });
  console.log('formDataaaa:',formData)
  const fetchPersonnelData = () => {
    fetch(`${host}/fetchCorrectionalInstitutions`)
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched Data:', data);
        if (data.success && data.data.length > 0) {
          setFormData(data.data[0]); // Update with actual data
        } else {
          console.error('Error: Data is empty or not an array', data);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };
  useEffect(() => {
    fetchPersonnelData();
  }, []);
  useEffect(() => {
    console.log("Updated formData:", formData);
  }, [formData]);
  const data = {
    labels: ['Correctional Institutions', 'Inmate Population', 'Admission (NCL)', 'Inmates % (NCL)'],
    datasets: [
      {
        label: 'Correctional Data',
        data: [
          formData.correctional_institution || 0,
          formData.InmatePopulation || 0,
          formData.Admission || 0,
          formData.Inmates_percentage || 0
        ],
        backgroundColor: ['#FF5733', '#2196F3', '#FFEB3B', '#4CAF50'],
        borderColor: ['#D84315', '#1976D2', '#FBC02D', '#388E3C'],
        borderWidth: 1,
        barThickness: 50,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow full-width resizing
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          generateLabels: (chart) => {
            const dataset = chart.data.datasets[0];
            return chart.data.labels.map((label, index) => ({
              text: label, // Use correct label for each bar
              fillStyle: dataset.backgroundColor[index],
              strokeStyle: dataset.borderColor[index],
              lineWidth: 1,
            }));
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const dataset = tooltipItem.dataset;
            const index = tooltipItem.dataIndex;
            const label = tooltipItem.chart.data.labels[index]; // Get the correct label
            const value = tooltipItem.raw;
            return `${label}: ${value}`; // Show correct label + value in tooltip
          },
        },
      },
    },
    scales: {
      x: {
        grid: { offset: true },
      },
      y: {
        beginAtZero: true,
      },
    },
  };
  console.log('formdata:',formData)
  // Handle form field changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`${host}/saveCorrecntionaldata`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        alert('Data uploaded successfully!');
        fetchPersonnelData(); // Fetch updated data  
      } else {
        alert('Error: Unable to upload data.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while uploading the data. Please try again.');
    }
    setIsModalOpen(false);       
  };
  
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    
  };
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      console.log("File selected:", file);  // Log to check the selected file
      formData.append('file', file); 
      // Log FormData to ensure it's populated correctly
      console.log("FormData being sent:", formData);     
      fetch(`${host}/upload_correctional_instituion_data`, {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            console.log('File uploaded and data updated');
            alert('File uploaded and data updated successfully');
            // window.location.reload(); 
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
      }
  };

  return (
    <div>
      {/* Button to open the modal */}
      <div className="w-full flex justify-end">
        {localStorage.getItem('role') !== 'chief secretary' &&<button
          onClick={() => setIsModalOpen(true)}
          className="bg-gray-700 text-white py-2 px-4 rounded"
        >
          Add
        </button>}
      </div>

    <div className="bg-white p-6 mx-auto rounded-lg w-[90%] h-[500px]">


      <h1 className="text-4xl font-bold mb-8 text-center">Correctional Institutions</h1>  

      {/* Chart Section */}
      <div className="h-[400px] w-[400px] w-full flex justify-center items-center">
        <Bar data={data} options={options} />  
      </div>
      </div>


      {/* Modal for the form */}
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

            <h2 className="text-2xl font-bold">Add Correctional Institutions Data</h2>
            </div>
            <div className='p-6'>
              {/* Radio Buttons for Form or File Upload */}
            <div className="mb-4 flex gap-4 font-bold">
              <label className="flex items-center gap-2">
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

              <label className="flex items-center gap-2">
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
            {selectedOption === 'fillForm' && (
              <form onSubmit={handleSubmit}>
                {/* Class-1 Personnel */}
                <div className="mb-4">
                <input
                  type="text"
                  name="correctional_institution"
                  placeholder='Enter Correctional Institution'
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded"
                  required
                />
              </div>

              <div className="mb-4">
                <input
                  type="text"
                  name="InmatePopulation"
                  placeholder='Enter Inmate Population'
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded"
                  required
                />
              </div>

              <div className="mb-4">
                <input
                  type="text"
                  name="Admission"
                  onChange={handleChange}
                  placeholder='Enter Admission (NCL)'
                  className="w-full p-3 border border-gray-300 rounded"
                  required
                />
              </div>

              <div className="mb-4">
                <input
                  type="text"
                  name="Inmates_percentage"
                  placeholder='Enter Inmates %(NCL)'
                  onChange={handleChange}
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
              <div className="flex flex-col items-end">
                <input
                  type="file"
                  accept=".csv, .xlsx, .xls"
                  onChange={handleFileUpload}
                  className="mb-4 border border-gray-300 p-3 rounded w-full"
                />
                <button
                  type="button"
                  className="bg-gray-700 text-white py-2 px-4 rounded"
                  onClick={() => console.log('File upload initiated')}
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
export default CorrectionalInstitutions;