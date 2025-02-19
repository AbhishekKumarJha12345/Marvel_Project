import React, { useEffect, useState } from 'react';
import PoliceChargeSheet from './PoliceChargeSheet'
import Chargesheet from './Firstchargesheet';
import Chargesheetstatus from './Chargesheetstatus'
import axiosInstance from '../../../../utils/axiosInstance';
import CaseStatus from './CaseStatus';
import ChargeSheetGraph2 from './ChargeSheetGraph2';
import ModalComponent from '../../ModalComponent';

function Firchargesheets() {
  const [activeTab, setActiveTab] = useState('home');
      const [showModal, setShowModal] = useState(false);
  

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  const [trainingData,setTrainingData]=useState('')
  const [trainingData2,setTrainingData2]=useState('')
const getTrainingData = async()=>{
  try{
    const [response1, response2] = await Promise.all([
      axiosInstance.get('/live_data?type=fir_2'),
      axiosInstance.get('/live_data?type=section')
    ]);
  
    console.log(response1.data,'FIR2 Data ----------')
    console.log(response2.data,'FIR3 Data ----------')
    setTrainingData(response1.data.data_dict)
    setTrainingData2(response2.data.data_dict)

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
          Charge Sheets
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-4">
      
        {activeTab === 'home' ? (
          <div className="col-6">
          <div className="card shadow-sm bg-white">
            <div className="card-body" style={{paddingBottom:"5rem",display:"flex",flexDirection:"column",gap:"1rem"}}>
              {/* <PoliceChargeSheet apidata={trainingData}/> */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-center flex-grow">
                FIR Charge Sheets
                </h2>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                  style={{ backgroundColor: '#2d3748' }}
                  onClick={() => {
                    console.log("Open modal");
                    setShowModal(true);
                  }}
                >
                  Add On
                </button>
              </div>
              <CaseStatus />
              <br/>
              <hr/>
              <ChargeSheetGraph2 />
            </div>
          </div>
        </div>
        
        ) : (
          <div>
            <Chargesheet />

            <Chargesheetstatus apidata={trainingData2}/>
          </div>
        )}
      </div>
  <ModalComponent open={showModal} type='fir_2'  onClose={() => setShowModal(false)} />

    </div>
  );
}

export default Firchargesheets;
