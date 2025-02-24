import React, { useState, useEffect } from "react";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from "recharts";
import axiosInstance from "../../../../utils/axiosInstance";

const ZeroFir2 = ({ getRecentDate, type }) => {
  const [data, setData] = useState([]);
  const chartColors = ["#8884d8", "#82ca9d", "#f2c57c"];

  function convertMonthFormat(yyyy_mm) {
    if (!yyyy_mm || !yyyy_mm.includes("-")) return yyyy_mm;
    const [year, month] = yyyy_mm.split("-");
    return `${month}-${year}`; 
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/live_data?type=line_fir_4");

        if (response.data.data_dict) {
          if (type === "recent") {
            getRecentDate(response.data.data_dict[0].month);
          }
          const sortedData = response.data.data_dict
            .map(item => ({
              month: convertMonthFormat(item.month),
              regular_fir: parseInt(item.regular_fir, 10) || 0,
              yet_to_be_registered_zero_fir: parseInt(item.yet_to_be_registered_zero_fir, 10) || 0,
              zero_fir: parseInt(item.zero_fir, 10) || 0,
            }))
            .sort((a, b) => new Date(a.month) - new Date(b.month));

          setData(sortedData.reverse());
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const firstDataItem = data.length > 0 ? data[data.length-1] : null;
  const pieData = firstDataItem
    ? [
        { name: "Regular FIR", value: firstDataItem.regular_fir },
        { name: "Yet to Register Zero FIR", value: firstDataItem.yet_to_be_registered_zero_fir },
        { name: "Zero FIR", value: firstDataItem.zero_fir }
      ]
    : [];

  const total = pieData.reduce((sum, entry) => sum + entry.value, 0);

  // Function to format labels with percentage
  const renderCustomizedLabel = ({ name, value }) => {
    const percentage = total ? ((value / total) * 100).toFixed(1) : 0;
    return `${name} (${percentage}%)`;
  };

  return (
    <div style={{ width: "100%", height: 350, padding: "1.8rem 0rem", backgroundColor: "white", margin: "auto" }}>
      {type === "recent" ? (
        <h2 style={{ textAlign: "center" }}>FIR Trends - Recent</h2>
      ) : (
        <h2 style={{ textAlign: "center" }}>FIR Trends Over Time</h2>
      )}

      <ResponsiveContainer width={type === "recent" ? "113%" : "100%"} height={type === "recent" ? "80%" : "100%"}>
        {type === "recent" && firstDataItem ? (
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label={renderCustomizedLabel} // Custom label function
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={chartColors[index]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value} (${((value / total) * 100).toFixed(1)}%)`} />
            <Legend />
          </PieChart>
        ) : (
          <LineChart data={data} margin={{ top: 20, right: 30, left: 50, bottom: 40 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" label={{ value: "Month", position: "bottom", offset: 3 }} />
            <YAxis label={{ value: "FIR Count", angle: -90, position: "insideLeft", dy: 40 }} />
            <Tooltip />
            <Line type="monotone" dataKey="regular_fir" stroke={chartColors[0]} strokeWidth={2} name="Regular FIR"/>
            <Line type="monotone" dataKey="yet_to_be_registered_zero_fir" stroke={chartColors[1]} strokeWidth={2} name="Yet to Register Zero FIR"/>
            <Line type="monotone" dataKey="zero_fir" stroke={chartColors[2]} strokeWidth={2} name="Zero FIR" />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default ZeroFir2;
