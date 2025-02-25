// import React, { useState, useEffect } from "react";
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
// import axiosInstance from "../../../utils/axiosInstance";
// import dayjs from "dayjs";

// export default function Tabledata({setData,to,from}) {
//   const [forensicDevelopmentData, setForensicDevelopmentData] = useState(null);
//   const[filteredData,setFiltereddata]=useState([])
  
//   const fetchData = async () => {
//     try {
//       const response = await axiosInstance.get("/live_data", {
//         params: { type: "forensic_dev",
//           from_date:from?.toISOString().split("T")[0],
//         to_date:to?.toISOString().split("T")[0],
//          },
//       });

//       // Process data to parse strings with commas into numbers
//       const processedData = response.data.map((item) => ({
//         ...item,
//         disposal_cases: parseInt(item.disposal_cases.replace(/,/g, ""), 10),
//         disposal_exhibits: parseInt(item.disposal_exhibits.replace(/,/g, ""), 10),
//         earlier_pending: parseInt(item.earlier_pending.replace(/,/g, ""), 10),
//         earlier_pending_exhibits: parseInt(item.earlier_pending_exhibits.replace(/,/g, ""), 10),
//         pending_cases: parseInt(item.pending_cases.replace(/,/g, ""), 10),
//         pending_exhibits: parseInt(item.pending_exhibits.replace(/,/g, ""), 10),
//         received_cases: parseInt(item.received_cases.replace(/,/g, ""), 10),
//         received_exhibits: parseInt(item.received_exhibits.replace(/,/g, ""), 10),
//       }));
//       let data=processedData.reverse()

//       setForensicDevelopmentData(processedData);
//       setFiltereddata(processedData)
//       console.log('recent data',processedData)
//       setData(processedData[processedData?.length -1])
//       console.log("Pendancy Data is:", processedData[0]);
//     } catch (error) {
//       console.log("Errors occurred:", error);
//     }
//   };
//   useEffect(() => {
//     fetchData();
//   }, []);
//   const filterDataByDate = (data, fromDate, toDate) => {
//     // if (!Array.isArray(data)) {
//     //   console.error("filterDataByDate received non-array data:", data);
//     //   return [];
//     // }
  
//     return data.filter((item) => {
//       const itemDate = dayjs(item.month, "YYYY-MM");
  
//       return (
//         (!fromDate || itemDate.isAfter(dayjs(fromDate).subtract(1, "month"))) &&
//         (!toDate || itemDate.isBefore(dayjs(toDate).add(1, "month")))
//       );
//     });
//   };
// useEffect(() => {
//     if (from || to) {
//       console.log("Filtering data for dates:", from, to);
      
//       // ICJSCaseData()
//         const filteredData = filterDataByDate(forensicDevelopmentData, from, to);
//         console.log("Filtered Data:", filteredData);
//         setFiltereddata(filteredData);
//     }
//     else{setFiltereddata(forensicDevelopmentData)}
//   }, [to, from]);


//   const chartColors = [
//     "#8884d8", // Muted Purple
//     "#82ca9d", // Soft Green
//     "#f2c57c", // Warm Sand
//     "#6a8caf", // Steel Blue
//     "#d4a5a5", // Soft Rose
//     "#a28bd3", // Lavender
//     "#ff9a76", // Muted Coral
//     "#74b49b"  // Muted Teal
//   ];

//   return (
//     <div className="mt-6">
//       <div className="bg-white p-4 rounded-xl mt-6">
//         <h2 className="text-xl font-semibold mb-4">Monthly Cases & Exhibits Overview</h2>
//         <ResponsiveContainer width="100%" height={400}>
//           <LineChart data={filteredData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="month" />
//             <YAxis  
//             />
//             <Tooltip />
//             <Legend />
//             {/* Lines for each category */}
//             <Line type="monotone" dataKey="disposal_cases" stroke={chartColors[0]} name="Disposal Cases" />
//             <Line type="monotone" dataKey="disposal_exhibits" stroke={chartColors[1]} name="Disposal Exhibits" />
//             <Line type="monotone" dataKey="earlier_pending" stroke={chartColors[2]} name="Earlier Pending Cases" />
//             <Line type="monotone" dataKey="earlier_pending_exhibits" stroke={chartColors[3]} name="Earlier Pending Exhibits" />
//             <Line type="monotone" dataKey="pending_cases" stroke={chartColors[4]} name="Pending Cases" />
//             <Line type="monotone" dataKey="pending_exhibits" stroke={chartColors[5]} name="Pending Exhibits" />
//             <Line type="monotone" dataKey="received_cases" stroke={chartColors[6]} name="Received Cases" />
//             <Line type="monotone" dataKey="received_exhibits" stroke={chartColors[7]} name="Received Exhibits" />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// }






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
import axiosInstance from "../../../utils/axiosInstance";
import dayjs from "dayjs";

