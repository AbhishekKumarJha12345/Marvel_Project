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
const VideoConferencingDashboard = () => {
  const exportRef = useRef(null); // Reference to content to be exported
  const [confrenceDisposalData, setConfrenceDisposalData] = useState(null);

  const fetchConfrenceDisposalData = async () => {
    try {
      const response = await axiosInstance.get("/live_data", {
        params: {
          type: "court_3",
        },
      });
      const responseData = response.data;
      setConfrenceDisposalData(responseData.data_dict);
    } catch (error) {
      console.error("Some error occured", error);
    }
  };
  useEffect(() => {
    fetchConfrenceDisposalData();
  }, []);
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

  const caseDisposalData = confrenceDisposalData?.map((item) => ({
    month: item.month,
    disposedCases: item.disposed_cases,
    backlogReduction: item.backlog_reduction,
  }));

  const readinessData = [
    {
      subject: "Backlog Reduction",
      value: parseInt(confrenceDisposalData?.[0].backlog_reduction || 0),
    },
    {
      subject: "Disposed Cases",
      value: parseInt(confrenceDisposalData?.[0].disposed_cases || 0),
    },
  ];

  return (
    <div className="rounded-lg w-full max-w-full h-auto">
      <div className="ContentSpace">
        <h1 className="text-2xl font-bold mb-6">
          Video Conferencing Hearings & Case Disposal Rate Dashboard
        </h1>
        <button className="ExportButton" onClick={handleExport}>
          Export
        </button>
      </div>
      <div ref={exportRef}>
        <div className="bg-white rounded-lg w-full max-w-full h-auto mb-6 p-4">
          <h1 className="text-2xl font-bold">Deviation</h1>

          {/* Video Conferencing Impact Bar Chart */}
          <div className="bg-white p-4 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-4">
              Case Disposal & Backlog Reduction
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={caseDisposalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="disposedCases"
                  fill="#8884d8"
                  name="Disposed Cases"
                />
                <Bar
                  dataKey="backlogReduction"
                  fill="#82ca9d"
                  name="Backlog Reduction"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white rounded-lg w-full max-w-full h-auto mb-6 p-4">
          <h1 className="text-2xl font-bold">Live</h1>
          {/* Infrastructure Readiness Pie Chart */}
          <div className="bg-white p-4 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-4">
              Infrastructure Readiness
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Tooltip />
                <Pie
                  data={readinessData}
                  dataKey="value"
                  nameKey="subject"
                  outerRadius={100}
                  fill="#8884d8"
                  label
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
    </div>
  );
};

export default VideoConferencingDashboard;
