import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { RxCross1 } from "react-icons/rx";


ChartJS.register(ArcElement, Tooltip, Legend);

const ComplianceSection = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  
  
  const [chartData, setChartData] = useState({
    labels: [
      'Correctional Institutions',
      'Prisoners awarded Death Sentence',
      'Prisoners Appeals/Confirmed Death Sentence',
      'Prisoners filed Mercy Petition (u/s 472 of BNSS)',
    ],
    datasets: [
      {
        data: [0, 0, 0, 0], 
        backgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#FFD700'],
        borderColor: ['#FF5733', '#33FF57', '#3357FF', '#FFD700'],
        borderWidth: 1,
      },
    ],
  });

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow the chart to resize freely

    plugins: {
      legend: {
        position: 'top',

      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const label = tooltipItem.label || '';
            const value = tooltipItem.raw || 0;
            return `${label}: ${value}`;
          },
        },
      },
    },
  };

  const fetchComplianceData = () => {
    fetch('http://localhost:5555/api/get_compliance_data')
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.error('Error fetching data:', data.error);
        } else {
          setChartData((prevState) => ({
            ...prevState,
            datasets: [
              {
                ...prevState.datasets[0],
                data: [
                  data.correctional_institutions,
                  data.death_sentence,
                  data.confirmed_death_sentence,
                  data.mercy_petition,
                ],
              },
            ],
          }));
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    fetchComplianceData(); // Initial data fetch on component mount
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('fillForm');
  const [formData, setFormData] = useState({
    correctionalInstitution: '',
    InmatePopulation: '',
    Admission: '',
    Inmates_percentage: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSend = {
      correctionalInstitution: formData.correctionalInstitution,
      InmatePopulation: formData.InmatePopulation,
      Admission: formData.Admission,
      Inmates_percentage: formData.Inmates_percentage,
    };
  
    fetch('http://localhost:5555/api/submit_compliance_data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formDataToSend),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log('Data submitted successfully');
          alert('Data submitted successfully');
          fetchComplianceData(); // Refresh chart data after submission
        } else {
          console.error('Error:', data.error);
          alert(`Error: ${data.error}`);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Form submission failed');
      });
    setIsModalOpen(false); // Close modal after submitting
  };
  
  const handleFileUpload = (file) => {
    if (!file) {
      alert('Please select a file before uploading');
      return;
    }
  
    const formData = new FormData();
    formData.append('file', file);
  
    fetch('http://localhost:5555/api/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log('File uploaded and data updated successfully');
          alert('File uploaded and data updated successfully');
          setIsModalOpen(false); // Close modal after upload
          fetchComplianceData(); // Refresh chart data
          setSelectedFile(null); // Reset file state after upload
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
  
  return (
    <div>
      {/* Add Button */}
      <div className="w-full flex justify-end">   
      {localStorage.getItem('role') !== 'chief secretary' && <button onClick={() => setIsModalOpen(true)} className="bg-gray-700 text-white py-2 px-4 rounded">
  Add
</button>}
      </div>

      {/* Pie Chart Section */}
      <div className="bg-white p-6 mx-auto rounded-lg w-[100%] h-[500px] flex flex-col items-center justify-center text-center relative">
        <h1 className="text-4xl font-bold ">Compliance of Section 472 of BNSS</h1>
        <div className="h-[500px] w-[500px] flex items-center justify-center">
          <Pie data={chartData} options={options} />
        </div>
      </div>

      {/* Modal */}
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
            <h2 className="text-2xl font-bold">Compliance of Section 472 of BNSS</h2>
          </div>
          <div className="p-6">
            <div className="mb-4 flex gap-4">
              <label className="flex items-center gap-2 font-bold">
                <input type="radio" name="option" value="fillForm" checked={selectedOption === 'fillForm'} onChange={() => setSelectedOption('fillForm')} /> Fill Form
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
                Upload
              </label>
            </div>

            {/* Conditionally Render Form or Upload Button */}
            {selectedOption === 'fillForm' ? (
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                <input
    type="text"
    name="correctionalInstitution"
    // value={formData.correctionalInstitution}
    onChange={handleChange}
    className="w-full p-3 border border-gray-300 rounded mb-3"
    placeholder="Enter the number of correctional institutions"
    required
  />

<input
  type="text"
  name="InmatePopulation"
  // value={formData.InmatePopulation}
  onChange={handleChange}
  className="w-full p-3 border border-gray-300 rounded mb-3"
  placeholder="Enter the number of prisoners awarded death sentence"
  required
/>

<input
  type="text"
  name="Admission"
  // value={formData.Admission}
  onChange={handleChange}
  className="w-full p-3 border border-gray-300 rounded mb-3"
  placeholder="Enter the number of prisoners whose appeals were dismissed"
  required
/>

<input
  type="text"
  name="Inmates_percentage"
  // value={formData.Inmates_percentage}
  onChange={handleChange}
  className="w-full p-3 border border-gray-300 rounded mb-3"
  placeholder="Enter the number of prisoners who filed a mercy petition"
  required
/>

                </div>



                {/* Buttons */}
                <div className="flex justify-end">
                  <button type="submit" className="bg-gray-700 text-white py-2 px-4 rounded">
Submit                  </button>
                
                </div>
              </form>
            ) : (
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

export default ComplianceSection;