import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';  // Importing Routes and Route
import LoginPage from './components/Loginpage.jsx';
import Mainnavbar from './components/Mainnavbar.jsx';
import { Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ScheduledUpdateNotice from "../src/scehdule.jsx"
import { Schedule } from '@mui/icons-material';
function App() {
  const ProtectedRoute = ({ element }) => {
    const token = localStorage.getItem("token");
    return token ? element : <Navigate to="/" replace />;
  };

  return (
    // <>
     
    //   <Routes>
    //     <Route path="/" element={<LoginPage />} /> {/* Login page route */}
    //     <Route path="/mainnavbar"  element={<ProtectedRoute element={<Mainnavbar />} />} /> 
    //   </Routes>

    // </>
    <ScheduledUpdateNotice/>
  );
}

export default App;
