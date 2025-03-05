import React, { useState, useEffect } from "react";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from "recharts";
import axiosInstance from "../../../../utils/axiosInstance";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const ZeroFir2 = ({ getRecentDate, type }) => {
  const [originalData, setOriginalData] = useState([]); 
  const [data, setData] = useState([]);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [hiddenLines, setHiddenLines] = useState({
    regular_fir: false,
    yet_to_be_registered_zero_fir: false,
    zero_fir: false
  });

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

          const allData = response.data.data_dict
            .map(item => ({
              month: convertMonthFormat(item.month),
              dateObj: new Date(item.month + "-01"),
              regular_fir: parseInt(item.regular_fir, 10) || 0,
              yet_to_be_registered_zero_fir: parseInt(item.yet_to_be_registered_zero_fir, 10) || 0,
              zero_fir: parseInt(item.zero_fir, 10) || 0,
            }))
            .sort((a, b) => a.dateObj - b.dateObj);

          setOriginalData(allData);
          setData(allData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!fromDate && !toDate) {
      setData(originalData);
      return;
    }

    const filteredData = originalData.filter(item => {
      const itemDate = new Date(item.dateObj);
      const from = fromDate ? new Date(new Date(fromDate).getFullYear(), new Date(fromDate).getMonth(), 1) : null;
      const to = toDate ? new Date(new Date(toDate).getFullYear(), new Date(toDate).getMonth() + 1, 0) : null;
  
      return (!from || itemDate >= from) && (!to || itemDate <= to);
    });

    setData(filteredData);
  }, [fromDate, toDate, originalData]);

  const firstDataItem = data.length > 0 ? data[data.length - 1] : null;
  const pieData = firstDataItem
    ? [
        { name: "Regular FIR", value: firstDataItem.regular_fir },
        { name: "Yet to Register Zero FIR", value: firstDataItem.yet_to_be_registered_zero_fir },
        { name: "Zero FIR", value: firstDataItem.zero_fir }
      ]
    : [];

  const total = pieData.reduce((sum, entry) => sum + entry.value, 0);

  const renderCustomizedLabel = ({ name, value }) => {
    const percentage = total ? ((value / total) * 100).toFixed(1) : 0;
    return `${name} (${percentage}%)`;
  };

  const handleLegendClick = (e) => {
    setHiddenLines(prev => ({
      ...prev,
      [e.dataKey]: !prev[e.dataKey]
    }));
  };

  return (
    <div style={{ width: "100%", height: 600, padding: "1rem 1rem", backgroundColor: "white", margin: "auto" }}>
      <h2 className="text-lg font-semibold text-start flex-grow ">Deviation</h2>
      <h2 className="text-lg font-semibold text-start flex-grow mb-3">
          {type === "recent" ? "FIR Trends - Recent" : "FIR Trends Over Time"}
      </h2>
      
      <div className={`flex ${type === "recent" ? "justify-center" : "justify-between"} items-end mb-2`}>
        {type !== "recent" && (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="flex gap-4 items-end">
              <DatePicker
                label="From"
                views={["year", "month"]}
                value={fromDate}
                onChange={(date) => setFromDate(date)}
                slotProps={{
                  textField: {
                    variant: "outlined",
                    size: "small",
                    sx: { width: "140px" },
                  },
                }}
              />
              <DatePicker
                label="To"
                views={["year", "month"]}
                value={toDate}
                onChange={(date) => setToDate(date)}
                slotProps={{
                  textField: {
                    variant: "outlined",
                    size: "small",
                    sx: { width: "140px" },
                  },
                }}
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
        )}
      </div>

      <ResponsiveContainer width="100%" height={400}>
        {type === "recent" && firstDataItem ? (
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={135}
              fill="#8884d8"
              dataKey="value"
              label={renderCustomizedLabel}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={chartColors[index]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value} (${((value / total) * 100).toFixed(1)}%)`} />
            <Legend />
          </PieChart>
        ) : (
          <LineChart data={data} margin={{ top: 40, right: 30, left: 50, bottom: 30 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" label={{ value: "Month", position: "bottom", offset: 4, style: { fontWeight: "bold", fontSize: "14px" } }} />
            <YAxis label={{ value: "FIR Count", angle: -90, position: "insideLeft", dy: 40, style: { fontWeight: "bold", fontSize: "14px" }, offset: -40 }} />
            <Tooltip />
            <Legend 
              onClick={handleLegendClick} 
              wrapperStyle={{
                position: "relative",
                marginTop: 4, 
                cursor: "pointer"              }}              formatter={(value, entry) => (
                <span 
                  style={{ 
                    textDecoration: hiddenLines[entry.dataKey] ? "line-through" : "none",
                    cursor: "pointer"
                  }}
                >
                  {value}
                </span>
              )}
            />
            <Line type="monotone" dataKey="regular_fir" stroke={chartColors[0]} strokeWidth={2} name="Regular FIR" hide={hiddenLines["regular_fir"]} />
            <Line type="monotone" dataKey="yet_to_be_registered_zero_fir" stroke={chartColors[1]} strokeWidth={2} name="Yet to Register Zero FIR"                                                                                                                                                                     hide={hiddenLines["yet_to_be_registered_zero_fir"]} />
            <Line type="monotone" dataKey="zero_fir" stroke={chartColors[2]} strokeWidth={2} name="Zero FIR" hide={hiddenLines["zero_fir"]} />
          </LineChart>
        )}                                                                                                                                                                      
      </ResponsiveContainer>
    </div>
  );
};

export default ZeroFir2;
