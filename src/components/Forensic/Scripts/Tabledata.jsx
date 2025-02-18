import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Dummy data for the chart
const tableData = [
  { month: "Jul-24", cases1: 185232, exhibits1: 658694, cases2: 22211, exhibits2: 49066, cases3: 21122, exhibits3: 42617, cases4: 186321, exhibits4: 665205 },
  { month: "Aug-24", cases1: 186321, exhibits1: 665143, cases2: 19869, exhibits2: 43185, cases3: 22448, exhibits3: 45033, cases4: 183742, exhibits4: 663358 },
  { month: "Sep-24", cases1: 183742, exhibits1: 663302, cases2: 19241, exhibits2: 46706, cases3: 20942, exhibits3: 45116, cases4: 182041, exhibits4: 664908 },
  { month: "Oct-24", cases1: 182041, exhibits1: 664839, cases2: 25402, exhibits2: 55354, cases3: 32313, exhibits3: 59104, cases4: 175130, exhibits4: 661063 },
  { month: "Nov-24", cases1: 175130, exhibits1: 661001, cases2: 27252, exhibits2: 51987, cases3: 22881, exhibits3: 46859, cases4: 179501, exhibits4: 666183 },
  { month: "Dec-24", cases1: 179501, exhibits1: 666078, cases2: 25258, exhibits2: 53470, cases3: 22789, exhibits3: 48532, cases4: 181970, exhibits4: 670968 },
  { month: "Jan-25", cases1: 181970, exhibits1: 670968, cases2: 24599, exhibits2: 52446, cases3: 23175, exhibits3: 48571, cases4: 183394, exhibits4: 674863 }
];

export default function Tabledata() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="mt-6">
      <h1 className="text-2xl font-bold mb-6">Forensic Development Dashboard</h1>

      {/* Bar Chart for Monthly Cases & Exhibits Overview */}
      <div className="bg-white p-4 rounded-xl shadow-md mt-6">
        <h2 className="text-xl font-semibold mb-4">Monthly Cases & Exhibits Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={tableData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            {/* Bar for Cases 1 */}
            <Bar dataKey="cases1" fill="#8884d8" name="Cases 1" />
            {/* Bar for Exhibits 1 */}
            <Bar dataKey="exhibits1" fill="#82ca9d" name="Exhibits 1" />
            {/* Bar for Cases 2 */}
            <Bar dataKey="cases2" fill="#ffc658" name="Cases 2" />
            {/* Bar for Exhibits 2 */}
            <Bar dataKey="exhibits2" fill="#ff7300" name="Exhibits 2" />
            {/* Bar for Cases 3 */}
            <Bar dataKey="cases3" fill="#d85e00" name="Cases 3" />
            {/* Bar for Exhibits 3 */}
            <Bar dataKey="exhibits3" fill="#0066ff" name="Exhibits 3" />
            {/* Bar for Cases 4 */}
            <Bar dataKey="cases4" fill="#66cc00" name="Cases 4" />
            {/* Bar for Exhibits 4 */}
            <Bar dataKey="exhibits4" fill="#ff33cc" name="Exhibits 4" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
