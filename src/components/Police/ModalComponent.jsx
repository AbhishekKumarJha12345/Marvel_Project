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


const ModalComponent = ({ open, type, onClose }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedForm, setSelectedForm] = useState("FIR");

  const handleFormChange = (event) => {
    setSelectedForm(event.target.value);
  };


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
    unit: localStorage.getItem("zone") || "",
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

    // Esakshya Wrt Unit
    totalIOsNagapur: "",
    totalIOsEsakshya: "",
    esakshyaWage: "",

    // form-h
    totalCases: "",
    totalOffencesUsed: "",
    totalOffencesNotUsed: "",
    offencesUsedChargeCheet: "",
    offencesNotUsedUnderInvestigation: "",
    percentageOfUsingEsakshya: "",
    // form-i

    totalZeroFIRsReceived: "",
    totalFIRsRegistered: "",
    pendingFIRs: "",
    totalTransferredZeroFIRs: "",
    formIMonthYear: "",

    // eFIR specific fields
    totalEComplaintsReceived: "",
    totalComplaintsConverted: "",
    disposedEComplaints: "",
    formJMonthYear: "",

    // Stolen & Recovered Property Form specific fields
    total_cases: "",
    value_stolen_property: "",
    value_recovered_property: "",
    recovery_percentage: "",
    month_year: "",

    // Forensic Team Deployment Form specific fields
    total_cases_gt_7_years: "",
    forensic_team_deployment_percentage: "",
    cases_forensic_team_visited: "",
    month_year: "",

    // ITSSO Compliance Form specific fields
    total_pocso: "",
    bns_cases: "",
    charge_sheeted_within_60_days: "",
    pending_cases: "",
    reasons_for_pending: "",
    percentage: "",
    month_year: "",

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



  // if (!formData.date || !formData.zone || !formData.district || !formData.totalCases) {
        //     alert("Please fill in all required fields.");
        //     return;
        // }


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
      "total_cases_registered",
      "cases_disposed",
      "cases_pending_investigation",
      "percent_pendency",
      "cases_punishment_less_than_7_years",
      "cases_punishment_7_years_or_more",
      "month_year"
    ],
    "Offences against body under BNS": [
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
      "unit",
      "police_station",
      "act_and_section",
      "registered_cases",
      "detected_cases",
      "percent_detection",
      "month_year"
    ],
    "Esakshya Wrt Unit": [
      "unit",
      "total_ios_nagpur_rural",
      "registered_ios_on_esakshya",
      "esakshya_usage_percentage",
      "month_year"
    ],

    "Esakshya wrt 7yrs or more": [
      "unit",
      "total_cases",
      "total_offences_with_esakshya",
      "total_offences_without_esakshya",
      "total_charge_sheeted_with_esakshya",
      "total_under_investigation_without_esakshya",
      "percentage_usage"
    ],

    "FIR's and Zero FIR's": [
      "unit",
      "section",
      "total_zero_firs_received",
      "total_firs_registered",
      "pending",
      "total_transferred_zero_firs",
      "month_year"
    ],

    "eFIR": [
      "unit",
      "police_station",
      "total_ecomplaints_received",
      "total_ecomplaints_converted_to_firs",
      "disposed_of_ecomplaints",
      "month_year"
    ],
    "Special Cases & High-Profile Investigations Form": [
      "unit",
      "police_station",
      "act_and_section",
      "registered_cases",
      "detected_cases",
      "percent_detection",
      "month_year"
    ],
    "ITSSO Compliance Form": [
      "total_pocso",
      "bns_cases",
      "charge_sheeted_within_60_days",
      "pending_cases",
      "reasons_for_pending",
      "percentage",
      "month_year"
    ],
    "Stolen & Recovered Property Form": [
      "total_cases",
      "value_stolen_property",
      "value_recovered_property",
      "recovery_percentage",
      "month_year"
    ],
    "Forensic Team Deployment Form": [
      "total_cases_gt_7_years",
      "forensic_team_deployment_percentage",
      "cases_forensic_team_visited",
      "month_year"
    ]

  };



  const generateCSV = () => {
    const sampleFiles = {
      "FIR": [
        "month_year,zone,district,sections,total_cases_registered,detected_cases,overall_percent",
        "Jan-24,Amravati,Akola,Murder (BNS Sec. 103(1)),10,8,80",
      ],
      "Pendency of cases under BNS": [
        "unit,total_cases_registered,cases_disposed,cases_pending_investigation,percent_pendency,cases_punishment_less_than_7_years,cases_punishment_7_years_or_more,month_year",
        "Unit-1,100,60,40,40,15,25,05-2024",
      ],
      "Offences against body under BNS": [
        "unit,police_station,act_and_section,registered_cases,detected_cases,percent_detection,month_year",
        "Unit-2,Station-5,IPC 302,50,30,60,Mar-24",
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
        "unit,police_station,act_and_section,registered_cases,detected_cases,percent_detection,month_year",
        "Unit-5,Station-15,IPC 376,40,35,87.5,Apr-24",
      ],
      "Esakshya Wrt Unit": [
        "unit,total_ios_nagpur_rural,registered_ios_on_esakshya,esakshya_usage_percentage,month_year",
        "Unit-G1,15,10,5000,Mar-24"
      ],

      "Esakshya wrt 7yrs or more": [
        "unit,total_cases,total_offences_with_esakshya,total_offences_without_esakshya,total_charge_sheeted_with_esakshya,total_under_investigation_without_esakshya,percentage_usage",
        "Unit-H1,100,60,40,55,35,75.5"
      ],

      "FIR's and Zero FIR's": [
        "unit,section,total_zero_firs_received,total_firs_registered,pending,total_transferred_zero_firs,month_year",
        "Unit-I1,Below 18,0,5,Mar-24"
      ],
      "eFIR": [
        "unit,police_station,total_ecomplaints_received,total_ecomplaints_converted_to_firs,disposed_of_ecomplaints,month_year",
        "Unit-J1,Station-J1,10,8,Mar-24"
      ],
      "Special Cases & High-Profile Investigations Form": [
        "unit,police_station,act_and_section,registered_cases,detected_cases,percent_detection,month_year",
        "Unit-2,Station-5,IPC 302,50,30,60,Mar-24",
      ],
      "ITSSO Compliance Form": [
        "total_pocso,bns_cases,charge_sheeted_within_60_days,pending_cases,reasons_for_pending,percentage,month_year",
        "20,15,10,5,Investigation Delay,80,Mar-24"
      ],
      "Stolen & Recovered Property Form": [
        "total_cases,value_stolen_property,value_recovered_property,recovery_percentage,month_year",
        "100,500000,300000,60,Mar-24"
      ],
      "Forensic Team Deployment Form": [
        "total_cases_gt_7_years,forensic_team_deployment_percentage,cases_forensic_team_visited,month_year",
        "50,70,35,Mar-24"
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
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
  
    if (!file) return;
  
    const fileType = file.name.split(".").pop().toLowerCase();
  
    if (["csv", "xls", "xlsx"].includes(fileType)) {
      setFileInfo({ name: file.name, size: (file.size / 1024).toFixed(2) + " KB" });
      setCheckingCsv(true);
      setUploadedFile(file); // Store the file in state
  
      if (fileType === "csv") {
        Papa.parse(file, {
          complete: (result) => {
            processFileData(result.data);
          },
        });
      } else {
        const reader = new FileReader();
        reader.onload = (event) => {
          const data = new Uint8Array(event.target.result);
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          processFileData(excelData);
        };
        reader.readAsArrayBuffer(file);
      }
    } else {
      alert("Only CSV, XLS, or XLSX files are allowed");
    }
  };

  const processFileData = (data) => {
    const headers = data[0]; // Extract headers from the uploaded file
    const selectedHeaders = expectedHeaders[selectedForm]; // Expected headers for selected form

    if (!selectedHeaders) {
      setCsvValidationMessage({ text: "Invalid form type selected", color: "red" });
      setCheckingCsv(false);
      return;
    }

    if (JSON.stringify(headers) === JSON.stringify(selectedHeaders)) {
      setCsvValidationMessage({ text: "Headers Matched", color: "green" });
    } else {
      setCsvValidationMessage({ text: "Headers Not Matching", color: "red" });
    }

    setCsvData(data);
    setCheckingCsv(false);
  };


  // =====================================================handlesubmit============================================
    // ------mapping -- for upload file ----------------
    const formTypeMapping = {
      "FIR": "fir",
      "Pendency of cases under BNS": "pendency_in_bns",
      "Offences against body under BNS": "offences_against_body",
      "Untraced Missing": "untraced_missing",
      "Important sections introduced in BNS": "sections_in_bns",
      "Property offences under BNS": "property_offenses",
      "Esakshya Wrt Unit": "esakshya_units",
      "Esakshya wrt 7yrs or more": "esakshya_7_more",
      "FIR's and Zero FIR's": "fir_and_zero_firs",
      "eFIR": "e_fir"
  };
  const selectedType = formTypeMapping[selectedForm] || "fir";

  const handleSubmit = async () => {
    try {
      const formDataToSend = new FormData();
      const token = localStorage.getItem("token"); // Get token from localStorage

      console.log("Selected Form Before Sending:", selectedForm); // Debugging
      console.log("Selected Form Before Sending:", uploadedFile); // Debugging

      if (selectedForm) {
        console.log("Inside this upload file");
        formDataToSend.append("type", selectedType);
        formDataToSend.append("file", uploadedFile);
      } 
      else {
        
        if (formData.formType === "FIR") {   // Tested
          formDataToSend.append("type", "fir");
          formDataToSend.append("district", localStorage.getItem("district") || "");
          formDataToSend.append("police_station", localStorage.getItem("police_station") || "NAGPUR");
          formDataToSend.append("month_year", formData.month_year);
          formDataToSend.append("zone", formData.zone);
          formDataToSend.append("district", formData.district);
          formDataToSend.append("sections", formData.sections);
          formDataToSend.append("total_cases_registered", formData.totalCases);
          formDataToSend.append("detected_cases", formData.detectedCases);
          formDataToSend.append("overall_percent", formData.overallPercentage);
        }
        if (formData.formType === "Pendency of cases under BNS") {   // Tested
          formDataToSend.append("type", "pendency_in_bns");
          formDataToSend.append("district", localStorage.getItem("district") || "");
          formDataToSend.append("police_station", localStorage.getItem("police_station") || "NAGPUR");
          formDataToSend.append("unit", formData.unit);
          formDataToSend.append("total_cases_registered", formData.totalCases);
          formDataToSend.append("cases_disposed", formData.disposedCases);
          formDataToSend.append("cases_pending_investigation", formData.pendingCases);
          formDataToSend.append("percent_pendency", formData.pendingPercentage);
          formDataToSend.append("cases_punishment_less_than_7_years", formData.punishmentLessThan7);
          formDataToSend.append("cases_punishment_7_years_or_more", formData.punishmentMoreThan7);
          formDataToSend.append("month_year", formData.month_year);
        }
        if (formData.formType === "Offences against body under BNS") {  //Tested
          formDataToSend.append("type", "offences_against_body");
          formDataToSend.append("district", localStorage.getItem("district") || "");
          formDataToSend.append("police_station", localStorage.getItem("police_station") || "NAGPUR");
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
          formDataToSend.append("police_station", localStorage.getItem("police_station") || "NAGPUR");
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
          formDataToSend.append("police_station", localStorage.getItem("police_station") || "NAGPUR");
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
          formDataToSend.append("police_station", localStorage.getItem("police_station") || "NAGPUR");
          formDataToSend.append("unit", formData.unit);
          formDataToSend.append("police_station", formData.policeStation);
          formDataToSend.append("act_and_section", formData.actAndSection);
          formDataToSend.append("registered_cases", formData.registeredCases);
          formDataToSend.append("detected_cases", formData.detectedCases);
          formDataToSend.append("percent_detection", formData.detectedCasesPercentage);
          formDataToSend.append("month_year", formData.month_year);
        }
        if (formData.formType === "Esakshya Wrt Unit") {   //Tested
          formDataToSend.append("type", "esakshya_units");
          formDataToSend.append("district", localStorage.getItem("district") || "");
          formDataToSend.append("police_station", localStorage.getItem("police_station") || "NAGPUR");
          formDataToSend.append("unit", formData.unit);
          formDataToSend.append("total_ios_nagpur_rural", formData.totalIOsNagapur);
          formDataToSend.append("registered_ios_on_esakshya", formData.totalIOsEsakshya);
          formDataToSend.append("esakshya_usage_percentage", formData.esakshyaWage);
          formDataToSend.append("month_year", formData.month_year);
        }
        if (formData.formType === "Esakshya wrt 7yrs or more") {   //Tested
          formDataToSend.append("type", "esakshya_7_more");
          formDataToSend.append("district", localStorage.getItem("district") || "");
          formDataToSend.append("police_station", localStorage.getItem("police_station") || "NAGPUR");
          formDataToSend.append("unit", formData.unit);
          formDataToSend.append("total_cases", formData.totalCases);
          formDataToSend.append("total_offences_with_esakshya", formData.totalOffencesUsed);
          formDataToSend.append("total_offences_without_esakshya", formData.totalOffencesNotUsed);
          formDataToSend.append("total_charge_sheeted_with_esakshya", formData.offencesUsedChargeCheet);
          formDataToSend.append("total_under_investigation_without_esakshya", formData.offencesNotUsedUnderInvestigation);
          formDataToSend.append("percentage_usage", formData.percentageOfUsingEsakshya);
        }
        if (formData.formType === "FIR's and Zero FIR's") {  //Tested
          formDataToSend.append("type", "fir_and_zero_firs");
          formDataToSend.append("district", localStorage.getItem("district") || "");
          formDataToSend.append("police_station", localStorage.getItem("police_station") || "NAGPUR");
          formDataToSend.append("unit", formData.unit);
          formDataToSend.append("section", formData.sections);
          formDataToSend.append("total_zero_firs_received", formData.totalZeroFIRsReceived);
          formDataToSend.append("total_firs_registered", formData.totalFIRsRegistered);
          formDataToSend.append("pending", formData.pending);
          formDataToSend.append("total_transferred_zero_firs", formData.totalTransferredZeroFIRs);
          formDataToSend.append("month_year", formData.month_year);
        }
        if (formData.formType === "eFIR") {   //Tested
          formDataToSend.append("type", "e_fir");
          formDataToSend.append("district", localStorage.getItem("district") || "");
          formDataToSend.append("police_station", localStorage.getItem("police_station") || "NAGPUR");
          formDataToSend.append("unit", formData.unit);
          formDataToSend.append("police_station", formData.policeStation);
          formDataToSend.append("total_ecomplaints_received", formData.totalEComplaintsReceived);
          formDataToSend.append("total_ecomplaints_converted_to_firs", formData.totalComplaintsConverted);
          formDataToSend.append("disposed_of_ecomplaints", formData.disposedEComplaints);
          formDataToSend.append("month_year", formData.month_year);
        }

        if (formData.formType === "Special Cases & High-Profile Investigations Form") {  //Tested
          formDataToSend.append("type", "special_cases_high_profile_investigations");
          formDataToSend.append("district", localStorage.getItem("district") || "");
          formDataToSend.append("police_station", localStorage.getItem("police_station") || "NAGPUR");
          formDataToSend.append("unit", formData.unit);
          formDataToSend.append("police_station", formData.policeStation);
          formDataToSend.append("act_and_section", formData.actAndSection);
          formDataToSend.append("registered_cases", formData.registeredCases);
          formDataToSend.append("detected_cases", formData.detectedCases);
          formDataToSend.append("percent_detection", formData.detectedCasesPercentage);
          formDataToSend.append("month_year", formData.month_year);
        }
        if (formData.formType === "ITSSO Compliance Form") {   //Tested
          formDataToSend.append("type", "itsso_compliance");
          formDataToSend.append("district", localStorage.getItem("district") || "");
          formDataToSend.append("police_station", localStorage.getItem("police_station") || "NAGPUR");
          formDataToSend.append("total_pocso", formData.total_pocso || "");
          formDataToSend.append("bns_cases", formData.bns_cases || "");
          formDataToSend.append("charge_sheeted_within_60_days", formData.charge_sheeted_within_60_days || "");
          formDataToSend.append("pending_cases", formData.pending_cases || "");
          formDataToSend.append("reasons_for_pending", formData.reasons_for_pending || "");
          formDataToSend.append("percentage", formData.percentage || "");
          formDataToSend.append("month_year", formData.month_year || "");
        }
        if (formData.formType === "Stolen & Recovered Property Form") {   //Tested
          formDataToSend.append("type", "stolen_recovered_property");
          formDataToSend.append("district", localStorage.getItem("district") || "");
          formDataToSend.append("police_station", localStorage.getItem("police_station") || "NAGPUR");
          formDataToSend.append("total_cases", formData.total_cases || "");
          formDataToSend.append("value_stolen_property", formData.value_stolen_property || "");
          formDataToSend.append("value_recovered_property", formData.value_recovered_property || "");
          formDataToSend.append("recovery_percentage", formData.recovery_percentage || "");
          formDataToSend.append("month_year", formData.month_year || "");
        }
        if (formData.formType === "Forensic Team Deployment Form") {  //Tested
          formDataToSend.append("type", "forensic_team_deployment");
          formDataToSend.append("district", localStorage.getItem("district") || "");
          formDataToSend.append("police_station", localStorage.getItem("police_station") || "NAGPUR");
          formDataToSend.append("total_cases_gt_7_years", formData.total_cases_gt_7_years || "");
          formDataToSend.append("forensic_team_deployment_percentage", formData.forensic_team_deployment_percentage || "");
          formDataToSend.append("cases_forensic_team_visited", formData.cases_forensic_team_visited || "");
          formDataToSend.append("month_year", formData.month_year || "");
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
        setFormData({ type: "fir", formType: "Form-A", date: "", zone: "", district: "", sections: "", totalCases: "", detectedCases: "", overallPercentage: "", uploadedFile: null, });
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
                      "FIR", "Pendency of cases under BNS", "Offences against body under BNS", "Untraced Missing", "Important sections introduced in BNS", "Property offences under BNS", "Esakshya Wrt Unit",
                      "Esakshya wrt 7yrs or more", "FIR's and Zero FIR's", "eFIR", "Special Cases & High-Profile Investigations Form", "ITSSO Compliance Form", "Stolen & Recovered Property Form", "Forensic Team Deployment Form"
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
                        <label className="block text-sm font-medium mb-3">Month-Year</label>
                        <input
                          type="month"
                          className="w-full p-2 border rounded"
                          value={formData.month_year || ""}
                          onChange={(e) => setFormData({ ...formData, month_year: e.target.value })}
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
                        <input type="text" className="w-full p-2 border rounded" value={formData.unit || ""} onChange={(e) => setFormData({ ...formData, unit: e.target.value })} readOnly />
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
                          readOnly
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

                {(formData.formType === "Offences against body under BNS" || formData.formType === "Important sections introduced in BNS" || formData.formType === "Property offences under BNS" || formData.formType === "Special Cases & High-Profile Investigations Form") && (
                  <div className="mt-4 border p-4 rounded-lg bg-gray-100 h-[450px] overflow-y-auto">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium">Unit</label>
                        <input type="text" className="w-full p-2 border rounded" value={formData.unit || ""} onChange={(e) => setFormData({ ...formData, unit: e.target.value })} readOnly />
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

                {formData.formType === "Esakshya Wrt Unit" && (
                  <div className="mt-4 border p-4 rounded-lg bg-gray-100 h-[450px] overflow-y-auto">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium">Unit</label>
                        <input
                          type="text"
                          className="w-full p-2 border rounded"
                          value={formData.unit}
                          onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                          readOnly
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium">Total No of IO's Registered in Nagapur</label>
                        <input
                          type="number"
                          className="w-full p-2 border rounded"
                          value={formData.totalIOsNagapur}
                          onChange={(e) => setFormData({ ...formData, totalIOsNagapur: e.target.value })}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium">No of IO's Registered in Esakshya</label>
                        <input
                          type="number"
                          className="w-full p-2 border rounded"
                          value={formData.totalIOsEsakshya}
                          onChange={(e) => setFormData({ ...formData, totalIOsEsakshya: e.target.value })}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium">Esakshya Wage</label>
                        <input
                          type="number"
                          step="0.01"
                          className="w-full p-2 border rounded"
                          value={formData.esakshyaWage}
                          onChange={(e) => setFormData({ ...formData, esakshyaWage: e.target.value })}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium">Month-Year</label>
                        <input
                          type="month"
                          className="w-full p-2 border rounded"
                          value={formData.month_year}
                          onChange={(e) => setFormData({ ...formData, month_year: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {formData.formType === "Esakshya wrt 7yrs or more" && (
                  <div className="mt-4 border p-4 rounded-lg bg-gray-100 h-[450px] overflow-y-auto">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium">Unit</label>
                        <input
                          type="text"
                          className="w-full p-2 border rounded"
                          value={formData.unit}
                          onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Total No of Cases</label>
                        <input
                          type="number"
                          className="w-full p-2 border rounded"
                          value={formData.totalCases}
                          onChange={(e) => setFormData({ ...formData, totalCases: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Total Offences Used</label>
                        <input
                          type="number"
                          className="w-full p-2 border rounded"
                          value={formData.totalOffencesUsed}
                          onChange={(e) => setFormData({ ...formData, totalOffencesUsed: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Total Offences Not Used</label>
                        <input
                          type="number"
                          className="w-full p-2 border rounded"
                          value={formData.totalOffencesNotUsed}
                          onChange={(e) => setFormData({ ...formData, totalOffencesNotUsed: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Offences Used Charge Cheet</label>
                        <input
                          type="number"
                          className="w-full p-2 border rounded"
                          value={formData.offencesUsedChargeCheet}
                          onChange={(e) => setFormData({ ...formData, offencesUsedChargeCheet: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Offences Not Used Under Investigation</label>
                        <input
                          type="number"
                          className="w-full p-2 border rounded"
                          value={formData.offencesNotUsedUnderInvestigation}
                          onChange={(e) => setFormData({ ...formData, offencesNotUsedUnderInvestigation: e.target.value })}
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-sm font-medium">Percentage of Using Esakshya</label>
                        <input
                          type="number"
                          step="0.01"
                          className="w-full p-2 border rounded"
                          value={formData.percentageOfUsingEsakshya}
                          onChange={(e) => setFormData({ ...formData, percentageOfUsingEsakshya: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {formData.formType === "FIR's and Zero FIR's" && (
                  <div className="mt-4 border p-4 rounded-lg bg-gray-100 h-[450px] overflow-y-auto">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium">Unit</label>
                        <input
                          type="text"
                          className="w-full p-2 border rounded"
                          value={formData.unit || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, unit: e.target.value })
                          }
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Section</label>
                        <select
                          className="w-full p-2 border rounded bg-white"
                          value={formData.sections || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, sections: e.target.value })
                          }
                          name="formISection"
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
                        <label className="block text-sm font-medium">
                          Total Zero FIRs Received
                        </label>
                        <input
                          type="number"
                          className="w-full p-2 border rounded"
                          value={formData.totalZeroFIRsReceived || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, totalZeroFIRsReceived: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">
                          Total FIRs Registered
                        </label>
                        <input
                          type="number"
                          className="w-full p-2 border rounded"
                          value={formData.totalFIRsRegistered || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, totalFIRsRegistered: e.target.value })
                          }
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium">
                          Pending
                        </label>
                        <input
                          type="number"
                          className="w-full p-2 border rounded"
                          value={formData.pending || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, pending: e.target.value })
                          }
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium">
                          Total Transfered Zero FIR's
                        </label>
                        <input
                          type="number"
                          className="w-full p-2 border rounded"
                          value={formData.totalTransferredZeroFIRs || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, totalTransferredZeroFIRs: e.target.value })
                          }
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium">Month and Year</label>
                        <input
                          type="month"
                          className="w-full p-2 border rounded"
                          value={formData.month_year || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, month_year: e.target.value })
                          }
                          name="month_year"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {formData.formType === "eFIR" && (
                  <div className="mt-4 border p-4 rounded-lg bg-gray-100 h-[450px] overflow-y-auto">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium">Unit</label>
                        <input
                          type="text"
                          className="w-full p-2 border rounded"
                          value={formData.unit || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, unit: e.target.value })
                          }
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Police Station</label>
                        <input
                          type="text"
                          className="w-full p-2 border rounded"
                          value={formData.policeStation || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, policeStation: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">
                          Total EComplaints Received
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
                          Total Complaints Converted
                        </label>
                        <input
                          type="number"
                          className="w-full p-2 border rounded"
                          value={formData.totalComplaintsConverted || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, totalComplaintsConverted: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">
                          Disposed of EComplaints
                        </label>
                        <input
                          type="number"
                          className="w-full p-2 border rounded"
                          value={formData.disposedEComplaints || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, disposedEComplaints: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Month and Year</label>
                        <input
                          type="month"
                          className="w-full p-2 border rounded"
                          value={formData.month_year || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, month_year: e.target.value })
                          }
                          name="month_year"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {formData.formType === "ITSSO Compliance Form" && (
                  <div className="mt-4 border p-4 rounded-lg bg-gray-100 h-[450px] overflow-y-auto">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium">Total POCSO Cases</label>
                        <input
                          type="number"
                          className="w-full p-2 border rounded"
                          value={formData.total_pocso || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, total_pocso: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">BNS Cases</label>
                        <input
                          type="number"
                          className="w-full p-2 border rounded"
                          value={formData.bns_cases || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, bns_cases: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">
                          Charge Sheeted Within 60 Days
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
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Pending Cases</label>
                        <input
                          type="number"
                          className="w-full p-2 border rounded"
                          value={formData.pending_cases || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, pending_cases: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Reasons for Pending</label>
                        <input
                          type="number"
                          className="w-full p-2 border rounded"
                          value={formData.reasons_for_pending || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, reasons_for_pending: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Percentage</label>
                        <input
                          type="number"
                          className="w-full p-2 border rounded"
                          value={formData.percentage || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, percentage: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Month and Year</label>
                        <input
                          type="month"
                          className="w-full p-2 border rounded"
                          value={formData.month_year || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, month_year: e.target.value })
                          }
                          name="month_year"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {formData.formType === "Stolen & Recovered Property Form" && (
                  <div className="mt-4 border p-4 rounded-lg bg-gray-100 h-[450px] overflow-y-auto">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium">Total Cases</label>
                        <input
                          type="number"
                          className="w-full p-2 border rounded"
                          value={formData.total_cases || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, total_cases: e.target.value })
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
                        <label className="block text-sm font-medium">Value of Recovered Property</label>
                        <input
                          type="number"
                          className="w-full p-2 border rounded"
                          value={formData.value_recovered_property || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, value_recovered_property: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Recovery Percentage</label>
                        <input
                          type="number"
                          className="w-full p-2 border rounded"
                          value={formData.recovery_percentage || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, recovery_percentage: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Month and Year</label>
                        <input
                          type="month"
                          className="w-full p-2 border rounded"
                          value={formData.month_year || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, month_year: e.target.value })
                          }
                          name="month_year"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {formData.formType === "Forensic Team Deployment Form" && (
                  <div className="mt-4 border p-4 rounded-lg bg-gray-100 h-[450px] overflow-y-auto">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium">Total Cases (7 Years)</label>
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
                        <label className="block text-sm font-medium">Forensic Team Deployment Percentage</label>
                        <input
                          type="number"
                          className="w-full p-2 border rounded"
                          value={formData.forensic_team_deployment_percentage || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              forensic_team_deployment_percentage: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Cases Forensic Team Visited</label>
                        <input
                          type="number"
                          className="w-full p-2 border rounded"
                          value={formData.cases_forensic_team_visited || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              cases_forensic_team_visited: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Month and Year</label>
                        <input
                          type="month"
                          className="w-full p-2 border rounded"
                          value={formData.month_year || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, month_year: e.target.value })
                          }
                          name="month_year"
                        />
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
                    label="form-type"
                    value={selectedForm}
                    onChange={handleFormChange}
                    displayEmpty
                  >
                    {[
                      "FIR", "Pendency of cases under BNS", "Offences against body under BNS", "Untraced Missing", "Important sections introduced in BNS", "Property offences under BNS", "Esakshya Wrt Unit",
                      "Esakshya wrt 7yrs or more", "FIR's and Zero FIR's", "eFIR", "Special Cases & High-Profile Investigations Form", "ITSSO Compliance Form", "Stolen & Recovered Property Form", "Forensic Team Deployment Form"
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

                  {/* <h2 class="text-red-600 text-center font-bold text-2xl mt-5">
                      NOT AVAILABLE RIGHT NOW THESE FEATURE...!!!
                  </h2> */}



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