export default function Tabledata({ setData, to, from }) {
  const [forensicDevelopmentData, setForensicDevelopmentData] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [hiddenLines, setHiddenLines] = useState({});

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/live_data", {
        params: {
          type: "forensic_dev",
          from_date: from?.toISOString().split("T")[0],
          to_date: to?.toISOString().split("T")[0],
        },
      });

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

      setForensicDevelopmentData(processedData);
      setFilteredData(processedData);
      setData(processedData[processedData.length - 1]);
    } catch (error) {
      console.log("Errors occurred:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filterDataByDate = (data, fromDate, toDate) => {
    return data.filter((item) => {
      const itemDate = dayjs(item.month, "YYYY-MM");
      return (
        (!fromDate || itemDate.isAfter(dayjs(fromDate).subtract(1, "month"))) &&
        (!toDate || itemDate.isBefore(dayjs(toDate).add(1, "month")))
      );
    });
  };

  useEffect(() => {
    if (from || to) {
      const filteredData = filterDataByDate(forensicDevelopmentData, from, to);
      setFilteredData(filteredData);
    } else {
      setFilteredData(forensicDevelopmentData);
    }
  }, [to, from]);

  const chartColors = [
    "#8884d8", // Muted Purple
    "#82ca9d", // Soft Green
    "#f2c57c", // Warm Sand
    "#6a8caf", // Steel Blue
    "#d4a5a5", // Soft Rose
    "#a28bd3", // Lavender
    "#ff9a76", // Muted Coral
    "#74b49b", // Muted Teal
  ];

  const lines = [
    { key: "disposal_cases", name: "Disposal Cases" },
    { key: "disposal_exhibits", name: "Disposal Exhibits" },
    { key: "earlier_pending", name: "Earlier Pending Cases" },
    { key: "earlier_pending_exhibits", name: "Earlier Pending Exhibits" },
    { key: "pending_cases", name: "Pending Cases" },
    { key: "pending_exhibits", name: "Pending Exhibits" },
    { key: "received_cases", name: "Received Cases" },
    { key: "received_exhibits", name: "Received Exhibits" },
  ];

  // Toggle visibility of a line
  const handleLegendClick = (dataKey) => {
    setHiddenLines((prev) => ({
      ...prev,
      [dataKey]: !prev[dataKey],
    }));
  };

  return (
    <div className="p-0">
    <div className="mt-6">
      <div className="bg-white p-4 rounded-xl mt-6">
        <h2 className="text-xl font-semibold mb-4">Monthly Cases & Exhibits Overview</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" 
            label={{
              value: "Month/Year Time period",
              position: "insideBottom",
              offset: -18,
            }}
            tick={{ fontSize: 12 }}
             />
            <YAxis 
            label={{
              value: "No of categories",
              angle: -90,
              position: "insideLeft",
              offset: 0,
              style: { textAnchor: "middle" },
            }}
            tick={{ fontSize: 11 }}
            />
            <Tooltip />
            {/* <Legend
              onClick={(e) => handleLegendClick(e.dataKey)}
              wrapperStyle={{ cursor: "pointer" }}
              formatter={(value) => (
                <span
                  style={{
                    textDecoration: hiddenLines[value] ? "line-through" : "none",
                    color: hiddenLines[value] ? "gray" : "black",
                    cursor: "pointer",
                  }}
                >
                  {value}
                </span>
              )}
            /> */}
            <Legend
  onClick={(e) => handleLegendClick(e.dataKey)} // Ensure correct line is toggled
  layout="horizontal"
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{
                  position: "relative",
                  marginTop: -25, // Adjust this value to move it further down
                }}
  formatter={(value, entry) => {
    return (
      <span
        style={{
          textDecoration: hiddenLines[entry.dataKey] ? "line-through" : "none",
          color: hiddenLines[entry.dataKey] ? "gray" : "black",
          cursor: "pointer",
        }}
      >
        {lines.find((line) => line.key === entry.dataKey)?.name || value}
      </span>
    );
  }}
/>


            {lines.map((line, index) => (
              <Line
                key={line.key}
                type="monotone"
                dataKey={line.key}
                stroke={chartColors[index]}
                name={line.name}
                hide={hiddenLines[line.key]} // This hides only the line, not the legend
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
    </div>
  );
}
