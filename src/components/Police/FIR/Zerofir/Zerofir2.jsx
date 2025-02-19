import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import axiosInstance from "../../../../utils/axiosInstance";

const ZeroFir2 = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/live_data?type=line_fir_4");
        
        // Axios automatically parses JSON, no need for response.json()
        if (response.data.data_dict) {
          // Parse and sort data by month
          const sortedData = response.data.data_dict
            .map(item => ({
              month: item.month,
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
    <div style={{ width: "80%", height: 400, margin: "auto" }}>
      <h2 style={{ textAlign: "center" }}>FIR Trends Over Time</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="regular_fir" stroke="#8774d8" strokeWidth={2} name="Regular FIR"/>
          <Line type="monotone" dataKey="yet_to_be_registered_zero_fir" stroke="#4984d8" strokeWidth={2} name="Yet to be Registered Zero FIR"/>
          <Line type="monotone" dataKey="zero_fir" stroke="#F884d8" strokeWidth={2} name="Zero FIR" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ZeroFir2;
