import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axiosInstance from "../../../../utils/axiosInstance";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
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
  const [visibleLines, setVisibleLines] = useState({
    total_firs: true,
    fir_under_bns: true,
    chargesheets_filed: true,
    chargesheets_not_filed: true,
  });

  function convertMonthFormat(yyyy_mm) {
    if (!yyyy_mm || !yyyy_mm.includes("-")) return yyyy_mm;
    const [year, month] = yyyy_mm.split("-");
    return `${month}-${year}`;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/live_data", {
          params: { type: "line_fir_1" },
        });

        if (response.status === 200 && response.data.data_dict) {
          console.log("FIR data:", response.data.data_dict);

          const formattedData = response.data.data_dict
            .filter((item) => item.total_no_fir_registered_under_bns_ipc !== null)
            .map((item) => ({
              month: convertMonthFormat(item.month),
              dateObj: dayjs(`${item.month}-01`),
              total_firs: parseFloat(item.total_no_fir_registered_under_bns_ipc) || 0,
              fir_under_bns: parseFloat(item.no_of_fir_registered_under_bns) || 0,
              chargesheets_filed: parseFloat(item.no_of_chargesheets_filed_under_bns) || 0,
              chargesheets_not_filed:
                parseFloat(item.no_of_chargesheets_not_filed_within_the_stipulated_time) || 0,
            }))
            .sort((a, b) => a.dateObj - b.dateObj);

          setData(formattedData.reverse());
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

  const toggleLineVisibility = (dataKey) => {
    setVisibleLines((prev) => ({
      ...prev,
      [dataKey]: !prev[dataKey],
    }));
  };

  return (
    <div style={{ width: "100%", height: "40vh" }}>
      <h3 className="text-lg font-semibold text-start flex-grow mb-3">
        FIR & Chargesheet Data (Monthly)
      </h3>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="flex gap-3 mb-5 items-end">
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

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 30 }}>
          <CartesianGrid strokeDasharray="3 3" />

          {/* X-Axis with Title */}
          <XAxis
            dataKey="month"
            label={{
              value: "Time Period",
              position: "insideBottom",
              offset: -15,
              fontWeight: "bold",
            }}
          />
          {/* Y-Axis with Title */}
          <YAxis label={{ value: "No of FIRs", angle: -90, position: "left", fontWeight: "bold", offset: 15 }} />

          <Tooltip />
          <Legend
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{ paddingTop: "20px", cursor: "pointer" }}
            onClick={(e) => toggleLineVisibility(e.dataKey)}
            payload={[
              { value: "Total FIRs", dataKey: "total_firs", color: chartColors[0] },
              { value: "FIRs under BNS", dataKey: "fir_under_bns", color: chartColors[1] },
              { value: "Chargesheets Filed", dataKey: "chargesheets_filed", color: chartColors[2] },
              { value: "Chargesheets Not Filed on Time", dataKey: "chargesheets_not_filed", color: chartColors[3] },
            ].map((entry) => ({
              ...entry,
              type: "line",
              id: entry.dataKey,
              value: (
                <span style={{ textDecoration: visibleLines[entry.dataKey] ? "none" : "line-through" }}>
                  {entry.value}
                </span>
              ),
            }))}
          />
          
          {visibleLines.total_firs && (
            <Line type="monotone" dataKey="total_firs" stroke={chartColors[0]} name="Total FIRs" strokeWidth={2} />
          )}
          {visibleLines.fir_under_bns && (
            <Line type="monotone" dataKey="fir_under_bns" stroke={chartColors[1]} name="FIRs under BNS" strokeWidth={2} />
          )}
          {visibleLines.chargesheets_filed && (
            <Line type="monotone" dataKey="chargesheets_filed" stroke={chartColors[2]} name="Chargesheets Filed" strokeWidth={2} />
          )}
          {visibleLines.chargesheets_not_filed && (
            <Line type="monotone" dataKey="chargesheets_not_filed" stroke={chartColors[3]} name="Chargesheets Not Filed on Time" strokeWidth={2} />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FirBarGraph;
                                                                                                                                                                                                                              