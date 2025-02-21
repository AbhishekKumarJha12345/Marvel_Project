import React, { useState, useEffect } from "react";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from "recharts";
import axiosInstance from "../../../../utils/axiosInstance";

const CaseStatus = ({ getrecentdatatime,type }) => {
  const [data, setData] = useState([]);
  const chartColors = ["#8884d8", "#82ca9d", "#f2c57c", "#6a8caf"];

  function convertMonthFormat(yyyy_mm) {
    if (!yyyy_mm || !yyyy_mm.includes("-")) return yyyy_mm; 
    const [year, month] = yyyy_mm.split("-");
    return month + '-' + year;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/live_data?type=line_fir_2");

        if (response.data.data_dict) {
          const formattedData = response.data.data_dict
            .map(item => ({
              month: convertMonthFormat(item.month),
              acquitted: parseFloat(item.acquitted) || 0,
              convicted: parseFloat(item.convicted) || 0,
              pending: parseFloat(item.pending) || 0,
              total_charge_sheeted: parseFloat(item.total_charge_sheeted) || 0,
            }))
            .sort((a, b) => new Date(a.month) - new Date(b.month));

          setData(formattedData);
          getrecentdatatime(formattedData[0].month)
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const pieData =
    data.length > 0
      ? [
          { name: "Acquitted", value: data[0].acquitted },
          { name: "Convicted", value: data[0].convicted },
          { name: "Pending", value: data[0].pending },
          { name: "Total Charge Sheeted", value: data[0].total_charge_sheeted },
        ]
      : [];

  // Custom Tooltip for Pie Chart
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ 
          background: "white", 
          padding: "10px", 
          borderRadius: "5px", 
          boxShadow: "0px 0px 10px rgba(0,0,0,0.2)" 
        }}>
          <p style={{ fontWeight: "bold", color: payload[0].color }}>{payload[0].name}:</p>
          <p>{payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ width: "100%", padding: "3rem", height:type === "recent" ? 500 : 400, margin: "auto", backgroundColor: "white" }}>
      <h2 style={{ textAlign: "center",fontSize:"24px" }}>Case Status Data - Recent</h2>
      <ResponsiveContainer width="100%" height="100%">
        {type === "recent" && pieData.length > 0 ? (
          <PieChart width={300} height={300}>
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="bottom" align="center" />
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={150}
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
              ))}
            </Pie>
          </PieChart>
        ) : (
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" label={{ value: "Month-Year", position: "insideBottomRight", offset: -5 }} />
            <YAxis label={{ value: "Count", angle: -90, position: "insideLeft" }} />
            <Tooltip />
            <Legend verticalAlign="top" align="right" />
            <Line type="monotone" dataKey="acquitted" stroke={chartColors[0]} name="Acquitted" />
            <Line type="monotone" dataKey="convicted" stroke={chartColors[1]} name="Convicted" />
            <Line type="monotone" dataKey="pending" stroke={chartColors[2]} name="Pending" />
            <Line type="monotone" dataKey="total_charge_sheeted" stroke={chartColors[3]} name="Total Charge Sheeted" />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default CaseStatus;
