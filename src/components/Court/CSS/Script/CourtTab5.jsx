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
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '40px', color: '#333' }}>NYAYSHRUTI Project Implementation Progress</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>

        {/* Deployment Status and Impact on Judicial Processes (Stacked Bar Chart) */}
        <div style={{ width: '48%', marginBottom: '30px', backgroundColor: '#f7f7f7', borderRadius: '10px', padding: '20px' }}>
          <h3>Deployment Status & Impact on Judicial Processes</h3>
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
        <div style={{ width: '48%', marginBottom: '30px', backgroundColor: '#f7f7f7', borderRadius: '10px', padding: '20px' }}>
          <h3>Speech-to-Text & AI Transcription Integration</h3>
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
        <div style={{ width: '48%', marginBottom: '30px', backgroundColor: '#f7f7f7', borderRadius: '10px', padding: '20px' }}>
          <h3>User Adoption & Feedback</h3>
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
