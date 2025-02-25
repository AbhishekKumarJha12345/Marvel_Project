import {React,useState,useEffect} from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, LineChart, Line } from "recharts";

const dataMoUs = [
  { name: "Signed", value: 40 },
  { name: "In Progress", value: 30 },
  { name: "Pending", value: 20 },
  { name: "Expired", value: 10 },
];

const dataInfrastructure = [
  { project: "New Labs", count: 25 },
  { project: "Tech Upgradation", count: 40 },
  { project: "Facility Expansion", count: 35 },
];

const dataMoUsMonthly = [
  { month: "Jan 2024", Signed: 5, InProgress: 8, Pending: 4, Expired: 2 },
  { month: "Feb 2024", Signed: 7, InProgress: 9, Pending: 5, Expired: 3 },
  { month: "Mar 2024", Signed: 6, InProgress: 7, Pending: 3, Expired: 1 },
  { month: "Apr 2024", Signed: 9, InProgress: 10, Pending: 6, Expired: 4 },
  { month: "May 2024", Signed: 8, InProgress: 12, Pending: 7, Expired: 3 },
  { month: "Jun 2024", Signed: 10, InProgress: 14, Pending: 8, Expired: 5 },
  { month: "Jul 2024", Signed: 11, InProgress: 13, Pending: 6, Expired: 4 },
  { month: "Aug 2024", Signed: 9, InProgress: 11, Pending: 5, Expired: 2 },
  { month: "Sep 2024", Signed: 7, InProgress: 10, Pending: 4, Expired: 3 },
  { month: "Oct 2024", Signed: 10, InProgress: 12, Pending: 6, Expired: 2 },
  { month: "Nov 2024", Signed: 8, InProgress: 9, Pending: 5, Expired: 3 },
  { month: "Dec 2024", Signed: 6, InProgress: 8, Pending: 4, Expired: 2 },
];
const dataInfrastructureMonthly = [
  { month: "Jan 2024", NewLabs: 2, TechUpgradation: 4, FacilityExpansion: 3 },
  { month: "Feb 2024", NewLabs: 3, TechUpgradation: 5, FacilityExpansion: 4 },
  { month: "Mar 2024", NewLabs: 2, TechUpgradation: 4, FacilityExpansion: 3 },
  { month: "Apr 2024", NewLabs: 4, TechUpgradation: 6, FacilityExpansion: 5 },
  { month: "May 2024", NewLabs: 3, TechUpgradation: 7, FacilityExpansion: 4 },
  { month: "Jun 2024", NewLabs: 5, TechUpgradation: 8, FacilityExpansion: 6 },
  { month: "Jul 2024", NewLabs: 6, TechUpgradation: 7, FacilityExpansion: 5 },
  { month: "Aug 2024", NewLabs: 4, TechUpgradation: 6, FacilityExpansion: 4 },
  { month: "Sep 2024", NewLabs: 3, TechUpgradation: 5, FacilityExpansion: 3 },
  { month: "Oct 2024", NewLabs: 5, TechUpgradation: 7, FacilityExpansion: 4 },
  { month: "Nov 2024", NewLabs: 4, TechUpgradation: 6, FacilityExpansion: 5 },
  { month: "Dec 2024", NewLabs: 3, TechUpgradation: 5, FacilityExpansion: 3 },
];


const dataResourceAllocation = [
  { category: "Land Acquisition", value: 50 },
  { category: "Resource Allocation", value: 70 },
  { category: "Facility Expansion", value: 60 },
];

const dataRecruitment = [
  { category: "Deputy Director (Filled)", value: 2 },
  { category: "Assistant Director (Filled)", value: 3 },
  { category: "Assistant Chemical Analyser (Filled)", value: 33 },
  { category: "Scientific Officer (Filled)", value: 15 },
  { category: "Class 3 Cadre (In Progress)", value: 125 },
  { category: "Contract Basis (Hired)", value: 336 },
  { category: "Contract Basis (In Progress)", value: 189 },
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
  "#b0a8b9" // Dusty Lilac
  ];
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

