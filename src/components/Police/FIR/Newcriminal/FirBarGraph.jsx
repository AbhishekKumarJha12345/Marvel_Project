import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import axiosInstance from "../../../../utils/axiosInstance";
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
const FirBarGraph = () => {
  const [data, setData] = useState([]);
  function convertMonthFormat(yyyy_mm) {
    if (!yyyy_mm || !yyyy_mm.includes("-")) return yyyy_mm; // Handle invalid input

    const [year, month] = yyyy_mm.split("-"); // Split by "-"
    return month+'-' + year; // Rearrange to MMYYYY format
}
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/live_data?type=line_fir_1');
  
        if (response.status === 200) {
          if (response.data.data_dict) {
            console.log('fir data',response.data.data_dict)
            // Process and filter data
            const formattedData = response.data.data_dict
              .filter(item => item.total_no_fir_registered_under_bns_ipc !== null) // Remove null values
              .map(item => ({
                month: convertMonthFormat(item.month),
                total_firs: parseFloat(item.total_no_fir_registered_under_bns_ipc) || 0,
                fir_under_bns: parseFloat(item.no_of_fir_registered_under_bns) || 0,
                chargesheets_filed: parseFloat(item.no_of_chargesheets_filed_under_bns) || 0,
                chargesheets_not_filed: parseFloat(item.no_of_chargesheets_not_filed_within_the_stipulated_time) || 0,
              }))
              .sort((a, b) => new Date(a.month) - new Date(b.month)); // Sort by month
  
            setData(formattedData);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
  

  return (
    <div style={{ width: "70%", height: "50vh", margin: "auto" }}>
      <h2 style={{ textAlign: "center" }}>FIR & Chargesheet Data (Monthly)</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total_firs" fill={chartColors[0]} name="Total FIRs" />
          <Bar dataKey="fir_under_bns" fill={chartColors[1]} name="FIRs under BNS" />
          <Bar dataKey="chargesheets_filed" fill={chartColors[2]} name="Chargesheets Filed" />
          <Bar dataKey="chargesheets_not_filed" fill={chartColors[3]} name="Chargesheets Not Filed on Time" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FirBarGraph;