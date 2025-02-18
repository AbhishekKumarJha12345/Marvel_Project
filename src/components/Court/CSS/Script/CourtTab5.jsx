import React from 'react';
import {
   BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';

// Dummy Data for NYAYSHRUTI Project Implementation
const deploymentStatusData = [
  { stage: 'Planning', progress: 100 },
  { stage: 'Development', progress: 75 },
  { stage: 'Testing', progress: 50 },
  { stage: 'Implementation', progress: 20 },
];

const speechToTextIntegrationData = [
  { month: 'Jan', progress: 10 },
  { month: 'Feb', progress: 20 },
  { month: 'Mar', progress: 35 },
  { month: 'Apr', progress: 45 },
  { month: 'May', progress: 60 },
  { month: 'Jun', progress: 75 },
  { month: 'Jul', progress: 80 },
  { month: 'Aug', progress: 90 },
  { month: 'Sep', progress: 95 },
  { month: 'Oct', progress: 100 },
];

const userFeedbackData = [
  { subject: 'Judges', adoption: 85, satisfaction: 90 },
  { subject: 'Legal Professionals', adoption: 75, satisfaction: 85 },
  { subject: 'Administrative Staff', adoption: 80, satisfaction: 80 },
];

// Custom colors for visualization
const colorPalette = ['#82ca9d', '#FF6347', '#8884d8', '#66c2a5'];

const CourtTab5 = () => {
  return (
    <div className="rounded-lg w-full max-w-full h-auto">
      <h1 className="text-2xl font-bold mb-6">NYAYSHRUTI Project Implementation Progress</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Deployment Status and Impact on Judicial Processes (Stacked Bar Chart) */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-4">Deployment Status & Impact on Judicial Processes</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={deploymentStatusData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="stage" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="progress" stackId="a" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Integration of Speech-to-Text & AI Transcription (Line Chart) */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-4">Speech-to-Text & AI Transcription Integration</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={speechToTextIntegrationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="progress" stroke="#FF6347" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* User Adoption & Feedback (Radar Chart) */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-4">User Adoption & Feedback</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart outerRadius={90} width={500} height={300} data={userFeedbackData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis />
              <Radar name="Adoption Rate" dataKey="adoption" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
              <Radar name="Satisfaction Rate" dataKey="satisfaction" stroke="#66c2a5" fill="#66c2a5" fillOpacity={0.6} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
};

export default CourtTab5;
