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
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
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

// Custom colors for visualization
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
  "#b0a8b9", // Dusty Lilac
];

import Courtform from "./Courtform.jsx";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
 
const CourtTab5 = () => {
  const exportRef = useRef(null); // Reference to content to be exported
  const [implementationData, setImplementationData] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const[filteredData,setFiltereddata]=useState([])
  const fetchImplementationData = async () => {
    try {
      const response = await axiosInstance.get("/live_data", {
        params: {
          type: "court_5",
          from_date:fromDate?.toISOString().split("T")[0],
          to_date:toDate?.toISOString().split("T")[0],
        },
      });
      const responseData = response.data;
      setImplementationData(responseData.data_dict);
      setFiltereddata(responseData.data_dict)
    } catch (error) {
      console.error("Some error occured", error);
    }
  };
  useEffect(() => {
    fetchImplementationData();
  }, []);
      const Clearfilter=()=>{
        setFromDate(null);
        setToDate(null);
        setFiltereddata(implementationData)
      }
      
      // useEffect(() => {
      //   if(fromDate||toDate)
      //   {
      //     fetchImplementationData();}
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
                  console.log("Filtering data for dates:", fromDate, toDate);
                  
                  // ICJSCaseData()
                    const filteredData = filterDataByDate(implementationData, fromDate, toDate);
                    console.log("Filtered Data:", filteredData);
                    setFiltereddata(filteredData);
                }
              }, [fromDate, toDate]);
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
    pdf.save("NYAYSHRUTI Project Implementation Progress.pdf");
  };

  const deploymentStatusData = [
    {
      name: "Planning",
      value: parseInt(filteredData?.[0]?.planning || 0),
    },
    {
      name: "Development",
      value: parseInt(filteredData?.[0]?.development || 0),
    },
    {
      name: "Testing",
      value: parseInt(filteredData?.[0]?.testing || 0),
    },
    {
      name: "Implementation",
      value: parseInt(filteredData?.[0]?.implementation || 0),
    },
  ];

  const speechToTextIntegrationData = filteredData?.map((item) => ({
    month: new Date(item.month).toLocaleString("en-US", {
      month: "short",
      year: "numeric",
    }),
    progress: parseInt(item.ai_transcription_integration || 0),
  })).sort((a, b) => new Date(a.month) - new Date(b.month));

  const monthlyUserFeedbackData = filteredData?.map((item) => ({
    month: new Date(item.month).toLocaleString("en-US", {
      month: "short",
      year: "numeric",
    }),
    Judges: item.judges_feedback,
    "Legal Professionals": item.legal_professionals_feedback,
    "Administrative Staff": item.administrative_staff_feedback,
  })).sort((a, b) => new Date(a.month) - new Date(b.month));

  const latestFeedbackData = [
    {
      name: "Judges",
      value: parseInt(filteredData?.[0]?.judges_feedback || 0),
    },
    {
      name: "Legal Professionals",
      value: parseInt(
        filteredData?.[0]?.legal_professionals_feedback || 0
      ),
    },
    {
      name: "Administrative Staff",
      value: parseInt(
        filteredData?.[0]?.administrative_staff_feedback || 0
      ),
    },
  ];

  const monthlyProgressData = filteredData?.map((item) => ({
    month: new Date(item.month).toLocaleString("en-US", {
      month: "short",
      year: "numeric",
    }),
    Planning: parseInt(item.planning || 0),
    Development: parseInt(item.development || 0),
    Testing: parseInt(item.testing || 0),
    Implementation: parseInt(item.implementation || 0),
  })).sort((a, b) => new Date(a.month) - new Date(b.month));

  const recentEntryDate = new Date(
    filteredData?.[0]?.month
  ).toLocaleString("en-US", {
    month: "short",
    year: "numeric",
  });
  return (
    <div className="rounded-lg w-full max-w-full h-auto">
      <div className="ContentSpace">
        <h1 className="text-2xl font-bold mb-6">
          NYAYSHRUTI Project Implementation Progress
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
        <div className="rounded-lg w-full max-w-full h-auto mb-6 p-4">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <div className="flex justify-between items-center mb-4">
                        
                      <h1 className="text-2xl font-bold">Deviation</h1>
          
                
                        {/* <div className="flex items-center gap-4">
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
                            Clear Filter
                          </button>
                        </div> */}
                
                      </div>
                    </LocalizationProvider>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-4">
                Monthly Progress of Deployment Status & Impact on Judicial
                Processes
              </h3>

              <div className="rounded-lg w-full max-w-full h-auto mb-6 p-4">


              <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <div className="flex justify-between items-center mb-4">
                        
                      {/* <h1 className="text-2xl font-bold">Deviation</h1> */}
          
                
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
                            Clear Filter
                          </button>
                        </div>
                
                      </div>
                    </LocalizationProvider>
                    </div>





              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyProgressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" label={{ value: 'Time Period', position: 'center', dy: 10 }}/>
                  <YAxis label={{ value: 'Count', angle: -90, position: 'center', dx: -30 }}/>
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="Planning"
                    stroke={chartColors[0]}
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="Development"
                    stroke={chartColors[1]}
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="Testing"
                    stroke={chartColors[2]}
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="Implementation"
                    stroke={chartColors[3]}
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-4">
                User Adoption & Feedback
              </h3>
              <div className="rounded-lg w-full max-w-full h-auto mb-6 p-4">




              <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <div className="flex justify-between items-center mb-4">
                        
                      {/* <h1 className="text-2xl font-bold">Deviation</h1> */}
          
                
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
                            Clear Filter
                          </button>
                        </div>
                
                      </div>
                    </LocalizationProvider>
                    </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyUserFeedbackData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" label={{ value: 'Time Period', position: 'center', dy: 10 }}/>
                  <YAxis label={{ value: 'Count', angle: -90, position: 'center', dx: -30 }}/>
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="Judges"
                    stroke="#8884d8"
                    name="Judges"
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="Legal Professionals"
                    stroke="#82ca9d"
                    name="Legal Professionals"
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="Administrative Staff"
                    stroke="#f2c57c"
                    name="Administrative Staff"
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className=" rounded-lg w-full max-w-full h-auto mb-6 p-4">
          <h1 className="text-2xl font-bold">
            Recent Entry : {recentEntryDate}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Deployment Status and Impact on Judicial Processes (Stacked Bar Chart) */}
            <div className="bg-white p-4 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-4">
                Deployment Status & Impact on Judicial Processes
              </h3>

              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Tooltip />
                  <Legend />
                  <Pie
                    data={deploymentStatusData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    fill="#8884d8"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                  >
                    {deploymentStatusData?.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={chartColors[index % chartColors.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-4">
                User Adoption & Feedback
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Tooltip />
                  <Legend />
                  <Pie
                    data={latestFeedbackData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    fill="#8884d8"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                  >
                    {latestFeedbackData?.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={chartColors[index % chartColors.length]}
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
          {/* Integration of Speech-to-Text & AI Transcription (Line Chart) */}
          <div className="p-4 rounded-xl">
            <h3 className="text-xl font-semibold mb-4"></h3>
            <div className="mb-4 flex flex-row justify-between items-center">
              <h3 className="text-xl font-semibold">
                Speech-to-Text & AI Transcription Integration
              </h3>
              <h4 className="text-xl font-semibold">{`${recentEntryDate}: ${speechToTextIntegrationData?.[speechToTextIntegrationData.length - 1]?.progress}`}</h4>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={speechToTextIntegrationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" label={{ value: 'Time Period', position: 'center', dy: 10 }}/>
                <YAxis label={{ value: 'Count', angle: -90, position: 'center', dx: -30 }}/>
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="progress"
                  stroke={chartColors[1]}
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <Courtform
        open={showModal}
        type="court_5"
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default CourtTab5;
