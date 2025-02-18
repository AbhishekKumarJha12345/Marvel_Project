import React, { useEffect, useState } from 'react';
import PoliceFirs from './PoliceFirs';
import FirstFirdata from './FirstFirdata'
import Firnewoffence from './Firnewoffences'
import axiosInstance from '../../../../utils/axiosInstance';


function FirNewcriminal() {
  const [activeTab, setActiveTab] = useState('home');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  const [trainingData,setTrainingData]=useState('')
const getTrainingData = async()=>{
  try{
    const response =await axiosInstance.get('/live_data?type=fir_1')
    console.log(response.data,'FIR1 Data ----------')
    setTrainingData(response.data.data_dict)

  }catch(error){
    console.log(error)
  }
}
useEffect(() => {
  getTrainingData();
}, []);
  return (
    <div>
      <div className="flex space-x-4 border-b border-gray-300">
        <button
          onClick={() => handleTabChange('home')}
          className={`py-2 px-4 text-lg font-medium ${activeTab === 'home' ? 'border-b-2 border-[#03045E] text-[#03045E]' : 'text-gray-500 hover:text-blue-500'}`}
        >
          Home
        </button>
        <button
          onClick={() => handleTabChange('newCriminals')}
          className={`py-2 px-4 text-lg font-medium ${activeTab === 'newCriminals' ? 'border-b-2 border-[#03045E] text-[#03045E]'  : 'text-gray-500 hover:text-blue-500'}`}
        >
          New Criminals
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-1">
        {activeTab === 'home' ? (
         <div class="col-6">
         <div class="card">
           <div class="card-body" style={{paddingBottom:"5rem"}}>
             <PoliceFirs apidata={trainingData}/>
           </div>
         </div>
       </div>
       
        ) : (
          <div>
            <h2 className="text-2xl font-bold">New Criminals</h2>
         <FirstFirdata/>

         <Firnewoffence/>
          </div>
        )}
      </div>
    </div>
  );
}

export default FirNewcriminal;
