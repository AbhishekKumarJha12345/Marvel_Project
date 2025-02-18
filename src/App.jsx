import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';  // Importing Routes and Route
import LoginPage from './components/Loginpage.jsx';
import Mainnavbar from './components/Mainnavbar.jsx';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* Define routes for LoginPage and Mainnavbar */}
      <Routes>
        <Route path="/" element={<LoginPage />} /> {/* Login page route */}
        <Route path="/mainnavbar" element={<Mainnavbar />} /> {/* Mainnavbar route */}
      </Routes>
    </>
  );
}

export default App;
