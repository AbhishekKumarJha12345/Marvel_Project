

// import { useState, useEffect } from 'react';
// import { RxCross1 } from "react-icons/rx";

// import { Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// // Register required chart components
// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
// const CorrectionalInstitutions = () => {  
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedOption, setSelectedOption] = useState('fillForm');
//   const [formData, setFormData] = useState({
//     correctional_institution: 0,      
//     InmatePopulation: 0,
//     Admission: 0,
//     Inmates_percentage: 0,
//   });
  
//   console.log('formDataaaa:',formData)
//   const fetchPersonnelData = () => {
//     fetch(`${host}/api/fetchCorrectionalInstitutions')
//       .then((response) => response.json())
//       .then((data) => {
//         console.log('Fetched Data:', data);
//         if (data.success && data.data.length > 0) {
//           setFormData(data.data[0]); // Update with actual data
//         } else {
//           console.error('Error: Data is empty or not an array', data);
//         }
//       })
//       .catch((error) => {
//         console.error('Error fetching data:', error);
//       });
//   };

  

//   useEffect(() => {
//     fetchPersonnelData();
//   }, []);


//   useEffect(() => {
//     console.log("Updated formData:", formData);
//   }, [formData]);
    
 
  

//   const data = {
//     labels: ['Correctional Institutions', 'Inmate Population', 'Admission (NCL)', 'Inmates % (NCL)'],
//     datasets: [
//       {
//         label: 'Correctional Data',
//         data: [
//           formData.correctional_institution || 0,
//           formData.InmatePopulation || 0,
//           formData.Admission || 0,
//           formData.Inmates_percentage || 0
//         ],
//         backgroundColor: ['#FF5733', '#2196F3', '#FFEB3B', '#4CAF50'],
//         borderColor: ['#D84315', '#1976D2', '#FBC02D', '#388E3C'],
//         borderWidth: 1,
//         barThickness: 50,
//       },
//     ],
//   };
  
//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         display: true,
//         position: "top",
//         labels: {
//           generateLabels: (chart) => {
//             const dataset = chart.data.datasets[0];
//             return chart.data.labels.map((label, index) => ({
//               text: label, // Use correct label for each bar
//               fillStyle: dataset.backgroundColor[index],
//               strokeStyle: dataset.borderColor[index],
//               lineWidth: 1,
//             }));
//           },
//         },
//       },
//       tooltip: {
//         callbacks: {
//           label: function (tooltipItem) {
//             const dataset = tooltipItem.dataset;
//             const index = tooltipItem.dataIndex;
//             const label = tooltipItem.chart.data.labels[index]; // Get the correct label
//             const value = tooltipItem.raw;
//             return `${label}: ${value}`; // Show correct label + value in tooltip
//           },
//         },
//       },
//     },
//     scales: {
//       x: {
//         grid: { offset: true },
//       },
//       y: {
//         beginAtZero: true,
//       },
//     },
//   };
    
  
  
//   console.log('formdata:',formData)
//   // Handle form field changes
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };
  
//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     try {
//       const response = await fetch(`${host}/api/saveCorrecntionaldata', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });
  
//       if (response.ok) {
//         alert('Data uploaded successfully!');
//         fetchPersonnelData(); // Fetch updated data  
//       } else {
//         alert('Error: Unable to upload data.');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       alert('An error occurred while uploading the data. Please try again.');
//     }
//     setIsModalOpen(false);       
//   };
  
  
  

//   // const [isModalOpen, setIsModalOpen] = useState(false);

//   const openModal = () => {
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
    
