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


import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const CourtTab2 = () => {
  const [showModal, setShowModal] = useState(false);
  const exportRef = useRef(null); // Reference to content to be exported
  const [summonsDigitalData, setSummonsDigitalData] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [toSecurity, setToSecurity] = useState(null)
  const [fromSecurity, setFromSecurity] = useState(null)
  const [fromDelivered, setFromDelivered] = useState(null)
  const [toDelivered, setToDelivered] = useState(null)
  const [toadoption, setToadoption] = useState(null)
  const [fromadoption, setFromadoption] = useState(null)
  const [filteredData, setFilteredData] = useState([]);
  const [filteredData2, setFilteredData2] = useState([]);
  const [filteredSecurityData, setFilteredSecurityData] = useState(
    summonsDigitalData
  );
  const [filtereddelivery, setFiltereddelivery] = useState([]);

  const [filteredadoption, setFilteredadoption] = useState([]);

  const fetchSummonsDigitalData = async () => {
    try {
      const response = await axiosInstance.get("/live_data", {
        params: {
          type: "court_2",
          from_date: fromDate?.toISOString().split("T")[0],
          to_date: toDate?.toISOString().split("T")[0],
        },
      });
      const responseData = response.data;
      setSummonsDigitalData(responseData.data_dict);
      setFilteredData(responseData.data_dict)
      setFilteredData2(responseData.data_dict)
      setFilteredSecurityData(responseData.data_dict)
      setFiltereddelivery(responseData.data_dict)
      setFilteredadoption(responseData.data_dict)
    } catch (error) {
      console.error("Some error occured", error);
    }
  };
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
  const filterSecurityDataByDate = (data, fromSecurity, toSecurity) => {
    if (!Array.isArray(data)) {
      console.error("filterSecurityDataByDate received non-array data:", data);
      return [];
    }

    return data.filter((item) => {
      const itemDate = dayjs(item.month, "YYYY-MM");
      return (
        (!fromSecurity ||
          itemDate.isAfter(dayjs(fromSecurity).subtract(1, "month"))) &&
        (!toSecurity || itemDate.isBefore(dayjs(toSecurity).add(1, "month")))
      );
    });
  };
  useEffect(() => {
    fetchSummonsDigitalData();
  }, []);
  const ClearFilter = (type) => {
    console.log('type', type)
    if (type === '1') {
      setFromSecurity(null);
      setToSecurity(null);
      setFilteredSecurityData(summonsDigitalData);
    }
    if (type === '2') {
     
      setFromDate(null);
      setToDate(null);
      setFilteredData(summonsDigitalData);
      setFilteredData2(summonsDigitalData);
    }
    if (type === '3') {
      setToDelivered(null);
      setFromDelivered(null);
      setFiltereddelivery(summonsDigitalData)
    }
    if (type === '4') {
      setFromadoption(null);
      setToadoption(null);
      setFilteredadoption(summonsDigitalData)
    }
  };
  useEffect(() => {
    if (fromDate || toDate) {
      console.log("Filtering accessibility compliance data for dates:", fromDate, toDate);
      const filtered = filterDataByDate(summonsDigitalData, fromDate, toDate);
      console.log("Filtered Accessibility Data:", filtered);
      setFilteredData(filtered);
      setFilteredData2(filtered);
    }
  }, [fromDate, toDate]);
  useEffect(() => {
    if (fromSecurity || toSecurity) {
      console.log("Filtering security compliance data for dates:", fromSecurity, toSecurity);
      const filtered = filterSecurityDataByDate(
        summonsDigitalData,
        fromSecurity,
        toSecurity
      );
      console.log("Filtered Security Data:", filtered);
      setFilteredSecurityData(filtered);
    }
  }, [fromSecurity, toSecurity]);
  useEffect(() => {
    if (fromDelivered || toDelivered) {
      console.log("Filtering security compliance data for dates:", fromDelivered, toDelivered);
      const filtered = filterSecurityDataByDate(
        summonsDigitalData,
        fromDelivered,
        toDelivered
      );
      console.log("Filtered Security Data:", filtered);
      setFiltereddelivery(filtered);
    }
  }, [fromDelivered, toDelivered]);
  useEffect(() => {
    if (fromadoption || toadoption) {
      console.log("Filtering security compliance data for dates:", fromadoption, toadoption);
      const filtered = filterSecurityDataByDate(
        summonsDigitalData,
        fromadoption,
        toadoption
      );
      console.log("Filtered Security Data:", filtered);
      setFilteredadoption(filtered);
    }
  }, [fromadoption, toadoption]);
  // useEffect(() => {
  //   if(fromDate||toDate)
  //   {
  //     fetchSummonsDigitalData();}
  // }, [fromDate,toDate]);


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

  const securityComplianceData = filteredSecurityData?.length
    ? filteredSecurityData
      .map((item) => ({
        month: dayjs(item.month, "YYYY-MM").format("MMM YYYY"), // Format as "Jan 2024"
        Compliant: item.data_security_complaints || 0,
        NonComplaints: item.data_security_non_complaints || 0,
      }))
      .sort((a, b) => dayjs(b.month, "MMM YYYY").toDate() - dayjs(a.month, "MMM YYYY").toDate()) // Newest to Oldest
    : [];

  // Process accessibility compliance data
  const accessibilityComplianceData = filteredData2?.length
    ? filteredData2
      .map((item) => ({
        month: dayjs(item.month, "YYYY-MM").format("MMM YYYY"),
        Accessible: item.accessibility_complaints || 0,
        InAccessible: item.accessibility_non_complaints || 0,
      }))
      .sort((a, b) => dayjs(b.month, "MMM YYYY").toDate() - dayjs(a.month, "MMM YYYY").toDate()) // Newest to Oldest
    : [];




  const complianceData = filteredData
    ? [
      {
        name: "Compliant",
        value: parseInt(filteredData[0]?.data_security_complaints || 0),
      },
      {
        name: "Non-Compliant",
        value: parseInt(
          filteredData[0]?.data_security_non_complaints || 0
        ),
      },
    ]
    : [
      { name: "Compliant", value: 0 },
      { name: "Non-Compliant", value: 0 },
    ];

  const accessibilityComiplanceData = filteredData?.map((item) => ({
    month: new Date(item.month).toLocaleString("en-US", {
      month: "short",
      year: "numeric",
    }),
    accessible: parseInt(item.accessibility_complaints) || 0,
    inAccessible: parseInt(item.accessibility_non_complaints) || 0,
  })).sort((a, b) => new Date(a.month) - new Date(b.month));

  const accessibilityData = filteredData
    ? [
      {
        name: "Accessible",
        value: parseInt(filteredData[0]?.accessibility_complaints || 0),
      },
      {
        name: "Inaccessible",
        value: parseInt(
          filteredData[0]?.accessibility_non_complaints || 0
        ),

      },
    ]
    : [
      { name: "Accessible", value: 0 },
      { name: "Inaccessible", value: 0 },
    ];

  const summonsData = filtereddelivery?.map((item) => {
    return {
      month: new Date(item.month).toLocaleString("en-US", {
        month: "short",
        year: "numeric",
      }),
      deliveredElectronically: parseInt(item.electronic_court_summons),
    };
  }).sort((a, b) => new Date(a.month) - new Date(b.month));

  const adoptionData = Array.isArray(filteredadoption)
    ? filteredadoption.map((item) => ({
      month: new Date(item?.month || "").toLocaleString("en-US", {
        month: "short",
        year: "numeric",
      }),
      adoptionRate: parseInt(item?.adoption_rate) || 0, // Handle null/undefined values safely
    })).sort((a, b) => new Date(a.month) - new Date(b.month))
    : [];
  const recentEntryDate = new Date(
    filteredData?.[0]?.month
  ).toLocaleString("en-US", {
    month: "short",
    year: "numeric",
  });

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
        <div className="rounded-lg w-full max-w-full h-auto  p-2">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div style={{
              backgroundColor: "#f4f4f4", padding: "10px", borderRadius: "8px"
            }}>

              <div className="bg-white p-4 rounded-xl shadow-md">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <div className=" justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Deviation</h1>


                    <h3 className="text-xl font-semibold mb-4">
                      Monthly Data Security Compliance
                    </h3>

                    <div className="flex items-center gap-1">
                      <div>
                        <DatePicker
                          label="From"
                          views={["year", "month"]}
                          value={fromSecurity}
                          onChange={setFromSecurity}
                          slotProps={{
                            textField: {
                              variant: "outlined",
                              size: "small",
                              sx: { width: "140px", fontSize: "12px" },
                            },
                          }}
                        />
                      </div>
                      <div>
                        <DatePicker
                          label="To"
                          views={["year", "month"]}
                          value={toSecurity}
                          onChange={setToSecurity}
                          slotProps={{
                            textField: {
                              variant: "outlined",
                              size: "small",
                              sx: { width: "140px", fontSize: "12px" },
                            },
                          }}
                        />
                      </div>
                      <button
                        onClick={() => ClearFilter('1')}
                        className="bg-blue-500 text-white px-3 py-2 rounded-md"
                        style={{ backgroundColor: "#2d3748" }}
                      >
                        Clear
                      </button>
                    </div>
                  </div>

                </LocalizationProvider>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={securityComplianceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" label={{ value: 'Time Period', position: 'center', dy: 10 }} />
                    <YAxis label={{ value: 'Count', angle: -90, position: 'center', dx: -30 }} />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="Compliant"
                      stroke="#8884d8"
                      strokeWidth={2}
                      name="Complaints"
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="NonComplaints"
                      stroke="#82ca9d"
                      strokeWidth={2}
                      name="Non-Complaints"
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div style={{
              backgroundColor: "#f4f4f4", padding: "15px", borderRadius: "8px"
            }}>

              <div className="bg-white p-4 rounded-xl shadow-md">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <div className=" justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Deviation</h1>


                    <h3 className="text-xl font-semibold mb-4">
                      Monthly Accessibility Compliance
                    </h3>

                    <div className="flex items-center gap-1">
                      <div>
                        <DatePicker label="From" views={["year", "month"]} value={fromDate} onChange={setFromDate} slotProps={{ textField: { variant: "outlined", size: "small", sx: { width: "140px", fontSize: "12px" } } }} />
                      </div>
                      <div>
                        <DatePicker label="To" views={["year", "month"]} value={toDate} onChange={setToDate} slotProps={{ textField: { variant: "outlined", size: "small", sx: { width: "140px", fontSize: "12px" } } }} />
                      </div>
                      <button
                        onClick={() => ClearFilter('2')}

                        className="bg-blue-500 text-white px-3 py-2 rounded-md"
                        style={{ backgroundColor: "#2d3748" }}
                      >
                        Clear
                      </button>
                    </div></div>
                </LocalizationProvider>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={accessibilityComplianceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" label={{ value: 'Time Period', position: 'center', dy: 10 }} />
                    <YAxis label={{ value: 'Count', angle: -90, position: 'center', dx: -30 }} />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      stroke="#8884d8"
                      dataKey="Accessible"
                      name="Accessible"
                      activeDot={{ r: 8 }}
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      stroke="#82ca9d"
                      dataKey="InAccessible"
                      name="In Accessible"
                      activeDot={{ r: 8 }}
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        </div>

        <div className=" rounded-lg w-full max-w-full h-auto p-2">
          <h1 className="text-2xl font-bold">
            Recent Entry : {recentEntryDate}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Updated Pie Chart for Compliance */}
            <div style={{
              backgroundColor: "#f4f4f4", padding: "15px", borderRadius: "8px"
            }}>
              <div className="bg-white p-4 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold mb-4">
                  Data Security Compliance
                </h3>

                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Tooltip />
                    <Legend />
                    <Pie
                      data={complianceData}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={100}
                      fill="#8884d8"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
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
            </div>


            {/* Updated Pie Chart for Accessibility */}
            <div style={{
              backgroundColor: "#f4f4f4", padding: "15px", borderRadius: "8px"
            }}>
              <div className="bg-white p-4 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold mb-4">
                  Accessibility Compliance
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Tooltip />
                    <Legend />

                    <Pie
                      data={accessibilityData}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={100}
                      fill="#82ca9d"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
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

        <div className="rounded-lg w-full max-w-full h-auto mb-6 p-4">
          <h1 className="text-2xl font-bold">Deviation With Recent Entry</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* eSummons Delivered Electronically Bar Chart */}
            <div style={{
              backgroundColor: "#f4f4f4", padding: "15px", borderRadius: "8px"
            }}>
              <div className="bg-white p-4 rounded-xl shadow-md">
                <div className="mb-4 flex flex-row justify-between items-center">

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <div className=" justify-between items-center mb-4">

                      <h3 className="text-xl font-semibold mb-4">
                        Court Summons Delivered Electronically
                      </h3>

                      <div className="flex items-center gap-1">
                        <div>
                          <DatePicker
                            label="From"
                            views={["year", "month"]}
                            value={fromDelivered}
                            onChange={setFromDelivered}
                            slotProps={{
                              textField: {
                                variant: "outlined",
                                size: "small",
                                sx: { width: "140px", fontSize: "12px" },
                              },
                            }}
                          />
                        </div>
                        <div>
                          <DatePicker
                            label="To"
                            views={["year", "month"]}
                            value={toDelivered}
                            onChange={setToDelivered}
                            slotProps={{
                              textField: {
                                variant: "outlined",
                                size: "small",
                                sx: { width: "140px", fontSize: "12px" },
                              },
                            }}
                          />
                        </div>
                        <button
                          onClick={() => ClearFilter('3')}

                          className="bg-blue-500 text-white px-3 py-2 rounded-md"
                          style={{ backgroundColor: "#2d3748" }}
                        >
                          Clear
                        </button>
                      </div>
                    </div>

                  </LocalizationProvider>
                  {/* <h4 className="text-xl font-semibold">{`${recentEntryDate}: ${summonsData?.[summonsData.length - 1]?.deliveredElectronically}`}</h4> */}
                </div>

                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={summonsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" label={{ value: 'Time Period', position: 'center', dy: 10 }} />
                    <YAxis label={{ value: 'Count', angle: -90, position: 'center', dx: -30 }} />
                    {/* <YAxis 
                    domain={[
                      0, 
                      Math.max(0, ...(summonsData?.map(item => item.deliveredElectronically) || [0])) + 50
                    ]}
                    tickCount={6}
                  /> */}
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="deliveredElectronically"
                      stroke={COLORS[0]}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div style={{
              backgroundColor: "#f4f4f4", padding: "15px", borderRadius: "8px"
            }}>
              {/* Adoption Rate Line Chart */}
              <div className="bg-white p-4 rounded-xl shadow-md">
                <div className="mb-4 flex flex-row justify-between items-center">

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <div className=" justify-between items-center mb-4">

                      <h3 className="text-xl font-semibold">
                        Adoption Rate of eSummons & Digital Case Records

                      </h3>

                      <div className="flex items-center gap-1">
                        <div>
                          <DatePicker
                            label="From"
                            views={["year", "month"]}
                            value={fromadoption}
                            onChange={setFromadoption}
                            slotProps={{
                              textField: {
                                variant: "outlined",
                                size: "small",
                                sx: { width: "140px", fontSize: "12px" },
                              },
                            }}
                          />
                        </div>
                        <div>
                          <DatePicker
                            label="To"
                            views={["year", "month"]}
                            value={toadoption}
                            onChange={setToadoption}
                            slotProps={{
                              textField: {
                                variant: "outlined",
                                size: "small",
                                sx: { width: "140px", fontSize: "12px" },
                              },
                            }}
                          />
                        </div>
                        <button
                          onClick={() => ClearFilter('4')}

                          className="bg-blue-500 text-white px-3 py-2 rounded-md"
                          style={{ backgroundColor: "#2d3748" }}
                        >
                          Clear
                        </button>
                      </div>
                    </div>

                  </LocalizationProvider>
                </div>


                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={adoptionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" label={{ value: 'Time Period', position: 'center', dy: 10 }} />
                    <YAxis label={{ value: 'Count', angle: -90, position: 'center', dx: -30 }}
                      domain={[
                        0,
                        Math.max(
                          0,
                          ...(adoptionData?.map((item) => item.adoptionRate) || [
                            0,
                          ])
                        ) + 50,
                      ]}
                      tickCount={6}
                    />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="adoptionRate"
                      stroke={COLORS[1]} // Updated to use COLORS[0] from the second chart
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
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
