import React from 'react';
import ComplianceSection from './ComplianceSection';
import ComplianceSection479 from './ComplianceSection479';
import CorrectionalInstitutions from './CorrectionalInstitutions';
import CorrectionalServices from './CorrectionalServices';
import VideoConferencingFacilities from './VideoConferencingFacilities';

function Correctionaservicesgraphs() {
  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {[ComplianceSection, ComplianceSection479, CorrectionalInstitutions, CorrectionalServices, VideoConferencingFacilities].map((Component, index) => (
        <div key={index} className="bg-white shadow-lg rounded-2xl p-4 border border-gray-200">
          <Component />
        </div>
      ))}
    </div>
  );
}

export default Correctionaservicesgraphs;