//   };
  // const handleFileUpload = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const formData = new FormData();
  //     console.log("File selected:", file);  // Log to check the selected file
  //     formData.append('file', file);
      
  //     // Log FormData to ensure it's populated correctly
  //     console.log("FormData being sent:", formData);
      
  //     fetch(`${host}/api/upload_correctional_instituion_data', {
  //       method: 'POST',
  //       body: formData,
  //     })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         if (data.success) {
  //           console.log('File uploaded and data updated');
  //           alert('File uploaded and data updated successfully');
  //           // window.location.reload(); 
  //           setIsModalOpen(false);

  
  //           // Fetch updated data from the backend to refresh the chart
  //           fetchPersonnelData();  
  //         } else {
  //           console.error('Error:', data.error); 
  //           alert(`Error: ${data.error}`);
  //         }
  //       })
  //       .catch((error) => {
  //         console.error('Error:', error);
  //         alert('File upload failed');
  //       });
  //     }
  // };

//   return (
//     <div>
//       {/* Button to open the modal */}
//       <div className="w-full flex justify-end">
//         <button
//           onClick={() => setIsModalOpen(true)}
//           className="bg-gray-700 text-white py-2 px-4 rounded"
//         >
//           Add
//         </button>
//       </div>

//     <div className="bg-white p-6 mx-auto rounded-lg w-[90%] h-[500px]">


//       <h1 className="text-4xl font-bold mb-8 text-center">Correctional Institutions</h1>  

//       {/* Chart Section */}
//       <div className="h-[400px] w-[400px] w-full flex justify-center items-center">
//         <Bar data={data} options={options} />  
//       </div>
//       </div>


//       {/* Modal for the form */}
//       {isModalOpen && (
//          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
//                 <div className="bg-white rounded-lg w-[50%] relative">
//              <button
//                                           className="absolute top-2 right-5 text-white text-xl mt-4"
//                                           onClick={() => setIsModalOpen(false)}
//                                         >
//                                           <RxCross1/>
//                                         </button> 
//                                         <div className="bg-gray-700 text-white p-4 rounded-t-lg">

//             <h2 className="text-2xl font-bold">Add Correctional Institutions Data</h2>
//             </div>
//             <div className='p-6'>
//               {/* Radio Buttons for Form or File Upload */}
//             <div className="mb-4 flex gap-4 font-bold">
//               <label className="flex items-center gap-2">
//                 <input
//                   className="cursor-pointer"
//                   type="radio"
//                   name="option"
//                   value="fillForm"
//                   checked={selectedOption === 'fillForm'}
//                   onChange={() => setSelectedOption('fillForm')}
//                 />
//                 Fill Form
//               </label>

//               <label className="flex items-center gap-2">
//                 <input
//                   className="cursor-pointer"
//                   type="radio"
//                   name="option"
//                   value="upload"
//                   checked={selectedOption === 'upload'}
//                   onChange={() => setSelectedOption('upload')}
//                 />
//                 Upload File
//               </label>
//             </div>
//             {selectedOption === 'fillForm' && (
//               <form onSubmit={handleSubmit}>
//                 {/* Class-1 Personnel */}
//                 <div className="mb-4">
//                 <input
//                   type="text"
//                   name="correctional_institution"
//                   placeholder='Enter Correctional Institution'
//                   onChange={handleChange}
//                   className="w-full p-3 border border-gray-300 rounded"
//                   required
//                 />
//               </div>

//               <div className="mb-4">
//                 <input
//                   type="text"
//                   name="InmatePopulation"
//                   placeholder='Enter Inmate Population'
//                   onChange={handleChange}
//                   className="w-full p-3 border border-gray-300 rounded"
//                   required
//                 />
//               </div>

//               <div className="mb-4">
//                 <input
//                   type="text"
//                   name="Admission"
//                   onChange={handleChange}
//                   placeholder='Enter Admission (NCL)'
//                   className="w-full p-3 border border-gray-300 rounded"
//                   required
//                 />
//               </div>

//               <div className="mb-4">
//                 <input
//                   type="text"
//                   name="Inmates_percentage"
//                   placeholder='Enter Inmates %(NCL)'
//                   onChange={handleChange}
//                   className="w-full p-3 border border-gray-300 rounded"
//                   required
//                 />
//               </div>

//                 <div className="flex justify-end">
//                   <button type="submit" className="bg-gray-700 text-white py-2 px-4 rounded">
//                     Submit
//                   </button>
                
