import React, { useState } from 'react';
import PolicePunishment from '../Police/PolicePunishment ';
import PolicevisitsforensicTeams from '../Police/Policevisitsforensicteams';
import Policevisitsforensic from '../Police/Policevisitsforesic';


function Forensicvisits() {
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
          Forensic 
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {activeTab === 'home' ? (
          <div>
            <PolicePunishment />
          </div>
        ) : (
          <div className="flex space-x-4">  {/* flex container with space between items */}
    <div className="flex-1">
        {/* <h2 className="text-2xl font-bold">Forensic visits</h2> */}
        <PolicevisitsforensicTeams />
    </div>
    <div className="flex-1">
        <Policevisitsforensic />
    </div>
</div>

        )}
      </div>
    </div>
  );
}

export default Forensicvisits;
