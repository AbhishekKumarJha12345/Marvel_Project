import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axiosInstance from "../../utils/axiosInstance";

const TrainingDataGraph = () => {
  const [selectedMetric, setSelectedMetric] = useState("available_officers");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/live_data", {
          params: { type: "line" },
        });

        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Loading state
  if (loading) return <div>Loading...</div>;

  // Error state
  if (error) return <div>Error: {error}</div>;

  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="text-center p-4 text-gray-500">No data available</div>
    );
  }

  const processedData = Object.values(
    data.reduce((acc, entry) => {
      const date = new Date(entry.date).toLocaleDateString("en-US");

      if (!acc[date]) {
        acc[date] = { date };
      }

      if (entry.latest_training_psi_sp_dcp) {
        acc[date].psi_sp_dcp =
          parseInt(entry.latest_training_psi_sp_dcp[selectedMetric], 10) || 0;
      }
      if (entry.latest_training_pc_asi) {
        acc[date].pc_asi =
          parseInt(entry.latest_training_pc_asi[selectedMetric], 10) || 0;
      }

      return acc;
    }, {})
  );

  return (
    <div className="bg-white p-4 rounded-xl shadow-md" style={{width:"48%"}}>
      <div className="flex justify-between mb-4">
        <h2 className="">Training Data Graph</h2>
        {/* Dropdown for selecting metric */}
        <select
          onChange={(e) => setSelectedMetric(e.target.value)}
          value={selectedMetric}
          className="p-1 border rounded-lg bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="available_officers">Available Officers</option>
          <option value="trained_officers">Trained Officers</option>
        </select>
      </div>

      {/* Line Chart */}
      <div className="w-full h-auto min-h-[300px]">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={processedData}>
            <XAxis dataKey="date" stroke="#6b7280" tick={{ fontSize: 14 }} />
            <YAxis stroke="#6b7280" tick={{ fontSize: 14 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#f9fafb",
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
              }}
            />
            <Legend iconType="circle" wrapperStyle={{ paddingBottom: 10 }} />
            <Line
              type="monotone"
              dataKey="psi_sp_dcp"
              stroke="#34d399"
              strokeWidth={4}
              dot={{ r: 5 }}
              name="PSI/SP/DCP"
            />
            <Line
              type="monotone"
              dataKey="pc_asi"
              stroke="#6366f1"
              strokeWidth={4}
              dot={{ r: 5 }}
              name="PC/ASI"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TrainingDataGraph;
