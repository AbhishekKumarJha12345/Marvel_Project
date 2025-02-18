import React, { useEffect, useState } from "react";
import PoliceChargeSheet from "./PoliceChargeSheet";
import Chargesheet from "./Firstchargesheet";
import Chargesheetstatus from "./Chargesheetstatus";
import axiosInstance from "../../../../utils/axiosInstance";

function Firchargesheets() {
  const [activeTab, setActiveTab] = useState("home");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  const [trainingData, setTrainingData] = useState("");
  const [trainingData2, setTrainingData2] = useState("");
  const getTrainingData = async () => {
    try {
      const [response1, response2] = await Promise.all([
        axiosInstance.get("/live_data?type=fir_2"),
        axiosInstance.get("/live_data?type=fir_3"),
      ]);

      console.log(response1.data, "FIR2 Data ----------");
      console.log(response2.data, "FIR3 Data ----------");
      setTrainingData(response1.data.data_dict);
      setTrainingData2(response2.data.data_dict);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTrainingData();
  }, []);

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
          Charge Sheets
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-4 row">
        {activeTab === "home" ? (
          <div className="row pb-6">
            <div className="col-6">
              <div
                className="card shadow-sm bg-white p-2"
                style={{
                  width: "50%",
                  height: "550px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div className="card-body" style={{ paddingBottom: "5rem" }}>
                  <PoliceChargeSheet apidata={trainingData} />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <Chargesheet />

            <Chargesheetstatus apidata={trainingData2} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Firchargesheets;
