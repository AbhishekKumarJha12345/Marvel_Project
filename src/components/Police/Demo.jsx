import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Label
} from "recharts";

const data = [
  { type: "FIRs", IPC: 21, BNSS: 16 },
  { type: "Charge Sheets", IPC: 24, BNSS: 19 },
];

const firsBreakdown = [{ category: "Regular FIRs", count: 21 }, { category: "Zero FIRs", count: 0 },
{ category: "eFIRs", count: 0 }];
const bnssBreakdown = [
  { category: "Regular FIRs", count: 5 },
  { category: "Zero FIRs", count: 7 },
  { category: "eFIRs", count: 4 },
];

const chargesheet_ipc = [
  { category: "Snatching", count: 6 },
  { category: "Mob Lynching", count: 2 },
  { category: "Mob Assault", count: 0 },
  { category: "Terrorism", count: 6 },
  { category: "Organized Crime", count: 10 },
];

const chargesheet_bnss = [
  { category: "Snatching", count: 3 },
  { category: "Mob Lynching", count: 2 },
  { category: "Mob Assault", count: 6 },
  { category: "Terrorism", count: 4 },
  { category: "Organized Crime", count: 6 },
];


const FIRChart = () => {
  const [selectedSample, setSelectedSample] = useState(null);

  const handleBarClick = (type, category) => {
    const selectedKey =
      type === "FIRs" && category === "IPC"
        ? "FIR_IPC"
        : type === "FIRs" && category === "BNSS"
          ? "FIR_BNSS"
          : type === "Charge Sheets" && category === "IPC"
            ? "CHARGESHEET_IPC"
            : type === "Charge Sheets" && category === "BNSS"
              ? "CHARGESHEET_BNSS"
              : null;

    setSelectedSample((prev) => (prev === selectedKey ? null : selectedKey));
  };

  return (
    <div style={{ backgroundColor: "#ffff", borderRadius: "5px", marginBottom: "5px", textAlign: "center" }}>
      <h2>FIR/Charge Sheets</h2>
      {selectedSample ? (
        <div  style={{ textAlign: "left" }}>
          <button onClick={() => setSelectedSample(null)} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded">Back</button>
          {selectedSample === "FIR_IPC" && (
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={firsBreakdown} barSize={50}>

                <XAxis dataKey="category">
                  <Label value="Type of IPC FIR's" offset={-5} position="insideBottom" />
                </XAxis>

                {/* Y-Axis with Label */}
                <YAxis>
                  <Label value="Number of IPC FIR" angle={-90} position="insideLeft" style={{ textAnchor: "middle" }} />
                </YAxis>
                <Tooltip />
                <Legend />
                <Line dataKey="count" fill="#82ca9d"
                  onClick={(data) => handleBarClick(null)}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
          {selectedSample === "FIR_BNSS" && (
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={bnssBreakdown} barSize={50}>
              <XAxis dataKey="category">
                  <Label value="Type of BNSS FIR's" offset={-5} position="insideBottom" />
                </XAxis>

                {/* Y-Axis with Label */}
                <YAxis>
                  <Label value="Number of BNSS FIR" angle={-90} position="insideLeft" style={{ textAnchor: "middle" }} />
                </YAxis>
                <Tooltip />
                <Legend />
                <Line dataKey="count" fill="#82ca9d"
                  onClick={(data) => handleBarClick(null)}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
          {selectedSample === "CHARGESHEET_IPC" && (
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chargesheet_ipc} barSize={50}>
              <XAxis dataKey="category">
                  <Label value="Type of IPC Offences" offset={-5} position="insideBottom" />
                </XAxis>

                {/* Y-Axis with Label */}
                <YAxis>
                  <Label value="Number of IPC Offences" angle={-90} position="insideLeft" style={{ textAnchor: "middle" }} />
                </YAxis>
                <Tooltip />
                <Legend />
                <Line dataKey="count" fill="#82ca9d"
                  onClick={(data) => handleBarClick(null)}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
          {selectedSample === "CHARGESHEET_BNSS" && (
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chargesheet_bnss} barSize={50}>
              <XAxis dataKey="category">
                  <Label value="Type of BNSS Offences" offset={-5} position="insideBottom" />
                </XAxis>

                {/* Y-Axis with Label */}
                <YAxis>
                  <Label value="Number of BNSS Offences" angle={-90} position="insideLeft" style={{ textAnchor: "middle" }} />
                </YAxis>
                <Tooltip />
                <Legend />
                <Line dataKey="count" fill="#82ca9d"
                  onClick={(data) => handleBarClick(null)}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data} barSize={50} stackOffset="expand">
            {/* X-Axis with Label */}
            <XAxis dataKey="type">
              <Label value="Type of Cases" offset={-5} position="insideBottom" />
            </XAxis>

            {/* Y-Axis with Label */}
            <YAxis>
              <Label value="Number of Cases" angle={-90} position="insideLeft" style={{ textAnchor: "middle" }} />
            </YAxis>
            <Tooltip />
            <Legend />
            <Bar dataKey="IPC" fill="#8884d8" stackId="a" onClick={(data) => handleBarClick(data.type, "IPC")} />
            <Bar dataKey="BNSS" fill="#82ca9d" stackId="a" onClick={(data) => handleBarClick(data.type, "BNSS")} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default FIRChart;



// import React, { useState } from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// const data = [
//   { type: "FIRs", IPC: 10, BNSS: 8 },
//   { type: "Charge Sheets", IPC: 12, BNSS: 9 },
// ];

// const firsBreakdown = [
//   { category: "Regular FIRs", count: 5 },
//   // { category: "Zero FIRs", count: 3 },
//   // { category: "eFIRs", count: 4 },
// ];
// const bnssBreakdown = [
//   { category: "Zero FIRs", count: 3 },
//   { category: "eFIRs", count: 4 },
// ]
// const chargesheet_ipc = [
//   {category:"Snatching", count: 5},
//   {category:"Mob Lynching", count: 4},
//   {category:"Mob Assault", count: 3},
//   {category:"Terrorism", count: 2},
//   {category:"Organized Crime", count: 1}
// ]


// const offenseBreakdown = {
//   "Zero FIRs": [
//     { offense: "Snatching", count: 2 },
//     { offense: "Mob Assault", count: 1 },
//   ],
//   eFIRs: [
//     { offense: "Organized Crime", count: 3 },
//     { offense: "Terrorism", count: 1 },
//   ],
// };


// const FIRChart = () => {
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [selectedOffense, setSelectedOffense] = useState(null);


//   const [selectedSample, setSelectedSample] = useState(null);

//   const handleBarClick = (type, category) => {
//     if (type === "FIRs" && category === "IPC") {
//       setSelectedSample("FIR_IPC");
//     } else if (type === "FIRs" && category === "BNSS") {
//       setSelectedSample("FIR_BNSS");
//     } else if (type === "Charge Sheets" && category === "IPC") {
//       setSelectedSample("CHARGESHEET_IPC");
//     } else if (type === "Charge Sheets" && category === "BNSS") {
//       setSelectedSample("CHARGESHEET_BNSS");
//     }
//   };


//   return (
//     <div>

//       {selectedSample === "FIR_IPC" ? (
//         <div>
//           <button onClick={() => setSelectedSample(null)}>Back</button>
//           <h2>FIR BNSS Breakdown</h2>
//           <ResponsiveContainer width="100%" height={400}>
//             <BarChart data={firsBreakdown} barSize={50}>
//               <XAxis dataKey="category" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="count" fill="#82ca9d" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//       ) : selectedSample === "FIR_BNSS" ? (
//         <div>
//           <button onClick={() => setSelectedSample(null)}>Back</button>
//           <ResponsiveContainer width="100%" height={400}>
//             <BarChart data={bnssBreakdown} barSize={50}>
//               <XAxis dataKey="category" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="count" fill="#82ca9d" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//       ) : selectedSample === "CHARGESHEET_IPC" ? (
//         <div>
//           <button onClick={() => setSelectedSample(null)}>Back</button>
//           <ResponsiveContainer width="100%" height={400}>
//             <BarChart data={chargesheet_ipc} barSize={50}>
//               <XAxis dataKey="category" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="count" fill="#82ca9d" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//       ) : selectedSample === "CHARGESHEET_BNSS" ? (
//         <div>
//           <button onClick={() => setSelectedSample(null)}>Back</button>
//           <ResponsiveContainer width="100%" height={400}>
//             <BarChart data={chargesheet_ipc} barSize={50}>
//               <XAxis dataKey="category" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="count" fill="#82ca9d" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//       ) : (
//         <ResponsiveContainer width="100%" height={400}>
//           <BarChart data={data} barSize={50}>
//             <XAxis dataKey="type" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar
//               dataKey="IPC"
//               fill="#8884d8"
//               onClick={(data) => handleBarClick(data.type, "IPC")}
//             />
//             <Bar
//               dataKey="BNSS"
//               fill="#82ca9d"
//               onClick={(data) => handleBarClick(data.type, "BNSS")}
//             />

//           </BarChart>
//         </ResponsiveContainer>

//       )}

//     </div>
//   );
// };

// export default FIRChart;

