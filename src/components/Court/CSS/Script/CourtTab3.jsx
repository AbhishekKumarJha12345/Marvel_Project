import React, { useRef, useState, useEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import axiosInstance from "../../../../utils/axiosInstance";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
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

// Colors for Pie chart segments
// const COLORS = ['#8884d8', '#82ca9d', '#FFBB28', '#FF8042', '#FF6347'];
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
 
const VideoConferencingDashboard = () => {
  const exportRef = useRef(null); // Reference to content to be exported
  const [confrenceDisposalData, setConfrenceDisposalData] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
    const[filteredData,setFiltereddata]=useState([])
  
  const fetchConfrenceDisposalData = async () => {
    try {
      const response = await axiosInstance.get("/live_data", {
        params: {
          type: "court_3",
          from_date:fromDate?.toISOString().split("T")[0],
          to_date:toDate?.toISOString().split("T")[0],
        },
      });
      const responseData = response.data;
      setConfrenceDisposalData(responseData.data_dict);
      setFiltereddata(responseData.data_dict)
    } catch (error) {
      console.error("Some error occured", error);
    }
  };
  useEffect(() => {
    fetchConfrenceDisposalData();
  }, []);
  const Clearfilter=()=>{
    setFromDate(null);
    setToDate(null);
    setFiltereddata(confrenceDisposalData)
  }
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
              const filteredData = filterDataByDate(confrenceDisposalData, fromDate, toDate);
              console.log("Filtered Data:", filteredData);
              setFiltereddata(filteredData);
          }
        }, [fromDate, toDate]);
  // useEffect(() => {
  //   if(fromDate||toDate)
  //   {
  //     fetchConfrenceDisposalData();}
  // }, [fromDate,toDate]);


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
    pdf.save("Video Conferencing Hearings.pdf");
  };

  const caseDisposalData = filteredData?.map((item) => ({
    month: new Date(item.month).toLocaleString("en-US", {
      month: "short",
      year: "numeric",
    }),
    disposedCases: item.disposed_cases || 0,
    backlogReduction: item.backlog_reduction || 0,
  })).sort((a, b) => new Date(a.month) - new Date(b.month));

  const readinessData = [
    {
      subject: "Disposed Cases",
      value: parseInt(filteredData?.[0]?.disposed_cases || 0),
    },
    {
      subject: "Backlog Reduction",
      value: parseInt(filteredData?.[0]?.backlog_reduction || 0),
    },
  ];

  const recentEntryDate = new Date(
    filteredData?.[0]?.month
  ).toLocaleString("en-US", {
    month: "short",
    year: "numeric",
  });

  return (
    <div className="rounded-lg w-full max-w-full h-auto">
      {/* <div className="ContentSpace">
      <h1 className="text-2xl font-bold mb-6">Video Conferencing Hearings & Case Disposal Rate Dashboard</h1>
        <button className="ExportButton" onClick={handleExport}>
          Export
        </button>
      </div> */}
      <div className="ContentSpace flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          Video Conferencing Hearings & Case Disposal Rate Dashboard
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
         <LocalizationProvider dateAdapter={AdapterDayjs}>
                               <div className="flex justify-between items-center mb-4">
                                 
                               <h1 className="text-2xl font-bold">Deviation</h1>
                   
                         
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
          <div className="bg-white p-4 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold">
          Case Disposal & Backlog Reduction
        </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={caseDisposalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" label={{ value: 'Time Period', position: 'center', dy: 10 }}/>
                <YAxis label={{ value: 'Count', angle: -90, position: 'center', dx: -30 }}/>
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  stroke="#8884d8"

                  dataKey="disposedCases"
                  name="Disposed Cases"
                  activeDot={{ r: 8 }}
                  strokeWidth={2}

                />
                <Line
                  type="monotone"
                  stroke="#82ca9d"

                  dataKey="backlogReduction"
                  name="Backlog Reduction"
                  activeDot={{ r: 8 }}
                  strokeWidth={2}


                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white rounded-lg w-full max-w-full h-auto mb-6 p-4">
          <h1 className="text-2xl font-bold">
            Recent Entry : {recentEntryDate}
          </h1>
          {/* Infrastructure Readiness Pie Chart */}
          <div className="bg-white p-4 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-4">
              Infrastructure Readiness
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Tooltip />
                <Legend />
                <Pie
                  data={readinessData}
                  dataKey="value"
                  nameKey="subject"
                  outerRadius={100}
                  fill="#8884d8"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                >
                  {readinessData.map((entry, index) => (
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
      <Courtform
        open={showModal}
        type="court_3"
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default VideoConferencingDashboard;
