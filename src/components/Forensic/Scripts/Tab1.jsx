import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import Tabledata from "./Tabledata";
import Tab1_1 from "./Tab1_1";


export default function Tab1() {  

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg w-full max-w-full h-auto">

      <h1 className="text-2xl font-bold mb-6">Forensic Development Dashboard</h1>
     
      <Tab1_1 />

      <Tabledata />
    </div>
  );
}
