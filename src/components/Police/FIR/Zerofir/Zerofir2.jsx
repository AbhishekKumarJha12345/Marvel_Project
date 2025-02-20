import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import axiosInstance from "../../../../utils/axiosInstance";

const ZeroFir2 = () => {
  const [data, setData] = useState([]);
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
  function convertMonthFormat(yyyy_mm) {
    if (!yyyy_mm || !yyyy_mm.includes("-")) return yyyy_mm; // Handle invalid input

    const [year, month] = yyyy_mm.split("-"); // Split by "-"
    return month+'-' + year; // Rearrange to MMYYYY format
}
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/live_data?type=line_fir_4");
        
        // Axios automatically parses JSON, no need for response.json()
        if (response.data.data_dict) {
          // Parse and sort data by month
          const sortedData = response.data.data_dict
            .map(item => ({
              month: convertMonthFormat(item.month),
              regular_fir: parseInt(item.regular_fir, 10) || 0,
              yet_to_be_registered_zero_fir: parseInt(item.yet_to_be_registered_zero_fir, 10) || 0,
              zero_fir: parseInt(item.zero_fir, 10) || 0,
            }))
            .sort((a, b) => new Date(a.month) - new Date(b.month)); // Sort by month

          setData(sortedData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ width: "80%", height: 350, margin: "auto" }}>
      <h2 style={{ textAlign: "center" }}>FIR Trends Over Time</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="regular_fir" stroke={chartColors[0]} strokeWidth={2} name="Regular FIR"/>
          <Line type="monotone" dataKey="yet_to_be_registered_zero_fir" stroke={chartColors[1]} strokeWidth={2} name="Yet to Regularly Zero FIR"/>
          <Line type="monotone" dataKey="zero_fir" stroke={chartColors[2]} strokeWidth={2} name="Zero FIR" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ZeroFir2;
