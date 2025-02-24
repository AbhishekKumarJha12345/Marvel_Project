import {React,useState,useEffect} from "react";
import { PieChart, Pie,LineChart,Line, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, RadialBarChart, RadialBar } from "recharts";
import { UserPlus, ShieldCheck, TrendingUp, BarChart as BarChartIcon } from "lucide-react";
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
  "#b0a8b9" // Dusty Lilac
  ];
// ✅ Updated Dummy Data for Recruitment
const recruitmentData = [
  { name: "Forensic Experts", value: 15, color: chartColors[0] }, // Muted Purple
  { name: "Analysts", value: 10, color: chartColors[1] }, // Warm Sand
  { name: "Technicians", value: 8, color: chartColors[2] }, // Steel Blue
];

// ✅ Updated Dummy Data for Cyber Forensic Advancements
const cyberForensicData = [
  { name: "AI in Forensics", value: 85, color: chartColors[3] }, // Soft Rose
  { name: "Cloud Evidence Analysis", value: 75, color: chartColors[4] }, // Lavender
  { name: "Blockchain Security", value: 65, color: chartColors[5] }, // Muted Coral
  { name: "Automation", value: 90, color: chartColors[6] }, // Muted Teal
];
const recruitmentMonthlyData = [
  { month: "Jan 2024", ForensicExperts: 3, Analysts: 2, Technicians: 1 },
  { month: "Feb 2024", ForensicExperts: 4, Analysts: 3, Technicians: 2 },
  { month: "Mar 2024", ForensicExperts: 5, Analysts: 3, Technicians: 2 },
  { month: "Apr 2024", ForensicExperts: 4, Analysts: 4, Technicians: 3 },
  { month: "May 2024", ForensicExperts: 6, Analysts: 5, Technicians: 3 },
  { month: "Jun 2024", ForensicExperts: 7, Analysts: 5, Technicians: 4 },
  { month: "Jul 2024", ForensicExperts: 6, Analysts: 6, Technicians: 4 },
  { month: "Aug 2024", ForensicExperts: 5, Analysts: 4, Technicians: 3 },
  { month: "Sep 2024", ForensicExperts: 7, Analysts: 6, Technicians: 5 },
  { month: "Oct 2024", ForensicExperts: 8, Analysts: 7, Technicians: 6 },
  { month: "Nov 2024", ForensicExperts: 9, Analysts: 8, Technicians: 6 },
  { month: "Dec 2024", ForensicExperts: 10, Analysts: 9, Technicians: 7 },
];

// 📌 Monthly Data for Cyber Forensic Advancements
const cyberForensicMonthlyData = [
  { month: "Jan 2024", AIinForensics: 70, CloudEvidenceAnalysis: 60, BlockchainSecurity: 50, Automation: 80 },
  { month: "Feb 2024", AIinForensics: 75, CloudEvidenceAnalysis: 58, BlockchainSecurity: 55, Automation: 85 },
  { month: "Mar 2024", AIinForensics: 72, CloudEvidenceAnalysis: 65, BlockchainSecurity: 53, Automation: 82 },
  { month: "Apr 2024", AIinForensics: 78, CloudEvidenceAnalysis: 62, BlockchainSecurity: 57, Automation: 88 },
  { month: "May 2024", AIinForensics: 74, CloudEvidenceAnalysis: 70, BlockchainSecurity: 52, Automation: 85 },
  { month: "Jun 2024", AIinForensics: 80, CloudEvidenceAnalysis: 66, BlockchainSecurity: 60, Automation: 90 },
  { month: "Jul 2024", AIinForensics: 77, CloudEvidenceAnalysis: 74, BlockchainSecurity: 58, Automation: 92 },
  { month: "Aug 2024", AIinForensics: 85, CloudEvidenceAnalysis: 71, BlockchainSecurity: 63, Automation: 88 },
  { month: "Sep 2024", AIinForensics: 83, CloudEvidenceAnalysis: 78, BlockchainSecurity: 61, Automation: 95 },
  { month: "Oct 2024", AIinForensics: 87, CloudEvidenceAnalysis: 74, BlockchainSecurity: 67, Automation: 91 },
  { month: "Nov 2024", AIinForensics: 89, CloudEvidenceAnalysis: 79, BlockchainSecurity: 65, Automation: 100 },
  { month: "Dec 2024", AIinForensics: 84, CloudEvidenceAnalysis: 81, BlockchainSecurity: 69, Automation: 98 },
];


// ✅ Updated Dummy Data for Operational Efficiency (Gauge Chart)
const efficiencyData = [{ name: "Compliance", value: 92, fill: chartColors[7] }]; // Mauve
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
 
