import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Button,
  Box,
  Typography,
  TextField,
} from "@mui/material";
import { Close, CloudUpload, Download } from "@mui/icons-material";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";
import Papa from "papaparse";


const ModalComponent = ({ open,type, onClose }) => {
  const [selectedOption, setSelectedOption] = useState("");
 
  const [formData, setFormData] = useState({
    formType: "FIR",
    month_year: "",
    zone: localStorage.getItem("zone") || "",       // Get from localStorage
    district: localStorage.getItem("district") || "", // Get from localStorage
    sections: "",
    totalCases: "",
    detectedCases: "",
    overallPercentage: "",
    uploadedFile: null,
  
    // Form-B specific fields
    unit: "",
    disposedCases: "",
    pendingCases: "",
    pendingPercentage: "",
    punishmentLessThan7: "",
    punishmentMoreThan7: "",
    // month_year: "",
  
    // Offences against body under BNS specific fields
    crimeHead: "",
    formCUnit: "",
    policeStation: "",
    regdCases: "",
    detectedCasesFormC: "",
    detectionPercentage: "",
    // month_year: "",

     // Form-D Fields
    formDUnit: "",
    policeStationD: "",
    ageGroup: "",
    untracedPersons: "",
    missingPersons: "",
    totalMissing: "",
    traced: "",
    untraced: "",
    untracedPercentage: "",
    // month_year: "",

    //form-E or form-F
    policeStation: "",
    actAndSection: "",
    registeredCases: "",
    detectedCasesPercentage: "",

  });

  const [selectedTab, setSelectedTab] = useState("form");
  const [fileInfo, setFileInfo] = useState(null);

  useEffect(() => {
    if (open) setSelectedTab("form");
  }, [open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // const handleFileUpload = (e) => {
  //   const file = e.target.files[0];
  //   if (file && file.type === "text/csv") {
  //     setFormData({ ...formData, uploadedFile: file });
  //     setFileInfo({ name: file.name, size: (file.size / 1024).toFixed(2) + " KB" });
  //   } else {
  //     alert("Only CSV files are allowed");
  //   }
  // };

  // const handleFileUpload = (e) => {
  //   const file = e.target.files[0];
  //   if (file && file.type === "text/csv") {
  //     setFileInfo({ name: file.name, size: (file.size / 1024).toFixed(2) + " KB" });
  //     setCheckingCsv(true);
  
  //     Papa.parse(file, {
  //       complete: (result) => {
  //         const headers = result.data[0];
  //         if (JSON.stringify(headers) === JSON.stringify(expectedHeaders)) {
  //           setCsvValidationMessage({ text: "CSV Matched", color: "green" });
  //         } else {
  //           setCsvValidationMessage({ text: "Headers Not Matching", color: "red" });
  //         }
  //         setCsvData(result.data);
  //         setCheckingCsv(false);
  //       },
  //     });
  //   } else {
  //     alert("Only CSV files are allowed");
  //   }
  // };
 
  const handleSubmit = async () => {
    try {
        const formDataToSend = new FormData();
        const token = localStorage.getItem("token"); // Get token from localStorage

        if (formData.uploadedFile) {
            formDataToSend.append("type", "fir");
            formDataToSend.append("file", formData.uploadedFile);
        } else {
            // Ensure required fields are filled before submission

            // if (!formData.date || !formData.zone || !formData.district || !formData.totalCases) {
            //     alert("Please fill in all required fields.");
            //     return;
            // }

            if (formData.formType === "FIR") {   // Tested
                formDataToSend.append("type", "fir");
                formDataToSend.append("form_type", formData.formType);  
                formDataToSend.append("month_year", formData.month_year);
                formDataToSend.append("zone", formData.zone);
                formDataToSend.append("district", formData.district);
                formDataToSend.append("sections", formData.sections);
                formDataToSend.append("total_cases_registered", formData.totalCases);
                formDataToSend.append("detected_cases", formData.detectedCases);
                formDataToSend.append("overall_percent", formData.overallPercentage);
            }
            if (formData.formType === "Pendency of cases under BNS") {   //Not Tested
                formDataToSend.append("type", "fir");
                formDataToSend.append("form_type", formData.formType); 
                formDataToSend.append("unit", formData.unit);
                formDataToSend.append("total_cases", formData.totalCases);
                formDataToSend.append("disposed_cases", formData.disposedCases);
                formDataToSend.append("pending_cases", formData.pendingCases);
                formDataToSend.append("pending_percentage", formData.pendingPercentage);
                formDataToSend.append("punishment_less_than_7", formData.punishmentLessThan7);
                formDataToSend.append("punishment_more_than_7", formData.punishmentMoreThan7);
                formDataToSend.append("month_year", formData.month_year);
            }
            if (formData.formType === "Offences against body under BNS") {  //Tested
                formDataToSend.append("type", "offences_against_body");
                formDataToSend.append("district", localStorage.getItem("district") || ""); 
                formDataToSend.append("unit", formData.unit);
                formDataToSend.append("police_station", formData.policeStation);
                formDataToSend.append("act_and_section", formData.actAndSection);
                formDataToSend.append("registered_cases", formData.registeredCases);
                formDataToSend.append("detected_cases", formData.detectedCases);
                formDataToSend.append("percent_detection", formData.detectedCasesPercentage);
                formDataToSend.append("month_year", formData.month_year);
            }
            if (formData.formType === "Untraced Missing") {      //Tested
                formDataToSend.append("type", "untraced_missing");
                formDataToSend.append("district", localStorage.getItem("district") || ""); 
                formDataToSend.append("unit", formData.formDUnit);
                formDataToSend.append("police_station", formData.policeStationD);
                formDataToSend.append("age_group", formData.ageGroup);
                formDataToSend.append("no_of_untraced_persons", formData.untracedPersons);
                formDataToSend.append("no_of_missing_persons", formData.missingPersons);
                formDataToSend.append("total_missing_persons", formData.totalMissing);
                formDataToSend.append("traced", formData.traced);
                formDataToSend.append("untraced", formData.untraced);
                formDataToSend.append("percent_untraced", formData.untracedPercentage);
                formDataToSend.append("month_year", formData.month_year);
            }
            if (formData.formType === "Important sections introduced in BNS") {    //Tested
              formDataToSend.append("type", "sections_in_bns");
              formDataToSend.append("district", localStorage.getItem("district") || ""); 
              formDataToSend.append("unit", formData.unit);
              formDataToSend.append("police_station", formData.policeStation);
              formDataToSend.append("act_and_section", formData.actAndSection);
              formDataToSend.append("registered_cases", formData.registeredCases);
              formDataToSend.append("detected_cases", formData.detectedCases);
              formDataToSend.append("percent_detection", formData.detectedCasesPercentage);
              formDataToSend.append("month_year", formData.month_year);
            }
            if (formData.formType === "Property offences under BNS") {   //Tested
              formDataToSend.append("type", "property_offenses");
              formDataToSend.append("district", localStorage.getItem("district") || ""); 
              formDataToSend.append("unit", formData.unit);
              formDataToSend.append("police_station", formData.policeStation);
              formDataToSend.append("act_and_section", formData.actAndSection);
              formDataToSend.append("registered_cases", formData.registeredCases);
              formDataToSend.append("detected_cases", formData.detectedCases);
              formDataToSend.append("percent_detection", formData.detectedCasesPercentage);
              formDataToSend.append("month_year", formData.month_year);
            }
            
            if (formData.formType === "Form-G") {
              formDataToSend.append("type", "fir");
              formDataToSend.append("form_type", formData.formType);  // ✅ Add Form Type

            }
            if (formData.formType === "Form-H") {
              formDataToSend.append("type", "fir");
              formDataToSend.append("form_type", formData.formType);  // ✅ Add Form Type

            }
            if (formData.formType === "Form-I") {
              formDataToSend.append("type", "fir");
              formDataToSend.append("form_type", formData.formType);  // ✅ Add Form Type

            }
            if (formData.formType === "Form-J") {
              formDataToSend.append("type", "fir");
              formDataToSend.append("form_type", formData.formType);  // ✅ Add Form Type

            }
            if (formData.formType === "Form-K") {
              formDataToSend.append("type", "fir");
              formDataToSend.append("form_type", formData.formType);  // ✅ Add Form Type

            }
            if (formData.formType === "Form-L") {
              formDataToSend.append("type", "fir");
              formDataToSend.append("form_type", formData.formType);  // ✅ Add Form Type

            }
        }
        
        // const response = await axiosInstance.post("/fir_form", formDataToSend, {
        //     headers: {
        //         "Content-Type": "multipart/form-data",
        //         Authorization: `${token}`, // Include token
        //     },
        // });
        const response = await axios.post("http://192.168.1.33:5555/api/fir_form", formDataToSend, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `${token}`, // Ensure token is valid
            },
        });

        if (response.status === 201) {
            alert("Data inserted successfully");
            // setFormData({ type: "fir", formType: "Form-A", date: "", zone: "", district: "", sections: "", totalCases: "", detectedCases: "", overallPercentage: "", uploadedFile: null, });
            setFileInfo(null);
            window.location.reload();
        } else {
            throw new Error(`Unexpected response: ${response.status}`);
        }
    } catch (error) {
        console.error("Error submitting form:", error);
        alert("Error submitting form. Check console for details.");
    }
  };


// ======================================= UPLOAD_FILE ====================================================

const [csvData, setCsvData] = useState(null);
const [csvValidationMessage, setCsvValidationMessage] = useState(null);
const [checkingCsv, setCheckingCsv] = useState(false);

    const expectedHeaders = {
      "FIR": [
        "month_year",
        "zone",
        "district",
        "sections",
        "total_cases_registered",
        "detected_cases",
        "overall_percent"
      ],
      "Pendency of cases under BNS": [
        "unit",
        "total_cases",
        "disposed_cases",
        "pending_cases",
        "pending_percentage",
        "punishment_less_than_7",
        "punishment_more_than_7",
        "month_year"
      ],
      "Offences against body under BNS": [
        "district",
        "unit",
        "police_station",
        "act_and_section",
        "registered_cases",
        "detected_cases",
        "percent_detection",
        "month_year"
      ],
      "Untraced Missing": [
        "district",
        "unit",
        "police_station",
        "age_group",
        "no_of_untraced_persons",
        "no_of_missing_persons",
        "total_missing_persons",
        "traced",
        "untraced",
        "percent_untraced",
        "month_year"
      ],
      "Important sections introduced in BNS": [
        "district",
        "unit",
        "police_station",
        "act_and_section",
        "registered_cases",
        "detected_cases",
        "percent_detection",
        "month_year"
      ],
      "Property offences under BNS": [
        "district",
        "unit",
        "police_station",
        "act_and_section",
        "registered_cases",
        "detected_cases",
        "percent_detection",
        "month_year"
      ]
    };


  const [selectedForm, setSelectedForm] = useState("FIR");
  const handleFormChange = (event) => {
    setSelectedForm(event.target.value);
  };
  const generateCSV = () => {
    const sampleFiles = {
      "FIR": [
          "month_year,zone,district,sections,total_cases_registered,detected_cases,overall_percent",
          "Jan-24,Amravati,Akola,Murder (BNS Sec. 103(1)),10,8,80",
      ],
      "Pendency of cases under BNS": [
          "unit,total_cases,disposed_cases,pending_cases,pending_percentage,punishment_less_than_7,punishment_more_than_7,month_year",
          "Unit-1,100,60,40,40,15,25,05-2024",
      ],
      "Offences against body under BNS": [
          "district,unit,police_station,act_and_section,registered_cases,detected_cases,percent_detection,month_year",
          "Nashik,Unit-2,Station-5,IPC 302,50,30,60,Mar-24",
      ],
      "Untraced Missing": [
          "district,unit,police_station,age_group,no_of_untraced_persons,no_of_missing_persons,total_missing_persons,traced,untraced,percent_untraced,month_year",
          "Pune,Unit-3,Station-8,18-25,15,50,65,50,15,23.1,Feb-24",
      ],
      "Important sections introduced in BNS": [
          "district,unit,police_station,act_and_section,registered_cases,detected_cases,percent_detection,month_year",
          "Mumbai,Unit-4,Station-12,IPC 420,30,20,66.7,Jan-24",
      ],
      "Property offences under BNS": [
          "district,unit,police_station,act_and_section,registered_cases,detected_cases,percent_detection,month_year",
          "Delhi,Unit-5,Station-15,IPC 376,40,35,87.5,Apr-24",
      ]
  };
  
    const csvContent = sampleFiles[selectedForm]?.join("\n") || "No data available";
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement("a");
    a.href = url;
    a.download = `${selectedForm.toLowerCase()}_sample.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };



  const handleFileUpload = (e) => {
    const file = e.target.files[0];
  
    if (file && file.type === "text/csv") {
      setFileInfo({ name: file.name, size: (file.size / 1024).toFixed(2) + " KB" });
      setCheckingCsv(true);
  
      Papa.parse(file, {
        complete: (result) => {
          const headers = result.data[0]; // Extract headers from the uploaded CSV
          const selectedHeaders = expectedHeaders[selectedForm]; // Get expected headers for the selected form type
  
          if (!selectedHeaders) {
            setCsvValidationMessage({ text: "Invalid form type selected", color: "red" });
            setCheckingCsv(false);
            return;
          }
  
          if (JSON.stringify(headers) === JSON.stringify(selectedHeaders)) {
            setCsvValidationMessage({ text: "CSV Matched", color: "green" });
          } else {
            setCsvValidationMessage({ text: "Headers Not Matching", color: "red" });
          }
  
          setCsvData(result.data);
          setCheckingCsv(false);
        },
      });
    } else {
      alert("Only CSV files are allowed");
    }
  };
  
  // ================================================================================================================
  

  return (
    <>

    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ backgroundColor: "#2d3748", color: "white" }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6"><strong>Form Details</strong></Typography>
          <IconButton onClick={onClose}>
            <Close style={{ color: "white" }} />
          </IconButton>
        </Box>
      </DialogTitle>
      <Box display="flex" flexDirection="column" minHeight="80vh">
          <DialogContent sx={{ height: "70vh", overflowY: "auto" }}>
            <Box display="flex" justifyContent="center" mb={2}>
              <Button
                variant={selectedTab === "form" ? "contained" : "outlined"}
                onClick={() => setSelectedTab("form")}
                sx={{ mr: 2, backgroundColor: selectedTab === "form" ? "#2d3748" : "transparent", color: selectedTab === "form" ? "white" : "inherit" }}
              >
                Form
              </Button>
              <Button
                variant={selectedTab === "upload" ? "contained" : "outlined"}
                onClick={() => setSelectedTab("upload")}
                sx={{ backgroundColor: selectedTab === "upload" ? "#2d3748" : "transparent", color: selectedTab === "upload" ? "white" : "inherit" }}
              >
                Upload
              </Button>
            </Box>
            {selectedTab === "form" && (
              <Box display="flex" flexDirection="column" gap={2} minHeight="60vh">
                {/* Form Type Selection Dropdown */}
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="form-type-label">Form Type</InputLabel>
                  <Select
                    labelId="form-type-label"
                    id="form-type"
                    value={formData.formType}
                    onChange={(e) => setFormData({ ...formData, formType: e.target.value })}
                    label="Form Type" // Add this line to associate the label correctly
                  >
                    {[
                      "FIR", "Pendency of cases under BNS", "Offences against body under BNS", "Untraced Missing", "Important sections introduced in BNS", "Property offences under BNS", "Form-G",
                      "Form-H", "Form-I", "Form-J", "Form-K", "Form-L", "Form-M", "Form-N"
                    ].map((form) => (
                      <MenuItem key={form} value={form}>
                        {form}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* Show form only if Form Type is selected */}
                {formData.formType === "FIR" && (
                    <div className="mt-4 border p-4 rounded-lg bg-gray-100 h-[450px] overflow-y-auto">
  
                      <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                          <label className="block text-sm font-medium">Sections</label>
                          <select
                            className="w-full p-2 border rounded bg-white"
                            value={formData.sections || ""}
                            onChange={handleChange}
                            name="sections"
                          >
                            <option value="">Select Section</option>
                            <option value="Murder (BNS Sec. 103(1))">Murder (BNS Sec. 103(1))</option>
                            <option value="Att. To Murder (BNS Sec. 109)">Att. To Murder (BNS Sec. 109)</option>
                            <option value="Esakshya BNSS 105">Esakshya BNSS 105</option>
                            <option value="Esakshya BNSS 173">Esakshya BNSS 173</option>
                            <option value="Esakshya BNSS 176">Esakshya BNSS 176</option>
                            <option value="Esakshya BNSS 180">Esakshya BNSS 180</option>
                            <option value="Esakshya BNSS 247">Esakshya BNSS 247</option>
                            <option value="Esakshya Rape (BNS Sec. 64 to 71)">Esakshya Rape (BNS Sec. 64 to 71)</option>
                            <option value="Hurt (BNS Sec. 117 to 125)">Hurt (BNS Sec. 117 to 125)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium">Zone</label>
                          <input
                            type="text"
                            className="w-full p-2 border rounded bg-gray-200"
                            value={formData.zone || ""}
                            onChange={handleChange}
                            name="zone"
                            readOnly
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium">District</label>
                          <input
                            type="text"
                            className="w-full p-2 border rounded bg-gray-200"
                            value={formData.district || ""}
                            onChange={handleChange}
                            name="district"
                            readOnly
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium">Month and Year</label>
                          <input
                            type="month"
                            className="w-full p-2 border rounded"
                            value={formData.month_year || ""}
                            onChange={handleChange}
                            name="date"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium">Total Cases Registered</label>
                          <input
                            type="number"
                            className="w-full p-2 border rounded"
                            value={formData.totalCases || ""}
                            onChange={handleChange}
                            name="totalCases"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium">Detected Cases</label>
                          <input
                            type="number"
                            className="w-full p-2 border rounded"
                            value={formData.detectedCases || ""}
                            onChange={handleChange}
                            name="detectedCases"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium">Overall Percentage</label>
                          <input
                            type="number"
                            step="0.01"
                            className="w-full p-2 border rounded"
                            value={formData.overallPercentage || ""}
                            onChange={handleChange}
                            name="overallPercentage"
                          />
                        </div>
                      </div>
                      </div>
                )}
                 {formData.formType === "Pendency of cases under BNS" && (
                  <div className="mt-4 border p-4 rounded-lg bg-gray-100 h-[450px] overflow-y-auto">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium">Unit</label>
                        <input type="text" className="w-full p-2 border rounded" value={formData.unit || ""} onChange={(e) => setFormData({ ...formData, unit: e.target.value })} />
                      </div>

                      <div>
                        <label className="block text-sm font-medium">Total Cases</label>
                        <input 
                          type="number" 
                          className="w-full p-2 border rounded" 
                          value={formData.totalCases || ""} 
                          onChange={(e) => setFormData({ ...formData, totalCases: e.target.value })}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium">Disposed Cases</label>
                        <input 
                          type="number" 
                          className="w-full p-2 border rounded" 
                          value={formData.disposedCases || ""} 
                          onChange={(e) => setFormData({ ...formData, disposedCases: e.target.value })}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium">Pending Cases</label>
                        <input 
                          type="number" 
                          className="w-full p-2 border rounded" 
                          value={formData.pendingCases || ""} 
                          onChange={(e) => setFormData({ ...formData, pendingCases: e.target.value })}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium">Pending Percentage</label>
                        <input 
                          type="number" 
                          step="0.01"
                          className="w-full p-2 border rounded" 
                          value={formData.pendingPercentage || ""} 
                          onChange={(e) => setFormData({ ...formData, pendingPercentage: e.target.value })}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium">Punishment Less Than 7 Years</label>
                        <input 
                          type="number" 
                          className="w-full p-2 border rounded" 
                          value={formData.punishmentLessThan7 || ""} 
                          onChange={(e) => setFormData({ ...formData, punishmentLessThan7: e.target.value })}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-small">Cases Punishment MoreThan 7 Years</label>
                        <input 
                          type="number" 
                          className="w-full p-2 border rounded" 
                          value={formData.punishmentMoreThan7 || ""} 
                          onChange={(e) => setFormData({ ...formData, punishmentMoreThan7: e.target.value })}
                        />
                      </div>
                    
                      <div>
                        <label className="block text-sm font-medium mb-3">Month-Year</label>
                        <input
                          type="month"
                          className="w-full p-2 border rounded"
                          value={formData.month_year || ""}
                          onChange={(e) => setFormData({ ...formData, month_year: e.target.value })}
                        />
                      </div>

                    
                    </div>
                  </div>
                )}

              {formData.formType === "Untraced Missing" && (
                  <div className="mt-4 border p-4 rounded-lg bg-gray-100 h-[450px] overflow-y-auto">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium">Unit</label>
                        <input
                          type="text"
                          className="w-full p-2 border rounded"
                          value={formData.formDUnit || ""}
                          onChange={(e) => setFormData({ ...formData, formDUnit: e.target.value })}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium">Police Station</label>
                        <input
                          type="text"
                          className="w-full p-2 border rounded"
                          value={formData.policeStationD || ""}
                          onChange={(e) => setFormData({ ...formData, policeStationD: e.target.value })}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium">Age Group</label>
                        <select
                          className="w-full p-2 border rounded bg-white"
                          value={formData.ageGroup || ""}
                          onChange={(e) => setFormData({ ...formData, ageGroup: e.target.value })}
                        >
                          <option value="">Select Age Group</option>
                          <option value="below18">Below 18 years</option>
                          <option value="above18">Above 18 years</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium">No of Untraced Persons</label>
                        <input
                          type="number"
                          className="w-full p-2 border rounded"
                          value={formData.untracedPersons || ""}
                          onChange={(e) => setFormData({ ...formData, untracedPersons: e.target.value })}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium">No of Missing Persons</label>
                        <input
                          type="number"
                          className="w-full p-2 border rounded"
                          value={formData.missingPersons || ""}
                          onChange={(e) => setFormData({ ...formData, missingPersons: e.target.value })}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium">Total Missing Persons (Untraced People)</label>
                        <input
                          type="number"
                          className="w-full p-2 border rounded"
                          value={formData.totalMissing || ""}
                          onChange={(e) => setFormData({ ...formData, totalMissing: e.target.value })}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium">Traced</label>
                        <input
                          type="number"
                          className="w-full p-2 border rounded"
                          value={formData.traced || ""}
                          onChange={(e) => setFormData({ ...formData, traced: e.target.value })}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium">Untraced</label>
                        <input
                          type="number"
                          className="w-full p-2 border rounded"
                          value={formData.untraced || ""}
                          onChange={(e) => setFormData({ ...formData, untraced: e.target.value })}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium">Percentage of Untraced Persons</label>
                        <input
                          type="number"
                          step="0.01"
                          className="w-full p-2 border rounded"
                          value={formData.untracedPercentage || ""}
                          onChange={(e) => setFormData({ ...formData, untracedPercentage: e.target.value })}
                        />
                      </div>
                      <div>
                            <label className="block text-sm font-medium">Month-Year </label>
                            <input
                              type="month"
                              className="w-full p-2 border rounded"
                              value={formData.month_year || ""}
                              onChange={(e) => setFormData({ ...formData, month_year: e.target.value })}
                            />
                          </div>                 
                    </div>
                    </div>
                  )}

                  {( formData.formType === "Offences against body under BNS" || formData.formType === "Important sections introduced in BNS" || formData.formType === "Property offences under BNS") && (
                      <div className="mt-4 border p-4 rounded-lg bg-gray-100 h-[450px] overflow-y-auto">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium">Unit</label>
                            <input type="text" className="w-full p-2 border rounded" value={formData.unit || ""} onChange={(e) => setFormData({ ...formData, unit: e.target.value })} />
                          </div>

                          <div>
                            <label className="block text-sm font-medium">Police Station</label>
                            <input type="text" className="w-full p-2 border rounded" value={formData.policeStation || ""} onChange={(e) => setFormData({ ...formData, policeStation: e.target.value })} />
                          </div>

                          <div>
                            <label className="block text-sm font-medium">Act and Section</label>
                            <input type="text" className="w-full p-2 border rounded" value={formData.actAndSection || ""} onChange={(e) => setFormData({ ...formData, actAndSection: e.target.value })} />
                          </div>

                          <div>
                            <label className="block text-sm font-medium">Reg'd Cases</label>
                            <input type="number" className="w-full p-2 border rounded" value={formData.registeredCases || ""} onChange={(e) => setFormData({ ...formData, registeredCases: e.target.value })} />
                          </div>

                          <div>
                            <label className="block text-sm font-medium">Detected Cases</label>
                            <input type="number" className="w-full p-2 border rounded" value={formData.detectedCases || ""} onChange={(e) => setFormData({ ...formData, detectedCases: e.target.value })} />
                          </div>

                          <div>
                            <label className="block text-sm font-medium">Percentage of Detected Cases</label>
                            <input type="number" step="0.01" className="w-full p-2 border rounded" value={formData.detectedCasesPercentage || ""} onChange={(e) => setFormData({ ...formData, detectedCasesPercentage: e.target.value })} />
                          </div>

                          <div>
                            <label className="block text-sm font-medium ">Month-Year</label>
                            <input type="month" className="w-full p-2 border rounded" value={formData.month_year || ""} onChange={(e) => setFormData({ ...formData, month_year: e.target.value })} />
                          </div>
                        </div>
                      </div>
                    )}

              </Box>
            )}
            {selectedTab === "upload" && (
              <Box display="flex" flexDirection="column" gap={2} minHeight="60vh">
                {/* Form Type Selection Dropdown */}
                <FormControl fullWidth>
                  <InputLabel id="form-type-label" shrink>Form Type</InputLabel>
                  <Select
                    labelId="form-type-label"
                    id="form-type"
                    value={selectedForm}
                    onChange={handleFormChange}
                    displayEmpty
                  >
                    {[
                      "FIR", "Pendency of cases under BNS", "Offences against body under BNS", "Untraced Missing", "Important sections introduced in BNS", "Property offences under BNS", "Form-G", 
                      "Form-H", "Form-I", "Form-J", "Form-K", "Form-L", "Form-M", "Form-N"
                    ].map((form) => (
                      <MenuItem key={form} value={form}>
                        {form}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Box>

                  <Button variant="contained" component="label" startIcon={<CloudUpload />}>
                    Upload CSV
                    <input type="file" hidden accept=".csv" onChange={handleFileUpload} />
                  </Button>
                  <Button variant="contained" startIcon={<Download />} onClick={generateCSV} sx={{ ml: 2 }}>
                    Download Sample
                  </Button>

                  {checkingCsv && <Typography>Checking CSV...</Typography>}
                  {csvValidationMessage && (
                    <Typography style={{ color: csvValidationMessage.color }}>{csvValidationMessage.text}</Typography>
                  )}

                  {csvData && (
                  <Box
                    sx={{
                      marginTop: "1.5rem",
                      maxHeight: "400px",
                      width: "100%",
                      overflowX: "auto",
                      overflowY: "auto",
                      border: "2px solid #ddd",
                      backgroundColor: "#f3f8ff",
                      padding: "8px",
                      borderRadius: "4px",
                      "&::-webkit-scrollbar": { display: "none" }, 
                    }}
                  >
                  
                  
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "#2d3748" }}>
                      CSV Preview
                    </Typography>
                  
                    <Box component="table" sx={{ 
                      width: "1000px",
                      borderCollapse: "collapse",
                      tableLayout: "fixed" // Ensures columns have a fixed size
                    }}>

                      <thead>
                        <tr>
                          {csvData[0].map((header, index) => (
                            <th
                            key={index}
                            style={{
                              border: "1px solid #bbb",
                              padding: "8px",
                              background: "#c6e0b4",
                              color: "#2d3748",
                              textAlign: "center",
                              fontWeight: "bold",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              maxWidth: "140px", // Prevents excessive column width
                            }}
                          >
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {csvData.slice(1).map((row, rowIndex) => (
                          <tr key={rowIndex} style={{ backgroundColor: rowIndex % 2 === 0 ? "#ffffff" : "#f7f7f7" }}>
                            {row.map((cell, cellIndex) => (
                              <td
                                key={cellIndex}
                                style={{
                                  border: "1px solid #ddd",
                                  padding: "8px",
                                  textAlign: "center",
                                  whiteSpace: "nowrap", // Prevents text wrapping
                                  overflow: "hidden",
                                  textOverflow: "ellipsis", // Shows "..." if text is too long
                                  maxWidth: "150px", // Limits cell width
                                }}
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </Box>

              </Box>
          
          )}
        </Box>
                               

                {fileInfo && <Typography>File: {fileInfo.name} ({fileInfo.size})</Typography>}
              </Box>
            )}

           
    
          <Box sx={{ padding: 2, borderTop: "1px solid #ddd", backgroundColor: "#f9f9f9" }}>
          <Button fullWidth variant="contained" sx={{ backgroundColor: "#2d3748", color: "white" }} onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
          </DialogContent>
          </Box>
        </Dialog>
        </>
  );
};

export default ModalComponent;












// import React, { useEffect, useState } from "react";
// import {
//   FormControl,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   FormControlLabel,
//   RadioGroup,
//   Radio,
//   Button,
//   TextField,
//   Select,
//   MenuItem,
//   Box,
//   Typography,
//   IconButton,InputLabel,FormHelperText
// } from "@mui/material";
// import { CloudUpload, Close } from "@mui/icons-material";
// import axiosInstance from "../../utils/axiosInstance";
// const ModalComponent = ({ open,type, onClose }) => {
//   const [selectedOption, setSelectedOption] = useState("");
//   const [selectedFileType, setSelectedFileType] = useState(""); // Police or Workshop
//   const initial = {
//     // type:selectedOption,
//     rank: "",
//     trained_officers: "",
//     available_officers: "",
//     percentage: "",
//     training_workshops: "",
//     e_academy_online: "",
//     master_trainers: "",
//     // fir_1 fields
//     total_no_fir_registered_under_bns_ipc: "",
//     no_of_fir_registered_under_bns: "",
//     percentage_of_fir_under_bns_against_total_firs: "",
//     no_of_chargesheets_filed_under_bns: "",
//     no_of_chargesheets_not_filed_within_the_stipulated_time: "",
//     percentage_of_chargesheets_filed_on_the_basis_of_firs_under_bns: "",
//     // fir_2 fields
//     total_charge_sheeted: "",
//     convicted: "",
//     acquitted: "",
//     pending: "",
//     // fir_3 fields
//     act: "",
//     section: "",
//     total_registered: "",
//     chargesheeted: "",
//     under_investigation: "",
//     // fir_4 fields
//     zero_fir : "",
//     regular_fir : "",
//     yet_to_be_registered_zero_fir : "",
//     //fir_5 fields
//     // city :"",
//     state :"",
//     ps_name:"",
//     date_of_data :"",
//     type_of_data :"",
//     //van fields
//     vanId :"", 
//     city :"",
//     // date :"",
//     count :"",
//     status :"",
//     //for_dev fields
//     month :"",
//     earlier_pending :"",
//     earlier_pending_exhibits :"",
//     received_cases :"",
//     received_exhibits :"",
//     disposal_cases :"",
//     disposal_exhibits :"",
//     pending_cases :"",
//     pending_exhibits :"",

//   };
  
//   const [formData, setFormData] = useState(initial);

//   const [uploadedFiles, setUploadedFiles] = useState([]);

//   // Handle Radio Button Change
//   const handleOptionChange = (event) => {
//     setSelectedOption(event.target.value);
//     console.log('radio',event.target.value)
//     setFormData(initial);
//     setUploadedFiles([]);
//   };


//   // Handle Form Data Change
//   // const handleChange = (event) => {
//   //   setFormData({ ...formData, [event.target.name]: event.target.value });
//   // };

//   // Handle File Upload
//   const handleFileUpload = (event) => {
//     const files = Array.from(event.target.files);
//     const allowedTypes = ["application/zip", "application/x-zip-compressed", "text/csv"];
  
//     const validFiles = files.filter(file => allowedTypes.includes(file.type));
  
//     if (validFiles.length !== files.length) {
//       alert("Only CSV or ZIP files are allowed.");
//     }
  
//     setUploadedFiles([...uploadedFiles, ...validFiles]);
//   };
  

//   // Remove File
//   const removeFile = (index) => {
//     const updatedFiles = uploadedFiles.filter((_, i) => i !== index);
//     setUploadedFiles(updatedFiles);
//   };
//   useEffect(() => {
//     if (type === "police") setSelectedOption("training");
//     if (type === "forensic") setSelectedOption("van");
//   }, [type]);
 


//   const handleSubmit = async () => {
//     try {
//       // Create FormData object
//       const formDataToSend = new FormData();
    
//       console.log("Raw Form Data:", formData);
  
//       // Append form fields (convert values to strings to ensure compatibility)
//       Object.keys(formData).forEach((key) => {
//         formDataToSend.append(key, formData[key] !== null ? String(formData[key]) : "");
//       });
    
//       // Append current date
//       const currentDate = new Date().toISOString().split("T")[0];
//       console.log('timestamp',currentDate)
//       if(type!=="forensic") formDataToSend.append("date", currentDate);
//       let url='/add_forms'
//       if(type==='police') formDataToSend.append("type", selectedOption);

//       if(['fir_1','fir_2','fir_3','fir_4','fir_5'].includes(type)) {console.log('type',type); formDataToSend.append("type", type)}
//       if(type==='forensic'){
//         formDataToSend.append("type", selectedOption);
//         formDataToSend.append("date_of_file", currentDate);
//         url='/forensic_form'
//       }
//       // Append files if any
//       if (uploadedFiles.length > 0) {
//         // formDataToSend.append('type',selectedFileType)
//         uploadedFiles.forEach((file) => {
//           formDataToSend.append("files", file);
//         });
//       }
    
//       // Debugging: Log FormData contents before sending
//       // console.log("FormData Contents:");
//       // for (let pair of formDataToSend.entries()) {
//       //   console.log(pair[0] + ": " + pair[1]);
//       // }
//       // console.log("FormData Type:", formDataToSend instanceof FormData ? "FormData" : typeof formDataToSend);


//       // Send all data in one request
//       const response = await axiosInstance.post(url, formDataToSend, {
//         headers: {
//           "Content-Type": "multipart/form-data", // Important to specify this
//         },
//       });
    
//       if (response.status !== 200&&response.status !== 201) {
//         throw new Error("Failed to submit form data");
//       }
    
//       alert(`${selectedOption} Form Submitted Successfully!`);
    
//       // Reset states
//       setFormData(initial);
//       setUploadedFiles([]);
//       setSelectedFileType("");
//       if (type === "police") setSelectedOption("training");
//       if (type === "forensic") setSelectedOption("van");
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       alert("An error occurred while submitting the form.");
//     }
//   };
  
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if(name === 'act' || name === 'section'){
//       setFormData({ ...formData, [name]: value });
//     }else if (/^\d*$/.test(value) || value === "") {  // Allow only numbers
//       setFormData({ ...formData, [name]: value });
//     }
//   };
  


//   return (
//     <>

// <Dialog
//   open={open}
//   onClose={onClose}
//   fullWidth
//   maxWidth="sm"
//   sx={{
//     "& .MuiPaper-root": { borderRadius: "30px" }, // Rounded corners
//     "& .MuiDialogContent-root": { 
//       maxHeight: "600px",  // Set a max height to enable scrolling
//       overflowY: "auto",   // Enable vertical scrolling
//       scrollbarWidth: "thin", // Firefox scrollbar
//       scrollbarColor: "#2d3748 #f0f0f0", // Track and thumb color for Firefox
//       "&::-webkit-scrollbar": {
//         width: "6px", // Slimmer scrollbar width
//       },
//       "&::-webkit-scrollbar-thumb": {
//         backgroundColor: "#2d3748", // Thumb color
//         borderRadius: "4px",
//       },
//       "&::-webkit-scrollbar-track": {
//         backgroundColor: "#f0f0f0", // Track color
//         marginBlock: "4px", // Removes scrollbar arrows
//       },
//     },
//   }}
  
// >

//     <DialogTitle backgroundColor='#2d3748' color='white' marginBottom='30px'>
//       <Box display="flex" justifyContent="space-between" alignItems="center" >
//         <Typography variant="h6"><strong>Form Details</strong></Typography>
//         <IconButton onClick={onClose}>
//           <Close style={{color:'white',fontWeight:'bold'}} />
//         </IconButton>
//       </Box>
//     </DialogTitle>

//     <DialogContent marginTop='10px'>
//       {/* Button Group */}
//       {type === "police"&&
//         <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
//           <Button
//               variant={selectedOption === "training" ? "contained" : "outlined"}
//               color="primary"
//               onClick={() => handleOptionChange({ target: { value: "training" } })}
//               sx={{
//                 marginRight: 2,
//                 backgroundColor: selectedOption === "training" ? "#2d3748" : "transparent", // Background color
//                 color: selectedOption === "training" ? "white" : "inherit", // Text color
//                 "&:hover": {
//                   backgroundColor: selectedOption === "training" ? "#2d3748" : "transparent", // Keep background color on hover if selected
//                 },
//               }}
//             >
//               Training Form
//           </Button>

//           <Button
//             variant={selectedOption === "workshop" ? "contained" : "outlined"}
//             color="primary"
//             onClick={() => handleOptionChange({ target: { value: "workshop" } })}
//             sx={{
//               backgroundColor: selectedOption === "workshop" ? "#2d3748" : "transparent", // Background color
//               color: selectedOption === "workshop" ? "white" : "inherit", // Text color
//               "&:hover": {
//                 backgroundColor: selectedOption === "workshop" ? "#2d3748" : "transparent", // Keep background color on hover if selected
//               },
//             }}
//           >
//             Workshop Form
//           </Button>

//         </Box>
//       }
//       {type === "forensic"&&
//         <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
//           <Button
//               variant={selectedOption === "van" ? "contained" : "outlined"}
//               color="primary"
//               onClick={() => handleOptionChange({ target: { value: "van" } })}
//               sx={{
//                 marginRight: 2,
//                 backgroundColor: selectedOption === "van" ? "#2d3748" : "transparent", // Background color
//                 color: selectedOption === "van" ? "white" : "inherit", // Text color
//                 "&:hover": {
//                   backgroundColor: selectedOption === "van" ? "#2d3748" : "transparent", // Keep background color on hover if selected
//                 },
//               }}
//             >
//               VAN Form
//           </Button>

//           <Button
//             variant={selectedOption === "for_dev" ? "contained" : "outlined"}
//             color="primary"
//             onClick={() => handleOptionChange({ target: { value: "for_dev" } })}
//             sx={{
//               backgroundColor: selectedOption === "for_dev" ? "#2d3748" : "transparent", // Background color
//               color: selectedOption === "for_dev" ? "white" : "inherit", // Text color
//               "&:hover": {
//                 backgroundColor: selectedOption === "for_dev" ? "#2d3748" : "transparent", // Keep background color on hover if selected
//               },
//             }}
//           >
//             DEV Form
//           </Button>

//         </Box>
//       }

//       {/* Conditionally render fields based on selected option */}
//       {type === "police"&&selectedOption === "training" && (
       
//         <Box display="flex" flexDirection="column" gap={2}>
//   {/* <TextField
//     label="Rank"
//     name="rank"
//     value={formData.rank}
//     onChange={handleChange}
//     fullWidth
//   /> */}
//   <FormControl fullWidth>
//     {/* <InputLabel id="rank-label">Rank</InputLabel> */}
//     <FormHelperText>Select Rank</FormHelperText> {/* Optional helper text */}

//     <Select
//       labelId="rank-label"
//       value={formData.rank} // Bind to form data
//       name="rank" // Name of the dropdown
//       onChange={handleChange} // Handle change function
//     >
//       <MenuItem value="police officers(psi to dsp)">Police Officers(PSI to DSP)</MenuItem>
//       <MenuItem value="police personnel(pc to asi)">Police Personnel(PC to ASI)</MenuItem>
//       {/* <MenuItem value="inspector">Inspector</MenuItem>
//       <MenuItem value="sub_inspector">Sub Inspector</MenuItem> */}
//     </Select>
//   </FormControl>
//   <TextField
//       label="Available Officers"
//       name="available_officers"
//       type="number"
//       value={formData.available_officers}
//       onChange={handleChange}
//       fullWidth
//       inputProps={{ min: 0 }}
//     />
//     <TextField
//       label="Trained Officers"
//       name="trained_officers"
//       type="number"
//       value={formData.trained_officers}
//       onChange={handleChange}
//       fullWidth
//       inputProps={{ min: 0 }}
//     />
//     <TextField
//       label="Percentage"
//       name="percentage"
//       type="number"
//       value={formData.percentage}
//       onChange={handleChange}
//       fullWidth
//       inputProps={{ min: 0, max: 100 }}
//     />

//   {/* First Dropdown for Rank */}
  

//   {/* Second Dropdown for Department */}
//   {/* <FormControl fullWidth>
//     <InputLabel id="department-label">Department</InputLabel>
//     <Select
//       labelId="department-label"
//       value={formData.department} // Bind to form data
//       name="department" // Name of the dropdown
//       onChange={handleChange} // Handle change function
//     >
//       <MenuItem value="admin">Admin</MenuItem>
//       <MenuItem value="criminal_investigation">Criminal Investigation</MenuItem>
//       <MenuItem value="cyber_security">Cyber Security</MenuItem>
//       <MenuItem value="traffic">Traffic</MenuItem>
//     </Select>
//     <FormHelperText>Select Department</FormHelperText>
//   </FormControl> */}
//         </Box>

//       )}

//       {type === "police"&&selectedOption === "workshop" && (
//         <Box display="flex" flexDirection="column" gap={2}>
//           <TextField
//             label="No. of Training Workshops Conducted"
//             name="training_workshops"
//             value={formData.training_workshops}
//             onChange={handleChange}
//             fullWidth
//           />
//           <TextField
//             label="Through E-Academy Online"
//             name="e_academy_online"
//             value={formData.e_academy_online}
//             onChange={handleChange}
//             fullWidth
//           />
//           <TextField
//             label="No. of Master Trainers"
//             name="master_trainers"
//             value={formData.master_trainers}
//             onChange={handleChange}
//             fullWidth
//           />
//         </Box>
//       )}
//       {type === "forensic" && selectedOption === "van" && (
//         <Box display="flex" flexDirection="column" gap={2}>
//           <TextField
//             label="Van ID"
//             name="vanId"
//             value={formData.vanId}
//             onChange={handleChange}
//             fullWidth
//           />
//           <TextField
//             label="City"
//             name="city"
//             value={formData.city}
//             onChange={handleChange}
//             fullWidth
//           />
//           {/* <TextField
//             label="Date"
//             name="date"
//             type="date"
//             value={formData.date}
//             onChange={handleChange}
//             fullWidth
//           /> */}
//           <TextField
//             label="Count"
//             name="count"
//             value={formData.count}
//             onChange={handleChange}
//             fullWidth
//           />
//           <TextField
//             label="Status"
//             name="status"
//             value={formData.status}
//             onChange={handleChange}
//             fullWidth
//           />
//         </Box>
//       )}

//       {type === "forensic" && selectedOption === "for_dev" && (
//         <Box display="flex" flexDirection="column" gap={2}>
//           <TextField
//             label="Month"
//             name="month"
//             value={formData.month}
//             onChange={handleChange}
//             fullWidth
//           />
//           <TextField
//             label="Earlier Pending Cases"
//             name="earlier_pending"
//             value={formData.earlier_pending}
//             onChange={handleChange}
//             fullWidth
//           />
//           <TextField
//             label="Earlier Pending Exhibits"
//             name="earlier_pending_exhibits"
//             value={formData.earlier_pending_exhibits}
//             onChange={handleChange}
//             fullWidth
//           />
//           <TextField
//             label="Received Cases"
//             name="received_cases"
//             value={formData.received_cases}
//             onChange={handleChange}
//             fullWidth
//           />
//           <TextField
//             label="Received Exhibits"
//             name="received_exhibits"
//             value={formData.received_exhibits}
//             onChange={handleChange}
//             fullWidth
//           />
//           <TextField
//             label="Disposal Cases"
//             name="disposal_cases"
//             value={formData.disposal_cases}
//             onChange={handleChange}
//             fullWidth
//           />
//           <TextField
//             label="Disposal Exhibits"
//             name="disposal_exhibits"
//             value={formData.disposal_exhibits}
//             onChange={handleChange}
//             fullWidth
//           />
//           <TextField
//             label="Pending Cases"
//             name="pending_cases"
//             value={formData.pending_cases}
//             onChange={handleChange}
//             fullWidth
//           />
//           <TextField
//             label="Pending Exhibits"
//             name="pending_exhibits"
//             value={formData.pending_exhibits}
//             onChange={handleChange}
//             fullWidth
//           />
//         </Box>
//       )}


//       {/* Fields for fir_1 */}
//       {type === "fir_1" && (
//         <Box display="flex" flexDirection="column" gap={2} marginTop='10px'>
//           <TextField
//             label="Total No. of FIR Registered Under BNS IPC"
//             name="total_no_fir_registered_under_bns_ipc"
//             value={formData.total_no_fir_registered_under_bns_ipc}
//             onChange={handleChange}
//             fullWidth
//           />
//           <TextField
//             label="No. of FIR Registered Under BNS"
//             name="no_of_fir_registered_under_bns"
//             value={formData.no_of_fir_registered_under_bns}
//             onChange={handleChange}
//             fullWidth
//           />
//           <TextField
//             label="Percentage of FIR Under BNS Against Total FIRs"
//             name="percentage_of_fir_under_bns_against_total_firs"
//             value={formData.percentage_of_fir_under_bns_against_total_firs}
//             onChange={handleChange}
//             fullWidth
//           />
//           <TextField
//             label="No. of Chargesheets Filed Under BNS"
//             name="no_of_chargesheets_filed_under_bns"
//             value={formData.no_of_chargesheets_filed_under_bns}
//             onChange={handleChange}
//             fullWidth
//           />
//           <TextField
//             label="No. of Chargesheets Not Filed Within the Stipulated Time"
//             name="no_of_chargesheets_not_filed_within_the_stipulated_time"
//             value={formData.no_of_chargesheets_not_filed_within_the_stipulated_time}
//             onChange={handleChange}
//             fullWidth
//           />
//           <TextField
//             label="Percentage of Chargesheets Filed on the Basis of FIRs Under BNS"
//             name="percentage_of_chargesheets_filed_on_the_basis_of_firs_under_bns"
//             value={formData.percentage_of_chargesheets_filed_on_the_basis_of_firs_under_bns}
//             onChange={handleChange}
//             fullWidth
//           />
//         </Box>
//       )}
//       {/* Fields for fir_2 */}
//       {type === "fir_2" && (
//         <Box display="flex" flexDirection="column" gap={2} marginTop='10px'>
//           <TextField
//             label="Total Charge Sheeted"
//             name="total_charge_sheeted"
//             value={formData.total_charge_sheeted}
//             onChange={handleChange}
//             fullWidth
//           />
//           <TextField
//             label="Convicted"
//             name="convicted"
//             value={formData.convicted}
//             onChange={handleChange}
//             fullWidth
//           />
//           <TextField
//             label="Acquitted"
//             name="acquitted"
//             value={formData.acquitted}
//             onChange={handleChange}
//             fullWidth
//           />
//           <TextField
//             label="Pending"
//             name="pending"
//             value={formData.pending}
//             onChange={handleChange}
//             fullWidth
//           />
//         </Box>
//       )}

//       {/* Fields for fir_3 */}
//       {type === "fir_3" && (
//         <Box display="flex" flexDirection="column" gap={2} marginTop='10px'>
//           <TextField
//             label="Act"
//             name="act"
//             value={formData.act}
//             onChange={handleChange}
//             fullWidth
//           />
//           <TextField
//             label="Section"
//             name="section"
//             value={formData.section}
//             onChange={handleChange}
//             fullWidth
//           />
//           <TextField
//             label="Total Registered"
//             name="total_registered"
//             value={formData.total_registered}
//             onChange={handleChange}
//             fullWidth
//           />
//           <TextField
//             label="Chargesheeted"
//             name="chargesheeted"
//             value={formData.chargesheeted}
//             onChange={handleChange}
//             fullWidth
//           />
//           <TextField
//             label="Under Investigation"
//             name="under_investigation"
//             value={formData.under_investigation}
//             onChange={handleChange}
//             fullWidth
//           />
//         </Box>
//       )}
//       {type === "fir_4" && (
//         <Box display="flex" flexDirection="column" gap={2} marginTop="10px">
//           <TextField
//             label="Zero FIR"
//             name="zero_fir"
//             value={formData.zero_fir}
//             onChange={handleChange}
//             fullWidth
//           />
//           <TextField
//             label="Regular FIR"
//             name="regular_fir"
//             value={formData.regular_fir}
//             onChange={handleChange}
//             fullWidth
//           />
//           <TextField
//             label="Yet to be Registered Zero FIR"
//             name="yet_to_be_registered_zero_fir"
//             value={formData.yet_to_be_registered_zero_fir}
//             onChange={handleChange}
//             fullWidth
//           />
//         </Box>
//       )}
//      {type === "fir_5" && (
//       <Box display="flex" flexDirection="column" gap={2} marginTop="10px">
//         <TextField
//           label="City"
//           name="city"
//           value={formData.city}
//           onChange={handleChange}
//           fullWidth
//         />
//         <TextField
//           label="State"
//           name="state"
//           value={formData.state}
//           onChange={handleChange}
//           fullWidth
//         />
//         <TextField
//           label="Police Station Name"
//           name="ps_name"
//           value={formData.ps_name}
//           onChange={handleChange}
//           fullWidth
//         />
//         <TextField
//           label="Date of Data"
//           name="date_of_data"
//           type="date"
//           value={formData.date_of_data}
//           onChange={handleChange}
//           fullWidth
//           InputLabelProps={{ shrink: true }} // Ensures label stays when date is selected
//         />
//         <TextField
//           label="Type of Data"
//           name="type_of_data"
//           value={formData.type_of_data}
//           onChange={handleChange}
//           fullWidth
//         />
//       </Box>
//       )}



//       <>
//   {/* File Upload Box */}
//   <Box
//     mt={2}
//     p={2}
//     border="2px dashed #ccc"
//     borderRadius="8px"
//     textAlign="center"
//     sx={{ cursor: "pointer", backgroundColor: "#f9f9f9", position: "relative" }}
//     onClick={() => document.getElementById("file-upload").click()}
//   >
//     {/* File Upload Icon */}
//     <CloudUpload fontSize="large" color="#2d3748" />

//     {/* Text Below the Icon */}
//     <Typography variant="body1" mt={1}>Drag & Drop or Click to Upload</Typography>

//     {/* File Upload Disclaimer Below the Icon */}
//     <Typography variant="body2" color="textSecondary" sx={{ marginTop: "10px" }}>
//       <strong>File Size Limit: </strong> Maximum file size is 10MB. <br />
//       {/* <strong>Sensitive Data:</strong> Please avoid uploading sensitive or private information. */}
//     </Typography>

//     {/* Hidden File Input */}
//     <input
//       id="file-upload"
//       type="file"
//       multiple
//       hidden
//       onChange={handleFileUpload}
//     />
//   </Box>

//   {/* Accepted File Types Below the Upload Box */}
//   <Box mt={1}>
//     <Typography variant="body2" color="textSecondary">
//       <strong>Accepted File Types:</strong> csv,zip
//     </Typography>
//   </Box>

//   {/* File Preview */}
//   {uploadedFiles.length > 0 && (
//     <Box mt={2}>
//       <Typography variant="body2" fontWeight="bold">Uploaded Files:</Typography>
//       {uploadedFiles.map((file, index) => (
//         <Box key={index} display="flex" justifyContent="space-between" alignItems="center" mt={1} p={1} border="1px solid #ddd" borderRadius="4px">
//           <Typography variant="body2">{file.name}</Typography>
//           <IconButton size="small" onClick={() => removeFile(index)}>
//             <Close fontSize="small" />
//           </IconButton>
//         </Box>
//       ))}
//     </Box>
//   )}
// </>


//       <Box display="flex" justifyContent="flex-end" mt={3}>
//         <Button variant="contained" style={{backgroundColor:'#2d3748' ,color:'white'}} onClick={handleSubmit}>
//           Submit
//         </Button>
//       </Box>
//     </DialogContent>
//   </Dialog>
//     </>
//   );
// };

// export default ModalComponent;
