import React, { forwardRef } from "react";
import PoliceOfficers from "./PoliceOfficers";
import MasterTrainers from "./MasterTrainers";
import TrainingDataGraph from "./TrainingDataGraph";
import TrainingDataGraph2 from "./TrainingDataGraph2";

const PoliceTraining = forwardRef((props, ref) => {
  return (
    <div className="p-6 rounded-lg w-full max-w-full h-auto" ref={ref}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TrainingDataGraph />
        <TrainingDataGraph2 />
        <PoliceOfficers />
        <MasterTrainers />
      </div>
    </div>
  );
});

export default PoliceTraining;
