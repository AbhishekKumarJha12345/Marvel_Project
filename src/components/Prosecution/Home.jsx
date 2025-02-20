import React, { useState } from "react";
import { UploadCloud } from "lucide-react";
import { IoMdClose } from "react-icons/io";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import axiosInstance from "../../utils/axiosInstance";

const Home = ({ prosecutiondata = {}, fetchData }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("fill");
  const [selectedGraph, setSelectedGraph] = useState("");
  const [file, setFile] = useState(null);
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A569BD"];

  const ProsecutionSanctionedPositions = [
    {
      name: "Director",
      value:
        Number(
          prosecutiondata?.prosecutionsanctionedpositions?.director
        ) || 0,
    },
    {
      name: "Deputy Director",
      value:
        Number(
          prosecutiondata?.prosecutionsanctionedpositions?.deputy_director
        ) || 0,
    },
    {
      name: "Assistant Director Public Prosecutor",
      value:
        Number(
          prosecutiondata?.prosecutionsanctionedpositions?.assistant_director_public_prosecutor
        ) || 0,
    },
    {
      name: "Additional Public Prosecutor",
      value:
        Number(
          prosecutiondata?.prosecutionsanctionedpositions?.additional_public_prosecutor
        ) || 0,
    },
    {
      name: "Assistant Public Prosecutors",
      value:
        Number(
          prosecutiondata?.prosecutionsanctionedpositions?.assistant_public_prosecutors
        ) || 0,
    },
  ];

  const ProsecutorsbyCadre = [
    {
      name: "ADPP",
      prosecutors:
        Number(prosecutiondata?.prosecutorsbycadre?.adpp_prosecutors) || 0,
      percentage:
        Number(prosecutiondata?.prosecutorsbycadre?.adpp_percentage) || 0,
    },
    {
      name: "Additional Public Prosecutors",
      prosecutors:
        Number(
          prosecutiondata?.prosecutorsbycadre?.additional_public_prosecutors_prosecutors
        ) || 0,
      percentage:
        Number(
          prosecutiondata?.prosecutorsbycadre?.additional_public_prosecutors_percentage
        ) || 0,
    },
    {
      name: "Assistant Public Prosecutors",
      prosecutors:
        Number(
          prosecutiondata?.prosecutorsbycadre?.assistant_public_prosecutors_prosecutors
        ) || 0,
      percentage:
        Number(
          prosecutiondata?.prosecutorsbycadre?.assistant_public_prosecutors_percentage
        ) || 0,
    },
  ];

  const LoginDataStatistics = [
    {
      name: "Additional Public Prosecutor",
      value:
        Number(
          prosecutiondata?.logindatastatistics?.additional_public_prosecutor
        ) || 0,
    },
    {
      name: "Assistant Public Prosecutor",
      value:
        Number(
          prosecutiondata?.logindatastatistics?.assistant_public_prosecutor
        ) || 0,
    },
    {
      name: "Assistant Public Prosecutor Appointed",
      value:
        Number(
          prosecutiondata?.logindatastatistics?.assistant_public_prosecutor_appointed
        ) || 0,
    },
  ];

  const handleOpenModal = (graphType) => {
    setSelectedGraph(graphType);
    setModalOpen(true);
  };

  const getInputFields = (data) => {
    return data.map((entry, index) => {
      if (
        data === ProsecutorsbyCadre &&
        (entry.name === "ADPP" || 
        entry.name === "Additional Public Prosecutors" || 
        entry.name === "Assistant Public Prosecutors")
      ) {
        return (
          <div key={index}>
            <div className="mb-4">
              {/* <label htmlFor={`${entry.name}_prosecutors`} className="block text-left">{`${entry.name}_prosecutors`}</label> */}
              <input
                type="text"
                id={`${entry.name}_prosecutors`}
                name={`${entry.name}_prosecutors`}
                placeholder={`${entry.name}_prosecutors`}
                className="mt-1 p-3 border border-gray-300 rounded w-full"
              />
            </div>
            {/* Percentage Input Field */}
            <div className="mb-4">
              {/* <label htmlFor={`${entry.name}_percentage`} className="block text-left">{`${entry.name}_percentage`}</label> */}
              <input
                type="text"
                id={`${entry.name}_percentage`}
                name={`${entry.name}_percentage`}
                placeholder={`${entry.name}_percentage`}
                className="mt-1 p-3 border border-gray-300 rounded w-full"
              />
            </div>
          </div>
        );
      } else {
        return (
          <div key={index}>
            {/* Name Input Field */}
            <div className="mb-4">
              {/* <label htmlFor={entry.name} className="block text-left">{entry.name}</label> */}
              <input
                type="text"
                id={entry.name}
                name={entry.name}
                placeholder={`${entry.name}`}
                className="mt-1 p-3 border border-gray-300 rounded w-full"
              />
            </div>
          </div>
        );
      }
    });
  };  

  const handleSubmit = async () => {
    const fields = [];
    const validateInput = (value) => value.trim() !== "";

    if (selectedGraph === "first") {
      ProsecutionSanctionedPositions.forEach((entry) => {
        const value = document.getElementById(entry.name)?.value || "";
        if (validateInput(value)) fields.push({ name: entry.name, value });
      });
    } else if (selectedGraph === "second") {
      ProsecutorsbyCadre.forEach((entry) => {
        const prosecutorsValue =
          document.getElementById(`${entry.name}_prosecutors`)?.value || "";
        const percentageValue =
          document
            .getElementById(`${entry.name}_percentage`)
            ?.value.replace("%", "")
            .trim() || "";

        if (validateInput(prosecutorsValue))
          fields.push({
            name: `${entry.name}_prosecutors`,
            value: prosecutorsValue,
          });
        if (validateInput(percentageValue))
          fields.push({
            name: `${entry.name}_percentage`,
            value: percentageValue,
          });
      });
    } else if (selectedGraph === "third") {
      LoginDataStatistics.forEach((entry) => {
        const value = document.getElementById(entry.name)?.value || "";
        if (validateInput(value)) fields.push({ name: entry.name, value });
      });
    }

    const data = { graphType: selectedGraph, fields };

    try {
      const response = await axiosInstance.post("/storeFormData", data);
      if (response.status === 200) {
        alert(response.data.message);
        setModalOpen(false);
        setFile(null);
        fetchData();
      } else {
        alert(response.data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to store data.");
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    console.log("file  :", file);

    const formData = new FormData();
    console.log("formData  : ", formData);

    formData.append("file", file);

    try {
      const response = await axiosInstance.post("/uploads", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert(response.data.message);
      setModalOpen(false);
      setFile(null);
      fetchData();
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to upload file.");
    }
  };

  return (
    <div className="rounded-lg w-full max-w-full h-auto">
      <h1 className="text-2xl font-bold mb-6">Prosecution Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-xl shadow-md">
          {/* <h2 className="text-xl font-semibold mb-4">
            Prosecution Sanctioned Positions
          </h2>
          <button
            onClick={() => handleOpenModal("first")}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Data
          </button> */}
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              Prosecution Sanctioned Positions
            </h2>
            {localStorage.getItem('role') !=='chief secretary' && <button
              onClick={() => handleOpenModal("first")}
              className="bg-gray-700 text-white px-4 py-2 rounded"
            >
              Add Data
            </button>}
          </div>

          <div className="flex justify-center items-center w-full h-full">
            <PieChart width={400} height={400}>
              <Pie
                data={ProsecutionSanctionedPositions}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {ProsecutionSanctionedPositions.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-md">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Login Data Statistics</h2>
            {localStorage.getItem('role') !=='chief secretary' && <button
              onClick={() => handleOpenModal("third")}
              className="bg-gray-700 text-white px-4 py-2 rounded"
            >
              Add Data
            </button>}
          </div>
          <div className="flex justify-center items-center w-full h-full">
            <PieChart width={400} height={400}>
              <Pie
                data={LoginDataStatistics}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                label
              >
                {LoginDataStatistics.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-md mt-6 w-1/2">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold mb-4 text-left">
            Number of Prosecutors by Cadre
          </h2>
         {localStorage.getItem('role') !=='chief secretary' && <button
            onClick={() => handleOpenModal("second")}
            className="bg-gray-700 text-white px-4 py-2 rounded"
          >
            Add Data
          </button>}
        </div>

        <div className="flex justify-center">
          <BarChart width={800} height={300} data={ProsecutorsbyCadre}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              formatter={(value, name) =>
                name === "percentage" ? `${value}% ` : value
              }
            />
            <Legend className="relative left-0" />
            <Bar dataKey="prosecutors" fill="#82ca9d" />
            <Bar dataKey="percentage" fill="#48CAE4" />
          </BarChart>
        </div>

        {modalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white w-[600px] rounded-lg shadow-lg">
              <div className="flex justify-between items-center border-b p-3 bg-gray-700 text-white">
                <h2 className="text-lg font-semibold">Add Data</h2>
                <button
                  className="cursor-pointer text-white text-2xl"
                  onClick={() => setModalOpen(false)}
                >
                  <IoMdClose />
                </button>
              </div>

              <div className="p-6">
                <div className="flex gap-4 rounded-sm px-8 py-3 mb-4 mt-2">
                  <button
                    className={`w-1/2 p-2.5 text-sm font-semibold rounded-md ${
                      selectedOption === "fill"
                        ? "bg-gray-700 text-white"
                        : "text-gray-600 border"
                    }`}
                    onClick={() => setSelectedOption("fill")}
                  >
                    Fill Form
                  </button>
                  <button
                    className={`w-1/2 py-2.5 text-sm font-semibold rounded-md ${
                      selectedOption === "upload"
                        ? "bg-gray-700 text-white"
                        : "text-gray-600 border"
                    }`}
                    onClick={() => setSelectedOption("upload")}
                  >
                    Upload File
                  </button>
                </div>

                {selectedOption === "fill" ? (
                  <div>
                    {selectedGraph === "first" &&
                      getInputFields(ProsecutionSanctionedPositions)}
                    {selectedGraph === "second" &&
                      getInputFields(ProsecutorsbyCadre)}
                    {selectedGraph === "third" &&
                      getInputFields(LoginDataStatistics)}

                    <div className="flex justify-end mt-4">
                      <button
                        className="w-40 bg-gray-700 text-white py-2 rounded font-medium"
                        onClick={handleSubmit}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 px-8 text-center max-w-lg mx-auto">
                      <label className="cursor-pointer">
                        <div className="flex flex-col items-center space-y-2">
                          <UploadCloud size={40} className="text-gray-600" />
                          <p className="text-gray-700 font-semibold">
                            Drag & Drop or Click to Upload
                          </p>
                          <p className="text-sm text-gray-500">
                            File Size Limit:{" "}
                            <strong>Maximum file size is 10MB.</strong>
                          </p>
                          <input
                            type="file"
                            className="hidden"
                            onChange={handleFileChange}
                          />
                        </div>
                      </label>
                      {file && (
                        <p className="mt-2 text-gray-600 text-sm">
                          Selected File: {file.name}
                        </p>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-2 text-left px-4">
                      Accepted File Types: <strong>xlsx, csv</strong>
                    </p>

                    <div className="flex justify-end mt-4">
                      <button
                        className="w-40 bg-gray-700 text-white py-2 rounded font-medium"
                        onClick={handleFileUpload}
                      >
                        Upload
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
