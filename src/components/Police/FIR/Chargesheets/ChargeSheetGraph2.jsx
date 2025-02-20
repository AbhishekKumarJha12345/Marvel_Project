import React, { useState, useEffect } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label
} from "recharts";
import axiosInstance from "../../../../utils/axiosInstance"; // Make sure this path is correct!

const ChargeSheetGraph2 = () => {
  const [data, setData] = useState([]);
  const chartColors = [
    "#8884d8", // Muted Purple
    "#82ca9d", // Soft Green
    "#f2c57c"  // Warm Sand
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/live_data?type=line_fir_3");

        // Assuming data_dict is inside response.data
        if (response.data.data_dict) {
          const formattedData = response.data.data_dict.map(item => ({
            section: item.section,
            chargesheeted: parseFloat(item.chargesheeted) || 0,
            total_registered: parseFloat(item.total_registered) || 0,
            under_investigation: parseFloat(item.under_investigation) || 0,
          }));

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
      <h2 style={{ textAlign: "center" }}>FIR Data by Section</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart 
          data={data} 
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="section">
            <Label value="Section" offset={-5} position="insideBottom" />
          </XAxis>
          <YAxis>
            <Label value="Count" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />
          </YAxis>
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="total_registered" stroke={chartColors[0]} name="Total Registered" />
          <Line type="monotone" dataKey="chargesheeted" stroke={chartColors[1]} name="Chargesheeted" />
          <Line type="monotone" dataKey="under_investigation" stroke={chartColors[2]} name="Under Investigation" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChargeSheetGraph2;
