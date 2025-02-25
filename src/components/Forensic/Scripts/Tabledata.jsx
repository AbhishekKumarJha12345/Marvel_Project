import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import axiosInstance from "../../../utils/axiosInstance";

// import { toDate } from "date-fns";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
export default function Tabledata({setData,to,from}) {
  console.log('porps data',to,from)
  const [forensicDevelopmentData, setForensicDevelopmentData] = useState(null);
  const[filteredData,setFiltereddata]=useState([])
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/live_data", {
        params: { type: "forensic_dev",
          from_date:from?.toISOString().split("T")[0],
        to_date:to?.toISOString().split("T")[0],
         },
      });

      // Process data to parse strings with commas into numbers
      const processedData = response.data.map((item) => ({
        ...item,
        disposal_cases: parseInt(item.disposal_cases.replace(/,/g, ""), 10),
        disposal_exhibits: parseInt(item.disposal_exhibits.replace(/,/g, ""), 10),
        earlier_pending: parseInt(item.earlier_pending.replace(/,/g, ""), 10),
        earlier_pending_exhibits: parseInt(item.earlier_pending_exhibits.replace(/,/g, ""), 10),
        pending_cases: parseInt(item.pending_cases.replace(/,/g, ""), 10),
        pending_exhibits: parseInt(item.pending_exhibits.replace(/,/g, ""), 10),
        received_cases: parseInt(item.received_cases.replace(/,/g, ""), 10),
        received_exhibits: parseInt(item.received_exhibits.replace(/,/g, ""), 10),
      }));
      let data=processedData.reverse()

      setForensicDevelopmentData(processedData);
      setFiltereddata(processedData)
      console.log('recent data',processedData)
      setData(processedData[processedData?.length -1])
      console.log("Pendancy Data is:", processedData[0]);
    } catch (error) {
      console.log("Errors occurred:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const Clearfilter=()=>{
    setFromDate(null);
    setToDate(null);
    setData(filteredData[filteredData?.length-1])
  }
  const filterDataByDate = (data, fromDate, toDate) => {
    if (!Array.isArray(data)) {
      console.error("filterDataByDate received non-array data:", data);
      return [];
    }
    console.log('---------------------------data tpo be filtered------------------------')
    console.log(data)
    return data.filter((item) => {
      const itemDate = dayjs(item.month, "MMM/YY");
  
      return (
        (!fromDate || itemDate.isAfter(dayjs(fromDate).subtract(1, "month"))) &&
        (!toDate || itemDate.isBefore(dayjs(toDate).add(1, "month")))
      );
    });
  };
useEffect(() => {
    if (fromDate || toDate) {
      console.log("Filtering data for dates:", fromDate, toDate);
      
      // ICJSCaseData()
        const filteredData = filterDataByDate(forensicDevelopmentData, fromDate, toDate);
        console.log("Filtered Data:", filteredData);
        setFiltereddata(filteredData);
        setData(filteredData[filteredData?.length-1])
    }
    else{setFiltereddata(forensicDevelopmentData);
      setData(filteredData[filteredData?.length-1])

    }
  }, [toDate, fromDate]);


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

  return (
    <div className="mt-6">
      <div className="bg-white p-4 rounded-xl mt-6">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold mb-4">Monthly Cases & Exhibits Overview</h2>
               
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
          <LineChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis  
            />
            <Tooltip />
            <Legend />
            {/* Lines for each category */}
            <Line type="monotone" dataKey="disposal_cases" stroke={chartColors[0]} name="Disposal Cases" />
            <Line type="monotone" dataKey="disposal_exhibits" stroke={chartColors[1]} name="Disposal Exhibits" />
            <Line type="monotone" dataKey="earlier_pending" stroke={chartColors[2]} name="Earlier Pending Cases" />
            <Line type="monotone" dataKey="earlier_pending_exhibits" stroke={chartColors[3]} name="Earlier Pending Exhibits" />
            <Line type="monotone" dataKey="pending_cases" stroke={chartColors[4]} name="Pending Cases" />
            <Line type="monotone" dataKey="pending_exhibits" stroke={chartColors[5]} name="Pending Exhibits" />
            <Line type="monotone" dataKey="received_cases" stroke={chartColors[6]} name="Received Cases" />
            <Line type="monotone" dataKey="received_exhibits" stroke={chartColors[7]} name="Received Exhibits" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
