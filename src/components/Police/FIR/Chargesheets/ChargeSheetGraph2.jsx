import React, { useState, useEffect } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label
} from "recharts";
import axiosInstance from "../../../../utils/axiosInstance"; 

const chartColors = [
  "#8884d8", // Muted Purple
  "#82ca9d", // Soft Green
  "#f2c57c"  // Warm Sand
];

const ChargeSheetGraph2 = () => {
  const [data, setData] = useState([]);
  const [hiddenBars, setHiddenBars] = useState({
    total_registered: false,
    chargesheeted: false,
    under_investigation: false
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/live_data?type=line_fir_3");

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

  // Toggle the visibility of the bars
  const handleLegendClick = (e) => {
    setHiddenBars(prev => ({
      ...prev,
      [e.dataKey]: !prev[e.dataKey]
    }));
  };

  return (
    <div style={{ width: "100%", height: 600, margin: "auto", backgroundColor: "white" }} className='p-3'>
      <h2 className="text-lg font-semibold text-start flex-grow mb-3">FIR Data by Section</h2>
      <ResponsiveContainer width="100%" height={500}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="section">
            <Label value="Section Numbers" offset={-16} position="insideBottom" style={{ fontWeight: "bold" }} />
          </XAxis>
          <YAxis>
            <Label value="Count" angle={-90} position="insideLeft" style={{ textAnchor: 'middle', fontWeight: "bold" }} offset={-8} />
          </YAxis>
          <Tooltip />
          <Legend 
            onClick={handleLegendClick} 
            wrapperStyle={{
              position: "relative",
              marginTop: 5,
              cursor: "pointer"  
            }}
            formatter={(value, entry) => (
              <span 
                style={{ 
                  textDecoration: hiddenBars[entry.dataKey] ? "line-through" : "none",
                  cursor: "pointer"
                }}
              >
                {value}
              </span>
            )}
          />
          
          {/* Bars with conditional rendering but ensuring the legend stays */}
          <Bar dataKey="total_registered" fill={chartColors[0]} name="Total Registered" hide={hiddenBars["total_registered"]} />
          <Bar dataKey="chargesheeted" fill={chartColors[1]} name="Chargesheeted" hide={hiddenBars["chargesheeted"]} />
          <Bar dataKey="under_investigation" fill={chartColors[2]} name="Under Investigation" hide={hiddenBars["under_investigation"]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChargeSheetGraph2;
