import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import axiosInstance from "../../../../utils/axiosInstance";

const CaseStatus = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/live_data?type=line_fir_2");
        
        // Axios automatically parses the JSON
        if (response.data.data_dict) {
          // Process and filter data
          const formattedData = response.data.data_dict
            .map(item => ({
              month: item.month,
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
    <div style={{ width: "80%", height: 500, margin: "auto" }}>
      <h2 style={{ textAlign: "center" }}>Case Status Data (Monthly)</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="acquitted" fill="#8884d8" name="Acquitted" />
          <Bar dataKey="convicted" fill="#82ca9d" name="Convicted" />
          <Bar dataKey="pending" fill="#ff7300" name="Pending" />
          <Bar dataKey="total_charge_sheeted" fill="#d9534f" name="Total Charge Sheeted" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CaseStatus;
