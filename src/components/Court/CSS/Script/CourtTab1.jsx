import React, { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import axiosInstance from "../../../../utils/axiosInstance";
import {
  BarChart,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  Bar,
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
const CourtTab1 = () => {
  const exportRef = useRef(null);
  const [icjsData, setIcjsData] = useState(null);

  const ICJSCaseData = async () => {
    try {
      const response = await axiosInstance.get("/live_data", {
        params: {
          type: "court_1",
        },
      });
      const responseData = response.data;
      setIcjsData(responseData.data_dict);
    } catch (error) {
      console.error("Some error occured", error);
    }
  };
  useEffect(() => {
    ICJSCaseData();
  }, []);
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
    pdf.save("Court System.pdf");
  };

  // Dynamic pie chart data
  const caseStatusData = icjsData
    ? [
        { name: "Pending", value: parseInt(icjsData[0]?.pending || 0) },
        { name: "Completed", value: parseInt(icjsData[0]?.completed || 0) },
      ]
    : [
        { name: "Pending", value: 0 },
        { name: "Completed", value: 0 },
      ];
  const recentEntryDate = new Date(icjsData?.[0]?.month).toLocaleString("en-US", {
    month: "short",
    year: "numeric",
  })
  const caseData = icjsData?.map((item) => ({
    month: new Date(item.month).toLocaleString("en-US", {
      month: "short",
      year: "numeric",
    }),
    total: parseInt(item.pending) + parseInt(item.completed),
    pending: parseInt(item.pending),
    completed: parseInt(item.completed),
    avgResolutionTime: parseInt(item.average_resolution_time),
  }));
  return (
    <div className="rounded-lg w-full max-w-full h-auto">
      <div className="ContentSpace flex justify-between items-center">
        <h1 className="text-2xl font-bold">Court System Dashboard</h1>

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
            {/* Line Chart */}
            <div className="bg-white p-4 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-4">
                Cases Processed Over Time
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={caseData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="total"
                    stroke={chartColors[0]}
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="pending"
                    stroke={chartColors[1]}
                  />
                  <Line
                    type="monotone"
                    dataKey="completed"
                    stroke={chartColors[2]}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Area Chart */}
            <div className="bg-white p-4 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-4">
                Average Resolution Time Over Time
              </h3>
              {/* <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={caseData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" angle={-45} textAnchor="end" />
                  <YAxis domain={[0, "auto"]} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="avgResolutionTime"
                    fill={chartColors[0]}
                    stroke="#8884d8"
                    fillOpacity={0.5} // Ensure proper transparency
                  />
                </AreaChart>
              </ResponsiveContainer> */}
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={caseData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="avgResolutionTime"
                    fill={chartColors[0]}
                    name="Avg Resolution Time"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-lg w-full max-w-full h-auto mb-6 p-4">
          <h1 className="text-2xl font-bold">Recent Entry : {recentEntryDate}</h1>
          <div className="bg-white p-4 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-4">
              Case Status Distribution
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={caseStatusData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  fill="#8884d8"
                >
                  {caseStatusData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={index % 2 === 0 ? "#82ca9d" : "#8884d8"}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <Courtform
        open={showModal}
        type="court_1"
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default CourtTab1;
