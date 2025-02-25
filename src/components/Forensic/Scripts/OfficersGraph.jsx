import React, { useState,useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
const chartColors = [
  "#8884d8", // Muted Purple
  "#82ca9d", // Soft Green
  "#f2c57c", // Warm Sand
  "#6a8caf", // Steel Blue
  "#d4a5a5", // Soft Rose
  "#a28bd3", // Lavender
  "#ff9a76", // Muted Coral
  "#74b49b"  // Muted Teal
];
const gradeData = [
  { month: "Jan 2024", grade: "Director", available: 5, provided: 12 },
  { month: "Jan 2024", grade: "Dy Director", available: 14, provided: 18 },
  { month: "Jan 2024", grade: "Assistant Director", available: 30, provided: 45 },
  { month: "Jan 2024", grade: "Assistant Chemical Analyzer", available: 90, provided: 220 },
  { month: "Jan 2024", grade: "Scientific Officers", available: 28, provided: 40 },

  { month: "Feb 2024", grade: "Director", available: 8, provided: 10 },
  { month: "Feb 2024", grade: "Dy Director", available: 12, provided: 15 },
  { month: "Feb 2024", grade: "Assistant Director", available: 40, provided: 42 },
  { month: "Feb 2024", grade: "Assistant Chemical Analyzer", available: 80, provided: 200 },
  { month: "Feb 2024", grade: "Scientific Officers", available: 35, provided: 38 },

  { month: "Mar 2024", grade: "Director", available: 6, provided: 14 },
  { month: "Mar 2024", grade: "Dy Director", available: 18, provided: 16 },
  { month: "Mar 2024", grade: "Assistant Director", available: 35, provided: 50 },
  { month: "Mar 2024", grade: "Assistant Chemical Analyzer", available: 110, provided: 190 },
  { month: "Mar 2024", grade: "Scientific Officers", available: 30, provided: 45 },

  { month: "Apr 2024", grade: "Director", available: 10, provided: 8 },
  { month: "Apr 2024", grade: "Dy Director", available: 14, provided: 19 },
  { month: "Apr 2024", grade: "Assistant Director", available: 32, provided: 35 },
  { month: "Apr 2024", grade: "Assistant Chemical Analyzer", available: 70, provided: 220 },
  { month: "Apr 2024", grade: "Scientific Officers", available: 37, provided: 32 },

  { month: "May 2024", grade: "Director", available: 7, provided: 11 },
  { month: "May 2024", grade: "Dy Director", available: 17, provided: 15 },
  { month: "May 2024", grade: "Assistant Director", available: 38, provided: 40 },
  { month: "May 2024", grade: "Assistant Chemical Analyzer", available: 95, provided: 210 },
  { month: "May 2024", grade: "Scientific Officers", available: 30, provided: 36 },

  { month: "Jun 2024", grade: "Director", available: 9, provided: 13 },
  { month: "Jun 2024", grade: "Dy Director", available: 15, provided: 20 },
  { month: "Jun 2024", grade: "Assistant Director", available: 40, provided: 42 },
  { month: "Jun 2024", grade: "Assistant Chemical Analyzer", available: 80, provided: 225 },
  { month: "Jun 2024", grade: "Scientific Officers", available: 35, provided: 37 },
];
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";


const OfficersGraph = ({to,from,setGrade}) => {
  const [selectedMetric, setSelectedMetric] = useState("available");
  const [filteredGradeData, setFilteredGradeData] = useState(gradeData);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  // Process data by month instead of grade
  const processedData = gradeData.reduce((acc, entry) => {
    const { month, available, provided } = entry;

    if (!acc[month]) {
      acc[month] = { month };
    }

    acc[month][entry.grade] = selectedMetric === "available" ? available : provided - available;
    return acc;
  }, {});

  const formattedData = Object.values(filteredGradeData);
  const filterDataByDate = (data, from, to) => {
    if (!data || typeof data !== "object") {
      console.error("filterDataByDate received invalid data:", data);
      return [];
    }
  
    // Convert object to an array of objects
    const dataArray = Object.values(data);
    console.log('grade datya fro compo',dataArray[dataArray.length-1])
    setGrade(dataArray[dataArray.length-1])
    return dataArray.filter((item) => {
      const itemDate = dayjs(item.month, "MMM YYYY");
  
      return (
        (!from || itemDate.isAfter(dayjs(from).subtract(1, "month"))) &&
        (!to || itemDate.isBefore(dayjs(to).add(1, "month")))
      );
    });
  };
  const Clearfilter=()=>{
    setFromDate(null);
    setToDate(null);
  }
  
  useEffect(() => {
    if (fromDate || toDate) {
      console.log("Filtering data from:", fromDate, "to:", toDate);
      console.log("Raw Processed Data:", processedData);
  
      if (processedData && typeof processedData === "object") {
        const filteredData = filterDataByDate(processedData, fromDate, toDate);
        console.log("Filtered Data:", filteredData);
  
        setFilteredGradeData(filteredData);
  
        if (filteredData.length > 0) {
          const dataArray = Object.values(filteredData);
      console.log('----------while filtering---------------',dataArray[dataArray.length-1])

      setGrade(dataArray[dataArray.length-1])
        }
      } else {
        console.error("Processed Data is not an object:", processedData);
        setFilteredGradeData([]); // Reset if invalid data
      }
    }
    else{
      setFilteredGradeData(processedData);
      const dataArray = Object.values(processedData);
      console.log('----------while filtering---------------',dataArray[dataArray.length-1])

      setGrade(dataArray[dataArray.length-1])
    }
  }, [fromDate, toDate]);
  
  
  useEffect(() => {
      setFilteredGradeData(processedData);
      const dataArray = Object.values(processedData);
      console.log('----------while filtering---------------',dataArray[dataArray.length-1])
      setGrade(dataArray[dataArray.length-1])
  }, []);
  
  return (
    <div className="bg-white p-4 rounded-xl  w-full">
      <div className="flex justify-between mb-4 ">
        <h2 className="text-xl font-semibold mb-4">Training Data by Grade Over Time</h2>

        {/* Dropdown for selecting metric */}
        <select
          onChange={(e) => setSelectedMetric(e.target.value)}
          value={selectedMetric}
          className="p-1 border rounded-lg bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="available">Available </option>
          <option value="pending">Pending </option>
        </select>
      </div>

      {/* Line Chart */}
      <div className="w-full h-auto min-h-[300px]">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <div>
             
            <DatePicker
            label='From'
              views={["year", "month"]}
              value={fromDate}
              onChange={setFromDate}
              slotProps={{
                textField: { 
                  variant: "outlined",
                  size: "small",
                  sx: { width: "140px", fontSize: "12px" },
                }
              }}
              sx={{ "& .MuiPickersPopper-paper": { transform: "scale(0.9)" } }}
            />
          </div>

          <div>
              
            <DatePicker
            label='To'
              views={["year", "month"]}
              value={toDate}
              onChange={setToDate}
              slotProps={{
                textField: { 
                  variant: "outlined",
                  size: "small",
                  sx: { width: "140px", fontSize: "12px" },
                }
              }}
              sx={{ "& .MuiPickersPopper-paper": { transform: "scale(0.9)" } }}
            />
          </div>

          <button 
            onClick={Clearfilter} 
            className="bg-blue-500 text-white px-3 py-1 rounded-md "
            style={{ backgroundColor: "#2d3748" }}>
            Clear
          </button>
        </div>

      </div>
      </LocalizationProvider>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={formattedData}>
            <XAxis
              dataKey="month"
              stroke="#6b7280"
              tick={{ fontSize: 14 }}
              label={{
                value: "Month",
                position: "insideBottom",
                offset: -5,
              }}
            />
            <YAxis
              stroke="#6b7280"
              tick={{ fontSize: 14 }}
              label={{
                value: "Count of Officers",
                angle: -90,
                position: "insideLeft",
                offset: 0,
                style: { textAnchor: "middle" },
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#f9fafb",
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
              }}
            />
            <Legend iconType="circle" wrapperStyle={{ paddingBottom: 10, paddingTop: 10 }} />

            {/* Dynamic Lines for Each Grade */}
            {["Director", "Dy Director", "Assistant Director", "Assistant Chemical Analyzer", "Scientific Officers"].map((grade, index) => (
              <Line
                key={grade}
                type="monotone"
                dataKey={grade}
                stroke={chartColors[index]}
                strokeWidth={4}
                dot={{ r: 5 }}
                name={grade}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default OfficersGraph;
