import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axiosInstance from "../../utils/axiosInstance";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "@mui/material";
import dayjs from "dayjs";

const TrainingDataGraph = () => {
  const [selectedMetric, setSelectedMetric] = useState("available_officers");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [hiddenLines, setHiddenLines] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/live_data", {
          params: { type: "line" },
        });
        setData(response.data.reverse());
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!Array.isArray(data) || data.length === 0) {
    return <div className="text-center p-4 text-gray-500">No data available</div>;
  }

  const filteredData = data.filter(entry => {
    const entryDate = new Date(entry.date);
    return (
      (!fromDate || entryDate >= fromDate.toDate()) &&
      (!toDate || entryDate <= toDate.toDate())
    );
  });

  const processedData = Object.values(
    filteredData.reduce((acc, entry) => {
      const date = new Date(entry.date).toLocaleDateString("en-US");
      if (!acc[date]) acc[date] = { date };
      if (entry.latest_training_psi_sp_dcp && entry.latest_training_psi_sp_dcp[selectedMetric]) {
        acc[date].psi_sp_dcp = parseInt(entry.latest_training_psi_sp_dcp[selectedMetric], 10) || 0;
      }
      if (entry.latest_training_pc_asi) {
        acc[date].pc_asi = parseInt(entry.latest_training_pc_asi[selectedMetric], 10) || 0;
      }
      return acc;
    }, {})
  );
  
  
  const handleLegendClick = (event) => {
    const { dataKey } = event;
    setHiddenLines((prev) => ({
      ...prev,
      [dataKey]: !prev[dataKey],
    }));
  };  
  

  const legendFormatter = (value, entry) => {
    const { dataKey } = entry;
    return (
      <span
        onClick={(e) => {
          e.stopPropagation(); // Prevent event bubbling
          handleLegendClick({ dataKey });
        }}
        style={{
          textDecoration: hiddenLines[dataKey] ? "line-through" : "none",
          cursor: "pointer",
          color: hiddenLines[dataKey] ? "#ccc" : "#000",
        }}
      >
        {value}
      </span>
    );
  };
  return (
    <div className="bg-white p-4 rounded-xl shadow-md" style={{ width: "48%", height: "600px" }}>
      <h2 className="text-xl font-semibold">Deviation</h2>
      <div className="flex justify-between mb-2">
        <h2 className="text-xl font-semibold">Training Data Graph</h2>
        <select
          onChange={(e) => setSelectedMetric(e.target.value)}
          value={selectedMetric}
          className="p-1 border rounded-lg bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="available_officers">Available Officers</option>
          <option value="trained_officers">Trained Officers</option>
        </select>
      </div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="flex gap-4 mb-4">
          <DatePicker label="From" value={fromDate} onChange={setFromDate} format="YYYY-MM-DD" slotProps={{ textField: { variant: "outlined", size: "small", sx: { width: "140px" } } }} />
          <DatePicker label="To" value={toDate} onChange={setToDate} format="YYYY-MM-DD" slotProps={{ textField: { variant: "outlined", size: "small", sx: { width: "140px" } } }} />
          <button onClick={() => { setFromDate(null); setToDate(null); }} className="p-2 bg-[#2d3748] text-white rounded-lg hover:bg-opacity-90 transition">Clear Filters</button>
        </div>
      </LocalizationProvider>
      <div className="w-full h-auto min-h-[300px]">
        <ResponsiveContainer width="100%" height={420} padding={1}>
          <LineChart data={processedData}>
            <XAxis dataKey="date" stroke="#6b7280" tick={{ fontSize: 14 }} />
            
            <YAxis
              stroke="#6b7280"
              tick={{ fontSize: 14 }} 
              domain={[0, 100]} // Set a reasonable fixed range
              
            />


            <Tooltip contentStyle={{ backgroundColor: "#f9fafb", borderRadius: "8px", border: "1px solid #e5e7eb" }} />
            <Legend 
  onClick={handleLegendClick} 
  formatter={legendFormatter} 
  wrapperStyle={{ cursor: "pointer" }} 
/>




            {["psi_sp_dcp", "pc_asi"].map((grade, index) => (
              <Line
                key={grade}
                type="monotone"
                dataKey={grade}
                stroke={["#34d399", "#6366f1"][index]} // Assigning colors dynamically
                strokeWidth={4}
                dot={{ r: 5 }}
                hide={hiddenLines[grade]} // Ensuring the line is hidden when toggled
                name={grade.toUpperCase().replace("_", "/")} // Formatting name dynamically
              />
            ))}


          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TrainingDataGraph;