import React, { useState, useEffect } from "react";
import {
  PieChart,
  LineChart,
  Line,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

import ImageCarousel from "./ImageCarousel";
import VanAvailability from "./VanAvailability";
import axios from "axios";
import axiosInstance from "../../../utils/axiosInstance";

const dataResponseTimes = [
  { region: "North", responseTime: 20 },
  { region: "South", responseTime: 25 },
  { region: "East", responseTime: 30 },
  { region: "West", responseTime: 15 },
];


const dataExpansionDemand = [
  { region: "North", demand: 50 },
  { region: "South", demand: 70 },
  { region: "East", demand: 60 },
  { region: "West", demand: 40 },
];
const formattedExpansionDemand = [
  { month: "Jan 2024", North: 20, South: 25, East: 30, West: 15 },
  { month: "Feb 2024", North: 22, South: 28, East: 32, West: 18 },
  { month: "Mar 2024", North: 19, South: 27, East: 31, West: 16 },
  { month: "Apr 2024", North: 50, South: 70, East: 60, West: 40 },
];
const formattedData = [
  { month: "Jan 2024", North: 20, South: 25, East: 30, West: 15 },
  { month: "Feb 2024", North: 22, South: 28, East: 32, West: 18 },
  { month: "Mar 2024", North: 19, South: 27, East: 31, West: 16 },
  { month: "Apr 2024", North: 24, South: 29, East: 33, West: 20 },
];

// const chartColors = [ "#FFBB28", "#FF8042", "#FF0000", "#00C49F"];
const chartColors = [
  "#8884d8", // Muted Purple
  "#82ca9d", // Soft Green
  "#f2c57c", // Warm Sand
  "#6a8caf", // Steel Blue
  "#d4a5a5", // Soft Rose
  "#a28bd3", // Lavender
  "#ff9a76", // Muted Coral
  "#74b49b", // Muted Teal
  "#c08497", // Mauve
  "#b0a8b9" // Dusty Lilac
  ];
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
export default function Tab2() {
  const [vanDeploymentData, setVanDeploymentData] = useState(null);
  const [pieChartData, setPieChartData] = useState([]);
  const[linechartdata,setlinechatdata]=useState([])
  const [filteredExpansion, setFilteredExpansion] = useState(formattedExpansionDemand);
  const [filteredData, setFilteredData] = useState(formattedData);
  const [filteredlineData, setFilteredlineData] = useState([]);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [fromDate1, setFromDate1] = useState(null);
  const [toDate1, setToDate1] = useState(null);
  const [fromDate2, setFromDate2] = useState(null);
  const [toDate2, setToDate2] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/live_data", {
          params: { type: "forensic_van",
            from_date:fromDate?.toISOString().split("T")[0],
          to_date:toDate?.toISOString().split("T")[0],
           },
        });

        setVanDeploymentData(response.data);
        console.log("====================================",response.data);

        console.log("Van deployment Data is:", response.data);
      } catch (error) {
        console.log("Erros occurred:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (vanDeploymentData?.status_counts) {
      // Directly use status_counts, no need to use Object.entries for an array.
      // console.log('dat dtad ============',vanDeploymentData?.status_counts)
      const transformedData = vanDeploymentData.status_counts.map(transformToPieChartData);
      // console.log('jdandbsasf',transformedData)
      setlinechatdata(vanDeploymentData?.status_counts)
      setFilteredlineData(vanDeploymentData?.status_counts)

      // setlinechatdata(transformedData)
    }
  }, [vanDeploymentData]);
  const transformToPieChartData = (data) => {
    console.log('------------------',data)
    return [
      { name: "Available", value: data?.available },
      { name: "In Use", value: data?.in_use },
      { name: "Out of Service", value: data?.out_of_service },
      { name: "Under Maintenance", value: data?.under_maintanence },
      { name: "Status", value: data?.status },
    ];
  };
  useEffect(()=>{
    if(linechartdata.length>0)
    {
setPieChartData(transformToPieChartData(linechartdata[linechartdata.length-1]))}
  },[linechartdata])
  const Clearfilter=(type)=>{
    if(type==='1')
        {
        setFromDate(null);
        setToDate(null);
        setFilteredData(formattedData)
      }
        
    if(type==='2')
      {
      setFromDate1(null);
      setToDate1(null);
      setFilteredExpansion(formattedExpansionDemand)
    }
    if(type==='3')
      {
      setFromDate2(null);
      setToDate2(null);
      setFilteredlineData(linechartdata)
    }
  }
  const filterDataByDate = (data, fromDate, toDate) => {
    if (!Array.isArray(data)) {
      console.error("filterDataByDate received non-array data:", data);
      return [];
    }
  
    console.log("Filtering data from:", fromDate, "to:", toDate);
    console.log("Raw Data:", data);
    console.log('-------------------------------------------------------------------');
  
    return data.filter((item) => {
      let itemDate = dayjs(item.month, "MMM YYYY"); // Convert to dayjs object
      let itemDatee = dayjs(item.month_year, "MMM-YYYY"); // Convert to dayjs object
      console.log('boolean',!itemDate.isValid(),!itemDatee.isValid())
      if (!itemDate.isValid()&&!itemDatee.isValid()) {
        console.error("Invalid date:", item.month);
        return false;
      }
      if(!itemDate.isValid()){itemDate=itemDatee}
      return (
        (!fromDate || itemDate.isAfter(dayjs(fromDate, "MMM YYYY").subtract(1, "month"))) &&
        (!toDate || itemDate.isBefore(dayjs(toDate, "MMM YYYY").add(1, "month")))
      );
    });
  };
  
  
