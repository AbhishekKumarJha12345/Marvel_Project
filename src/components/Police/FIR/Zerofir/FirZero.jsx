import React, { useEffect, useState } from 'react';
import ZeroFir from './ZeroFir';
import Zerofiroutside from './ZeroFIRoutside';
import ZeroFirinside from './ZeroFIRinNcl';
import Receivedfromotherstates from './ReceivedfromOtherstates'
import Transferredtootherstates from './Transferedotherstates'
import axiosInstance from '../../../../utils/axiosInstance';

function FirZero() {
  const [activeTab, setActiveTab] = useState('home');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  const [trainingData,setTrainingData]=useState('')
  const getTrainingData = async()=>{
    try{
      const response =await axiosInstance.get('/live_data?type=fir_3')
      console.log(response.data,'FIR3 Data ----------')
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
          className={`py-2 px-4 text-lg font-medium ${activeTab === 'newCriminals' ? 'border-b-2 border-[#03045E] text-[#03045E]' : 'text-gray-500 hover:text-blue-500'}`}
        >
          Zero FIR
        </button>

        <button
          onClick={() => handleTabChange('transferred/receivedzerofir')}
          className={`py-2 px-4 text-lg font-medium ${activeTab === 'transferred/receivedzerofir' ? 'border-b-2 border-[#03045E] text-[#03045E]' : 'text-gray-500 hover:text-blue-500'}`}
        >
          Transferred/Received Zero FIR
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {activeTab === 'home' && <div className="col-6">
  <div className="card shadow-sm bg-white">
    <div className="card-body">
      <ZeroFir />
    </div>
  </div>
</div>
}
        {activeTab === 'newCriminals' && (
          <div>
            <h2 className="text-2xl font-bold">Zero FIR</h2>
            <Zerofiroutside />
            <ZeroFirinside />
          </div>
        )}
        {activeTab === 'transferred/receivedzerofir' && (
          <div>
            <h2 className="text-2xl font-bold">Transferred/Received Zero FIR</h2>
           <Transferredtootherstates/>
            <Receivedfromotherstates />
          </div>
        )}
      </div>
    </div>
  );
}

export default FirZero;
