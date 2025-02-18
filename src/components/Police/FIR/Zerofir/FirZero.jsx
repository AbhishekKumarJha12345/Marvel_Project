import React, { useEffect, useState } from 'react';
import ZeroFir from './ZeroFir';
import Zerofiroutside from './ZeroFIRoutside';
import ZeroFirinside from './ZeroFIRinNcl';
import Receivedfromotherstates from './ReceivedfromOtherstates';
import Transferredtootherstates from './Transferedotherstates';
import axiosInstance from '../../../../utils/axiosInstance';

function FirZero() {
  const [activeTab, setActiveTab] = useState('home');
  const [trainingData, setTrainingData] = useState('');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const getTrainingData = async () => {
    try {
      const response = await axiosInstance.get('/live_data?type=fir_3');
      console.log(response.data, 'FIR3 Data ----------');
      setTrainingData(response.data.data_dict);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTrainingData();
  }, []);

  // Function to handle report download
  const handleDownloadReport = async () => {
    try {
      const response = await axiosInstance.post(
        '/generate_report',
        {
          chart_type: 'donut',
          data: {
            labels: ['Total Registered', 'Charge-sheeted', 'Under Investigation'],
            values: [
              parseInt(trainingData.total_registered, 10),
              parseInt(trainingData.chargesheeted, 10),
              parseInt(trainingData.under_investigation, 10),
            ],
            title: 'FIR3 Report - Donut Chart',
          },
        },
        { responseType: 'blob' }
      );

      const blob = new Blob([response.data], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'FIR3_Report.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading report:', error);
    }
  };

  return (
    <div>
      <div className="flex space-x-4 border-b border-gray-300">
        <button
          onClick={() => handleTabChange("home")}
          className={`py-2 px-4 text-lg font-medium ${
            activeTab === "home"
              ? "border-b-2 border-[#03045E] text-[#03045E]"
              : "text-gray-500 hover:text-blue-500"
          }`}
        >
          Home
        </button>
        <button
          onClick={() => handleTabChange("newCriminals")}
          className={`py-2 px-4 text-lg font-medium ${
            activeTab === "newCriminals"
              ? "border-b-2 border-[#03045E] text-[#03045E]"
              : "text-gray-500 hover:text-blue-500"
          }`}
        >
          Zero FIR
        </button>

        <button
          onClick={() => handleTabChange("transferred/receivedzerofir")}
          className={`py-2 px-4 text-lg font-medium ${
            activeTab === "transferred/receivedzerofir"
              ? "border-b-2 border-[#03045E] text-[#03045E]"
              : "text-gray-500 hover:text-blue-500"
          }`}
        >
          Transferred/Received Zero FIR
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {activeTab === 'home' && (
          <div className="col-6">
            <div className="card shadow-sm bg-white">
              <div className="card-body">
                <ZeroFir />
              </div>
            </div>
          </div>
        )}
        {activeTab === 'newCriminals' && (
          <div>
            <h2 className="text-2xl font-bold">Zero FIR</h2>
            <Zerofiroutside />
            <ZeroFirinside />
          </div>
        )}
        {activeTab === "transferred/receivedzerofir" && (
          <div>
            <h2 className="text-2xl font-bold">Transferred/Received Zero FIR</h2>
            <Transferredtootherstates />
            <Receivedfromotherstates />
          </div>
        )}
      </div>

      {/* Download Report Button */}
      <div className="mt-6">
        <button
          onClick={handleDownloadReport}
          className="px-4 py-2 bg-[#03045E] text-white rounded-lg shadow-md hover:bg-[#023e8a]"
        >
          Download Report
        </button>
      </div>
    </div>
  );
}

export default FirZero;
