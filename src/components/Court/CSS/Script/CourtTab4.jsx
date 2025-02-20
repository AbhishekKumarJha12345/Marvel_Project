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
import Courtform from './Courtform.jsx'

const CourtTab4 = () => {
  const exportRef = useRef(null); // Reference to content to be exported
  const [forensicData, setForensicData] = useState(null);

  const fetchForensicData = async () => {
    try {
      const response = await axiosInstance.get("/live_data", {
        params: {
          type: "court_4",
        },
      });
      const responseData = response.data;
      setForensicData(responseData.data_dict);
    } catch (error) {
      console.error("Some error occured", error);
    }
  };
  useEffect(() => {
    fetchForensicData();
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
    pdf.save("Prosecution & Forensic Departments Dashboard.pdf");
  };

  const dataSharingEffectivenessData = [
    {
      department: "Judicial",
      effectiveness: parseInt(forensicData?.[0]?.judicial_effectiveness || 0),
    },
    {
      department: "Prosecution",
      effectiveness: parseInt(forensicData?.[0]?.prosecution_effectiveness || 0),
    },
    {
      department: "Forensic",
      effectiveness: parseInt(forensicData?.[0]?.forensic_effectiveness || 0),
    },
  ];

  const forensicDataUsageData = [
    {
      name: "Used Forensic Data",
      value: parseInt(
        forensicData?.[0]?.percentage_of_cases_using_forensic_data || 0
      ),
    },
    {
      name: "Did Not Use Forensic Data",
      value: parseInt(
        100 - forensicData?.[0]?.percentage_of_cases_using_forensic_data || 0
      ),
    },
  ];

  const responseTimeData = forensicData?.map((item) => ({
    month: new Date(item.month).toLocaleString('en-US', { month: 'short', year: 'numeric' }),
    responseTime: item?.response_time_for_evidence_retrieval,
  }));

  const dataSharingEffectiveData = forensicData?.map((item) => ({
    month: new Date(item.month).toLocaleString('en-US', { month: 'short', year: 'numeric' }),
    Judicial: item?.judicial_effectiveness,
    Prosecution: item?.prosecution_effectiveness,
    Forensic: item?.forensic_effectiveness,
  }));

  const recentEntryDate = new Date(forensicData?.[0]?.month).toLocaleString("en-US", {
    month: "short",
    year: "numeric",
  })

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
        {localStorage.getItem('role') !=='chief secretary' && <button 
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          style={{backgroundColor:'#2d3748'}} onClick={() => {
            console.log("Open modal");
            setShowModal(true);
          }}>
            Add on
          </button>}
          </div>
      </div>
      <div ref={exportRef}>
      <div className="bg-white rounded-lg w-full max-w-full h-auto mb-6 p-4">
        <h1 className="text-2xl font-bold">Deviation</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-4">
              Data-Sharing Effectivness
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dataSharingEffectiveData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="Judicial"
                  stroke="#8884d8"
                  name="Disposed Cases"
                />
                <Line
                  type="monotone"
                  dataKey="Prosecution"
                  stroke="#82ca9d"
                  name="Backlog Reduction"
                />
                <Line
                  type="monotone"
                  dataKey="Forensic"
                  stroke="#6a8caf"
                  name="Backlog Reduction"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Response Time for Evidence Retrieval (Line Chart) */}
          <div className="bg-white p-4 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-4">
              Response Time for Evidence Retrieval
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={responseTimeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="responseTime" stroke="#FF6347" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg w-full max-w-full h-auto mb-6 p-4">
        <h1 className="text-2xl font-bold">Recent Entry : {recentEntryDate}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Percentage of Cases Using Forensic Data (Pie Chart) */}
          <div className="bg-white p-4 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-4">
              Percentage of Cases Using Forensic Data
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Tooltip />
                <Legend/>
                <Pie
                  data={forensicDataUsageData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  fill="#8884d8"
                  label
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

          {/* Effectiveness of Data Sharing Mechanisms (Bar Chart) */}
          <div className="bg-white p-4 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-4">
              Effectiveness of Data-Sharing Mechanisms
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dataSharingEffectivenessData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="effectiveness" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
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
