import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import axiosInstance from "../../../../utils/axiosInstance"; // Make sure this path is correct!

const ChargeSheetGraph2 = () => {
  const [data, setData] = useState([]);

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
    <div style={{ width: "80%", height: 500, margin: "auto" }}>
      <h2 style={{ textAlign: "center" }}>FIR Data by Section</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
          data={data} 
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="section" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total_registered" fill="#8884d8" name="Total Registered" />
          <Bar dataKey="chargesheeted" fill="#82ca9d" name="Chargesheeted" />
          <Bar dataKey="under_investigation" fill="#ff7300" name="Under Investigation" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChargeSheetGraph2;
