import React from 'react'
import ComplianceSection from './ComplianceSection'
import ComplianceSection479 from './ComplianceSection479'
import CorrectionalInstitutions from './CorrectionalInstitutions'
import CorrectionalServices from './CorrectionalServices'
import VideoConferencingFacilities from './VideoConferencingFacilities'

function Correctionaservicesgraphs() {
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg w-full max-w-full h-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ComplianceSection />
        <VideoConferencingFacilities/>
        <ComplianceSection479 />
        <CorrectionalInstitutions />
        <CorrectionalServices />
      </div>
    </div>
  )
}

export default Correctionaservicesgraphs;
