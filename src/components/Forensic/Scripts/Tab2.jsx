import React, { useState } from "react";
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

// Dummy data
const dataAvailability = [
  { name: "Available", value: 45 },
  { name: "In Use", value: 30 },
  { name: "Under Maintenance", value: 15 },
  { name: "Out of Service", value: 10 },
];

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


const COLORS = ["#00C49F", "#FFBB28", "#FF8042", "#FF0000"];

export default function Tab2() {


  return (
    <div className="p-6 bg-white shadow-lg rounded-lg w-full max-w-full h-auto" style={{ fontFamily: "Work Sans", maxWidth:'90vw' }}>
      <h1 className="text-2xl font-bold mb-6">Mobile Forensic Vans Dashboard</h1>

      {/* Image Carousel Over Van Availability */}
      <div className="relative mb-6">
        <ImageCarousel />
      </div>

      {/* Van Availability Table */}

      <div className="relative mb-6">
        <VanAvailability />
      </div>

     
      {/* Van Availability Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Availability Pie Chart */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Van Availability</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={dataAvailability}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {dataAvailability.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Response Times Bar Chart */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Response Times by Region</h2>
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
          <h2 className="text-xl font-semibold mb-4">Expansion Demand by Region</h2>
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
