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
