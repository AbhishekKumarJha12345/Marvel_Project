import React, { useRef, useState, useEffect } from "react";
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

import TrainingDataTable from './DataTable'

import MaharashtraPoliceMap from '../CS/Csstartpage'

import './form.css'




import CloseIcon from "@mui/icons-material/Close";

import jsPDF from "jspdf";
import "jspdf-autotable";

import logo from "../../../dist/assets/logo22-DGid_2oD.png";
import { faL } from "@fortawesome/free-solid-svg-icons";






const ModalComponent = ({ open, type, onClose, training_active, dateRange }) => {
  const [verified, setVerified] = useState(false);
  const [selectedForm, setSelectedForm] = useState("");


  // ------------------for table purpose---------------------------
  const [openSections, setOpenSections] = useState({});
  const [openSection, setOpenSection] = useState(null);



  // const toggleSection = (section) => {
  //   setOpenSections((prev) => ({
  //     ...prev,
  //     [section]: !prev[section],
  //   }));
  // };



  const toggleSection = (sectionKey) => {
    // For single open section behavior (collapses previous)
    setOpenSection(openSection === sectionKey ? null : sectionKey);

    // For individual toggle capability
    setOpenSections((prev) => ({
      ...prev,
      [sectionKey]: !prev[sectionKey],
    }));
  };

  // ----------------------------------------------------------------


  const [openModal, setOpenModal] = useState(false); // State for modal visibility


  const [historyData, setHistoryData] = useState([]); // Store response as an array
  const excludedFields = ["city", "file_path", "district", "id", "unit", "uploaded_by", "police_station"];



  const [monthsInRange, setMonthsInRange] = useState([]);
  const [expandedMonth, setExpandedMonth] = useState(null);
  const [formValues, setFormValues] = useState({});

  const [dialogOpen, setDialogOpen] = useState(false);



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
      pending_to_transfer_outside_mh: "",

      detectedCases_1: "",
      registeredCases_1: "",
      actAndSection_1: "",
      detectedCasesPercentage_1: '',

      detectedCases_2: "",
      registeredCases_2: "",
      actAndSection_2: "",
      detectedCasesPercentage_2: '',

      esakshyaWage_1: "",

      total_persons_trained: "",
      overall_cumulative: "",


    };
  }
  const [convictionData, setConvictionData] = useState([]);
  const [formData, setFormData] = useState(getInitialFormData());
  // const [formData, setFormData] = useState(getInitialFormData(), { toDate: currentDate });


  const [selectedTab, setSelectedTab] = useState("form");
  const [fileInfo, setFileInfo] = useState(null);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    if (open) setSelectedTab("form");
  }, [open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };



  // if (!formData.date || !formData.zone || !formData.district || !formData.totalCases) {
  //     alert("Please fill in all  fields.");
  //     return;
  // }


  // ======================================= UPLOAD_FILE ====================================================

  const [csvData, setCsvData] = useState(null);
  const fileInputRef = useRef(null);

  const [csvValidationMessage, setCsvValidationMessage] = useState(null);
  const [checkingCsv, setCheckingCsv] = useState(false);
  const [previewData, setPreviewData] = useState({});




  // -------------------------Download CSV hitting -----------------------
  const generateCSV = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.get(
        "/download_csv",
        // "/down_forms",
        {
          headers: {
            Authorization: `${token}`, // Include token
          },
          responseType: "blob", // Important for file download
        });

      // Ensure response data is correctly processed as a Blob
      const blob = new Blob([response.data], { type: response.headers['content-type'] });

      // Creating a download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "(FIR/Forensic/Training)_Form.xlsx"); // File name
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error("Error downloading the file:", error);
    }
  };


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


  const subrole = localStorage.getItem("sub_role", null)

  const zoneMapping = {
    Amravati: ["Akola", "Amravati Rural", "Buldana", "Washim", "Yavatmal"],
    'Chhatrapati Sambhajinagar': ["Chhatrapati Sambhajinagar", "Beed", "Hingoli", "Jalna", "Latur", "Nanded", "Osmanabad", "Parbhani"],
    Konkan: ["Mumbai", "Mumbai Suburban", "Palghar", "Raigad", "Ratnagiri", "Sindhudurg", "Thane Rural"],
    Nagpur: ["Bhandara", "Chandrapur", "Gadchiroli", "Gondia", "Nagpur Rural", "Wardha"],
    Nashik: ["Ahmednagar", "Dhule", "Jalgaon", "Nandurbar", "Nashik"],
    Pune: ["Kolhapur", "Pune Rural", "Sangli", "Satara", "Solapur Rural"],
  };


  const downloadPDF = (newData, subrole) => {
    console.log("Generating PDF for subrole:", subrole);
    console.log("newData:", newData);

    const doc = new jsPDF({ orientation: "landscape" });
    let pageHeight = doc.internal.pageSize.height;
    let pageWidth = doc.internal.pageSize.width;
    let y = 15; // Start vertical position
    let pageNumber = 1;

    const { timeStamp, submited_by, email, rang, district, sampleDataIN } = newData;
    const assignedZone = localStorage.getItem("zone");
    const assignedDistrict = localStorage.getItem("district");

    const getFilteredData = () => {
      if (subrole === "CS" || subrole === "ACS" || subrole === "DGP") {
        return sampleDataIN;
      } else if (subrole === "IG/DIG" || subrole === "DIG") {
        return assignedZone ? { [assignedZone]: sampleDataIN[assignedZone] } : {};
      } else if (subrole === "CP" || subrole === "SP") {
        for (const [zone, districts] of Object.entries(zoneMapping)) {
          if (districts.includes(assignedDistrict)) {
            return sampleDataIN[zone] && sampleDataIN[zone][assignedDistrict]
              ? { [zone]: { [assignedDistrict]: sampleDataIN[zone][assignedDistrict] } }
              : {};
          }
        }
        return {};
      }
    };

    const filteredData = getFilteredData();
    console.log("Filtered Data:", filteredData);

    // Function to add footer
    const addFooter = () => {
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(`Email: ${email}`, 14, pageHeight - 10);
      doc.text(`Page ${pageNumber}`, pageWidth - 30, pageHeight - 10);
    };

    // Add Header Logo

    // const logo = "public/images/logo22.png";


    doc.addImage(logo, "PNG", pageWidth / 2 - 15, y, 30, 30);
    y += 40;

    // Title
    doc.setFontSize(22);
    doc.setTextColor(30, 30, 120);
    doc.setFont("helvetica", "bold");
    doc.text("MARVEL DATA REPORT", pageWidth / 2 - 50, y);
    y += 12;

    // Divider Line
    doc.setDrawColor(100, 100, 100);
    doc.line(10, y, pageWidth - 10, y);
    y += 8;

    // Report Metadata
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "bold");
    doc.text(`Submitted On:`, 14, y);
    doc.text(`Submitted by:`, 14, y + 8);
    doc.text(`Email:`, 14, y + 16);
    doc.text(`Rank:`, 14, y + 24);
    doc.text(`Range:`, 14, y + 32);
    doc.text(`District:`, 14, y + 40);

    doc.setFont("helvetica", "normal");
    doc.text(timeStamp, 50, y);
    doc.text(submited_by, 50, y + 8);
    doc.text(email, 50, y + 16);
    doc.text(subrole, 50, y + 24);
    doc.text(rang, 50, y + 32);
    doc.text(district, 50, y + 40);

    y += 50;

    if (Object.keys(filteredData).length === 0) {
      doc.setTextColor(255, 0, 0);
      doc.setFontSize(14);
      doc.text("⚠ No data available for the assigned zone/district.", 14, y);
      addFooter();
      doc.save("user_Report.pdf");
      return;
    }

    // Iterate Over Zones
    Object.entries(filteredData).forEach(([zone, districts]) => {
      doc.setFontSize(14);
      doc.setTextColor(200, 0, 0);
      doc.setFont("helvetica", "bold");
      y += 8;
      doc.setDrawColor(200, 0, 0);
      doc.line(14, y, pageWidth - 14, y);
      y += 6;

      Object.entries(districts).forEach(([district, forms]) => {
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 255);
        doc.setFont("helvetica", "bold");
        y += 5;

        Object.entries(forms).forEach(([formType, records]) => {
          doc.setFontSize(10);
          doc.setTextColor(0, 0, 0);
          doc.setFont("helvetica", "bold");
          doc.text(`${formType}`, 10, y);
          y += 4;

          if (records.length > 0) {
            const tableColumn = Object.keys(records[0]);
            const tableRows = records.map((row) => Object.values(row));

            doc.autoTable({
              startY: y + 2,
              head: [tableColumn],
              body: tableRows,
              theme: "grid",
              margin: { left: 14, right: 14 },
              styles: {
                fontSize: 9,
                cellPadding: 3,
                halign: "center",
                textColor: [50, 50, 50],
              },
              headStyles: {
                fillColor: [41, 128, 185],
                textColor: [255, 255, 255],
                fontSize: 10,
                fontStyle: "bold",
              },
              bodyStyles: {
                fillColor: (rowIndex) => (rowIndex % 2 === 0 ? [245, 245, 245] : [255, 255, 255]),
              },
              alternateRowStyles: {
                fillColor: [235, 235, 235],
              },
              didDrawPage: () => {
                addFooter();
              },
            });

            y = doc.autoTable.previous.finalY + 10;

            if (y > pageHeight - 20) {
              doc.addPage();
              pageNumber++;
              y = 15;
            }
          } else {
            doc.setFont("helvetica", "italic");
            doc.setTextColor(150, 0, 0);
            doc.text("No data available", 30, y);
            y += 5;
          }
        });

        y += 8;
      });

      y += 12;
    });

    addFooter();
    doc.save("Filtered_Report.pdf");
  };


  let requestBody = {}




  const dataKeys = {
    police_training: [
      "total_personnel", "total_officers", "personnel_trained", "officers_trained",
      "percent_personnel_trained", "percent_officers_trained", "total_persons_trained", "overall_cumulative"
    ],
    pendency: [
      "totalCases", "disposedCases", "pendingCases", "pendingPercentage",
      "punishmentLessThan7", "punishmentMoreThan7"
    ],
    offences_against_body: ["actAndSection", "registeredCases", "detectedCases", "detectedCasesPercentage"],
    untraced_missing: ["ageGroup", "untracedPersons", "missingPersons", "totalMissing", "traced", "untraced", "untracedPercentage"],
    sections_in_bns: ["actAndSection_1", "registeredCases_1", "detectedCases_1", "detectedCasesPercentage_1"],
    property_offenses: ["actAndSection_2", "registeredCases_2", "detectedCases_2", "detectedCasesPercentage_2"],
    esakshya_units: ["totalIOsEsakshyaRegistered", "totalIOsEsakshyaDownload", "esakshyaWage_1"],
    esakshya_7_more: [
      "cases_registered", "cases_esakshya_used", "cases_esakshya_not_used",
      "esakshya_usage_percent", "esakshya_used_charge_sheeted", "esakshya_not_used_invest"
    ],
    fir_and_zero_firs: [
      "total_no_zero_fir_transferred_outside_mh", "total_no_zero_fir_transferred_outer_state_to_mh", "total_zero_firs",
      "pending_to_transfer_outside_mh", "total_firs_registered", "re_reg_firs", "total_transferred_zero_firs_in_mh",
      "pending_for_transfer_within_mh", "pending_for_re_registration"
    ],
    e_fir: ["totalEComplaintsReceived", "totalComplaintsConverted", "disposedEComplaints"],
    itsso_compliance: ["total_pocso_bns_cases", "charge_sheeted_within_60_days", "percentage"],
    stolen_recovered_property: [
      "total_cases", "offences_registered", "value_stolen_property",
      "detected_cases", "value_recovered_property", "recovery_percentage"
    ],
    conviction_rate_in_bns: [
      "type_of_court", "bns_sections", "cases_decided", "convicted_cases",
      "conviction_rate", "total_cases_convicted", "total_cases_decided"
    ],
    forensic_visits: ["total_cases_gt_7_years", "cases_forensic_team_visited", "forensic_team_deployment_percentage"]
  };

  const handleSubmit = async () => {
    try {

      const token = localStorage.getItem("token");

      let apiRoute = selectedTab === "upload" ? "/submit_details" : "/fir_form";



      const groupedTrainingData = {};

      Object.keys(formValues).forEach((month) => {
        const monthYear = month.split(" - ")[0];

        if (!groupedTrainingData[monthYear]) {
          groupedTrainingData[monthYear] = [];
        }

        groupedTrainingData[monthYear].push(formValues[month]);
      });


      console.log("groupedTrainingData : ", groupedTrainingData);



      const getValidData = (entry, keys) => keys.some(key => entry[key]);

      const transformedData = Object.fromEntries(
        Object.entries(dataKeys).map(([type, keys]) => [
          type,
          Object.keys(groupedTrainingData).flatMap(month =>
            groupedTrainingData[month]
              .filter(entry => getValidData(entry, keys))
              .map(entry => ({ month_year: month, type, ...Object.fromEntries(keys.map(key => [key, entry[key] || 0])) }))
          )
        ])
      );


      console.log("transformedData : ", transformedData);



      const categories = {
        'Police Training': {
          "Total Constabulary": "total_personnel",
          "Constabulary Trained": "total_officers",
          "% Constabulary Trained": "personnel_trained",
          "Total Officers": "officers_trained",
          "Officers Trained": "percent_personnel_trained",
          "% Officers Trained": "percent_officers_trained",
          "Total Trained": "total_persons_trained",
          "Total Trained %": "overall_cumulative",
        },
        'Pendency of cases under BNS': {
          "Total Cases": "totalCases",
          "Disposed Cases": "disposedCases",
          "Pending Cases": "pendingCases",
          "Pending Percentage": "pendingPercentage",
          "Punishment Less Than 7 yrs.": "punishmentLessThan7",
          "Punishment More Than 7 yrs.": "punishmentMoreThan7",
        },
        'Offences Against Body under BNS': {
          "Act and Section": "actAndSection",
          "Registered Cases": "registeredCases",
          "Detected Cases": "detectedCases",
          "Detected Cases %": "detectedCasesPercentage",
        },
        'Untraced Missing': {
          "Age Group": "ageGroup",
          "Untraced Persons": "untracedPersons",
          "Missing Persons": "missingPersons",
          "Total Missing Persons": "totalMissing",
          "Traced": "traced",
          "Untraced": "untraced",
          "Untraced %": "untracedPercentage",
        },
        'Sections Under BNS': {
          "Act and Section": "actAndSection",
          "Registered Cases": "registeredCases",
          "Detected Cases": "detectedCases",
          "Detected Cases %": "detectedCasesPercentage",
        },
        'Property Offences under BNS': {
          "Act and Section": "actAndSection",
          "Registered Cases": "registeredCases",
          "Detected Cases": "detectedCases",
          "Detected Cases %": "detectedCasesPercentage",
        },
        'eSakshya Details': {
          "Total IOs eSakshya Registered": "totalIOsEsakshyaRegistered",
          "Total IOs eSakshya Downloaded": "totalIOsEsakshyaDownload",
          "eSakshya Wage": "esakshyaWage_1",
        },
        'Use of eSakshya App. in cases with punishment of 7 yrs. or more': {
          "Total IOs Nagapur": "totalIOsNagapur",
          "Total IOs eSakshya": "totalIOsEsakshya",
          "eSakshya Wage": "esakshyaWage",
        },
        "Zero FIR's": {
          "Total No. Zero FIRs Transferred Outside Maharashtra": "total_no_zero_fir_transferred_outside_mh",
          "Total No. Zero FIRs Transferred Outer State to Maharashtra": "total_no_zero_fir_transferred_outer_state_to_mh",
          "Total Zero FIRs": "total_zero_firs",
          "Pending To Transfer Outside Maharashtra": "pending_to_transfer_outside_mh",
          "Total FIRs Registered": "total_firs_registered",
          "Re-Register FIRs": "re_reg_firs",
          "Total Transferred Zero FIRs in Maharashtra": "total_transferred_zero_firs_in_mh",
          "Pending For Transfer Within Maharashtra": "pending_for_transfer_within_mh",
          "Pending For Re-Registration": "pending_for_re_registration",
        },
        'eFIR': {
          "Total EComplaints Received": "totalEComplaintsReceived",
          "Total Complaints Converted": "totalComplaintsConverted",
          "Disposed EComplaints": "disposedEComplaints",
        },
        'ITSSO (Investigation Tracking System for Sexual offences)': {
          "Total Pocso BNS Cases": "total_pocso_bns_cases",
          "No. Charge Sheet Within 60 Days": "charge_sheeted_within_60_days",
          "Percentage": "percentage",
        },
        'Stolen / Recovered Property': {
          "Total Cases": "total_cases",
          "Offences Registered": "offences_registered",
          "Value Stolen Property": "value_stolen_property",
          "Detected Cases": "detected_cases",
          "Value Recovered Property": "value_recovered_property",
          "Recovery %": "recovery_percentage",
        },
        'Conviction under BNS': {
          "Type of Court": "type_of_court",
          "BNS Section": "bns_sections",
          "Cases Decided": "cases_decided",
          "Convicted Cases": "convicted_cases",
          "Convicted Rate": "conviction_rate",
          "Total Cases Convicted": "total_cases_convicted",
          "Total Cases Decided": "total_cases_decided",
        },
        'Visit of Forensic Teams': {
          "Month-Year": "monthYear",
          "Total Cases Greater Than 7 yrs.": "total_cases_gt_7_years",
          "Cases Forensic Team Visited": "cases_forensic_team_visited",
          "Forensic Team Deployment %": "forensic_team_deployment_percentage",
        },
      };


      const getValidDataReport = (entry, fieldMappings) => {
        return Object.values(fieldMappings).some(fieldKey => {
          return entry[fieldKey] !== undefined && entry[fieldKey] !== null && entry[fieldKey] !== '';
        });
      };


      const reportData = Object.fromEntries(
        Object.entries(categories).map(([category, fieldMappings]) => [
          category,
          Object.keys(groupedTrainingData).flatMap((month) =>
            groupedTrainingData[month]
              .filter(entry => getValidDataReport(entry, fieldMappings)) // Filters valid entries
              .map(entry => ({
                'Month-Year': month, // Adds Month-Year field
                ...Object.fromEntries(
                  Object.entries(fieldMappings).map(([displayName, fieldKey]) => [
                    displayName, // Uses display-friendly key
                    entry[fieldKey] || '0', // Defaults to '0' if missing
                  ])
                ),
              }))
          ),
        ])
      );


      setPreviewData(reportData)


      if (selectedTab === "upload") {
        requestBody = {
          data: formValues,  // Sending previewed CSV data
          selectedTab: selectedTab,
          username: localStorage.getItem("userName") || "",
          email: localStorage.getItem("email") || "",
          emp_id: localStorage.getItem("emp_id") || "",
          city: localStorage.getItem("city") || "",
          zone: localStorage.getItem("zone") || "",
          unit: localStorage.getItem("zone") || "",
          district: localStorage.getItem("district") || "",
          police_station: localStorage.getItem("police_station") || "",
        };
      } else {
        // Full request body in JSON format

        console.log("transformedData : ", transformedData);

        requestBody = {
          data: transformedData,
          selectedTab: selectedTab,
          username: localStorage.getItem("userName") || "",
          email: localStorage.getItem("email") || "",
          emp_id: localStorage.getItem("emp_id") || "",
          city: localStorage.getItem("city") || "",
          zone: localStorage.getItem("zone") || "",
          unit: localStorage.getItem("zone") || "",
          district: localStorage.getItem("district") || "",
          police_station: localStorage.getItem("police_station") || "",
          // month: month,
        };
      }

      console.log(requestBody, "..........pavan.........");
      // Make the API request with axios
      const response = await axiosInstance.post(apiRoute, requestBody, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`, // Include token
        },
      });

      if (response.status === 201) {
        alert("Data inserted successfully");
        setFormData(getInitialFormData());
        setFileInfo(null);
        setReload(true);


        const zone = localStorage.getItem('zone') || ""
        const district = localStorage.getItem('district') || ""

        console.log("transformedData['data'] : ", transformedData);



        const newData = {
          timeStamp: (() => {
            const date = new Date();
            const day = String(date.getDate()).padStart(2, '0'); // Add leading zero for single digits
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
            const year = date.getFullYear();
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');
            return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
          })(),
          submited_by: localStorage.getItem('userName') || "",
          email: localStorage.getItem('email') || "",
          rang: localStorage.getItem('zone') || "",
          district: localStorage.getItem('district') || "",
          sampleDataIN: {
            [zone]: {
              [district]: reportData
            }

          }
        };

        downloadPDF(newData, subrole);
      } else {
        alert("Data inserted successfully");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to Insert Data");
    }
  };


  // ---------------------------------------------------------------------



  useEffect(() => {
    if (formData.fromDate && formData.toDate) {
      setFormValues({})
      generateMonthsInRange(formData.fromDate, formData.toDate);
    }
  }, [formData.fromDate, formData.toDate]);

  const generateMonthsInRange = (from, to) => {
    let start = new Date(from);
    let end = new Date(to);
    let months = [];

    while (start <= end) {
      let year = start.getFullYear();
      let month = start.toLocaleString("default", { month: "long" });
      let monthKey = `${month}-${year}`;
      months.push(monthKey);



      start.setMonth(start.getMonth() + 1);
    }

    setMonthsInRange(months);
  };



  useEffect(() => {

    if (!formValues || Object.keys(formValues).length === 0) {
      setVerified(false);
      return;
    }

    let foundValidEntry = false;

    Object.keys(formValues).forEach((monthKey) => {
      const categoryData = formValues[monthKey];

      if (!categoryData || typeof categoryData !== "object" || Object.keys(categoryData).length === 0) {
        return;
      }


      if (categoryData.hasOwnProperty('data')) {

        selectedTab == 'upload' ? foundValidEntry = true : foundValidEntry = false;



        return
      }


      Object.keys(dataKeys).forEach((category) => {
        if (categoryData) {
          const requiredFields = dataKeys[category];



          const hasAllRequiredKeys = requiredFields.every(field =>

            categoryData.hasOwnProperty(field) && categoryData[field] !== "" && categoryData[field] !== "NaN"
          );

          console.log("hasAllRequiredKeys : ", hasAllRequiredKeys);


          if (hasAllRequiredKeys) {
            foundValidEntry = true;
          }
        }
      });
    });

    setVerified(foundValidEntry, selectedTab);
  }, [formValues]);





  const handleEdit = (monthYear) => {
    setExpandedMonth(monthYear); // Expand the corresponding month dropdown
    // Scroll into view if necessary
    document.getElementById(monthYear)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };


  const [uploadData, setuploadData] = useState({})

  const handleFileChange = async (event) => {
    const token = localStorage.getItem("token");
    const fileInput = event.target;
    const selectedFile = fileInput.files[0];

    if (!selectedFile) {
      alert("No file selected!");
      return;
    }

    const fileType = selectedFile.name.split('.').pop().toLowerCase();
    if (fileType !== "csv" && fileType !== "xlsx") {
      alert("Please upload a valid CSV or XLSX file.");
      return;
    }

    // Clear previous CSV data
    setCsvData(null);
    setFormValues({}); // Reset form values

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axiosInstance.post("/upload_fir_form", formData, {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Full Response Data:", response.data);
      if (response.data.result) {
        setCsvData(response.data.result);
        setFormValues(response.data.result); // Update formValues with uploaded data
      } else {
        alert("Unexpected response format!");
      }

      // Reset file input so the same file can be uploaded again
      fileInput.value = "";
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("File upload failed. Please try again.");
    }
  };


  const [uploadDate, setuploadDate] = useState({})

  const [trainingDuplicatedMonths, setTrainingDuplicatedMonths] = useState([]);
  const [pendencyDuplicatedMonths, setPendencyDuplicatedMonths] = useState([]);
  const [untracedDuplicatedMonths, setUntracedDuplicatedMonths] = useState([]);
  const [offencesDuplicatedMonths, setOffencesDuplicatedMonths] = useState([]);
  const [importantDuplicatedMonths, setImportantDuplicatedMonths] = useState([]);
  const [propertyDuplicatedMonths, setPropertyDuplicatedMonths] = useState([]);
  const [esakshyaDuplicatedMonths, setEsakshyaDuplicatedMonths] = useState([]);
  const [esakshyaDiffMonths, setEsakshyaDiffMonths] = useState([]);
  const [zeroFIRDiffMonths, setZeroFIRDiffMonths] = useState([]);
  const [eFIRDiffMonths, setEFIRDiffMonths] = useState([]);
  const [itssoDiffMonths, setItssoDiffMonths] = useState([]);
  const [stolenDiffMonths, setStolenDiffMonths] = useState([]);
  const [convictionduplicatedMonths, setConvictionalDuplicatedMonths] = useState([]);
  const [forensicDiffMonths, setForensicDiffMonths] = useState([]);



  const excelDateToJSDate = (dateString) => {
    // Ensure date is in "MM/YYYY" format
    const parts = dateString.split("/");
    if (parts.length !== 2) return "Invalid Date";

    const month = parseInt(parts[0], 10) - 1; // Convert to zero-based month index
    const year = parseInt(parts[1], 10);

    if (isNaN(month) || isNaN(year) || month < 0 || month > 11) return "Invalid Date";

    const date = new Date(year, month);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long" });
  };

  useEffect(() => {
    if (uploadData) {
      const months = []; // Store monthYear values including duplicates
      const newFormValues = {};
      const monthCount = {}; // Object to keep track of monthYear occurrences

      // Ensure uploadData is an array before processing
      const dataArray = Array.isArray(uploadData) ? uploadData : [uploadData];

      // Collect monthYear values (allowing duplicates)
      dataArray.forEach((data) => {
        if (data.monthYear) {
          // Check if monthYear already exists in monthCount
          if (!monthCount[data.monthYear]) {
            monthCount[data.monthYear] = 1; // Initialize count
          } else {
            monthCount[data.monthYear] += 1; // Increment the count for duplicates
            data.monthYear = `${data.monthYear} - ${monthCount[data.monthYear]}`; // Modify duplicate from the start
          }

          months.push(data.monthYear);
        }
      });

      const parseMonthYear = (monthYear) => {
        const baseMonthYear = monthYear.split(" - ")[0]; // Extract the original monthYear (before any numbering)
        const [month, year] = baseMonthYear.split(" ");
        return new Date(`${month} 1, ${year}`); // Using day 1 for sorting
      };

      const sortedMonths = months.sort((a, b) => parseMonthYear(a) - parseMonthYear(b));

      console.log("sortedMonths:", sortedMonths);

      setMonthsInRange(sortedMonths); // Set all monthYear values including duplicates

      // Define date range
      const dateRange = {
        fromDate: sortedMonths.length > 0 ? sortedMonths[0] : null, // Earliest date
        toDate: sortedMonths.length > 0 ? sortedMonths[sortedMonths.length - 1] : null, // Latest date
      };

      setuploadDate(dateRange);

      console.log("dateRange : ", dateRange);

      // Process data entries as they are (keeping duplicates)
      dataArray.forEach((data) => {


        // Create an object with monthYear as key and remaining values as the value
        newFormValues[data.monthYear] = {
          total_personnel: data.total_personnel || "",
          personnel_trained: data.personnel_trained || "",
          total_officers: data.total_officers || "",
          officers_trained: data.officers_trained || "",

          percent_personnel_trained:
            data.total_personnel > 0
              ? ((data.personnel_trained / data.total_personnel) * 100).toFixed(2)
              : "",
          percent_officers_trained:
            data.total_officers > 0
              ? ((data.officers_trained / data.total_officers) * 100).toFixed(2)
              : "",
          total_persons_trained: (data.total_personnel + data.total_officers) || '',
          overall_cumulative: (((parseFloat((data.personnel_trained / data.total_personnel) * 100)) +
            parseFloat((data.officers_trained / data.total_officers) * 100)) / 2).toFixed(2) || ""

        };
      });

      console.log("newFormValues as object:", newFormValues);

      setFormValues(newFormValues);
    }
  }, [uploadData]);




  // Training Form



  const TrainingForm = (monthsInRange, formValues, setFormValues, trainingDuplicatedMonths, setTrainingDuplicatedMonths) => {
    const getUniqueMonthId = (month) => `${month} - ${Date.now()}`;

    // Handle duplication
    const handleDuplicate = (month) => {
      const newId = getUniqueMonthId(month);
      setTrainingDuplicatedMonths((prev) => [...prev, { month, id: newId }]);
      setFormValues((prev) => ({
        ...prev,
        [newId]: {
          total_personnel: "",
          personnel_trained: "",
          percent_personnel_trained: "",
          total_officers: "",
          officers_trained: "",
          percent_officers_trained: "",
          total_persons_trained: "",
          overall_cumulative: "",
        },
      }));
    };

    // Remove duplicate row
    const handleRemoveDuplicate = (id) => {
      setTrainingDuplicatedMonths((prev) => prev.filter((item) => item.id !== id));
      setFormValues((prev) => {
        const updatedValues = { ...prev };
        delete updatedValues[id];
        return updatedValues;
      });
    };

    // Handle input changes globally
    const handleInputChange = (id, field, value) => {
      setFormValues((prev) => ({
        ...prev,
        [id]: { ...prev[id], [field]: value },
      }));
    };

    return (
      <div className="overflow-x-auto d-flex justify-center">
        <table className="min-w-full border border-gray-400 shadow-md">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="border px-4 py-2">Month-Year</th>
              <th className="border px-4 py-2">Total Constab</th>
              <th className="border px-4 py-2">Trained (Constab.)</th>
              <th className="border px-4 py-2">% Trained (Constab.)</th>
              <th className="border px-4 py-2">Total Officers</th>
              <th className="border px-4 py-2">Trained (Officers)</th>
              <th className="border px-4 py-2">% Trained (Officers)</th>
              <th className="border px-4 py-2">Total Trained</th>
              <th className="border px-4 py-2">Total Trained %</th>
              {/* <th className="border px-4 py-2">Action</th> */}
            </tr>
          </thead>
          <tbody>
            {[...monthsInRange.map((m) => ({ month: m, id: m })), ...trainingDuplicatedMonths].map(({ month, id }) => (
              <tr key={id}>
                <td className="border px-4 py-2">{month}</td>
                <td className="border px-4 py-2">
                  <input
                    type="number"
                    onKeyDown={(e) => {
                      if (["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    inputMode="numeric"
                    style={{ appearance: "textfield" }}
                    value={formValues[id]?.total_personnel || ""}
                    onChange={(e) => handleInputChange(id, "total_personnel", e.target.value)}
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="number"
                    onKeyDown={(e) => {
                      if (["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    inputMode="numeric"
                    style={{ appearance: "textfield" }}
                    value={formValues[id]?.personnel_trained || ""}
                    onChange={(e) => handleInputChange(id, "personnel_trained", e.target.value)}
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="number"
                    onKeyDown={(e) => {
                      if (["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    inputMode="numeric"
                    style={{ appearance: "textfield" }}
                    value={formValues[id]?.percent_personnel_trained || ""}
                    onChange={(e) => handleInputChange(id, "percent_personnel_trained", e.target.value)}
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="number"
                    onKeyDown={(e) => {
                      if (["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    inputMode="numeric"
                    style={{ appearance: "textfield" }}
                    value={formValues[id]?.total_officers || ""}
                    onChange={(e) => handleInputChange(id, "total_officers", e.target.value)}
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="number"
                    onKeyDown={(e) => {
                      if (["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    inputMode="numeric"
                    style={{ appearance: "textfield" }}
                    value={formValues[id]?.officers_trained || ""}
                    onChange={(e) => handleInputChange(id, "officers_trained", e.target.value)}
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="number"
                    onKeyDown={(e) => {
                      if (["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    inputMode="numeric"
                    style={{ appearance: "textfield" }}
                    value={formValues[id]?.percent_officers_trained || ""}
                    onChange={(e) => handleInputChange(id, "percent_officers_trained", e.target.value)}
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="number"
                    onKeyDown={(e) => {
                      if (["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    inputMode="numeric"
                    style={{ appearance: "textfield" }}
                    value={formValues[id]?.total_persons_trained || ""}
                    onChange={(e) => handleInputChange(id, "total_persons_trained", e.target.value)}
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="number"
                    onKeyDown={(e) => {
                      if (["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    inputMode="numeric"
                    style={{ appearance: "textfield" }}
                    value={formValues[id]?.overall_cumulative || ""}
                    onChange={(e) => handleInputChange(id, "overall_cumulative", e.target.value)}
                  />
                </td>
                {/* <td className="border px-4 py-2">
                  <button     className="bg-green-500 text-white px-2 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed" onClick={() => handleDuplicate(month)}>+</button>
                  {trainingDuplicatedMonths.some((item) => item.id === id) && (
                    <button  className="bg-red-500 text-white px-2 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed ml-2" onClick={() => handleRemoveDuplicate(id)}>-</button>
                  )}
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };


  // FIR Starts Here

  const pendencyForm = (monthsInRange, formValues, setFormValues, pendencyDuplicatedMonths, setPendencyDuplicatedMonths) => {

    const getUniqueMonthId = (month) => `${month} - ${Date.now()}`;
    // Handle duplication for PendencyForm
    const handleDuplicate = (month) => {
      const newId = getUniqueMonthId(month);
      setPendencyDuplicatedMonths((prev) => [...prev, { month, id: newId }]);
      setFormValues((prev) => ({
        ...prev,
        [newId]: {
          totalCases: "",
          disposedCases: "",
          pendingCases: "",
          pendingPercentage: "",
          punishmentLessThan7: "",
          punishmentMoreThan7: "",
        },
      }));
    };

    // Remove duplicate row
    const handleRemoveDuplicate = (id) => {
      setPendencyDuplicatedMonths((prev) => prev.filter((item) => item.id !== id));
      setFormValues((prev) => {
        const updatedValues = { ...prev };
        delete updatedValues[id];
        return updatedValues;
      });
    };

    // Handle input changes
    const handleInputChange = (id, field, value) => {
      setFormValues((prev) => ({
        ...prev,
        [id]: { ...prev[id], [field]: value },
      }));
    };

    return (
      <div className="overflow-x-auto d-flex justify-center">
        <table className="w-full border border-gray-400 shadow-md">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="border px-4 py-2">Month-Year</th>
              <th className="border px-4 py-2">Total Cases Registered</th>
              <th className="border px-4 py-2">No. of Cases Disposed</th>
              <th className="border px-4 py-2">Total Pending Cases</th>
              <th className="border px-4 py-2">Pendency Percentage</th>
              <th className="border px-4 py-2">Less than 7 yrs Punishment</th>
              <th className="border px-4 py-2">More than 7 yrs Punishment</th>
              {/* <th className="border px-4 py-2">Action</th> */}
            </tr>
          </thead>
          <tbody>
            {[...monthsInRange.map((m) => ({ month: m, id: m })), ...pendencyDuplicatedMonths].map(({ month, id }) => (
              <tr key={id}>
                <td className="border px-4 py-2">{month}</td>
                <td className="border px-4 py-2">
                  <input
                    type="number"
                    onKeyDown={(e) => {
                      if (["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    inputMode="numeric"
                    style={{ appearance: "textfield" }}
                    className="w-[40%] p-2 border rounded"
                    value={formValues[id]?.totalCases || ""}
                    onChange={(e) => handleInputChange(id, "totalCases", e.target.value)}
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="number"
                    onKeyDown={(e) => {
                      if (["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    inputMode="numeric"
                    style={{ appearance: "textfield" }}
                    className="w-[40%] p-2 border rounded"
                    value={formValues[id]?.disposedCases || ""}
                    onChange={(e) => handleInputChange(id, "disposedCases", e.target.value)}
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="number"
                    onKeyDown={(e) => {
                      if (["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    inputMode="numeric"
                    style={{ appearance: "textfield" }}
                    className="w-[40%] p-2 border rounded"
                    value={formValues[id]?.pendingCases || ""}
                    onChange={(e) => handleInputChange(id, "pendingCases", e.target.value)}

                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="number"
                    onKeyDown={(e) => {
                      if (["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    inputMode="numeric"
                    style={{ appearance: "textfield" }}
                    className="w-[40%] p-2 border rounded"
                    value={formValues[id]?.pendingPercentage || ""}
                    onChange={(e) => handleInputChange(id, "pendingPercentage", e.target.value)}
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="number"
                    onKeyDown={(e) => {
                      if (["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    inputMode="numeric"
                    style={{ appearance: "textfield" }}
                    className="w-[40%] p-2 border rounded"
                    value={formValues[id]?.punishmentLessThan7 || ""}
                    onChange={(e) => handleInputChange(id, "punishmentLessThan7", e.target.value)}
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="number"
                    onKeyDown={(e) => {
                      if (["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    inputMode="numeric"
                    style={{ appearance: "textfield" }}
                    className="w-[40%] p-2 border rounded"
                    value={formValues[id]?.punishmentMoreThan7 || ""}
                    onChange={(e) => handleInputChange(id, "punishmentMoreThan7", e.target.value)}
                  />
                </td>
                {/* <td className="border px-4 py-2">
                  <button     className="bg-green-500 text-white px-2 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed" onClick={() => handleDuplicate(month)}>+</button>
                  {pendencyDuplicatedMonths.some((item) => item.id === id) && (
                    <button  className="bg-red-500 text-white px-2 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed ml-2" onClick={() => handleRemoveDuplicate(id)}>-</button>
                  )}
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };



  const untraced = (monthsInRange, formValues, setFormValues, untracedDuplicatedMonths, setUntracedDuplicatedMonths) => {
    const ageGroups = ["Below 18 years", "Above or Equal 18 years"];

    const getUniqueMonthId = (month) => `${month} - ${Date.now()}`;

    const handleDuplicate = (month) => {
      const newId = getUniqueMonthId(month);
      setUntracedDuplicatedMonths((prev) => [...prev, { month, id: newId }]);
      setFormValues((prev) => ({
        ...prev,
        [newId]: {
          ageGroup: "",
          untracedPersons: "",
          missingPersons: "",
          totalMissing: "",
          traced: "",
          untraced: "",
          untracedPercentage: "",
        },
      }));
    };

    const handleRemoveDuplicate = (id) => {
      setUntracedDuplicatedMonths((prev) => prev.filter((item) => item.id !== id));
      setFormValues((prev) => {
        const updatedValues = { ...prev };
        delete updatedValues[id];
        return updatedValues;
      });
    };

    const handleInputChange = (id, field, value) => {
      setFormValues((prev) => ({
        ...prev,
        [id]: { ...prev[id], [field]: value },
      }));
    };

    const getSelectedAgeGroupsForMonth = (month) => {
      return Object.entries(formValues)
        .filter(([key, value]) => key.startsWith(month) && value?.ageGroup) // Get only same-month entries
        .map(([_, value]) => value.ageGroup); // Extract selected values
    };

    return (
      <div className="overflow-x-auto d-flex ">
        <table className="w-full border border-gray-400 shadow-md">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="border px-4 py-2">Month-Year</th>
              <th className="border px-4 py-2">Age Group</th>
              <th className="border px-4 py-2">No. of Untraced Persons</th>
              <th className="border px-4 py-2">No. of Missing Persons</th>
              <th className="border px-4 py-2">Total Missing Persons</th>
              <th className="border px-4 py-2">Traced</th>
              <th className="border px-4 py-2">Untraced</th>
              <th className="border px-4 py-2">Untraced %</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {[
              ...monthsInRange.map((m) => ({ month: m, id: m })),
              ...untracedDuplicatedMonths,
            ].map(({ month, id }) => {
              const selectedAgeGroups = getSelectedAgeGroupsForMonth(month);

              return (
                <tr key={id}>
                  <td className="border px-4 py-2">{month}</td>
                  <td className="border px-4 py-2">
                    <select
                      className="w-['100%'] p-2 border rounded bg-white"
                      value={formValues[id]?.ageGroup || ""}
                      onChange={(e) => handleInputChange(id, "ageGroup", e.target.value)}
                    >
                      <option value="" disabled>Select Age Group</option>
                      {ageGroups
                        .filter(
                          (option) =>
                            !selectedAgeGroups.includes(option) || option === formValues[id]?.ageGroup
                        )
                        .map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                    </select>
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      onKeyDown={(e) => {
                        if (["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      inputMode="numeric"
                      style={{ appearance: "textfield" }}
                      className="w-[40%] p-2 border rounded"
                      value={formValues[id]?.untracedPersons || ""}
                      onChange={(e) => handleInputChange(id, "untracedPersons", e.target.value)}
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      onKeyDown={(e) => {
                        if (["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      inputMode="numeric"
                      style={{ appearance: "textfield" }}
                      className="w-[40%] p-2 border rounded"
                      value={formValues[id]?.missingPersons || ""}
                      onChange={(e) => handleInputChange(id, "missingPersons", e.target.value)}
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      onKeyDown={(e) => {
                        if (["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      inputMode="numeric"
                      style={{ appearance: "textfield" }}
                      className="w-[40%] p-2 border rounded"
                      value={formValues[id]?.totalMissing || ""}
                      onChange={(e) => handleInputChange(id, "totalMissing", e.target.value)}

                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      onKeyDown={(e) => {
                        if (["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      inputMode="numeric"
                      style={{ appearance: "textfield" }}
                      className="w-[40%] p-2 border rounded"
                      value={formValues[id]?.traced || ""}
                      onChange={(e) => handleInputChange(id, "traced", e.target.value)}
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      onKeyDown={(e) => {
                        if (["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      inputMode="numeric"
                      style={{ appearance: "textfield" }}
                      className="w-[40%] p-2 border rounded"
                      value={formValues[id]?.untraced || ""}
                      onChange={(e) => handleInputChange(id, "untraced", e.target.value)}
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      onKeyDown={(e) => {
                        if (["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      inputMode="numeric"
                      style={{ appearance: "textfield" }}
                      className="w-[40%] p-2 border rounded"
                      value={formValues[id]?.untracedPercentage || ""}
                      onChange={(e) => handleInputChange(id, "untracedPercentage", e.target.value)}

                    />
                  </td>
                  <td className="border px-4 py-2">
                    {selectedAgeGroups.length < ageGroups.length && (
                      <button     className="bg-green-500 text-white px-2 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed" disabled={!formValues[id]?.ageGroup} onClick={() => handleDuplicate(month)}>+</button>
                    )}
                    {untracedDuplicatedMonths.some((item) => item.id === id) && (
                      <button  className="bg-red-500 text-white px-2 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed ml-2" disabled={!formValues[id]?.ageGroup} onClick={() => handleRemoveDuplicate(id)}>-</button>
                    )}
                  </td>

                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };



  const offencesAgainstBody = (
    monthsInRange,
    formValues,
    setFormValues,
    offencesDuplicatedMonths,
    setOffencesDuplicatedMonths
  ) => {
    const allActsAndSections = [
      "Murder (BNS Sec. 103(1))",
      "Att. To Murder (BNS Sec. 109)",
      "Rape (BNS Sec. 64 to 71)",
      "Hurt (BNS Sec. 117 to 125)",
      "Riots (BNS Sec. 191 to 193)",
      "Molestation (BNS Sec. 74 to 79)"
    ];

    const getUniqueMonthId = (month) => `${month} - ${Date.now()}`;

    const handleDuplicate = (month) => {
      const newId = getUniqueMonthId(month);
      setOffencesDuplicatedMonths((prev) => [...prev, { month, id: newId }]);
      setFormValues((prev) => ({
        ...prev,
        [newId]: { actAndSection: "", registeredCases: "", detectedCases: "", detectedCasesPercentage: "" }
      }));
    };

    const handleRemoveDuplicate = (id) => {
      setOffencesDuplicatedMonths((prev) => prev.filter((item) => item.id !== id));
      setFormValues((prev) => {
        const updatedValues = { ...prev };
        delete updatedValues[id];
        return updatedValues;
      });
    };

    const handleInputChange = (id, field, value) => {
      setFormValues((prev) => ({
        ...prev,
        [id]: { ...prev[id], [field]: value }
      }));
    };

    // Function to get selected options for a given month
    const getSelectedOptionsForMonth = (month) => {
      return Object.entries(formValues)
        .filter(([key, value]) => key.startsWith(month) && value?.actAndSection) // Get only same-month entries
        .map(([_, value]) => value.actAndSection); // Extract selected values
    };

    return (
      <div className="overflow-x-auto d-flex justify-center">
        <table className="w-full border border-gray-400 shadow-md">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="border px-4 py-2">Month-Year</th>
              <th className="border px-4 py-2">Act and Section</th>
              <th className="border px-4 py-2">Registered Cases</th>
              <th className="border px-4 py-2">Detected Cases</th>
              <th className="border px-4 py-2">Detected Cases %</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {[...monthsInRange.map((m) => ({ month: m, id: m })), ...offencesDuplicatedMonths].map(({ month, id }) => {
              const selectedOptions = getSelectedOptionsForMonth(month); // Get all selected options for this month

              return (
                <tr key={id}>
                  <td className="border px-4 py-2">{month}</td>
                  <td className="border px-4 py-2">
                    <select
                      className="w-['100%'] p-2 border rounded"
                      value={formValues[id]?.actAndSection || ""}
                      onChange={(e) => handleInputChange(id, "actAndSection", e.target.value)}
                    >
                      <option value="" disabled>Select an Act and Section</option>
                      {allActsAndSections
                        .filter(
                          (option) =>
                            !selectedOptions.includes(option) || option === formValues[id]?.actAndSection // Keep selected value in row
                        )
                        .map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                    </select>
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      onKeyDown={(e) => {
                        if (["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      inputMode="numeric"
                      style={{ appearance: "textfield" }}
                      className="w-[40%] p-2 border rounded"
                      value={formValues[id]?.registeredCases || ""}
                      onChange={(e) => handleInputChange(id, "registeredCases", e.target.value)}
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      onKeyDown={(e) => {
                        if (["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      inputMode="numeric"
                      style={{ appearance: "textfield" }}
                      className="w-[40%] p-2 border rounded"
                      value={formValues[id]?.detectedCases || ""}
                      onChange={(e) => handleInputChange(id, "detectedCases", e.target.value)}
                    />

                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      onKeyDown={(e) => {
                        if (["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      inputMode="numeric"
                      style={{ appearance: "textfield" }}
                      className="w-[40%] p-2 border rounded"
                      value={formValues[id]?.detectedCasesPercentage || ""}
                      onChange={(e) => handleInputChange(id, "detectedCasesPercentage", e.target.value)}

                    />
                  </td>
                  <td className="border px-4 py-2">
                    {selectedOptions.length < allActsAndSections.length && (
                      <button     className="bg-green-500 text-white px-2 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed" disabled={!formValues[id]?.actAndSection} onClick={() => handleDuplicate(month)}>+</button>
                    )}
                    {offencesDuplicatedMonths.some((item) => item.id === id) && (
                      <button  className="bg-red-500 text-white px-2 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed ml-2" disabled={!formValues[id]?.actAndSection} onClick={() => handleRemoveDuplicate(id)}>-</button>
                    )}
                  </td>

                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };





  const ImportantAgainstBody = (
    monthsInRange,
    formValues,
    setFormValues,
    importantDuplicatedMonths,
    setImportantDuplicatedMonths
  ) => {
    const allActsAndSections = [
      "Mob Lynching (Section 103 (2) BNS)",
      "Snatching (Section 304 BNS)",
      "Organized crime (Section 111 BNS)",
      "Petty Organized crime (Section 112 BNS)",
      "Terrorist act (Section 113 BNS)",
    ];

    const getUniqueMonthId = (month) => `${month} - ${Date.now()}`;

    const handleDuplicate = (month) => {
      const newId = getUniqueMonthId(month);
      setImportantDuplicatedMonths((prev) => [...prev, { month, id: newId }]);
      setFormValues((prev) => ({
        ...prev,
        [newId]: { actAndSection_1: "", registeredCases_1: "", detectedCases_1: "", detectedCasesPercentage_1: "" },
      }));
    };

    const handleRemoveDuplicate = (id) => {
      setImportantDuplicatedMonths((prev) => prev.filter((item) => item.id !== id));
      setFormValues((prev) => {
        const updatedValues = { ...prev };
        delete updatedValues[id];
        return updatedValues;
      });
    };

    const handleInputChange = (id, field, value) => {
      setFormValues((prev) => ({
        ...prev,
        [id]: { ...prev[id], [field]: value },
      }));
    };

    // Function to get selected options for a given month
    const getSelectedOptionsForMonth = (month) => {
      return Object.entries(formValues)
        .filter(([key, value]) => key.startsWith(month) && value?.actAndSection_1) // Get only same-month entries
        .map(([_, value]) => value.actAndSection); // Extract selected values
    };

    return (
      <div className="overflow-x-auto d-flex justify-center">
        <table className="w-full border border-gray-400 shadow-md">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="border px-4 py-2">Month-Year</th>
              <th className="border px-4 py-2">Act and Section</th>
              <th className="border px-4 py-2">Registered Cases</th>
              <th className="border px-4 py-2">Detected Cases</th>
              <th className="border px-4 py-2">Detected Cases %</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {[...monthsInRange.map((m) => ({ month: m, id: m })), ...importantDuplicatedMonths].map(({ month, id }) => {
              const selectedOptions = getSelectedOptionsForMonth(month);

              return (
                <tr key={id}>
                  <td className="border px-4 py-2">{month}</td>
                  <td className="border px-4 py-2">
                    <select
                      className="w-['100%'] p-2 border rounded"
                      value={formValues[id]?.actAndSection_1 || ""}
                      onChange={(e) => handleInputChange(id, "actAndSection_1", e.target.value)}
                    >
                      <option value="" disabled>Select an Act and Section</option>
                      {allActsAndSections
                        .filter(
                          (option) =>
                            !selectedOptions.includes(option) || option === formValues[id]?.actAndSection_1 // Keep selected value in row
                        )
                        .map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                    </select>
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      onKeyDown={(e) => {
                        if (["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      inputMode="numeric"
                      style={{ appearance: "textfield" }}
                      className="w-[40%] p-2 border rounded"
                      value={formValues[id]?.registeredCases_1 || ""}
                      onChange={(e) => handleInputChange(id, "registeredCases_1", e.target.value)}
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      onKeyDown={(e) => {
                        if (["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      inputMode="numeric"
                      style={{ appearance: "textfield" }}
                      className="w-[40%] p-2 border rounded"
                      value={formValues[id]?.detectedCases_1 || ""}
                      onChange={(e) => handleInputChange(id, "detectedCases_1", e.target.value)}
                    />

                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      onKeyDown={(e) => {
                        if (["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      inputMode="numeric"
                      style={{ appearance: "textfield" }}
                      className="w-[40%] p-2 border rounded"
                      value={formValues[id]?.detectedCasesPercentage_1 || ""}
                      onChange={(e) => handleInputChange(id, "detectedCasesPercentage_1", e.target.value)}

                    />
                  </td>
                  <td className="border px-4 py-2">
                    {selectedOptions.length < allActsAndSections.length && (
                      <button     className="bg-green-500 text-white px-2 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed" disabled={!formValues[id]?.actAndSection_1} onClick={() => handleDuplicate(month)}>+</button>
                    )}
                    {importantDuplicatedMonths.some((item) => item.id === id) && (
                      <button  className="bg-red-500 text-white px-2 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed ml-2" disabled={!formValues[id]?.actAndSection_1} onClick={() => handleRemoveDuplicate(id)}>-</button>
                    )}
                  </td>

                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };




  const PropertyAgainstBody = (
    monthsInRange,
    formValues,
    setFormValues,
    propertyDuplicatedMonths,
    setPropertyDuplicatedMonths
  ) => {
    const allActsAndSections = [
      "Dacoity (BNS Sec. 310)",
      "Robbery (BNS Sec. 309)",
      "HBT (BNS Sec. 331 to 334)",
      "Theft (BNS Sec. 303 & 305)"
    ];

    const getUniqueMonthId = (month) => `${month} - ${Date.now()}`;

    const handleDuplicate = (month) => {
      const newId = getUniqueMonthId(month);
      setPropertyDuplicatedMonths((prev) => [...prev, { month, id: newId }]);
      setFormValues((prev) => ({
        ...prev,
        [newId]: { actAndSection_2: "", registeredCases_2: "", detectedCases_2: "", detectedCasesPercentage_2: "" },
      }));
    };

    const handleRemoveDuplicate = (id) => {
      setPropertyDuplicatedMonths((prev) => prev.filter((item) => item.id !== id));
      setFormValues((prev) => {
        const updatedValues = { ...prev };
        delete updatedValues[id];
        return updatedValues;
      });
    };

    const handleInputChange = (id, field, value) => {
      setFormValues((prev) => ({
        ...prev,
        [id]: { ...prev[id], [field]: value },
      }));
    };

    const getSelectedOptionsForMonth = (month) => {
      return Object.entries(formValues)
        .filter(([key, value]) => key.startsWith(month) && value?.actAndSection_2)
        .map(([_, value]) => value.actAndSection_2);
    };

    return (
      <div className="overflow-x-auto d-flex justify-center">
        <table className="w-full border border-gray-400 shadow-md">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="border px-4 py-2">Month-Year</th>
              <th className="border px-4 py-2">Act and Section</th>
              <th className="border px-4 py-2">Registered Cases</th>
              <th className="border px-4 py-2">Detected Cases</th>
              <th className="border px-4 py-2">Detected Cases %</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {[...monthsInRange.map((m) => ({ month: m, id: m })), ...propertyDuplicatedMonths].map(({ month, id }) => {
              const selectedOptions = getSelectedOptionsForMonth(month);

              return (
                <tr key={id}>
                  <td className="border px-4 py-2">{month}</td>
                  <td className="border px-4 py-2">
                    <select
                      className="w-['100%'] p-2 border rounded"
                      value={formValues[id]?.actAndSection_2 || ""}
                      onChange={(e) => handleInputChange(id, "actAndSection_2", e.target.value)}
                    >
                      <option value="" disabled>Select an Act and Section</option>
                      {allActsAndSections
                        .filter((option) => !selectedOptions.includes(option) || option === formValues[id]?.actAndSection_2)
                        .map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      onKeyDown={(e) => {
                        if (["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      inputMode="numeric"
                      style={{ appearance: "textfield" }}
                      className="w-[40%] p-2 border rounded"
                      value={formValues[id]?.registeredCases_2 || ""}
                      onChange={(e) => handleInputChange(id, "registeredCases_2", e.target.value)}
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      onKeyDown={(e) => {
                        if (["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      inputMode="numeric"
                      style={{ appearance: "textfield" }}
                      className="w-[40%] p-2 border rounded"
                      value={formValues[id]?.detectedCases_2 || ""}
                      onChange={(e) => handleInputChange(id, "detectedCases_2", e.target.value)}
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      onKeyDown={(e) => {
                        if (["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      inputMode="numeric"
                      style={{ appearance: "textfield" }}
                      className="w-[40%] p-2 border rounded"
                      value={formValues[id]?.detectedCasesPercentage_2 || ""}
                      onChange={(e) => handleInputChange(id, "detectedCasesPercentage_2", e.target.value)}

                    />
                  </td>
                  <td className="border px-4 py-2">
                    {selectedOptions.length < allActsAndSections.length && (
                      <button     className="bg-green-500 text-white px-2 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed" disabled={!formValues[id]?.actAndSection_2} onClick={() => handleDuplicate(month)}>+</button>
                    )}
                    {propertyDuplicatedMonths.some((item) => item.id === id) && (
                      <button  className="bg-red-500 text-white px-2 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed ml-2" disabled={!formValues[id]?.actAndSection_2} onClick={() => handleRemoveDuplicate(id)}>-</button>
                    )}
                  </td>

                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };



  const esakshyaDetails = (
    monthsInRange,
    formValues,
    setFormValues,
    esakshyaDuplicatedMonths,
    setEsakshyaDuplicatedMonths
  ) => {
    const getUniqueMonthId = (month) => `${month} - ${Date.now()}`;

    const handleDuplicate = (month) => {
      const newId = getUniqueMonthId(month);
      setEsakshyaDuplicatedMonths((prev) => [...prev, { month, id: newId }]);
      setFormValues((prev) => ({
        ...prev,
        [newId]: {
          totalIOsEsakshyaRegistered: "",
          totalIOsEsakshyaDownload: "",
          esakshyaWage_1: "",
        },
      }));
    };

    const handleRemoveDuplicate = (id) => {
      setEsakshyaDuplicatedMonths((prev) => prev.filter((item) => item.id !== id));
      setFormValues((prev) => {
        const updatedValues = { ...prev };
        delete updatedValues[id];
        return updatedValues;
      });
    };

    const handleInputChange = (id, field, value) => {
      setFormValues((prev) => ({
        ...prev,
        [id]: { ...prev[id], [field]: value },
      }));
    };

    return (
      <div className="overflow-x-auto d-flex justify-center">
        <table className="w-full border border-gray-400 shadow-md">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="border px-4 py-2">Month-Year</th>
              <th className="border px-4 py-2">No of IO's Registered</th>
              <th className="border px-4 py-2">eSakshya downloads by IOs</th>
              <th className="border px-4 py-2">eSakshya Usage %</th>
              {/* <th className="border px-4 py-2">Action</th> */}
            </tr>
          </thead>
          <tbody>
            {[...monthsInRange.map((m) => ({ month: m, id: m })), ...esakshyaDuplicatedMonths].map(
              ({ month, id }) => (
                <tr key={id}>
                  <td className="border px-4 py-2">{month}</td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      onKeyDown={(e) => {
                        if (["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      inputMode="numeric"
                      style={{ appearance: "textfield" }}
                      className="w-[40%] p-2 border rounded"
                      value={formValues[id]?.totalIOsEsakshyaRegistered || ""}
                      onChange={(e) =>
                        handleInputChange(id, "totalIOsEsakshyaRegistered", e.target.value)
                      }
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      onKeyDown={(e) => {
                        if (["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      inputMode="numeric"
                      style={{ appearance: "textfield" }}
                      className="w-[40%] p-2 border rounded"
                      value={formValues[id]?.totalIOsEsakshyaDownload || ""}
                      onChange={(e) =>
                        handleInputChange(id, "totalIOsEsakshyaDownload", e.target.value)
                      }
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      onKeyDown={(e) => {
                        if (["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      inputMode="numeric"
                      style={{ appearance: "textfield" }}
                      className="w-[40%] p-2 border rounded"
                      value={formValues[id]?.esakshyaWage_1 || ""}
                      onChange={(e) => handleInputChange(id, "esakshyaWage_1", e.target.value)}

                    />
                  </td>
                  {/* <td className="border px-4 py-2">
                    <button     className="bg-green-500 text-white px-2 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed" onClick={() => handleDuplicate(month)}>
                      +
                    </button>
                    {esakshyaDuplicatedMonths.some((item) => item.id === id) && (
                      <button  className="bg-red-500 text-white px-2 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed ml-2" onClick={() => handleRemoveDuplicate(id)}>
                        -
                      </button>
                    )}
                  </td> */}
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    );
  };


  const useOfEsakshyaDetails = (
    monthsInRange,
    formValues,
    setFormValues,
    esakshyaDiffMonths,
    setEsakshyaDiffMonths
  ) => {
    const getUniqueMonthId = (month) => `${month} - ${Date.now()}`;

    const handleDuplicate = (month) => {
      const newId = getUniqueMonthId(month);
      setEsakshyaDiffMonths((prev) => [...prev, { month, id: newId }]);
      setFormValues((prev) => ({
        ...prev,
        [newId]: {
          cases_registered: "",
          cases_esakshya_used: "",
          cases_esakshya_not_used: "",
          esakshya_usage_percent: "",
          esakshya_used_charge_sheeted: "",
          esakshya_not_used_invest: "",
        },
      }));
    };

    const handleRemoveDuplicate = (id) => {
      setEsakshyaDiffMonths((prev) => prev.filter((item) => item.id !== id));
      setFormValues((prev) => {
        const updatedValues = { ...prev };
        delete updatedValues[id];
        return updatedValues;
      });
    };

    const handleInputChange = (id, field, value) => {
      setFormValues((prev) => ({
        ...prev,
        [id]: { ...prev[id], [field]: value },
      }));
    };

    return (
      <div className="overflow-x-auto d-flex justify-center">
        <table className="w-full border border-gray-400 shadow-md">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="border px-4 py-2">Month-Year</th>
              <th className="border px-4 py-2">No of Cases Registered</th>
              <th className="border px-4 py-2">No of Cases eSakshya Was Used</th>
              <th className="border px-4 py-2">No of Cases eSakshya Was Not Used</th>
              <th className="border px-4 py-2">eSakshya Usage %</th>
              <th className="border px-4 py-2">
                Total Offences eSakshya Used & Charge Sheeted
              </th>
              <th className="border px-4 py-2">
                Total Offences eSakshya Not Used & Under Investigation
              </th>
              {/* <th className="border px-4 py-2">Action</th> */}
            </tr>
          </thead>
          <tbody>
            {[...monthsInRange.map((m) => ({ month: m, id: m })), ...esakshyaDiffMonths].map(
              ({ month, id }) => (
                <tr key={id}>
                  <td className="border px-4 py-2">{month}</td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      onKeyDown={(e) => {
                        if (["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      inputMode="numeric"
                      style={{ appearance: "textfield" }}
                      className="w-[40%] p-2 border rounded"
                      value={formValues[id]?.cases_registered || ""}
                      onChange={(e) =>
                        handleInputChange(id, "cases_registered", e.target.value)
                      }
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      onKeyDown={(e) => {
                        if (["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      inputMode="numeric"
                      style={{ appearance: "textfield" }}
                      className="w-[40%] p-2 border rounded"
                      value={formValues[id]?.cases_esakshya_used || ""}
                      onChange={(e) =>
                        handleInputChange(id, "cases_esakshya_used", e.target.value)
                      }
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      onKeyDown={(e) => {
                        if (["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      inputMode="numeric"
                      style={{ appearance: "textfield" }}
                      className="w-[40%] p-2 border rounded"
                      value={formValues[id]?.cases_esakshya_not_used || ""}
                      onChange={(e) =>
                        handleInputChange(id, "cases_esakshya_not_used", e.target.value)
                      }
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      onKeyDown={(e) => {
                        if (["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      inputMode="numeric"
                      style={{ appearance: "textfield" }}
                      className="w-[40%] p-2 border rounded"
                      value={formValues[id]?.esakshya_usage_percent || ""}
                      onChange={(e) => handleInputChange(id, "esakshya_usage_percent", e.target.value)}

                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      onKeyDown={(e) => {
                        if (["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      inputMode="numeric"
                      style={{ appearance: "textfield" }}
                      className="w-[40%] p-2 border rounded"
                      value={formValues[id]?.esakshya_used_charge_sheeted || ""}
                      onChange={(e) =>
                        handleInputChange(id, "esakshya_used_charge_sheeted", e.target.value)
                      }
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      onKeyDown={(e) => {
                        if (["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      inputMode="numeric"
                      style={{ appearance: "textfield" }}
                      className="w-[40%] p-2 border rounded"
                      value={formValues[id]?.esakshya_not_used_invest || ""}
                      onChange={(e) =>
                        handleInputChange(id, "esakshya_not_used_invest", e.target.value)
                      }
                    />
                  </td>
                  {/* <td className="border px-4 py-2">
                    <button     className="bg-green-500 text-white px-2 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed" onClick={() => handleDuplicate(month)}>
                      +
                    </button>
                    {esakshyaDiffMonths.some((item) => item.id === id) && (
                      <button  className="bg-red-500 text-white px-2 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed ml-2" onClick={() => handleRemoveDuplicate(id)}>
                        -
                      </button>
                    )}
                  </td> */}
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    );
  };


  const ZeroFIRDetails = (
    monthsInRange,
    formValues,
    setFormValues,
    zeroFIRDiffMonths,
    setZeroFIRDiffMonths
  ) => {
    const getUniqueMonthId = (month) => `${month} - ${Date.now()}`;

    const handleDuplicate = (month) => {
      const newId = getUniqueMonthId(month);
      setZeroFIRDiffMonths((prev) => [...prev, { month, id: newId }]);
      setFormValues((prev) => ({
        ...prev,
        [newId]: {
          total_no_zero_fir_transferred_outside_mh: "",
          total_no_zero_fir_transferred_outer_state_to_mh: "",
          total_zero_firs: "",
          pending_to_transfer_outside_mh: "",
          total_firs_registered: "",
          re_reg_firs: "",
          total_transferred_zero_firs_in_mh: "",
          pending_for_transfer_within_mh: "",
          pending_for_re_registration: "",
        },
      }));
    };

    const handleRemoveDuplicate = (id) => {
      setZeroFIRDiffMonths((prev) => prev.filter((item) => item.id !== id));
      setFormValues((prev) => {
        const updatedValues = { ...prev };
        delete updatedValues[id];
        return updatedValues;
      });
    };

    const handleInputChange = (id, field, value) => {
      setFormValues((prev) => ({
        ...prev,
        [id]: { ...prev[id], [field]: value },
      }));
    };

    return (
      <div className="overflow-x-auto d-flex ">
        <table className="w-full border border-gray-400 shadow-md">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="border px-4 py-2">Month-Year</th>
              <th className="border px-4 py-2">Zero FIRs Transferred Outside Maharashtra</th>
              <th className="border px-4 py-2">Zero FIRs Transferred from Other States to Maharashtra</th>
              <th className="border px-4 py-2">Total Zero FIRs</th>
              <th className="border px-4 py-2">Pending for Transfer Outside Maharashtra</th>
              <th className="border px-4 py-2">Zero FIRs in Maharashtra</th>
              <th className="border px-4 py-2">Re-Registered FIRs in Maharashtra</th>
              <th className="border px-4 py-2">Zero FIRs Transferred Within Maharashtra</th>
              <th className="border px-4 py-2">Pending for Transfer Within Maharashtra</th>
              <th className="border px-4 py-2">Pending for Re-registration</th>
              {/* <th className="border px-4 py-2">Action</th> */}
            </tr>
          </thead>
          <tbody>
            {[...monthsInRange.map((m) => ({ month: m, id: m })), ...zeroFIRDiffMonths].map(
              ({ month, id }) => (
                <tr key={id}>
                  <td className="border px-4 py-2">{month}</td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      onKeyDown={(e) => {
                        if (["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      inputMode="numeric"
                      style={{ appearance: "textfield" }}
                      className="w-full p-2 border rounded"
                      value={formValues[id]?.total_no_zero_fir_transferred_outside_mh || ""}
                      onChange={(e) => handleInputChange(id, "total_no_zero_fir_transferred_outside_mh", e.target.value)}
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      onKeyDown={(e) => {
                        if (["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      inputMode="numeric"
                      style={{ appearance: "textfield" }}
                      className="w-full p-2 border rounded"
                      value={formValues[id]?.total_no_zero_fir_transferred_outer_state_to_mh || ""}
                      onChange={(e) => handleInputChange(id, "total_no_zero_fir_transferred_outer_state_to_mh", e.target.value)}
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      onKeyDown={(e) => {
                        if (["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      inputMode="numeric"
                      style={{ appearance: "textfield" }}
                      className="w-full p-2 border rounded"
                      value={formValues[id]?.total_zero_firs || ""}
                      onChange={(e) => handleInputChange(id, "total_zero_firs", e.target.value)}

                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      onKeyDown={(e) => {
                        if (["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      inputMode="numeric"
                      style={{ appearance: "textfield" }}
                      className="w-full p-2 border rounded"
                      value={
                        formValues[id]?.pending_to_transfer_outside_mh || ""
                      }
                      onChange={(e) =>
                        handleInputChange(
                          id,
                          "pending_to_transfer_outside_mh",
                          e.target.value
                        )
                      }

                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      onKeyDown={(e) => {
                        if (["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      inputMode="numeric"
                      style={{ appearance: "textfield" }}
                      className="w-full p-2 border rounded"
                      value={formValues[id]?.total_firs_registered || ""}
                      onChange={(e) => handleInputChange(id, "total_firs_registered", e.target.value)}
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      onKeyDown={(e) => {
                        if (["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      inputMode="numeric"
                      style={{ appearance: "textfield" }}
                      className="w-full p-2 border rounded"
                      value={formValues[id]?.re_reg_firs || ""}
                      onChange={(e) => handleInputChange(id, "re_reg_firs", e.target.value)}
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      onKeyDown={(e) => {
                        if (["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      inputMode="numeric"
                      style={{ appearance: "textfield" }}
                      className="w-full p-2 border rounded"
                      value={formValues[id]?.total_transferred_zero_firs_in_mh || ""}
                      onChange={(e) => handleInputChange(id, "total_transferred_zero_firs_in_mh", e.target.value)}
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      onKeyDown={(e) => {
                        if (["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      inputMode="numeric"
                      style={{ appearance: "textfield" }}
                      className="w-full p-2 border rounded"
                      value={formValues[id]?.pending_for_transfer_within_mh || ""}
                      onChange={(e) => handleInputChange(id, "pending_for_transfer_within_mh", e.target.value)}
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      onKeyDown={(e) => {
                        if (["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      inputMode="numeric"
                      style={{ appearance: "textfield" }}
                      className="w-full p-2 border rounded"
                      value={formValues[id]?.pending_for_re_registration || ""}
                      onChange={(e) => handleInputChange(id, "pending_for_re_registration", e.target.value)}
                    />
                  </td>
                  {/* <td className="border px-4 py-2">
                    <button     className="bg-green-500 text-white px-2 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed" onClick={() => handleDuplicate(month)}>+</button>
                    {zeroFIRDiffMonths.some((item) => item.id === id) && (
                      <button  className="bg-red-500 text-white px-2 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed ml-2" onClick={() => handleRemoveDuplicate(id)}>-</button>
                    )}
                  </td> */}
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    );
  };



  const EFIRDetails = (
    monthsInRange,
    formValues,
    setFormValues,
    eFIRDiffMonths,
    setEFIRDiffMonths
  ) => {
    const getUniqueMonthId = (month) => `${month} - ${Date.now()}`;

    const handleDuplicate = (month) => {
      const newId = getUniqueMonthId(month);
      setEFIRDiffMonths((prev) => [...prev, { month, id: newId }]);
      setFormValues((prev) => ({
        ...prev,
        [newId]: {
          totalEComplaintsReceived: "",
          totalComplaintsConverted: "",
          disposedEComplaints: "",
        },
      }));
    };

    const handleRemoveDuplicate = (id) => {
      setEFIRDiffMonths((prev) => prev.filter((item) => item.id !== id));
      setFormValues((prev) => {
        const updatedValues = { ...prev };
        delete updatedValues[id];
        return updatedValues;
      });
    };

    const handleInputChange = (id, field, value) => {
      setFormValues((prev) => ({
        ...prev,
        [id]: { ...prev[id], [field]: value },
      }));
    };

    return (
      <div className="overflow-x-auto d-flex justify-center">
        <table className="w-full border border-gray-400 shadow-md">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="border px-4 py-2">Month-Year</th>
              <th className="border px-4 py-2">Total eComplaints Received on Citizen Portal</th>
              <th className="border px-4 py-2">Total eComplaints Converted to Regular FIRs</th>
              <th className="border px-4 py-2">Disposed of eComplaints</th>
              {/* <th className="border px-4 py-2">Action</th> */}
            </tr>
          </thead>
          <tbody>
            {[...monthsInRange.map((m) => ({ month: m, id: m })), ...eFIRDiffMonths].map(({ month, id }) => (
              <tr key={id}>
                <td className="border px-4 py-2">{month}</td>
                <td className="border px-4 py-2">
                  <input
                    className="w-full p-2 border rounded"
                    type="number"
                    onKeyDown={(e) => {
                      if (["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    inputMode="numeric"
                    style={{ appearance: "textfield" }}
                    value={formValues[id]?.totalEComplaintsReceived || ""}
                    onChange={(e) => handleInputChange(id, "totalEComplaintsReceived", e.target.value)}
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="number"
                    onKeyDown={(e) => {
                      if (["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    inputMode="numeric"
                    style={{ appearance: "textfield" }}
                    className="w-full p-2 border rounded"
                    value={formValues[id]?.totalComplaintsConverted || ""}
                    onChange={(e) => handleInputChange(id, "totalComplaintsConverted", e.target.value)}
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="number"
                    onKeyDown={(e) => {
                      if (["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    inputMode="numeric"
                    style={{ appearance: "textfield" }}
                    className="w-full p-2 border rounded"
                    value={formValues[id]?.disposedEComplaints || ""}
                    onChange={(e) => handleInputChange(id, "disposedEComplaints", e.target.value)}
                  />
                </td>
                {/* <td className="border px-4 py-2">
                  <button     className="bg-green-500 text-white px-2 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed" onClick={() => handleDuplicate(month)}>+</button>
                  {eFIRDiffMonths.some((item) => item.id === id) && (
                    <button  className="bg-red-500 text-white px-2 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed ml-2" onClick={() => handleRemoveDuplicate(id)}>-</button>
                  )}
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };


  const ITSSOComplianceForm = (
    monthsInRange,
    formValues,
    setFormValues,
    itssoDiffMonths,
    setItssoDiffMonths
  ) => {
    const getUniqueMonthId = (month) => `${month} - ${Date.now()}`;

    const handleDuplicate = (month) => {
      const newId = getUniqueMonthId(month);
      setItssoDiffMonths((prev) => [...prev, { month, id: newId }]);
      setFormValues((prev) => ({
        ...prev,
        [newId]: {
          total_pocso_bns_cases: "",
          charge_sheeted_within_60_days: "",
          percentage: "",
        },
      }));
    };

    const handleRemoveDuplicate = (id) => {
      setItssoDiffMonths((prev) => prev.filter((item) => item.id !== id));
      setFormValues((prev) => {
        const updatedValues = { ...prev };
        delete updatedValues[id];
        return updatedValues;
      });
    };

    const handleInputChange = (id, field, value) => {
      setFormValues((prev) => ({
        ...prev,
        [id]: { ...prev[id], [field]: value },
      }));
    };

    return (
      <div className="overflow-x-auto d-flex justify-center">
        <table className="w-full border border-gray-400 shadow-md">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="border px-4 py-2">Month-Year</th>
              <th className="border px-4 py-2">Total registered cases</th>
              <th className="border px-4 py-2">Cases chargesheeted (60 days)</th>
              <th className="border px-4 py-2">Compliance Rate</th>
              {/* <th className="border px-4 py-2">Action</th> */}
            </tr>
          </thead>
          <tbody>
            {[...monthsInRange.map((m) => ({ month: m, id: m })), ...itssoDiffMonths].map(
              ({ month, id }) => (
                <tr key={id}>
                  <td className="border px-4 py-2">{month}</td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      onKeyDown={(e) => {
                        if (["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      inputMode="numeric"
                      style={{ appearance: "textfield" }}
                      className="w-full p-2 border rounded"
                      value={formValues[id]?.total_pocso_bns_cases || ""}
                      onChange={(e) => handleInputChange(id, "total_pocso_bns_cases", e.target.value)}
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      onKeyDown={(e) => {
                        if (["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      inputMode="numeric"
                      style={{ appearance: "textfield" }}
                      className="w-full p-2 border rounded"
                      value={formValues[id]?.charge_sheeted_within_60_days || ""}
                      onChange={(e) =>
                        handleInputChange(id, "charge_sheeted_within_60_days", e.target.value)
                      }

                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      onKeyDown={(e) => {
                        if (["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      inputMode="numeric"
                      style={{ appearance: "textfield" }}
                      className="w-full p-2 border rounded"
                      value={formValues[id]?.percentage || ""}
                      onChange={(e) =>
                        handleInputChange(id, "percentage", e.target.value)
                      }
                    />
                  </td>
                  {/* <td className="border px-4 py-2">
                    <button
                          className="bg-green-500 text-white px-2 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={() => handleDuplicate(month)}
                    >
                      +
                    </button>
                    {itssoDiffMonths.some((item) => item.id === id) && (
                      <button
                         className="bg-red-500 text-white px-2 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed ml-2"
                        onClick={() => handleRemoveDuplicate(id)}
                      >
                        -
                      </button>
                    )}
                  </td> */}
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    );
  };




  const StolenRecoveredProperty = (
    monthsInRange,
    formValues,
    setFormValues,
    stolenDiffMonths,
    setStolenDiffMonths
  ) => {
    const crimeHeads = ["Dacoity", "Robbery", "HBT", "Theft"];

    const getUniqueMonthId = (month) => `${month} - ${Date.now()}`;

    const handleDuplicate = (month) => {
      const newId = getUniqueMonthId(month);
      setStolenDiffMonths((prev) => [...prev, { month, id: newId }]);
      setFormValues((prev) => ({
        ...prev,
        [newId]: {
          total_cases: "",
          offences_registered: "",
          value_stolen_property: "",
          detected_cases: "",
          value_recovered_property: "",
          recovery_percentage: "",
        },
      }));
    };

    const handleRemoveDuplicate = (id) => {
      setStolenDiffMonths((prev) => prev.filter((item) => item.id !== id));
      setFormValues((prev) => {
        const updatedValues = { ...prev };
        delete updatedValues[id];
        return updatedValues;
      });
    };

    const handleInputChange = (id, field, value) => {
      setFormValues((prev) => ({
        ...prev,
        [id]: { ...prev[id], [field]: value },
      }));
    };

    const getSelectedOptionsForMonth = (month) => {
      return Object.entries(formValues)
        .filter(([key, value]) => key.startsWith(month) && value?.total_cases)
        .map(([_, value]) => value.total_cases);
    };

    return (
      <div className="overflow-x-auto d-flex justify-center">
        <table className="w-full border border-gray-400 shadow-md">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="border px-4 py-2">Month-Year</th>
              <th className="border px-4 py-2">Crime Head</th>
              <th className="border px-4 py-2">Offences Registered</th>
              <th className="border px-4 py-2">Value of Stolen Property</th>
              <th className="border px-4 py-2">Detected Registered</th>
              <th className="border px-4 py-2">Value of Recovered Property</th>
              <th className="border px-4 py-2">Recovery %</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {[...monthsInRange.map((m) => ({ month: m, id: m })), ...stolenDiffMonths].map(
              ({ month, id }) => {
                const selectedOptions = getSelectedOptionsForMonth(month);
                return (
                  <tr key={id}>
                    <td className="border px-4 py-2">{month}</td>
                    <td className="border px-4 py-2">
                      <select
                        className="w-['100%'] p-2 border rounded"
                        value={formValues[id]?.total_cases || ""}
                        onChange={(e) => handleInputChange(id, "total_cases", e.target.value)}
                      >
                        <option value="" disabled>Select Crime Head</option>
                        {crimeHeads
                          .filter(
                            (option) =>
                              !selectedOptions.includes(option) || option === formValues[id]?.total_cases
                          )
                          .map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                      </select>
                    </td>
                    <td className="border px-4 py-2">
                      <input
                        type="number"
                        onKeyDown={(e) => {
                          if (["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(e.key)) {
                            e.preventDefault();
                          }
                        }}
                        inputMode="numeric"
                        style={{ appearance: "textfield" }}
                        className="w-full p-2 border rounded"
                        value={formValues[id]?.offences_registered || ""}
                        onChange={(e) => handleInputChange(id, "offences_registered", e.target.value)}
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <input
                        type="number"
                        onKeyDown={(e) => {
                          if (["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(e.key)) {
                            e.preventDefault();
                          }
                        }}
                        inputMode="numeric"
                        style={{ appearance: "textfield" }}
                        className="w-full p-2 border rounded"
                        value={formValues[id]?.value_stolen_property || ""}
                        onChange={(e) => handleInputChange(id, "value_stolen_property", e.target.value)}
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <input
                        type="number"
                        onKeyDown={(e) => {
                          if (["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(e.key)) {
                            e.preventDefault();
                          }
                        }}
                        inputMode="numeric"
                        style={{ appearance: "textfield" }}
                        className="w-full p-2 border rounded"
                        value={formValues[id]?.detected_cases || ""}
                        onChange={(e) => handleInputChange(id, "detected_cases", e.target.value)}
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <input
                        type="number"
                        onKeyDown={(e) => {
                          if (["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(e.key)) {
                            e.preventDefault();
                          }
                        }}
                        inputMode="numeric"
                        style={{ appearance: "textfield" }}
                        className="w-full p-2 border rounded"
                        value={formValues[id]?.value_recovered_property || ""}
                        onChange={(e) =>
                          handleInputChange(id, "value_recovered_property", e.target.value)
                        }
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <input
                        type="number"
                        onKeyDown={(e) => {
                          if (["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(e.key)) {
                            e.preventDefault();
                          }
                        }}
                        inputMode="numeric"
                        style={{ appearance: "textfield" }}
                        className="w-full p-2 border rounded"
                        value={formValues[id]?.recovery_percentage || ""}
                        onChange={(e) =>
                          handleInputChange(id, "recovery_percentage", e.target.value)
                        }
                      />
                    </td>

                    <td className="border px-4 py-2">
                      {selectedOptions.length < crimeHeads.length && (
                        <button     className="bg-green-500 text-white px-2 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed" disabled={!formValues[id]?.total_cases} onClick={() => handleDuplicate(month)}>+</button>
                      )}
                      {stolenDiffMonths.some((item) => item.id === id) && (
                        <button  className="bg-red-500 text-white px-2 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed ml-2" disabled={!formValues[id]?.total_cases} onClick={() => handleRemoveDuplicate(id)}>-</button>
                      )}
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </div>
    );
  };


  const ConvictionUnderBNS = (
    monthsInRange,
    formValues,
    setFormValues,
    convictionduplicatedMonths,
    setConvictionalDuplicatedMonths
  ) => {
    const getUniqueMonthId = (month) => `${month} - ${Date.now()}`;

    const convictionDataOption = {
      '285': '285',
      '281': '281',
      '287': '287',
      '303(2)': '303(2)',
      '125': '125',
      '305': '305',
      '223': '223',
      '293': '293',
      '289': '289'
    };

    // Handle duplication
    const handleDuplicate = (month) => {
      const newId = getUniqueMonthId(month);
      setConvictionalDuplicatedMonths((prev) => [...prev, { month, id: newId }]);
      setFormValues((prev) => ({
        ...prev,
        [newId]: {
          type_of_court: "",
          bns_sections: "",
          cases_decided: "",
          convicted_cases: "",
          conviction_rate: "",
          total_cases_convicted: "",
          total_cases_decided: "",
        },
      }));
    };

    // Remove duplicate row
    const handleRemoveDuplicate = (id) => {
      setConvictionalDuplicatedMonths((prev) => prev.filter((item) => item.id !== id));
      setFormValues((prev) => {
        const updatedValues = { ...prev };
        delete updatedValues[id];
        return updatedValues;
      });
    };

    // Handle input changes
    const handleInputChange = (id, field, value) => {
      setFormValues((prev) => ({
        ...prev,
        [id]: { ...prev[id], [field]: value },
      }));
    };

    // Get selected (court type, BNS section) pairs for a given month
    const getSelectedOptionsForMonth = (month) => {
      return Object.entries(formValues)
        .filter(([key, value]) => key.startsWith(month) && value?.bns_sections && value?.type_of_court)
        .map(([_, value]) => `${value.type_of_court}-${value.bns_sections}`);
    };

    return (
      <div className="overflow-x-auto d-flex justify-center">
        <table className="w-full border border-gray-400 shadow-md">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="border px-4 py-2">Month-Year</th>
              <th className="border px-4 py-2">Type of Court</th>
              <th className="border px-4 py-2">BNS Sections</th>
              <th className="border px-4 py-2">Cases Decided</th>
              <th className="border px-4 py-2">Convicted Cases</th>
              <th className="border px-4 py-2">Conviction Rate %</th>
              <th className="border px-4 py-2">Total Cases Convicted</th>
              <th className="border px-4 py-2">Total Cases Decided</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {[...monthsInRange.map((m) => ({ month: m, id: m })), ...convictionduplicatedMonths].map(({ month, id }) => {
              const selectedOptions = getSelectedOptionsForMonth(month); // Get unique selections

              return (
                <tr key={id}>
                  <td className="border px-4 py-2">{month}</td>
                  <td className="border px-4 py-2">
                    <select
                      className="w-['100%'] p-2 border rounded"
                      value={formValues[id]?.type_of_court || ""}
                      onChange={(e) => handleInputChange(id, "type_of_court", e.target.value)}
                    >
                      <option value="">Select</option>
                      <option value="Session">Session</option>
                      <option value="JMFC">JMFC</option>
                    </select>
                  </td>
                  <td className="border px-4 py-2">
                    <select
                      className="w-['100%'] p-2 border rounded"
                      value={formValues[id]?.bns_sections || ""}
                      onChange={(e) => handleInputChange(id, "bns_sections", e.target.value)}
                    >
                      <option value="">Select</option>
                      {Object.keys(convictionDataOption)
                        .filter((option) => {
                          const currentCourt = formValues[id]?.type_of_court;
                          if (!currentCourt) return true; // Allow selection if no court is chosen

                          // Ensure uniqueness for the same court type in the same month
                          return !selectedOptions.includes(`${currentCourt}-${option}`) || option === formValues[id]?.bns_sections;
                        })
                        .map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                    </select>
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      onKeyDown={(e) => {
                        if (["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      inputMode="numeric"
                      style={{ appearance: "textfield" }}
                      className="w-full p-2 border rounded"
                      value={formValues[id]?.cases_decided || ""}
                      onChange={(e) => handleInputChange(id, "cases_decided", e.target.value)}
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      onKeyDown={(e) => {
                        if (["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      inputMode="numeric"
                      style={{ appearance: "textfield" }}
                      className="w-full p-2 border rounded"
                      value={formValues[id]?.convicted_cases || ""}
                      onChange={(e) => handleInputChange(id, "convicted_cases", e.target.value)}
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      onKeyDown={(e) => {
                        if (["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      inputMode="numeric"
                      style={{ appearance: "textfield" }}
                      className="w-full p-2 border rounded"
                      value={formValues[id]?.conviction_rate || ""}
                      onChange={(e) => handleInputChange(id, "conviction_rate", e.target.value)}
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      onKeyDown={(e) => {
                        if (["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      inputMode="numeric"
                      style={{ appearance: "textfield" }}
                      className="w-full p-2 border rounded"
                      value={formValues[id]?.total_cases_convicted || ""}
                      onChange={(e) => handleInputChange(id, "total_cases_convicted", e.target.value)}
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      onKeyDown={(e) => {
                        if (["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      inputMode="numeric"
                      style={{ appearance: "textfield" }}
                      className="w-full p-2 border rounded"
                      value={formValues[id]?.total_cases_decided || ""}
                      onChange={(e) => handleInputChange(id, "total_cases_decided", e.target.value)}
                    />
                  </td>
                  <td className="border px-4 py-2">
  {selectedOptions.length < Object.keys(convictionDataOption).length * 2 && (
    <button
      className="bg-green-500 text-white px-2 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={!(formValues[id]?.type_of_court && formValues[id]?.bns_sections)} // Enable only if both are selected
      onClick={() => handleDuplicate(month)}
    >
      +
    </button>
  )}
  {convictionduplicatedMonths.some((item) => item.id === id) && (
    <button
      className="bg-red-500 text-white px-2 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed ml-2"
      disabled={!(formValues[id]?.type_of_court && formValues[id]?.bns_sections)} // Enable only if both are selected
      onClick={() => handleRemoveDuplicate(id)}
    >
      -
    </button>
  )}
</td>


                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };




  const VisitOfForensicTeams = (
    monthsInRange,
    formValues,
    setFormValues,
    forensicDiffMonths,
    setForensicDiffMonths
  ) => {
    const getUniqueMonthId = (month) => `${month} - ${Date.now()}`;

    const handleDuplicate = (month) => {
      const newId = getUniqueMonthId(month);
      setForensicDiffMonths((prev) => [...prev, { month, id: newId }]);
      setFormValues((prev) => ({
        ...prev,
        [newId]: {
          total_cases_gt_7_years: "",
          cases_forensic_team_visited: "",
          forensic_team_deployment_percentage: "",
        },
      }));
    };

    const handleRemoveDuplicate = (id) => {
      setForensicDiffMonths((prev) => prev.filter((item) => item.id !== id));
      setFormValues((prev) => {
        const updatedValues = { ...prev };
        delete updatedValues[id];
        return updatedValues;
      });
    };

    const handleInputChange = (id, field, value) => {
      setFormValues((prev) => ({
        ...prev,
        [id]: { ...prev[id], [field]: value },
      }));
    };

    return (
      <div className="overflow-x-auto d-flex justify-center">
        <table className="w-full border border-gray-400 shadow-md">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="border px-4 py-2">Month-Year</th>
              <th className="border px-4 py-2">Cases (7+ years punishment)</th>
              <th className="border px-4 py-2">Forensic Team Visits</th>
              <th className="border px-4 py-2">Deployment %</th>
              {/* <th className="border px-4 py-2">Action</th> */}
            </tr>
          </thead>
          <tbody>
            {[...monthsInRange.map((m) => ({ month: m, id: m })), ...forensicDiffMonths].map(
              ({ month, id }) => (
                <tr key={id}>
                  <td className="border px-4 py-2">{month}</td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      onKeyDown={(e) => {
                        if (["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      inputMode="numeric"
                      style={{ appearance: "textfield" }}
                      className="w-full p-2 border rounded"
                      value={formValues[id]?.total_cases_gt_7_years || ""}
                      onChange={(e) => handleInputChange(id, "total_cases_gt_7_years", e.target.value)}
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      onKeyDown={(e) => {
                        if (["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      inputMode="numeric"
                      style={{ appearance: "textfield" }}
                      className="w-full p-2 border rounded"
                      value={formValues[id]?.cases_forensic_team_visited || ""}
                      onChange={(e) => handleInputChange(id, "cases_forensic_team_visited", e.target.value)}

                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      onKeyDown={(e) => {
                        if (["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      inputMode="numeric"
                      style={{ appearance: "textfield" }}
                      className="w-full p-2 border rounded"
                      value={formValues[id]?.forensic_team_deployment_percentage || ""}
                      onChange={(e) => handleInputChange(id, "forensic_team_deployment_percentage", e.target.value)}

                    />
                  </td>
                  {/* <td className="border px-4 py-2">
                    <button
                          className="bg-green-500 text-white px-2 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={() => handleDuplicate(month)}
                    >
                      +
                    </button>
                    {forensicDiffMonths.some((item) => item.id === id) && (
                      <button
                         className="bg-red-500 text-white px-2 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed ml-2"
                        onClick={() => handleRemoveDuplicate(id)}
                      >
                        -
                      </button>
                    )}
                  </td> */}
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    );
  };





  const Modified = (monthsInRange) => {

    return (


      <div className="p-4 border rounded-lg shadow-md">
        {[
          { key: "training", label: "Training Data" },
          { key: "pendency", label: "Pendency of cases under BNS" },
          { key: "untraced", label: "Untraced Missing" },
          { key: "offences_against", label: "Offences against body under BNS" },
          { key: "important_bns", label: "Important sections introduced in BNS" },
          { key: "property_offences", label: "Property Offences under BNS" },
          { key: "esakshya", label: "eSakshya Details" },
          { key: "esakshya_app", label: "Use of eSakshya App in cases with punishment of 7 yrs. or more" },
          { key: "zero_fir", label: "Zero FIR's" },
          { key: "eFIR", label: "eFIR's" },
          { key: "ITSSO", label: "ITSSO Compliance Form" },
          { key: "stolen_recover", label: "Stolen & Recovered Property" },
          { key: "conviction_bns", label: "Conviction Under BNS" },
          { key: "forensic_visits", label: "Forensic visits" },
        ].map((section) => (
          <div key={section.key}>
            <button
              className={`px-4 py-2 rounded w-full text-center mb-1 ${openSection === section.key ? "bg-blue-400 text-white" : "bg-gray-700 text-white"
                }`}
              onClick={() => toggleSection(section.key)}
            >
              {section.label}
            </button>

            <div className={`overflow-hidden transition-all duration-500 ${openSection === section.key ? "opacity-100 max-h-screen" : "max-h-0 opacity-0"
              }`}>
              {(() => {
                switch (section.key) {
                  case "training": return TrainingForm(monthsInRange, formValues, setFormValues, trainingDuplicatedMonths, setTrainingDuplicatedMonths);
                  case "pendency": return pendencyForm(monthsInRange, formValues, setFormValues, pendencyDuplicatedMonths, setPendencyDuplicatedMonths);
                  case "untraced": return untraced(monthsInRange, formValues, setFormValues, untracedDuplicatedMonths, setUntracedDuplicatedMonths);
                  case "offences_against": return offencesAgainstBody(monthsInRange, formValues, setFormValues, offencesDuplicatedMonths, setOffencesDuplicatedMonths);
                  case "important_bns": return ImportantAgainstBody(monthsInRange, formValues, setFormValues, importantDuplicatedMonths, setImportantDuplicatedMonths);
                  case "property_offences": return PropertyAgainstBody(monthsInRange, formValues, setFormValues, propertyDuplicatedMonths, setPropertyDuplicatedMonths);
                  case "esakshya": return esakshyaDetails(monthsInRange, formValues, setFormValues, esakshyaDuplicatedMonths, setEsakshyaDuplicatedMonths);
                  case "esakshya_app": return useOfEsakshyaDetails(monthsInRange, formValues, setFormValues, esakshyaDiffMonths, setEsakshyaDiffMonths);
                  case "zero_fir": return ZeroFIRDetails(monthsInRange, formValues, setFormValues, zeroFIRDiffMonths, setZeroFIRDiffMonths);
                  case "eFIR": return EFIRDetails(monthsInRange, formValues, setFormValues, eFIRDiffMonths, setEFIRDiffMonths);
                  case "ITSSO": return ITSSOComplianceForm(monthsInRange, formValues, setFormValues, itssoDiffMonths, setItssoDiffMonths);
                  case "stolen_recover": return StolenRecoveredProperty(monthsInRange, formValues, setFormValues, stolenDiffMonths, setStolenDiffMonths);
                  case "conviction_bns": return ConvictionUnderBNS(monthsInRange, formValues, setFormValues, convictionduplicatedMonths, setConvictionalDuplicatedMonths);
                  case "forensic_visits": return VisitOfForensicTeams(monthsInRange, formValues, setFormValues, forensicDiffMonths, setForensicDiffMonths);
                  default: return null;
                }
              })()}
            </div>
          </div>
        ))}
      </div>

    );
  };








  return (
    <>

      {


        (<Dialog
          open={open}
          onClose={onClose}
          fullWidth
          maxWidth={false} // Disables default maxWidth limitations
          PaperProps={{
            sx: { width: "70vw", maxWidth: "none", margin: "auto" }
          }}
        >

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
                      <label className="block text-sm font-medium">From Month</label>

                      {
                        uploadDate.fromDate ?

                          (
                            <input type="text" className="w-full p-2 border rounded" value={uploadDate.fromDate} />
                          )

                          : (<input
                            type="month"
                            className="w-full p-2 border rounded"
                            value={formData.fromDate || dateRange.fromDate}
                            onChange={(e) => {
                              const newFromDate = e.target.value;
                              // handleDateChange(e, "fromDate")
                              if (!formData.toDate || newFromDate <= formData.toDate) {
                                setFormData({ ...formData, fromDate: newFromDate });
                              }
                            }}
                          />)

                      }

                    </FormControl>

                    <FormControl fullWidth>
                      <label className="block text-sm font-medium">To Month</label>
                      {
                        uploadDate.toDate ?

                          (
                            <input type="text" className="w-full p-2 border rounded" value={uploadDate.toDate} />
                          )

                          : (<input
                            type="month"
                            className="w-full p-2 border rounded"
                            value={formData.toDate || dateRange.toDate}
                            onChange={(e) => {
                              const newToDate = e.target.value;
                              if (!formData.fromDate || newToDate >= formData.fromDate) {
                                setFormData({ ...formData, toDate: newToDate });
                              }
                            }}
                          />)

                      }

                      {formData.fromDate && formData.toDate < formData.fromDate && (
                        <p className="text-red-500 text-sm mt-1">
                          To Month Should not be Exceded From Month.
                        </p>
                      )}
                    </FormControl>

                  </Box>





                  {monthsInRange.length > 0 ? (
                    <div className="mt-4">

                      <div className="mt-4">

                        {Modified(monthsInRange)}

                      </div>

                    </div>
                  ) : (
                    <div className="mt-4 text-center font-semibold">Please select a Month/Year range.</div>
                  )}

                </Box>
              )}
              {selectedTab === "upload" && (
                <Box display="flex" flexDirection="column" gap={2} minHeight="60vh">


                  <Box>

                    <Button variant="contained" component="label" startIcon={<CloudUploadIcon />} sx={{ backgroundColor: "#4a5568", "&:hover": { backgroundColor: "#5a667a" } }}  >
                      Upload File
                      <input type="file" hidden accept=".csv,.xls,.xlsx" ref={fileInputRef} onChange={handleFileChange} />
                    </Button>

                    <Button variant="contained" startIcon={<Download />} onClick={generateCSV} sx={{ ml: 2, backgroundColor: "#4a5568", "&:hover": { backgroundColor: "#5a667a" } }}>
                      Download Sample
                    </Button>

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
                        {csvData.map((sheet, sheetIndex) => (
                          <div key={sheetIndex}>
                            {/* Table Title */}
                            <Typography
                              variant="h6"
                              sx={{
                                fontWeight: "bold",
                                color: "#2d3748",
                                marginTop: "1rem",
                                textTransform: "uppercase",
                              }}
                            >
                              {sheet.table}
                            </Typography>

                            <Box
                              component="table"
                              sx={{
                                width: "1000px",
                                borderCollapse: "collapse",
                                tableLayout: "fixed",
                                marginBottom: "20px",
                              }}
                            >
                              <thead>
                                <tr>
                                  {sheet.data[0]?.columns.map((col, index) => (
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
                                        maxWidth: "140px",
                                      }}
                                    >
                                      {col.column_name}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {sheet.data.map((row, rowIndex) => (
                                  <tr
                                    key={rowIndex}
                                    style={{
                                      backgroundColor: rowIndex % 2 === 0 ? "#ffffff" : "#f7f7f7",
                                    }}
                                  >
                                    {row.columns.map((cell, cellIndex) => (
                                      <td
                                        key={cellIndex}
                                        style={{
                                          border: "1px solid #ddd",
                                          padding: "8px",
                                          textAlign: "center",
                                          whiteSpace: "nowrap",
                                          overflow: "hidden",
                                          textOverflow: "ellipsis",
                                          maxWidth: "150px",
                                        }}
                                      >
                                        {/* Display the cell value */}
                                        <div>{cell.value !== NaN && cell.value !== undefined && cell.value !== null && cell.value !== "" ? cell.value : "-"}</div>

                                        {/* If there is an error, display the message below */}
                                        {cell.error && (
                                          <div
                                            style={{
                                              marginTop: "5px",
                                              color: "#a00",
                                              fontSize: "12px",
                                              fontWeight: "bold",
                                              backgroundColor: "#ffcccc",
                                              padding: "2px",
                                              borderRadius: "4px",
                                            }}
                                          >
                                            {cell.message}
                                          </div>
                                        )}
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>

                            </Box>
                          </div>
                        ))}
                      </Box>
                    )}

                  </Box>
                  {fileInfo && <Typography>File: {fileInfo.name} ({fileInfo.size})</Typography>}
                </Box>
              )}

              {/* {showPreview && <TrainingDataTable     data={Object.entries(formValues).map(([month, values]) => ({ month_year: month, ...values }))}
  onSubmit={handleSubmit} onEdit={handleEdit} />} */}

              {/* {formValues != {} && (<TrainingDataTable
                open={dialogOpen}
                onClose={() => {
                  window.location.reload();
                  setDialogOpen(false);
                }}
                data={formValues}
                onSubmit={handleSubmit}
                onEdit={handleEdit}
              />)} */}

              {Object.keys(formValues).length > 0 && (
                <TrainingDataTable
                  open={dialogOpen}
                  onClose={() => {
                    window.location.reload();
                    setDialogOpen(false);
                  }}
                  data={previewData} // Now sending formValues, whether from form input or uploaded file

                />
              )}


              <Box sx={{ padding: 2, borderTop: "1px solid #ddd", backgroundColor: "#f9f9f9", display: 'flex', justifyContent: "center" }}>

                <Button
                  fullWidth
                  variant="contained"
                  sx={{ backgroundColor: "#2d3748", color: "white", width: "30%" }}
                  disabled={!verified}
                  onClick={() => {
                    handleSubmit();
                    selectedTab == 'upload' ? setDialogOpen(false) : setDialogOpen(true) // Opens dialog
                  }}

                >
                  Submit
                </Button>
                {/* <Button fullWidth variant="contained" disabled={!verified} sx={{ backgroundColor: "#2d3748", color: "white", width: "30%" }} onClick={handleSubmit}>
                  Submit
                </Button> */}



              </Box>
            </DialogContent>
          </Box>
        </Dialog>)
      }

    </>
  );
};

export default ModalComponent;


