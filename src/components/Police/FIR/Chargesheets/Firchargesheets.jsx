import React, { useState } from 'react';
import PoliceChargeSheet from './PoliceChargeSheet'
import Chargesheet from './Firstchargesheet';
import Chargesheetstatus from './Chargesheetstatus'


function Firchargesheets() {
  const [activeTab, setActiveTab] = useState('home');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

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
            <div className="card-body">
              <PoliceChargeSheet />
            </div>
          </div>
        </div>
        
        ) : (
          <div>
            <Chargesheet />

            <Chargesheetstatus/>
          </div>
        )}
      </div>
    </div>
  );
}

export default Firchargesheets;