const ForensicStrengtheningInitiatives = () => {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [filteredRecruitment, setFilteredRecruitment] = useState(recruitmentMonthlyData);
  const [filteredCyberForensic, setFilteredCyberForensic] = useState(cyberForensicMonthlyData);
  
    const Clearfilter = () => {
      setFromDate(null);
      setToDate(null);
      setFilteredRecruitment(recruitmentMonthlyData);
      setFilteredCyberForensic(cyberForensicMonthlyData);
    };
  
    const filterDataByDate = (data, fromDate, toDate) => {
      return data.filter((item) => {
        const itemDate = dayjs(item.month, "MMM YYYY");
        return (
          (!fromDate || itemDate.isAfter(dayjs(fromDate).subtract(1, "month"))) &&
          (!toDate || itemDate.isBefore(dayjs(toDate).add(1, "month")))
        );
      });
    };
  
    useEffect(() => {
      if (fromDate || toDate) {
        setFilteredRecruitment(filterDataByDate(recruitmentMonthlyData, fromDate, toDate));
        setFilteredCyberForensic(filterDataByDate(cyberForensicMonthlyData, fromDate, toDate));
      }
    }, [fromDate, toDate]);
  return (
    <div className="rounded-lg w-full max-w-full h-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <BarChartIcon size={28} className="text-blue-600" />
        Forensic Strengthening Initiatives
      </h2>
    <div style={{ background: "white", margin: "10px 0", padding: "10px", borderRadius: "10px", overflow: "auto", border: "1px solid #ddd" }}>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        {/* <BarChartIcon size={28} className="text-blue-600" /> */}
        Deviation
      </h2>        <div className="flex items-center gap-4">
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recruitment Trends */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-bold mb-4">Recruitment Trends Over Months</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={filteredRecruitment}>
            <XAxis dataKey="month" stroke="#6b7280" tick={{ fontSize: 14 }} />
            <YAxis stroke="#6b7280" tick={{ fontSize: 14 }} />
            <Tooltip />
            <Legend />

            {/* Dynamic Lines for Each Role */}
            {["ForensicExperts", "Analysts", "Technicians"].map((role, index) => (
              <Line
                key={role}
                type="monotone"
                dataKey={role}
                stroke={chartColors[index]}
                strokeWidth={3}
                dot={{ r: 5 }}
                name={role}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Cyber Forensic Advancements */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-bold mb-4">Cyber Forensic Advancements Over Months</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={filteredCyberForensic}>
            <XAxis dataKey="month" stroke="#6b7280" tick={{ fontSize: 14 }} />
            <YAxis stroke="#6b7280" tick={{ fontSize: 14 }} />
            <Tooltip />
            <Legend />

            {/* Dynamic Lines for Each Advancement */}
            {["AIinForensics", "CloudEvidenceAnalysis", "BlockchainSecurity", "Automation"].map((tech, index) => (
              <Line
                key={tech}
                type="monotone"
                dataKey={tech}
                stroke={chartColors[index + 3]} // Adjusting colors for forensic advancements
                strokeWidth={3}
                dot={{ r: 5 }}
                name={tech.replace(/([A-Z])/g, " $1").trim()} // Format labels
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
      </div>
      </div>
      <div style={{ background: "white", margin: "10px 0", padding: "10px", borderRadius: "10px", overflow: "auto", border: "1px solid #ddd" }}>
      
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        {/* <BarChartIcon size={28} className="text-blue-600" /> */}
        Recent entry:{filteredRecruitment[filteredRecruitment?.length-1]?.month}
      </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Recruitment Efforts with Pie Chart */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
              <UserPlus size={24} className="text-blue-600" />
              Recruitment Efforts
            </h3>
            <span className="text-gray-600 text-sm">Total: 33 Recruits</span>
          </div>
          
          <p className="text-gray-600 mb-3">
            Keeps track of recruitment efforts for forensic experts, analysts, and technicians.
          </p>
          

          {/* Pie Chart */}
          <div className="flex justify-center w-full">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={recruitmentData} dataKey="value" nameKey="name" outerRadius={100}
                    label={({ name, percent }) => ` ${(percent * 100).toFixed(1)}%`}

                >
                  {recruitmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Cyber Forensic Tools with Bar Chart */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
              <ShieldCheck size={24} className="text-green-600" />
              Cyber Forensic Advancements
            </h3>
            <span className="text-gray-600 text-sm">Overall Adoption: 80%</span>
          </div>
          
          <p className="text-gray-600 mb-3">
            Monitors advancements in cyber forensic tools, digital evidence analysis, and automation.
          </p>

          {/* Bar Chart for Cyber Forensic Tools */}
          <div className="flex justify-center w-full">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={cyberForensicData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value">
                  {cyberForensicData.map((entry, index) => (
                    <Cell key={`bar-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Operational Efficiency - Gauge Chart */}
        {/* <div className="bg-white p-4 rounded-xl shadow-md">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
              <TrendingUp size={24} className="text-purple-600" />
              Operational Efficiency
            </h3>
            <span className="text-gray-600 text-sm">Compliance: 92%</span>
          </div>
          <p className="text-gray-600 mb-3">
            Evaluating efficiency and ensuring adherence to forensic best practices.
          </p>

          Gauge Chart
          <div className="flex justify-center w-full">
            <ResponsiveContainer width="100%" height={250}>
              <RadialBarChart innerRadius="80%" outerRadius="100%" data={efficiencyData} startAngle={90} endAngle={-270}>
                <RadialBar minAngle={15} background clockWise dataKey="value" />
                <Tooltip />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>

          <p className="text-sm text-gray-500 mt-1">Target: 95% Compliance</p>
        </div> */}
        </div>
      </div>

    </div>
  );
};

export default ForensicStrengtheningInitiatives;