useEffect(() => {
  if (fromDate || toDate) {
    console.log('11111111111111111111111111111111111111');
    
    // ICJSCaseData()
    const filteredData2 = filterDataByDate(formattedData, fromDate, toDate);
      console.log(filteredData2)

      setFilteredData(filteredData2);
     
  }
  if(fromDate1 || toDate1){
    console.log('222222222222222222222222222222222222222222222');

      
      const filteredData1 = filterDataByDate(formattedExpansionDemand, fromDate1, toDate1);
      console.log(filteredData1)
      setFilteredExpansion(filteredData1)
  }
  if(fromDate2 || toDate2){
    console.log('33333333333333333333333333333333333333333333333333333333');
    const filteredData3 = filterDataByDate(linechartdata, fromDate2, toDate2);

      setFilteredlineData(filteredData3)
      console.log(filteredData3)
      console.log('kjkkjnbbfcvtrdvst',filteredData3[filteredData3.length-1])
      setPieChartData(transformToPieChartData(filteredData3[filteredData3.length-1]))
  }
}, [fromDate, toDate,fromDate1, toDate1,fromDate2, toDate2]);

const restructureData = (type) => {
  if (type === "1") {
    const lastMonthData = filteredData[filteredData.length - 1];

    return [
      { region: "North", responseTime: lastMonthData.North },
      { region: "South", responseTime: lastMonthData.South },
      { region: "East", responseTime: lastMonthData.East },
      { region: "West", responseTime: lastMonthData.West },
    ];
  }

  if (type === "2") {
    const lastMonthData = filteredExpansion[filteredExpansion.length - 1];

    return [
      { region: "North", demand: lastMonthData.North },
      { region: "South", demand: lastMonthData.South },
      { region: "East", demand: lastMonthData.East },
      { region: "West", demand: lastMonthData.West },
    ];
  }

  return [];
};
const [dataResponseTimes,setDataResponseTimes] = useState(restructureData("1"));
const [dataExpansionDemand,setDataExpansionDemand] = useState(restructureData("2"));
  
  useEffect(() => {
    if (filteredData) {
      setDataResponseTimes(restructureData("1"))
    }
    if(filteredExpansion)
    {
      setDataExpansionDemand(restructureData("2"))
    }
  }, [filteredData,filteredExpansion]);

  return (
    <div
      className="rounded-lg w-full max-w-full h-auto"
      style={{ fontFamily: "Work Sans", maxWidth: "90.7vw" }}
    >
      <h1 className="text-2xl font-bold mb-6">
        Mobile Forensic Vans Dashboard
      </h1>
      

      {/* Image Carousel Over Van Availability */}
      {/* <div className="relative mb-6">
        <ImageCarousel />
      </div> */}

      {/* Van Availability Table */}

      <div className="relative mb-6">
        <VanAvailability vanData={vanDeploymentData?.data} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        
        <div className="bg-white p-4 rounded-lg shadow-md">
       <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold mb-4">Monthly Response Time by Region</h2>
      
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
                  onClick={() => Clearfilter('1')}
                  className="bg-blue-500 text-white px-3 py-1 rounded-md "
                  style={{ backgroundColor: "#2d3748" }}>
                  Clear
                </button>
              </div>
      
            </div>
          </LocalizationProvider>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={filteredData}>
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
              value: "Response Time (mins)",
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

          {/* Dynamic Lines for Each Region */}
          {["North", "South", "East", "West"].map((region, index) => (
            <Line
              key={region}
              type="monotone"
              dataKey={region}
              stroke={chartColors[index]}
              strokeWidth={3}
              dot={{ r: 5 }}
              name={region}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
        {/* Response Times Bar Chart */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            Response Times by Region 
          </h2>
          <p><strong>Recent Entry:</strong>{filteredData[filteredData.length-1]?.month}</p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dataResponseTimes}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="region" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="responseTime" fill="#8884d8" barSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
       <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold mb-4">Monthly Expansion Demand by Region</h2>
                  <div className="flex items-center gap-4">
                <div>
                  
                  <DatePicker
                  label='From'
                    views={["year", "month"]}
                    value={fromDate1}
                    onChange={setFromDate1}
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
                    value={toDate1}
                    onChange={setToDate1}
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
                  onClick={() => Clearfilter('2')}
                  className="bg-blue-500 text-white px-3 py-1 rounded-md "
                  style={{ backgroundColor: "#2d3748" }}>
                  Clear
                </button>
              </div>
      
            </div>
          </LocalizationProvider>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={filteredExpansion}>
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
              value: "Expansion Demand",
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

          {/* Dynamic Lines for Each Region */}
          {["North", "South", "East", "West"].map((region, index) => (
            <Line
              key={region}
              type="monotone"
              dataKey={region}
              stroke={chartColors[index]}
              strokeWidth={3}
              dot={{ r: 5 }}
              name={region}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
        {/* Expansion Demand Bar Chart */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            Expansion Demand by Region
          </h2>
          <p><strong>Recent Entry:</strong>{filteredExpansion[filteredExpansion.length-1]?.month}</p>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dataExpansionDemand}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="region" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="demand" fill="#82ca9d" barSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
       <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold mb-4">Monthly Van Availability</h2>
      
                  <div className="flex items-center gap-4">
                <div>
                  
                  <DatePicker
                  label='From'
                    views={["year", "month"]}
                    value={fromDate2}
                    onChange={setFromDate2}
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
                    value={toDate2}
                    onChange={setToDate2}
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
                  onClick={() => Clearfilter('3')}
                  className="bg-blue-500 text-white px-3 py-1 rounded-md "
                  style={{ backgroundColor: "#2d3748" }}>
                  Clear
                </button>
              </div>
      
            </div>
          </LocalizationProvider>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={filteredlineData}>
          <XAxis
            dataKey="month_year"
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
              value: "Van Availability ",
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

          {/* Dynamic Lines for Each Region */}
           {  ["available","in_use","out_of_service","under_aintenance","status"].map((region, index) => ( 

            <Line
              key={region}
              type="monotone"
              dataKey={region}
              stroke={chartColors[index]}
              strokeWidth={3}
              dot={{ r: 5 }}
              name={region}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
        {/* Availability Pie Chart */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Van Availability</h2>
          <p><strong>Recent Entry:</strong>{filteredlineData[filteredlineData.length-1]?.month_year}</p>
 
          <ResponsiveContainer width="100%" height={300}>
  <PieChart>
    <Pie
      data={pieChartData}
      cx="50%"
      cy="50%"
      outerRadius={80}
      fill="#8884d8"
      dataKey="value"
      label={({ name, percent }) => ` ${(percent * 100).toFixed(1)}%`}

    >
      {pieChartData && pieChartData.length > 0 && pieChartData.map((entry, index) => (
        <Cell
          key={`cell-${index}`}
          fill={chartColors[index % chartColors.length]}
        />
      ))}
    </Pie>
    <Tooltip />
    {/* <Legend verticalAlign="middle" align="right" layout="vertical" /> */}
    <Legend />

  </PieChart>
</ResponsiveContainer>

        </div>
      </div>
    </div>
  );
}
