<<<<<<< Updated upstream
import React from 'react'
import ComplianceSection from './ComplianceSection'
import ComplianceSection479 from './ComplianceSection479'
import CorrectionalInstitutions from './CorrectionalInstitutions'
import CorrectionalServices from './CorrectionalServices'
import VideoConferencingFacilities from './VideoConferencingFacilities'

function Correctionaservicesgraphs() {
  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        <ComplianceSection />
        <ComplianceSection479 />
        <CorrectionalInstitutions />
        <CorrectionalServices />
        <VideoConferencingFacilities/>
      </div>
    </div>
  )
}

export default Correctionaservicesgraphs;
=======
import React from 'react';
import ComplianceSection from './ComplianceSection';
import ComplianceSection479 from './ComplianceSection479';
import CorrectionalInstitutions from './CorrectionalInstitutions';
import CorrectionalServices from './CorrectionalServices';
import VideoConferencingFacilities from './VideoConferencingFacilities';

function Correctionaservicesgraphs() {
return (
<div className="grid grid-cols-12 gap-4 p-4">
<div className="col-span-6 bg-white shadow-lg rounded-2xl p-4 border border-gray-200">
<ComplianceSection />
</div>
<div className="col-span-6 bg-white shadow-lg rounded-2xl p-4 border border-gray-200">
<ComplianceSection479 />
</div>
<div className="col-span-12 bg-white shadow-lg rounded-2xl p-4 border border-gray-200">
<CorrectionalInstitutions />
</div>
<div className="col-span-6 bg-white shadow-lg rounded-2xl p-4 border border-gray-200 ">
<CorrectionalServices />
</div>
<div className="col-span-6 bg-white shadow-lg rounded-2xl p-4 border border-gray-200">
<VideoConferencingFacilities />
</div>
</div>
);
}

export default Correctionaservicesgraphs;
>>>>>>> Stashed changes