//                 </div>
//               </form>
//             )}

//             {/* File upload section */}
//             {selectedOption === 'upload' && (
//               <div className="flex flex-col items-end">
//                 <input
//                   type="file"
//                   accept=".csv, .xlsx, .xls"
//                   onChange={handleFileUpload}
//                   className="mb-4 border border-gray-300 p-3 rounded w-full"
//                 />
//                 <button
//                   type="button"
//                   className="bg-gray-700 text-white py-2 px-4 rounded"
//                   onClick={() => console.log('File upload initiated')}
//                 >
//                   Upload File
//                 </button>
               
//               </div>
//             )}
//           </div>
//         </div>
//         </div>
//       )}
//     </div>


       
//   );
// };









// export default CorrectionalInstitutions;


// chnges_20


// import { useState, useEffect } from 'react';
// import { RxCross1 } from "react-icons/rx";
// import { Line } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// // Register ChartJS components
// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// const CorrectionalInstitutions = () => {  
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedOption, setSelectedOption] = useState('fillForm');
//   const [formData, setFormData] = useState([]);
//   const [formInput, setFormInput] = useState({
//     correctional_institution: '', 
//     InmatePopulation: '',
//     Admission: '',  
//     Inmates_percentage: '',
//     record_month: '',
//     record_year:''
//   });
//   const [selectedFile, setSelectedFile] = useState(null);
//   const handleFileChange = (e) => {
//   setSelectedFile(e.target.files[0]);
//   };
//   // Fetch Data from API
//   const fetchPersonnelData = () => {
//     fetch(`${host}/api/fetchCorrectionalInstitutions')
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.success && Array.isArray(data.data)) {
//           setFormData(data.data);  // Store data correctly as an array
//         } else {
//           console.error('Error: Data is empty or not an array', data);
//         }
//       })
//       .catch((error) => console.error('Error fetching data:', error));
//   };

//   useEffect(() => {
//     fetchPersonnelData();
//   }, []);

//   // Handle Input Change
//   const handleChange = (e) => {
//     setFormInput({
//       ...formInput,
//       [e.target.name]: e.target.name === 'record_month' ? e.target.value : parseFloat(e.target.value) || e.target.value
//     });
//   };

//   // Handle Form Submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     try {
//       const response = await fetch(`${host}/api/saveCorrecntionaldata', {                                                                   
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formInput),
//       });

//       if (response.ok) {
//         alert('Data uploaded successfully!');
//         fetchPersonnelData(); // Refresh data
//         setFormInput({ correctional_institution: '', InmatePopulation: '', Admission: '', Inmates_percentage: '', record_month: '',record_year:'' });          
//         setIsModalOpen(false);
//       } else {
//         alert('Error: Unable to upload data.');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       alert('An error occurred while uploading the data.');
//     }
//   };                       

//   // Sort Data by Month
//   const monthOrder = [
//     'January', 'February', 'March', 'April', 'May', 'June',
//     'July', 'August', 'September', 'October', 'November', 'December'    
//   ];
  
//   const sortedData = [...formData].sort((a, b) => {
//     return monthOrder.indexOf(a.record_month) - monthOrder.indexOf(b.record_month);
//   });

//   // Prepare Chart Data
//   const labels = sortedData.map(item => item.record_month);
//   const correctionalinstitution=sortedData.map(item => item.correctional_institution);
//   const inmatePopulationData = sortedData.map(item => item.InmatePopulation || 0);
//   const admissionData = sortedData.map(item => item.Admission || 0);
//   const percentageData = sortedData.map(item => item.Inmates_percentage || 0);

