import React, {useRef, useState, useEffect} from 'react';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import axiosInstance from '../../../../utils/axiosInstance';
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
  const [implementationData, setImplementationData] = useState(null);

  const fetchImplementationData = async () => {
    try {
      const response = await axiosInstance.get("/live_data", {
        params: {
          type: "court_5",
        },
      });
      const responseData = response.data;
      setImplementationData(responseData.data_dict);
    } catch (error) {
      console.error("Some error occured", error);
    }
  };
  useEffect(() => {
    fetchImplementationData();
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
    pdf.save("NYAYSHRUTI Project Implementation Progress.pdf");
  };

  const deploymentStatusData = [
    { stage: 'Planning', progress: parseInt(implementationData?.[0]?.planning ||0) },
    { stage: 'Development', progress: parseInt(implementationData?.[0]?.development ||0) },
    { stage: 'Testing', progress: parseInt(implementationData?.[0]?.testing ||0) },
    { stage: 'Implementation', progress: parseInt(implementationData?.[0]?.implementation ||0) },
  ];

  const speechToTextIntegrationData = implementationData?.map((item) => (
    { month: item.month, progress: parseInt(item.ai_transcription_integration ||0) }
  ))

  const userFeedbackDatas = implementationData?.map((item) => (
    { month: item.month, "Judges": item.judges_feedback, "Legal Professionals": item.legal_professionals_feedback, "Administrative Staff":item.administrative_staff_feedback }
  ))

  const monthlyProgressData = implementationData?.map((item) => ({
    month: item.month,
    Planning: parseInt(item.planning || 0),
    Development: parseInt(item.development || 0),
    Testing: parseInt(item.testing || 0),
    Implementation: parseInt(item.implementation || 0),
  }));
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

         <div className="bg-white p-4 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-4">User Adoption & Feedback</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={userFeedbackDatas}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Judges" stroke="#8884d8" name="Disposed Cases" />
                <Line type="monotone" dataKey="Legal Professionals" stroke="#82ca9d" name="Backlog Reduction" />
                <Line type="monotone" dataKey="Administrative Staff" stroke="#6a8caf" name="Backlog Reduction" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-4">
            Monthly Progress of Deployment Status & Impact on Judicial Processes
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyProgressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Planning" fill={chartColors[0]} />
              <Bar dataKey="Development" fill={chartColors[1]} />
              <Bar dataKey="Testing" fill={chartColors[2]} />
              <Bar dataKey="Implementation" fill={chartColors[3]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
};

export default CourtTab5;
