import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';  // Importing Routes and Route
import LoginPage from './components/Loginpage.jsx';
import Mainnavbar from './components/Mainnavbar.jsx';
import { Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const ProtectedRoute = ({ element }) => {
    const token = localStorage.getItem("token");
    return token ? element : <Navigate to="/" replace />;
  };

  return (
    <>
      {/* Define routes for LoginPage and Mainnavbar */}
      <Routes>
        <Route path="/" element={<LoginPage />} /> {/* Login page route */}
        <Route path="/mainnavbar"  element={<ProtectedRoute element={<Mainnavbar />} />} /> 
      </Routes>
    </>
  );
}

export default App;