export default function ForensicDashboard() {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [fromDate1, setFromDate1] = useState(null);
  const [toDate1, setToDate1] = useState(null);
  const[filteredMoUsMonthly,setfilteredMoUsMonthly]=useState(dataMoUsMonthly)
  const[filteredInfrastructureMonthly,setfilteredInfrastructureMonthly]=useState(dataInfrastructureMonthly)
  const Clearfilter=(type)=>{
    if(type==='1')
        {
          setFromDate(null);
        setToDate(null);
        setfilteredMoUsMonthly(dataMoUsMonthly)
      }
        
        if(type==='2'){
        setFromDate1(null);
        setToDate1(null);
        setfilteredInfrastructureMonthly(dataInfrastructureMonthly)}
        }
      
  const restructureMoUsData = (type) => {
    // Get the last month's data
    if(type==='1')
    {

      const lastMonthData = filteredMoUsMonthly[filteredMoUsMonthly.length - 1];
      
      return [
        { name: "Signed", value: lastMonthData.Signed },
        { name: "In Progress", value: lastMonthData.InProgress },
        { name: "Pending", value: lastMonthData.Pending },
        { name: "Expired", value: lastMonthData.Expired },
      ];
    }
    if(type==='2')
      {
        const lastMonthData = filteredInfrastructureMonthly[filteredInfrastructureMonthly.length - 1];
        return [
          { name: "New Labs", value: lastMonthData.NewLabs },
          { name: "Tech Upgradation", value: lastMonthData.TechUpgradation },
          { name: "Facility Expansion", value: lastMonthData.FacilityExpansion },
        ];
      }
};
  const filterDataByDate = (data, fromDate, toDate) => {
    if (!fromDate && !toDate) return data;
  
    return data.filter(item => {
    const itemDate = dayjs(item.month, "MMM YYYY");
    if (fromDate && itemDate.isBefore(dayjs(fromDate))) return false;
    if (toDate && itemDate.isAfter(dayjs(toDate))) return false;
    return true;
    });
    };
    
    useEffect(() => {
      if (fromDate || toDate) {
        // Example usage:
        const rand1 = filterDataByDate(dataMoUsMonthly, fromDate, toDate);
        setfilteredMoUsMonthly(rand1)
      }
    }, [fromDate, toDate]);
    useEffect(() => {
      if (fromDate1 || toDate1) {
        // Example usage:
        const rand2 = filterDataByDate(dataInfrastructureMonthly, fromDate1, toDate1);
        setfilteredInfrastructureMonthly(rand2)
      }
    }, [fromDate1, toDate1]);
  const[dataMoUs,setDataMoUs]=useState(restructureMoUsData('1'))
  const[dataInfrastructure,setDataInfrastructure]=useState(restructureMoUsData('2'))


    useEffect(() => {
      if (filteredInfrastructureMonthly) {
        // Example usage:
        const data=restructureMoUsData('2');
        setDataInfrastructure(data)
      }
      if(filteredMoUsMonthly){
        const data=restructureMoUsData('1');
        setDataMoUs(data)
      }
    }, [filteredInfrastructureMonthly, filteredMoUsMonthly]);
    

  return (
    <div className="rounded-lg w-full max-w-full h-auto">
      <h1 className="text-2xl font-bold mb-6">Forensic Development Dashboard</h1>

    <div style={{ background: "white", margin: "10px 0", padding: "10px", borderRadius: "10px", overflow: "auto", border: "1px solid #ddd" }}>
        <h2 style={{ textAlign: "left", fontSize: "1.5rem", fontWeight: "bold" }}>Deviation</h2>
    

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* MOnthly Infrastructure Development Bar Chart */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-bold mb-4">Monthly Infrastructure Development Projects</h2>

        <div className="flex items-center gap-4">
          
          <div>
             
            <DatePicker
            label='From'
              views={["year", "month"]}
              value={fromDate1}
              onChange={setFromDate1}
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
              value={toDate1}
              onChange={setToDate1}
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
            onClick={() => Clearfilter('2')}
            className="bg-blue-500 text-white px-3 py-1 rounded-md "
            style={{ backgroundColor: "#2d3748" }}>
            Clear
          </button>
        </div>

      </div>
        </LocalizationProvider>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={filteredInfrastructureMonthly}>
            <XAxis
              dataKey="month"
              stroke="#6b7280"
              tick={{ fontSize: 14 }}
              label={{
                value: "Month",
                position: "insideBottom",
                offset: -5,
              }}
            />
            <YAxis
              stroke="#6b7280"
              tick={{ fontSize: 14 }}
              label={{
                value: "Count",
                angle: -90,
                position: "insideLeft",
                offset: 0,
                style: { textAnchor: "middle" },
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#f9fafb",
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
              }}
            />
            <Legend iconType="circle" wrapperStyle={{ paddingBottom: 10, paddingTop: 10 }} />
            {["NewLabs", "TechUpgradation", "FacilityExpansion"].map((key, index) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={chartColors[index]}
                strokeWidth={3}
                dot={{ r: 5 }}
                name={key}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

        {/* monthly MoUs Chart */}

      <div className="bg-white p-4 rounded-lg shadow-md">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-bold mb-4">Monthly MoUs with NFSU</h2>


        <div className="flex items-center gap-4">
          
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
            onClick={() => Clearfilter('1')}
            className="bg-blue-500 text-white px-3 py-1 rounded-md "
            style={{ backgroundColor: "#2d3748" }}>
            Clear
          </button>
        </div>

      </div>
        </LocalizationProvider>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={filteredMoUsMonthly}>
            <XAxis
              dataKey="month"
              stroke="#6b7280"
              tick={{ fontSize: 14 }}
              label={{
                value: "Month",
                position: "insideBottom",
                offset: -5,
              }}
            />
            <YAxis
              stroke="#6b7280"
              tick={{ fontSize: 14 }}
              label={{
                value: "Count",
                angle: -90,
                position: "insideLeft",
                offset: 0,
                style: { textAnchor: "middle" },
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#f9fafb",
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
              }}
            />
            <Legend iconType="circle" wrapperStyle={{ paddingBottom: 10, paddingTop: 10 }} />
            {["Signed", "InProgress", "Pending", "Expired"].map((key, index) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={chartColors[index]}
                strokeWidth={3}
                dot={{ r: 5 }}
                name={key}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
      </div>
      </div>
      <div style={{ background: "white", margin: "10px 0", padding: "10px", borderRadius: "10px", overflow: "auto", border: "1px solid #ddd" }}>
      <h2 style={{ textAlign: "left", fontSize: "1.5rem", fontWeight: "bold" }}>Recent Entry:{filteredInfrastructureMonthly[filteredInfrastructureMonthly.length-1]?.month}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      {/* Infrastructure Development Bar Chart */}
      <div className="bg-white p-4 rounded-xl shadow-md">
      {/* <h2 className="text-xl font-semibold mb-4">Recent Entry:{dataInfrastructureMonthly[dataInfrastructureMonthly.length-1]?.month}</h2> */}

        <h2 className="text-xl font-semibold mb-4">Infrastructure Development Projects</h2>

        <ResponsiveContainer width="100%" height={300}>
<PieChart>
  <Pie 
    data={dataInfrastructure} 
    dataKey="count" 
    nameKey="name" 
    cx="50%" 
    cy="50%" 
    outerRadius={100} 
    fill="#8884d8" 
    label={({ name, percent }) => ` ${(percent * 100).toFixed(1)}%`}

  >
    {dataInfrastructure.map((entry, index) => (
      <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
    ))}
  </Pie>
  <Tooltip />
  <Legend />
</PieChart>
</ResponsiveContainer>

      </div>

      {/* MoUs Pie Chart */}
      <div className="bg-white p-4 rounded-xl shadow-md">
      {/* <h2 className="text-xl font-semibold mb-4">Recent Entry:{dataMoUsMonthly[dataMoUsMonthly.length-1]?.month}</h2> */}

                <h2 className="text-xl font-semibold mb-4">MoUs with NFSU</h2>

                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={dataMoUs}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => ` ${(percent * 100).toFixed(1)}%`}

                    >
                      {dataMoUs.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend/>
                  </PieChart>
                </ResponsiveContainer>

      </div>

      {/* Resource Allocation Line Chart */}
      <div className="bg-white p-4 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Resource Allocation & Facility Expansion</h2>
        <ResponsiveContainer width="100%" height={300}>
<BarChart data={dataResourceAllocation}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="category" />
  <YAxis />
  <Tooltip />
  <Legend />
  <Bar dataKey="value" fill="#82ca9d" />
</BarChart>
</ResponsiveContainer>

      </div>

      {/* Recruitment Line Chart */}
      <div className="bg-white p-4 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Recruitment & Hiring of Forensic Experts</h2>
        <ResponsiveContainer width="100%" height={300}>
<BarChart data={dataRecruitment}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="category" />
  <YAxis />
  <Tooltip />
  <Legend />
  <Bar dataKey="value" fill="#FF8042" barSize={30} />
</BarChart>
</ResponsiveContainer>

      </div>
        
      </div>
      </div>

    </div>
  );
}
