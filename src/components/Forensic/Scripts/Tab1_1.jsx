import React from "react";
import {
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ReferenceLine,
} from "recharts";


const gradeData = [
  {  grade: "Director", available: 9, provided: 13 },
  {  grade: "Dy Director", available: 15, provided: 20 },
  { grade: "Assistant Director", available: 40, provided: 42 },
  {  grade: "Assistant Chemical Analyzer", available: 80, provided: 125 },
  { grade: "Scientific Officers", available: 35, provided: 37 },
];


export default function Tab1_1() {
  return (
    <div className="p-0">
      <div className="mt-6">
        {/* Bar Chart for Available vs Training Provided */}
        <div className="bg-white p-4 rounded-xl ">
          <h2 className="text-xl font-semibold mb-4">Training Data by Grade</h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={gradeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="grade" />
              <YAxis />
              <Legend />
              <Tooltip
                formatter={(value, name, props) => {
                  const percentage = ((props.payload.provided / props.payload.available) * 100).toFixed(2);
                  return `${name}: ${value} (${percentage}%)`;
                }}
              />
              <Bar dataKey="available" fill="#8884d8" />
              <Bar dataKey="provided" fill="#82ca9d" />
              <ReferenceLine y={0} stroke="#000" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
