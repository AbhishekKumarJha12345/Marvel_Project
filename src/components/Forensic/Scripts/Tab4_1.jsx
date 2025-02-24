import {React,useState,useEffect} from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts";

const dataMoUs = [
  { name: "Signed", value: 40 },
  { name: "In Progress", value: 30 },
  { name: "Pending", value: 20 },
  { name: "Expired", value: 10 },
];

const dataMoUs2 = [
  { name: "Approved", value: 50 },
  { name: "Rejected", value: 25 },
  { name: "Under Review", value: 25 },
];

const dataInfrastructure = [
  { project: "Roads", count: 120 },
  { project: "Bridges", count: 80 },
  { project: "Hospitals", count: 100 },
  { project: "Schools", count: 90 },
];

const COLORS_MOUS = ["#4CAF50", "#FFC107", "#FF9800", "#F44336"];
const COLORS_MOUS2 = ["#2196F3", "#3F51B5", "#673AB7"];
const COLORS_INFRA = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

export default function Tab4_1() {
   
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 - Total Cases Received */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold">Total Cases Received</h2>
          <p className="text-3xl font-bold">1,200</p>
        </div>

        {/* Card 2 - Cases Processed */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold">Cases Processed</h2>
          <p className="text-3xl font-bold">950</p>
        </div>

        {/* Card 3 - Pending Cases */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold">Pending Cases</h2>
          <p className="text-3xl font-bold">250</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* MoUs Pie Chart 1 */}
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
                label={({ name, value }) => `${name}: ${value}`}
              >
                {dataMoUs.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS_MOUS[index % COLORS_MOUS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => value} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* MoUs Pie Chart 2 */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Approval Status</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={dataMoUs2}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {dataMoUs2.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS_MOUS2[index % COLORS_MOUS2.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => value} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Infrastructure Development Projects Bar Chart */}
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
  );
}
