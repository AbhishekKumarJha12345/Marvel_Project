import React, { useState, useEffect } from "react";
import { UploadCloud } from "lucide-react";
import { IoMdClose } from "react-icons/io";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker"; 
import { format } from "date-fns"; 

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

import LoginChart from './Logineprosecutor'

const Home = ({ prosecutiondata , fetchData }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("fill");
  const [selectedGraph, setSelectedGraph] = useState("");
  const [file, setFile] = useState(null);
  const [hiddenLines, setHiddenLines] = useState({});

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A569BD"];

  const monthOrder = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const [loginData, setLoginData] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

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
      name: "E_prosecution Login Date",
      value:
        Number(
          prosecutiondata?.logindatastatistics?.additional_public_prosecutor
        ) || 0,
    },
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
              <label htmlFor={entry.name} className="block text-left">{entry.name}</label>
              <input
                type={entry.name === 'E_prosecution Login Date' ? 'date' : 'text'}
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

  console.log("ProsecutionSanctionedPositions : ",ProsecutionSanctionedPositions);
  

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
        fetchLoginData();

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
      fetchLoginData();

    } catch (error) {
      console.error("Error:", error);
      alert("Failed to upload file.");
    }
  };


  useEffect(() => {
    fetchLoginData();
  }, [fromDate, toDate]);

  const fetchLoginData = async () => {
    try {
      const params = {};
      if (fromDate) params.from_date = fromDate.toISOString().split("T")[0];
      if (toDate) params.to_date = toDate.toISOString().split("T")[0];

      const response = await axiosInstance.get("/login-data", { params });
      const data = response.data;

      if (!data || Object.keys(data).length === 0) return;

      const roleNames = Object.keys(data);
      
      const labels = roleNames.map(role => data[role]?.dates).find(dates => dates) || [];
      
      // const labels = data[roleNames[0]].dates || [];
      
      const datasets = roleNames.map((role, index) => ({
        label: role,
        data: data[role].logins,
        borderColor: `hsl(${(index * 137.5) % 360}, 70%, 50%)`,
        backgroundColor: `hsl(${(index * 137.5) % 360}, 70%, 70%)`,
        fill: false,
      }));

      setLoginData({ labels, datasets });
    } catch (error) {
      console.error("Error fetching login data:", error);
    }
  };


  // Code inetgrated


  const [selectedCategory, setSelectedCategory] = useState("Prosecutors");
 const [startMonthYear, setStartMonthYear] = useState(null);
