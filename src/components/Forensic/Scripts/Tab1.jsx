import React, { useState, forwardRef } from "react";
import Tabledata from "./Tabledata";
import Tab1_1 from "./Tab1_1";
import ModalComponent from "../../Police/ModalComponent";

const Tab1 = forwardRef((props, ref) => {  
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="rounded-lg w-full max-w-full h-auto" ref={ref}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Forensic Development Dashboard</h1>
        {localStorage.getItem('role') !=='chief secretary' && <button
          className="bg-[#2d3748] text-white px-4 py-2 rounded-lg"
          onClick={() => setShowModal(true)}
        >
          Add On
        </button>}
      </div>
     
      <Tab1_1 />
      <Tabledata />

      <ModalComponent open={showModal} type="forensic" onClose={() => setShowModal(false)} />
    </div>
  );
});

export default Tab1;
