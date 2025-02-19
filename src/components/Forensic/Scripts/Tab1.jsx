import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import Tabledata from "./Tabledata";
import Tab1_1 from "./Tab1_1";
import ModalComponent from "../../Police/ModalComponent";

export default function Tab1() {  
  const [showModal, setShowModal] = useState(false);
  

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg w-full max-w-full h-auto">

<div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Forensic Development Dashboard</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          style={{ backgroundColor: '#2d3748' }}
          onClick={() => {
            console.log("Open modal");
            setShowModal(true);
          }}
        >
          Add On
        </button>
      </div>
     
      <Tab1_1 />

      <Tabledata />
    <ModalComponent open={showModal} type='forensic' onClose={() => setShowModal(false)} />

    </div>
  );
}
