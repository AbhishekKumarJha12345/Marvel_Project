<<<<<<< Updated upstream
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register the necessary chart components
ChartJS.register(ArcElement, Tooltip, Legend);

const VideoConferencingFacilities = () => {
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
        data: [60, 2200, 437, 281], // Updated values
        backgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#FFD700'], // Different colors for each section
        borderColor: ['#FF5733', '#33FF57', '#3357FF', '#FFD700'], // Border colors to match
        borderWidth: 1,
      },
    ],
  };

  // Options for the Pie chart
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
            return `${label}: ${value}`; // Show label and value on hover
          },
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 mx-auto rounded-lg w-[60%] h-[500px]">
      <h1 className="text-4xl font-bold mb-8">Video Conferencing Facilities</h1>
      <div className="h-[250px]">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default VideoConferencingFacilities;
=======
// import React, { useState, useEffect } from 'react';
// import { Pie } from 'react-chartjs-2';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
// import { RxCross1 } from "react-icons/rx";
// import axiosInstance from "../../utils/axiosInstance";


// ChartJS.register(ArcElement, Tooltip, Legend);
// const VideoConferencingFacilities = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//     const [selectedOption, setSelectedOption] = useState('fillForm');
//     const [formData, setFormData] = useState({
//       correctionalInstitution: 0,
//       courts_count: 0,
//       vc_sets_count: 0,
//       cubicles_count: 0,
//     });
//     const [selectedFile, setSelectedFile] = useState(null);
//   const handleFileChange = (e) => {
//   setSelectedFile(e.target.files[0]);
//   };
//     useEffect(() => {
//       fetchVideoConferenceData();
//     }, []);

// const fetchVideoConferenceData = () => {
//   fetch('http://localhost:5555/api/fetchVideoConferenceData')
//     .then((response) => response.json())
//     .then((data) => {
//       if (data.success && data.data.length > 0) {
//         const latestData = data.data[0];
//         setFormData({
//           correctionalInstitution: latestData.correctional_institutions || 0,
//           courts_count: latestData.courts_count || 0,
//           vc_sets_count: latestData.vc_sets_count || 0,
//           cubicles_count: latestData.cubicles_count || 0,
//         });
//       }
//     })
//     .catch((error) => console.error('Error fetching data:', error));
// };

//     const handleChange = (e) => {
//       setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = (e) => {
//       e.preventDefault();
//       console.log('Form Data Submitted:', formData);
//       setIsModalOpen(false); // Close modal after submitting
//     };

//     const handleFileUpload = (e) => {
//       const file = e.target.files[0];
//       if (file) {
//         const formData = new FormData();
//         formData.append('file', file);

//         fetch('http://localhost:5555/api/video_conference_upload', {
//           method: 'POST',
//           body: formData,
//         })
//           .then((response) => response.json())
//           .then((data) => {
//             if (data.success) {
//               alert('File uploaded and data updated successfully');
//               fetchVideoConferenceData(); // Refetch data  
//             } else {
//               console.error('Error:', data.error);
//               alert(`Error: ${data.error}`);
//             }
//           })
//           .catch((error) => {
//             console.error('Error:', error);
//             alert('File upload failed');
//           });
//       }
//     };


    // const handleformsubmit = async (e) => {
    //   e.preventDefault();

    //   try {
    //     const response = await fetch('http://localhost:5555/api/storeVideoConferenceData', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify(formData),
    //     });

    //     if (response.ok) {
    //       const data = await response.json();
    //       if (data.success) {
    //         alert('Data uploaded successfully!');
    //         fetchVideoConferenceData(); // Refetch data after successful submission
    //       } else {
    //         alert('Error uploading data!');
    //       }
    //     } else {
    //       alert('Error: Unable to upload data.');
    //     }
    //   } catch (error) {
    //     console.error('Error:', error);
    //     alert('An error occurred while uploading the data. Please try again.');
    //   }
    // };

//     const dataValues = formData && formData ? [
//       formData.correctionalInstitution || 0,
//       formData.courts_count || 0,
//       formData.vc_sets_count || 0,
//       parseFloat(formData.cubicles_count) || 0, // convert string to number if necessary
//     ] : [0, 0, 0, 0];
//     console.log('formdataisprinting:',formData)
//     // Data for the Pie Chart
//     const data = {
      // labels: [
      //   'No. of Correctional Institutions',
      //   'No. of Courts',
      //   'No. of V.C. Sets available in Correctional Institutions',
      //   'No. of separate cubicles (Cabin) available in Correctional Institutions for V.C.',
      // ],
