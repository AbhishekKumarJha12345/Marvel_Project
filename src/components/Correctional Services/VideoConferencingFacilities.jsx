import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { RxCross1 } from "react-icons/rx";

ChartJS.register(ArcElement, Tooltip, Legend);
const VideoConferencingFacilities = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('fillForm');
    const [selectedFile, setSelectedFile] = useState(null);

    const [formData, setFormData] = useState({
      correctionalInstitution: 0,
      courts_count: 0,
      vc_sets_count: 0,
      cubicles_count: 0,
    });
    useEffect(() => {
      fetchVideoConferenceData();
    }, []);
    
    const fetchVideoConferenceData = () => {
      fetch('https://sjci.marvel.pinacalabs.com/api/fetchVideoConferenceData')
        .then((response) => response.json())
        .then((data) => {
          if (data.success && data.data.length > 0) {
            const latestData = data.data[0];
            setFormData({
              correctionalInstitution: latestData.correctional_institutions || 0,
              courts_count: latestData.courts_count || 0,
              vc_sets_count: latestData.vc_sets_count || 0,
              cubicles_count: latestData.cubicles_count || 0,
            });
          }
        })
        .catch((error) => console.error('Error fetching data:', error));
    };
    
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Form Data Submitted:', formData);
      setIsModalOpen(false); // Close modal after submitting
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
        formData.append('file', file);
    
        fetch('https://sjci.marvel.pinacalabs.com/api/video_conference_upload', {
          method: 'POST',
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              alert('File uploaded and data updated successfully');
              setIsModalOpen(false)
              fetchVideoConferenceData(); // Refetch data
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
    

    const handleformsubmit = async (e) => {
      e.preventDefault();
    
      try {
        const response = await fetch('https://sjci.marvel.pinacalabs.com/api/storeVideoConferenceData', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
    
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            alert('Data uploaded successfully!');
            
            fetchVideoConferenceData(); // Refetch data after successful submission
            setIsModalOpen(false);
          } else {
            alert('Error uploading data!');
          }
        } else {
          alert('Error: Unable to upload data.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while uploading the data. Please try again.');
      }
    };
    
    const dataValues = formData && formData ? [
      formData.correctionalInstitution || 0,
      formData.courts_count || 0,
      formData.vc_sets_count || 0,
      parseFloat(formData.cubicles_count) || 0, // convert string to number if necessary
    ] : [0, 0, 0, 0];
    console.log('formdataisprinting:',formData)
    // Data for the Pie Chart
    const data = {
      labels: [
        'No. of Correctional Institutions',
        'No. of Courts',
        'No. of V.C. Sets available in Correctional Institutions',
        'No. of separate cubicles (Cabin) available in Correctional Institutions for V.C.',
      ],
      datasets: [
        {
          data: dataValues,
          backgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#FFD700'],
          borderColor: ['#FF5733', '#33FF57', '#3357FF', '#FFD700'],
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
  return (
    <div>
      {/* Add Button */}
      <div className="w-full flex justify-end">   
      {localStorage.getItem('role') !== 'chief secretary' && <button onClick={() => setIsModalOpen(true)} className="bg-gray-700 text-white py-2 px-4 rounded">
  Add
</button>}
      </div>
    <div className="bg-white p-6 mx-auto rounded-lg w-[100%] h-[500px]">
      <h1 className="text-4xl font-bold mb-8 text-center">Video Conferencing Facilities</h1>
      <div className="h-[400px] w-[400px] w-full flex justify-center items-center">
          <Pie data={data} />
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
 
            <h2 className="text-2xl font-bold mb-2">Video Conferencing Facilities</h2>
</div>
<div className='p-6'>
            {/* Radio Buttons */}
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
                Upload
              </label>
            </div>
            {selectedOption === 'fillForm' ? (
              <form onSubmit={handleformsubmit}> 
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder='Enter No. of Correctional Institutions'
                    name="correctionalInstitution"
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded"
                    required
                  />
                </div>

                <div className="mb-4">
                  <input
                    type="text"
                    placeholder='Enter No. of Courts'
                    name="courts_count"
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded"
                    required
                  />
                </div>

                <div className="mb-4">
                  
                  <input
                    type="text"
                    placeholder='Enter No. of V.C. Sets available in Correctional Institutions'
                    name="vc_sets_count"
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded"
                    required
                  />
                </div>

                <div className="mb-4">

                  <input
                    type="text"
                    placeholder='Enter No. of separate cubicles (Cabin) available in Correctional Institutions for  V.C.'
                    name="cubicles_count"
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded"
                    required
                  />
                </div>

                {/* Buttons */}
                <div className="flex justify-end">
                  <button type="submit" className="bg-gray-700 text-white py-2 px-4 rounded">
                    Submit
                  </button>
                  
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
                  className="bg-gray-700 text-white py-2 px-4 rounded"
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
export default VideoConferencingFacilities;