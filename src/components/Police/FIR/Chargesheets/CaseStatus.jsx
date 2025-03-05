import React, { useState, useEffect } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";
import axiosInstance from "../../../../utils/axiosInstance";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const CaseStatus = ({ getrecentdatatime, type }) => {
  const [data, setData] = useState([]);
  const chartColors = ["#8884d8", "#82ca9d", "#f2c57c", "#6a8caf"];
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [hiddenLines, setHiddenLines] = useState({});
  
  function convertMonthFormat(yyyy_mm) {
    if (!yyyy_mm || !yyyy_mm.includes("-")) return yyyy_mm;
    const [year, month] = yyyy_mm.split("-");
    return `${month}-${year}`;
  }

  function parseMonthYear(monthYear) {
    const [month, year] = monthYear.split("-");
    return dayjs(`${year}-${month}-01`);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/live_data", {
          params: { type: "line_fir_2" },
        });

        if (response.data.data_dict) {
          const formattedData = response.data.data_dict
            .map((item) => ({
              month: convertMonthFormat(item.month),
              dateObj: parseMonthYear(convertMonthFormat(item.month)),
              acquitted: parseFloat(item.acquitted) || 0,
              convicted: parseFloat(item.convicted) || 0,
              pending: parseFloat(item.pending) || 0,
              total_charge_sheeted: parseFloat(item.total_charge_sheeted) || 0,
            }))
            .sort((a, b) => a.dateObj - b.dateObj);

          setData(formattedData);
          getrecentdatatime(formattedData[formattedData.length - 1]?.month);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const filteredData = data.filter(
    (item) =>
      (!fromDate || item.dateObj.isAfter(fromDate) || item.dateObj.isSame(fromDate, "month")) &&
      (!toDate || item.dateObj.isBefore(toDate) || item.dateObj.isSame(toDate, "month"))
  );

  const pieData =
    filteredData.length > 0
      ? [
          { name: "Acquitted", value: filteredData[0].acquitted },
          { name: "Convicted", value: filteredData[0].convicted },
          { name: "Pending", value: filteredData[0].pending },
          { name: "Total Charge Sheeted", value: filteredData[0].total_charge_sheeted },
        ]
      : [];

  const handleLegendClick = (e) => {
    const { value } = e;
    setHiddenLines((prev) => ({
      ...prev,
      [value]: !prev[value],
    }));
  };

  return (
    <div style={{ width: "100%", height: type === "recent" ? 600 : 650, margin: "auto", backgroundColor: "white" }} className='p-3'>
      {type !== "recent" && (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className="flex flex-col justify-between items-start">
            <h2 className="text-lg font-semibold text-start flex-grow">Deviation</h2>
            <h2 className="text-lg font-semibold text-start flex-grow mb-3">Case Status Data</h2>
            <div className="flex gap-4 items-end">
              <DatePicker label="From" views={["year", "month"]} value={fromDate} onChange={setFromDate} format="YYYY-MM" slotProps={{ textField: { variant: "outlined", size: "small", sx: { width: "140px" } } }} />
              <DatePicker label="To" views={["year", "month"]} value={toDate} onChange={setToDate} format="YYYY-MM" slotProps={{ textField: { variant: "outlined", size: "small", sx: { width: "140px" } } }} />
              <button onClick={() => { setFromDate(null); setToDate(null); }} className="p-2 bg-[#2d3748] text-white rounded-lg hover:bg-opacity-90 transition">Clear Filters</button>
            </div>
          </div>
        </LocalizationProvider>
      )}

<ResponsiveContainer width="100%" height={470}>
      {type === "recent" && pieData.length > 0 ? (
        <>
          <h3 className="text-lg font-semibold text-start flex-grow mb-3">
            Chargesheet Status
          </h3>
          <PieChart width={600} height={440}>
            <Tooltip />
            <Legend verticalAlign="bottom" align="center"
             />
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={150}
              label={({ name, percent }) => ` ${(percent * 100).toFixed(1)}%`}
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={chartColors[index % chartColors.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </>
      ) : (
        <LineChart data={filteredData} margin={{ top: 30, right: 30, left: 20, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="month" 
            label={{ value: "Month-Year", position: "insideBottom", offset: -15, style: { fontWeight: "bold", fontSize: "14px" } }} 
          />
          <YAxis 
            label={{ value: "Count", angle: -90, position: "insideLeft", style: { fontWeight: "bold", fontSize: "14px" } }} 
          />
          <Tooltip />
          <Legend wrapperStyle={{
                position: "relative",
                marginTop: 4, 
                cursor: "pointer" }} 
            onClick={handleLegendClick} 
            formatter={(value) => (
              <span 
                style={{ 
                  textDecoration: hiddenLines[value] ? "line-through" : "none", 
                  cursor: "pointer", 
                  color: hiddenLines[value] ? "#ccc" : "#000" 
                }}
              >
                {value}
              </span>
            )}
          />
          <Line type="monotone" dataKey="acquitted" stroke={chartColors[0]} name="Acquitted" hide={hiddenLines["Acquitted"]} />
          <Line type="monotone" dataKey="convicted" stroke={chartColors[1]} name="Convicted" hide={hiddenLines["Convicted"]} />
          <Line type="monotone" dataKey="pending" stroke={chartColors[2]} name="Pending" hide={hiddenLines["Pending"]} />
          <Line type="monotone" dataKey="total_charge_sheeted" stroke={chartColors[3]} name="Total Charge Sheeted" hide={hiddenLines["Total Charge Sheeted"]} />
        </LineChart>
      )}
    </ResponsiveContainer>
    </div>
  );
};

export default CaseStatus;
