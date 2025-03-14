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
import * as XLSX from "xlsx";
import Papa from "papaparse";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { toDate } from "date-fns";
import CloseIcon from "@mui/icons-material/Close";


const ModalComponent = ({ open, type, onClose, training_active, dateRange }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedForm, setSelectedForm] = useState("");

  const handleFormChange = (event) => {
    setSelectedForm(event.target.value);
  };


  // Get the current date in YYYY-MM format
  const currentDate = new Date().toISOString().slice(0, 7);

  function getInitialFormData() {
    return {
      formType: "",
      month_year: "",
      zone: localStorage.getItem("zone") || "",
      district: localStorage.getItem("district") || "",
      sections: "",
      totalCases: "",
      detectedCases: "",
      overallPercentage: "",
      uploadedFile: null,
      unit: localStorage.getItem("zone") || "",
      disposedCases: "",
      pendingCases: "",
      pendingPercentage: "",
      punishmentLessThan7: "",
      punishmentMoreThan7: "",
      crimeHead: "",
      regdCases: "",
      detectedCasesFormC: "",
      detectionPercentage: "",
      policeStationD: "",
      ageGroup: "",
      untracedPersons: "",
      missingPersons: "",
      totalMissing: "",
      traced: "",
      untraced: "",
      untracedPercentage: "",
      policeStation: "",
      actAndSection: "",
      registeredCases: "",
      detectedCasesPercentage: "",
      totalIOsNagapur: "",
      totalIOsEsakshya: "",
      esakshyaWage: "",
      totalOffencesUsed: "",
      totalOffencesNotUsed: "",
      offencesUsedChargeCheet: "",
      offencesNotUsedUnderInvestigation: "",
      percentageOfUsingEsakshya: "",
      totalZeroFIRsReceived: "",
      totalFIRsRegistered: "",
      pendingFIRs: "",
      totalTransferredZeroFIRs: "",
      formIMonthYear: "",
      totalEComplaintsReceived: "",
      totalComplaintsConverted: "",
      disposedEComplaints: "",
      formJMonthYear: "",
      total_cases: "",
      value_stolen_property: "",
      value_recovered_property: "",
      recovery_percentage: "",
      total_cases_gt_7_years: "",
      forensic_team_deployment_percentage: "",
      cases_forensic_team_visited: "",
      total_pocso: "",
      bns_cases: "",
      charge_sheeted_within_60_days: "",
      pending_cases: "",
      reasons_for_pending: "",
      percentage: "",
      fromDate: "",
      toDate: "",
      type_of_court: "",
      bns_sections: "",
      cases_decided: "",
      convicted_cases: "",
      conviction_rate: "",
      overall_cumulative: "",
      total_persons_trained: "",

      bns_sections: "",
      total_cases_convicted: "waiting for backend value",
      total_cases_decided: "waiting for backend value",
      detected_cases: "",
      offences_registerd: "",

      total_zero_firs: "",
      total_no_zero_fir_transferred_outer_state_to_mh: "",
      pending_for_re_registration: "",
      re_reg_firs: "",
      total_transferred_zero_firs_in_mh: "",
      pending_for_transfer_within_mh: "",
      total_firs_registered: "",
      total_no_zero_fir_transferred_outside_mh: "",
      pending_to_transfer_outside_mh: ""

    };
  }
  const [convictionData, setConvictionData] = useState([]);
  const [formData, setFormData] = useState(getInitialFormData());
  // const [formData, setFormData] = useState(getInitialFormData(), { toDate: currentDate });


  const [selectedTab, setSelectedTab] = useState("form");
  const [fileInfo, setFileInfo] = useState(null);

  useEffect(() => {
    if (open) setSelectedTab("form");
  }, [open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };



  // if (!formData.date || !formData.zone || !formData.district || !formData.totalCases) {
  //     alert("Please fill in all required fields.");
  //     return;
  // }


  // ======================================= UPLOAD_FILE ====================================================

  const [csvData, setCsvData] = useState(null);
  const [csvValidationMessage, setCsvValidationMessage] = useState(null);
  const [checkingCsv, setCheckingCsv] = useState(false);

  const expectedHeaders = {

    "Pendency of cases under BNS": [
      "total_cases_registered",
      "cases_disposed",
      "cases_pending_investigation",
      "percent_pendency",
      "cases_punishment_less_than_7_years",
      "cases_punishment_7_years_or_more",
      "month_year_from",
      "month_year_to"
    ],
    "Offences against body under BNS": [
      "unit",
      "police_station",
      "act_and_section",
      "registered_cases",
      "detected_cases",
      "percent_detection",
      "month_year_from",
      "month_year_to"
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
      "month_year_from",
      "month_year_to"
    ],
    "Important sections introduced in BNS": [
      "district",
      "unit",
      "police_station",
      "act_and_section",
      "registered_cases",
      "detected_cases",
      "percent_detection",
      "month_year_from",
      "month_year_to"
    ],
    "Property offences under BNS": [
      "unit",
      "police_station",
      "act_and_section",
      "registered_cases",
      "detected_cases",
      "percent_detection",
      "month_year_from",
      "month_year_to"
    ],
    "eSakshya Details": [
      "unit",
      "total_ios_nagpur_rural",
      "registered_ios_on_esakshya",
      "esakshya_usage_percentage",
      "month_year_from",
      "month_year_to"
    ],

    "Use of eSakshya App in cases with punishment of 7 yrs. or more": [
      "total_cases",
      "total_offences_with_esakshya",
      "total_charge_sheeted_with_esakshya",
      "total_under_investigation_without_esakshya",
      "month_year_from",
      "month_year_to"
    ],

    "Zero FIR's": [
      "unit",
      "section",
      "total_zero_firs_received",
      "total_firs_registered",
      "pending",
      "total_transferred_zero_firs",
      "month_year_from",
      "month_year_to"
    ],

    "eFIR": [
      "unit",
      "police_station",
      "total_ecomplaints_received",
      "total_ecomplaints_converted_to_firs",
      "disposed_of_ecomplaints",
      "month_year_from",
      "month_year_to"
    ],
    "ITSSO Compliance Form": [
      // "total_pocso",
      // "bns_cases",
      "charge_sheeted_within_60_days",
      "total_pocso_bns_cases",
      // "reasons_for_pending",
      // "percentage",
      "month_year_from",
      "month_year_to"
    ],
    "Stolen & Recovered Property": [
      "total_cases",
      "value_stolen_property",
      "value_recovered_property",
      "recovery_percentage",
      "detected_cases",
      "offences_registerd",
      "month_year_from",
      "month_year_to"
    ],
    "Visit of Forensic Teams": [
      "total_cases_gt_7_years",
      "forensic_team_deployment_percentage",
      "cases_forensic_team_visited",
      "month_year_from",
      "month_year_to"
    ],

    "Training Data": ["month_year_from", "month_year_to", "total_personnel", "personnel_trained", "total_officers", "officers_trained"],

    "Conviction under BNS": [
      "type_of_court",
      "bns_sections",
      "cases_decided",
      "cases_convicted",
      "conviction_rate"
    ]
  };



  const headerMappings = {
    "Pendency of cases under BNS": {
      "cases_disposed": "Disposed Cases",
      "cases_pending_investigation": "Pending Cases",
      "cases_punishment_less_than_7_years": "No. of Cases with Punishment < 7 Yrs. out of Reg. Cases",
      "cases_punishment_7_years_or_more": "No. of Cases with Punishment ≥ 7 Yrs. out of Reg. Cases",
      "month_year_from": "From Date",
      "month_year_to": "To Date"
    },
    "Offences against body under BNS": {
      "act_and_section": "Act and Section",
      "registered_cases": "Registered Cases",
      "detected_cases": "Detected Cases",
      "month_year_from": "From Date",
      "month_year_to": "To Date"
    },
    "Untraced Missing": {
      "age_group": "Age Group",
      "no_of_untraced_persons": "No of Untraced Persons",
      "no_of_missing_persons": "No of Missing Persons",
      "traced": "Traced",
      "month_year_from": "From Date",
      "month_year_to": "To Date"
    },
    "Important sections introduced in BNS": {
      "act_and_section": "Act and Section",
      "registered_cases": "Registered Cases",
      "detected_cases": "Detected Cases",
      "month_year_from": "From Date",
      "month_year_to": "To Date"
    },
    "Property offences under BNS": {
      "act_and_section": "Act and Section",
      "registered_cases": "Registered Cases",
      "detected_cases": "Detected Cases",
      "month_year_from": "From Date",
      "month_year_to": "To Date"
    },
    "eSakshya Details": {
      "total_ios": "Total No of IO's Registered",
      "registered_ios_on_esakshya": "No of IO's Registered on eSakshya",
      "month_year_from": "From Date",
      "month_year_to": "To Date"
    },
    "Use of eSakshya App in cases with punishment of 7 yrs. or more": {
      "total_cases": "Total No of Cases",
      "total_offences_with_esakshya": "Total Offences in which eSakshya has been Used",
      "total_charge_sheeted_with_esakshya": "Total Offences in Which eSakshya has been Used and Charge Sheeted",
      "total_under_investigation_without_esakshya": "Total Offences in which eSakshya has not been used and are Under Investigation",
      "month_year_from": "From Date",
      "month_year_to": "To Date"
    },

    // "columns": {
    //     "total_zero_firs",
    //     "total_no_zero_fir_transferred_outer_state_to_mh",
    //     "pending_for_re_registration",
    //     "re_reg_firs",
    //     "total_transferred_zero_firs_in_mh",
    //     "pending_for_transfer_within_mh",
    //     "total_firs_registered",
    //     "total_no_zero_fir_transferred_outside_mh",
    //     "pending_to_transfer_outside_mh"
    // },

    "Zero FIR's": {
      "total_no_zero_fir_transferred_outside_mh": "No. of Zero FIRs transferred outside Maharashtra",
      "total_no_zero_fir_transferred_outer_state_to_mh": "No. of Zero FIRs transferred from other State to Maharashtra",
      "total_zero_firs": "Total No of Zero FIRs",
      "total_firs_registered": "Zero FIR's in Maharashtra",
      "pending_to_transfer_outside_mh": "Pending for Transfer outside Maharashtra",
      "re_reg_firs": "Re-Registered FIRs in Maharashtra",
      "total_transferred_zero_firs_in_mh": "No of Zero FIR's Transferred Within Maharashtra",
      "pending_for_transfer_within_mh": "Pending for Transfer within Maharashtra",
      "pending_for_re_registration": "Pending for Re-registration",
      "month_year_from": "From Date",
      "month_year_to": "To Date"
    },
    "eFIR": {
      "total_ecomplaints_received": "Total eComplaints Received on Citizen Portal",
      "total_ecomplaints_converted_to_firs": "Total eComplaints Converted to Regular FIR's",
      "disposed_of_ecomplaints": "Disposed of eComplaints",
      "month_year_from": "From Date",
      "month_year_to": "To Date"
    },
    "ITSSO Compliance Form": {
      "total_pocso_bns_cases": "Total No. of registered POCSO + BNS cases",
      "charge_sheeted_within_60_days": "No. of cases (POCSO + BNS) chargesheet within 60 days",
      "month_year_from": "From Date",
      "month_year_to": "To Date"
    },
    "Stolen & Recovered Property": {
      "total_cases": "Total Cases",
      "value_stolen_property": "Value of Stolen Property",
      "value_recovered_property": "Value of Recovered Property",
      "detected_cases": "Detected Cases",
      "offences_registerd": "Offences Registered",
      "month_year_from": "From Date",
      "month_year_to": "To Date"
    },
    "Visit of Forensic Teams": {
      "total_cases_gt_7_years": "No. of cases registered in which punishment is 7 years or more",
      "cases_forensic_team_visited": "Cases in which Forensic Teams Visited",
      "month_year_from": "From Date",
      "month_year_to": "To Date"
    },
    "Training Data": {
      "month_year_from": "From Date",
      "month_year_to": "To Date",
      "total_personnel": "Total Constabulary",
      "personnel_trained": "Constabulary Trained",
      "total_officers": "Total Officers",
      "officers_trained": "Officers Trained"
    },
    "Conviction under BNS": {
      "type_of_court": "Type of Court",
      "bns_sections": "BNS Section",
      "cases_decided": "Cases Decided",
      "cases_convicted": "Cases Convictied",
      "month_year_from": "From Date",
      "month_year_to": "To Date",
      // "conviction_rate": "Conviction Rate (%)"
    }
  };

  const generateCSV = () => {
    const sampleFiles = {

      "Pendency of cases under BNS": [
        "cases_disposed,cases_pending_investigation,cases_punishment_less_than_7_years,cases_punishment_7_years_or_more,month_year_from,month_year_to",
        "20,10,15,14,02-03-2025,13-03-2025",
      ],
      "Offences against body under BNS": [
        "act_and_section,registered_cases,detected_cases,month_year_from,month_year_to",
        "text,22,3,02-03-2025,13-03-2025",
      ],
      "Untraced Missing": [
        "age_group,no_of_untraced_persons,no_of_missing_persons,traced,month_year_from,month_year_to",
        "below-18,22,13,4,02-03-2025,13-03-2025",
      ],
      "Important sections introduced in BNS": [
        "act_and_section,registered_cases,detected_cases,month_year_from,month_year_to",
        "text,22,3,02-03-2025,13-03-2025",
      ],
      "Property offences under BNS": [
        "act_and_section,registered_cases,detected_cases,month_year_from,month_year_to",
        "text,22,3,02-03-2025,13-03-2025",
      ],
      "eSakshya Details": [
        "total_ios,registered_ios_on_esakshya,month_year_from,month_year_to",
        "12,3,02-03-2024,13-02-2025"
      ],
      "Use of eSakshya App in cases with punishment of 7 yrs. or more": [
        "total_cases,total_offences_with_esakshya,total_charge_sheeted_with_esakshya,total_under_investigation_without_esakshya,month_year_from,month_year_to",
        "13,12,1,2,02-03-2025,13-03-2025"
      ],

      "Zero FIR's": [
        "total_no_zero_fir_transferred_outside_mh,total_no_zero_fir_transferred_outer_state_to_mh,total_zero_firs,total_firs_registered,pending_to_transfer_outside_mh,re_reg_firs,total_transferred_zero_firs_in_mh,pending_for_transfer_within_mh,pending_for_re_registration,month_year_from,month_year_to",
        "23,25,12,23,23,23,23,23,23,02-03-2025,13-03-2025"
      ],
      "eFIR": [
        "total_ecomplaints_received,total_ecomplaints_converted_to_firs,disposed_of_ecomplaints,month_year_from,month_year_to",
        "23,12,3,02-03-2025,13-03-2025"
      ],
      "ITSSO Compliance Form": [
        "total_pocso_bns_cases,charge_sheeted_within_60_days,month_year_from,month_year_to",
        "12,23,02-03-2025,13-03-2025"
      ],
      "Stolen & Recovered Property": [
        "total_cases,value_stolen_property,value_recovered_property,detected_cases,Offences_registerd,month_year_from,month_year_to",
        "10,4,2,20,40,02-03-2025,13-03-2025"
      ],
      "Visit of Forensic Teams": [
        "total_cases_gt_7_years,cases_forensic_team_visited,month_year_from,month_year_to",
        "23,23,02-03-2025,13-03-2025"
      ],
      "Training Data": [
        "month_year_from,month_year_to,total_personnel,personnel_trained,total_officers,officers_trained",
        "02-03-2025,13-03-2025,20,10,20,10"
      ],
      "Conviction under BNS": [
        "type_of_court,bns_sections,cases_decided,cases_convicted,month_year_from,month_year_to",
        "session,285,88,72,02-03-2025,13-03-2025"
      ],
    };



    if (!sampleFiles[selectedForm]) {
      alert("No data available");
      return;
    }

    const selectedData = sampleFiles[selectedForm].map(row => row.split(",")); // Convert strings to arrays

    // Get the corresponding header mapping
    const formHeaders = headerMappings[selectedForm] || {};

    // Convert lowercase headers to uppercase using the mapping
    const updatedHeaders = selectedData[0].map(col => formHeaders[col] || col);

    // Construct the CSV content
    const csvData = [updatedHeaders, ...selectedData.slice(1)]
      .map(row => row.join(","))
      .join("\n");

    // Create a CSV file and trigger download
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${selectedForm.toLowerCase().replace(/\s+/g, "_")}_sample.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  //   const csvContent = sampleFiles[selectedForm]?.join("\n") || "No data available";
  //   const blob = new Blob([csvContent], { type: "text/csv" });
  //   const url = URL.createObjectURL(blob);

  //   const a = document.createElement("a");
  //   a.href = url;
  //   a.download = `${selectedForm.toLowerCase()}_sample.csv`;
  //   document.body.appendChild(a);
  //   a.click();
  //   document.body.removeChild(a);
  // };
  // ---------------------------------------old_exists_original---------------------------------------

  // --------------------------------old---------------------------------
  // const handleFileUpload = (e) => {
  //   const file = e.target.files[0];

  //   if (file && file.type === "text/csv") {
  //     setFileInfo({ name: file.name, size: (file.size / 1024).toFixed(2) + " KB" });
  //     setCheckingCsv(true);

  //     Papa.parse(file, {
  //       complete: (result) => {
  //         const headers = result.data[0]; // Extract headers from the uploaded CSV
  //         const selectedHeaders = expectedHeaders[selectedForm]; // Get expected headers for the selected form type

  //         if (!selectedHeaders) {
  //           setCsvValidationMessage({ text: "Invalid form type selected", color: "red" });
  //           setCheckingCsv(false);
  //           return;
  //         }

  //         if (JSON.stringify(headers) === JSON.stringify(selectedHeaders)) {
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

  // ---------------------------------new------------------------------------------
  // const handleFileUpload = (e) => {
  //   const file = e.target.files[0];

  //   if (!file) return;

  //   const fileType = file.name.split(".").pop().toLowerCase();

  //   if (["csv", "xls", "xlsx"].includes(fileType)) {
  //     setFileInfo({ name: file.name, size: (file.size / 1024).toFixed(2) + " KB" });
  //     setCheckingCsv(true);
  //     setFormData((prev) => ({ ...prev, uploadedFile: file.name })); 

  //     if (fileType === "csv") {
  //       const reader = new FileReader();
  //       reader.onload = (event) => {
  //         const csvText = event.target.result;
  //         processFileData(csvText.split("\n").map(row => row.split(","))); // Convert CSV to array
  //       };
  //       reader.readAsText(file);
  //     } else {
  //       // Handle Excel Parsing
  //       const reader = new FileReader();
  //       reader.onload = (event) => {
  //         const data = new Uint8Array(event.target.result);
  //         const workbook = XLSX.read(data, { type: "array" });
  //         const sheetName = workbook.SheetNames[0];
  //         const worksheet = workbook.Sheets[sheetName];
  //         const excelData = XLSX.utils.sheet_to_csv(worksheet); // Convert Excel to CSV
  //         processFileData(excelData.split("\n").map(row => row.split(","))); // Convert CSV to array
  //       };
  //       reader.readAsArrayBuffer(file);
  //     }
  //   } else {
  //     alert("Only CSV, XLS, or XLSX files are allowed");
  //   }
  // };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const fileType = file.name.split(".").pop().toLowerCase();

    if (["csv", "xls", "xlsx"].includes(fileType)) {
      setFileInfo({ name: file.name, size: (file.size / 1024).toFixed(2) + " KB" });
      setCheckingCsv(true);
      setFormData((prev) => ({ ...prev, uploadedFile: file }));

      if (fileType === "csv" || fileType == "") {
        const reader = new FileReader();
        reader.onload = (event) => {
          const csvText = event.target.result;
          processFileData(csvText.split("\n").map(row => row.split(","))); // Convert CSV to array
        };
        reader.readAsText(file);
      } else {
        // Handle Excel Parsing
        const reader = new FileReader();
        reader.onload = (event) => {
          const data = new Uint8Array(event.target.result);
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const excelData = XLSX.utils.sheet_to_csv(worksheet); // Convert Excel to CSV
          processFileData(excelData.split("\n").map(row => row.split(","))); // Convert CSV to array
        };
        reader.readAsArrayBuffer(file);
      }
    } else {
      alert("Only CSV, XLS, or XLSX files are allowed");
    }
  };


  const processFileData = (data) => {
    if (!data || data.length === 0) {
      setCsvValidationMessage({ text: "Empty or invalid file", color: "red" });
      setCheckingCsv(false);
      return;
    }

    const selectedHeadersMapping = headerMappings[selectedForm];

    if (!selectedHeadersMapping) {
      setCsvValidationMessage({ text: "Invalid form type selected", color: "red" });
      setCheckingCsv(false);
      return;
    }

    // Reverse mapping: Convert displayed headers back to internal keys
    const reversedMapping = Object.fromEntries(
      Object.entries(selectedHeadersMapping).map(([key, value]) => [value.toLowerCase(), key])
    );

    // Convert uploaded headers to lowercase
    const headers = data[0].map(header => header.trim().toLowerCase());

    // Convert expected mapped values to internal keys
    const expectedHeaders = Object.values(selectedHeadersMapping).map(h => h.toLowerCase());

    // Convert uploaded headers to internal keys using reversed mapping
    const convertedHeaders = headers.map(header => reversedMapping[header] || header);

    // Find missing and extra headers after mapping
    const missingHeaders = Object.keys(selectedHeadersMapping).filter(header => !convertedHeaders.includes(header));
    const extraHeaders = convertedHeaders.filter(header => !Object.keys(selectedHeadersMapping).includes(header));

    if (missingHeaders.length === 0 && extraHeaders.length === 0) {
      setCsvValidationMessage({ text: "Headers Matched", color: "green" });
    } else {
      let errorMessage = "Headers Not Matching:\n";

      if (missingHeaders.length > 0) {
        errorMessage += `Missing: ${missingHeaders.map(h => selectedHeadersMapping[h]).join(", ")}\n`;
      }
      if (extraHeaders.length > 0) {
        errorMessage += `Extra: ${extraHeaders.join(", ")}\n`;
      }

      setCsvValidationMessage({ text: errorMessage, color: "red" });
    }

    setCsvData(data);
    setCheckingCsv(false);
  };


  // const processFileData = (data) => {
  //   const headers = data[0].map(header => header.trim()); // Extract and trim headers
  //   const selectedHeaders = expectedHeaders[selectedForm]?.map(header => header.trim()); // Expected headers for selected form

  //   if (!selectedHeaders) {
  //     setCsvValidationMessage({ text: "Invalid form type selected", color: "red" });
  //     setCheckingCsv(false);
  //     return;
  //   }

  //   // Find missing and extra headers
  //   const missingHeaders = selectedHeaders.filter(header => !headers.includes(header));
  //   const extraHeaders = headers.filter(header => !selectedHeaders.includes(header));

  //   if (missingHeaders.length === 0 && extraHeaders.length === 0) {
  //     setCsvValidationMessage({ text: "Headers Matched", color: "green" });
  //   } else {
  //     let errorMessage = "Headers Not Matching:\n";
  //     if (missingHeaders.length > 0) {
  //       errorMessage += `Missing: ${missingHeaders.join(", ")}\n`;
  //     }
  //     if (extraHeaders.length > 0) {
  //       errorMessage += `Extra: ${extraHeaders.join(", ")}\n`;
  //     }
  //     setCsvValidationMessage({ text: errorMessage, color: "red" });
  //   }

  //   setCsvData(data);
  //   setCheckingCsv(false);
  // };



  // =====================================================handlesubmit============================================
  // ------mapping -- for upload file ----------------
  const formTypeMapping = {
    "Pendency of cases under BNS": "pendency_in_bns",
    "Offences against body under BNS": "offences_against_body",
    "Untraced Missing": "untraced_missing",
    "Important sections introduced in BNS": "sections_in_bns",
    "Property offences under BNS": "property_offenses",
    "eSakshya Details": "esakshya_units",
    "Use of eSakshya App in cases with punishment of 7 yrs. or more": "esakshya_7_more",
    "Zero FIR's": "fir_and_zero_firs",
    "eFIR": "e_fir",
    "ITSSO Compliance Form": "itsso_compliance",
    "Stolen & Recovered Property": "stolen_recovered_property",
    "Visit of Forensic Teams": "forensic_team_deployment",
    "Training Data": "police_training",
    "Conviction under BNS": "conviction_rate_in_bns",
  };
  const selectedType = formTypeMapping[selectedForm];

  const handleSubmit = async () => {
    try {
      const formDataToSend = new FormData();
      const token = localStorage.getItem("token"); // Get token from localStorage

      console.log("Selected Form Before Sending:", selectedForm); // Debugging
      console.log("Selected Form Before Sending:", formData.uploadedFile); // Debugging
      console.log("formtype", formData);
      if (formData.uploadedFile) {
        console.log("Inside this upload file");
        // ----------------------------added for reverse keys------------------------------------------
        // Get the header mapping for the selected form
        const selectedHeadersMapping = headerMappings[selectedForm];

        // Reverse mapping: from displayed headers (in file) back to original internal keys
        // For example, mapping "From Date" back to "month_year_from"
        const reversedMapping = Object.fromEntries(
          Object.entries(selectedHeadersMapping).map(([key, value]) => [value.toLowerCase(), key])
        );

        // Process the header row: convert each header from the file to lowercase and then map it
        const uploadedHeaders = csvData[0].map(header => header.trim().toLowerCase());
        const convertedHeaders = uploadedHeaders.map(header => reversedMapping[header] || header);

        // Reassemble the CSV content: use the converted headers and then the rest of the rows
        const newCsvContent = [
          convertedHeaders.join(","),
          ...csvData.slice(1).map(row => row.join(","))
        ].join("\n");

        // Create a new file blob with the updated CSV content
        const newFileBlob = new Blob([newCsvContent], { type: "text/csv" });
        // Append additional data and the new file blob to formDataToSend
        formDataToSend.append("type", selectedType);
        formDataToSend.append("file", newFileBlob, "processed_file.csv");
        // -------------------------------------------------------------------------------------------------------
        // formDataToSend.append("type", selectedType);
        // formDataToSend.append("file", formData.uploadedFile);
        formDataToSend.append("unit", localStorage.getItem("zone") || "N/A");
        formDataToSend.append("district", localStorage.getItem("district") || "N/A");
        formDataToSend.append("police_station", localStorage.getItem("police_station") || "NAGPUR");
        // formDataToSend.append("unit", localStorage.getItem("unit") || "N/A");
        // formDataToSend.append("month_year_from", formData.fromDate || dateRange.fromDate || "");
        // formDataToSend.append("month_year_to", formData.toDate || dateRange.toDate || "");
      }
      else {

        if (formData.formType === "Pendency of cases under BNS") {
          formDataToSend.append("type", "pendency_in_bns");
          formDataToSend.append("district", localStorage.getItem("district") || "");
          formDataToSend.append("police_station", localStorage.getItem("police_station") || "NAGPUR");
          formDataToSend.append("city", localStorage.getItem("city") || "N/A");
          formDataToSend.append("unit", formData.unit);
          formDataToSend.append("total_cases_registered", formData.totalCases);
          formDataToSend.append("cases_disposed", formData.disposedCases);
          formDataToSend.append("cases_pending_investigation", formData.pendingCases);
          formDataToSend.append("percent_pendency", formData.pendingPercentage);
          formDataToSend.append("cases_punishment_less_than_7_years", formData.punishmentLessThan7);
          formDataToSend.append("cases_punishment_7_years_or_more", formData.punishmentMoreThan7);
          formDataToSend.append("month_year_from", formData.fromDate || dateRange.fromDate || "");
          formDataToSend.append("month_year_to", formData.toDate || dateRange.toDate || "");
        }
        if (formData.formType === "Offences against body under BNS") {
          formDataToSend.append("type", "offences_against_body");
          formDataToSend.append("district", localStorage.getItem("district") || "");
          formDataToSend.append("police_station", localStorage.getItem("police_station") || "NAGPUR");
          formDataToSend.append("city", localStorage.getItem("city") || "N/A");
          formDataToSend.append("unit", formData.unit);
          formDataToSend.append("police_station", formData.policeStation);
          formDataToSend.append("act_and_section", formData.actAndSection);
          formDataToSend.append("registered_cases", formData.registeredCases);
          formDataToSend.append("detected_cases", formData.detectedCases);
          formDataToSend.append("percent_detection", formData.detectedCasesPercentage);
          formDataToSend.append("month_year_from", formData.fromDate || dateRange.fromDate || "");
          formDataToSend.append("month_year_to", formData.toDate || dateRange.toDate || "");
        }
        if (formData.formType === "Untraced Missing") {  //Tested
          formDataToSend.append("type", "untraced_missing");
          formDataToSend.append("district", localStorage.getItem("district") || "");
          formDataToSend.append("police_station", localStorage.getItem("police_station") || "NAGPUR");
          formDataToSend.append("city", localStorage.getItem("city") || "N/A");
          formDataToSend.append("unit", formData.unit);
          formDataToSend.append("police_station", formData.policeStationD);
          formDataToSend.append("age_group", formData.ageGroup);
          formDataToSend.append("no_of_untraced_persons", formData.untracedPersons);
          formDataToSend.append("no_of_missing_persons", formData.missingPersons);
          formDataToSend.append("total_missing_persons", formData.totalMissing);
          formDataToSend.append("traced", formData.traced);
          formDataToSend.append("untraced", formData.untraced);
          formDataToSend.append("percent_untraced", formData.untracedPercentage);
          formDataToSend.append("month_year_from", formData.fromDate || dateRange.fromDate || "");
          formDataToSend.append("month_year_to", formData.toDate || dateRange.toDate || "");
        }
        if (formData.formType === "Important sections introduced in BNS") { //Tested
          formDataToSend.append("type", "sections_in_bns");
          formDataToSend.append("district", localStorage.getItem("district") || "");
          formDataToSend.append("police_station", localStorage.getItem("police_station") || "NAGPUR");
          formDataToSend.append("city", localStorage.getItem("city") || "N/A");
          formDataToSend.append("unit", formData.unit);
          formDataToSend.append("police_station", formData.policeStation);
          formDataToSend.append("act_and_section", formData.actAndSection);
          formDataToSend.append("registered_cases", formData.registeredCases);
          formDataToSend.append("detected_cases", formData.detectedCases);
          formDataToSend.append("percent_detection", formData.detectedCasesPercentage);
          formDataToSend.append("month_year_from", formData.fromDate || dateRange.fromDate || "");
          formDataToSend.append("month_year_to", formData.toDate || dateRange.toDate || "");
        }
        if (formData.formType === "Property offences under BNS") { //Tested
          formDataToSend.append("type", "property_offenses");
          formDataToSend.append("district", localStorage.getItem("district") || "");
          formDataToSend.append("police_station", localStorage.getItem("police_station") || "NAGPUR");
          formDataToSend.append("city", localStorage.getItem("city") || "N/A");
          formDataToSend.append("unit", formData.unit);
          formDataToSend.append("police_station", formData.policeStation);
          formDataToSend.append("act_and_section", formData.actAndSection);
          formDataToSend.append("registered_cases", formData.registeredCases);
          formDataToSend.append("detected_cases", formData.detectedCases);
          formDataToSend.append("percent_detection", formData.detectedCasesPercentage);
          formDataToSend.append("month_year_from", formData.fromDate || dateRange.fromDate || "");
          formDataToSend.append("month_year_to", formData.toDate || dateRange.toDate || "");
        }
        if (formData.formType === "eSakshya Details") { //Tested
          formDataToSend.append("type", "esakshya_units");
          formDataToSend.append("district", localStorage.getItem("district") || "");
          formDataToSend.append("police_station", localStorage.getItem("police_station") || "NAGPUR");
          formDataToSend.append("city", localStorage.getItem("city") || "N/A");
          formDataToSend.append("unit", formData.unit);
          formDataToSend.append("total_ios_nagpur_rural", formData.totalIOsNagapur);
          formDataToSend.append("registered_ios_on_esakshya", formData.totalIOsEsakshya);
          formDataToSend.append("esakshya_usage_percentage", formData.esakshyaWage);
          formDataToSend.append("month_year_from", formData.fromDate || dateRange.fromDate || "");
          formDataToSend.append("month_year_to", formData.toDate || dateRange.toDate || "");
        }
        if (formData.formType === "Use of eSakshya App in cases with punishment of 7 yrs. or more") {
          formDataToSend.append("type", "esakshya_7_more");
          formDataToSend.append("district", localStorage.getItem("district") || "");
          formDataToSend.append("police_station", localStorage.getItem("police_station") || "NAGPUR");
          formDataToSend.append("city", localStorage.getItem("city") || "N/A");
          formDataToSend.append("unit", formData.unit);
          formDataToSend.append("total_cases", formData.totalCases);
          formDataToSend.append("total_offences_with_esakshya", formData.totalOffencesUsed);
          formDataToSend.append("total_offences_without_esakshya", formData.totalOffencesNotUsed);
          formDataToSend.append("total_charge_sheeted_with_esakshya", formData.offencesUsedChargeCheet);
          formDataToSend.append("total_under_investigation_without_esakshya", formData.offencesNotUsedUnderInvestigation);
          formDataToSend.append("percentage_usage", formData.percentageOfUsingEsakshya);
          formDataToSend.append("month_year_from", formData.fromDate || dateRange.fromDate || "");
          formDataToSend.append("month_year_to", formData.toDate || dateRange.toDate || "");
        }

        if (formData.formType === "Zero FIR's") {
          formDataToSend.append("type", "fir_and_zero_firs");
          formDataToSend.append("district", localStorage.getItem("district") || "");
          formDataToSend.append("police_station", localStorage.getItem("police_station") || "NAGPUR");
          formDataToSend.append("city", localStorage.getItem("city") || "N/A");
          formDataToSend.append("unit", localStorage.getItem("unit") || "N/A");
          formDataToSend.append("total_no_zero_fir_transferred_outside_mh", formData.total_no_zero_fir_transferred_outside_mh);
          formDataToSend.append("total_no_zero_fir_transferred_outer_state_to_mh", formData.total_no_zero_fir_transferred_outer_state_to_mh);
          formDataToSend.append("total_zero_firs", formData.total_zero_firs);
          formDataToSend.append("total_firs_registered", formData.total_firs_registered);
          formDataToSend.append("pending_to_transfer_outside_mh", formData.pending_to_transfer_outside_mh);
          formDataToSend.append("re_reg_firs", formData.re_reg_firs);
          formDataToSend.append("total_transferred_zero_firs_in_mh", formData.total_transferred_zero_firs_in_mh);
          formDataToSend.append("pending_for_transfer_within_mh", formData.pending_for_transfer_within_mh);
          formDataToSend.append("pending_for_re_registration", formData.pending_for_re_registration);
          formDataToSend.append("month_year_from", formData.fromDate || dateRange.fromDate || "");
          formDataToSend.append("month_year_to", formData.toDate || dateRange.toDate || "");
        }
        if (formData.formType === "eFIR") {
          formDataToSend.append("type", "e_fir");
          formDataToSend.append("district", localStorage.getItem("district") || "");
          formDataToSend.append("police_station", localStorage.getItem("police_station") || "NAGPUR");
          formDataToSend.append("city", localStorage.getItem("city") || "N/A");
          formDataToSend.append("unit", formData.unit);
          formDataToSend.append("police_station", formData.policeStation);
          formDataToSend.append("total_ecomplaints_received", formData.totalEComplaintsReceived);
          formDataToSend.append("total_ecomplaints_converted_to_firs", formData.totalComplaintsConverted);
          formDataToSend.append("disposed_of_ecomplaints", formData.disposedEComplaints);
          formDataToSend.append("month_year_from", formData.fromDate || dateRange.fromDate || "");
          formDataToSend.append("month_year_to", formData.toDate || dateRange.toDate || "");
        }
        if (formData.formType === "ITSSO Compliance Form") {
          formDataToSend.append("type", "itsso_compliance");
          formDataToSend.append("district", localStorage.getItem("district") || "");
          formDataToSend.append("police_station", localStorage.getItem("police_station") || "NAGPUR");
          formDataToSend.append("city", localStorage.getItem("city") || "N/A");
          formDataToSend.append("unit", localStorage.getItem("unit") || "N/A");
          // formDataToSend.append("total_pocso", formData.total_pocso || "");
          // formDataToSend.append("bns_cases", formData.bns_cases || "");
          formDataToSend.append("charge_sheeted_within_60_days", formData.charge_sheeted_within_60_days || "0");
          formDataToSend.append("total_pocso_bns_cases", formData.total_pocso_bns_cases || "0");
          // formDataToSend.append("reasons_for_pending", formData.reasons_for_pending || "");
          formDataToSend.append("percentage", formData.percentage || "0");
          formDataToSend.append("month_year_from", formData.fromDate || dateRange.fromDate || "");
          formDataToSend.append("month_year_to", formData.toDate || dateRange.toDate || "");
        }
        if (formData.formType === "Stolen & Recovered Property") {
          formDataToSend.append("type", "stolen_recovered_property");
          formDataToSend.append("district", localStorage.getItem("district") || "");
          formDataToSend.append("police_station", localStorage.getItem("police_station") || "NAGPUR");
          formDataToSend.append("city", localStorage.getItem("city") || "N/A");
          formDataToSend.append("unit", localStorage.getItem("unit") || "N/A");
          formDataToSend.append("total_cases", formData.total_cases || "0");
          formDataToSend.append("value_stolen_property", formData.value_stolen_property || "0");
          formDataToSend.append("value_recovered_property", formData.value_recovered_property || "0");
          formDataToSend.append("recovery_percentage", formData.recovery_percentage || "0");
          formDataToSend.append("detected_cases", formData.detected_cases || "0");
          formDataToSend.append("offences_registerd", formData.offences_registerd || "0");
          formDataToSend.append("month_year_from", formData.fromDate || dateRange.fromDate || "");
          formDataToSend.append("month_year_to", formData.toDate || dateRange.toDate || "");
        }
        if (formData.formType === "Visit of Forensic Teams") {  //Tested
          formDataToSend.append("type", "forensic_team_deployment");
          formDataToSend.append("district", localStorage.getItem("district") || "");
          formDataToSend.append("police_station", localStorage.getItem("police_station") || "NAGPUR");
          formDataToSend.append("city", localStorage.getItem("city") || "N/A");
          formDataToSend.append("unit", localStorage.getItem("unit") || "N/A");
          formDataToSend.append("total_cases_gt_7_years", formData.total_cases_gt_7_years || "0");
          formDataToSend.append("forensic_team_deployment_percentage", formData.forensic_team_deployment_percentage || "0");
          formDataToSend.append("cases_forensic_team_visited", formData.cases_forensic_team_visited || "0");
          formDataToSend.append("month_year_from", formData.fromDate || dateRange.fromDate || "");
          formDataToSend.append("month_year_to", formData.toDate || dateRange.toDate || "");
        }
        if (formData.formType === "Training Data") {   //Tested
          formDataToSend.append("type", "police_training");
          formDataToSend.append("district", localStorage.getItem("district") || "N/A");
          formDataToSend.append("police_station", localStorage.getItem("police_station") || "NAGPUR");
          formDataToSend.append("city", localStorage.getItem("city") || "N/A");
          formDataToSend.append("unit", localStorage.getItem("zone") || "Nagpur Rural");
          formDataToSend.append("total_personnel", formData.total_personal || "0");
          formDataToSend.append("sessions_personnel", formData.no_of_personal || "0");
          formDataToSend.append("personnel_trained", formData.personal_trained || "0");
          formDataToSend.append("percent_personnel_trained", formData.percentage_personal_trained || "0");
          formDataToSend.append("total_officers", formData.total_officers || "0");
          formDataToSend.append("sessions_officers", formData.no_of_session_officers || "0");
          formDataToSend.append("officers_trained", formData.officers_trained || "0");
          // formDataToSend.append("total_persons_trained", formData.total_persons_trained || "");
          formDataToSend.append("percent_officers_trained", formData.percentage_officers_trained || "");
          // formDataToSend.append("overall_cumulative", formData.overall_cumulative || "");
          formDataToSend.append("month_year_from", formData.fromDate || dateRange.fromDate || "");
          formDataToSend.append("month_year_to", formData.toDate || dateRange.toDate || "");
        }
        if (formData.formType === "Conviction under BNS") { //Tested
          formDataToSend.append("type", "conviction_rate_in_bns" || "0");
          formDataToSend.append("district", localStorage.getItem("district") || "0");
          formDataToSend.append("police_station", localStorage.getItem("police_station") || "NAGPUR");
          formDataToSend.append("city", localStorage.getItem("city") || "N/A");
          formDataToSend.append("unit", localStorage.getItem("zone") || "Nagpur Rural");
          formDataToSend.append("month_year_from", formData.fromDate || dateRange.fromDate || "");
          formDataToSend.append("month_year_to", formData.toDate || dateRange.toDate || "0");
          formDataToSend.append("type_of_court", formData.type_of_court || "0");
          formDataToSend.append("bns_sections", formData.bns_sections || "0");
          // If "Other" is selected in BNS Sections, send the custom value
          if (formData.bns_sections === "Other") {
            formDataToSend.append("other_bns_section", formData.other_bns_section || "0");
          }
          formDataToSend.append("cases_decided", formData.cases_decided || "0");
          formDataToSend.append("cases_convicted", formData.convicted_cases || "0");
          formDataToSend.append("conviction_rate", formData.conviction_rate || "0");
        }
      }

      const response = await axiosInstance.post("/fir_form", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `${token}`, // Include token
        },
      });
      // const response = await axios.post("http://192.168.1.33:5555/api/fir_form", formDataToSend, {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //     Authorization: `${token}`, // Ensure token is valid
      //   },
      // });

      if (response.status === 201) {
        alert("Data inserted successfully");
        setFormData(getInitialFormData());
        setFileInfo(null);
        // window.location.reload();
      } else {
        throw new Error(`Unexpected response: ${response.status}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form. Check console for details.");
    }
  };



  // useEffect(() => {
  //   setFormData(prevState => ({
  //     ...getInitialFormData(),
  //     formType: prevState.formType, // Keep the selected form type
  //   }));
  // }, [formData.formType]);

  // useEffect(() => {
  //   setFormData(getInitialFormData());
  // }, [training_active]);

  // const [convictionData, setConvictionData] = useState(null);

  // useEffect(() => {
  //   const fetchConvictionData = async () => {
  //     try {
  //       const response = await fetch("http://192.168.1.33:5555/api/conviction");
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch data");
  //       }
  //       const data = await response.json();
  //       setConvictionData(data);
  //     } catch (error) {
  //       console.error("Error fetching conviction data:", error);
  //     }
  //   };

  //   fetchConvictionData();
  // }, []); // Empty dependency array ensures it runs only once on mount

  // console.log(convictionData); // Check the API response

  // Fetch data from API on component mount
  useEffect(() => {
    const fetchConvictionData = async () => {
      try {

        const response = await axios.get("http://192.168.1.33:5555/api/conviction");
        setConvictionData(response.data);
      } catch (error) {
        console.error("Error fetching conviction data:", error);
      }
    };

    fetchConvictionData();
  }, []);

  // Handle BNS Section selection
  // const handleBnsSectionChange = (e) => {
  //   const selectedSection = e.target.value;

  //   // Find matching data
  //   const matchedData = convictionData.find((item) => item.bns_section === selectedSection);

  //   setFormData((prev) => ({
  //     ...prev, // Preserve other form data
  //     bns_sections: selectedSection,
  //     total_cases_convicted: matchedData ? matchedData.total_cases_convicted : "waiting for backend value",
  //     total_cases_decided: matchedData ? matchedData.total_cases_decided : "waiting for backend value",
  //   }));
  // };

  // useEffect(() => {
  //   console.log(formData.total_cases_convicted, formData.total_cases_decided, formData.bns_sections, "...................tpaoca.........");
  // }, [formData]); // Runs whenever formData changes

  const handleBnsSectionChange = (e) => {
    const selectedSection = e.target.value;

    // Find matching data
    const matchedData = convictionData.find((item) => item.bns_section === selectedSection);

    // Update form data
    setFormData((prev) => ({
      ...prev,
      bns_sections: selectedSection,
      total_cases_convicted: matchedData ? matchedData.total_cases_convicted : 0,
      total_cases_decided: matchedData ? matchedData.total_cases_decided : 0,
    }));

    console.log("Selected Section:", selectedSection);
  };




  // ================================================================================================================

  const [historyData, setHistoryData] = useState([]); // Store response as an array
  const [openModal, setOpenModal] = useState(false); // State for modal visibility
  const excludedFields = ["city", "file_path", "district", "id", "unit", "uploaded_by", "police_station"]; // Fields to exclude

  const fetchHistory = async () => {
    if (!formData.formType) {
      alert("Please select a Form Type before fetching history.");
      return;
    }

    const token = localStorage.getItem("token"); // Retrieve token from localStorage

    const payload = {
      fromDate: localStorage.getItem("from_date") || "N/A",
      toDate: localStorage.getItem("to_date") || "N/A",
      table_name: formData.formType,
    };

    try {
      const response = await axiosInstance.post("/history", payload, {
        headers: {
          Authorization: `${token}`, // Include token
        },
      });

      console.log("History Response:", response.data);
      setHistoryData(response.data); // Store the response data
      setOpenModal(true); // Open the modal after fetching data
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };


  // const fetchHistory = async () => {
  //   if (!formData.formType) {
  //     alert("Please select a Form Type before fetching history.");
  //     return;
  //   }

  //   const payload = {
  //     fromDate: localStorage.getItem("from_date") || "N/A",
  //     toDate: localStorage.getItem("to_date") || "N/A",
  //     formType: formData.formType,
  //   };

  //   try {
  //     const response = await axios.post("/history", payload);
  //     console.log("History Response:", response.data);
  //     setHistoryData(response.data); // Store the response data
  //     setOpenModal(true); // Open the modal after fetching data
  //   } catch (error) {
  //     console.error("Error fetching history:", error);
  //   }
  // };

  // ========================kiran_kumar====================================

  // ---------------------------------------------------------------------

  return (
    <>

      <Dialog open={open} onClose={onClose} fullWidth maxWidth="md" sx={{ maxWidth: "830px", margin: "auto" }}>
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
                <Box display="flex" gap={2} width="100%">
                  {/* From Date Field */}
                  <FormControl fullWidth>
                    <label className="block text-sm font-medium">From Date</label>
                    <input
                      type="date"
                      className="w-full p-2 border rounded"
                      value={formData.fromDate || dateRange.fromDate} // Set default from date
                      onChange={(e) => setFormData({ ...formData, fromDate: e.target.value })}
                      readOnly
                    />
                  </FormControl>

                  <FormControl fullWidth>
                    <label className="block text-sm font-medium">As on Date</label>
                    <input
                      type="date"
                      className="w-full p-2 border rounded"
                      value={formData.toDate || dateRange.toDate} // Set default to date
                      onChange={(e) => setFormData({ ...formData, toDate: e.target.value })}
                      readOnly
                    />
                  </FormControl>

                </Box>
                <div>
                  {/* Form Type Selection Dropdown */}
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id="form-type-label">Form Type</InputLabel>
                    <Select
                      labelId="form-type-label"
                      id="form-type"
                      value={formData.formType}
                      onChange={(e) => setFormData({ ...formData, formType: e.target.value })}
                      label="Form Type"
                    >
                      {(() => {
                        let formOptions = [];

                        if (training_active?.section === "training") {
                          formOptions = ["Training Data"];
                        } else if (training_active?.section === "forensic/visits") {
                          formOptions = [

                            "Visit of Forensic Teams",
                          ];
                        } else if (training_active?.section === "FIR") {
                          formOptions = [
                            "Pendency of cases under BNS",
                            "Offences against body under BNS",
                            "Untraced Missing",
                            "Important sections introduced in BNS",
                            "Property offences under BNS",
                            "eSakshya Details",
                            "Use of eSakshya App in cases with punishment of 7 yrs. or more",
                            "Zero FIR's",
                            "eFIR",
                            "ITSSO Compliance Form",
                            "Stolen & Recovered Property",
                            "Conviction under BNS",
                          ];
                        }

                        return formOptions.map((form) => (
                          <MenuItem key={form} value={form}>
                            {form}
                          </MenuItem>
                        ));
                      })()}
                    </Select>
                  </FormControl>

                  {/* History Button */}
                  <Button variant="contained" color="primary" onClick={fetchHistory} className="mt-4">
                    View History
                  </Button>

                  {/* History Modal */}
                  <Dialog
                    open={openModal}
                    onClose={() => setOpenModal(false)}
                    fullWidth
                    maxWidth="md"
                    sx={{ color: "white", borderRadius: "10px" }} // White text for contrast
                  >
                    <DialogTitle sx={{ fontWeight: "bold" }}>
                      History Data
                      <IconButton
                        aria-label="close"
                        onClick={() => setOpenModal(false)}
                        sx={{ position: "absolute", right: 10, top: 10, color: "black" }}
                      >
                        <CloseIcon />
                      </IconButton>
                    </DialogTitle>

                    <DialogContent>
                      {historyData?.data && Array.isArray(historyData.data) && historyData.data.length > 0 ? (
                        <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
                          <thead>
                            <tr className="bg-gray-700 text-white"> {/* Header Background Only */}
                              {Object.keys(historyData.data[0])
                                .filter((key) => !excludedFields.includes(key)) // Remove unwanted fields
                                .map((key) => (
                                  <th key={key} className="border border-gray-300 p-3 text-left">
                                    {key.replace(/_/g, " ").toUpperCase()}
                                  </th>
                                ))}
                            </tr>
                          </thead>
                          <tbody>
                            {historyData.data.map((row, index) => (
                              <tr key={index} className="hover:bg-gray-100"> {/* Subtle hover effect */}
                                {Object.keys(row)
                                  .filter((key) => !excludedFields.includes(key)) // Remove unwanted fields
                                  .map((key, i) => (
                                    <td key={i} className="border border-gray-300 p-3">
                                      {row[key] !== null ? row[key].toString() : "N/A"}
                                    </td>
                                  ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <p>No history data available.</p>
                      )}
                    </DialogContent>
                  </Dialog>


                </div>



                {formData.formType === "Pendency of cases under BNS" && (
                  <div className="mt-4 border p-4 rounded-lg bg-gray-100 ">
                    <div className="grid grid-cols-2 gap-4">

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
                        {parseInt(formData.disposedCases) > parseInt(formData.totalCases) && (
                          <p className="text-red-500 text-sm mt-1">Disposed Cases cannot exceed Total Cases.</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Pending Cases</label>
                        <input
                          type="number"
                          className="w-full p-2 border rounded"
                          value={formData.pendingCases = ((Number(formData.totalCases) - Number(formData.disposedCases)))}
                          onChange={(e) => setFormData({ ...formData, pendingCases: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Percentage of Pendency</label>
                        <input
                          type="number"
                          step="0.01"
                          className="w-full p-2 border rounded"
                          value={formData.pendingPercentage = ((Number(formData.pendingCases) / Number(formData.totalCases) * 100).toFixed(2))}
                          onChange={(e) => setFormData({ ...formData, pendingPercentage: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">No. of Cases with Punishment &lt; 7 Yrs. out of Reg. Cases</label>
                        <input
                          type="number"
                          className="w-full p-2 border rounded"
                          value={formData.punishmentLessThan7 || ""}
                          onChange={(e) => setFormData({ ...formData, punishmentLessThan7: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-small">No. of Cases with Punishment &ge; 7 Yrs. out of Reg. Cases</label>
                        <input
                          type="number"
                          className="w-full p-2 border rounded"
                          value={formData.punishmentMoreThan7 || ""}
                          onChange={(e) => setFormData({ ...formData, punishmentMoreThan7: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {formData.formType === "Untraced Missing" && (
                  // h-[450px] overflow-y-auto
                  <div className="mt-4 border p-4 rounded-lg bg-gray-100 ">
                    <div className="grid grid-cols-2 gap-4">
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
                        <label className="block text-sm font-medium">Total Missing Persons</label>
                        <input
                          type="number"
                          className="w-full p-2 border rounded"
                          value={formData.totalMissing = ((Number(formData.missingPersons) + Number(formData.untracedPersons)))}
                          onChange={(e) => setFormData({ ...formData, totalMissing: e.target.value })}
                          readOnly
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
                        {parseInt(formData.traced) > parseInt(formData.totalMissing) && (
                          <p className="text-red-500 text-sm mt-1">Traced cannot exceed Total Missing Persons.</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium">Untraced</label>
                        <input
                          type="number"
                          className="w-full p-2 border rounded"
                          value={formData.untraced = ((Number(formData.totalMissing) - Number(formData.traced)))}
                          onChange={(e) => setFormData({ ...formData, untraced: e.target.value })}
                          readOnly
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium">% of Untraced Persons</label>
                        <input
                          type="number"
                          step="0.01"
                          className="w-full p-2 border rounded"
                          value={formData.untracedPercentage = ((Number(formData.untraced) / Number(formData.totalMissing) * 100).toFixed(2))}
                          onChange={(e) => setFormData({ ...formData, untracedPercentage: e.target.value })}
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
                          <option value="below18">Equal to 18 years</option>
                          <option value="above18">Above 18 years</option>
                        </select>
                      </div>

                    </div>
                  </div>
                )}

                {(formData.formType === "Offences against body under BNS" || formData.formType === "Important sections introduced in BNS" || formData.formType === "Property offences under BNS") && (
                  <div className="mt-4 border p-4 rounded-lg bg-gray-100">
                    <div className="grid grid-cols-2 gap-4">

                      <div>
                        <label className="block text-sm font-medium">Act and Section</label>
                        <select
                          className="w-full p-2 border rounded"
                          value={formData.actAndSection || ""}
                          onChange={(e) => setFormData({ ...formData, actAndSection: e.target.value })}
                        >
                          <option value="" disabled>Select an Act and Section</option>

                          {/* If formType is "Important sections introduced in BNS", show this set */}
                          {formData.formType === "Important sections introduced in BNS" && (
                            <>
                              <option value="Mob Lynching (Section 103 (2) BNS)">Mob Lynching (Section 103 (2) BNS)</option>
                              <option value="Snatching (Section 304 BNS)">Snatching (Section 304 BNS)</option>
                              <option value="Organized crime (Section 111 BNS)">Organized crime (Section 111 BNS)</option>
                              <option value="Petty Organized crime (Section 112 BNS)">Petty Organized crime (Section 112 BNS)</option>
                              <option value="Terrorist act (Section 113 BNS)">Terrorist act (Section 113 BNS)</option>
                            </>
                          )}

                          {/* If formType is "Offences against body under BNS", show this set */}
                          {formData.formType === "Offences against body under BNS" && (
                            <>
                              <option value="Murder (BNS Sec. 103(1))">Murder (BNS Sec. 103(1))</option>
                              <option value="Att. To Murder (BNS Sec. 109)">Att. To Murder (BNS Sec. 109)</option>
                              <option value="Rape (BNS Sec. 64 to 71)">Rape (BNS Sec. 64 to 71)</option>
                              <option value="Hurt (BNS Sec. 117 to 125)">Hurt (BNS Sec. 117 to 125)</option>
                              <option value="Riots (BNS Sec. 191 to 193)">Riots (BNS Sec. 191 to 193)</option>
                              <option value="Molestation (BNS Sec. 74 to 79)">Molestation (BNS Sec. 74 to 79)</option>
                            </>
                          )}

                          {/* If formType is "Property offences under BNS", show this set */}
                          {formData.formType === "Property offences under BNS" && (
                            <>
                              <option value="Dacoity (BNS Sec. 310)">Dacoity (BNS Sec. 310)</option>
                              <option value="Robbery (BNS Sec. 309)">Robbery (BNS Sec. 309)</option>
                              <option value="HBT (BNS Sec. 331 to 334)">HBT (BNS Sec. 331 to 334)</option>
                              <option value="Theft (BNS Sec. 303 & 305)">Theft (BNS Sec. 303 & 305)</option>
                            </>
                          )}

                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium">Reg'd Cases</label>
                        <input type="number" className="w-full p-2 border rounded" value={formData.registeredCases || ""} onChange={(e) => setFormData({ ...formData, registeredCases: e.target.value })} />
                      </div>

                      <div>
                        <label className="block text-sm font-medium">Detected Cases</label>
                        <input type="number" className="w-full p-2 border rounded" value={formData.detectedCases || ""} onChange={(e) => setFormData({ ...formData, detectedCases: e.target.value })} />
                        {parseInt(formData.detectedCases) > parseInt(formData.registeredCases) && (
                          <p className="text-red-500 text-sm mt-1">Detected Cases cannot exceed Reg'd Cases.</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium">% of Detection</label>
                        <input type="number" step="0.01" className="w-full p-2 border rounded" value={formData.detectedCasesPercentage = ((Number(formData.detectedCases) / Number(formData.registeredCases) * 100).toFixed(2))} onChange={(e) => setFormData({ ...formData, detectedCasesPercentage: e.target.value })} />
                      </div>

                    </div>
                  </div>
                )}

                {formData.formType === "eSakshya Details" && (
                  <div className="mt-4 border p-4 rounded-lg bg-gray-100">
                    <div className="grid grid-cols-2 gap-4">

                      <div>
                        <label className="block text-sm font-medium">No of IO's Registered</label>
                        <input
                          type="number"
                          className="w-full p-2 border rounded"
                          value={formData.totalIOsNagapur}
                          onChange={(e) => setFormData({ ...formData, totalIOsNagapur: e.target.value })}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium">eSakshya downloads by IOs</label>
                        <input
                          type="number"
                          className="w-full p-2 border rounded"
                          value={formData.totalIOsEsakshya}
                          onChange={(e) => setFormData({ ...formData, totalIOsEsakshya: e.target.value })}
                        />
                        {parseInt(formData.totalIOsEsakshya) > parseInt(formData.totalIOsNagapur) && (
                          <p className="text-red-500 text-sm mt-1">No of IO's Registered on eSakshya cannot exceed Total No of IO's Registered.</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium">eSakshya Usage %</label>
                        <input
                          type="number"
                          step="0.01"
                          className="w-full p-2 border rounded"
                          value={formData.esakshyaWage = ((Number(formData.totalIOsEsakshya) / Number(formData.totalIOsNagapur) * 100).toFixed(2))}
                          onChange={(e) => setFormData({ ...formData, esakshyaWage: e.target.value })}
                        />
                      </div>

                    </div>
                  </div>
                )}

                {formData.formType === "Use of eSakshya App in cases with punishment of 7 yrs. or more" && (
                  <div className="mt-4 border p-4 rounded-lg bg-gray-100">
                    <div className="grid grid-cols-2 gap-4">

                      <div>
                        <label className="block text-sm font-medium">Total No of Cases</label>
                        <input
                          type="number"
                          className="w-full p-2 border rounded mt-3"
                          value={formData.totalCases}
                          onChange={(e) => setFormData({ ...formData, totalCases: e.target.value })}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium">Total Offences in which eSakshya has been Used</label>
                        <input
                          type="number"
                          className="w-full p-2 border rounded"
                          value={formData.totalOffencesUsed}
                          onChange={(e) => setFormData({ ...formData, totalOffencesUsed: e.target.value })}
                        />
                        {parseInt(formData.totalOffencesUsed) > parseInt(formData.totalCases) && (
                          <p className="text-red-500 text-sm mt-1"> Total Offences in which eSakshya has been Used cannot exceed Total No of Cases.</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium">Total Offences in which eSakshya has not been Used</label>
                        <input
                          type="number"
                          className="w-full p-2 border rounded"
                          value={formData.totalOffencesNotUsed = (Number(formData.totalCases) - Number(formData.totalOffencesUsed))}
                          onChange={(e) => setFormData({ ...formData, totalOffencesNotUsed: e.target.value })}
                        />
                        {parseInt(formData.totalOffencesNotUsed) > parseInt(formData.totalCases) && (
                          <p className="text-red-500 text-sm mt-1"> Total Offences in which eSakshya has not been Used cannot exceed Total No of Cases.</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium">% of Using eSakshya</label>
                        <input
                          type="number"
                          className="w-full p-2 border rounded mt-3"
                          value={formData.percentageOfUsingEsakshya = ((Number(formData.totalOffencesUsed) / Number(formData.totalCases) * 100).toFixed(2))}
                          onChange={(e) => setFormData({ ...formData, percentageOfUsingEsakshya: e.target.value })}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium">Total Offences in Which eSakshya has been Used and Charge Sheeted</label>
                        <input
                          type="number"
                          className="w-full p-2 border rounded"
                          value={formData.offencesUsedChargeCheet}
                          onChange={(e) => setFormData({ ...formData, offencesUsedChargeCheet: e.target.value })}
                        />
                        {parseInt(formData.offencesUsedChargeCheet) > parseInt(formData.totalOffencesUsed) && (
                          <p className="text-red-500 text-sm mt-1">Total Offences in Which eSakshya has been Used and Charge Sheeted cannot exceed Total Offences in which eSakshya has been Used.</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium">
                          Total Offences in which eSakshya has not been used and are Under Investigation
                        </label>

                        <input
                          type="number"
                          className="w-full p-2 border rounded"
                          value={
                            formData.totalOffencesNotUsed && formData.offencesUsedChargeCheet
                              ? Number(formData.totalOffencesUsed) - Number(formData.offencesUsedChargeCheet)
                              : 0
                          }
                          onChange={(e) => setFormData({ ...formData, offencesNotUsedUnderInvestigation: e.target.value })}
                        />

                        {parseInt(formData.offencesNotUsedUnderInvestigation || 0) > parseInt(formData.totalCases || 0) && (
                          <p className="text-red-500 text-sm mt-1">
                            Total Offences in which eSakshya has not been used and are Under Investigation cannot exceed Total No of Cases.
                          </p>
                        )}
                      </div>



                    </div>
                  </div>
                )}



                {formData.formType === "Zero FIR's" && (
                  <div className="mt-4 border p-4 rounded-lg bg-gray-100 ">
                    <div className="grid grid-cols-2 gap-4">

                      <div>
                        <label className="block text-sm font-medium">
                          No. of Zero FIRs transferred outside Maharashtra
                        </label>
                        <input
                          type="number"
                          className="w-full p-2 border rounded"
                          value={formData.total_no_zero_fir_transferred_outside_mh || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, total_no_zero_fir_transferred_outside_mh: e.target.value })
                          }
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium">
                          No. of Zero FIRs transferred from other State to Maharashtra
                        </label>
                        <input
                          type="number"
                          className="w-full p-2 border rounded"
                          value={formData.total_no_zero_fir_transferred_outer_state_to_mh || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, total_no_zero_fir_transferred_outer_state_to_mh: e.target.value })
                          }
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium">
                          Total No of Zero FIRs
                        </label>
                        <input
                          type="number"
                          className="w-full p-2 border rounded"
                          value={formData.total_zero_firs = ((Number(formData.total_no_zero_fir_transferred_outside_mh) + Number(formData.total_no_zero_fir_transferred_outer_state_to_mh))) || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, total_zero_firs: e.target.value })
                          }
                          readOnly
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium">
                          Pending for Transfer outside Maharashtra
                        </label>
                        <input
                          type="number"
                          className="w-full p-2 border rounded"
                          value={formData.pending_to_transfer_outside_mh = ((Number(formData.total_zero_firs) - Number(formData.total_no_zero_fir_transferred_outside_mh))) || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, pending_to_transfer_outside_mh: e.target.value })
                          }
                          readOnly
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium">
                          Zero FIR's in Maharashtra
                        </label>
                        <input
                          type="number"
                          className="w-full p-2 border rounded"
                          value={formData.total_firs_registered || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, total_firs_registered: e.target.value })
                          }
                        />
                      </div>



                      <div>
                        <label className="block text-sm font-medium">
                          Re-Registered FIRs in Maharashtra
                        </label>
                        <input
                          type="number"
                          className="w-full p-2 border rounded"
                          value={formData.re_reg_firs || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, re_reg_firs: e.target.value })
                          }
                        />
                        {parseInt(formData.re_reg_firs) > parseInt(formData.total_no_zero_fir_transferred_outer_state_to_mh) && (
                          <p className="text-red-500 text-sm mt-1">Re-Registered FIRs in Maharashtra cannot exceed No. of Zero FIRs transferred from other State to Maharashtra.</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium">
                          No of Zero FIR's Transferred Within Maharashtra
                        </label>
                        <input
                          type="number"
                          className="w-full p-2 border rounded"
                          value={formData.total_transferred_zero_firs_in_mh || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, total_transferred_zero_firs_in_mh: e.target.value })
                          }
                        />
                        {parseInt(formData.total_transferred_zero_firs_in_mh) > parseInt(formData.re_reg_firs) && (
                          <p className="text-red-500 text-sm mt-1">No of Zero FIR's Transferred Within Maharashtra cannot exceed Re-Registered FIRs in Maharashtra.</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium">
                          Pending for Transfer within Maharashtra
                        </label>
                        <input
                          type="number"
                          className="w-full p-2 border rounded"
                          value={formData.pending_for_transfer_within_mh = ((Number(formData.re_reg_firs) - Number(formData.total_transferred_zero_firs_in_mh))) || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, pending_for_transfer_within_mh: e.target.value })
                          }
                          readOnly
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium">
                          Pending for Re-registration
                        </label>
                        <input
                          type="number"
                          className="w-full p-2 border rounded"
                          value={formData.pending_for_re_registration = ((Number(formData.total_no_zero_fir_transferred_outer_state_to_mh) - Number(formData.re_reg_firs))) || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, pending_for_re_registration: e.target.value })
                          }
                          readOnly
                        />
                      </div>

                    </div>
                  </div>
                )}

                {formData.formType === "eFIR" && (
                  <div className="mt-4 border p-4 rounded-lg bg-gray-100 ">
                    <div className="grid grid-cols-2 gap-4">

                      <div>
                        <label className="block text-sm font-medium">
                          Total eComplaints Received on Citizen Portal
                        </label>
                        <input
                          type="number"
                          className="w-full p-2 border rounded"
                          value={formData.totalEComplaintsReceived || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, totalEComplaintsReceived: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">
                          Total eComplaints Converted to Regular FIRs
                        </label>
                        <input
                          type="number"
                          className="w-full p-2 border rounded"
                          value={formData.totalComplaintsConverted || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, totalComplaintsConverted: e.target.value })
                          }
                        />
                        {parseInt(formData.totalComplaintsConverted) > parseInt(formData.totalEComplaintsReceived) && (
                          <p className="text-red-500 text-sm mt-1">Total eComplaints Converted to Regular FIRs cannot exceed Total eComplaints Received on Citizen Portal.</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium">
                          Disposed of eComplaints
                        </label>
                        <input
                          type="number"
                          className="w-full p-2 border rounded"
                          value={formData.disposedEComplaints || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, disposedEComplaints: e.target.value })
                          }
                        />
                        {parseInt(formData.disposedEComplaints) > parseInt(formData.totalEComplaintsReceived) && (
                          <p className="text-red-500 text-sm mt-1">Disposed of eComplaints cannot exceed Total eComplaints Received on Citizen Portal.</p>
                        )}
                      </div>

                    </div>
                  </div>
                )}

                {formData.formType === "ITSSO Compliance Form" && (
                  <div className="mt-4 border p-4 rounded-lg bg-gray-100 ">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium">Total No. of registered POCSO + BNS cases</label>
                        <input
                          type="number"
                          className="w-full p-2 border rounded mt-3"
                          value={formData.total_pocso_bns_cases || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, total_pocso_bns_cases: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">
                          No. of cases (POCSO + BNS) chargesheet within 60 days
                        </label>
                        <input
                          type="number"
                          className="w-full p-2 border rounded"
                          value={formData.charge_sheeted_within_60_days || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              charge_sheeted_within_60_days: e.target.value,
                            })
                          }
                        />
                        {parseInt(formData.charge_sheeted_within_60_days) > parseInt(formData.total_pocso_bns_cases) && (
                          <p className="text-red-500 text-sm mt-1">No. of cases (POCSO + BNS) chargesheet within 60 days cannot exceed Total No. of registered POCSO + BNS cases.</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium">Compliance Rate</label>
                        <input
                          type="number"
                          className="w-full p-2 border rounded"
                          value={formData.percentage = ((Number(formData.charge_sheeted_within_60_days) / Number(formData.total_pocso_bns_cases) * 100).toFixed(2))}
                          onChange={(e) =>
                            setFormData({ ...formData, percentage: e.target.value })
                          }
                        />
                      </div>

                    </div>
                  </div>
                )}

                {formData.formType === "Stolen & Recovered Property" && (
                  <div className="mt-4 border p-4 rounded-lg bg-gray-100 ">
                    <div className="grid grid-cols-2 gap-4">

                      <div>
                        <label className="block text-sm font-medium">Total Cases</label>
                        <select
                          className="w-full p-2 border rounded"
                          value={formData.total_cases || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, total_cases: e.target.value })
                          }
                        >
                          <option value="" disabled>Select Total Cases</option>
                          <option value="Dacoity">Dacoity</option>
                          <option value="Robbery">Robbery</option>
                          <option value="Robbery">HBT</option>
                          <option value="Theft">Theft</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium">Offences Registered</label>
                        <input
                          type="number"
                          className="w-full p-2 border rounded"
                          value={formData.offences_registerd || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, offences_registerd: e.target.value })
                          }
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium">Value of Stolen Property</label>
                        <input
                          type="number"
                          className="w-full p-2 border rounded"
                          value={formData.value_stolen_property || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, value_stolen_property: e.target.value })
                          }
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium">Detected Registered</label>
                        <input
                          type="number"
                          className="w-full p-2 border rounded"
                          value={formData.detected_cases || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, detected_cases: e.target.value })
                          }
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium">Value of Recovered Property</label>
                        <input
                          type="number"
                          className="w-full p-2 border rounded"
                          value={formData.value_recovered_property || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, value_recovered_property: e.target.value })
                          }
                        />
                        {parseInt(formData.value_recovered_property) > parseInt(formData.value_stolen_property) && (
                          <p className="text-red-500 text-sm mt-1">Value of Recovered Property cannot exceed Value of Stolen Property.</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium">Recovery % </label>
                        <input
                          type="number"
                          className="w-full p-2 border rounded"
                          value={formData.recovery_percentage = ((Number(formData.value_recovered_property) / Number(formData.value_stolen_property) * 100).toFixed(2))}
                          onChange={(e) =>
                            setFormData({ ...formData, recovery_percentage: e.target.value })
                          }
                        />
                      </div>

                    </div>
                  </div>
                )}

                {formData.formType === "Visit of Forensic Teams" && (
                  <div className="mt-4 border p-4 rounded-lg bg-gray-100 ">
                    <div className="grid grid-cols-2 gap-4">

                      <div>
                        <label className="block text-sm font-medium">No. of cases registered in which punishment is 7 years or more</label>
                        <input
                          type="number"
                          className="w-full p-2 border rounded"
                          value={formData.total_cases_gt_7_years || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, total_cases_gt_7_years: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Cases in which Forensic Teams Visited</label>
                        <input
                          type="number"
                          className="w-full p-2 border rounded mt-3"
                          // cases_forensic_team_visited
                          value={formData.cases_forensic_team_visited || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              cases_forensic_team_visited: e.target.value,
                            })
                          }
                        />
                        {parseInt(formData.cases_forensic_team_visited) > parseInt(formData.total_cases_gt_7_years) && (
                          <p className="text-red-500 text-sm mt-1">Cases in which Forensic Teams Visited cannot exceed No. of cases registered in which punishment is 7 years or more.</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Percentage</label>
                        <input
                          type="number"
                          className="w-full p-2 border rounded"
                          // forensic_team_deployment_percentage
                          value={formData.forensic_team_deployment_percentage = ((Number(formData.cases_forensic_team_visited) / Number(formData.total_cases_gt_7_years) * 100).toFixed(2))}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              forensic_team_deployment_percentage: e.target.value,
                            })
                          }
                        />
                      </div>

                    </div>
                  </div>
                )}

                {formData.formType === "Training Data" && (
                  <div className="mt-4 border p-4 rounded-lg bg-gray-100 ">
                    <div className="grid grid-cols-2 gap-4">

                      <div>
                        <label className="block text-sm font-medium">Total No. of Constabulary</label>
                        <input
                          type="number"
                          className="w-full p-2 border rounded"
                          value={formData.total_personal || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, total_personal: e.target.value })
                          }
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium">Total No. of Officers</label>
                        <input
                          type="number"
                          className="w-full p-2 border rounded"
                          value={formData.total_officers || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, total_officers: e.target.value })
                          }
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium">No. of Constabulary Trained</label>
                        <input
                          type="number"
                          className="w-full p-2 border rounded"
                          value={formData.personal_trained || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, personal_trained: e.target.value })
                          }
                        />

                        {parseInt(formData.personal_trained) > parseInt(formData.total_personal) && (
                          <p className="text-red-500 text-sm mt-1">Trained Constabulary cannot exceed Total Constabulary.</p>
                        )}

                      </div>
                      <div>
                        <label className="block text-sm font-medium">No. of Officers Trained</label>
                        <input
                          type="number"
                          className="w-full p-2 border rounded"
                          value={formData.officers_trained || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, officers_trained: e.target.value })
                          }
                        />
                        {parseInt(formData.officers_trained) > parseInt(formData.total_officers) && (
                          <p className="text-red-500 text-sm mt-1">No. of Officers Trained cannot exceed Total Officers.</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium">% of Constabulary Trained</label>
                        <input
                          type="number"
                          className="w-full p-2 border rounded"
                          value={formData.percentage_personal_trained = ((Number(formData.personal_trained) / Number(formData.total_personal)) * 100).toFixed(2)}
                          onChange={(e) =>
                            setFormData({ ...formData, percentage_personal_trained: e.target.value })
                          }
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium">% of Officers Trained</label>
                        <input
                          type="number"
                          className="w-full p-2 border rounded"
                          value={formData.percentage_officers_trained = ((Number(formData.officers_trained) / Number(formData.total_officers)) * 100).toFixed(2)}
                          onChange={(e) =>
                            setFormData({ ...formData, percentage_officers_trained: e.target.value })
                          }
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium">Overall Cumulative %</label>
                        <input
                          type="number"
                          className="w-full p-2 border rounded"
                          value={formData.overall_cumulative = (
                            ((Number(formData.percentage_personal_trained) || 0) +
                              (Number(formData.percentage_officers_trained) || 0)) / 2
                          ).toFixed(2)}
                          onChange={(e) =>
                            setFormData({ ...formData, overall_cumulative: e.target.value })
                          }
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium">Total Persons Trained</label>
                        <input
                          type="number"
                          className="w-full p-2 border rounded"
                          value={formData.total_persons_trained = ((Number(formData.personal_trained) + Number(formData.officers_trained)))}
                          onChange={(e) =>
                            setFormData({ ...formData, total_persons_trained: e.target.value })
                          }
                        />
                      </div>

                    </div>
                  </div>
                )}

                {formData.formType === "Conviction under BNS" && (
                  <div className="mt-4 border p-4 rounded-lg bg-gray-100">
                    <div className="grid grid-cols-2 gap-4">

                      {/* Type of Court Dropdown */}
                      <div>
                        <label className="block text-sm font-medium">Type of Court</label>
                        <select
                          className="w-full p-2 border rounded"
                          value={formData.type_of_court || ""}
                          onChange={(e) => setFormData({ ...formData, type_of_court: e.target.value })}
                        >
                          <option value="">Select</option>
                          <option value="Session">Session</option>
                          <option value="JMFC">JMFC</option>
                        </select>
                      </div>

                      {/* BNS Sections Dropdown */}
                      {/* <div>
                        <label className="block text-sm font-medium">BNS Sections</label>
                        <select
                          className="w-full p-2 border rounded"
                          value={formData.bns_sections}
                          onChange={handleBnsSectionChange}
                        >
                          <option value="">Select</option>
                          {convictionData.map((item) => (
                            <option key={item.bns_section} value={item.bns_section}>
                              {item.bns_section}
                            </option>
                          ))}
                          <option value="Other">Other BNS Sections</option>
                        </select>
                      </div> */}

                      <div>
                        <label className="block text-sm font-medium">BNS Sections</label>
                        <select
                          className="w-full p-2 border rounded"
                          value={formData.bns_sections || ""}
                          onChange={(e) => handleBnsSectionChange(e)}
                        >
                          <option value="">Select</option>
                          <option value="285">285</option>
                          <option value="281">281</option>
                          <option value="287">287</option>
                          <option value="303(2)">303(2)</option>
                          <option value="125">125</option>
                          <option value="305">305</option>
                          <option value="223">223</option>
                          <option value="293">293</option>
                          <option value="289">289</option>
                          <option value="Other">Other BNS Sections</option>
                        </select>
                      </div>


                      {/* Other BNS Section (Only show if 'Other' is selected) */}
                      {formData.bns_sections === "Other" && (
                        <div>
                          <label className="block text-sm font-medium">Other BNS Section</label>
                          <input
                            type="text"
                            className="w-full p-2 border rounded"
                            value={formData.other_bns_section || ""}
                            onChange={(e) => setFormData({ ...formData, other_bns_section: e.target.value })}
                          />
                        </div>
                      )}

                      {/* Cases Decided */}
                      <div>
                        <label className="block text-sm font-medium">Cases Decided</label>
                        <input
                          type="number"
                          className="w-full p-2 border rounded"
                          value={formData.cases_decided || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, cases_decided: e.target.value })
                          }
                        />
                      </div>

                      {/* Convicted Cases */}
                      <div>
                        <label className="block text-sm font-medium">Convicted Cases</label>
                        <input
                          type="number"
                          className="w-full p-2 border rounded"
                          value={formData.convicted_cases || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, convicted_cases: e.target.value })
                          }
                        />
                        {parseInt(formData.convicted_cases) > parseInt(formData.cases_decided) && (
                          <p className="text-red-500 text-sm mt-1">Convicted Cases cannot exceed Cases Decided.</p>
                        )}
                      </div>

                      {/* Conviction Rate (Auto-calculated) */}
                      <div>
                        <label className="block text-sm font-medium">Conviction Rate %</label>
                        <input
                          type="number"
                          className="w-full p-2 border rounded"
                          value={formData.conviction_rate = ((Number(formData.convicted_cases) / Number(formData.cases_decided)) * 100).toFixed(2)}
                          onChange={(e) =>
                            setFormData({ ...formData, conviction_rate: e.target.value })
                          }
                        />
                      </div>

                      {/* <div>
                        <label className="block text-sm font-medium">Total Cases Convicted</label>
                        <input
                          type="number"
                          className="w-full p-2 border rounded"
                          value={formData.total_cases_convicted
                            ? Number(formData.total_cases_convicted) + Number(formData.convicted_cases || 0)
                            : "waiting for backend value"}
                          onChange={(e) =>
                            setFormData({ ...formData, total_cases_convicted: e.target.value })
                          }
                          readOnly
                        />
                      </div> */}
                      <div>
                        <label className="block text-sm font-medium">Total Cases Convicted</label>
                        <input
                          type="number"
                          className="w-full p-2 border rounded"
                          value={
                            formData.total_cases_convicted !== undefined && formData.total_cases_convicted !== null
                              ? Number(formData.total_cases_convicted) + Number(formData.convicted_cases || 0)
                              : 0
                          }
                          onChange={(e) =>
                            setFormData({ ...formData, total_cases_convicted: e.target.value })
                          }
                          readOnly
                        />
                      </div>


                      <div>
                        <label className="block text-sm font-medium">Total Cases Decided</label>
                        <input
                          type="number"
                          className="w-full p-2 border rounded"
                          value={formData.total_cases_decided !== undefined && formData.total_cases_decided !== null
                            ? Number(formData.total_cases_decided) + Number(formData.cases_decided || 0)
                            : 0}
                          onChange={(e) =>
                            setFormData({ ...formData, total_cases_decided: e.target.value })
                          }
                          readOnly
                        />
                      </div>

                      <div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium">Previous Cases Convicted</label>
                        <input
                          type="number"
                          className="w-full p-2 border rounded"
                          value={formData.total_cases_convicted !== undefined && formData.total_cases_convicted !== null
                            ? formData.total_cases_convicted
                            : 0}
                          onChange={(e) =>
                            setFormData({ ...formData, total_cases_convicted: e.target.value })
                          }
                          readOnly
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium">Previous Cases Decided</label>
                        <input
                          type="number"
                          className="w-full p-2 border rounded"
                          value={formData.total_cases_decided !== undefined && formData.total_cases_decided !== null
                            ? formData.total_cases_decided
                            : 0}
                          onChange={(e) =>
                            setFormData({ ...formData, total_cases_decided: e.target.value })
                          }
                          readOnly
                        />
                      </div>



                      {/* <div>
                        <label className="block text-sm font-medium"></label>
                        <input
                          type="number"
                          className="w-full p-2 border rounded"
                          value={conviction_rate =
                            formData.cases_decided > 0
                              ? ((Number(formData.convicted_cases) / Number(formData.cases_decided)) * 100).toFixed(2)
                              : 0
                          }
                          onChange={(e) =>
                            setFormData({ ...formData, conviction_rate: e.target.value })
                          }
                          readOnly // Prevent manual editing
                        />
                      </div> */}


                    </div>
                  </div>
                )}


              </Box>
            )}
            {selectedTab === "upload" && (
              <Box display="flex" flexDirection="column" gap={2} minHeight="60vh">

                {/* <Box display="flex" gap={2} width="100%">
                  <FormControl fullWidth>
                    <label className="block text-sm font-medium">From Date</label>
                    <input
                      type="date"
                      className="w-full p-2 border rounded"
                      value={formData.fromDate || dateRange.fromDate} // Set default from date
                      onChange={(e) => setFormData({ ...formData, fromDate: e.target.value })}
                      readOnly
                    />
                  </FormControl>

                  <FormControl fullWidth>
                    <label className="block text-sm font-medium">As on Date</label>
                    <input
                      type="date"
                      className="w-full p-2 border rounded"
                      value={formData.toDate || dateRange.toDate} // Set default to date
                      onChange={(e) => setFormData({ ...formData, toDate: e.target.value })}
                      readOnly
                    />
                  </FormControl>
                </Box> */}

                {/* Form Type Selection Dropdown */}
                <FormControl fullWidth>
                  <InputLabel id="form-type-label" shrink>Form Type</InputLabel>
                  <Select
                    labelId="form-type-label"
                    id="form-type"
                    label="form-type"
                    value={selectedForm}
                    onChange={handleFormChange}
                    displayEmpty
                  >
                    {(() => {
                      let formOptions = [];

                      if (training_active?.section === "training") {
                        formOptions = ["Training Data"];
                      } else if (training_active?.section === "forensic/visits") {
                        formOptions = [

                          "Visit of Forensic Teams",
                        ];
                      } else if (training_active?.section === "FIR") {
                        formOptions = [
                          "Pendency of cases under BNS",
                          "Offences against body under BNS",
                          "Untraced Missing",
                          "Important sections introduced in BNS",
                          "Property offences under BNS",
                          "eSakshya Details",
                          "Use of eSakshya App in cases with punishment of 7 yrs. or more",
                          "Zero FIR's",
                          "eFIR",
                          "ITSSO Compliance Form",
                          "Stolen & Recovered Property",
                          "Conviction under BNS",
                        ];
                      }

                      return formOptions.map((form) => (
                        <MenuItem key={form} value={form}>
                          {form}
                        </MenuItem>
                      ));
                    })()}
                    {/* {[
                      "Pendency of cases under BNS", "Offences against body under BNS", "Untraced Missing", "Important sections introduced in BNS", "Property offences under BNS", "eSakshya Details",
                      "Use of eSakshya App in cases with punishment of 7 yrs. or more", "Zero FIR's", "eFIR", "ITSSO Compliance Form", "Stolen & Recovered Property", "Visit of Forensic Teams", "Training Data"
                    ].map((form) => (
                      <MenuItem key={form} value={form}>
                        {form}
                      </MenuItem>
                    ))} */}
                  </Select>
                </FormControl>
                <Box>

                  <Button variant="contained" component="label" startIcon={<CloudUploadIcon />} sx={{ backgroundColor: "#4a5568", "&:hover": { backgroundColor: "#5a667a" } }}  >
                    Upload File
                    <input type="file" hidden accept=".csv,.xls,.xlsx" onChange={handleFileUpload} />
                  </Button>

                  <Button variant="contained" startIcon={<Download />} onClick={generateCSV} sx={{ ml: 2, backgroundColor: "#4a5568", "&:hover": { backgroundColor: "#5a667a" } }}>
                    Download Sample
                  </Button>

                  {/* <h2 class="text-red-600 text-center font-bold text-2xl mt-5">
                      NOT AVAILABLE RIGHT NOW THESE FEATURE...!!!
                  </h2> */}



                  {/* {checkingCsv && <Typography>Checking CSV...</Typography>}
                  {csvValidationMessage && (
                    <Typography style={{ color: csvValidationMessage.color }}>{csvValidationMessage.text}</Typography>
                  )} */}
                  {checkingCsv && <Typography>Checking CSV...</Typography>}
                  {csvValidationMessage && (
                    <Typography style={{ color: csvValidationMessage.color, whiteSpace: "pre-line" }}>
                      {csvValidationMessage.text}
                    </Typography>
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


            <Box sx={{ padding: 2, borderTop: "1px solid #ddd", backgroundColor: "#f9f9f9", display: 'flex', justifyContent: "center" }}>
              <Button fullWidth variant="contained" sx={{ backgroundColor: "#2d3748", color: "white", width: "30%" }} onClick={handleSubmit}>
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