//       datasets: [
//         {
//           data: dataValues,
//           backgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#FFD700'],
//           borderColor: ['#FF5733', '#33FF57', '#3357FF', '#FFD700'],
//           borderWidth: 1,
//         },
//       ],
//     };

//     const options = {
//       responsive: true,
//       plugins: {
//         legend: {
//           position: 'top',
//         },
//         tooltip: {
//           callbacks: {
//             label: function (tooltipItem) {
//               const label = tooltipItem.label || '';
//               const value = tooltipItem.raw || 0;
//               return `${label}: ${value}`;
//             },
//           },
//         },
//       },
//     };
//   return (
//     <div>
//       {/* Add Button */}
//       <div className="w-full flex justify-end">   
//         <button onClick={() => setIsModalOpen(true)} className="bg-gray-700 text-white py-2 px-4 rounded">
//           Add
//         </button>
//       </div>
//     <div className="bg-white p-6 mx-auto rounded-lg w-[100%] h-[500px]">
//       <h1 className="text-4xl font-bold mb-8 text-center">Video Conferencing Facilities</h1>
//       <div className="h-[400px] w-[400px] w-full flex justify-center items-center">
//           <Pie data={data} />
//         </div>
//     </div>
//     {/* Modal */}
//     {isModalOpen && (
//          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
//                 <div className="bg-white rounded-lg w-[50%] relative">
//                  <button
//                               className="absolute top-2 right-5 text-white text-xl mt-4"
//                               onClick={() => setIsModalOpen(false)}
//                             >
//                               <RxCross1/>
//                             </button> 
//                             <div className="bg-gray-700 text-white p-4 rounded-t-lg">

//             <h2 className="text-2xl font-bold mb-2">Video Conferencing Facilities</h2>
// </div>
// <div className='p-6'>
//             {/* Radio Buttons */}
//             <div className="mb-4 flex gap-4">
//               <label className="flex items-center gap-2 font-bold">
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
//               <form onSubmit={handleformsubmit}> 
//                 <div className="mb-4">
//                   <input
//                     type="text"
//                     placeholder='Enter No. of Correctional Institutions'
//                     name="correctionalInstitution"
//                     onChange={handleChange}
//                     className="w-full p-3 border border-gray-300 rounded"
//                     required
//                   />
//                 </div>

//                 <div className="mb-4">
//                   <input
//                     type="text"
//                     placeholder='Enter No. of Courts'
//                     name="courts_count"
//                     onChange={handleChange}
//                     className="w-full p-3 border border-gray-300 rounded"
//                     required
//                   />
//                 </div>

//                 <div className="mb-4">

//                   <input
//                     type="text"
//                     placeholder='Enter No. of V.C. Sets available in Correctional Institutions'
//                     name="vc_sets_count"
//                     onChange={handleChange}
//                     className="w-full p-3 border border-gray-300 rounded"
//                     required
//                   />
//                 </div>

//                 <div className="mb-4">

//                   <input
//                     type="text"
//                     placeholder='Enter No. of separate cubicles (Cabin) available in Correctional Institutions for  V.C.'
//                     name="cubicles_count"
//                     onChange={handleChange}
//                     className="w-full p-3 border border-gray-300 rounded"
//                     required
//                   />
//                 </div>

//                 {/* Buttons */}
//                 <div className="flex justify-end">
//                   <button type="submit" className="bg-gray-700 text-white py-2 px-4 rounded">
//                     Submit
//                   </button>     

//                 </div>
//               </form>
//             ) : (
//               <div className="flex flex-col items-end mb-4 mt-4">
//                 <input
//                   type="file"
//                   accept=".csv, .xlsx, .xls"
//                   onChange={handleFileChange}
//                   className="mb-4 border border-gray-300 p-3 rounded w-full"
//                 />
//                 <button
//                   type="button"
//                   className="bg-gray-700 text-white py-2 px-4 rounded"
//                   onClick={() => handleFileUpload(selectedFile)}
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
// export default VideoConferencingFacilities;





// import React, { useState, useEffect } from 'react';
// import { Pie } from 'react-chartjs-2';
// // import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
// import { RxCross1 } from "react-icons/rx";
// import axiosInstance from "../../utils/axiosInstance";
// import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

// ChartJS.register(ArcElement, Tooltip, Legend);