//   const data = {
//     labels,
//     datasets: [
//       {
//         label: 'Correctional Institutions',
//         data: correctionalinstitution,
//         borderColor: '#2196F3',
//         backgroundColor: 'rgba(13, 13, 14, 0.2)',
//         pointBackgroundColor: '#2196F3',
//         fill: true,
//       },
//       {
//         label: 'Inmate Population',
//         data: inmatePopulationData,
//         borderColor: '#2196F3',
//         backgroundColor: 'rgba(33, 150, 243, 0.2)',
//         pointBackgroundColor: '#2196F3',
//         fill: true,
//       },
//       {
//         label: 'Admissions',
//         data: admissionData,
//         borderColor: '#FF5733',
//         backgroundColor: 'rgba(255, 87, 51, 0.2)',  
//         pointBackgroundColor: '#FF5733',
//         fill: true,
//       },
//       {
//         label: 'Inmates Percentage',
//         data: percentageData,
//         borderColor: '#4CAF50',
//         backgroundColor: 'rgba(76, 175, 80, 0.2)',
//         pointBackgroundColor: '#4CAF50',
//         fill: true,
//       },
//     ],
//   };

//   const options = {
    
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: { display: true, position: "top" },
//       tooltip: { callbacks: { label: (tooltipItem) => `${tooltipItem.dataset.label}: ${tooltipItem.raw}` } },
//     },
//     scales: {
//       x: {
//         type: 'category', // Ensures categorical display
//         labels: monthOrder, // Ensures all months appear
//         grid: { display: false },
//       },      y: { beginAtZero: true },
//     },
//   };
//   const handleFileUpload = (file) => {
//     if (!file) {
//       alert('Please select a file before uploading');
//       return;
//       }
//     // const file = e.target.files[0];
//     if (file) {
//       const formData = new FormData();
//       console.log("File selected:", file);  // Log to check the selected file
//       formData.append('file', file);
      
//       // Log FormData to ensure it's populated correctly
//       console.log("FormData being sent:", formData);
      
