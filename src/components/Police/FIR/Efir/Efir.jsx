import React, { useState } from "react";
import Efirgraph from "./EFIRGraph";

function Efir() {
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
                  height: "450px",
                  display: "flex",
                  height: "500px",
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
                  E-FIR Overview Data
                </h1>
                <div className="w-[100%] h-[450px] flex justify-center">
                  <Efirgraph />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            {/* <h2 className="text-2xl font-bold">E FIR</h2> */}
            <p className="text-center text-2xl font-bold">NO DATA</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Efir;
