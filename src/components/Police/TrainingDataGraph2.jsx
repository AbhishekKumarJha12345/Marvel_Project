import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axiosInstance from "../../utils/axiosInstance";

const TrainingDataGraph2 = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/live_data", {
        params: {
          type: "line_workshop",
        },
      });
      const result = response.data;
      if (result?.data_dict) {
        const sortedData = result?.data_dict
          .map((item) => {
            // Convert the date to dd/mm/yyyy format
            const date = new Date(item.month);
            const formattedDate = `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getFullYear()}`;
            return {
              month: formattedDate,
              count: parseInt(item.count, 10),
            };
          })
          .sort((a, b) => new Date(a.month.split('/').reverse().join('-')) - new Date(b.month.split('/').reverse().join('-')));
  
        setData(sortedData);
      }
  
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div
      className="bg-white p-4 rounded-xl shadow-md"
      style={{ width: "48%", height: 500 }}
    >
      <h2 className="" style={{marginBottom:"1rem"}}>
        Monthly Workshops Conducted
      </h2>
      <ResponsiveContainer width="100%" height="92%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
  dataKey="month" 
  label={{ 
    //value: "Workshop Month", 
    value: "Date of workshop", 
    position: "insideBottom", 

    offset: -3
  }} 
/>
<YAxis
  tick={{ fontSize: 14, dx: -5 }} // Moves Y-axis values slightly left
  label={{
    value: "No. of Workshops Conducted",
    angle: -90,
    position: "insideLeft",
    offset: -0, // Moves label further left to prevent overlap
    style: { textAnchor: "middle" }, 
  }} 
/>



          <Tooltip />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#8884d8"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrainingDataGraph2;
