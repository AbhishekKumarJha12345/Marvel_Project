import React, { forwardRef, useState } from "react";
import PoliceOfficers from "./PoliceOfficers";
import MasterTrainers from "./MasterTrainers";
import TrainingDataGraph from "./TrainingDataGraph";
import TrainingDataGraph2 from "./TrainingDataGraph2";
import Drilldown from "./Drilldown";

const PoliceTraining = forwardRef((props, ref) => {
  const [entryDate, setEntryDate] = useState('')

  const availableOfficers = 13247;
const trainedOfficers = 12234;
const policePersonnelavailable = 152363;
const policePersonneltrained = 137901;


  const getDate = (date) => {
    if (date) {
      const d = new Date(date);
      const formattedDate = `${String(d.getMonth() + 1).padStart(2, "0")}/${String(d.getDate()).padStart(2, "0")}/${String(d.getFullYear()).slice(-0)}`;
      setEntryDate(formattedDate);
    }
  };


  return (
    <div className=" rounded-lg w-full max-w-full h-auto" ref={ref}>
      <div className="">
{/* 
        <div style={{ backgroundColor: "#f4f4f4", display: "flex", justifyContent: "space-around", borderRadius: "5px" }}>
          <TrainingDataGraph /><br />
          <TrainingDataGraph2 />


        </div> */}
        {/* <h1 className="text-xl font-semibold mb-4 ms-3" style={{ marginTop: "1rem" }}>
          Recent Entry  : {entryDate.toLocaleString()}
        </h1>
        <div style={{ backgroundColor: "#f4f4f4", padding: "1rem", display: "flex", gap: "1rem", justifyContent: "space-around", borderRadius: "5px" }}>

          <PoliceOfficers getDate={getDate} />


          <br />
          <MasterTrainers />
        </div> */}

<div style={{ backgroundColor: "#ffff", display: "flex", justifyContent: "space-around", borderRadius: "5px",marginBottom:"5px" }}>

        <Drilldown/>
        </div>

        <div className="d-flex gap-3 mb-3">
           {/* Card 1 - Police Officers  */}
          <div className="card p-3 shadow flex-grow-1">
            <div className="card-body">
              <h5 className="card-title">Police Officers</h5>
              <div className="">
                <h6 className="text-primary">Available Police Officers</h6>
                <p>{availableOfficers} Officers</p>
              </div>
              <div>
                <h6 className="text-success">Trained Police Officers</h6>
                <p>{policePersonneltrained} Officers</p>
              </div>
            </div>
          </div>

           {/* Card 2 - Police Personnel  */}
          <div className="card p-3 shadow flex-grow-1">
            <div className="card-body">
              <h5 className="card-title">Police Personnel</h5>
              <div className="pl-2">
                <h6 className="text-primary">Available Police Officers</h6>
                <p className="">{policePersonnelavailable} Officers</p>
              </div>

              <div>
                <h6 className="text-success">Trained Police Officers</h6>
                <p>{trainedOfficers} Officers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default PoliceTraining;
