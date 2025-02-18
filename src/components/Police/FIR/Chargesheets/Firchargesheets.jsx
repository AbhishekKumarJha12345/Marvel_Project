import React, { useEffect, useState } from 'react';
import PoliceChargeSheet from './PoliceChargeSheet';
import Chargesheet from './Firstchargesheet';
import Chargesheetstatus from './Chargesheetstatus';
import axiosInstance from '../../../../utils/axiosInstance';

function Firchargesheets() {
  const [activeTab, setActiveTab] = useState('home');
  const [fir2Data, setFir2Data] = useState(null);
  const [fir3Data, setFir3Data] = useState(null);

  // Fetch FIR2 and FIR3 data from Flask
  const getTrainingData = async () => {
    try {
      const [response1, response2] = await Promise.all([
        axiosInstance.get('/live_data?type=fir_2'),
        axiosInstance.get('/live_data?type=fir_3'),
      ]);

      console.log(response1.data, 'FIR2 Data ----------');
      console.log(response2.data, 'FIR3 Data ----------');
      setFir2Data(response1.data.data_dict);
      setFir3Data(response2.data.data_dict);
    } catch (error) {
      console.error("Error fetching FIR data:", error);
    }
  };

  useEffect(() => {
    getTrainingData();
  }, []);

  // Handle tab switching
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Function to send FIR Charge Sheet data to Flask and download the report
  const downloadReport = async () => {
    if (!fir2Data || !fir3Data) {
      alert("No FIR data available for the report.");
      return;
    }

    const requestData = {
      chart_type: "donut", // Choose appropriate chart type
      data: {
        title: "Charge Sheet Statistics",
        labels: [
          "Total Charge Sheeted",
          "Acquitted",
          "Convicted",
          "Pending Cases",
          "Total Registered Cases",
          "Chargesheeted Cases",
          "Under Investigation",
        ],
        values: [
          parseInt(fir2Data.total_charge_sheeted) || 0,
          parseInt(fir2Data.acquitted) || 0,
          parseInt(fir2Data.convicted) || 0,
          parseInt(fir2Data.pending) || 0,
          parseInt(fir3Data.total_registered) || 0,
          parseInt(fir3Data.chargesheeted) || 0,
          parseInt(fir3Data.under_investigation) || 0,
        ],
        colors: ["#FF5733", "#33FF57", "#3357FF", "#FF33A8", "#33FFF5", "#FFC300", "#800080"],
        y_label: "Count",
      },
    };

    try {
      const response = await axiosInstance.post('/generate_report', requestData, {
        responseType: 'blob',
      });

      // Create a URL for the PDF blob and trigger download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'charge_sheet_report.pdf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading Charge Sheet report:", error);
    }
  };

  return (
    <div>
      {/* Navigation Tabs */}
      <div className="flex space-x-4 border-b border-gray-300">
        <button
          onClick={() => handleTabChange('home')}
          className={`py-2 px-4 text-lg font-medium ${activeTab === 'home' ? 'border-b-2 border-[#03045E] text-[#03045E]' : 'text-gray-500 hover:text-blue-500'}`}
        >
          Home
        </button>
        <button
          onClick={() => handleTabChange('newCriminals')}
          className={`py-2 px-4 text-lg font-medium ${activeTab === 'newCriminals' ? 'border-b-2 border-[#03045E] text-[#03045E]' : 'text-gray-500 hover:text-blue-500'}`}
        >
          Charge Sheets
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {activeTab === 'home' ? (
          <div className="col-6">
            <div className="card shadow-sm bg-white">
              <div className="card-body" style={{ paddingBottom: "5rem" }}>
                <PoliceChargeSheet apidata={fir2Data} />
              </div>
            </div>
          </div>
        ) : (
          <div>
            <Chargesheet />
            <Chargesheetstatus apidata={fir3Data} />
          </div>
        )}
      </div>

      {/* Download Report Button */}
      <div className="mt-4">
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg" onClick={downloadReport}>
          Download Charge Sheet Report
        </button>
      </div>
    </div>
  );
}

export default Firchargesheets;
