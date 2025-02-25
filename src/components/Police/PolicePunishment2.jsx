import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

// Register required chart components for a line chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const chartColors = {
  cases: "#8884d8",
  visits: "#82ca9d",
  additional: "#ff7f50",
};

const PolicePunishment2 = () => {
  const [fromMonth, setFromMonth] = useState(null);
  const [toMonth, setToMonth] = useState(null);

  // Original dataset with months
  const originalData = [
    { month: "January", cases: 13939, visits: 2587, additional: 3000, date: "2024-01" },
    { month: "February", cases: 14000, visits: 2600, additional: 3200, date: "2024-02" },
    { month: "March", cases: 13800, visits: 2500, additional: 3100, date: "2024-03" },
    { month: "April", cases: 14100, visits: 2550, additional: 3050, date: "2024-04" },
    { month: "May", cases: 14200, visits: 2590, additional: 3150, date: "2024-05" },
    { month: "June", cases: 13900, visits: 2570, additional: 3000, date: "2024-06" },
  ];

  const [filteredData, setFilteredData] = useState(originalData);

  // Filter dataset when months change
  useEffect(() => {
    if (!fromMonth && !toMonth) {
      setFilteredData(originalData);
      return;
    }

    const filtered = originalData.filter((item) => {
      const itemMonth = dayjs(item.date, "YYYY-MM").month(); // Get month index (0-11)
      const from = fromMonth ? dayjs(fromMonth).month() : null;
      const to = toMonth ? dayjs(toMonth).month() : null;

      return (!from || itemMonth >= from) && (!to || itemMonth <= to);
    });

    setFilteredData(filtered);
  }, [fromMonth, toMonth]);

  // Prepare chart data
  const chartData = {
    labels: filteredData.map((item) => item.month),
    datasets: [
      {
        label: "No. of Cases Registered",
        data: filteredData.map((item) => item.cases),
        borderColor: chartColors.cases,
        backgroundColor: chartColors.cases,
        tension: 0.1,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: "#000",
      },
      {
        label: "Cases in which Forensic Team Visited",
        data: filteredData.map((item) => item.visits),
        borderColor: chartColors.visits,
        backgroundColor: chartColors.visits,
        tension: 0.1,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: "#000",
      },
      {
        label: "Additional Data",
        data: filteredData.map((item) => item.additional),
        borderColor: chartColors.additional,
        backgroundColor: chartColors.additional,
        tension: 0.1,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: "#000",
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Case and Forensic Visit Data",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.dataset.label}: ${tooltipItem.formattedValue}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="p-6 rounded-lg flex flex-col bg-white w-[48%]">
      {/* Month Filters */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="flex gap-4 items-end mb-4">
          <DatePicker
            label="From"
            views={["month"]}
            value={fromMonth}
            onChange={setFromMonth}
            format="MMMM"
            slotProps={{
              textField: { variant: "outlined", size: "small", sx: { width: "140px" } },
            }}
          />
          <DatePicker
            label="To"
            views={["month"]}
            value={toMonth}
            onChange={setToMonth}
            format="MMMM"
            slotProps={{
              textField: { variant: "outlined", size: "small", sx: { width: "140px" } },
            }}
          />
          <button
            onClick={() => {
              setFromMonth(null);
              setToMonth(null);
            }}
            className="p-2 bg-[#2d3748] text-white rounded-lg hover:bg-opacity-90 transition"
          >
            Clear Filters
          </button>
        </div>
      </LocalizationProvider>

      {/* Chart */}
      <div className="h-[400px]">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default PolicePunishment2;
