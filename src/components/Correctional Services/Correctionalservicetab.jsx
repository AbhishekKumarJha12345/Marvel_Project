import React, { useState } from 'react';
import Correctionaservicesgraphs from './Correctionaservicesgraphs';
import Trainingtocorrectional from './Trainingtocorrectional';
import Awareness from './AwarenessCampaign'


function Correctionalservicetab() {
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
          Correctional Srevices
        </button>
      </div>

      {/* Tab Content */}
      <div className="">
        {activeTab === 'home' ? (
          <div>
          <Correctionaservicesgraphs />
          </div>
        ) : (
          <div>
            <Trainingtocorrectional />
            <Awareness />
          </div>
        )}
      </div>
    </div>
  );
}

export default Correctionalservicetab;
