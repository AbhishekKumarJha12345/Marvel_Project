import React, { forwardRef, useState } from "react";
import PoliceOfficers from "./PoliceOfficers";
import MasterTrainers from "./MasterTrainers";
import TrainingDataGraph from "./TrainingDataGraph";
import TrainingDataGraph2 from "./TrainingDataGraph2";

const PoliceTraining = forwardRef((props, ref) => {
  const [entryDate,setEntryDate]=useState('')

  const getDate =(date)=>{
    setEntryDate(date)
  }
  return (
    <div className=" rounded-lg w-full max-w-full h-auto" ref={ref}>
      <div className="">

        <div style={{backgroundColor:"#f4f4f4",display:"flex",justifyContent:"space-around",borderRadius:"5px"}}>
          <TrainingDataGraph /><br/>
        <TrainingDataGraph2 />


        </div>
        <h1 className="text-xl font-semibold mb-4 ms-3" style={{marginTop:"1rem"}}>
  Recent Entry  : {entryDate.toLocaleString()}
  {/* {trainingData && trainingData[0] && new Date(trainingData[0].uploaded_date).toLocaleString()} */}
</h1>
        <div style={{backgroundColor:"#f4f4f4",padding:"1rem",display:"flex",gap:"1rem",justifyContent:"space-around",borderRadius:"5px"}}>

        <PoliceOfficers getDate={getDate}/>
          

        <br/>
        <MasterTrainers />
        </div>
      </div>
    </div>
  );
});

export default PoliceTraining;
