import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import ImageCarousel from "./ImageCarousel";
import VanAvailability from "./VanAvailability";
import axios from "axios";
import axiosInstance from "../../../utils/axiosInstance";

const dataResponseTimes = [
  { region: "North", responseTime: 20 },
  { region: "South", responseTime: 25 },
  { region: "East", responseTime: 30 },
  { region: "West", responseTime: 15 },
];

const dataExpansionDemand = [
  { region: "North", demand: 50 },
  { region: "South", demand: 70 },
  { region: "East", demand: 60 },
  { region: "West", demand: 40 },
];

const COLORS = [ "#FFBB28", "#FF8042", "#FF0000", "#00C49F"];

export default function Tab2() {
  const [vanDeploymentData, setVanDeploymentData] = useState(null);
  const [pieChartData, setPieChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/live_data", {
          params: { type: "forensic_van" },
        });

        setVanDeploymentData(response.data);
        console.log("Van deployment Data is:", response.data);
      } catch (error) {
        console.log("Erros occurred:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (vanDeploymentData?.status_counts) {
      // Directly use status_counts, no need to use Object.entries for an array.
      setPieChartData(
        vanDeploymentData.status_counts.map((entry) => ({
          name: entry.name
            .replace(/_/g, " ")
            .replace(/\b\w/g, (char) => char.toUpperCase()), // Format names
          value: entry.value,
        }))
      );
    }
  }, [vanDeploymentData]);
  

  return (
    <div
      className="p-6 bg-white shadow-lg rounded-lg w-full max-w-full h-auto"
      style={{ fontFamily: "Work Sans", maxWidth: "90.7vw" }}
    >
      <h1 className="text-2xl font-bold mb-6">
        Mobile Forensic Vans Dashboard
      </h1>

      {/* Image Carousel Over Van Availability */}
      <div className="relative mb-6">
        <ImageCarousel />
      </div>

      {/* Van Availability Table */}

      <div className="relative mb-6">
        <VanAvailability vanData={vanDeploymentData?.data} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Availability Pie Chart */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Van Availability</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {pieChartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Response Times Bar Chart */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            Response Times by Region
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dataResponseTimes}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="region" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="responseTime" fill="#8884d8" barSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Expansion Demand Bar Chart */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            Expansion Demand by Region
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dataExpansionDemand}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="region" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="demand" fill="#82ca9d" barSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
