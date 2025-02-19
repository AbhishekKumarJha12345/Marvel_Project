import React, {useRef} from 'react';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis
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

// Dummy Data for NYAYSHRUTI Project Implementation
const deploymentStatusData = [
  { stage: 'Planning', progress: 100 },
  { stage: 'Development', progress: 75 },
  { stage: 'Testing', progress: 50 },
  { stage: 'Implementation', progress: 20 },
];

const speechToTextIntegrationData = [
  { month: 'Jan', progress: 10 },
  { month: 'Feb', progress: 20 },
  { month: 'Mar', progress: 35 },
  { month: 'Apr', progress: 45 },
  { month: 'May', progress: 60 },
  { month: 'Jun', progress: 75 },
  { month: 'Jul', progress: 80 },
  { month: 'Aug', progress: 90 },
  { month: 'Sep', progress: 95 },
  { month: 'Oct', progress: 100 },
];

const userFeedbackData = [
  { subject: 'Judges', adoption: 85, satisfaction: 90 },
  { subject: 'Legal Professionals', adoption: 75, satisfaction: 85 },
  { subject: 'Administrative Staff', adoption: 80, satisfaction: 80 },
];

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
  "#b0a8b9"  // Dusty Lilac
];



const CourtTab5 = () => {
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
    pdf.save("NYAYSHRUTI Project Implementation Progress.pdf");
  };
  return (
    <div className="rounded-lg w-full max-w-full h-auto">
      <div className="ContentSpace">
      <h1 className="text-2xl font-bold mb-6">NYAYSHRUTI Project Implementation Progress</h1>
        <button className="ExportButton" onClick={handleExport}>
          Export
        </button>
      </div>
      <div ref={exportRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Deployment Status and Impact on Judicial Processes (Stacked Bar Chart) */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-4">Deployment Status & Impact on Judicial Processes</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={deploymentStatusData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="stage" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="progress" stackId="a" fill={chartColors[0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Integration of Speech-to-Text & AI Transcription (Line Chart) */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-4">Speech-to-Text & AI Transcription Integration</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={speechToTextIntegrationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="progress" stroke={chartColors[1]} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* User Adoption & Feedback (Radar Chart) */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-4">User Adoption & Feedback</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart outerRadius={90} width={500} height={300} data={userFeedbackData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis />
              <Radar name="Adoption Rate" dataKey="adoption" stroke={chartColors[0]} fill={chartColors[0]} fillOpacity={0.6} />
              <Radar name="Satisfaction Rate" dataKey="satisfaction" stroke={chartColors[1]} fill={chartColors[1]} fillOpacity={0.6} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
};

export default CourtTab5;
