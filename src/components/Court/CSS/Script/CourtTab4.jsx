import React, { useRef, useState, useEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import axiosInstance from "../../../../utils/axiosInstance";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";

const CourtRefDetails = `Generated Summary:
2024 witnessed significant advancements and improvements in the legal system, as evidenced by the analysis of key metrics such as eSummons deliveries electronically, total cases, case resolution times, backlog reduction, and adoption rate.

 eSummons Delivered Electronically: There was a notable increase in eSummons deliveries throughout 2024, indicating a shift toward digitalization, streamlining the summons process, and reducing paper usage.

 Total Cases: The total number of cases fluctuated over the year, increasing in the early months due to accessibility and awareness but declining mid-year due to improved preventive measures.

 Pending vs. Disposed Cases: Pending cases remained stable, while disposed cases increased, reflecting a more efficient legal system.

 Average Resolution Time: A downward trend in resolution time suggests streamlined workflows, judicial efficiency, and proactive case management.

 Backlog Reduction: With steady case disposal, backlog reduction improved significantly throughout 2024.

 Adoption Rate: Increased confidence in the system resulted in greater adoption of digital legal processes, boosting overall efficiency.

🔹 In summary, the legal system in 2024 became more efficient with the adoption of digital tools and backlog reduction. The ongoing improvements indicate a commitment to modernization, streamlined case management, and accessibility enhancements.`;

const responseTimeData = [
  { month: "Jan", responseTime: 5 },
  { month: "Feb", responseTime: 6 },
  { month: "Mar", responseTime: 4 },
  { month: "Apr", responseTime: 3 },
  { month: "May", responseTime: 7 },
  { month: "Jun", responseTime: 5 },
  { month: "Jul", responseTime: 4 },
  { month: "Aug", responseTime: 3 },
  { month: "Sep", responseTime: 6 },
  { month: "Oct", responseTime: 5 },
  { month: "Nov", responseTime: 4 },
  { month: "Dec", responseTime: 3 },
];

// Colors for Pie chart segments
const COLORS = [
  "#8884d8", // Muted Purple
  "#82ca9d", // Soft Green
  "#f2c57c", // Warm Sand
  "#6a8caf", // Steel Blue
  "#d4a5a5", // Soft Rose
  "#a28bd3", // Lavender
  "#ff9a76", // Muted Coral
  "#74b49b", // Muted Teal
  "#c08497", // Mauve
  "#b0a8b9", // Dusty Lilac
];
import Courtform from "./Courtform.jsx";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
 
const CourtTab4 = () => {
  const exportRef = useRef(null); // Reference to content to be exported
  const [forensicData, setForensicData] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [fromDate2, setFromDate2] = useState(null);
  const [toDate2, setToDate2] = useState(null);
  const [fromDate3, setFromDate3] = useState(null);
  const [toDate3, setToDate3] = useState(null);
  const[filteredData,setFiltereddata]=useState([])
  const[filteredData2,setFiltereddata2]=useState([])
  const[filteredData3,setFiltereddata3]=useState([])

  
  const fetchForensicData = async () => {
    try {
      const response = await axiosInstance.get("/live_data", {
        params: {
          type: "court_4",
          from_date:fromDate?.toISOString().split("T")[0],
          to_date:toDate?.toISOString().split("T")[0],
        },
      });
      const responseData = response.data;
      setForensicData(responseData.data_dict);
      setFiltereddata(responseData.data_dict)
      setFiltereddata2(responseData.data_dict)
      setFiltereddata3(responseData.data_dict)
    } catch (error) {
      console.error("Some error occured", error);
    }
  };
  useEffect(() => {
    fetchForensicData();
  }, []);
    const ClearFilter=(type)=>{
      if(type==='1')
     { setFromDate(null);
      setToDate(null);
      setFiltereddata(forensicData)}
      if(type==='2')
        { setFromDate2(null);
         setToDate2(null);
         setFiltereddata2(forensicData)}
         if(type==='3')
          { setFromDate3(null);
           setToDate3(null);
           setFiltereddata3(forensicData)}

    }
    
    // useEffect(() => {
    //   if(fromDate||toDate)
    //   {
    //     fetchForensicData();}
    // }, [fromDate,toDate]);

const filterDataByDate = (data, fromDate, toDate) => {
          if (!Array.isArray(data)) {
            console.error("filterDataByDate received non-array data:", data);
            return [];
          }
        
          return data.filter((item) => {
            const itemDate = dayjs(item.month, "YYYY-MM");
        
            return (
              (!fromDate || itemDate.isAfter(dayjs(fromDate).subtract(1, "month"))) &&
              (!toDate || itemDate.isBefore(dayjs(toDate).add(1, "month")))
            );
          });
        };
     useEffect(() => {
          if (fromDate || toDate) {
            console.log("111111111111111111111111111111111");
            
            // ICJSCaseData()
              const filteredData = filterDataByDate(forensicData, fromDate, toDate);
              console.log("Filtered Data:", filteredData);
              setFiltereddata(filteredData);
          }
        }, [fromDate, toDate]);
        useEffect(() => {
          if (fromDate2 || toDate2) {
            console.log('22222222222222222222222222222222222222222');
            
            // ICJSCaseData()
              const filteredData = filterDataByDate(forensicData, fromDate2, toDate2);
              console.log("Filtered Data:", filteredData);
              setFiltereddata2(filteredData);
          }
        }, [fromDate2, toDate2]);
        useEffect(() => {
          if (fromDate3 || toDate3) {
            console.log("3333333333333333333333333333333333333333333333333333");
            
            // ICJSCaseData()
              const filteredData = filterDataByDate(forensicData, fromDate3, toDate3);
              console.log("Filtered Data:", filteredData);
              setFiltereddata3(filteredData);
          }
        }, [fromDate3, toDate3]);
  const [showModal, setShowModal] = useState(false);

  const handleExport = async () => {
    const pdf = new jsPDF("p", "mm", "a4");
    const margin = 10;
    let yPosition = 20;

    //  Capture the chart section as an image
    if (exportRef.current) {
      const canvas = await html2canvas(exportRef.current, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");

      const imgWidth = 180; // Fit width
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", margin, yPosition, imgWidth, imgHeight);
      yPosition += imgHeight + 10;
    }

    //  Separator Line
    pdf.setDrawColor(0);
    pdf.line(10, yPosition, 200, yPosition);
    yPosition += 10;

    //  Add CourtRefDetails text to PDF
    pdf.setFontSize(14);
    pdf.setFont("helvetica", "bold");
    pdf.text("Court System Analysis (2024)", margin, yPosition);
    yPosition += 6;

    pdf.setFontSize(11);
    pdf.setFont("helvetica", "normal");

    const courtText = pdf.splitTextToSize(CourtRefDetails, 180);
    let linesPerPage = 40;
    let currentPage = 1;

    courtText.forEach((line, index) => {
      if (yPosition > 270) {
        pdf.addPage();
        currentPage++;
        yPosition = 20;
      }
      pdf.text(line, margin, yPosition);
      yPosition += 6;
    });

    //  Save the PDF
    pdf.save("Prosecution & Forensic Departments Dashboard.pdf");
  };

  const forensicDataUsageData = [
    {
      name: "Used Forensic Data",
      value: parseInt(
        filteredData2?.[0]?.percentage_of_cases_using_forensic_data || 0
      ),
    },
    {
      name: "Did Not Use Forensic Data",
      value: parseInt(
        100 - filteredData2?.[0]?.percentage_of_cases_using_forensic_data || 0
      ),
    },
  ];

  const casesForensicData = filteredData2?.map((item) => ({
    month: new Date(item.month).toLocaleString("en-US", {
      month: "short",
      year: "numeric",
    }),
    used: item?.percentage_of_cases_using_forensic_data,
    notUsed: 100 - item?.percentage_of_cases_using_forensic_data,
  })).sort((a, b) => new Date(a.month) - new Date(b.month));

  const responseTimeData = filteredData3?.map((item) => ({
    month: new Date(item.month).toLocaleString("en-US", {
      month: "short",
      year: "numeric",
    }),
    responseTime: item?.response_time_for_evidence_retrieval,
  })).sort((a, b) => new Date(a.month) - new Date(b.month));

  const dataSharingEffectiveData = filteredData?.map((item) => ({
    month: new Date(item.month).toLocaleString("en-US", {
      month: "short",
      year: "numeric",
    }),
    Judicial: item?.judicial_effectiveness,
    Prosecution: item?.prosecution_effectiveness,
    Forensic: item?.forensic_effectiveness,
  })).sort((a, b) => new Date(a.month) - new Date(b.month));

  const recentdataSharingEffectiveData = [
    {
      name: "Judicial",
      value: parseInt(filteredData?.[0]?.judicial_effectiveness || 0),
    },
    {
      name: "Prosecution",
      value: parseInt(filteredData?.[0]?.prosecution_effectiveness || 0),
    },
    {
      name: "Forensic",
      value: parseInt(filteredData?.[0]?.forensic_effectiveness || 0),
    },
  ];
  const recentEntryDate = (data) => {
    if (!data || data.length === 0) return null; // Handle empty or undefined data
    
    // Extract month and year from the first entry
    const monthYearString = data[0]?.month; // Example: "Jun 2024"
    
    if (!monthYearString) return null;
  
    // Convert to a Date object (assuming the first day of the month)
    const date = new Date(`${monthYearString} 1`);
  
    // Format to "MMM YYYY" (e.g., "Jun 2024")
    return date.toLocaleString("en-US", { month: "short", year: "numeric" });
  };

  return (
    <div className="rounded-lg w-full max-w-full h-auto">
      <div className="ContentSpace">
        <h1 className="text-2xl font-bold mb-6">
          Prosecution & Forensic Departments Dashboard
        </h1>
        <div className="flex space-x-2">
          <button className="ExportButton" onClick={handleExport}>
            Export
          </button>
          {localStorage.getItem("role") !== "chief secretary" && (
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              style={{ backgroundColor: "#2d3748" }}
              onClick={() => {
                console.log("Open modal");
                setShowModal(true);
              }}
            >
              Add on
            </button>
          )}
        </div>
      </div>
     
      <div ref={exportRef}>
        <div className="bg-white rounded-lg w-full max-w-full h-auto mb-6 p-4">
        <h1 className="text-2xl font-bold">Deviation</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-xl shadow-md">
              
              <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div className="flex justify-between items-center mb-4">
                
              <h3 className="text-xl font-semibold mb-4">
                Data-Sharing Effectivness
              </h3>
    
          
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
                      onClick={()=>ClearFilter('1')} 
                      className="bg-blue-500 text-white px-3 py-1 rounded-md "
                      style={{ backgroundColor: "#2d3748" }}>
                      Clear
                    </button>
                  </div>
                  </div>

          
               
              </LocalizationProvider>

              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dataSharingEffectiveData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" label={{ value: 'Time Period', position: 'center', dy: 10 }}/>
                  <YAxis label={{ value: 'Count', angle: -90, position: 'center', dx: -30 }}/>
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="Judicial"
                    stroke="#8884d8"
                    name="Judicial"
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="Prosecution"
                    stroke="#82ca9d"
                    name="Prosecution"
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="Forensic"
                    stroke="#f2c57c"
                    name="Forensic"
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-md">
              
              <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold mb-4">
                Cases Using Forensic Data
              </h3>
    
          
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
                      onClick={()=>ClearFilter('2')} 
                      className="bg-blue-500 text-white px-3 py-1 rounded-md "
                      style={{ backgroundColor: "#2d3748" }}>
                      Clear
                    </button>
                  </div>
                  </div>

          
               
              </LocalizationProvider>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={casesForensicData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" label={{ value: 'Time Period', position: 'center', dy: 10 }}/>
                  <YAxis label={{ value: 'Count', angle: -90, position: 'center', dx: -30 }}/>
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="used"
                    stroke="#8884d8"
                    name="Used Forensic Data"
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="notUsed"
                    stroke="#82ca9d"
                    name="Not Used Forensic Data"
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg w-full max-w-full h-auto mb-6 p-4">
          <h1 className="text-2xl font-bold">
            Recent Entry 
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Effectiveness of Data Sharing Mechanisms (Bar Chart) */}

            <div className="bg-white p-4 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-4">
                Effectiveness of Data-Sharing Mechanisms
              </h3>
              <p>
                <strong>Recent Entry:</strong>{recentEntryDate(filteredData)}
              </p>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Tooltip />
                  <Legend />
                  <Pie
                    data={recentdataSharingEffectiveData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    fill="#8884d8"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                  >
                    {recentdataSharingEffectiveData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            {/* Percentage of Cases Using Forensic Data (Pie Chart) */}
            <div className="bg-white p-4 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-4">
                Percentage of Cases Using Forensic Data
              </h3>
              <p>
                <strong>Recent Entry:</strong>{recentEntryDate(filteredData2)}
              </p>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Tooltip />
                  <Legend />
                  <Pie
                    data={forensicDataUsageData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    fill="#8884d8"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                  >
                    {forensicDataUsageData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg w-full max-w-full h-auto mb-6 p-4">
          <h1 className="text-2xl font-bold">Deviation With Recent Entry</h1>
          {/* Response Time for Evidence Retrieval (Line Chart) */}
          <div className="bg-white p-4 rounded-xl shadow-md">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div className="flex justify-between items-center mb-4">
                
            <h3 className="text-xl font-semibold">
                Response Time for Evidence Retrieval
              </h3>
    
          
                  <div className="flex items-center gap-4">
                    <div>
                        
                      <DatePicker
                      label='From'
                        views={["year", "month"]}
                        value={fromDate3}
                        onChange={setFromDate3}
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
                        value={toDate3}
                        onChange={setToDate3}
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
                      onClick={()=>ClearFilter('3')} 
                      className="bg-blue-500 text-white px-3 py-1 rounded-md "
                      style={{ backgroundColor: "#2d3748" }}>
                      Clear
                    </button>
                  </div>
                  </div>

          
               
              </LocalizationProvider>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={responseTimeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" label={{ value: 'Time Period', position: 'center', dy: 10 }}/>
                <YAxis label={{ value: 'Evidence Retrived', angle: -90, position: 'center', dx: -30 }}/>
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="responseTime"
                  stroke="#FF6347"
                  activeDot={{ r: 8 }}
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <Courtform
        open={showModal}
        type="court_4"
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default CourtTab4;
