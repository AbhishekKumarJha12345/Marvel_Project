import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import Tabledata from "./Tabledata";
import Tab1_1 from "./Tab1_1";

const dataMoUs = [
  { name: "Signed", value: 40 },
  { name: "In Progress", value: 30 },
  { name: "Pending", value: 20 },
  { name: "Expired", value: 10 },
];

const dataMoUs2 = [
  { name: "Approved", value: 50 },
  { name: "Rejected", value: 25 },
  { name: "Under Review", value: 25 },
];

const COLORS_MOUS = ["#4CAF50", "#FFC107", "#FF9800", "#F44336"];
const COLORS_MOUS2 = ["#2196F3", "#3F51B5", "#673AB7"];

export default function Tab1() {
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg w-full max-w-full h-auto">

      <h1 className="text-2xl font-bold mb-6">Forensic Development Dashboard</h1>

      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold">Total Cases Received</h2>
          <p className="text-3xl font-bold">1,200</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold">Cases Processed</h2>
          <p className="text-3xl font-bold">950</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold">Pending Cases</h2>
          <p className="text-3xl font-bold">250</p>
        </div>
      </div> */}

     
      <Tab1_1 />

      <Tabledata />
    </div>
  );
}
