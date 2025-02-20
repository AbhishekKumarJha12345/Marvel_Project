import { useState, useEffect } from 'react';   
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { RxCross1 } from "react-icons/rx";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ComplianceSection479 = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('fillForm');
  const [formData, setFormData] = useState({
    count_served_by_onethird_maxsentence: 0,
    application_count: 0,
    bond_count: 0,
    count_served_by_halfof_maxsentence: 0,
    other_application_count: 0,
    other_bond_count: 0,
  });

  const fetchPersonnelData = async () => {
    try {
      const response = await fetch('https://sjci.marvel.pinacalabs.com/api/fetchCaomplaincesection479');
      const data = await response.json();
      if (data.success && data.data.length > 0) {
        setFormData(data.data[0]); // Ensure we're setting an object, not an array
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchPersonnelData();
  }, []);

  useEffect(() => {
    console.log("Updated formData:", formData);
  }, [formData]);     

  
  const data = {
    labels: ['First Time UTPs', 'Other UTPs'],
    datasets: [
      {
        label: 'No. of UTPs who have served 1/3rd of the maximum sentence',
        data: [formData.count_served_by_onethird_maxsentence || 0, formData.count_served_by_halfof_maxsentence || 0], 
        backgroundColor: '#FF5733',
      },
      {
        label: 'No. of applications preferred in the Court by Jail Superintendent',
        data: [formData.application_count || 0, formData.other_application_count || 0], 
        backgroundColor: '#2196F3',
      },
      {
        label: 'No. of UTPs released on bond',
        data: [formData.bond_count || 0, formData.other_bond_count || 0], 
        backgroundColor: '#4CAF50',
      },
    ],
  };
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://sjci.marvel.pinacalabs.com/api/addComplainceSection479', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Data uploaded successfully!');
        fetchPersonnelData(); // Fetch updated data instead of refreshing
        setIsModalOpen(false);
      } else {
        alert('Error uploading data!');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while uploading the data.');
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('https://sjci.marvel.pinacalabs.com/api/upload_479', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();
        if (data.success) {
          alert('File uploaded successfully!');
          fetchPersonnelData(); // Fetch updated data instead of refreshing
          setIsModalOpen(false);
        } else {
          alert(`Error: ${data.error}`);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('File upload failed');
      }
    }
  };

  return (
    <div>
      <div className="w-full flex justify-end">
        {localStorage.getItem('role') !== 'chief secretary' && <button onClick={() => setIsModalOpen(true)} className="bg-gray-700 text-white py-2 px-4 rounded">
          Add
        </button>}
      </div>
      <div className="bg-white p-6 mx-auto rounded-lg w-[90%] h-[500px]">


      <h1 className="text-4xl font-bold text-center">Compliance of Section 479 of BNSS</h1>   
      <div className="h-[400px] w-[400px] w-full flex justify-center items-center">
        <Bar data={data} options={{ responsive: true }} />    
      </div>
</div>
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

            <h2 className="text-2xl font-bold">Compliance of Section 479 of BNSS</h2>    
</div>
<div className='p-6'>

            <div className="mb-4 flex gap-4">
              <label className="flex items-center gap-2 font-bold">
                <input type="radio" name="option" value="fillForm" checked={selectedOption === 'fillForm'} onChange={() => setSelectedOption('fillForm')} />
                Fill Form
              </label>
              <label className="flex items-center gap-2 font-bold">
                <input type="radio" name="option" value="upload" checked={selectedOption === 'upload'} onChange={() => setSelectedOption('upload')} />
                Upload File
              </label>
            </div>

            {selectedOption === 'fillForm' && (
  <form onSubmit={handleSubmit}>
    {Object.keys(formData).map((key) => {
      // Convert key to a readable placeholder with capitalized first letter
      const placeholder = `Enter ${key.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())}`;

      return (
        <div key={key} className="mb-4">
          <input
            type="number"
            name={key}
            onChange={handleChange}
            placeholder={placeholder} // Set placeholder dynamically
            className="w-full p-3 border border-gray-300 rounded"
            required
          />
        </div>
      );
    })}
     <div className="flex justify-end">

    <button type="submit" className="bg-gray-700 text-white py-2 px-4 rounded">Submit</button>
  </div>
  </form>
)}

  {/* File upload section */}
  {selectedOption === 'upload' && (
<input type="file" accept=".csv, .xlsx, .xls" onChange={handleFileUpload} className="mb-4 border border-gray-300 p-2 rounded w-full" />
)}

          </div>
        </div>
        </div>
      )}
    </div>
  );
};

export default ComplianceSection479;