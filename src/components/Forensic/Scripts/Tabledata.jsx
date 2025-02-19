import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import axiosInstance from "../../../utils/axiosInstance";


export default function Tabledata() {
  const [forensicDevelopmentData, setForensicDevelopmentData] = useState(null)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/live_data", {
          params: { type: "forensic_dev" },
        });
  
        // Process data to parse strings with commas into numbers
        const processedData = response.data.map((item) => ({
          ...item,
          disposal_cases: parseInt(item.disposal_cases.replace(/,/g, ""), 10),
          disposal_exhibits: parseInt(item.disposal_exhibits.replace(/,/g, ""), 10),
          earlier_pending: parseInt(item.earlier_pending.replace(/,/g, ""), 10),
          earlier_pending_exhibits: parseInt(item.earlier_pending_exhibits.replace(/,/g, ""), 10),
          pending_cases: parseInt(item.pending_cases.replace(/,/g, ""), 10),
          pending_exhibits: parseInt(item.pending_exhibits.replace(/,/g, ""), 10),
          received_cases: parseInt(item.received_cases.replace(/,/g, ""), 10),
          received_exhibits: parseInt(item.received_exhibits.replace(/,/g, ""), 10),
        }));
  
        setForensicDevelopmentData(processedData);
        console.log("Pendancy Data is:", processedData);
      } catch (error) {
        console.log("Errors occurred:", error);
      }
    };
  
    fetchData();
  }, []);
  const chartColors = [
    "#8884d8", // Muted Purple
    "#82ca9d", // Soft Green
    "#f2c57c", // Warm Sand
    "#6a8caf", // Steel Blue
    "#d4a5a5", // Soft Rose
    "#a28bd3", // Lavender
    "#ff9a76", // Muted Coral
    "#74b49b", // Muted Teal
    "#c08497", // Mauve
    "#b0a8b9" // Dusty Lilac
  ];

  return (
    <div className="mt-6">
      {/* <h1 className="text-2xl font-bold mb-6">Forensic Development Dashboard</h1> */}

      {/* Bar Chart for Monthly Cases & Exhibits Overview */}
      <div className="bg-white p-4 rounded-xl shadow-md mt-6">
        <h2 className="text-xl font-semibold mb-4">Monthly Cases & Exhibits Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={forensicDevelopmentData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            {/* Bar for Cases 1 */}
            <Bar dataKey="disposal_cases" fill={chartColors[0]} name="Disposal Cases" />
            {/* Bar for Exhibits 1 */}
            <Bar dataKey="disposal_exhibits" fill={chartColors[1]} name="Disposal Exhibits" />
            {/* Bar for Cases 2 */}
            <Bar dataKey="earlier_pending" fill={chartColors[2]} name="Earlier Pending Cases" />
            {/* Bar for Exhibits 2 */}
            <Bar dataKey="earlier_pending_exhibits" fill={chartColors[3]} name="Earlier Pending Exhibits" />
            {/* Bar for Cases 3 */}
            <Bar dataKey="pending_cases" fill={chartColors[4]} name="Pending Cases" />
            {/* Bar for Exhibits 3 */}
            <Bar dataKey="pending_exhibits" fill={chartColors[5]} name="Pending Exhibits" />
            {/* Bar for Cases 4 */}
            <Bar dataKey="received_cases" fill={chartColors[6]} name="Received Cases" />
            {/* Bar for Exhibits 4 */}
            <Bar dataKey="received_exhibits" fill={chartColors[7]} name="Received Exhibits" />

          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
