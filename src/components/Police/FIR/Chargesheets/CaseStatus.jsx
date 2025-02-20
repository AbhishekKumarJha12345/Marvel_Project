import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import axiosInstance from "../../../../utils/axiosInstance";

const CaseStatus = () => {
  const [data, setData] = useState([]);
  const chartColors = [
    "#8884d8", // Muted Purple
    "#82ca9d", // Soft Green
    "#f2c57c", // Warm Sand
    "#6a8caf"  // Steel Blue
  ];

  function convertMonthFormat(yyyy_mm) {
    if (!yyyy_mm || !yyyy_mm.includes("-")) return yyyy_mm; // Handle invalid input
    const [year, month] = yyyy_mm.split("-"); // Split by "-"
    return month + '-' + year; // Rearrange to MM-YYYY format
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/live_data?type=line_fir_2");

        // Axios automatically parses the JSON
        if (response.data.data_dict) {
          // Process and filter data
          const formattedData = response.data.data_dict
            .map(item => ({
              month: convertMonthFormat(item.month),
              acquitted: parseFloat(item.acquitted) || 0,
              convicted: parseFloat(item.convicted) || 0,
              pending: parseFloat(item.pending) || 0,
              total_charge_sheeted: parseFloat(item.total_charge_sheeted) || 0,
            }))
            .sort((a, b) => new Date(a.month) - new Date(b.month)); // Sort by month

          setData(formattedData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ width: "80%", height: 400, margin: "auto" }}>
      <h2 style={{ textAlign: "center" }}>Case Status Data (Monthly)</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" label={{ value: "Month-Year", position: "insideBottomRight", offset: -5 }} />
          <YAxis label={{ value: "Count", angle: -90, position: "insideLeft" }} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="acquitted" stroke={chartColors[0]} name="Acquitted" />
          <Line type="monotone" dataKey="convicted" stroke={chartColors[1]} name="Convicted" />
          <Line type="monotone" dataKey="pending" stroke={chartColors[2]} name="Pending" />
          <Line type="monotone" dataKey="total_charge_sheeted" stroke={chartColors[3]} name="Total Charge Sheeted" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CaseStatus;