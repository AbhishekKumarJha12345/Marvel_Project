import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axiosInstance from "../../utils/axiosInstance";

const TrainingDataGraph2 = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/live_data", {
        params: {
          type: "line_workshop",
        },
      });
      const result = response.data;
      if (result?.data_dict) {
        const sortedData = result?.data_dict
          .map((item) => ({
            month: item.month,
            count: parseInt(item.count, 10),
          }))
          .sort((a, b) => new Date(a.month) - new Date(b.month));

        setData(sortedData);
      }

      // setData(sortedData);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div
      className="bg-white p-4 rounded-xl shadow-md"
      style={{ width: "100%", height: 500 }}
    >
      <h2 className="text-xl font-semibold mb-4">
        Monthly Workshops Conducted
      </h2>
      <ResponsiveContainer width="100%" height="92%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#8884d8"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrainingDataGraph2;
