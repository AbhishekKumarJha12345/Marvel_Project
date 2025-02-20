import React, {useRef,useState} from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
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

// Dummy Data for Charts
const caseData = [
  {
    month: "Jan",
    total: 1200,
    pending: 400,
    disposed: 800,
    avgResolutionTime: 30,
  },
  {
    month: "Feb",
    total: 1300,
    pending: 500,
    disposed: 800,
    avgResolutionTime: 28,
  },
  {
    month: "Mar",
    total: 1400,
    pending: 300,
    disposed: 1100,
    avgResolutionTime: 35,
  },
  {
    month: "Apr",
    total: 1250,
    pending: 350,
    disposed: 900,
    avgResolutionTime: 32,
  },
  {
    month: "May",
    total: 1500,
    pending: 200,
    disposed: 1300,
    avgResolutionTime: 25,
  },
  {
    month: "Jun",
    total: 1100,
    pending: 450,
    disposed: 650,
    avgResolutionTime: 28,
  },
  {
    month: "Jul",
    total: 1400,
    pending: 300,
    disposed: 1100,
    avgResolutionTime: 33,
  },
  {
    month: "Aug",
    total: 1350,
    pending: 400,
    disposed: 950,
    avgResolutionTime: 29,
  },
  {
    month: "Sep",
    total: 1450,
    pending: 500,
    disposed: 950,
    avgResolutionTime: 27,
  },
  {
    month: "Oct",
    total: 1300,
    pending: 450,
    disposed: 850,
    avgResolutionTime: 31,
  },
  {
    month: "Nov",
    total: 1200,
    pending: 400,
    disposed: 800,
    avgResolutionTime: 30,
  },
  {
    month: "Dec",
    total: 1500,
    pending: 200,
    disposed: 1300,
    avgResolutionTime: 25,
  },
];

// Pie chart data
const caseStatusData = [
  { name: "Pending", value: 500 },
  { name: "Disposed", value: 9500 },
];
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
import Courtform from './Courtform.jsx'
const CourtTab1 = () => {
  const exportRef = useRef(null)
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
  return (
    <div className="rounded-lg w-full max-w-full h-auto">
      <div className="ContentSpace flex justify-between items-center">
        <h1 className="text-2xl font-bold">Court System Dashboard</h1>

        <div className="flex space-x-2">
          <button className="ExportButton" onClick={handleExport}>
            Export
          </button>
          {localStorage.getItem('role') !=='chief secretary' &&  <button 
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          style={{backgroundColor:'#2d3748'}} onClick={() => {
            console.log("Open modal");
            setShowModal(true);
          }}>
            Add on
          </button>}
        </div>
      </div>

      <div ref={exportRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pie Chart */}
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
              <Line type="monotone" dataKey="pending" stroke={chartColors[1]} />
              <Line
                type="monotone"
                dataKey="disposed"
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
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={caseData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="avgResolutionTime"
                fill={chartColors[0]}
                stroke="#8884d8"
              />
            </AreaChart>
          </ResponsiveContainer>
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