//       fetch(`${host}/api/upload_correctional_instituion_data', {        
//         method: 'POST',
//         body: formData,
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           if (data.success) {
//             console.log('File uploaded and data updated');
//             alert('File uploaded and data updated successfully');
//             // window.location.reload(); 
//             setIsModalOpen(false);

  
//             // Fetch updated data from the backend to refresh the chart
//             fetchPersonnelData();  
//           } else {
//             console.error('Error:', data.error); 
//             alert(`Error: ${data.error}`);
//           }
//         })
//         .catch((error) => {
//           console.error('Error:', error);
//           alert('File upload failed');
//         });
//       }
//   };


//   return (
//     <div>
//       {/* Add Button */}
//       <div className="w-full flex justify-end">
//         <button onClick={() => setIsModalOpen(true)} className="bg-gray-700 text-white py-2 px-4 rounded">Add</button>
//       </div>

//       {/* Chart Section */}
//       <div className="bg-white p-6 mx-auto rounded-lg w-[90%] h-[500px]">
//         <h1 className="text-4xl font-bold mb-8 text-center">Correctional Institutions</h1>  
//         <div className="h-[400px] w-full flex justify-center items-center">
//           <Line data={data} options={options} />  
//         </div>
//       </div>

//       {/* Modal */}
//       {/* Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white rounded-lg w-[50%] relative">
//             <button className="absolute top-2 right-5 text-white text-xl mt-4" onClick={() => setIsModalOpen(false)}><RxCross1/></button>
//             <div className="bg-gray-700 text-white p-4 rounded-t-lg">
//               <h2 className="text-2xl font-bold">Add Correctional Institutions Data</h2>
//             </div>
//             <div className='p-6'>
//             <div className="mb-4 flex gap-4">
//               <label className="flex items-center gap-2 font-bold">
//                 <input type="radio" name="option" value="fillForm" checked={selectedOption === 'fillForm'} onChange={() => setSelectedOption('fillForm')} /> Fill Form
//               </label>

//               <label className="flex items-center gap-2 font-bold">
//                 <input
//                   className="cursor-pointer"
//                   type="radio"
//                   name="option"
//                   value="upload"
//                   checked={selectedOption === 'upload'}
//                   onChange={() => setSelectedOption('upload')}   
//                 />
//                 Upload
//               </label>
//             </div>
//             {selectedOption === 'fillForm' ? (


//               <form onSubmit={handleSubmit}>
//                 <div className="mb-4"><input type="text" name="correctional_institution" placeholder='Enter Correctional Institution' onChange={handleChange} className="w-full p-3 border border-gray-300 rounded" required /></div>
//                 <div className="mb-4"><input type="text" name="InmatePopulation" placeholder='Enter Inmate Population' onChange={handleChange} className="w-full p-3 border border-gray-300 rounded" required /></div>
//                 <div className="mb-4"><input type="text" name="Admission" placeholder='Enter Admission' onChange={handleChange} className="w-full p-3 border border-gray-300 rounded" required /></div>
//                 <div className="mb-4"><input type="text" name="Inmates_percentage" placeholder='Enter Inmates %' onChange={handleChange} className="w-full p-3 border border-gray-300 rounded" required /></div>
//                 <div className="mb-4"><input type="text" name="record_month" placeholder='Enter Month' onChange={handleChange} className="w-full p-3 border border-gray-300 rounded" required /></div>
//                 <div className="flex justify-end"><button type="submit" className="bg-gray-700 text-white py-2 px-4 rounded">Submit</button></div>
//               </form>
//                           ) : (
//                             <div className="flex flex-col items-end mb-4 mt-4">
//                             <input
//                               type="file"
//                               accept=".csv, .xlsx, .xls"
//                               onChange={handleFileChange}
            
                              
//                               className="mb-4 border border-gray-300 p-3 rounded w-full"
//                             />
//                             <button
//                               type="button"
//                               className="bg-gray-700 text-white py-2 px-4 rounded mt-3"
//                               onClick={() => handleFileUpload(selectedFile)}
//                             >
//                               Upload File
//                             </button>
                           
//                           </div>
//                            )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CorrectionalInstitutions;



//changes_21



import { useState, useEffect } from 'react';    
import { RxCross1 } from "react-icons/rx";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CorrectionalInstitutions = () => {  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('fillForm');
  const [formData, setFormData] = useState([]);
  const host = import.meta.env.VITE_APP_API_URL;

  const [formInput, setFormInput] = useState({
    correctional_institution: '', 
    InmatePopulation: '',
    Admission: '',  
    Inmates_percentage: '',
    record_month: '',
    record_year: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Fetch Data from API
  const fetchPersonnelData = () => {
    fetch(`${host}/fetchCorrectionalInstitutions`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setFormData(data.data);  // Store data correctly as an array
        } else {
          console.error('Error: Data is empty or not an array', data);
        }
      })
      .catch((error) => console.error('Error fetching data:', error));
  };

  useEffect(() => {
    fetchPersonnelData();
  }, []);

  // Handle Input Change
  const handleChange = (e) => {
    setFormInput({
      ...formInput,
      [e.target.name]: e.target.name === 'record_month' ? e.target.value : parseFloat(e.target.value) || e.target.value
    });
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`${host}/saveCorrecntionaldata`, {                                                                   
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formInput),
      });

      if (response.ok) {
        alert('Data uploaded successfully!');
        fetchPersonnelData(); // Refresh data
        setFormInput({ correctional_institution: '', InmatePopulation: '', Admission: '', Inmates_percentage: '', record_month: '', record_year: '' });          
        setIsModalOpen(false);
      } else {
        alert('Error: Unable to upload data.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while uploading the data.');
    }
  };

  // Month Order Mapping
  const monthOrder = {
    'January': 1, 'February': 2, 'March': 3, 'April': 4, 'May': 5, 'June': 6,
    'July': 7, 'August': 8, 'September': 9, 'October': 10, 'November': 11, 'December': 12
  };

  // Corrected Sorting Logic: Prioritize `record_year`, then `record_month`
  const sortedData = [...formData].sort((a, b) => {
    return a.record_year - b.record_year || monthOrder[a.record_month] - monthOrder[b.record_month];
  });