// const VideoConferencingFacilities = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedOption, setSelectedOption] = useState('fillForm');
//   const [formData, setFormData] = useState({
//     correctionalInstitution: 0,
//     courts_count: 0,
//     vc_sets_count: 0,
//     cubicles_count: 0,
//   });
//   const [selectedFile, setSelectedFile] = useState(null);

//   useEffect(() => {
//     fetchVideoConferenceData();
//   }, []);

//   // Fetch Data using Axios
//   const fetchVideoConferenceData = () => {
//     fetch('http://localhost:5555/api/fetchVideoConferenceData')  
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.success && data.data.length > 0) {
//           const latestData = data.data[0];
//           setFormData({
//             correctionalInstitution: latestData.correctional_institutions || 0,
//             courts_count: latestData.courts_count || 0,
//             vc_sets_count: latestData.vc_sets_count || 0,
//             cubicles_count: latestData.cubicles_count || 0,
//           });
//         }
//       })
//       .catch((error) => console.error('Error fetching data:', error));
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

  
//   const handleformsubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch('http://localhost:5555/api/storeVideoConferenceData', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         if (data.success) {
//           alert('Data uploaded successfully!');
//           fetchVideoConferenceData(); // Refetch data after successful submission
//         } else {
//           alert('Error uploading data!');
//         }
//       } else {
//         alert('Error: Unable to upload data.');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       alert('An error occurred while uploading the data. Please try again.');                     
//     }
//   };

//   const handleFileChange = (e) => {                  
//     setSelectedFile(e.target.files[0]);                                                                                                                                                                                                                          
//   };
//   const handleFileUpload = (file) => {
//     if (!file) {
//       alert('Please select a file before uploading'); 
//       return;
//     }           


//     const formData = new FormData();
//     console.log("File selected:", file);                             
//     formData.append('file', file);

    
//     console.log("FormData being sent:", formData);                                                                                                                  

//     fetch('http://localhost:5555/api/video_conference_upload', {                        
//       method: 'POST',
//       body: formData,
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.success) {
//           console.log('File uploaded and data updated');
//           alert('File uploaded and data updated successfully');   
//           setIsModalOpen(false);

                                                  
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

//   };

//   const dataValues = formData ? [
//     formData.correctionalInstitution || 0,   
//     formData.courts_count || 0,
//     formData.vc_sets_count || 0,
//     parseFloat(formData.cubicles_count) || 0,
//   ] : [0, 0, 0, 0];

//   const data = [
//     { name: 'Correctional Institutions', value: formData.correctionalInstitution },                                                                                                           
//     { name: 'Courts', value: formData.courts_count },
//     { name: 'VC Sets', value: formData.vc_sets_count },
//     { name: 'Cubicles', value: formData.cubicles_count },
//     ];

//   return (
//     <div>
//       {/* Add Button */}
//       <div className="w-full flex justify-end">
//         <button onClick={() => setIsModalOpen(true)} className="bg-gray-700 text-white py-2 px-4 rounded">
//           Add
//         </button>
//       </div>
//       {/* <div className="bg-white p-6 mx-auto rounded-lg w-[100%] h-[500px]">
//         <h1 className="text-4xl font-bold mb-8 text-center">Video Conferencing Facilities</h1>
//         <div className="h-[400px] w-[400px] flex justify-center items-center">
//           <Pie data={data} />
//         </div>
//       </div> */}
//       <div className="h-[400px] w-full flex justify-center items-center">
//         <ResponsiveContainer width="100%" height={400}>
//           <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
//             <defs>
//               <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
//                 <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
//                 <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
//               </linearGradient>
//             </defs>
//             <XAxis dataKey="name" />
//             <YAxis />
//             <CartesianGrid strokeDasharray="3 3" />
//             <Tooltip />
//             <Area type="monotone" dataKey="value" stroke="#8884d8" fillOpacity={1} fill="url(#colorValue)" />
//           </AreaChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white rounded-lg w-[50%] relative">
//             <button className="absolute top-2 right-5 text-white text-xl mt-4" onClick={() => setIsModalOpen(false)}>
//               <RxCross1 />
//             </button>
//             <div className="bg-gray-700 text-white p-4 rounded-t-lg">
//               <h2 className="text-2xl font-bold mb-2">Video Conferencing Facilities</h2>
//             </div>
//             <div className='p-6'>
//               {/* Radio Buttons */}
//               <div className="mb-4 flex gap-4">
//                 <label className="flex items-center gap-2 font-bold">
//                   <input type="radio" name="option" value="fillForm" checked={selectedOption === 'fillForm'} onChange={() => setSelectedOption('fillForm')} className="cursor-pointer" />
//                   Fill Form
//                 </label>

//                 <label className="flex items-center gap-2 font-bold">
//                   <input type="radio" name="option" value="upload" checked={selectedOption === 'upload'} onChange={() => setSelectedOption('upload')} className="cursor-pointer" />
//                   Upload
//                 </label>
//               </div>

//               {selectedOption === 'fillForm' ? (
//                 <form onSubmit={handleformsubmit}>
//                   <div className="mb-4">
//                     <input type="text" placeholder='Enter No. of Correctional Institutions' name="correctionalInstitution" onChange={handleChange} className="w-full p-3 border border-gray-300 rounded" required />
//                   </div>
//                   <div className="mb-4">
//                     <input type="text" placeholder='Enter No. of Courts' name="courts_count" onChange={handleChange} className="w-full p-3 border border-gray-300 rounded" required />
//                   </div>
//                   <div className="mb-4">
//                     <input type="text" placeholder='Enter No. of V.C. Sets available in Correctional Institutions' name="vc_sets_count" onChange={handleChange} className="w-full p-3 border border-gray-300 rounded" required />
//                   </div>
//                   <div className="mb-4">
//                     <input type="text" placeholder='Enter No. of separate cubicles (Cabin) available in Correctional Institutions for V.C.' name="cubicles_count" onChange={handleChange} className="w-full p-3 border border-gray-300 rounded" required />
//                   </div>
//                   {/* Buttons */}
//                   <div className="flex justify-end">
//                     <button type="submit" className="bg-gray-700 text-white py-2 px-4 rounded">Submit</button>
//                   </div>
//                 </form>
//               ) : (
//                 <div className="flex flex-col items-end mb-4 mt-4">
//                   <input type="file" accept=".csv, .xlsx, .xls" onChange={handleFileChange} className="mb-4 border border-gray-300 p-3 rounded w-full" />
//                   <button type="button" className="bg-gray-700 text-white py-2 px-4 rounded" onClick={() => handleFileUpload(selectedFile)}>Upload File</button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default VideoConferencingFacilities;

//changes_21

import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Chart as ChartJS, Tooltip as ChartTooltip, Legend } from 'chart.js';
import { RxCross1 } from "react-icons/rx";

