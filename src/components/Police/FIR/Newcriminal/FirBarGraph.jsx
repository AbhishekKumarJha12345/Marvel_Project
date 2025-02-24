import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import axiosInstance from "../../../../utils/axiosInstance";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "@mui/material";
import dayjs from "dayjs";

const chartColors = [
  "#8884d8", // Muted Purple
  "#82ca9d", // Soft Green
  "#f2c57c", // Warm Sand
  "#6a8caf", // Steel Blue
];

const FirBarGraph = () => {
  const [data, setData] = useState([]);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  function convertMonthFormat(yyyy_mm) {
    if (!yyyy_mm || !yyyy_mm.includes("-")) return yyyy_mm;
    const [year, month] = yyyy_mm.split("-");
    return `${month}-${year}`;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/live_data', {
          params: { type: 'line_fir_1' },
        });
  
        if (response.status === 200 && response.data.data_dict) {
          console.log('FIR data:', response.data.data_dict);
  
          const formattedData = response.data.data_dict
            .filter(item => item.total_no_fir_registered_under_bns_ipc !== null)
            .map(item => ({
              month: convertMonthFormat(item.month),
              dateObj: dayjs(`${item.month}-01`),
              total_firs: parseFloat(item.total_no_fir_registered_under_bns_ipc) || 0,
              fir_under_bns: parseFloat(item.no_of_fir_registered_under_bns) || 0,
              chargesheets_filed: parseFloat(item.no_of_chargesheets_filed_under_bns) || 0,
              chargesheets_not_filed: parseFloat(item.no_of_chargesheets_not_filed_within_the_stipulated_time) || 0,
            }))
            .sort((a, b) => a.dateObj - b.dateObj);
  
          setData(formattedData.reverse());
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []); 
  
  const filteredData = data.filter(item => 
    (!fromDate || item.dateObj.isAfter(fromDate) || item.dateObj.isSame(fromDate, "month")) &&
    (!toDate || item.dateObj.isBefore(toDate) || item.dateObj.isSame(toDate, "month"))
  );
  
  return (
    <div style={{ width: "100%", height: "30vh" }}>
      <h2 style={{ marginBottom:"10px" }}>FIR & Chargesheet Data (Monthly)</h2>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
  <div className="flex gap-3 mb-2 items-end"> 
    <div>
      <label>From:</label>
      <DatePicker
        label="From"
        views={["year", "month"]}
        value={fromDate}
        onChange={setFromDate}
        slotProps={{ textField: { variant: "outlined", size: "small", sx: { width: "140px" } } }}
      />
    </div>
    <div>
      <label>To:</label>
      <DatePicker
        label="To"
        views={["year", "month"]}
        value={toDate}
        onChange={setToDate}
        slotProps={{ textField: { variant: "outlined", size: "small", sx: { width: "140px" } } }}
      />
    </div>
    <button 
      onClick={() => {
        setFromDate(null);
        setToDate(null);
      }}
      className="p-2 bg-[#2d3748] text-white rounded-lg hover:bg-opacity-90 transition"
      style={{ fontSize: "16px" }}
    >
      Clear Filters
    </button>
  </div>
</LocalizationProvider>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="total_firs" stroke={chartColors[0]} name="Total FIRs" strokeWidth={2} />
          <Line type="monotone" dataKey="fir_under_bns" stroke={chartColors[1]} name="FIRs under BNS" strokeWidth={2} />
          <Line type="monotone" dataKey="chargesheets_filed" stroke={chartColors[2]} name="Chargesheets Filed" strokeWidth={2} />
          <Line type="monotone" dataKey="chargesheets_not_filed" stroke={chartColors[3]} name="Chargesheets Not Filed on Time" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FirBarGraph;
