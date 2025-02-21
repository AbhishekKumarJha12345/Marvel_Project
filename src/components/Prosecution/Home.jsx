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
  LineChart,
  Line,
  ResponsiveContainer
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
          prosecutiondata?.prosecutionsanctionedpositions?.[0]?.director
        ) || 0,
    },
    {
      name: "Deputy Director",
      value:
        Number(
          prosecutiondata?.prosecutionsanctionedpositions?.[0]?.deputy_director
        ) || 0,
    },
    {
      name: "Assistant Director Public Prosecutor",
      value:
        Number(
          prosecutiondata?.prosecutionsanctionedpositions?.[0]
            ?.assistant_director_public_prosecutor
        ) || 0,
    },
    {
      name: "Additional Public Prosecutor",
      value:
        Number(
          prosecutiondata?.prosecutionsanctionedpositions?.[0]
            ?.additional_public_prosecutor
        ) || 0,
    },
    {
      name: "Assistant Public Prosecutors",
      value:
        Number(
          prosecutiondata?.prosecutionsanctionedpositions?.[0]
            ?.assistant_public_prosecutors
        ) || 0,
    },
  ];

  const ProsecutorsbyCadre = [
    {
      name: "ADPP",
      prosecutors:
        Number(prosecutiondata?.prosecutorsbycadre?.[0]?.adpp_prosecutors) || 0,
      percentage:
        Number(prosecutiondata?.prosecutorsbycadre?.[0]?.adpp_percentage) || 0,
    },
    {
      name: "Additional Public Prosecutors",
      prosecutors:
        Number(
          prosecutiondata?.prosecutorsbycadre?.[0]
            ?.additional_public_prosecutors_prosecutors
        ) || 0,
      percentage:
        Number(
          prosecutiondata?.prosecutorsbycadre?.[0]
            ?.additional_public_prosecutors_percentage
        ) || 0,
    },
    {
      name: "Assistant Public Prosecutors",
      prosecutors:
        Number(
          prosecutiondata?.prosecutorsbycadre?.[0]
            ?.assistant_public_prosecutors_prosecutors
        ) || 0,
      percentage:
        Number(
          prosecutiondata?.prosecutorsbycadre?.[0]
            ?.assistant_public_prosecutors_percentage
        ) || 0,
    },
  ];


  // const ProsecutorsbyCadres = prosecutiondata?.prosecutorsbycadre?.map((item) => ({
  //   month: item?.month || "Unknown",
  //   ADPP: Number(item?.adpp_prosecutors) || 0,
  //   ADPP_Percentage: Number(item?.adpp_percentage) || 0,
  //   Additional_PP: Number(item?.additional_public_prosecutors_prosecutors) || 0,
  //   Additional_PP_Percentage: Number(item?.additional_public_prosecutors_percentage) || 0,
  //   Assistant_PP: Number(item?.assistant_public_prosecutors_prosecutors) || 0,
  //   Assistant_PP_Percentage: Number(item?.assistant_public_prosecutors_percentage) || 0,
  // })) || [];




  // Convert "MM/YYYY" to an object with month name and year
  const monthOrder = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // const ProsecutorsbyCadres = (prosecutiondata?.prosecutorsbycadre || [])
  //   .map((item) => {
  //     const [monthNum, year] = item?.month_year?.split("/") || ["", ""]; // Extract month & year
  //     const monthIndex = parseInt(monthNum, 10) - 1; // Convert to zero-based index (0 = Jan, 1 = Feb, etc.)

  //     return {
  //       monthYearLabel: monthIndex >= 0 ? `${monthOrder[monthIndex]}${year}` : "Unknown", // Format "February2025"
  //       month: monthIndex,
  //       year: parseInt(year, 10) || 0,
  //       ADPP: Number(item?.adpp_prosecutors) || 0,
  //       ADPP_Percentage: Number(item?.adpp_percentage) || 0,
  //       Additional_PP: Number(item?.additional_public_prosecutors_prosecutors) || 0,
  //       Additional_PP_Percentage: Number(item?.additional_public_prosecutors_percentage) || 0,
  //       Assistant_PP: Number(item?.assistant_public_prosecutors_prosecutors) || 0,
  //       Assistant_PP_Percentage: Number(item?.assistant_public_prosecutors_percentage) || 0,
  //     };
  //   })
  //   // Sort by year first, then by month number
  //   .sort((a, b) => a.year - b.year || a.month - b.month);

  // // Format X-axis labels as "Month Year"
  // const formattedData = ProsecutorsbyCadres.map(item => ({
  //   ...item,
  //   monthYear: `${item.month} ${item.year}`
  // }));


  const [selectedCategory, setSelectedCategory] = useState("Prosecutors");
  const [startMonthYear, setStartMonthYear] = useState("");
  const [endMonthYear, setEndMonthYear] = useState("");

  // Transform raw data
  const ProsecutorsbyCadres = (prosecutiondata?.prosecutorsbycadre || []).map((item) => {
    const [monthNum, year] = item?.month_year?.split("/") || ["", ""]; // Extract MM/YYYY
    const monthIndex = parseInt(monthNum, 10) - 1; // Convert MM to index (0 = Jan)

    return {
      monthYearLabel: monthIndex >= 0 ? `${monthOrder[monthIndex]} ${year}` : "Unknown", // Format "February 2025"
      month: monthIndex,
      year: parseInt(year, 10) || 0,
      numericDate: parseInt(`${year}${monthNum}`), // Convert to YYYYMM format for easy comparison
      ADPP: Number(item?.adpp_prosecutors) || 0,
      ADPP_Percentage: Number(item?.adpp_percentage) || 0,
      Additional_PP: Number(item?.additional_public_prosecutors_prosecutors) || 0,
      Additional_PP_Percentage: Number(item?.additional_public_prosecutors_percentage) || 0,
      Assistant_PP: Number(item?.assistant_public_prosecutors_prosecutors) || 0,
      Assistant_PP_Percentage: Number(item?.assistant_public_prosecutors_percentage) || 0,
    };
  }).sort((a, b) => a.numericDate - b.numericDate);

  // Convert start & end range to YYYYMM format
  const startNumericDate = startMonthYear ? parseInt(startMonthYear.replace("-", "")) : null;
  const endNumericDate = endMonthYear ? parseInt(endMonthYear.replace("-", "")) : null;

  // Filter data based on selected month-year range
  const filteredData = ProsecutorsbyCadres.filter((item) => {
    if (startNumericDate && item.numericDate < startNumericDate) return false;
    if (endNumericDate && item.numericDate > endNumericDate) return false;
    return true;
  });

  const LoginDataStatistics = [
    {
      name: "Additional Public Prosecutor",
      value:
        Number(
          prosecutiondata?.logindatastatistics?.[0]
            ?.additional_public_prosecutor
        ) || 0,
    },
    {
      name: "Assistant Public Prosecutor",
      value:
        Number(
          prosecutiondata?.logindatastatistics?.[0]?.assistant_public_prosecutor
        ) || 0,
    },
    {
      name: "Assistant Public Prosecutor Appointed",
      value:
        Number(
          prosecutiondata?.logindatastatistics?.[0]
            ?.assistant_public_prosecutor_appointed
        ) || 0,
    },
  ];
  console.log("prosecutiondata:", prosecutiondata)

  const handleOpenModal = (graphType) => {
    setSelectedGraph(graphType);
    setModalOpen(true);
  };

  const getInputFields = (data) => {
    return data.map((entry, index) => (
      <div key={index}>
        <div className="mb-4">
          <input
            type="text"
            id={`${entry.name}_prosecutors`}
            name={`${entry.name}_prosecutors`}
            placeholder={`${entry.name}_prosecutors`}
            className="mt-1 p-3 border border-gray-300 rounded w-full"
          />
        </div>
        {entry.prosecutors !== undefined && (
          <div className="mb-4">
            <input
              type="text"
              id={`${entry.name}_percentage`}
              name={`${entry.name}_percentage`}
              placeholder={`${entry.name}_percentage`}
              className="mt-1 p-3 border border-gray-300 rounded w-full"
            />
          </div>
        )}
      </div>
    ));
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


  // const rawData = [
  //   {
  //     month: "Jan",
  //     additional_public_prosecutors_percentage: 15,
  //     additional_public_prosecutors_prosecutors: 30,
  //     adpp_percentage: 45,
  //     adpp_prosecutors: 35,
  //     assistant_public_prosecutors_percentage: 25,
  //     assistant_public_prosecutors_prosecutors: 40,
  //   },

  // ];

  // const countOptions = [
  //   { key: "additional_public_prosecutors_prosecutors", label: "Additional Public Prosecutors Count" },
  //   { key: "adpp_prosecutors", label: "ADPP Count" },
  //   { key: "assistant_public_prosecutors_prosecutors", label: "Assistant Public Prosecutors Count" },
  // ];

  // // Percentages (Option 2)
  // const percentageOptions = [
  //   { key: "additional_public_prosecutors_percentage", label: "Additional Public Prosecutors %" },
  //   { key: "adpp_percentage", label: "ADPP %" },
  //   { key: "assistant_public_prosecutors_percentage", label: "Assistant Public Prosecutors %" },
  // ];

  //   const [selectedCategory, setSelectedCategory] = useState("Prosecutors");

  //   const dataToDisplay =
  //     selectedCategory === "Prosecutors" ? countOptions : percentageOptions;




  // const [selectedCategory, setSelectedCategory] = useState("Prosecutors");
  // const [startMonthYear, setStartMonthYear] = useState("");
  // const [endMonthYear, setEndMonthYear] = useState("");

  // const dataKeys =
  //   selectedCategory === "Prosecutors"
  //     ? [
  //         { key: "ADPP", label: "ADPP Prosecutors", color: "#34d399" },
  //         { key: "Additional_PP", label: "Additional PP", color: "#6366f1" },
  //         { key: "Assistant_PP", label: "Assistant PP", color: "#f59e0b" },
  //       ]
  //     : [
  //         { key: "ADPP_Percentage", label: "ADPP %", color: "#34d399" },
  //         { key: "Additional_PP_Percentage", label: "Additional PP %", color: "#6366f1" },
  //         { key: "Assistant_PP_Percentage", label: "Assistant PP %", color: "#f59e0b" },
  //       ];



  const dataKeys =
    selectedCategory === "Prosecutors"
      ? [
        { key: "ADPP", label: "ADPP Prosecutors", color: "#34d399" },
        { key: "Additional_PP", label: "Additional PP", color: "#6366f1" },
        { key: "Assistant_PP", label: "Assistant PP", color: "#f59e0b" },
      ]
      : [
        { key: "ADPP_Percentage", label: "ADPP %", color: "#34d399" },
        { key: "Additional_PP_Percentage", label: "Additional PP %", color: "#6366f1" },
        { key: "Assistant_PP_Percentage", label: "Assistant PP %", color: "#f59e0b" },
      ];


  return (
    <div className="rounded-lg w-full max-w-full h-auto">
      <h1 className="text-2xl font-bold mb-6">Prosecution Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-xl shadow-md">

          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              Prosecution Sanctioned Positions
            </h2>
            <button
              onClick={() => handleOpenModal("first")}
              className="bg-gray-700 text-white px-4 py-2 rounded"
            >
              Add Data
            </button>
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
            <button
              onClick={() => handleOpenModal("third")}
              className="bg-gray-700 text-white px-4 py-2 rounded"
            >
              Add Data
            </button>
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

      <div className="bg-white p-4 rounded-xl shadow-md mt-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold mb-4 text-left">
            Number of Prosecutors by Cadre
          </h2>
          <button
            onClick={() => handleOpenModal("second")}
            className="bg-gray-700 text-white px-4 py-2 rounded"
          >
            Add Data
          </button>
        </div>

        <div className="flex items-center justify-center gap-2">
          <label className="text-sm font-medium text-gray-700 w-50">Select Month-Year Range:</label>
          <input
            type="month"
            value={startMonthYear}
            onChange={(e) => setStartMonthYear(e.target.value)}
            className="border p-1 h-8 w-40 text-sm rounded"
          />
          <span className="text-gray-700 font-medium">to</span>
          <input
            type="month"
            value={endMonthYear}
            onChange={(e) => setEndMonthYear(e.target.value)}
            className="border p-1 h-8 w-40 text-sm rounded"
          />


          {/* Category Selection */}

          <label className="text-sm font-medium text-gray-700 w-30">Select Category:</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border p-1 h-8 w-48 text-sm rounded"
          >
            <option value="Prosecutors">Prosecutors</option>
            <option value="Percentages">Percentages</option>
          </select>

        </div>
        <div className="flex justify-center">


          <div className="mt-6 w-full h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="monthYearLabel" stroke="#6b7280" tick={{ fontSize: 14 }} />
                <YAxis stroke="#6b7280" tick={{ fontSize: 14 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#f9fafb",
                    borderRadius: "8px",
                    border: "1px solid #e5e7eb",
                  }}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingBottom: 10 }} />

                {dataKeys.map((metric) => (
                  <Line
                    key={metric.key}
                    type="monotone"
                    dataKey={metric.key}
                    stroke={metric.color}
                    strokeWidth={4}
                    dot={{ r: 5 }}
                    name={metric.label}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>

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
                    className={`w-1/2 p-2.5 text-sm font-semibold rounded-md ${selectedOption === "fill"
                        ? "bg-gray-700 text-white"
                        : "text-gray-600 border"
                      }`}
                    onClick={() => setSelectedOption("fill")}
                  >
                    Fill Form
                  </button>
                  <button
                    className={`w-1/2 py-2.5 text-sm font-semibold rounded-md ${selectedOption === "upload"
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
