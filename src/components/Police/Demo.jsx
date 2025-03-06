import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { LineChart, Line } from "recharts";

// const data = [
//   { type: "FIRs", IPC: 10, BNSS: 8 },
//   { type: "Charge Sheets", IPC: 12, BNSS: 9 },
// ];
const data = [
  { category: "IPC", FIRs: 10, ChargeSheets: 12 },
  { category: "BNSS", FIRs: 8, ChargeSheets: 9 },
];

const firsBreakdown = [
  { category: "Regular FIRs", IPC_count: 5, BNSS_count: 6 },
  { category: "Zero FIRs", IPC_count: 3, BNSS_count: 6 },
  { category: "eFIRs", IPC_count: 4, BNSS_count: 6 },
];

const bnssBreakdown = [
  { category: "Zero FIRs", count: 3 },
  { category: "eFIRs", count: 4 },
];

const chargesheet_ipc = [
  { category: "Snatching", count: 5 },
  { category: "Mob Lynching", count: 4 },
  { category: "Mob Assault", count: 3 },
  { category: "Terrorism", count: 2 },
  { category: "Organized Crime", count: 1 },
];

const lineGraphTimePeriod = [
  { category: "Jan", count: 10 },
  { category: "Feb", count: 15 },
  { category: "Mar", count: 8 },
  { category: "Apr", count: 20 },
  { category: "May", count: 12 },
];

const FIRChart = () => {
  const [selectedSample, setSelectedSample] = useState(null);

  // const handleBarClick = (category, type) => {
  //   const selectedKey =
  //     category === "IPC" && type === "IPC_BNSS"
  //       ? "IPC_BNSS"
  //       : category === "IPC" && type === "sna_mob_terrosim"
  //         ? "sna_mob_terrosim"
  //         : category === "BNSS" && type === "ChargeSheets"
  //           ? "CHARGESHEET_BNSS"
  //           : null;

  //   setSelectedSample((prev) => (prev === selectedKey ? null : selectedKey));
  // };
  const handleBarClick = (category, type) => {
    const selectedKey =
      type === "IPC_BNSS"
        ? "IPC_BNSS" // Clicking on IPC_BNSS bars should go to sna_mob_terrosim
        : type === "sna_mob_terrosim"
        ? "sna_mob_terrosim" // Clicking on sna_mob_terrosim bars should go to chargesheet_ipc
        : type === "line_graph_time_period"
        ? "line_graph_time_period"
        : null;

    setSelectedSample((prev) => (prev === selectedKey ? null : selectedKey));
  };

  return (
    <div>
      {selectedSample ? (
        <div>
          <button onClick={() => setSelectedSample(null)}>Back</button>
          {selectedSample === "IPC_BNSS" && (
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={firsBreakdown} barSize={50}>
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="IPC_count"
                  fill="#8884d8"
                  name="IPC"
                  onClick={(data) =>
                    handleBarClick(data.category, "sna_mob_terrosim")
                  }
                />
                <Bar
                  dataKey="BNSS_count"
                  fill="#82ca9d"
                  name="BNSS"
                  onClick={(data) =>
                    handleBarClick(data.category, "sna_mob_terrosim")
                  }
                />
              </BarChart>
            </ResponsiveContainer>
          )}
          {selectedSample === "sna_mob_terrosim" && (
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={chargesheet_ipc} barSize={50}>
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="count"
                  fill="#82ca9d"
                  onClick={(data) =>
                    handleBarClick(data.category, "line_graph_time_period")
                  }
                />
              </BarChart>
            </ResponsiveContainer>
          )}
          {selectedSample === "line_graph_time_period" && (
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={lineGraphTimePeriod}>
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#82ca9d"
                  onClick={(data) => handleBarClick(null)}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data} barSize={50}>
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="FIRs"
              stackId="a"
              fill="#8884d8"
              onClick={(data) => handleBarClick(data.category, "IPC_BNSS")}
            />
            <Bar
              dataKey="ChargeSheets"
              stackId="a"
              fill="#82ca9d"
              onClick={(data) => handleBarClick(data.category, "IPC_BNSS")}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default FIRChart;
