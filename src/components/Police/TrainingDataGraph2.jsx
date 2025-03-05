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
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField, Button } from "@mui/material";
import { Height, Padding } from "@mui/icons-material";

const TrainingDataGraph2 = () => {
  const [data, setData] = useState([]);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [error, setError] = useState(null);

  function convertMonthFormat(dateStr) {
    if (!dateStr || !dateStr.includes("-")) return dateStr;
    const [first, second] = dateStr.split("-");
    
    // If first part is a year (length 4), convert to MM-YYYY
    // Otherwise, assume it's in MM-YYYY format and convert to YYYY-MM
    return first.length === 4 ? `${second}-${first}` : `${second}-${first}`;
  }
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/live_data", {
          params: { type: "line_workshop" },
        });

        if (response.data?.data_dict) {
          const sortedData = response.data.data_dict
            .map((item) => ({
              month: convertMonthFormat(item.month),
              count: parseInt(item.count, 10),
            }))
            .sort((a, b) =>
              new Date(a.month.split("-").reverse().join("-")) -
              new Date(b.month.split("-").reverse().join("-"))
            );

          setData(sortedData);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  const filteredData = data.filter((item) => {
    const itemDate = new Date(item.month.split("-").join("-")); // No need to reverse
    return (
      (!fromDate || itemDate >= new Date(fromDate.format("YYYY-MM"))) &&
      (!toDate || itemDate <= new Date(toDate.format("YYYY-MM")))
    );
  });
  

  return (
    <div className="bg-white p-4 rounded-xl shadow-md" style={{ width: "48%", height: 600 }}>
            <h2 className=" text-xl font-semibold">Deviation</h2>

      <h2 className="mb-3 text-xl font-semibold">Monthly Workshops Conducted</h2>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
  <div className="flex gap-4 mb-2 items-end">
    <DatePicker
      views={["year", "month"]}
      label="From"
      value={fromDate}
      onChange={setFromDate}
      slotProps={{ textField: { variant: "outlined", size: "small", sx: { width: "140px" } } }}
    />
    <DatePicker
      views={["year", "month"]}
      label="To"
      value={toDate}
      onChange={setToDate}
      slotProps={{ textField: { variant: "outlined", size: "small", sx: { width: "140px" } } }}
    />
    <button
      onClick={() => {
        setFromDate(null);
        setToDate(null);
      }}
     className="p-2 bg-[#2d3748] text-white rounded-lg hover:bg-opacity-90 transition"
    >
      Clear Filters
    </button>
  </div>
</LocalizationProvider>


      <ResponsiveContainer width="100%" height={390}>
        <LineChart data={filteredData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
            label={{ value: "Date of Workshop", position: "insideBottom", offset: -4,  style: { fontWeight: "bold", fontSize: 14 } }}

          />
          <YAxis
            tick={{ fontSize: 12, dx: -5 }}
            label={{
              value: "No. of Workshops Conducted",
              angle: -90,
              position: "insideLeft",
              offset: -1,
              style: { textAnchor: "middle",fontWeight:'bold' },
            }}
          />
 <Tooltip
      contentStyle={{ backgroundColor: "#2d3748", color: "#ffffff", borderRadius: "8px" }}
      itemStyle={{ color: "#facc15" }}
      labelStyle={{ fontWeight: "bold", color: "#ffffff" }}
    />       
    
          <Line type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrainingDataGraph2;
