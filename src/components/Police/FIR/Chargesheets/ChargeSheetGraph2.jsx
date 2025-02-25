import React, { useState, useEffect } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label
} from "recharts";
import axiosInstance from "../../../../utils/axiosInstance"; // Ensure this path is correct!

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
    <div style={{ width: "100%", height: 600, margin: "auto", backgroundColor: "white" }} className='p-3'>
      <h2 className="text-lg font-semibold text-start flex-grow mb-3">FIR Data by Section</h2>
      <ResponsiveContainer width="100%" height={500}>
        <BarChart 
          data={data} 
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="section ">
            <Label value="Section Numbers" offset={-3} position="insideBottom" style={{fontWeight: "bold" }}/>
          </XAxis>
          <YAxis>
            <Label value="Count" angle={-90} position="insideLeft" style={{ textAnchor: 'middle',fontWeight: "bold" }} offset={-8}/>
          </YAxis>
          <Tooltip />
          <Legend />
          <Bar dataKey="total_registered" fill={chartColors[0]} name="Total Registered" />
          <Bar dataKey="chargesheeted" fill={chartColors[1]} name="Chargesheeted" />
          <Bar dataKey="under_investigation" fill={chartColors[2]} name="Under Investigation" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChargeSheetGraph2;
