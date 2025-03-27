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






const ModalComponent = ({ open, type, onClose, training_active, dateRange }) => {
  const [selectedOption, setSelectedOption] = useState("");
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

      total_trained: "",
      total_trained_percentage: "",
      

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

  const expectedHeaders = {

    "pendency_in_bns": [
      "total_cases_registered",
      "cases_disposed",
      "cases_pending_investigation",
      "percent_pendency",
      "cases_punishment_less_than_7_years",
      "cases_punishment_7_years_or_more",

    ],
    "Offences_against_body_under_BNS": [
      "unit",
      "police_station",
      "act_and_section",
      "registered_cases",
      "detected_cases",
      "percent_detection",

    ],
    "untraced_missing": [
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

    ],
    "Important_sections_introduced_in_BNS": [
      "district",
      "unit",
      "police_station",
      "act_and_section",
      "registered_cases",
      "detected_cases",
      "percent_detection",

    ],
    "Property_offences_under_BNS": [
      "unit",
      "police_station",
      "act_and_section",
      "registered_cases",
      "detected_cases",
      "percent_detection",

    ],
    "esakshya_unit": [
      "unit",
      "total_ios_nagpur_rural",
      "registered_ios_on_esakshya",
      "esakshya_usage_percentage",

    ],

    "esakshya_7_more": [
      "total_cases",
      "total_offences_with_esakshya",
      "total_charge_sheeted_with_esakshya",
      "total_under_investigation_without_esakshya",

    ],

    "fir_and_zero_firs": [
      "unit",
      "section",
      "total_zero_firs_received",
      "total_firs_registered",
      "pending",
      "total_transferred_zero_firs",

    ],

    "e_fir": [
      "unit",
      "police_station",
      "total_ecomplaints_received",
      "total_ecomplaints_converted_to_firs",
      "disposed_of_ecomplaints",

    ],
    "itsso_compliance": [

      "charge_sheeted_within_60_days",
      "total_pocso_bns_cases",
      "reasons_for_pending",
      "percentage",

    ],
    "stolen_recovered_property": [
      "total_cases",
      "value_stolen_property",
      "value_recovered_property",
      "recovery_percentage",
      "detected_cases",
      "offences_registerd",

    ],
    "forensic_team_deployment": [
      "total_cases_gt_7_years",
      "forensic_team_deployment_percentage",
      "cases_forensic_team_visited",

    ],

    "police_training": ["total_personnel", "personnel_trained", "total_officers", "officers_trained", "total-trained", 'total_trained_percentage'],

    "conviction_rate_in_bns": [
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
      "officers_trained": "Officers Trained",
      "total_trained": "Total Trained",
      "total_trained_percentage": "Total Trained %",
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



  const handleSubmit = async () => {
    try {

      const token = localStorage.getItem("token");

      let apiRoute = selectedTab === "upload" ? "/submit_details" : "/fir_form";

      // Extract form values based on types
      const transformedData = {
        police_training: Object.keys(formValues).map((month) => ({
          month_year: month,
          type: "police_training",
          total_personnel: formValues[month].total_personnel || "",
          total_officers: formValues[month].total_officers || "",
          personnel_trained: formValues[month].personnel_trained || "",
          officers_trained: formValues[month].officers_trained || "",
          percent_personnel_trained: formValues[month].percent_personnel_trained || "",
          percent_officers_trained: formValues[month].percent_officers_trained || "",
          overall_cumulative: formValues[month].overall_cumulative || "",
          total_trained: formValues[month].total_trained || "",
          total_trained_percentage: formValues[month].total_trained_percentage || "",
        })),

        pendency: Object.keys(formValues).map((month) => ({
          month_year: month,
          type: "pendency_in_bns",
          totalCases: formValues[month].totalCases || "",
          disposedCases: formValues[month].disposedCases || "",
          pendingCases: formValues[month].pendingCases || "",
          pendingPercentage: formValues[month].pendingPercentage || "",
          punishmentLessThan7: formValues[month].punishmentLessThan7 || "",
          punishmentMoreThan7: formValues[month].punishmentMoreThan7 || "",
        })),

        offences_against_body: Object.keys(formValues).map((month) => ({
          month_year: month,
          type: "offences_against_body",
          actAndSection: formValues[month].actAndSection || "",
          registeredCases: formValues[month].registeredCases || "",
          detectedCases: formValues[month].detectedCases || "",
          detectedCasesPercentage: formValues[month].detectedCasesPercentage || "",
        })),

        untraced_missing: Object.keys(formValues).map((month) => ({
          month_year: month,
          type: "untraced_missing",
          ageGroup: formValues[month].ageGroup || "",
          untracedPersons: formValues[month].untracedPersons || "",
          missingPersons: formValues[month].missingPersons || "",
          totalMissing: formValues[month].totalMissing || "",
          traced: formValues[month].traced || "",
          untraced: formValues[month].untraced || "",
          untracedPercentage: formValues[month].untracedPercentage || "",
        })),

        sections_in_bns: Object.keys(formValues).map((month) => ({
          month_year: month,
          type: "sections_in_bns",
          actAndSection_1: formValues[month].actAndSection_1 || "",
          registeredCases_1: formValues[month].registeredCases_1 || "",
          detectedCases_1: formValues[month].detectedCases_1 || "",
          detectedCasesPercentage_1: formValues[month].detectedCasesPercentage_1 || "",
        })),

        property_offenses: Object.keys(formValues).map((month) => ({
          month_year: month,
          type: 'property_offenses',
          actAndSection_2: formValues[month].actAndSection_2 || "",
          registeredCases_2: formValues[month].registeredCases_2 || "",
          detectedCases_2: formValues[month].detectedCases_2 || "",
          detectedCasesPercentage_2: formValues[month].detectedCasesPercentage_2 || "",
        })),

        esakshya_units: Object.keys(formValues).map((month) => ({
          month_year: month,
          type: "esakshya_units",
          totalIOsEsakshyaRegistered: formValues[month].totalIOsEsakshyaRegistered || "",
          totalIOsEsakshyaDownload: formValues[month].totalIOsEsakshyaDownload || "",
          esakshyaWage_1: formValues[month].esakshyaWage_1 || "",
        })),

        esakshya_7_more: Object.keys(formValues).map((month) => ({
          month_year: month,
          type: "esakshya_7_more",
          cases_registered: formValues[month].cases_registered || "",
          cases_esakshya_used: formValues[month].cases_esakshya_used || "",
          cases_esakshya_not_used: formValues[month].cases_esakshya_not_used || "",
          esakshya_usage_percent: formValues[month].esakshya_usage_percent || "",
          esakshya_used_charge_sheeted: formValues[month].esakshya_used_charge_sheeted || "",
          esakshya_not_used_invest: formValues[month].esakshya_not_used_invest || "",


        })),

        fir_and_zero_firs: Object.keys(formValues).map((month) => ({
          month_year: month,
          type: "fir_and_zero_firs",
          total_no_zero_fir_transferred_outside_mh: formValues[month].total_no_zero_fir_transferred_outside_mh || "",
          total_no_zero_fir_transferred_outer_state_to_mh: formValues[month].total_no_zero_fir_transferred_outer_state_to_mh || "",
          total_zero_firs: formValues[month].total_zero_firs || "",
          pending_to_transfer_outside_mh: formValues[month].pending_to_transfer_outside_mh || "",
          total_firs_registered: formValues[month].total_firs_registered || "",
          re_reg_firs: formValues[month].re_reg_firs || "",
          total_transferred_zero_firs_in_mh: formValues[month].total_transferred_zero_firs_in_mh || "",
          pending_for_transfer_within_mh: formValues[month].pending_for_transfer_within_mh || "",
          pending_for_re_registration: formValues[month].pending_for_re_registration || "",
        })),

        e_fir: Object.keys(formValues).map((month) => ({
          month_year: month,
          type: "e_fir",
          totalEComplaintsReceived: formValues[month].totalEComplaintsReceived || "",
          totalComplaintsConverted: formValues[month].totalComplaintsConverted || "",
          disposedEComplaints: formValues[month].disposedEComplaints || "",
        })),

        itsso_compliance: Object.keys(formValues).map((month) => ({
          month_year: month,
          type: "itsso_compliance",
          total_pocso_bns_cases: formValues[month].total_pocso_bns_cases || "",
          charge_sheeted_within_60_days: formValues[month].charge_sheeted_within_60_days || "",
          percentage: formValues[month].percentage || "",
        })),

        stolen_recovered_property: Object.keys(formValues).map((month) => ({
          month_year: month,
          type: "stolen_recovered_property",
          total_cases: formValues[month].total_cases || "",
          offences_registered: formValues[month].offences_registered || "",
          value_stolen_property: formValues[month].value_stolen_property || "",
          detected_cases: formValues[month].detected_cases || "",
          value_recovered_property: formValues[month].value_recovered_property || "",
          recovery_percentage: formValues[month].recovery_percentage || "",
        })),

        conviction_rate_in_bns: Object.keys(formValues).map((month) => ({
          month_year: month,
          type: "conviction_rate_in_bns",
          type_of_court: formValues[month].type_of_court || "",
          bns_sections: formValues[month].bns_sections || "",
          cases_decided: formValues[month].cases_decided || "",
          convicted_cases: formValues[month].convicted_cases || "",
          conviction_rate: formValues[month].conviction_rate || "",
          total_cases_convicted: formValues[month].total_cases_convicted || "",
          total_cases_decided: formValues[month].total_cases_decided || "",
        })),

        forensic_visits: Object.keys(formValues).map((month) => ({
          month_year: month,
          type: "forensic_visits",
          total_cases_gt_7_years: formValues[month].total_cases_gt_7_years || "",
          cases_forensic_team_visited: formValues[month].cases_forensic_team_visited || "",
          forensic_team_deployment_percentage: formValues[month].forensic_team_deployment_percentage || "",
        })),

      };

      // const reportData = {
      //   'Police Training': Object.keys(formValues).map((month) => ({
      //     'Month-Year': month,
      //     "Total Constabulary": formValues[month].total_personnel || 0,
      //     'Constabulary Trained': formValues[month].total_officers || 0,
      //     '% Constabulary Trained': formValues[month].personnel_trained || 0,
      //     'Total Officers': formValues[month].officers_trained || 0,
      //     'Officers Trained': formValues[month].percent_personnel_trained || 0,
      //     '% Officers Trained': formValues[month].percent_officers_trained || 0,
      //     // 'Overall Cumulative': formValues[month].overall_cumulative || 0,
      //     'Total Trained': formValues[month].total_trained || 0,
      //     'Total Trained %': formValues[month].total_trained_percentage || 0,
      //   })),
        const reportData = {
          'Police Training': Object.keys(formValues).map((month) => ({
            'Month-Year': month,
            "Total Constabulary": formValues[month].total_personnel || 0,
            'Constabulary Trained': formValues[month].total_officers || 0,
            '% Constabulary Trained': formValues[month].personnel_trained || 0,
            'Total Officers': formValues[month].officers_trained || 0,
            'Officers Trained': formValues[month].percent_personnel_trained || 0,
            '% Officers Trained': formValues[month].percent_officers_trained || 0,
            // 'Overall Cumulative': formValues[month].overall_cumulative || 0,
            'Total Trained': formValues[month].total_trained || 0,
            'Total Trained %': formValues[month].total_trained_percentage || 0,
          })),

        'Pendency of cases under BNS': Object.keys(formValues).map((month) => ({
          'Month-Year': month,
          "Total Cases": formValues[month].totalCases || 0,
          "Disposed Cases": formValues[month].disposedCases || 0,
          "Pending Cases": formValues[month].pendingCases || 0,
          "Pending Percentage": formValues[month].pendingPercentage || 0,
          "Punishment Less Than 7 yrs.": formValues[month].punishmentLessThan7 || 0,
          "Punishment More Than 7 yrs.": formValues[month].punishmentMoreThan7 || 0,
        })),

        'Offences Against Body under BNS': Object.keys(formValues).map((month) => ({
          'Month-Year': month,
          "Act and Section": formValues[month].actAndSection || 0,
          "Registered Cases": formValues[month].registeredCases || 0,
          "Detected Cases": formValues[month].detectedCases || 0,
          "Detected Cases %": formValues[month].detectedCasesPercentage || 0,
        })),

        'Untraced Missing': Object.keys(formValues).map((month) => ({
          'Month-Year': month,
          "Age Group": formValues[month].ageGroup || 0,
          "Untraced Persons": formValues[month].untracedPersons || 0,
          "Missing Persons": formValues[month].missingPersons || 0,
          "Total Missing Persons": formValues[month].totalMissing || 0,
          "Traced": formValues[month].traced || 0,
          "Untraced": formValues[month].untraced || 0,
          "Untraced %": formValues[month].untracedPercentage || 0,
        })),

        'Sections Under BNS': Object.keys(formValues).map((month) => ({
          'Month-Year': month,
          "Act and Section": formValues[month].actAndSection || 0,
          "Registered Cases": formValues[month].registeredCases || 0,
          "Detected Cases": formValues[month].detectedCases || 0,
          "Detected Cases %": formValues[month].detectedCasesPercentage || 0,
        })),

        'Property Offences under BNS': Object.keys(formValues).map((month) => ({
          'Month-Year': month,
          "Act and Section": formValues[month].actAndSection || 0,
          "Registered Cases": formValues[month].registeredCases || 0,
          "Detected Cases": formValues[month].detectedCases || 0,
          "Detected Cases %": formValues[month].detectedCasesPercentage || 0,
        })),

        'eSakshya Details': Object.keys(formValues).map((month) => ({
          'Month-Year': month,
          "Total IO's eSaklshya Registered": formValues[month].totalIOsEsakshyaRegistered || 0,
          "Total IO's eSakshya Downloaded": formValues[month].totalIOsEsakshyaDownload || 0,
          "eSakshya Wage": formValues[month].esakshyaWage_1 || 0,
        })),

        'Use of eSakshya App. in cases with punishment of 7 yrs. or more': Object.keys(formValues).map((month) => ({
            'Month-Year': month, 
            "Total IO's eSaklshya Registered": formValues[month].totalIOsNagapur || 0,
            "Total IO's eSakshya Downloaded": formValues[month].totalIOsEsakshya || 0,
            "eSakshya Wage": formValues[month].esakshyaWage || 0,
        })),

        "Zero FIR's": Object.keys(formValues).map((month) => ({
          'Month-Year': month,
          'Total No. Zero FIRs Transferred Outside Maharashtra': formValues[month].total_no_zero_fir_transferred_outside_mh || 0,
          "Total No. Zero FIRs Transferred Outer State to Maharashtra": formValues[month].total_no_zero_fir_transferred_outer_state_to_mh || 0,
          "Total Zero FIRs": formValues[month].total_zero_firs || 0,
          "Pending To Transfer Outside Maharashtra": formValues[month].pending_to_transfer_outside_mh || 0,
          "Total FIRs Registered": formValues[month].total_firs_registered || 0,
          "Re-Register FIRs": formValues[month].re_reg_firs || 0,
          "Total Transferred Zero FIRs in Maharashtra": formValues[month].total_transferred_zero_firs_in_mh || 0,
          "Pending For Transfer Within Maharashtra": formValues[month].pending_for_transfer_within_mh || 0,
          "Pending For Re-Registration": formValues[month].pending_for_re_registration || 0,
        })),

        'eFIR': Object.keys(formValues).map((month) => ({
          'Month-Year': month,
          "Total EComplaints Received": formValues[month].totalEComplaintsReceived || 0,
          "Total Complaints Converted": formValues[month].totalComplaintsConverted || 0,
          'Disposed EComplaints': formValues[month].disposedEComplaints || 0,
        })),

        'ITSSO (Investigation Tracking System for Sexual offences)': Object.keys(formValues).map((month) => ({
          'Month-Year': month,
          "Total Pocso BNS Cases": formValues[month].total_pocso_bns_cases || 0,
          "No. Charge Sheet Within 60 Days": formValues[month].charge_sheeted_within_60_days || 0,
          "Percentage": formValues[month].percentage || 0,
        })),

        'Stolen / Recovered Property': Object.keys(formValues).map((month) => ({
          'Month-Year': month,
          "Total Cases": formValues[month].total_cases || 0,
          "Offences Registered": formValues[month].offences_registered || 0,
          "Value Stolen Property": formValues[month].value_stolen_property || 0,
          "Detected Cases": formValues[month].detected_cases || 0,
          "Value Recovered Property": formValues[month].value_recovered_property || 0,
          "Recovery %": formValues[month].recovery_percentage || 0,
        })),

        'Conviction under BNS': Object.keys(formValues).map((month) => ({
          'Month-Year': month,
          "Type of Court": formValues[month].type_of_court || 0,
          "BNS Section": formValues[month].bns_sections || 0,
          "Cases Decided": formValues[month].cases_decided || 0,
          "Convicted Cases": formValues[month].convicted_cases || 0,
          "Convicted Rate": formValues[month].conviction_rate || 0,
          "Total Cases Convicted": formValues[month].total_cases_convicted || 0,
          "Total Cases Decided": formValues[month].total_cases_decided || 0,
        })),

        'Visit of Forensic Teams': Object.keys(formValues).map((month) => ({
          'Month-year': month,
          "Total Cases Greater Than 7 yrs.": formValues[month].total_cases_gt_7_years || 0,
          "Cases Forensic Team Visited": formValues[month].cases_forensic_team_visited || 0,
          "Forensic Team Deployment %": formValues[month].forensic_team_deployment_percentage || 0,
        })),
      };

      let requestBody = {}
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
      alert("Failed to insert data.");
    }
  };



  // useEffect(() => {
  //   const fetchConvictionData = async () => {
  //     try {
  //       const response = await axios.get("http://192.168.1.33:5555/api/conviction");
  //       setConvictionData(response.data);
  //     } catch (error) {
  //       console.error("Error fetching conviction data:", error);
  //     }
  //   };

  //   fetchConvictionData();
  // }, []);

  // Handle BNS Section selection
  const handleBnsSectionChange = (e) => {
    const selectedSection = e.target.value;

    // Find matching data
    const matchedData = convictionData.find((item) => item.bns_section === selectedSection);

    setFormData((prev) => ({
      ...prev, // Preserve other form data
      bns_sections: selectedSection,
      total_cases_convicted: matchedData ? matchedData.total_cases_convicted : "0",
      total_cases_decided: matchedData ? matchedData.total_cases_decided : "0",
    }));
  };

  useEffect(() => {
    console.log(formData.total_cases_convicted, formData.total_cases_decided, formData.bns_sections, "...................tpaoca.........");
  }, [formData]); // Runs whenever formData changes


  // ================================================================================================================
  // ========================kiran_kumar====================================

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

      setFormValues((prev) => ({
        ...prev,
        [monthKey]: {
          total_personnel: "",
          total_officers: "",
          personnel_trained: "",
          officers_trained: "",
          percent_personnel_trained: "",
          percent_officers_trained: "",
          overall_cumulative: "",
          total_persons_trained: "",
          total_trained: "",
          total_trained_percentage: "",
        }
      }));

      start.setMonth(start.getMonth() + 1);
    }

    setMonthsInRange(months);
  };

  const handleExpand = (month) => {
    setExpandedMonth(expandedMonth === month ? null : month);
  };


  const [verified, setVerified] = useState(false);



  const handleInputChange = (month, field, value) => {
    console.log("month : ", month);
    console.log("field : ", field);
    console.log("value : ", value);

    setFormValues((prev) => {
      const updatedForm = { ...prev[month], [field]: value };





      // Perform calculations
      const totalPersonal = Number(updatedForm.total_personnel) || 0;
      const totalOfficers = Number(updatedForm.total_officers) || 0;
      const trainedPersonal = Number(updatedForm.personnel_trained) || 0;
      const trainedOfficers = Number(updatedForm.officers_trained) || 0;
      const total_trained = Number(updatedForm.total_trained) || 0;
      const total_trained_percentage = Number(updatedForm.total_trained_percentage) || 0;

      updatedForm.percent_personnel_trained =
        totalPersonal > 0 ? ((trainedPersonal / totalPersonal) * 100).toFixed(2) : "0.00";

      updatedForm.percent_officers_trained =
        totalOfficers > 0 ? ((trainedOfficers / totalOfficers) * 100).toFixed(2) : "0.00";

      updatedForm.overall_cumulative = (
        (Number(updatedForm.percent_personnel_trained) + Number(updatedForm.percent_officers_trained)) / 2
      ).toFixed(2);

      updatedForm.total_persons_trained = (trainedPersonal + trainedOfficers).toString();




      // if (formData.formType === 'Pendency of cases under BNS') {
      // Pendency calculations
      const totalCasesUnderBns = Number(updatedForm.totalCases) || 0;
      const disposedCases = Number(updatedForm.disposedCases) || 0;


      updatedForm.pendingCases =
        totalCasesUnderBns > 0 ? `${(totalCasesUnderBns - disposedCases)}` : "0";

      updatedForm.pendingPercentage =
        (totalCasesUnderBns > 0 && totalCasesUnderBns > disposedCases) ? ((disposedCases / totalCasesUnderBns) * 100).toFixed(2) : "0.00";

      // } else if (formData.formType === 'Untraced Missing') {

      const untracedPersons = Number(updatedForm.untracedPersons) || 0;
      const missingPersons = Number(updatedForm.missingPersons) || 0;
      const traced = Number(updatedForm.traced) || 0;

      updatedForm.totalMissing =
        untracedPersons > 0 ? `${(untracedPersons + missingPersons)}` : "0";


      updatedForm.untraced =
        untracedPersons > 0 ? `${(updatedForm.totalMissing - traced)}` : "0";


      updatedForm.untracedPercentage =
        (updatedForm.untraced > 0) ? ((updatedForm.untraced / updatedForm.totalMissing) * 100).toFixed(2) : "0.00";


      // } else if (formData.formType === 'Offences against body under BNS' || formData.formType === 'Important sections introduced in BNS' || formData.formType === 'Property offences under BNS') {

      const registeredCases = Number(updatedForm.registeredCases) || 0;
      const detectedCases = Number(updatedForm.detectedCases) || 0;

      updatedForm.detectedCasesPercentage =
        (registeredCases > 0) ? ((detectedCases / registeredCases) * 100).toFixed(2) : "0.00";
      // --- added by me pavan kalyan important sections in bns ---
      const registeredCases_1 = Number(updatedForm.registeredCases_1) || 0;
      const detectedCases_1 = Number(updatedForm.detectedCases_1) || 0;

      updatedForm.detectedCasesPercentage_1 =
        (registeredCases_1 > 0) ? ((detectedCases_1 / registeredCases_1) * 100).toFixed(2) : "0.00";

      // } else if (formData.formType === 'eSakshya Details') {

      const totalIOsEsakshya = Number(updatedForm.totalIOsEsakshya) || 0;
      const totalIOsNagapur = Number(updatedForm.totalIOsNagapur) || 0;

      updatedForm.esakshyaWage =
        (totalIOsNagapur > 0) ? ((totalIOsEsakshya / totalIOsNagapur) * 100).toFixed(2) : "0.00";

      // -----pavan -- esakshaya details ----
      const totalIOsEsakshyaRegistered = Number(updatedForm.totalIOsEsakshyaRegistered) || 0;
      const totalIOsEsakshyaDownload = Number(updatedForm.totalIOsEsakshyaDownload) || 0;

      updatedForm.esakshyaWage_1 =
        (totalIOsEsakshyaDownload > 0) ? ((totalIOsEsakshyaDownload / totalIOsEsakshyaRegistered) * 100).toFixed(2) : "0.00";
      // } else if (formData.formType === 'Use of eSakshya App in cases with punishment of 7 yrs. or more') {
      const totalCaseseSK = Number(updatedForm.totalCases) || 0;
      const totalOffencesUsedeSK = Number(updatedForm.totalOffencesUsed) || 0;
      updatedForm.percentageOfUsingEsakshya =
        (totalCaseseSK > 0) ? ((totalOffencesUsedeSK / totalCaseseSK) * 100).toFixed(2) : "0.00";

      updatedForm.totalOffencesNotUsed = totalCaseseSK - totalOffencesUsedeSK;

      // } else if (formData.formType === 'Use of eSakshya App in cases with punishment of 7 yrs. or more') {
      const totalCases = Number(updatedForm.totalCases) || 0;
      const totalOffencesUsed = Number(updatedForm.totalOffencesUsed) || 0;
      updatedForm.percentageOfUsingEsakshya =
        (totalCases > 0) ? ((totalOffencesUsed / totalCases) * 100).toFixed(2) : "0.00";

      updatedForm.totalOffencesNotUsed = totalCases - totalOffencesUsed;

      // } else if (formData.formType === "eFIR") {
      const totalEComplaintsReceived = Number(updatedForm.totalEComplaintsReceived) || 0;
      const totalComplaintsConverted = Number(updatedForm.totalComplaintsConverted) || 0;

      // Calculate Disposed of eComplaints
      updatedForm.disposedEComplaints = totalComplaintsConverted; // Assuming all converted complaints are disposed

      // Validation for Total Complaints Converted
      if (totalComplaintsConverted > totalEComplaintsReceived) {
        // Handle the error case as needed
        console.error("Total eComplaints Converted to Regular FIRs cannot exceed Total eComplaints Received on Citizen Portal.");
      }
      // } else if (formData.formType === "Zero FIR's") {
      const total_no_zero_fir_transferred_outside_mh = Number(updatedForm.total_no_zero_fir_transferred_outside_mh) || 0;
      const total_no_zero_fir_transferred_outer_state_to_mh = Number(updatedForm.total_no_zero_fir_transferred_outer_state_to_mh) || 0;
      const re_reg_firs = Number(updatedForm.re_reg_firs) || 0;
      const total_transferred_zero_firs_in_mh = Number(updatedForm.total_transferred_zero_firs_in_mh) || 0;

      updatedForm.total_zero_firs =
        total_no_zero_fir_transferred_outside_mh + total_no_zero_fir_transferred_outer_state_to_mh;

      updatedForm.pending_to_transfer_outside_mh =
        Math.max(0, updatedForm.total_zero_firs - total_no_zero_fir_transferred_outside_mh);

      updatedForm.pending_for_transfer_within_mh =
        Math.max(0, re_reg_firs - total_transferred_zero_firs_in_mh);

      updatedForm.pending_for_re_registration =
        Math.max(0, total_no_zero_fir_transferred_outer_state_to_mh - re_reg_firs);




      // } else if (formData.formType === "ITSSO Compliance Form") {
      const charge_sheeted_within_60_days = Number(updatedForm.charge_sheeted_within_60_days) || 0;
      const total_pocso_bns_cases = Number(updatedForm.total_pocso_bns_cases) || 0;

      updatedForm.percentage =
        (total_pocso_bns_cases > 0) ? ((charge_sheeted_within_60_days / total_pocso_bns_cases) * 100).toFixed(2) : "0.00";

      // } else if (formData.formType === "Stolen & Recovered Property") {
      const value_recovered_property = Number(updatedForm.value_recovered_property) || 0;
      const value_stolen_property = Number(updatedForm.value_stolen_property) || 0;

      updatedForm.recovery_percentage =
        (value_stolen_property > 0) ? ((value_recovered_property / value_stolen_property) * 100).toFixed(2) : "0.00";

      // } else if (formData.formType === "Conviction under BNS") {
      const convicted_cases = Number(updatedForm.convicted_cases) || 0;
      const cases_decided = Number(updatedForm.cases_decided) || 0;

      updatedForm.conviction_rate =
        (cases_decided > 0) ? ((convicted_cases / cases_decided) * 100).toFixed(2) : "0.00";


      //   }

      // } else {

      const cases_forensic_team_visited = Number(updatedForm.cases_forensic_team_visited) || 0;
      const total_cases_gt_7_years = Number(updatedForm.total_cases_gt_7_years) || 0;

      updatedForm.forensic_team_deployment_percentage =
        (total_cases_gt_7_years > 0) ? ((cases_forensic_team_visited / total_cases_gt_7_years) * 100).toFixed(2) : "0.00";


      // }



      const newFormValues = { ...prev, [month]: updatedForm };

      console.log("newFormValues : ", newFormValues);

      // Check form completion and update verified state
      setVerified(isFormFilled(month));

      return newFormValues;
    });
  };





  const isFormFilled = (id) => {
    const values = formValues[id];


    return values && Object.values(values).every(value => value !== undefined && value !== "");
  };






  const handleEdit = (monthYear) => {
    setExpandedMonth(monthYear); // Expand the corresponding month dropdown
    // Scroll into view if necessary
    document.getElementById(monthYear)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const [duplicatedMonths, setDuplicatedMonths] = useState([]);
  const [monthCount, setMonthCount] = useState({}); // Store counts in state

  const getUniqueMonthId = (month) => {
    setMonthCount((prev) => {
      const newCount = (prev[month] || 0) + 1;
      return { ...prev, [month]: newCount };
    });

    return `${month} - ${(monthCount[month] || 0) + 1}`; // Hidden unique ID
  };

  // Function to add a duplicate month with fresh data
  const handleDuplicate = (month) => {
    console.log("month: ", month);

    const newId = getUniqueMonthId(month);

    setDuplicatedMonths((prev) => [...prev, { month, id: newId }]);

    // Ensure each duplicate has a separate form entry
    setFormValues((prev) => ({
      ...prev,
      [newId]: { personnel_trained: "", total_personnel: "", officers_trained: "", total_officers: "", total_trained: "", total_trained_percentage: "" }
    }));
  };

  // Function to remove a duplicated month
  const handleRemoveDuplicate = (id) => {
    setMonthsInRange((prev) => prev.filter((item) => item !== id)); // Remove from original months list
    setDuplicatedMonths((prev) => prev.filter((item) => item.id !== id));
    setFormValues((prev) => {
      const updatedValues = { ...prev };
      delete updatedValues[id]; // Remove the form entry for this duplicate
      return updatedValues;
    });
  };


  // Upload Functionality

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

    // Clear previous CSV data before uploading a new file
    setCsvData(null);

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
          total_trained: data.total_trained || "",
          total_trained_percentage: data.total_trained_percentage || "",
          percent_personnel_trained:
            data.total_personnel > 0
              ? ((data.personnel_trained / data.total_personnel) * 100).toFixed(2)
              : 0,
          percent_officers_trained:
            data.total_officers > 0
              ? ((data.officers_trained / data.total_officers) * 100).toFixed(2)
              : 0,
          total_persons_trained: (data.total_personnel + data.total_officers) || '',
          overall_cumulative: (((parseFloat((data.personnel_trained / data.total_personnel) * 100)) +
            parseFloat((data.officers_trained / data.total_officers) * 100)) / 2).toFixed(2) || 0

        };
      });

      console.log("newFormValues as object:", newFormValues);

      setFormValues(newFormValues);
    }
  }, [uploadData]);






  // Training Form

  const TrainingForm = (monthsInRange, duplicatedMonths) => {

    return (
      <div className="overflow-x-auto d-flex justify-center">
        <table className="w-full border border-gray-400 shadow-md">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="border px-4 py-2">Month-Year</th>
              <th className="border px-4 py-2">Total Constab</th>
              <th className="border px-4 py-2">Trained (Constab.)</th>
              <th className="border px-4 py-2">% Trained (Constab.)</th>
              <th className="border px-4 py-2">Total Officers</th>
              <th className="border px-4 py-2">Trained (Officers.)</th>
              <th className="border px-4 py-2">% Trained (Officers.)</th>
              <th className="border px-4 py-2">Total Trained</th>
              <th className="border px-4 py-2">Total Trained %</th>
              {/* <th className="border p-1 ">Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {[...monthsInRange.map(m => ({ month: m, id: m })), ...duplicatedMonths].map(({ month, id }, index, arr) => {
              const isPrevFormFilled = index === 0 || isFormFilled(arr[index - 1]?.id);
              const isDuplicate = duplicatedMonths.some((item) => item.id === id);
              const isLastRow = index === arr.length - 1; // Check if this is the last row


              return (
                <tr key={id}>
                  <td className="border px-4 py-2">{month}</td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      className="w-[50%] p-2"

                      value={formValues[id]?.total_personnel || ""}

                      onChange={(e) => handleInputChange(id, "total_personnel", e.target.value)}
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"

                      className="w-[50%] p-1"
                      value={formValues[id]?.personnel_trained || ""}

                      onChange={(e) => handleInputChange(id, "personnel_trained", e.target.value)}
                      style={{
                        border:
                          Number(formValues[id]?.personnel_trained) > Number(formValues[id]?.total_personnel)
                            ? "2px solid #ff8e8e"
                            : "1px solid #0000004b"
                      }}
                    />

                  </td>
                  <td className="border px-4 py-2">

                    <input type="number" className="w-[50%] p-2" value={formValues[id]?.percent_personnel_trained || ""} />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"

                      className="w-[50%] p-1"
                      value={formValues[id]?.total_officers || ""}

                      onChange={(e) => handleInputChange(id, "total_officers", e.target.value)}
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      className="w-[50%] p-1"

                      value={formValues[id]?.officers_trained || ""}

                      onChange={(e) => handleInputChange(id, "officers_trained", e.target.value)}
                      style={{
                        border:
                          Number(formValues[id]?.officers_trained) > Number(formValues[id]?.total_officers)
                            ? "2px solid #ff8e8e"
                            : "1px solid #0000004b"
                      }}
                    />

                  </td>
                  <td className="border px-4 py-2">

                    <input type="number" className="w-[50%] p-2" value={formValues[id]?.percent_officers_trained || ""} />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      className="w-[50%] p-2"
                      value={formValues[id]?.total_trained || ""}
                      onChange={(e) => handleInputChange(id, "total_trained", e.target.value)}
                     
                      // value={(
                      //   (Number(formValues[id]?.personnel_trained) || 0) +
                      //   (Number(formValues[id]?.officers_trained) || 0)
                      // )}

                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      className="w-[50%] p-2"
                      value={formValues[id]?.total_trained_percentage || ""}
                      onChange={(e) => handleInputChange(id, "total_trained_percentage", e.target.value)}


                      // value={(
                      //   ((Number(formValues[id]?.percent_personnel_trained) || 0) +
                      //     (Number(formValues[id]?.percent_officers_trained) || 0)) / 2
                      // ).toFixed(2)}

                    />

                  </td>

                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };


  // FIR Tab Form Start's from Here

  // Drop Down to select the kind of the Form for Filling in the FIR Tab

  const firDropdown = () => {
    return (
      <>
        <FormControl fullWidth variant="outlined">
          <InputLabel id="form-type-label">Form Type</InputLabel>
          <Select
            labelId="form-type-label"
            id="form-type"
            value={formData.formType}
            onChange={(e) =>
              setFormData({ ...formData, formType: e.target.value })
            }
            label="Form Type"
          >
            {(() => {
              let formOptions = [];

              if (training_active?.section === "FIR") {
                formOptions = [
                  "Pendency of cases under BNS",
                  "Untraced Missing",
                  "Offences against body under BNS",
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
      </>
    );
  };

  const pendencyForm = (monthsInRange, duplicatedMonths) => {
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
              <th className="border px-4 py-2">
                Less than 7 yrs Punishment cases out of Reg.Cases
              </th>
              <th className="border px-4 py-2">
                More than 7 yrs punishment cases out of Reg.Cases
              </th>
              {/* <th className="border px-4 py-2">Total Trained %</th> */}
            </tr>
          </thead>
          <tbody>
            {[
              ...monthsInRange.map((m) => ({ month: m, id: m })),
              ...duplicatedMonths,
            ].map(({ month, id }, index, arr) => {
              const isPrevFormFilled =
                index === 0 || isFormFilled(arr[index - 1]?.id);
              const isDuplicate = duplicatedMonths.some(
                (item) => item.id === id
              );
              const isLastRow = index === arr.length - 1; // Check if this is the last row

              return (
                <tr key={id}>
                  <td className="border px-4 py-2">{month}</td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      className="w-[40%] p-2 border rounded"
                      value={formValues[id]?.totalCases || ""}
                      onChange={(e) =>
                        handleInputChange(id, "totalCases", e.target.value)
                      }
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      className="w-[40%] p-2 border rounded"
                      value={formValues[id]?.disposedCases || ""}
                      onChange={(e) =>
                        handleInputChange(id, "disposedCases", e.target.value)
                      }
                    />

                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      className="w-[40%] p-2 border rounded"
                      value={formValues[id]?.pendingCases || ""}

                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      className="w-[40%] p-2 border rounded"
                      value={formValues[id]?.pendingPercentage || ""}
                      onChange={(e) =>
                        handleInputChange(
                          id,
                          "pendingPercentage",
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      className="w-[40%] p-2 border rounded"
                      value={formValues[id]?.punishmentLessThan7 || ""}
                      onChange={(e) =>
                        handleInputChange(
                          id,
                          "punishmentLessThan7",
                          e.target.value
                        )
                      }
                    />

                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      className="w-[40%] p-2 border rounded"
                      value={formValues[id]?.punishmentMoreThan7 || ""}
                      onChange={(e) =>
                        handleInputChange(
                          id,
                          "punishmentMoreThan7",
                          e.target.value
                        )
                      }
                    />

                  </td>

                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  const untraced = (monthsInRange, duplicatedMonths) => {
    return (
      <div className="overflow-x-auto d-flex justify-center">
        <table className="w-full border border-gray-400 shadow-md">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="border px-4 py-2">Month-Year</th>
              <th className="border px-4 py-2">Untraced Details Age Group</th>
              <th className="border px-4 py-2">No of Untraced Persons</th>
              <th className="border px-4 py-2">No of Missing Persons</th>
              <th className="border px-4 py-2">Total Missing Persons</th>
              <th className="border px-4 py-2">Traced</th>
              <th className="border px-4 py-2">Untraced</th>
              <th className="border px-4 py-2">Untraced %</th>




              {/* <th className="border px-4 py-2">Total Trained %</th> */}
            </tr>
          </thead>
          <tbody>
            {[
              ...monthsInRange.map((m) => ({ month: m, id: m })),
              ...duplicatedMonths,
            ].map(({ month, id }, index, arr) => {
              const isPrevFormFilled =
                index === 0 || isFormFilled(arr[index - 1]?.id);
              const isDuplicate = duplicatedMonths.some(
                (item) => item.id === id
              );
              const isLastRow = index === arr.length - 1; // Check if this is the last row




              return (
                <tr key={id}>
                  <td className="border px-4 py-2">{month}</td>
                  <td className="border px-4 py-2">
                    <select
                      className="w-full p-2 border rounded bg-white"
                      value={formValues[id]?.ageGroup || ""}
                      onChange={(e) =>
                        handleInputChange(id, "ageGroup", e.target.value)
                      }
                    >
                      <option value="">Select Age Group</option>
                      <option value="18-">Below 18 years</option>
                      <option value="18+">Above or Equal 18 years</option>
                    </select>
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      className="w-[40%] p-2 border rounded"
                      value={formValues[id]?.untracedPersons || ""}
                      onChange={(e) =>
                        handleInputChange(id, "untracedPersons", e.target.value)
                      }
                    />
                  </td>

                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      className="w-[40%] p-2 border rounded"
                      value={formValues[id]?.missingPersons || ""}
                      onChange={(e) =>
                        handleInputChange(id, "missingPersons", e.target.value)
                      }
                    />
                  </td>


                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      className="w-[40%] p-2 border rounded"
                      value={formValues[id]?.totalMissing || ""}
                      onChange={(e) =>
                        handleInputChange(id, "totalMissing", e.target.value)
                      }
                    />
                  </td>


                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      className="w-[40%] p-2 border rounded"
                      value={formValues[id]?.traced || ""}
                      onChange={(e) =>
                        handleInputChange(id, "traced", e.target.value)
                      }
                    />
                  </td>


                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      className="w-[40%] p-2 border rounded"
                      value={formValues[id]?.untraced || ""}
                      onChange={(e) =>
                        handleInputChange(id, "untraced", e.target.value)
                      }
                    />
                  </td>


                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      className="w-[40%] p-2 border rounded"
                      value={formValues[id]?.untracedPercentage || ""}
                      onChange={(e) =>
                        handleInputChange(id, "untracedPercentage", e.target.value)
                      }
                    />
                  </td>



                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };


  // const untraced = (monthsInRange, duplicatedMonths) => {
  //   return (
  //     <div className="overflow-x-auto overflow-y-auto max-h-[80vh] d-flex justify-center">
  //       <table className="min-w-[25%] border border-gray-400 shadow-md">
  //         <thead>
  //           <tr className="bg-gray-200 text-left">
  //             <th className="border px-4 py-2">Month-Year</th>
  //             <th className="border px-4 py-2">Untraced Details Age Group</th>
  //             <th className="border px-4 py-2">No of Untraced Persons</th>
  //             <th className="border px-4 py-2">No of Missing Persons</th>
  //             <th className="border px-4 py-2">Total Missing Persons</th>
  //             <th className="border px-4 py-2">Traced</th>
  //             <th className="border px-4 py-2">Untraced</th>
  //             <th className="border px-4 py-2">Untraced %</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {[...monthsInRange.flatMap((m) => [
  //             { month: m, id: `${m}-below18`, ageGroup: "<18" },
  //             { month: m, id: `${m}-above18`, ageGroup: ">18" },
  //           ]),
  //           ...duplicatedMonths,
  //           ].map(({ month, id, ageGroup }) => (
  //             <tr key={id}>
  //               <td className="border px-4 py-2">{month}</td>
  //               <td className="border px-4 py-2">
  //                 <input
  //                   type="text"
  //                   value={ageGroup}
  //                   readOnly
  //                   className="w-full p-2 border rounded bg-gray-100"
  //                 />
  //               </td>
  //               <td className="border px-4 py-2">
  //                 <input
  //                   type="number"
  //                   className="w-full p-2 border rounded"
  //                   value={formValues[id]?.untracedPersons || ""}
  //                   onChange={(e) =>
  //                     handleInputChange(id, "untracedPersons", e.target.value)
  //                   }
  //                 />
  //               </td>
  //               <td className="border px-4 py-2">
  //                 <input
  //                   type="number"
  //                   className="w-full p-2 border rounded"
  //                   value={formValues[id]?.missingPersons || ""}
  //                   onChange={(e) =>
  //                     handleInputChange(id, "missingPersons", e.target.value)
  //                   }
  //                 />
  //               </td>
  //               <td className="border px-4 py-2">
  //                 <input
  //                   type="number"
  //                   className="w-full p-2 border rounded"
  //                   value={formValues[id]?.totalMissing || ""}
  //                   onChange={(e) =>
  //                     handleInputChange(id, "totalMissing", e.target.value)
  //                   }
  //                 />
  //               </td>
  //               <td className="border px-4 py-2">
  //                 <input
  //                   type="number"
  //                   className="w-full p-2 border rounded"
  //                   value={formValues[id]?.traced || ""}
  //                   onChange={(e) =>
  //                     handleInputChange(id, "traced", e.target.value)
  //                   }
  //                 />
  //               </td>
  //               <td className="border px-4 py-2">
  //                 <input
  //                   type="number"
  //                   className="w-full p-2 border rounded"
  //                   value={formValues[id]?.untraced || ""}
  //                   onChange={(e) =>
  //                     handleInputChange(id, "untraced", e.target.value)
  //                   }
  //                 />
  //               </td>
  //               <td className="border px-4 py-2">
  //                 <input
  //                   type="number"
  //                   className="w-full p-2 border rounded"
  //                   value={formValues[id]?.untracedPercentage || ""}
  //                   onChange={(e) =>
  //                     handleInputChange(id, "untracedPercentage", e.target.value)
  //                   }
  //                 />
  //               </td>
  //             </tr>
  //           ))}
  //         </tbody>
  //       </table>
  //     </div>
  //   );
  // };



  const offencesAgainstBody = (monthsInRange, duplicatedMonths) => {
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

              {/* <th className="border px-4 py-2">Total Trained %</th> */}
            </tr>
          </thead>
          <tbody>
            {[
              ...monthsInRange.map((m) => ({ month: m, id: m })),
              ...duplicatedMonths,
            ].map(({ month, id }, index, arr) => {
              const isPrevFormFilled =
                index === 0 || isFormFilled(arr[index - 1]?.id);
              const isDuplicate = duplicatedMonths.some(
                (item) => item.id === id
              );
              const isLastRow = index === arr.length - 1; // Check if this is the last row

              return (
                <tr key={id}>
                  <td className="border px-4 py-2">{month}</td>
                  <td className="border px-4 py-2">
                    <select
                      className="w-full p-2 border rounded"
                      value={formValues[id]?.actAndSection || ""}
                      onChange={(e) =>
                        handleInputChange(id, "actAndSection", e.target.value)
                      }
                    >
                      <option value="" disabled>
                        Select an Act and Section
                      </option>




                      <option value="Murder (BNS Sec. 103(1))">
                        Murder (BNS Sec. 103(1))
                      </option>
                      <option value="Att. To Murder (BNS Sec. 109)">
                        Att. To Murder (BNS Sec. 109)
                      </option>
                      <option value="Rape (BNS Sec. 64 to 71)">
                        Rape (BNS Sec. 64 to 71)
                      </option>
                      <option value="Hurt (BNS Sec. 117 to 125)">
                        Hurt (BNS Sec. 117 to 125)
                      </option>
                      <option value="Riots (BNS Sec. 191 to 193)">
                        Riots (BNS Sec. 191 to 193)
                      </option>
                      <option value="Molestation (BNS Sec. 74 to 79)">
                        Molestation (BNS Sec. 74 to 79)
                      </option>


                    </select>
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      className="w-[40%] p-2 border rounded"
                      value={formValues[id]?.registeredCases || ""}
                      onChange={(e) =>
                        handleInputChange(id, "registeredCases", e.target.value)
                      }
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      className="w-[40%] p-2 border rounded"
                      value={formValues[id]?.detectedCases || ""}
                      onChange={(e) =>
                        handleInputChange(id, "detectedCases", e.target.value)
                      }
                    />
                    {parseInt(formValues[id]?.detectedCases) >
                      parseInt(formValues[id]?.registeredCases) && (
                        <p className="text-red-500 text-sm mt-1">
                          Detected Cases cannot exceed Reg'd Cases.
                        </p>
                      )}
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      className="w-[40%] p-2 border rounded"
                      value={formValues[id]?.detectedCasesPercentage || ""}

                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };



  // const offencesAgainstBody = (monthsInRange, duplicatedMonths) => {
  //   const offences = [
  //     { label: "Murder", value: "Murder (BNS Sec. 103(1))" },
  //     { label: "Att. To Murder", value: "Att. To Murder (BNS Sec. 109)" },
  //     { label: "Rape", value: "Rape (BNS Sec. 64 to 71)" },
  //     { label: "Hurt", value: "Hurt (BNS Sec. 117 to 125)" },
  //     { label: "Riots", value: "Riots (BNS Sec. 191 to 193)" },
  //     { label: "Molestation", value: "Molestation (BNS Sec. 74 to 79)" },
  //   ];
  
  //   return (
  //     <div className="overflow-x-auto overflow-y-auto max-h-[80vh] d-flex justify-center">
  //       <table className="min-w-[25%] border border-gray-400 shadow-md">
  //         <thead>
  //           <tr className="bg-gray-200 text-left">
  //             <th className="border px-4 py-2">Month-Year</th>
  //             <th className="border px-4 py-2">Act and Section</th>
  //             <th className="border px-4 py-2">Registered Cases</th>
  //             <th className="border px-4 py-2">Detected Cases</th>
  //             <th className="border px-4 py-2">Detected Cases %</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {[...monthsInRange.flatMap((m) => 
  //             offences.map((o) => ({ month: m, id: `${m}-${o.label}`, offence: o.value }))
  //           ), ...duplicatedMonths].map(({ month, id, offence }) => (
  //             <tr key={id}>
  //               <td className="border px-4 py-2">{month}</td>
  //               <td className="border px-4 py-2">
  //                 <input
  //                   type="text"
  //                   value={offence}
  //                   readOnly
  //                   className="w-full p-2 border rounded"
  //                 />
  //               </td>
  //               <td className="border px-4 py-2">
  //                 <input
  //                   type="number"
  //                   className="w-[40%] p-2 border rounded"
  //                   value={formValues[id]?.registeredCases || ""}
  //                   onChange={(e) =>
  //                     handleInputChange(id, "registeredCases", e.target.value)
  //                   }
  //                 />
  //               </td>
  //               <td className="border px-4 py-2">
  //                 <input
  //                   type="number"
  //                   className="w-[40%] p-2 border rounded"
  //                   value={formValues[id]?.detectedCases || ""}
  //                   onChange={(e) =>
  //                     handleInputChange(id, "detectedCases", e.target.value)
  //                   }
  //                 />
  //                 {parseInt(formValues[id]?.detectedCases) > parseInt(formValues[id]?.registeredCases) && (
  //                   <p className="text-red-500 text-sm mt-1">
  //                     Detected Cases cannot exceed Reg'd Cases.
  //                   </p>
  //                 )}
  //               </td>
  //               <td className="border px-4 py-2">
  //                 <input
  //                   type="number"
  //                   className="w-[40%] p-2 border rounded"
  //                   value={formValues[id]?.detectedCasesPercentage || ""}
  //                   readOnly
  //                 />
  //               </td>
  //             </tr>
  //           ))}
  //         </tbody>
  //       </table>
  //     </div>
  //   );
  // };





  const ImportantAgainstBody = (monthsInRange, duplicatedMonths) => {
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

              {/* <th className="border px-4 py-2">Total Trained %</th> */}
            </tr>
          </thead>
          <tbody>
            {[
              ...monthsInRange.map((m) => ({ month: m, id: m })),
              ...duplicatedMonths,
            ].map(({ month, id }, index, arr) => {
              const isPrevFormFilled =
                index === 0 || isFormFilled(arr[index - 1]?.id);
              const isDuplicate = duplicatedMonths.some(
                (item) => item.id === id
              );
              const isLastRow = index === arr.length - 1; // Check if this is the last row

              return (
                <tr key={id}>
                  <td className="border px-4 py-2">{month}</td>
                  <td className="border px-4 py-2">
                    <select
                      className="w-full p-2 border rounded"
                      value={formValues[id]?.actAndSection_1 || ""}
                      onChange={(e) =>
                        handleInputChange(id, "actAndSection_1", e.target.value)
                      }
                    >
                      <option value="" disabled>
                        Select an Act and Section
                      </option>


                      <option value="Mob Lynching (Section 103 (2) BNS)">
                        Mob Lynching (Section 103 (2) BNS)
                      </option>
                      <option value="Snatching (Section 304 BNS)">
                        Snatching (Section 304 BNS)
                      </option>
                      <option value="Organized crime (Section 111 BNS)">
                        Organized crime (Section 111 BNS)
                      </option>
                      <option value="Petty Organized crime (Section 112 BNS)">
                        Petty Organized crime (Section 112 BNS)
                      </option>
                      <option value="Terrorist act (Section 113 BNS)">
                        Terrorist act (Section 113 BNS)
                      </option>




                    </select>
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      className="w-[40%] p-2 border rounded"
                      value={formValues[id]?.registeredCases_1 || ""}
                      onChange={(e) =>
                        handleInputChange(id, "registeredCases_1", e.target.value)
                      }
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      className="w-[40%] p-2 border rounded"
                      value={formValues[id]?.detectedCases_1 || ""}
                      onChange={(e) =>
                        handleInputChange(id, "detectedCases_1", e.target.value)
                      }
                    />
                    
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      className="w-[40%] p-2 border rounded"
                      value={formValues[id]?.detectedCasesPercentage_1 || ""}
                      onChange={(e) =>
                        handleInputChange(id, "detectedCasesPercentage_1", e.target.value)
                      }
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };



  // const ImportantAgainstBody = (monthsInRange) => {
  //   const offences = [
  //     "Mob Lynching (Section 103 (2) BNS)",
  //     "Snatching (Section 304 BNS)",
  //     "Organized crime (Section 111 BNS)",
  //     "Petty Organized crime (Section 112 BNS)",
  //     "Terrorist act (Section 113 BNS)"
  //   ];
  
  //   return (
  //     <div className="overflow-x-auto overflow-y-auto max-h-[80vh] d-flex justify-center">
  //       <table className="min-w-[25%] border border-gray-400 shadow-md">
  //         <thead>
  //           <tr className="bg-gray-200 text-left">
  //             <th className="border px-4 py-2">Month-Year</th>
  //             <th className="border px-4 py-2">Act and Section</th>
  //             <th className="border px-4 py-2">Registered Cases</th>
  //             <th className="border px-4 py-2">Detected Cases</th>
  //             <th className="border px-4 py-2">Detected Cases %</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {monthsInRange.flatMap((month) => 
  //             offences.map((offence) => {
  //               const id = `${month}-${offence}`;
  //               return (
  //                 <tr key={id}>
  //                   <td className="border px-4 py-2">{month}</td>
  //                   <td className="border px-4 py-2"><input
  //                   type="text"
  //                   value={offence}
  //                   readOnly
  //                   className="w-full p-2 border rounded"
  //                 /></td>
  //                   <td className="border px-4 py-2">
  //                     <input
  //                       type="number"
  //                       className="w-[40%] p-2 border rounded"
  //                       value={formValues[id]?.registeredCases_1 || ""}
  //                       onChange={(e) =>
  //                         handleInputChange(id, "registeredCases_1", e.target.value)
  //                       }
  //                     />
  //                   </td>
  //                   <td className="border px-4 py-2">
  //                     <input
  //                       type="number"
  //                       className="w-[40%] p-2 border rounded"
  //                       value={formValues[id]?.detectedCases_1 || ""}
  //                       onChange={(e) =>
  //                         handleInputChange(id, "detectedCases_1", e.target.value)
  //                       }
  //                     />
  //                     {parseInt(formValues[id]?.detectedCases_1) >
  //                       parseInt(formValues[id]?.registeredCases_1) && (
  //                       <p className="text-red-500 text-sm mt-1">
  //                         Detected Cases cannot exceed Reg'd Cases.
  //                       </p>
  //                     )}
  //                   </td>
  //                   <td className="border px-4 py-2">
  //                     <input
  //                       type="number"
  //                       className="w-[40%] p-2 border rounded"
  //                       value={formValues[id]?.detectedCasesPercentage_1 || ""}
  //                     />
  //                   </td>
  //                 </tr>
  //               );
  //             })
  //           )}
  //         </tbody>
  //       </table>
  //     </div>
  //   );
  // };



  const PropertyAgainstBody = (monthsInRange, duplicatedMonths) => {
   
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

              {/* <th className="border px-4 py-2">Total Trained %</th> */}
            </tr>
          </thead>
          <tbody>
            {[
              ...monthsInRange.map((m) => ({ month: m, id: m })),
              ...duplicatedMonths,
            ].map(({ month, id }, index, arr) => {
              const isPrevFormFilled =
                index === 0 || isFormFilled(arr[index - 1]?.id);
              const isDuplicate = duplicatedMonths.some(
                (item) => item.id === id
              );
              const isLastRow = index === arr.length - 1; // Check if this is the last row

              return (
                <tr key={id}>
                  <td className="border px-4 py-2">{month}</td>
                  <td className="border px-4 py-2">
                    <select
                      className="w-full p-2 border rounded"
                      value={formValues[id]?.actAndSection_2 || ""}
                      onChange={(e) =>
                        handleInputChange(id, "actAndSection_2", e.target.value)
                      }
                    >
                      <option value="" disabled>
                        Select an Act and Section
                      </option>


                      <option value="Dacoity (BNS Sec. 310)">
                        Dacoity (BNS Sec. 310)
                      </option>
                      <option value="Robbery (BNS Sec. 309)">
                        Robbery (BNS Sec. 309)
                      </option>
                      <option value="HBT (BNS Sec. 331 to 334)">
                        HBT (BNS Sec. 331 to 334)
                      </option>
                      <option value="Theft (BNS Sec. 303 & 305)">
                        Theft (BNS Sec. 303 & 305)
                      </option>

                    </select>
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      className="w-[40%] p-2 border rounded"
                      value={formValues[id]?.registeredCases_2 || ""}
                      onChange={(e) =>
                        handleInputChange(id, "registeredCases_2", e.target.value)
                      }
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      className="w-[40%] p-2 border rounded"
                      value={formValues[id]?.detectedCases_2 || ""}
                      onChange={(e) =>
                        handleInputChange(id, "detectedCases_2", e.target.value)
                      }
                    />
                   
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      className="w-[40%] p-2 border rounded"
                      value={formValues[id]?.detectedCasesPercentage_2 || ""}
                      onChange={(e) =>
                        handleInputChange(id, "detectedCasesPercentage_2", e.target.value)
                      }
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };


  // const PropertyAgainstBody = (monthsInRange) => {
  //   const offences = [
  //     "Dacoity (BNS Sec. 310)",
  //     "Robbery (BNS Sec. 309)",
  //     "HBT (BNS Sec. 331 to 334)",
  //     "Theft (BNS Sec. 303 & 305)"
  //   ];
  
  //   return (
  //     <div className="overflow-x-auto overflow-y-auto max-h-[80vh] d-flex justify-center">
  //       <table className="min-w-[25%] border border-gray-400 shadow-md">
  //         <thead>
  //           <tr className="bg-gray-200 text-left">
  //             <th className="border px-4 py-2">Month-Year</th>
  //             <th className="border px-4 py-2">Act and Section</th>
  //             <th className="border px-4 py-2">Registered Cases</th>
  //             <th className="border px-4 py-2">Detected Cases</th>
  //             <th className="border px-4 py-2">Detected Cases %</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {monthsInRange.flatMap((month) =>
  //             offences.map((offence) => {
  //               const id = `${month}-${offence}`;
  //               return (
  //                 <tr key={id}>
  //                   <td className="border px-4 py-2">{month}</td>
  //                   <td className="border px-4 py-2"><input
  //                   type="text"
  //                   value={offence}
  //                   readOnly
  //                   className="w-full p-2 border rounded"
  //                 /></td>
  //                   <td className="border px-4 py-2">
  //                     <input
  //                       type="number"
  //                       className="w-[40%] p-2 border rounded"
  //                       value={formValues[id]?.registeredCases_2 || ""}
  //                       onChange={(e) =>
  //                         handleInputChange(id, "registeredCases_2", e.target.value)
  //                       }
  //                     />
  //                   </td>
  //                   <td className="border px-4 py-2">
  //                     <input
  //                       type="number"
  //                       className="w-[40%] p-2 border rounded"
  //                       value={formValues[id]?.detectedCases_2 || ""}
  //                       onChange={(e) =>
  //                         handleInputChange(id, "detectedCases_2", e.target.value)
  //                       }
  //                     />
  //                     {parseInt(formValues[id]?.detectedCases_2) >
  //                       parseInt(formValues[id]?.registeredCases_2) && (
  //                       <p className="text-red-500 text-sm mt-1">
  //                         Detected Cases cannot exceed Reg'd Cases.
  //                       </p>
  //                     )}
  //                   </td>
  //                   <td className="border px-4 py-2">
  //                     <input
  //                       type="number"
  //                       className="w-[40%] p-2 border rounded"
  //                       value={formValues[id]?.detectedCasesPercentage_2 || ""}
  //                     />
  //                   </td>
  //                 </tr>
  //               );
  //             })
  //           )}
  //         </tbody>
  //       </table>
  //     </div>
  //   );
  // };

  const esakshyaDetails = (monthsInRange, duplicatedMonths) => {
    return (
      <div className="overflow-x-auto d-flex justify-center">
        <table className="w-full border border-gray-400 shadow-md">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="border px-4 py-2">Month-Year</th>
              <th className="border px-4 py-2">No of IO's Registered</th>
              <th className="border px-4 py-2">eSakshya downloads by IOs</th>
              <th className="border px-4 py-2">eSakshya Usage %</th>

              {/* <th className="border px-4 py-2">Total Trained %</th> */}
            </tr>
          </thead>
          <tbody>
            {[
              ...monthsInRange.map((m) => ({ month: m, id: m })),
              ...duplicatedMonths,
            ].map(({ month, id }, index, arr) => {
              const isPrevFormFilled =
                index === 0 || isFormFilled(arr[index - 1]?.id);
              const isDuplicate = duplicatedMonths.some(
                (item) => item.id === id
              );
              const isLastRow = index === arr.length - 1; // Check if this is the last row

              return (
                <tr key={id}>
                  <td className="border px-4 py-2">{month}</td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
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
                      className="w-[40%] p-2 border rounded"
                      value={formValues[id]?.totalIOsEsakshyaDownload || ""}
                      onChange={(e) =>
                        handleInputChange(
                          id,
                          "totalIOsEsakshyaDownload",
                          e.target.value
                        )
                      }
                    />


                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      className="w-[40%] p-2 border rounded"
                      value={formValues[id]?.esakshyaWage_1 || ""}

                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  const useOfEsakshyaDetails = (monthsInRange, duplicatedMonths) => {
    return (
      <div className="overflow-x-auto d-flex justify-center">
        <table className="w-full border border-gray-400 shadow-md">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="border px-4 py-2">Month-Year</th>
              <th className="border px-4 py-2">No of Cases Registered</th>
              <th className="border px-4 py-2">No of cases eSakshya was used</th>
              <th className="border px-4 py-2">No of cases eSakshya was not used</th>
              <th className="border px-4 py-2">eSakshya Usage %</th>
              <th className="border px-4 py-2">Total Offences eSakshya used and Charge Sheeted</th>
              <th className="border px-4 py-2">Total Offences eSakshya Not used and Under Investigation</th>

            </tr>
          </thead>
          <tbody>
            {[
              ...monthsInRange.map((m) => ({ month: m, id: m })),
              ...duplicatedMonths,
            ].map(({ month, id }, index, arr) => {
              const isPrevFormFilled =
                index === 0 || isFormFilled(arr[index - 1]?.id);
              const isDuplicate = duplicatedMonths.some(
                (item) => item.id === id
              );
              const isLastRow = index === arr.length - 1; // Check if this is the last row

              return (
                <tr key={id}>
                  <td className="border px-4 py-2">{month}</td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
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
                      className="w-[40%] p-2 border rounded"
                      value={formValues[id]?.esakshya_usage_percent || ""}
                      onChange={(e) =>
                        handleInputChange(id, "esakshya_usage_percent", e.target.value)
                      }
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
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
                      className="w-[40%] p-2 border rounded"
                      value={formValues[id]?.esakshya_not_used_invest || ""}
                      onChange={(e) =>
                        handleInputChange(id, "esakshya_not_used_invest", e.target.value)
                      }
                    />
                  </td>

                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  const ZeroFIRDetails = (monthsInRange, duplicatedMonths) => {
    return (
      <div className="overflow-x-auto d-flex">
        <table className="w-full border border-gray-400 shadow-md">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="border px-4 py-2">Month-Year</th>
              <th className="border px-4 py-2">
                No. of Zero FIRs transferred outside Maharashtra
              </th>
              <th className="border px-4 py-2">
                No. of Zero FIRs transferred from other State to Maharashtra
              </th>
              <th className="border px-4 py-2">Total No of Zero FIRs</th>
              <th className="border px-4 py-2">
                Pending for Transfer outside Maharashtra
              </th>
              <th className="border px-4 py-2">Zero FIR's in Maharashtra</th>
              <th className="border px-4 py-2">
                Re-Registered FIRs in Maharashtra
              </th>
              <th className="border px-4 py-2">
                No of Zero FIR's Transferred Within Maharashtra
              </th>
              <th className="border px-4 py-2">
                Pending for Transfer within Maharashtra
              </th>
              <th className="border px-4 py-2">Pending for Re-registration</th>

              {/* <th className="border px-4 py-2">Total Trained %</th> */}
              {/*  */}
            </tr>
          </thead>
          <tbody>
            {[
              ...monthsInRange.map((m) => ({ month: m, id: m })),
              ...duplicatedMonths,
            ].map(({ month, id }, index, arr) => {
              const isPrevFormFilled =
                index === 0 || isFormFilled(arr[index - 1]?.id);
              const isDuplicate = duplicatedMonths.some(
                (item) => item.id === id
              );
              const isLastRow = index === arr.length - 1; // Check if this is the last row

              return (
                <tr key={id}>
                  <td className="border px-4 py-2">{month}</td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      className="w-full p-2 border rounded"
                      value={
                        formValues[id]
                          ?.total_no_zero_fir_transferred_outside_mh || ""
                      }
                      onChange={(e) =>
                        handleInputChange(
                          id,
                          "total_no_zero_fir_transferred_outside_mh",
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      className="w-full p-2 border rounded"
                      value={
                        formValues[id]
                          ?.total_no_zero_fir_transferred_outer_state_to_mh ||
                        ""
                      }
                      onChange={(e) =>
                        handleInputChange(
                          id,
                          "total_no_zero_fir_transferred_outer_state_to_mh",
                          e.target.value
                        )
                      }
                    />


                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      className="w-full p-2 border rounded"
                      value={formValues[id]?.total_zero_firs || 0}

                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      className="w-full p-2 border rounded"
                      value={
                        formValues[id]?.pending_to_transfer_outside_mh || 0
                      }

                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      className="w-full p-2 border rounded"
                      value={formValues[id]?.total_firs_registered || ""}
                      onChange={(e) =>
                        handleInputChange(
                          id,
                          "total_firs_registered",
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      className="w-full p-2 border rounded"
                      value={formValues[id]?.re_reg_firs || ""}
                      onChange={(e) =>
                        handleInputChange(id, "re_reg_firs", e.target.value)
                      }
                    />

                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      className="w-full p-2 border rounded"
                      value={
                        formValues[id]?.total_transferred_zero_firs_in_mh || ""
                      }
                      onChange={(e) =>
                        handleInputChange(
                          id,
                          "total_transferred_zero_firs_in_mh",
                          e.target.value
                        )
                      }
                    />

                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      className="w-full p-2 border rounded"
                      value={
                        formValues[id]?.pending_for_transfer_within_mh || 0
                      }

                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      className="w-full p-2 border rounded"
                      value={formValues[id]?.pending_for_re_registration || 0}

                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };


  const EFIRDetails = (monthsInRange, duplicatedMonths) => {



    return (
      <div className="overflow-x-auto d-flex justify-center">
        <table className="w-full border border-gray-400 shadow-md">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="border px-4 py-2">Month-Year</th>
              <th className="border px-4 py-2">Total eComplaints Received on Citizen Portal</th>
              <th className="border px-4 py-2">Total eComplaints Converted to Regular FIRs</th>
              <th className="border px-4 py-2">Disposed of eComplaints</th>
              {/* <th className="border p-1 ">Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {[...monthsInRange.map(m => ({ month: m, id: m })), ...duplicatedMonths].map(({ month, id }, index, arr) => {
              const isPrevFormFilled = index === 0 || isFormFilled(arr[index - 1]?.id);
              const isDuplicate = duplicatedMonths.some((item) => item.id === id);
              const isLastRow = index === arr.length - 1; // Check if this is the last row


              return (
                <tr key={id}>
                  <td className="border px-4 py-2">{month}</td>
                  <td className="border px-4 py-2">

                    <input
                      className="w-[60%] p-2"

                      type="number"
                      value={formValues[id]?.totalEComplaintsReceived || ""}
                      onChange={(e) => handleInputChange(id, "totalEComplaintsReceived", e.target.value)}
                    />

                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"

                      className="w-[60%] p-1"
                      value={formValues[id]?.totalComplaintsConverted || ""}
                      onChange={(e) => handleInputChange(id, "totalComplaintsConverted", e.target.value)}
                      
                    />



                  </td>
                  <td className="border px-4 py-2">


                    <input
                      type="number"

                      className="w-[60%] p-1"

                      value={formValues[id]?.disposedEComplaints || ""}
                      onChange={(e) => handleInputChange(id, "disposedEComplaints", e.target.value)}
                     
                    />

                  </td>


                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };


  const ITSSOComplianceForm = (monthsInRange, duplicatedMonths) => {



    return (
      <div className="overflow-x-auto d-flex justify-center">
        <table className="w-full border border-gray-400 shadow-md">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="border px-4 py-2">Month-Year</th>
              <th className="border px-4 py-2">Total registered cases</th>
              <th className="border px-4 py-2">cases chargesheet (60 days)</th>
              <th className="border px-4 py-2">Compliance Rate</th>
              {/* <th className="border p-1 ">Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {[...monthsInRange.map(m => ({ month: m, id: m })), ...duplicatedMonths].map(({ month, id }, index, arr) => {
              const isPrevFormFilled = index === 0 || isFormFilled(arr[index - 1]?.id);
              const isDuplicate = duplicatedMonths.some((item) => item.id === id);
              const isLastRow = index === arr.length - 1; // Check if this is the last row


              return (
                <tr key={id}>
                  <td className="border px-4 py-2">{month}</td>
                  <td className="border px-4 py-2">

                    <input
                      className="w-[60%] p-2"

                      type="number"
                      value={formValues[id]?.total_pocso_bns_cases || ""}
                      onChange={(e) => handleInputChange(id, "total_pocso_bns_cases", e.target.value)}
                    />

                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"

                      className="w-[60%] p-1"

                      value={formValues[id]?.charge_sheeted_within_60_days || ""}
                      onChange={(e) => handleInputChange(id, "charge_sheeted_within_60_days", e.target.value)}
                      style={{
                        border:
                          Number(formValues[id]?.charge_sheeted_within_60_days) > Number(formValues[id]?.total_pocso_bns_cases)
                            ? "2px solid #ff8e8e"
                            : "1px solid #0000004b"
                      }}
                    />


                  </td>
                  <td className="border px-4 py-2">

                    <input type="number" className="w-[60%] p-2" value={formValues[id]?.percentage || ""} />
                  </td>


                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };


  const StolenRecoveredProperty = (monthsInRange, duplicatedMonths) => {


    return (
      <div className="overflow-x-auto d-flex justify-center">
        <table className="w-full border border-gray-400 shadow-md">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="border px-4 py-2">Month-Year</th>
              <th className="border px-4 py-2">Total Cases</th>
              <th className="border px-4 py-2">Offences Registered</th>
              <th className="border px-4 py-2">Value of Stolen Property</th>
              <th className="border px-4 py-2">Detected Registered</th>
              <th className="border px-4 py-2">Value of Recovered Property</th>
              <th className="border px-4 py-2">Recovery %</th>

              {/* <th className="border p-1 ">Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {[...monthsInRange.map(m => ({ month: m, id: m })), ...duplicatedMonths].map(({ month, id }, index, arr) => {
              const isPrevFormFilled = index === 0 || isFormFilled(arr[index - 1]?.id);
              const isDuplicate = duplicatedMonths.some((item) => item.id === id);
              const isLastRow = index === arr.length - 1; // Check if this is the last row


              return (
                <tr key={id}>
                  <td className="border px-4 py-2">{month}</td>
                  <td className="border px-4 py-2">


                    <select
                      className="w-[100%] p-2 border rounded"



                      value={formValues[id]?.total_cases || ""}
                      onChange={(e) => handleInputChange(id, "total_cases", e.target.value)}
                    >
                      <option value="" disabled>Select Total Cases</option>
                      <option value="Dacoity">Dacoity</option>
                      <option value="Robbery">Robbery</option>
                      <option value="HBT">HBT</option>
                      <option value="Theft">Theft</option>
                    </select>
                  </td>
                  <td className="border px-4 py-2">

                    <input
                      className="w-[100%] p-2 border rounded"


                      type="number"
                      value={formValues[id]?.offences_registered || ""}
                      onChange={(e) => handleInputChange(id, "offences_registered", e.target.value)}
                    />

                  </td>



                  <td className="border px-4 py-2">


                    <input
                      className="w-[80%] p-2 border rounded"


                      type="number"
                      value={formValues[id]?.value_stolen_property || ""}
                      onChange={(e) => handleInputChange(id, "value_stolen_property", e.target.value)}
                    />

                  </td>
                  <td className="border px-4 py-2">


                    <input
                      className="w-[80%] p-2 border rounded"


                      type="number"
                      value={formValues[id]?.detected_cases || ""}
                      onChange={(e) => handleInputChange(id, "detected_cases", e.target.value)}
                    />

                  </td>
                  <td className="border px-4 py-2">




                    <input
                      className="w-[80%] p-2 border rounded"


                      type="number"
                      value={formValues[id]?.value_recovered_property || ""}
                      onChange={(e) => handleInputChange(id, "value_recovered_property", e.target.value)}
                      style={{
                        border:
                          Number(formValues[id]?.value_recovered_property) > Number(formValues[id]?.value_stolen_property)
                            ? "2px solid #ff8e8e"
                            : "1px solid #0000004b"
                      }}
                    />

                  </td>
                  <td className="border px-4 py-2">




                    <input
                      className="w-[80%] p-2 border rounded"


                      type="number"
                      value={formValues[id]?.recovery_percentage || ""}

                    />



                  </td>



                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };


  // const StolenRecoveredProperty = (monthsInRange, duplicatedMonths) => {
  //   const offences = ["Dacoity", "Robbery", "HBT", "Theft"];
  
  //   return (
  //     <div className="overflow-x-auto overflow-y-auto max-h-[80vh] d-flex justify-center">
  //       <table className="w-full border border-gray-400 shadow-md">
  //         <thead>
  //           <tr className="bg-gray-200 text-left">
  //             <th className="border px-4 py-2">Month-Year</th>
  //             <th className="border px-4 py-2">Offence Type</th>
  //             <th className="border px-4 py-2">Offences Registered</th>
  //             <th className="border px-4 py-2">Value of Stolen Property</th>
  //             <th className="border px-4 py-2">Detected Registered</th>
  //             <th className="border px-4 py-2">Value of Recovered Property</th>
  //             <th className="border px-4 py-2">Recovery %</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {[...monthsInRange, ...duplicatedMonths.map((d) => d.month)].flatMap((month) =>
  //             offences.map((offence) => {
  //               const id = `${month}-${offence}`;
  //               return (
  //                 <tr key={id}>
  //                   <td className="border px-4 py-2">{month}</td>
  //                   <td className="border px-4 py-2"><input
  //                   type="text"
  //                   value={offence}
  //                   readOnly
  //                   className="w-full p-2 border rounded"
  //                 /></td>
  //                   <td className="border px-4 py-2">
  //                     <input
  //                       className="w-full p-2 border rounded"
  //                       type="number"
  //                       value={formValues[id]?.offences_registered || ""}
  //                       onChange={(e) => handleInputChange(id, "offences_registered", e.target.value)}
  //                     />
  //                   </td>
  //                   <td className="border px-4 py-2">
  //                     <input
  //                       className="w-full p-2 border rounded"
  //                       type="number"
  //                       value={formValues[id]?.value_stolen_property || ""}
  //                       onChange={(e) => handleInputChange(id, "value_stolen_property", e.target.value)}
  //                     />
  //                   </td>
  //                   <td className="border px-4 py-2">
  //                     <input
  //                       className="w-full p-2 border rounded"
  //                       type="number"
  //                       value={formValues[id]?.detected_cases || ""}
  //                       onChange={(e) => handleInputChange(id, "detected_cases", e.target.value)}
  //                     />
  //                   </td>
  //                   <td className="border px-4 py-2">
  //                     <input
  //                       className="w-full p-2 border rounded"
  //                       type="number"
  //                       value={formValues[id]?.value_recovered_property || ""}
  //                       onChange={(e) => handleInputChange(id, "value_recovered_property", e.target.value)}
  //                       style={{
  //                         border:
  //                           Number(formValues[id]?.value_recovered_property) > Number(formValues[id]?.value_stolen_property)
  //                             ? "2px solid #ff8e8e"
  //                             : "1px solid #0000004b",
  //                       }}
  //                     />
  //                   </td>
  //                   <td className="border px-4 py-2">
  //                     <input className="w-full p-2 border rounded" type="number" value={formValues[id]?.recovery_percentage || ""} />
  //                   </td>
  //                 </tr>
  //               );
  //             })
  //           )}
  //         </tbody>
  //       </table>
  //     </div>
  //   );
  // };

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
  }


  const ConvictionUnderBNS = (monthsInRange, duplicatedMonths) => {

    return (
      <div className="overflow-x-auto d-flex justify-center">
        <table className="w-full border border-gray-400 shadow-md">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="border px-4 py-2">Month-Year</th>
              <th className="border px-4 py-2">Type of Court</th>
              <th className="border px-4 py-2">BNS Sections</th>
              {/* {formValues[id]?.bns_sections === "Other" && (

                <th className="border px-4 py-2">Other BNS Section</th>
              )} */}
              <th className="border px-4 py-2">Cases Decided</th>
              <th className="border px-4 py-2">Convicted Cases</th>
              <th className="border px-4 py-2">Conviction Rate %</th>
              <th className="border px-4 py-2">Total Cases Convicted</th>
              <th className="border px-4 py-2">Total Cases Decided</th>

              {/* <th className="border p-1 ">Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {[...monthsInRange.map(m => ({ month: m, id: m })), ...duplicatedMonths].map(({ month, id }, index, arr) => {
              const isPrevFormFilled = index === 0 || isFormFilled(arr[index - 1]?.id);
              const isDuplicate = duplicatedMonths.some((item) => item.id === id);
              const isLastRow = index === arr.length - 1; // Check if this is the last row


              return (
                <tr key={id}>
                  <td className="border px-4 py-2">{month}</td>
                  <td className="border px-4 py-2">
                    <select
                      className="w-[100%] p-2 border rounded"



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
                      className="w-[80%] p-2 border rounded"


                      value={formValues[id]?.bns_sections || ""}
                      onChange={(e) => handleInputChange(id, "bns_sections", e.target.value)}
                    >
                      <option value="">Select</option>
                      {Object.entries(convictionDataOption).map(([key, value]) => (
                        <option key={key} value={key}>
                          {value}
                        </option>
                      ))}


                      {/* <option value="Other">Other BNS Sections</option> */}
                    </select>

                  </td>

                  {/* {formValues[id]?.bns_sections === "Other" && (
                    <td className="border px-4 py-2">

                      <input
                        className="w-[80%] p-2 border rounded"
                        
                        
                        type="text"
                        value={formValues[id]?.other_bns_section || ""}
                        onChange={(e) => handleInputChange(id, "other_bns_section", e.target.value)}
                      />
                    </td>
                  )} */}

                  <td className="border px-4 py-2">


                    <input
                      type="number"

                      className="w-[50%] p-1"
                      value={formValues[id]?.cases_decided || ""}
                      onChange={(e) => handleInputChange(id, "cases_decided", e.target.value)}
                    />

                  </td>
                  <td className="border px-4 py-2">
                    <input
                      className="w-[80%] p-2 border rounded"


                      value={formValues[month]?.convicted_cases || ""}
                      onChange={(e) => handleInputChange(month, "convicted_cases", e.target.value)}
                      style={{
                        border:
                          Number(formValues[id]?.convicted_cases) > Number(formValues[id]?.cases_decided)
                            ? "2px solid #ff8e8e"
                            : "1px solid #0000004b"
                      }}
                    />

                  </td>
                  <td className="border px-4 py-2">

                    <input
                      className="w-[80%] p-2 border rounded"


                      type="number"
                      value={formValues[id]?.conviction_rate || ""}

                    />

                  </td>
                  <td className="border px-4 py-2">


                    <input
                      className="w-[80%] p-2 border rounded"


                      type="number"
                      value={formValues[month]?.total_cases_convicted || "0"}

                    />



                  </td>
                  <td className="border px-4 py-2">
                    <input
                      className="w-[80%] p-2 border rounded"


                      type="number"
                      value={formValues[month]?.total_cases_decided || "0"}

                    />
                  </td>


                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  
  
  
//   const ConvictionUnderBNS = (monthsInRange, duplicatedMonths) => {
//     const courtTypes = ["Session", "JMFC"];

//     const handleDuplicateRow = (id) => {
//         // Create a copy of the form values for the row to be duplicated
//         const newRow = { ...formValues[id] };
//         const newId = `${newRow.courtType} - ${newRow.month} - copy`; // Create a new ID for the duplicated row
//         setFormValues((prevValues) => ({
//             ...prevValues,
//             [newId]: newRow, // Add the new row to the form values
//         }));
//     };

//     return (
//         <div className="overflow-x-auto d-flex justify-center">
//             <table className="w-full border border-gray-400 shadow-md">
//                 <thead>
//                     <tr className="bg-gray-200 text-left">
//                         <th className="border px-4 py-2">Month-Year</th>
//                         <th className="border px-4 py-2">Court Type</th>
//                         <th className="border px-4 py-2">BNS Sections</th>
//                         <th className="border px-4 py-2">Cases Decided</th>
//                         <th className="border px-4 py-2">Convicted Cases</th>
//                         <th className="border px-4 py-2">Conviction Rate %</th>
//                         <th className="border px-4 py-2">Total Cases Convicted</th>
//                         <th className="border px-4 py-2">Total Cases Decided</th>
//                         <th className="border px-4 py-2">Action</th> {/* New column for action */}
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {[...monthsInRange, ...duplicatedMonths].flatMap((month) =>
//                         courtTypes.map((court) => {
//                             const id = `${court} - ${month}`;

//                             return (
//                                 <tr key={id}>
//                                     <td className="border px-4 py-2">{month}</td>
//                                     <td className="border px-4 py-2">
//                                         <input
//                                             type="text"
//                                             value={court}
//                                             readOnly
//                                             className="w-full p-2 border rounded"
//                                         />
//                                     </td>
//                                     <td className="border px-4 py-2">
//                                         <select
//                                             className="w-[80%] p-2 border rounded"
//                                             value={formValues[id]?.bns_sections || ""}
//                                             onChange={(e) => handleInputChange(id, "bns_sections", e.target.value)}
//                                         >
//                                             <option value="">Select</option>
//                                             {Object.entries(convictionDataOption).map(([key, value]) => (
//                                                 <option key={key} value={key}>
//                                                     {value}
//                                                 </option>
//                                             ))}
//                                         </select>
//                                     </td>
//                                     <td className="border px-4 py-2">
//                                         <input
//                                             type="number"
//                                             className="w-[50%] p-1"
//                                             value={formValues[id]?.cases_decided || ""}
//                                             onChange={(e) => handleInputChange(id, "cases_decided", e.target.value)}
//                                         />
//                                     </td>
//                                     <td className="border px-4 py-2">
//                                         <input
//                                             type="number"
//                                             className="w-[80%] p-2 border rounded"
//                                             value={formValues[id]?.convicted_cases || ""}
//                                             onChange={(e) => handleInputChange(id, "convicted_cases", e.target.value)}
//                                             style={{
//                                                 border:
//                                                     Number(formValues[id]?.convicted_cases) > Number(formValues[id]?.cases_decided)
//                                                         ? "2px solid #ff8e8e"
//                                                         : "1px solid #0000004b",
//                                             }}
//                                         />
//                                     </td>
//                                     <td className="border px-4 py-2">
//                                         <input
//                                             type="number"
//                                             className="w-[80%] p-2 border rounded"
//                                             value={formValues[id]?.conviction_rate || ""}
//                                         />
//                                     </td>
//                                     <td className="border px-4 py-2">
//                                         <input
//                                             type="number"
//                                             className="w-[80%] p-2 border rounded"
//                                             value={formValues[id]?.total_cases_convicted || "0"}
//                                         />
//                                     </td>
//                                     <td className="border px-4 py-2">
//                                         <input
//                                             type="number"
//                                             className="w-[80%] p-2 border rounded"
//                                             value={formValues[id]?.total_cases_decided || "0"}
//                                         />
//                                     </td>
//                                     <td className="border px-4 py-2">
//                                         <button
//                                             onClick={() => handleDuplicateRow(id)}
//                                             className="text-blue-500 hover:underline"
//                                         >
//                                             +
//                                         </button>
//                                     </td>
//                                 </tr>
//                             );
//                         })
//                     )}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

  const VisitOfForensicTeams = (monthsInRange, duplicatedMonths) => {



    return (
      <div className="overflow-x-auto d-flex justify-center">
        <table className="w-full border border-gray-400 shadow-md">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="border px-4 py-2">Month-Year</th>
              <th className="border px-4 py-2">Cases registered with punishment 7 years or more</th>
              <th className="border px-4 py-2">Cases Forensic Teams Visited</th>
              <th className="border px-4 py-2">Overall Percentage</th>
              {/* <th className="border p-1 ">Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {[...monthsInRange.map(m => ({ month: m, id: m })), ...duplicatedMonths].map(({ month, id }, index, arr) => {
              const isPrevFormFilled = index === 0 || isFormFilled(arr[index - 1]?.id);
              const isDuplicate = duplicatedMonths.some((item) => item.id === id);
              const isLastRow = index === arr.length - 1; // Check if this is the last row


              return (
                <tr key={id}>
                  <td className="border px-4 py-2">{month}</td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      className="w-[60%] p-2"


                      value={formValues[id]?.total_cases_gt_7_years || ""}
                      onChange={(e) => handleInputChange(id, "total_cases_gt_7_years", e.target.value)}
                    />


                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"

                      className="w-[60%] p-1"

                      value={formValues[id]?.cases_forensic_team_visited || ""}
                      onChange={(e) => handleInputChange(id, "cases_forensic_team_visited", e.target.value)}
                      style={{
                        border:
                          Number(formValues[id]?.cases_forensic_team_visited) > Number(formValues[id]?.total_cases_gt_7_years)
                            ? "2px solid #ff8e8e"
                            : "1px solid #0000004b"
                      }}
                    />


                  </td>
                  <td className="border px-4 py-2">
                    <input type="number" className="w-[60%] p-2" value={formValues[id]?.forensic_team_deployment_percentage || ""} />
                  </td>


                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };




  const formSelecter = (monthsInRange, duplicatedMonths) => {
    return {
      "Pendency of cases under BNS": pendencyForm(monthsInRange, duplicatedMonths),
      "Untraced Missing": untraced(monthsInRange, duplicatedMonths),
      "Offences against body under BNS": offencesAgainstBody(monthsInRange, duplicatedMonths),
      "Important sections introduced in BNS": offencesAgainstBody(monthsInRange, duplicatedMonths),
      "Property offences under BNS": offencesAgainstBody(monthsInRange, duplicatedMonths),
      "eSakshya Details": esakshyaDetails(monthsInRange, duplicatedMonths),
      "Use of eSakshya App in cases with punishment of 7 yrs. or more": useOfEsakshyaDetails(monthsInRange, duplicatedMonths),
      "Zero FIR's": ZeroFIRDetails(monthsInRange, duplicatedMonths),
      "eFIR": EFIRDetails(monthsInRange, duplicatedMonths),
      "ITSSO Compliance Form": ITSSOComplianceForm(monthsInRange, duplicatedMonths),
      "Stolen & Recovered Property": StolenRecoveredProperty(monthsInRange, duplicatedMonths),
      "Conviction under BNS": ConvictionUnderBNS(monthsInRange, duplicatedMonths),
    };
  };



  const fetchHistory = async () => {
    // if (!formData.formType) {
    //   alert("Please select a Form Type before fetching history.");
    //   return;
    // }

    const token = localStorage.getItem("token"); // Retrieve token from localStorage

    const payload = {
      fromDate: localStorage.getItem("from_date") || "N/A",
      toDate: localStorage.getItem("to_date") || "N/A",
      table_name: "training",
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




  



  const Modified = (monthsInRange, duplicatedMonths) => {

    return (
      // <div className="overflow-x-auto d-flex justify-center">
      // <div className="p-4 border rounded-lg shadow-md">
      //   <button
      //     className="px-4 py-2 bg-grey-500 text-black rounded w-full text-center"
      //     onClick={() => toggleSection("training")}
      //   >
      //     Training Data
      //   </button>

      //   <div className={`overflow-hidden transition-all duration-500 ${openSections.training ? "opacity-100" : "max-h-0 opacity-0"}`}>


      //     {TrainingForm(monthsInRange, duplicatedMonths)}

      //   </div>
      //   {/* 2 option */}
      //   <button
      //     className="px-4 py-2 bg-blue-500 text-white rounded w-full text-center"
      //     onClick={() => toggleSection("pendency")}
      //   // onClick={() => setIsPendencyOpen(!isPendencyOpen)}
      //   >
      //     Pendency of cases under BNS
      //   </button>

      //   <div className={`overflow-hidden transition-all duration-500 ${openSections.pendency ? "opacity-100 max-h-screen" : "max-h-0 opacity-0"}`}>

      //     {pendencyForm(monthsInRange, duplicatedMonths)}


      //   </div>
      //   {/* 3 option */}
      //   <button
      //     className="px-4 py-2 bg-blue-500 text-white rounded w-full text-center"
      //     onClick={() => toggleSection("untraced")}
      //   >
      //     Untraced Missing
      //   </button>

      //   <div className={`overflow-hidden transition-all duration-500 ${openSections.untraced ? "opacity-100" : "max-h-0 opacity-0"}`}>
      //     {untraced(monthsInRange, duplicatedMonths)}

      //   </div>
      //   {/* 4 option */}
      //   <button
      //     className="px-4 py-2 bg-blue-500 text-white rounded w-full text-center"
      //     onClick={() => toggleSection("offences_against")}
      //   >
      //     Offences against body under BNS
      //   </button>

      //   <div className={`overflow-hidden transition-all duration-500 ${openSections.offences_against ? "opacity-100" : "max-h-0 opacity-0"}`}>
      //     {offencesAgainstBody(monthsInRange, duplicatedMonths)}

      //   </div>
      //   {/* 5 option */}
      //   <button
      //     className="px-4 py-2 bg-blue-500 text-white rounded w-full text-center"
      //     onClick={() => toggleSection("important_bns")}
      //   >
      //     Important sections introduced in BNS
      //   </button>

      //   <div className={`overflow-hidden transition-all duration-500 ${openSections.important_bns ? "opacity-100" : "max-h-0 opacity-0"}`}>
      //     {ImportantAgainstBody(monthsInRange, duplicatedMonths)}
      //   </div>
        
      //   {/* 5 option */}
      //   <button
      //     className="px-4 py-2 bg-blue-500 text-white rounded w-full text-center"
      //     onClick={() => toggleSection("property_offences")}
      //   >
      //     Property Offences under BNS
      //   </button>

      //   <div className={`overflow-hidden transition-all duration-500 ${openSections.property_offences ? "opacity-100" : "max-h-0 opacity-0"}`}>
      //     {PropertyAgainstBody(monthsInRange, duplicatedMonths)}
      //   </div>

      //   {/* 6 option */}
      //   <button
      //     className="px-4 py-2 bg-blue-500 text-white rounded w-full text-center"
      //     onClick={() => toggleSection("esakshya")}
      //   >
      //     eSakshya Details
      //   </button>

      //   <div className={`overflow-hidden transition-all duration-500 ${openSections.esakshya ? "opacity-100" : "max-h-0 opacity-0"}`}>
      //     {esakshyaDetails(monthsInRange, duplicatedMonths)}
      //   </div>
      //   {/* 7 option */}
      //   <button
      //     className="px-4 py-2 bg-blue-500 text-white rounded w-full text-center"
      //     onClick={() => toggleSection("esakshya_app")}
      //   >
      //     Use of eSakshya App in cases with punishment of 7 yrs. or more
      //   </button>

      //   <div className={`overflow-hidden transition-all duration-500 ${openSections.esakshya_app ? "opacity-100" : "max-h-0 opacity-0"}`}>
      //     {useOfEsakshyaDetails(monthsInRange, duplicatedMonths)}

      //   </div>
      //   {/* 8 option */}
      //   <button
      //     className="px-4 py-2 bg-blue-500 text-white rounded w-full text-center"
      //     onClick={() => toggleSection("zero_fir")}
      //   >
      //     Zero FIR's
      //   </button>

      //   <div className={`overflow-hidden transition-all duration-500 ${openSections.zero_fir ? "opacity-100" : "max-h-0 opacity-0"}`}>
      //     {ZeroFIRDetails(monthsInRange, duplicatedMonths)}

      //   </div>
      //   {/* 9 option */}
      //   <button
      //     className="px-4 py-2 bg-blue-500 text-white rounded w-full text-center"
      //     onClick={() => toggleSection("eFIR")}
      //   >
      //     eFIR's
      //   </button>

      //   <div className={`overflow-hidden transition-all duration-500 ${openSections.eFIR ? "opacity-100" : "max-h-0 opacity-0"}`}>
      //     {EFIRDetails(monthsInRange, duplicatedMonths)}

      //   </div>
      //   {/* 10 option */}
      //   <button
      //     className="px-4 py-2 bg-blue-500 text-white rounded w-full text-center"
      //     onClick={() => toggleSection("ITSSO")}
      //   >
      //     ITSSO Compilance Form
      //   </button>

      //   <div className={`overflow-hidden transition-all duration-500 ${openSections.ITSSO ? "opacity-100" : "max-h-0 opacity-0"}`}>
      //     {ITSSOComplianceForm(monthsInRange, duplicatedMonths)}

      //   </div>
      //   {/* 11 option */}
      //   <button
      //     className="px-4 py-2 bg-blue-500 text-white rounded w-full text-center"
      //     onClick={() => toggleSection("stolen_recover")}
      //   >
      //     Stolen & Recovered Property
      //   </button>

      //   <div className={`overflow-hidden transition-all duration-500 ${openSections.stolen_recover ? "opacity-100" : "max-h-0 opacity-0"}`}>
      //     {StolenRecoveredProperty(monthsInRange, duplicatedMonths)}

      //   </div>
      //   {/* 12 option */}
      //   <button
      //     className="px-4 py-2 bg-blue-500 text-white rounded w-full text-center"
      //     onClick={() => toggleSection("conviction_bns")}
      //   >
      //     Conviction Under BNS
      //   </button>

      //   <div className={`overflow-hidden transition-all duration-500 ${openSections.conviction_bns ? "opacity-100" : "max-h-0 opacity-0"}`}>
      //     {ConvictionUnderBNS(monthsInRange, duplicatedMonths)}

      //   </div>

      //   {/* 12 option */}
      //   <button
      //     className="px-4 py-2 bg-blue-500 text-white rounded w-full text-center"
      //     onClick={() => toggleSection("forensic_visits")}
      //   >
      //     Forensic visists
      //   </button>

      //   <div className={`overflow-hidden transition-all duration-500 ${openSections.forensic_visits ? "opacity-100" : "max-h-0 opacity-0"}`}>
      //     {VisitOfForensicTeams(monthsInRange, duplicatedMonths)}

      //   </div>

      // </div>

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
            className={`px-4 py-2 rounded w-full text-center mb-1 ${
              openSection === section.key ? "bg-blue-400 text-white" : "bg-gray-700 text-white"
            }`}
            onClick={() => toggleSection(section.key)}
          >
            {section.label}
          </button>

          <div className={`overflow-hidden transition-all duration-500 ${
            openSection === section.key ? "opacity-100 max-h-screen" : "max-h-0 opacity-0"
          }`}>
            {(() => {
              switch(section.key) {
                case "training": return TrainingForm(monthsInRange, duplicatedMonths);
                case "pendency": return pendencyForm(monthsInRange, duplicatedMonths);
                case "untraced": return untraced(monthsInRange, duplicatedMonths);
                case "offences_against": return offencesAgainstBody(monthsInRange, duplicatedMonths);
                case "important_bns": return ImportantAgainstBody(monthsInRange, duplicatedMonths);
                case "property_offences": return PropertyAgainstBody(monthsInRange, duplicatedMonths);
                case "esakshya": return esakshyaDetails(monthsInRange, duplicatedMonths);
                case "esakshya_app": return useOfEsakshyaDetails(monthsInRange, duplicatedMonths);
                case "zero_fir": return ZeroFIRDetails(monthsInRange, duplicatedMonths);
                case "eFIR": return EFIRDetails(monthsInRange, duplicatedMonths);
                case "ITSSO": return ITSSOComplianceForm(monthsInRange, duplicatedMonths);
                case "stolen_recover": return StolenRecoveredProperty(monthsInRange, duplicatedMonths);
                case "conviction_bns": return ConvictionUnderBNS(monthsInRange, duplicatedMonths);
                case "forensic_visits": return VisitOfForensicTeams(monthsInRange, duplicatedMonths);
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
                              // handleDateChange(e, "toDate")
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

                  {/* History Button */}
                  {/* <Button variant="contained" color="primary" onClick={fetchHistory} className="mt-4">
                    Download
                  </Button> */}

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









                  {/* Month Dropdowns (Only appear when valid date range is selected) */}
                  {monthsInRange.length > 0 ? (
                    <div className="mt-4">
                      {/* {[...monthsInRange, ...duplicatedMonths].map((entry, index) => {
                          const month = entry.month || entry; // Handle both original and duplicated months
                          const isDuplicate = !!entry.id; // Check if this is a duplicated month
                          const entryId = entry.id || index; 
                          
                          const isPrevFormFilled = index === 0 || isFormFilled(index - 1); 

                          console.log("month : ",month); */}



                      {/* return ( */}
                      <div className="mt-4">

                        {/* {training_active?.section === "training"
                          ? TrainingForm(monthsInRange, duplicatedMonths)
                          : training_active?.section === "FIR"
                            ? formSelecter(monthsInRange, duplicatedMonths)[formData.formType]
                            : VisitOfForensicTeams(monthsInRange, duplicatedMonths)} */}


                        {Modified(monthsInRange, duplicatedMonths)}

                      </div>
                      {/* ); */}
                      {/* })} */}
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
                  data={formValues} // Now sending formValues, whether from form input or uploaded file
                  onSubmit={handleSubmit}
                  onEdit={handleEdit}
                  selectTab={selectedTab}
                  csvData={csvData}
                />
              )}


              <Box sx={{ padding: 2, borderTop: "1px solid #ddd", backgroundColor: "#f9f9f9", display: 'flex', justifyContent: "center" }}>

                <Button
                  fullWidth
                  variant="contained"
                  sx={{ backgroundColor: "#2d3748", color: "white", width: "30%" }}
                  // disabled={!verified}
                  onClick={() => {
                    handleSubmit();
                    setDialogOpen(true); // Opens dialog
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