const [endMonthYear, setEndMonthYear] = useState(null);




  useEffect(() =>{
console.log("startMonthYear : ",startMonthYear);
    
  },[startMonthYear])


  // Transform raw data
  const ProsecutorsbyCadres = (Array.isArray(prosecutiondata?.prosecutorsbycadre) 
  ? prosecutiondata.prosecutorsbycadre 
  : [prosecutiondata?.prosecutorsbycadre] // Wrap object in an array if necessary
).map((item) => {
    console.log("item : ", item);

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
  // const startNumericDate = startMonthYear ? parseInt(startMonthYear.replace("-", "")) : null;
  // const endNumericDate = endMonthYear ? parseInt(endMonthYear.replace("-", "")) : null;

  const startNumericDate = startMonthYear 
  ? parseInt(format(startMonthYear, "yyyyMM")) 
  : null;

const endNumericDate = endMonthYear 
  ? parseInt(format(endMonthYear, "yyyyMM")) 
  : null;

  const filteredData = ProsecutorsbyCadres.filter((item) => {
    if (startNumericDate && item.numericDate < startNumericDate) return false;
    if (endNumericDate && item.numericDate > endNumericDate) return false;
    return true;
  });



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


  const handleLegendClick = (dataKey) => {
    setHiddenLines((prev) => ({
      ...prev,
      [dataKey]: !prev[dataKey],
    }));
  };

  

  const [hiddenCategories, setHiddenCategories] = useState({});

  const handleLegendClickforPositions = (entry) => {
  setHiddenCategories((prev) => ({
    ...prev,
    [entry.value]: !prev[entry.value], 
  }));
};

  const filteredDataforPositions = ProsecutionSanctionedPositions.filter(
      (item) => !hiddenCategories[item.name]
  );



  return (
    <div className="rounded-lg w-full max-w-full h-auto">
      <h1 className="text-2xl font-bold mb-6">Prosecution Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-xl shadow-md">
    
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              Prosecution Sanctioned Positions
            </h2>
            {localStorage.getItem('role') !== 'chief secretary' && <button
              onClick={() => handleOpenModal("first")}
              className="bg-gray-700 text-white px-4 py-2 rounded"
            >
              Add Data
            </button>}
          </div>

          <div className="flex justify-center items-center w-full h-full">

             <PieChart width={400} height={400}>
      <Pie
        data={filteredDataforPositions}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={100}
        label
      >
       
         {filteredDataforPositions.map((entry) => {
      const originalIndex = ProsecutionSanctionedPositions.findIndex(
        (item) => item.name === entry.name
      ); 
      return (
        <Cell key={`cell-${entry.name}`} fill={COLORS[originalIndex % COLORS.length]} />
      );
    })}
      </Pie>
      <Tooltip />
      <Legend
        onClick={handleLegendClickforPositions}
        payload={ProsecutionSanctionedPositions.map((entry, index) => ({
      value: entry.name,
      type: "square", 
      color: hiddenCategories[entry.name] ? "gray" : COLORS[index % COLORS.length],
    }))}
        formatter={(value) => (
          <span
            style={{
              textDecoration: hiddenCategories[value] ? "line-through" : "none",
              color: hiddenCategories[value] ? "gray" : "black",
              cursor: "pointer",
            }}
          >
            {value}
          </span>
        )}
      />
    </PieChart>
          </div>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-md w-full h-full">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Login Data Statistics for E-Prosecution</h2>
            {localStorage.getItem('role') !== 'chief secretary' && <button
              onClick={() => handleOpenModal("third")}
              className="bg-gray-700 text-white px-4 py-2 rounded mb-2"
            >
              Add Data
            </button>}
          </div>
      <div className="flex gap-4 mb-4 items-center">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        views={["year", "month", "day"]}
        selected={fromDate}
        onChange={(newValue) => setFromDate(newValue)}
        dateFormat="yyyy-MM-dd"
        slotProps={{
            textField: {
              // label: "From",
              error: false,
              value: fromDate || "", 
               sx: {
        "& .MuiInputBase-input": {
          padding: "4px 8px !important", 
          height: "40px !important", 
        },
      }, 
            },
          }}
        className="rounded-md cursor-pointer w-40"
      />
      <DatePicker
        views={["year", "month","day"]}
        selected={toDate}
        onChange={(newValue) => setToDate(newValue)}
        dateFormat="yyyy-MM-dd"
         slotProps={{
            textField: {
              // label: "To",
              error: false,
              value: toDate || "", 
               sx: {
        "& .MuiInputBase-input": {
          padding: "4px 8px !important", 
          height: "40px !important", 
        },
      },
            },
          }}
        className="rounded-md cursor-pointer w-40"
        
      />
    </LocalizationProvider>
        <button
          onClick={() => {
            setFromDate(null);
            setToDate(null);
          }}
          className="p-2 bg-[#2d3748] text-white rounded-lg hover:bg-opacity-90 transition"
        >
          Clear Filters
        </button>
      </div>

          <LoginChart data={loginData} />
        </div>

      </div>

      <div className="bg-white p-4 rounded-xl shadow-md mt-6 ">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold mb-4 text-left">
            Number of Prosecutors by Cadre
          </h2>
          {localStorage.getItem('role') !== 'chief secretary' && <button
            onClick={() => handleOpenModal("second")}
            className="bg-gray-700 text-white px-4 py-2 rounded"
          >
            Add Data
          </button>}
        </div>
        <div className="flex items-center justify-center gap-2">
          <label className="text-sm font-medium text-gray-700 w-30">Select Month-Year Range:</label>
         <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="flex items-center space-x-2">
        <DatePicker
          views={["year", "month"]}
          value={startMonthYear}
          onChange={(newValue) => setStartMonthYear(newValue)}
           slotProps={{
    textField: {
      placeholder: "From",
      sx: {
        "& .MuiInputBase-input": {
          padding: "4px 8px !important", // Reduce padding
          height: "40px !important", // Adjust height if needed
        },
      },
    },
  }}
         
          className="rounded-md cursor-pointer w-40"
        />
        <span className="text-gray-700 font-medium">to</span>
        <DatePicker
          views={["year", "month"]}
          value={endMonthYear}
          onChange={(newValue) => setEndMonthYear(newValue)}
           slotProps={{
            textField: {
              placeholder: "To", 
                  sx: {
            "& .MuiInputBase-input": {
              padding: "4px 8px !important", // Reduce padding
              height: "40px !important", // Adjust height if needed
            },
          },
            },
          }}
          className="rounded-md cursor-pointer w-40"
        />
      </div>
    </LocalizationProvider>
           {/* Category Selection  */}
          <label className="text-sm font-medium text-gray-700 w-30">Select Category:</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border !p-2 !h-[50px] !w-[150px] !text-sm !rounded"
          >
            <option value="Prosecutors">Prosecutors</option>
            <option value="Percentages">Percentages</option>
          </select>
          
          <button
          onClick={() => {
            setStartMonthYear(null);
            setEndMonthYear(null);
            setSelectedCategory("Prosecutors"); 
          }}
          className="p-2 bg-[#2d3748] text-white rounded-lg hover:bg-opacity-90 transition"
        >
          Clear Filters
        </button>

        </div>
        <div className="flex justify-center">
          <div className="mt-6 w-full h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="monthYearLabel" stroke="#6b7280" tick={{ fontSize: 14 }}   label={{ 
                    value: "Month & Year", 
                    position: "insideBottom", 
                    dy: 15, 
                    fontSize: 14, 
                  }} />
                {selectedCategory === "Percentages" ? (
                  <YAxis
                    stroke="#6b7280"
                    tick={{ fontSize: 14 }}
                    label={{
                      value: "Percentage",
                      angle: -90,
                      position: "insideLeft",
                      fontSize: 14,
                    }}
                  />
                      ) : (
                        <YAxis
                          stroke="#6b7280" 
                          tick={{ fontSize: 14 }}
                          label={{
                            value: "Number of Prosecutors",
                            angle: -90,
                            position: "insideLeft",
                            fontSize: 14,
                            dy: 80,
                          }}
                        />
                      )}
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#f9fafb",
                    borderRadius: "8px",
                    border: "1px solid #e5e7eb",
                  }}
                />
                  <Legend
                   onClick={(e) => handleLegendClick(e.dataKey)} // Ensure correct line is toggled
                   iconType="circle" wrapperStyle={{ paddingBottom: 10, paddingTop:30 }}
                   formatter={(value, entry) => {
                     return (
                       <span
                         style={{
                           textDecoration: hiddenLines[entry.dataKey] ? "line-through" : "none",
                           color: hiddenLines[entry.dataKey] ? "gray" : "black",
                           cursor: "pointer",
                         }}
                       >
                         {dataKeys.find((line) => line.key === entry.dataKey)?.name || value}
                       </span>
                     );
                   }}
                 />

                {dataKeys.map((metric) => (
                  <Line
                    key={metric.key}
                    type="monotone"
                    dataKey={metric.key}
                    stroke={metric.color}
                    strokeWidth={4}
                    dot={{ r: 5 }}
                    name={metric.label}
                    hide={hiddenLines[metric.key]}
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