ChartJS.register(ChartTooltip, Legend);
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
      fetch('http://localhost:5555/api/fetchVideoConferenceData')
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
    
        fetch('http://localhost:5555/api/video_conference_upload', {
          method: 'POST',
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              alert('File uploaded and data updated successfully');
              fetchVideoConferenceData(); // Refetch data
              setIsModalOpen(false); // Close modal after upload

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
        const response = await fetch('http://localhost:5555/api/storeVideoConferenceData', {
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
            setIsModalOpen(false);
            fetchVideoConferenceData(); // Refetch data after successful submission
            
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
    const chartData = [
      
      { name: 'Correctional', value: formData.correctionalInstitution || 0 },
      { name: 'Courts', value: formData.courts_count || 0 },
      { name: 'VC Sets', value: formData.vc_sets_count || 0 },
      { name: 'Cubicles', value: formData.cubicles_count || 0 },
    ];
  
  
    // const options = {
    //   responsive: true,
    //   plugins: {
    //     legend: {
    //       position: 'top',
    //     },
    //     tooltip: {
    //       callbacks: {
    //         label: function (tooltipItem) {
    //           const label = tooltipItem.label || '';
    //           const value = tooltipItem.raw || 0;
    //           return ${label}: ${value};
    //         },
    //       },
    //     },
    //   },
    // };
  return (
    <div>
      {/* Add Button */}
      <div className="w-full flex justify-end">   
      <button onClick={() => setIsModalOpen(true)} className="bg-gray-700 text-white py-2 px-4 rounded">
  Add
</button>
      </div>
    <div className="bg-white p-6 mx-auto rounded-lg w-[100%] h-[500px]">
      <h1 className="text-4xl font-bold mb-8 text-center">Video Conferencing Facilities</h1>                                                                                                                       
      <div className="h-[400px] w-full flex justify-center items-center">
          {/* <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>                                                                                                                                                                                                 
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />   
              <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />                                                                                                                                                                
            </AreaChart>
          </ResponsiveContainer> */}  
          <ResponsiveContainer width="100%" height="100%">                                                
            <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>                                                                                                                                                                                                                                                                                                                                                                      
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />                
            </AreaChart>
          </ResponsiveContainer>                                                                                                                          
          
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
>>>>>>> Stashed changes
