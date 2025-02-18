import React, { useState } from "react";
import PolicePunishment from "../Police/PolicePunishment ";
import PolicevisitsforensicTeams from "../Police/Policevisitsforensicteams";
import Policevisitsforensic from "../Police/Policevisitsforesic";

function Forensicvisits() {
  const [activeTab, setActiveTab] = useState("home");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
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
          Forensic
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {activeTab === "home" ? (
          <div className="row pb-6">
            <div className="col-6">
              <div
                className="card shadow-sm bg-white p-2"
                style={{
                  width: "50%",
                  height: "650px",
                  display: "flex",

                  flexDirection: "column",
                }}
              >
                <h1
                  className="text-xl font-semibold mb-4 m-2"
                  style={{
                    alignSelf: "flex-start", // Align the heading to the top left
                    marginBottom: "16px", // Adjust margin if necessary
                  }}
                >
                  Cases & Forensic Team Visits
                </h1>
                <div className="w-[100%] h-[650px] flex justify-center">
                  <PolicePunishment />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex space-x-4">
            {" "}
            {/* flex container with space between items */}
            <div className="flex-1">
              {/* <h2 className="text-2xl font-bold">Forensic visits</h2> */}
              <PolicevisitsforensicTeams />
            </div>
            <div className="flex-1">
              <Policevisitsforensic />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Forensicvisits;
