import React, { useEffect, useState } from 'react';
import PoliceChargeSheet from './PoliceChargeSheet';
import Chargesheet from './Firstchargesheet';
import Chargesheetstatus from './Chargesheetstatus';
import axiosInstance from '../../../../utils/axiosInstance';
import CaseStatus from './CaseStatus';
import ChargeSheetGraph2 from './ChargeSheetGraph2';
import ModalComponent from '../../ModalComponent';

function Firchargesheets() {
  const [activeTab, setActiveTab] = useState('home');
  const [showModal, setShowModal] = useState(false);
  const [fir2Data, setFir2Data] = useState(null);
  const [fir3Data, setFir3Data] = useState(null);

  // Fetch FIR2 and FIR3 data from Flask
  const getTrainingData = async () => {
    try {
      const [response1, response2] = await Promise.all([
        axiosInstance.get('/live_data?type=fir_2'),
        axiosInstance.get('/live_data?type=section'),
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
const [recentData,setRecentData] =useState('')
  const getrecentdatatime = (data) =>{
    setRecentData(data)

  }
  return (
    <div>
      {/* Navigation Tabs */}
      <div className="flex space-x-4 mt-3">
        <button
          onClick={() => handleTabChange("home")}
          className={`py-2 px-4 text-[14px] font-[Work Sans] ${
            activeTab === "home"
            ? "relative text-[#03045E] font-bold after:content-[''] after:absolute after:left-1/2 after:transform after:-translate-x-1/2 after:w-12 after:h-[2px] after:bg-[#03045E] after:bottom-0"
            : "text-[#8B8A8A]"
          }`}
        >
          Home
        </button>
        <button
          onClick={() => handleTabChange('newCriminals')}
          className={`py-2 px-4 text-[14px] font-[Work Sans] ${
            activeTab === 'newCriminals' 
            ? "relative text-[#03045E] font-bold after:content-[''] after:absolute after:left-1/2 after:transform after:-translate-x-1/2 after:w-24 after:h-[2px] after:bg-[#03045E] after:bottom-0"
            : 'text-[#8B8A8A]'}`}
        >
          Charge Sheets
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-4">
      
        {activeTab === 'home' ? (
          <div className="col-6" style={{width:"100%",height:"100%"
          }}>
          <div className="card shadow-sm bg-white">
            <div className="card-body" style={{height:"100%",padding:"24px",display:"flex",flexDirection:"column",gap:"1rem"}}>
              {/* <PoliceChargeSheet apidata={trainingData}/> */}
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-center flex-grow">
                FIR Charge Sheets
                </h2>
               { localStorage.getItem('role') !=='chief secretary' &&  <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                  style={{ backgroundColor: '#2d3748' }}
                  onClick={() => {
                    console.log("Open modal");
                    setShowModal(true);
                  }}
                >
                  Add On
                </button>}
                 {/* Download Report Button */}
      {/* <div className="mt-4"> */}
        {/* <button className="bg-green-600 text-white px-4 py-2 rounded-lg ml-4" onClick={downloadReport}>
          Download Charge Sheet Report
        </button> */}
      {/* </div> */}
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:"0.5rem",width:"100%",height:"100%",marginBottom:"3rem"}}>
      <h2 className="text-xl font-semibold">Deviation</h2>
      <div style={{display:"flex",gap:"0.5rem"}}>

        <div style={{backgroundColor:"#f4f4f4",width:"49%",padding:"1rem",display:"flex",justifyContent:"space-around",borderRadius:"5px"}}>
              <CaseStatus />
              </div>
              <br/>
              <hr/>
        <div style={{backgroundColor:"#f4f4f4",width:"49%",padding:"1rem",display:"flex",justifyContent:"space-around",borderRadius:"5px"}}>
              <ChargeSheetGraph2 />
            </div>
            </div>
            <h1 className="text-xl font-semibold mb-4" style={{marginTop:"1rem"}}>
  Recent Entry  :
   {recentData.toLocaleString()}
  {/* {trainingData && trainingData[0] && new Date(trainingData[0].uploaded_date).toLocaleString()} */}
</h1>
        <div style={{backgroundColor:"#f4f4f4",padding:"1rem",display:"flex",justifyContent:"space-around",borderRadius:"5px"}}>
        <CaseStatus getrecentdatatime={getrecentdatatime} type='recent'/>

        {/* <PoliceOfficers getDate={getDate}/> */}
          

        <br/>
        {/* <MasterTrainers /> */}
        </div>
            </div>
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
  <ModalComponent open={showModal} type='fir_2'  onClose={() => setShowModal(false)} />


     
    </div>
  );
}

export default Firchargesheets;
