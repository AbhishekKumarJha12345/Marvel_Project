import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts";

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

const COLORS = ["#00C49F", "#FFBB28", "#FF8042", "#FF0000"];
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
 
export default function Tab3() {
  const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
     const Clearfilter=()=>{
          setFromDate(null);
          setToDate(null);
        }
        
        useEffect(() => {
          if(fromDate||toDate)
          {
            // fetchImplementationData();
          }
        }, [fromDate,toDate]);
  return (
    <div className="p-6">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-bold mb-6">Forensic Development Dashboard</h1>
      
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
            onClick={Clearfilter} 
            className="bg-blue-500 text-white px-3 py-1 rounded-md "
            style={{ backgroundColor: "#2d3748" }}>
            Clear Filter
          </button>
        </div>

      </div>
    </LocalizationProvider>
    <div style={{ background: "white", margin: "10px 0", padding: "10px", borderRadius: "10px", overflow: "auto", border: "1px solid #ddd" }}>
      <p>adfbhdajhadjhv   </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* MoUs Pie Chart */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">MoUs with NFSU</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={dataMoUs}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {dataMoUs.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        

        {/* Infrastructure Development Bar Chart */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Infrastructure Development Projects</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dataInfrastructure}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="project" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" barSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Resource Allocation Bar Chart */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Resource Allocation & Facility Expansion</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dataResourceAllocation}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#82ca9d" barSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recruitment Bar Chart */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Recruitment & Hiring of Forensic Experts</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dataRecruitment}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#FF8042" barSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
