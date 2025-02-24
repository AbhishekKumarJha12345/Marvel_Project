import React, { useRef,forwardRef } from "react";
import TrainingDataGraph from "./TrainingDataGraph";
import TrainingDataGraph2 from "./TrainingDataGraph2";
import CaseStatus from "./FIR/Chargesheets/CaseStatus";
import Firnewoffence from "./FIR/Newcriminal/Firnewoffences";
import FirBarGraph from "./FIR/Newcriminal/FirBarGraph";
const PoliceExport = forwardRef((props, ref) => {
  console.log('ref',ref)
  // const policeExportRef = useRef(null);

  return (
    <div className="p-4" ref={ref} >
      {/* First Row: TrainingDataGraph & TrainingDataGraph2 */}
      <div className="flex gap-4 mb-4">
        <div className="w-1/2 bg-white p-4 shadow-md rounded-lg">
          <TrainingDataGraph />
        </div>
        <div className="w-1/2 bg-white p-4 shadow-md rounded-lg">
          <TrainingDataGraph2 />
        </div>
      </div>

      {/* Second Row: CaseStatus & Firnewoffence */}
      <div className="flex gap-4">
        <div className="w-1/2 bg-white p-4 shadow-md rounded-lg">
          <CaseStatus />
        </div>
        <div className="w-1/2 bg-white p-4 shadow-md rounded-lg">
          <FirBarGraph />
        </div>
      </div>
    </div>
  );
});

export default PoliceExport;
