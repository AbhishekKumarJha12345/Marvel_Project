import React, { useEffect, useState } from "react";
import ZeroFir from "./ZeroFir";
import Zerofiroutside from "./ZeroFIRoutside";
import ZeroFirinside from "./ZeroFIRinNcl";
import Receivedfromotherstates from "./ReceivedfromOtherstates";
import Transferredtootherstates from "./Transferedotherstates";
import axiosInstance from "../../../../utils/axiosInstance";
import ZeroFir2 from "./Zerofir2";
import ModalComponent from "../../ModalComponent";

function FirZero() {
  const [activeTab, setActiveTab] = useState("home");
  const [trainingData, setTrainingData] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const getTrainingData = async () => {
    try {
      const response = await axiosInstance.get("/live_data?type=fir_3");
      console.log(response.data, "FIR3 Data ----------");
      setTrainingData(response.data.data_dict);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTrainingData();
  }, []);

  const handleDownloadReport = async () => {
    try {
      const response = await axiosInstance.post(
        "/generate_report",
        {
          chart_type: "donut",
          data: {
            labels: ["Total Registered", "Charge-sheeted", "Under Investigation"],
            values: [
              parseInt(trainingData.total_registered, 10),
              parseInt(trainingData.chargesheeted, 10),
              parseInt(trainingData.under_investigation, 10),
            ],
            title: "FIR3 Report - Donut Chart",
          },
        },
        { responseType: "blob" }
      );

      const blob = new Blob([response.data], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "FIR3_Report.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading report:", error);
    }
  };
  const [recentDate, setRecentDate] = useState('');
  const getRecentDate = (data) => {
    if (data) {
      const parts = data.split("-");
      const isYearFirst = parts[0].length === 4;
      const year = isYearFirst ? parts[0] : parts[1];
      let month = isYearFirst ? parts[1] : parts[0];
      if (month.length === 1) month = "0" + month;
      setRecentDate(`${month}/${year}`);
    }
  };
  

  return (
    <div>
      {/* Tabs */}
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
          onClick={() => handleTabChange("newCriminals")}
          className={`py-2 px-4 text-[14px] font-[Work Sans] ${
            activeTab === "newCriminals"
            ? "relative text-[#03045E] font-bold after:content-[''] after:absolute after:left-1/2 after:transform after:-translate-x-1/2 after:w-16 after:h-[2px] after:bg-[#03045E] after:bottom-0"
            : "text-[#8B8A8A]"
          }`}
        >
          Zero FIR
        </button>
        <button
          onClick={() => handleTabChange("transferred/receivedzerofir")}
          className={`py-2 px-4 text-[14px] font-[Work Sans] ${
            activeTab === "transferred/receivedzerofir"
            ? "relative text-[#03045E] font-bold after:content-[''] after:absolute after:left-1/2 after:transform after:-translate-x-1/2 after:w-48 after:h-[2px] after:bg-[#03045E] after:bottom-0"
            : "text-[#8B8A8A]"
          }`}
        >
          Transferred/Received Zero FIR
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {activeTab === "home" && (
          <div className="col-6" style={{ width:"100%",height:"100%",paddingBottom:"1rem"}}>
            <div className="" style={{ width:"100%",padding:"24px",height: "80vh",marginBottom:"1rem" }}>
              <div className="">
                <div className="flex justify-between items-center mb-1">
                  <h2 className="text-2xl font-semibold text-center flex-grow">Zero FIR</h2>

                  {/* Add On Button */}
                  { localStorage.getItem('role') !=='chief secretary' && <button
                    className="px-4 py-2 bg-[#03045E] text-white rounded-lg shadow-md hover:bg-[#023e8a] transition-all"
                    onClick={() => setShowModal(true)}
                  >
                    Add On
                  </button>}

                  {/* Download Report Button */}
                  {/* <button
                    onClick={handleDownloadReport}
                    className="px-4 py-2 ml-4 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-all"
                  >
                    Download Report
                  </button> */}
                </div>
                <div style={{width:"100%",display:"flex",flexDirection:"column",gap:"0.5rem"}}>
                  <div style={{display:"flex",gap:"39rem"}}>
                {/* <h2 className="text-xl font-semibold">Deviation </h2> */}
                <h2 className="text-xl font-semibold">Recent Entry :{recentDate}</h2>  
                </div>
<div style={{display:"flex",gap:"0.5rem"}}>
<div style={{backgroundColor:"#f4f4f4",width:"49%",height:"400px",display:"flex",justifyContent:"space-around",borderRadius:"5px"}}>
<ZeroFir2 />

      </div>
      <br/>
      <hr/>
<div style={{backgroundColor:"#f4f4f4",width:"49%",height:"400px",display:"flex",justifyContent:"space-around",borderRadius:"5px"}}>
<ZeroFir2 type='recent' getRecentDate={getRecentDate}/>

    </div>
    </div>
    </div>

                {/* <ZeroFir2 />
                <ZeroFir2 /> */}
              </div>
            </div>
          </div>
        )}

        {activeTab === "newCriminals" && (
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

      {/* Modal Component */}
      <ModalComponent open={showModal} type="fir_3" onClose={() => setShowModal(false)} />
    </div>
  );
}

export default FirZero;