const chartColors = ["#8884d8", "#82ca9d", "#f2c57c", "#6a8caf", "#d4a5a5", "#a28bd3", "#ff9a76", "#74b49b"];


  // Prepare Chart Data
  const processChartData = () => {
    return {
      labels: sortedData.map((d) => `${d.record_month} ${d.record_year}`),
      datasets: [
        {
          label: "Correctional Institutions",
          data: sortedData.map((d) => d.correctional_institution),
          borderColor: "#8884d8",
          backgroundColor: "#8884d8",
        },
        {
          label: "Inmate Population",
          data: sortedData.map((d) => d.InmatePopulation),
          borderColor: "#FFC250",
          backgroundColor: "#FFC250",
        },
        {
          label: "Admissions",
          data: sortedData.map((d) => d.Admission),
          borderColor: "#82ca9d",
          backgroundColor: "#82ca9d",
        },
        {
          label: "Inmates Percentage",
          data: sortedData.map((d) => d.Inmates_percentage),
          borderColor: "#ff9a76",
          backgroundColor: "#ff9a76",
        },
      ],
    };
  };


  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'NCL Inmate Details per Month/year', // X-axis title
          font: { size: 12 },
        },
      },
      y: {
        title: {
          display: true,
          text: 'NCL Inmate Details Count ', // Y-axis title
          font: { size: 12 },
        },
        beginAtZero: true,
      },
    },
  };


  const handleFileUpload = (file) => {
        if (!file) {
          alert('Please select a file before uploading');
          return;
          }
        // const file = e.target.files[0];
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
      {/* Add Button */}
      <div className="w-full flex justify-end">
      {localStorage.getItem('role') !== 'chief secretary' && (
        <button onClick={() => setIsModalOpen(true)} className="bg-gray-700 text-white py-2 px-4 rounded">Add</button>
      )}
      </div>

      {/* Chart Section */}
      <div className="bg-white p-6 mx-auto rounded-lg w-[90%] h-[500px]">
        <h1 className="text-4xl font-bold mb-8 text-center">Correctional Institutions</h1>  
        <div className="h-[400px] w-full flex justify-center items-center">
        <Line data={processChartData()} options={options} />
        </div>
      </div>

      {/* Modal */}
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg w-[50%] relative">
            <button className="absolute top-2 right-5 text-white text-xl mt-4" onClick={() => setIsModalOpen(false)}><RxCross1/></button>
            <div className="bg-gray-700 text-white p-4 rounded-t-lg">
              <h2 className="text-2xl font-bold">Add Correctional Institutions Data</h2>
            </div>
            <div className='p-6'>
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
            {selectedOption === 'fillForm' ? (


              <form onSubmit={handleSubmit}>
                <div className="mb-4"><input type="text" name="correctional_institution" placeholder='Enter Correctional Institution' onChange={handleChange} className="w-full p-3 border border-gray-300 rounded" required /></div>
                <div className="mb-4"><input type="text" name="InmatePopulation" placeholder='Enter Inmate Population' onChange={handleChange} className="w-full p-3 border border-gray-300 rounded" required /></div>
                <div className="mb-4"><input type="text" name="Admission" placeholder='Enter Admission' onChange={handleChange} className="w-full p-3 border border-gray-300 rounded" required /></div>
                <div className="mb-4"><input type="text" name="Inmates_percentage" placeholder='Enter Inmates %' onChange={handleChange} className="w-full p-3 border border-gray-300 rounded" required /></div>
                <div className="mb-4"><input type="text" name="record_month" placeholder='Enter Month' onChange={handleChange} className="w-full p-3 border border-gray-300 rounded" required /></div>
                <div className="mb-4"><input type="text" name="record_year" placeholder='Enter Year' onChange={handleChange} className="w-full p-3 border border-gray-300 rounded" required /></div>

                <div className="flex justify-end"><button type="submit" className="bg-gray-700 text-white py-2 px-4 rounded">Submit</button></div>
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

export default CorrectionalInstitutions;




