import React, { useRef, useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import axiosInstance from "../../../../utils/axiosInstance";

const CourtRefDetails = `Generated Summary:
2024 witnessed significant advancements and improvements in the legal system, as evidenced by the analysis of key metrics such as eSummons deliveries electronically, total cases, case resolution times, backlog reduction, and adoption rate.

 eSummons Delivered Electronically: There was a notable increase in eSummons deliveries throughout 2024, indicating a shift toward digitalization, streamlining the summons process, and reducing paper usage.

 Total Cases: The total number of cases fluctuated over the year, increasing in the early months due to accessibility and awareness but declining mid-year due to improved preventive measures.

 Pending vs. Disposed Cases: Pending cases remained stable, while disposed cases increased, reflecting a more efficient legal system.

 Average Resolution Time: A downward trend in resolution time suggests streamlined workflows, judicial efficiency, and proactive case management.

 Backlog Reduction: With steady case disposal, backlog reduction improved significantly throughout 2024.

 Adoption Rate: Increased confidence in the system resulted in greater adoption of digital legal processes, boosting overall efficiency.

🔹 In summary, the legal system in 2024 became more efficient with the adoption of digital tools and backlog reduction. The ongoing improvements indicate a commitment to modernization, streamlined case management, and accessibility enhancements.`;

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
// const COLORS = ['#0088FE', '#FF8042'];
import Courtform from "./Courtform.jsx";

const CourtTab2 = () => {
  const [showModal, setShowModal] = useState(false);
  const exportRef = useRef(null); // Reference to content to be exported
  const [summonsDigitalData, setSummonsDigitalData] = useState(null);

  const fetchSummonsDigitalData = async () => {
    try {
      const response = await axiosInstance.get("/live_data", {
        params: {
          type: "court_2",
        },
      });
      const responseData = response.data;
      setSummonsDigitalData(responseData.data_dict);
    } catch (error) {
      console.error("Some error occured", error);
    }
  };
  useEffect(() => {
    fetchSummonsDigitalData();
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
    pdf.save("eSummons & Digital Case Records.pdf");
  };

  const complianceData = summonsDigitalData
    ? [
        {
          name: "Compliant",
          value: parseInt(summonsDigitalData[0]?.data_security_complaints || 0),
        },
        {
          name: "Non-Compliant",
          value: parseInt(
            summonsDigitalData[0]?.data_security_non_complaints || 0
          ),
        },
      ]
    : [
        { name: "Compliant", value: 0 },
        { name: "Non-Compliant", value: 0 },
      ];

  const accessibilityData = summonsDigitalData
    ? [
        {
          name: "Accessible",
          value: parseInt(summonsDigitalData[0]?.accessibility_complaints || 0),
        },
        {
          name: "Inaccessible",
          value: parseInt(
            summonsDigitalData[0]?.accessibility_non_complaints || 0
          ),
        },
      ]
    : [
        { name: "Accessible", value: 0 },
        { name: "Inaccessible", value: 0 },
      ];

  const summonsData = summonsDigitalData?.map((item) => {
    return {
      month: new Date(item.month).toLocaleString("en-US", {
        month: "short",
        year: "numeric",
      }),
      deliveredElectronically: item.electronic_court_summons,
    };
  });

  const adoptionData = Array.isArray(summonsDigitalData) 
  ? summonsDigitalData.map(item => ({
      month: new Date(item?.month || "").toLocaleString('en-US', { month: 'short', year: 'numeric' }),
      adoptionRate: parseInt(item?.adoption_rate) || 0 // Handle null/undefined values safely
    })) 
  : [];

  return (
    <div className="rounded-lg w-full max-w-full h-auto">
      <div className="ContentSpace flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          eSummons & Digital Case Records Dashboard
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
            {/* eSummons Delivered Electronically Bar Chart */}
            <div className="bg-white p-4 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-4">
                Percentage of Court Summons Delivered Electronically
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={summonsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="deliveredElectronically" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            {/* Adoption Rate Line Chart */}
            <div className="bg-white p-4 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-4">
                Adoption Rate of eSummons & Digital Case Records
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={adoptionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis 
      domain={[0, Math.max(...adoptionData?.map(item => item.adoptionRate)) + 50]} // Auto-scale with padding
      tickCount={6} // Adjust tick intervals
    />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="adoptionRate"
                    stroke="#8884d8"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg w-full max-w-full h-auto mb-6 p-4">
          <h1 className="text-2xl font-bold">Live</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Updated Pie Chart for Compliance */}
            <div className="bg-white p-4 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-4">
                Data Security Compliance
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Tooltip />
                  <Pie
                    data={complianceData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    fill="#8884d8"
                    label
                  >
                    {complianceData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Updated Pie Chart for Accessibility */}
            <div className="bg-white p-4 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-4">
                Accessibility Compliance
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Tooltip />
                  <Pie
                    data={accessibilityData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    fill="#82ca9d"
                    label
                  >
                    {accessibilityData.map((entry, index) => (
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
      <Courtform
        open={showModal}
        type="court_2"
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default CourtTab2;
