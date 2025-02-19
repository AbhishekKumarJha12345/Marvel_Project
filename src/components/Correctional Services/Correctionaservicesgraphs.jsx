import {React,forwardRef} from 'react'
import ComplianceSection from './ComplianceSection'
import ComplianceSection479 from './ComplianceSection479'
import CorrectionalInstitutions from './CorrectionalInstitutions'
import CorrectionalServices from './CorrectionalServices'
import VideoConferencingFacilities from './VideoConferencingFacilities'

const Correctionaservicesgraphs = forwardRef((props, ref) => {
  return (
    <div className="rounded-lg w-full max-w-full h-auto" ref={ref}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ComplianceSection />
        <VideoConferencingFacilities/>
        <ComplianceSection479 />
        <CorrectionalInstitutions />
        <CorrectionalServices />
      </div>
    </div>
  )
})

export default Correctionaservicesgraphs;
