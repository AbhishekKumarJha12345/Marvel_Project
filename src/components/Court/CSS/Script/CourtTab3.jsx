import React, {useRef} from 'react';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';

const CourtRefDetails = `Generated Summary:
2024 witnessed significant advancements and improvements in the legal system, as evidenced by the analysis of key metrics such as eSummons deliveries electronically, total cases, case resolution times, backlog reduction, and adoption rate.

 eSummons Delivered Electronically: There was a notable increase in eSummons deliveries throughout 2024, indicating a shift toward digitalization, streamlining the summons process, and reducing paper usage.

 Total Cases: The total number of cases fluctuated over the year, increasing in the early months due to accessibility and awareness but declining mid-year due to improved preventive measures.

 Pending vs. Disposed Cases: Pending cases remained stable, while disposed cases increased, reflecting a more efficient legal system.

 Average Resolution Time: A downward trend in resolution time suggests streamlined workflows, judicial efficiency, and proactive case management.

 Backlog Reduction: With steady case disposal, backlog reduction improved significantly throughout 2024.

 Adoption Rate: Increased confidence in the system resulted in greater adoption of digital legal processes, boosting overall efficiency.

🔹 In summary, the legal system in 2024 became more efficient with the adoption of digital tools and backlog reduction. The ongoing improvements indicate a commitment to modernization, streamlined case management, and accessibility enhancements.`;

// Dummy Data for Video Conferencing Hearings & Case Disposal Rate
const caseDisposalData = [
  { month: 'Jan', disposedCases: 30, backlogReduction: 5 },
  { month: 'Feb', disposedCases: 40, backlogReduction: 10 },
  { month: 'Mar', disposedCases: 50, backlogReduction: 15 },
  { month: 'Apr', disposedCases: 60, backlogReduction: 20 },
  { month: 'May', disposedCases: 70, backlogReduction: 25 },
  { month: 'Jun', disposedCases: 85, backlogReduction: 35 },
  { month: 'Jul', disposedCases: 95, backlogReduction: 45 },
  { month: 'Aug', disposedCases: 100, backlogReduction: 50 },
  { month: 'Sep', disposedCases: 110, backlogReduction: 60 },
  { month: 'Oct', disposedCases: 120, backlogReduction: 70 },
  { month: 'Nov', disposedCases: 130, backlogReduction: 80 },
  { month: 'Dec', disposedCases: 140, backlogReduction: 90 },
];

// Pie chart data for infrastructure readiness
const readinessData = [
  { subject: 'Video Call', value: 80 },
  { subject: 'Audio Call', value: 85 },
  { subject: 'Case Filing', value: 75 },
  { subject: 'Judiciary Systems', value: 90 },
  { subject: 'Legal Professionals', value: 70 },
];

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
  "#b0a8b9" // Dusty Lilac
];
const VideoConferencingDashboard = () => {
  const exportRef = useRef(null); // Reference to content to be exported

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
  return (
    <div className="rounded-lg w-full max-w-full h-auto">
      <div className="ContentSpace">
      <h1 className="text-2xl font-bold mb-6">Video Conferencing Hearings & Case Disposal Rate Dashboard</h1>
        <button className="ExportButton" onClick={handleExport}>
          Export
        </button>
      </div>
      <div ref={exportRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Case Disposal and Backlog Reduction Line Chart */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-4">Case Disposal & Backlog Reduction</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={caseDisposalData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="disposedCases" stroke="#8884d8" name="Disposed Cases" />
              <Line type="monotone" dataKey="backlogReduction" stroke="#82ca9d" name="Backlog Reduction" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Video Conferencing Impact Bar Chart */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-4">Impact of Video Conferencing on Case Disposal</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={caseDisposalData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="disposedCases" fill="#8884d8" name="Disposed Cases" />
              <Bar dataKey="backlogReduction" fill="#82ca9d" name="Backlog Reduction" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Infrastructure Readiness Pie Chart */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-4">Infrastructure Readiness</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={readinessData}
                dataKey="value"
                nameKey="subject"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {readinessData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
};

export default VideoConferencingDashboard;
