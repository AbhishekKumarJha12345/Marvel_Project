import React, { useState, useEffect } from "react";
import { Bar, Line } from "react-chartjs-2";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const chartColors = ["#8884d8", "#82ca9d", "#f2c57c"];

const DrilldownTrainingChart = () => {
  const [selectedTab, setSelectedTab] = useState("Training");

  const [selectedMode, setSelectedMode] = useState("ALL");
  const [selectedMonth, setSelectedMonth] = useState("Jan");
  const [selectedDate, setSelectedDate] = useState(null);
  const [view, setView] = useState("main");

  // const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul","Aug","Sept"];
  const modes = ["ALL", "ONLINE", "OFFLINE"];
  const [selectedTraining, setSelectedTraining] = useState("");

  const trainingDataa = [
    { date: "2/11/2023", name: "Departmental Enquiry/ Primary Enquiry", mode: "Online", trainer: "Ram Kumar", totalRegistrations: 229, attendees: 23 },
    { date: "2/11/2023", name: "Training of Investigator on Women Safety (BPR&D New Delhi)", mode: "Online", trainer: "Suresh Sharma", totalRegistrations: 261, attendees: 65 },
    { date: "4/11/2023", name: "Training of Investigator on Women Safety", mode: "Offline", trainer: "Anjali Verma", totalRegistrations: 227, attendees: 76 },
    { date: "4/11/2023", name: "Sensitization of Police Officers on Atrocities against SC/ST and Investigation of Cases", mode: "Offline", trainer: "Pooja Singh", totalRegistrations: 83, attendees: 54 },
    { date: "6/11/2023", name: "CDR, IPDR Mobile Related Crime and Mobile Forensic", mode: "Offline", trainer: "Rajesh Patel", totalRegistrations: 183, attendees: 54 },
    { date: "7/11/2023", name: "Investigation of NDPS Cases", mode: "Online", trainer: "Sunita Mehta", totalRegistrations: 367, attendees: 63 },
    { date: "9/11/2023", name: "Training of Investigator on Women Safety (BPR&D New Delhi)", mode: "Offline", trainer: "Vikram Joshi", totalRegistrations: 444, attendees: 87 },
    { date: "9/11/2023", name: "Preventive Action and Externment Proceedings & MPDA", mode: "Online", trainer: "Neha Reddy", totalRegistrations: 88, attendees: 81 },
    { date: "9/11/2023", name: "Training of Investigator on Women Safety (BPR&D New Delhi)", mode: "Online", trainer: "Alok Mishra", totalRegistrations: 379, attendees: 43 },
    { date: "13/11/2023", name: "Death in Custody and Custodial Violence", mode: "Online", trainer: "Deepa Nair", totalRegistrations: 167, attendees: 56 },
    { date: "13/11/2023", name: "Training of Prosecutors on Women Safety (BPR&D New Delhi)", mode: "Offline", trainer: "Manoj Tiwari", totalRegistrations: 145, attendees: 87 },
    { date: "13/11/2023", name: "Handling Law & Order and Use of Force", mode: "Online", trainer: "Kiran Desai", totalRegistrations: 234, attendees: 98 },
    { date: "14/11/2023", name: "Digital Payment Fraud", mode: "Offline", trainer: "Amit Shukla", totalRegistrations: 233, attendees: 90 },
    { date: "14/11/2023", name: "Investigation of NDPS Cases", mode: "Offline", trainer: "Swati Saxena", totalRegistrations: 360, attendees: 54 },
    { date: "17/11/2023", name: "Investigation of Economic Crime Cases", mode: "Online", trainer: "Prakash Yadav", totalRegistrations: 185, attendees: 89 },
    { date: "17/11/2023", name: "Interrogation Skill", mode: "Offline", trainer: "Ritika Sen", totalRegistrations: 133, attendees: 90 },
    { date: "20/11/2023", name: "OSINT and Social Media Analysis", mode: "Online", trainer: "Harish Gupta", totalRegistrations: 431, attendees: 234 },
    { date: "20/11/2023", name: "Gender Sensitization (BPR&D New Delhi)", mode: "Offline", trainer: "Meena Khatri", totalRegistrations: 93, attendees: 43 },
    { date: "20/11/2023", name: "Police Station Management", mode: "Online", trainer: "Arun Pillai", totalRegistrations: 477, attendees: 399 },
    { date: "24/11/2023", name: "Gender Sensitization (BPR&D New Delhi)", mode: "Offline", trainer: "Jyoti Chauhan", totalRegistrations: 453, attendees: 98 },
    { date: "24/11/2023", name: "Intelligence Collection", mode: "Offline", trainer: "Santosh Nair", totalRegistrations: 492, attendees: 90 },
    { date: "24/11/2023", name: "Crime Conviction", mode: "Online", trainer: "Divya Kapoor", totalRegistrations: 306, attendees: 290 },
    { date: "24/11/2023", name: "Investigation of NDPS Cases", mode: "Online", trainer: "Ramesh Iyer", totalRegistrations: 206, attendees: 189 },
    { date: "30/11/2023", name: "Investigation of Cyber Crime Related to Social Media", mode: "Online", trainer: "Sneha Dutta", totalRegistrations: 231, attendees: 187 },
    { date: "30/11/2023", name: "Investigation of Bank Fraud Cases", mode: "Online", trainer: "Varun Saxena", totalRegistrations: 330, attendees: 267 },
    { date: "30/11/2023", name: "Departmental Enquiry/ Primary Enquiry", mode: "Online", trainer: "Nidhi Chauhan", totalRegistrations: 368, attendees: 254 },
    { date: "4/12/2023", name: "Investigation of Economic Crime Cases", mode: "Offline", trainer: "Akhil Menon", totalRegistrations: 271, attendees: 65 },
    { date: "4/12/2023", name: "Investigation of NDPS Cases", mode: "Offline", trainer: "Priya Bhatt", totalRegistrations: 285, attendees: 89 },
    { date: "11/12/2023", name: "Training of Investigator on Women Safety (BPR&D New Delhi)", mode: "Offline", trainer: "Suresh Sharma", totalRegistrations: 90, attendees: 67 },
    { date: "11/12/2023", name: "Training of Investigator on Women Safety", mode: "Online", trainer: "Anjali Verma", totalRegistrations: 237, attendees: 201 },
    { date: "14/12/2023", name: "Sensitization of Police Officers on Atrocities against SC/ST and Investigation of Cases", mode: "Offline", trainer: "Pooja Singh", totalRegistrations: 147, attendees: 111 },
    { date: "14/12/2023", name: "CDR, IPDR Mobile Related Crime and Mobile Forensic", mode: "Online", trainer: "Rajesh Patel", totalRegistrations: 69, attendees: 13 },
    { date: "18/12/2023", name: "Investigation of NDPS Cases", mode: "Online", trainer: "Sunita Mehta", totalRegistrations: 369, attendees: 310 },
    { date: "20/12/2023", name: "Training of Investigator on Women Safety (BPR&D New Delhi)", mode: "Online", trainer: "Vikram Joshi", totalRegistrations: 70, attendees: 23 },
    { date: "25/12/2023", name: "Preventive Action and Externment Proceedings & MPDA", mode: "Offline", trainer: "Neha Reddy", totalRegistrations: 76, attendees: 25 },
    { date: "25/12/2023", name: "Training of Investigator on Women Safety (BPR&D New Delhi)", mode: "Online", trainer: "Alok Mishra", totalRegistrations: 448, attendees: 410 },
    { date: "26/12/2023", name: "Death in Custody and Custodial Violence", mode: "Offline", trainer: "Deepa Nair", totalRegistrations: 499, attendees: 409 },
    { date: "1/1/2024", name: "Training of Prosecutors on Women Safety (BPR&D New Delhi)", mode: "Offline", trainer: "Manoj Tiwari", totalRegistrations: 316, attendees: 199 },
    { date: "4/1/2024", name: "Handling Law & Order and Use of Force", mode: "Online", trainer: "Kiran Desai", totalRegistrations: 388, attendees: 100 },
    { date: "8/1/2024", name: "Digital Payment Fraud", mode: "Offline", trainer: "Amit Shukla", totalRegistrations: 43, attendees: 34 },
    { date: "8/1/2024", name: "Investigation of NDPS Cases", mode: "Online", trainer: "Swati Saxena", totalRegistrations: 472, attendees: 410 },
    { date: "10/1/2024", name: "Investigation of Economic Crime Cases", mode: "Offline", trainer: "Prakash Yadav", totalRegistrations: 196, attendees: 99 },
    { date: "10/1/2024", name: "Interrogation Skill", mode: "Online", trainer: "Ritika Sen", totalRegistrations: 402, attendees: 201 },
    { date: "11/1/2024", name: "OSINT and Social Media Analysis", mode: "Offline", trainer: "Harish Gupta", totalRegistrations: 230, attendees: 201 },
    { date: "11/1/2024", name: "Gender Sensitization (BPR&D New Delhi)", mode: "Offline", trainer: "Meena Khatri", totalRegistrations: 95, attendees: 10 },
    { date: "11/1/2024", name: "Police Station Management", mode: "Online", trainer: "Arun Pillai", totalRegistrations: 470, attendees: 401 },
    { date: "16/1/2024", name: "Gender Sensitization (BPR&D New Delhi)", mode: "Online", trainer: "Jyoti Chauhan", totalRegistrations: 156, attendees: 140 },
    { date: "16/1/2024", name: "Intelligence Collection", mode: "Online", trainer: "Santosh Nair", totalRegistrations: 36, attendees: 19 },
    { date: "18/1/2024", name: "Crime Conviction", mode: "Online", trainer: "Divya Kapoor", totalRegistrations: 404, attendees: 202 },
    { date: "19/1/2024", name: "Investigation of NDPS Cases", mode: "Online", trainer: "Ramesh Iyer", totalRegistrations: 413, attendees: 199 },
    { date: "22/1/2024", name: "Investigation of Cyber Crime Related to Social Media", mode: "Offline", trainer: "Sneha Dutta", totalRegistrations: 168, attendees: 100 },
    { date: "1/2/2024", name: "Investigation of Bank Fraud Cases", mode: "Offline", trainer: "Varun Saxena", totalRegistrations: 365, attendees: 34 },
    { date: "1/2/2024", name: "Departmental Enquiry/ Primary Enquiry", mode: "Offline", trainer: "Nidhi Chauhan", totalRegistrations: 432, attendees: 410 },
    { date: "2/2/2024", name: "Investigation of Economic Crime Cases", mode: "Online", trainer: "Akhil Menon", totalRegistrations: 428, attendees: 99 },
    { date: "2/2/2024", name: "Investigation of NDPS Cases", mode: "Offline", trainer: "Priya Bhatt", totalRegistrations: 219, attendees: 201 },
    { date: "7/2/2024", name: "Departmental Enquiry/ Primary Enquiry", mode: "Online", trainer: "Ram Kumar", totalRegistrations: 52, attendees: 43 },
    { date: "7/2/2024", name: "Training of Investigator on Women Safety (BPR&D New Delhi)", mode: "Online", trainer: "Suresh Sharma", totalRegistrations: 265, attendees: 100 },
    { date: "9/2/2024", name: "Training of Investigator on Women Safety", mode: "Online", trainer: "Anjali Verma", totalRegistrations: 326, attendees: 301 },
    { date: "13/2/2024", name: "Sensitization of Police Officers on Atrocities against SC/ST and Investigation of Cases", mode: "Offline", trainer: "Pooja Singh", totalRegistrations: 242, attendees: 140 },
    { date: "13/2/2024", name: "CDR, IPDR Mobile Related Crime and Mobile Forensic", mode: "Online", trainer: "Rajesh Patel", totalRegistrations: 334, attendees: 199 },
    { date: "15/2/2024", name: "Investigation of NDPS Cases", mode: "Offline", trainer: "Sunita Mehta", totalRegistrations: 244, attendees: 202 },
    { date: "15/2/2024", name: "Training of Investigator on Women Safety (BPR&D New Delhi)", mode: "Offline", trainer: "Vikram Joshi", totalRegistrations: 412, attendees: 400 },
    { date: "19/2/2024", name: "Preventive Action and Externment Proceedings & MPDA", mode: "Online", trainer: "Neha Reddy", totalRegistrations: 179, attendees: 19 },
    { date: "20/2/2024", name: "Training of Investigator on Women Safety (BPR&D New Delhi)", mode: "Offline", trainer: "Alok Mishra", totalRegistrations: 376, attendees: 100 },
    { date: "22/2/2024", name: "Death in Custody and Custodial Violence", mode: "Online", trainer: "Deepa Nair", totalRegistrations: 500, attendees: 301 },
    { date: "22/2/2024", name: "Training of Prosecutors on Women Safety (BPR&D New Delhi)", mode: "Offline", trainer: "Manoj Tiwari", totalRegistrations: 159, attendees: 140 },
    { date: "26/2/2024", name: "Handling Law & Order and Use of Force", mode: "Online", trainer: "Kiran Desai", totalRegistrations: 166, attendees: 19 },
    { date: "26/2/2024", name: "Digital Payment Fraud", mode: "Offline", trainer: "Amit Shukla", totalRegistrations: 304, attendees: 202 },
    { date: "1/3/2024", name: "Investigation of NDPS Cases", mode: "Offline", trainer: "Swati Saxena", totalRegistrations: 418, attendees: 400 },
    { date: "1/3/2024", name: "Investigation of Economic Crime Cases", mode: "Online", trainer: "Prakash Yadav", totalRegistrations: 264, attendees: 199 },
    { date: "4/3/2024", name: "Interrogation Skill", mode: "Online", trainer: "Ritika Sen", totalRegistrations: 356, attendees: 98 },
    { date: "4/3/2024", name: "OSINT and Social Media Analysis", mode: "Online", trainer: "Harish Gupta", totalRegistrations: 203, attendees: 45 },
    { date: "7/3/2024", name: "Gender Sensitization (BPR&D New Delhi)", mode: "Online", trainer: "Meena Khatri", totalRegistrations: 154, attendees: 87 },
    { date: "7/3/2024", name: "Police Station Management", mode: "Online", trainer: "Arun Pillai", totalRegistrations: 223, attendees: 87 },
    { date: "7/3/2024", name: "Gender Sensitization (BPR&D New Delhi)", mode: "Offline", trainer: "Jyoti Chauhan", totalRegistrations: 136, attendees: 89 },
    { date: "11/3/2024", name: "Intelligence Collection", mode: "Offline", trainer: "Santosh Nair", totalRegistrations: 47, attendees: 41 },
    { date: "11/3/2024", name: "Crime Conviction", mode: "Offline", trainer: "Divya Kapoor", totalRegistrations: 56, attendees: 20 },
    { date: "15/3/2024", name: "Investigation of NDPS Cases", mode: "Online", trainer: "Ramesh Iyer", totalRegistrations: 198, attendees: 99 },
    { date: "18/3/2024", name: "Investigation of Cyber Crime Related to Social Media", mode: "Offline", trainer: "Sneha Dutta", totalRegistrations: 481, attendees: 56 },
    { date: "20/3/2024", name: "Investigation of Bank Fraud Cases", mode: "Online", trainer: "Varun Saxena", totalRegistrations: 475, attendees: 87 },
    { date: "22/3/2024", name: "Departmental Enquiry/ Primary Enquiry", mode: "Online", trainer: "Nidhi Chauhan", totalRegistrations: 443, attendees: 98 },
    { date: "22/3/2024", name: "Investigation of Economic Crime Cases", mode: "Online", trainer: "Akhil Menon", totalRegistrations: 362, attendees: 75 },
    { date: "22/3/2024", name: "Investigation of NDPS Cases", mode: "Offline", trainer: "Priya Bhatt", totalRegistrations: 75, attendees: 32 },
    { date: "26/3/2024", name: "Departmental Enquiry/ Primary Enquiry", mode: "Online", trainer: "Ram Kumar", totalRegistrations: 28, attendees: 14 },
    { date: "26/3/2024", name: "Training of Investigator on Women Safety (BPR&D New Delhi)", mode: "Offline", trainer: "Suresh Sharma", totalRegistrations: 204, attendees: 100 },
    { date: "26/3/2024", name: "Training of Investigator on Women Safety", mode: "Offline", trainer: "Anjali Verma", totalRegistrations: 382, attendees: 109 },
    { date: "2/4/2024", name: "Sensitization of Police Officers on Atrocities against SC/ST and Investigation of Cases", mode: "Online", trainer: "Pooja Singh", totalRegistrations: 235, attendees: 209 },
    { date: "2/4/2024", name: "CDR, IPDR Mobile Related Crime and Mobile Forensic", mode: "Offline", trainer: "Rajesh Patel", totalRegistrations: 408, attendees: 400 },
    { date: "4/4/2024", name: "Investigation of NDPS Cases", mode: "Online", trainer: "Sunita Mehta", totalRegistrations: 401, attendees: 299 },
    { date: "4/4/2024", name: "Training of Investigator on Women Safety (BPR&D New Delhi)", mode: "Offline", trainer: "Vikram Joshi", totalRegistrations: 343, attendees: 341 },
    { date: "8/4/2024", name: "Preventive Action and Externment Proceedings & MPDA", mode: "Online", trainer: "Neha Reddy", totalRegistrations: 62, attendees: 60 },
    { date: "10/4/2024", name: "Training of Investigator on Women Safety (BPR&D New Delhi)", mode: "Offline", trainer: "Alok Mishra", totalRegistrations: 420, attendees: 410 },
    { date: "12/4/2024", name: "Death in Custody and Custodial Violence", mode: "Offline", trainer: "Deepa Nair", totalRegistrations: 225, attendees: 201 },
    { date: "12/4/2024", name: "Training of Prosecutors on Women Safety (BPR&D New Delhi)", mode: "Online", trainer: "Manoj Tiwari", totalRegistrations: 192, attendees: 187 },
    { date: "1/5/2024", name: "Handling Law & Order and Use of Force", mode: "Online", trainer: "Kiran Desai", totalRegistrations: 45, attendees: 41 },
    { date: "6/5/2024", name: "Digital Payment Fraud", mode: "Online", trainer: "Amit Shukla", totalRegistrations: 361, attendees: 309 },
    { date: "6/5/2024", name: "Investigation of NDPS Cases", mode: "Online", trainer: "Swati Saxena", totalRegistrations: 392, attendees: 310 },
    { date: "7/5/2024", name: "Investigation of Economic Crime Cases", mode: "Online", trainer: "Prakash Yadav", totalRegistrations: 337, attendees: 310 },
    { date: "9/5/2024", name: "Interrogation Skill", mode: "Offline", trainer: "Ritika Sen", totalRegistrations: 297, attendees: 291 },
    { date: "9/5/2024", name: "OSINT and Social Media Analysis", mode: "Offline", trainer: "Harish Gupta", totalRegistrations: 494, attendees: 490 },
    { date: "13/5/2024", name: "Gender Sensitization (BPR&D New Delhi)", mode: "Offline", trainer: "Meena Khatri", totalRegistrations: 335, attendees: 330 },
    { date: "15/5/2024", name: "Police Station Management", mode: "Offline", trainer: "Arun Pillai", totalRegistrations: 176, attendees: 167 },
    { date: "17/5/2024", name: "Gender Sensitization (BPR&D New Delhi)", mode: "Offline", trainer: "Jyoti Chauhan", totalRegistrations: 14, attendees: 11 },
    { date: "20/5/2024", name: "Intelligence Collection", mode: "Online", trainer: "Santosh Nair", totalRegistrations: 427, attendees: 410 },
    { date: "21/5/2024", name: "Crime Conviction", mode: "Online", trainer: "Divya Kapoor", totalRegistrations: 288, attendees: 210 },
    { date: "21/5/2024", name: "Investigation of NDPS Cases", mode: "Online", trainer: "Ramesh Iyer", totalRegistrations: 447, attendees: 410 },
    { date: "21/5/2024", name: "Investigation of Cyber Crime Related to Social Media", mode: "Online", trainer: "Sneha Dutta", totalRegistrations: 406, attendees: 389 },
    { date: "23/5/2024", name: "Investigation of Bank Fraud Cases", mode: "Online", trainer: "Varun Saxena", totalRegistrations: 11, attendees: 10 },
    { date: "23/5/2024", name: "Departmental Enquiry/ Primary Enquiry", mode: "Offline", trainer: "Nidhi Chauhan", totalRegistrations: 352, attendees: 340 },
    { date: "28/5/2024", name: "Investigation of Economic Crime Cases", mode: "Online", trainer: "Akhil Menon", totalRegistrations: 249, attendees: 201 },
    { date: "28/5/2024", name: "Investigation of NDPS Cases", mode: "Online", trainer: "Priya Bhatt", totalRegistrations: 91, attendees: 76 },
    { date: "30/5/2024", name: "Departmental Enquiry/ Primary Enquiry", mode: "Online", trainer: "Ram Kumar", totalRegistrations: 429, attendees: 410 },
    { date: "31/5/2024", name: "Training of Investigator on Women Safety (BPR&D New Delhi)", mode: "Offline", trainer: "Suresh Sharma", totalRegistrations: 342, attendees: 309 },
    { date: "31/5/2024", name: "Training of Investigator on Women Safety", mode: "Offline", trainer: "Anjali Verma", totalRegistrations: 332, attendees: 330 },
    { date: "31/5/2024", name: "Sensitization of Police Officers on Atrocities against SC/ST and Investigation of Cases", mode: "Offline", trainer: "Pooja Singh", totalRegistrations: 395, attendees: 378 },
    { date: "3/6/2024", name: "CDR, IPDR Mobile Related Crime and Mobile Forensic", mode: "Offline", trainer: "Rajesh Patel", totalRegistrations: 341, attendees: 330 },
    { date: "3/6/2024", name: "Investigation of NDPS Cases", mode: "Offline", trainer: "Sunita Mehta", totalRegistrations: 97, attendees: 34 },
    { date: "5/6/2024", name: "Training of Investigator on Women Safety (BPR&D New Delhi)", mode: "Online", trainer: "Vikram Joshi", totalRegistrations: 417, attendees: 409 },
    { date: "5/6/2024", name: "Preventive Action and Externment Proceedings & MPDA", mode: "Online", trainer: "Neha Reddy", totalRegistrations: 479, attendees: 418 },
    { date: "7/6/2024", name: "Training of Investigator on Women Safety (BPR&D New Delhi)", mode: "Online", trainer: "Alok Mishra", totalRegistrations: 31, attendees: 29 },
    { date: "10/6/2024", name: "Death in Custody and Custodial Violence", mode: "Online", trainer: "Deepa Nair", totalRegistrations: 377, attendees: 87 },
    { date: "10/6/2024", name: "Training of Prosecutors on Women Safety (BPR&D New Delhi)", mode: "Online", trainer: "Manoj Tiwari", totalRegistrations: 311, attendees: 89 },
    { date: "12/6/2024", name: "Handling Law & Order and Use of Force", mode: "Offline", trainer: "Kiran Desai", totalRegistrations: 452, attendees: 51 },
    { date: "12/6/2024", name: "Digital Payment Fraud", mode: "Online", trainer: "Amit Shukla", totalRegistrations: 461, attendees: 410 },
    { date: "12/6/2024", name: "Investigation of NDPS Cases", mode: "Online", trainer: "Swati Saxena", totalRegistrations: 59, attendees: 55 },
    { date: "13/6/2024", name: "Investigation of Economic Crime Cases", mode: "Online", trainer: "Prakash Yadav", totalRegistrations: 48, attendees: 44 },
    { date: "14/6/2024", name: "Interrogation Skill", mode: "Offline", trainer: "Ritika Sen", totalRegistrations: 187, attendees: 18 },
    { date: "14/6/2024", name: "OSINT and Social Media Analysis", mode: "Offline", trainer: "Harish Gupta", totalRegistrations: 381, attendees: 290 },
    { date: "17/6/2024", name: "Gender Sensitization (BPR&D New Delhi)", mode: "Offline", trainer: "Meena Khatri", totalRegistrations: 157, attendees: 154 },
    { date: "26/6/2024", name: "Police Station Management", mode: "Offline", trainer: "Arun Pillai", totalRegistrations: 301, attendees: 300 },
    { date: "26/6/2024", name: "Gender Sensitization (BPR&D New Delhi)", mode: "Offline", trainer: "Jyoti Chauhan", totalRegistrations: 118, attendees: 109 },
    { date: "28/6/2024", name: "Intelligence Collection", mode: "Online", trainer: "Santosh Nair", totalRegistrations: 282, attendees: 281 },
    { date: "28/6/2024", name: "Crime Conviction", mode: "Online", trainer: "Divya Kapoor", totalRegistrations: 399, attendees: 310 },
    { date: "28/6/2024", name: "Investigation of NDPS Cases", mode: "Online", trainer: "Ramesh Iyer", totalRegistrations: 148, attendees: 140 },
    { date: "5/7/2024", name: "Investigation of Cyber Crime Related to Social Media", mode: "Online", trainer: "Sneha Dutta", totalRegistrations: 190, attendees: 180 },
    { date: "5/7/2024", name: "Investigation of Bank Fraud Cases", mode: "Online", trainer: "Varun Saxena", totalRegistrations: 490, attendees: 410 },
    { date: "8/7/2024", name: "Departmental Enquiry/ Primary Enquiry", mode: "Offline", trainer: "Nidhi Chauhan", totalRegistrations: 217, attendees: 210 },
    { date: "8/7/2024", name: "Investigation of Economic Crime Cases", mode: "Online", trainer: "Akhil Menon", totalRegistrations: 284, attendees: 210 },
    { date: "8/7/2024", name: "Investigation of NDPS Cases", mode: "Online", trainer: "Priya Bhatt", totalRegistrations: 131, attendees: 110 },
    { date: "10/7/2024", name: "Departmental Enquiry/ Primary Enquiry", mode: "Online", trainer: "Ram Kumar", totalRegistrations: 87, attendees: 85 },
    { date: "10/7/2024", name: "Training of Investigator on Women Safety (BPR&D New Delhi)", mode: "Offline", trainer: "Suresh Sharma", totalRegistrations: 462, attendees: 409 },
    { date: "12/7/2024", name: "Training of Investigator on Women Safety", mode: "Offline", trainer: "Anjali Verma", totalRegistrations: 73, attendees: 71 },
    { date: "12/7/2024", name: "Sensitization of Police Officers on Atrocities against SC/ST and Investigation of Cases", mode: "Offline", trainer: "Pooja Singh", totalRegistrations: 40, attendees: 20 },
    { date: "16/7/2024", name: "CDR, IPDR Mobile Related Crime and Mobile Forensic", mode: "Offline", trainer: "Rajesh Patel", totalRegistrations: 489, attendees: 409 },
    { date: "16/7/2024", name: "Investigation of NDPS Cases", mode: "Offline", trainer: "Sunita Mehta ", totalRegistrations: 435, attendees: 48 },
    { date: "16/7/2024", name: "Training of Investigator on Women Safety (BPR&D New Delhi)", mode: "Online", trainer: "Vikram Joshi", totalRegistrations: 44, attendees: 41 },
    { date: "16/7/2024", name: "Preventive Action and Externment Proceedings & MPDA", mode: "Online", trainer: "Neha Reddy", totalRegistrations: 273, attendees: 75 },
    { date: "23/7/2024", name: "Training of Investigator on Women Safety (BPR&D New Delhi)", mode: "Online", trainer: "Alok Mishra", totalRegistrations: 254, attendees: 89 },
    { date: "23/7/2024", name: "Death in Custody and Custodial Violence", mode: "Online", trainer: "Deepa Nair", totalRegistrations: 54, attendees: 9 },
    { date: "24/7/2024", name: "Training of Prosecutors on Women Safety (BPR&D New Delhi)", mode: "Online", trainer: "Manoj Tiwari", totalRegistrations: 123, attendees: 110 },
    { date: "24/7/2024", name: "Handling Law & Order and Use of Force", mode: "Offline", trainer: "Kiran Desai", totalRegistrations: 144, attendees: 121 },
    { date: "26/7/2024", name: "Digital Payment Fraud", mode: "Online", trainer: "Amit Shukla", totalRegistrations: 338, attendees: 190 },
    { date: "2/8/2024", name: "Investigation of NDPS Cases", mode: "Online", trainer: "Swati Saxena", totalRegistrations: 262, attendees: 209 },
    { date: "2/8/2024", name: "Investigation of Economic Crime Cases", mode: "Online", trainer: "Prakash Yadav", totalRegistrations: 439, attendees: 410 },
    { date: "8/8/2024", name: "Interrogation Skill", mode: "Offline", trainer: "Ritika Sen", totalRegistrations: 272, attendees: 218 },
    { date: "9/8/2024", name: "OSINT and Social Media Analysis", mode: "Offline", trainer: "Harish Gupta", totalRegistrations: 32, attendees: 13 },
    { date: "13/8/2024", name: "Gender Sensitization (BPR&D New Delhi)", mode: "Offline", trainer: "Meena Khatri", totalRegistrations: 177, attendees: 109 },
    { date: "13/8/2024", name: "Police Station Management", mode: "Offline", trainer: "Arun Pillai", totalRegistrations: 10, attendees: 7 },
    { date: "21/8/2024", name: "Gender Sensitization (BPR&D New Delhi)", mode: "Offline", trainer: "Jyoti Chauhan", totalRegistrations: 260, attendees: 29 },
    { date: "26/8/2024", name: "Intelligence Collection", mode: "Online", trainer: "Santosh Nair", totalRegistrations: 314, attendees: 311 },
    { date: "26/8/2024", name: "Crime Conviction", mode: "Online", trainer: "Divya Kapoor", totalRegistrations: 39, attendees: 13 },
    { date: "28/8/2024", name: "Investigation of NDPS Cases", mode: "Online", trainer: "Ramesh Iyer", totalRegistrations: 269, attendees: 193 },
    { date: "28/8/2024", name: "Investigation of Cyber Crime Related to Social Media", mode: "Online", trainer: "Sneha Dutta", totalRegistrations: 37, attendees: 21 },
    { date: "29/8/2024", name: "Investigation of Bank Fraud Cases", mode: "Online", trainer: "Varun Saxena", totalRegistrations: 296, attendees: 244 },
    { date: "30/8/2024", name: "Departmental Enquiry/ Primary Enquiry", mode: "Offline", trainer: "Nidhi Chauhan", totalRegistrations: 454, attendees: 379 },
    { date: "30/8/2024", name: "Investigation of Economic Crime Cases", mode: "Online", trainer: "Akhil Menon", totalRegistrations: 98, attendees: 82 },
    { date: "1/9/2024", name: "Investigation of NDPS Cases", mode: "Online", trainer: "Priya Bhatt", totalRegistrations: 12, attendees: 8 },
    { date: "3/9/2024", name: "Departmental Enquiry/ Primary Enquiry", mode: "Online", trainer: "Ram Kumar", totalRegistrations: 410, attendees: 313 },
    { date: "4/9/2024", name: "Training of Investigator on Women Safety (BPR&D New Delhi)", mode: "Online", trainer: "Suresh Sharma", totalRegistrations: 213, attendees: 178 },
    { date: "5/9/2024", name: "Training of Investigator on Women Safety", mode: "Online", trainer: "Anjali Verma", totalRegistrations: 188, attendees: 116 },
    { date: "5/9/2024", name: "Sensitization of Police Officers on Atrocities against SC/ST and Investigation of Cases", mode: "Offline", trainer: "Pooja Singh", totalRegistrations: 389, attendees: 298 },
    { date: "10/9/2024", name: "CDR, IPDR Mobile Related Crime and Mobile Forensic", mode: "Offline", trainer: "Rajesh Patel", totalRegistrations: 49, attendees: 21 },
    { date: "7/9/2024", name: "Investigation of NDPS Cases", mode: "Offline", trainer: "Sunita Mehta", totalRegistrations: 241, attendees: 188 },
    { date: "8/9/2024", name: "Training of Investigator on Women Safety (BPR&D New Delhi)", mode: "Online", trainer: "Vikram Joshi", totalRegistrations: 245, attendees: 184 },
    { date: "9/9/2024", name: "Preventive Action and Externment Proceedings & MPDA", mode: "Offline", trainer: "Neha Reddy", totalRegistrations: 46, attendees: 31 },
    { date: "2/9/2024", name: "Training of Investigator on Women Safety (BPR&D New Delhi)", mode: "Online", trainer: "Alok Mishra", totalRegistrations: 263, attendees: 208 },
    { date: "3/9/2024", name: "Death in Custody and Custodial Violence", mode: "Online", trainer: "Deepa Nair", totalRegistrations: 473, attendees: 367 },
    { date: "5/9/2024", name: "Training of Prosecutors on Women Safety (BPR&D New Delhi)", mode: "Online", trainer: "Manoj Tiwari", totalRegistrations: 460, attendees: 388 },
    { date: "6/9/2024", name: "Handling Law & Order and Use of Force", mode: "Offline", trainer: "Kiran Desai", totalRegistrations: 355, attendees: 265 },
    { date: "7/9/2024", name: "Digital Payment Fraud", mode: "Online", trainer: "Amit Shukla", totalRegistrations: 171, attendees: 116 },
    { date: "8/9/2024", name: "Investigation of NDPS Cases", mode: "Offline", trainer: "Swati Saxena", totalRegistrations: 308, attendees: 273 },
    { date: "9/9/2024", name: "Investigation of Economic Crime Cases", mode: "Offline", trainer: "Prakash Yadav", totalRegistrations: 442, attendees: 428 },
    { date: "10/9/2024", name: "Interrogation Skill", mode: "Online", trainer: "Ritika Sen", totalRegistrations: 74, attendees: 63 },
    { date: "10/9/2024", name: "OSINT and Social Media Analysis", mode: "Offline", trainer: "Harish Gupta", totalRegistrations: 277, attendees: 214 },
    { date: "12/9/2024", name: "Gender Sensitization (BPR&D New Delhi)", mode: "Online", trainer: "Meena Khatri", totalRegistrations: 60, attendees: 25 },
    { date: "13/9/2024", name: "Police Station Management", mode: "Offline", trainer: "Arun Pillai", totalRegistrations: 327, attendees: 310 },
    { date: "14/9/2024", name: "Gender Sensitization (BPR&D New Delhi)", mode: "Offline", trainer: "Jyoti Chauhan", totalRegistrations: 182, attendees: 144 },
    { date: "15/9/2024", name: "Intelligence Collection", mode: "Offline", trainer: "Santosh Nair", totalRegistrations: 38, attendees: 25 },
    { date: "16/9/2024", name: "Crime Conviction", mode: "Offline", trainer: "Divya Kapoor", totalRegistrations: 92, attendees: 70 },
    { date: "17/9/2024", name: "Investigation of NDPS Cases", mode: "Online", trainer: "Ramesh Iyer", totalRegistrations: 426, attendees: 380 },
    { date: "18/9/2024", name: "Investigation of Cyber Crime Related to Social Media", mode: "Online", trainer: "Sneha Dutta", totalRegistrations: 445, attendees: 356 },
    { date: "18/9/2024", name: "Investigation of Bank Fraud Cases", mode: "Online", trainer: "Varun Saxena", totalRegistrations: 409, attendees: 376 },
    { date: "18/9/2024", name: "Departmental Enquiry/ Primary Enquiry", mode: "Online", trainer: "Nidhi Chauhan", totalRegistrations: 268, attendees: 186 },
    { date: "22/9/2024", name: "Investigation of Economic Crime Cases", mode: "Online", trainer: "Akhil Menon", totalRegistrations: 109, attendees: 79 },
    { date: "22/9/2024", name: "Investigation of NDPS Cases", mode: "Offline", trainer: "Priya Bhatt", totalRegistrations: 58, attendees: 36 },
    { date: "22/9/2024", name: "Departmental Enquiry/ Primary Enquiry", mode: "Offline", trainer: "Ram Kumar", totalRegistrations: 305, attendees: 286 },
    { date: "22/9/2024", name: "Training of Investigator on Women Safety (BPR&D New Delhi)", mode: "Offline", trainer: "Suresh Sharma", totalRegistrations: 216, attendees: 167 },
    { date: "22/9/2024", name: "Training of Investigator on Women Safety", mode: "Online", trainer: "Anjali Verma", totalRegistrations: 486, attendees: 413 },
    { date: "22/9/2024", name: "Sensitization of Police Officers on Atrocities against SC/ST and Investigation of Cases", mode: "Offline", trainer: "Pooja Singh", totalRegistrations: 79, attendees: 44 },
    { date: "22/9/2024", name: "CDR, IPDR Mobile Related Crime and Mobile Forensic", mode: "Online", trainer: "Rajesh Patel", totalRegistrations: 255, attendees: 195 },
    { date: "22/9/2024", name: "Investigation of NDPS Cases", mode: "Online", trainer: "Sunita Mehta", totalRegistrations: 347, attendees: 267 },
    { date: "22/9/2024", name: "Training of Investigator on Women Safety (BPR&D New Delhi)", mode: "Online", trainer: "Vikram Joshi", totalRegistrations: 496, attendees: 410 },
    { date: "22/9/2024", name: "Preventive Action and Externment Proceedings & MPDA", mode: "Offline", trainer: "Neha Reddy", totalRegistrations: 394, attendees: 298 },
    { date: "22/9/2024", name: "Training of Investigator on Women Safety (BPR&D New Delhi)", mode: "Online", trainer: "Alok Mishra", totalRegistrations: 155, attendees: 135 },
    { date: "22/9/2024", name: "Death in Custody and Custodial Violence", mode: "Offline", trainer: "Deepa Nair", totalRegistrations: 484, attendees: 386 },
    { date: "30/9/2024", name: "Training of Prosecutors on Women Safety (BPR&D New Delhi)", mode: "Offline", trainer: "Manoj Tiwari", totalRegistrations: 111, attendees: 78 },
    { date: "30/9/2024", name: "Handling Law & Order and Use of Force", mode: "Online", trainer: "Kiran Desai", totalRegistrations: 321, attendees: 266 },
    { date: "30/9/2024", name: "Digital Payment Fraud", mode: "Offline", trainer: "Amit Shukla", totalRegistrations: 55, attendees: 32 },
    { date: "15/10/2024", name: "Investigation of NDPS Cases", mode: "Online", trainer: "Swati Saxena", totalRegistrations: 346, attendees: 289 },
    { date: "16/10/2024", name: "Investigation of Economic Crime Cases", mode: "Offline", trainer: "Prakash Yadav", totalRegistrations: 493, attendees: 416 },
    { date: "1/11/2024", name: "Interrogation Skill", mode: "Online", trainer: "Ritika Sen", totalRegistrations: 466, attendees: 392 },
    { date: "1/11/2024", name: "OSINT and Social Media Analysis", mode: "Offline", trainer: "Harish Gupta", totalRegistrations: 407, attendees: 356 },
    { date: "2/11/2024", name: "Gender Sensitization (BPR&D New Delhi)", mode: "Offline", trainer: "Meena Khatri", totalRegistrations: 487, attendees: 416 },
    { date: "5/11/2024", name: "Police Station Management", mode: "Online", trainer: "Arun Pillai", totalRegistrations: 9, attendees: 6 },
    { date: "13/11/2024", name: "Gender Sensitization (BPR&D New Delhi)", mode: "Online", trainer: "Jyoti Chauhan", totalRegistrations: 390, attendees: 301 },
    { date: "15/11/2024", name: "Intelligence Collection", mode: "Online", trainer: "Santosh Nair", totalRegistrations: 247, attendees: 183 },
    { date: "15/11/2024", name: "Crime Conviction", mode: "Online", trainer: "Divya Kapoor", totalRegistrations: 383, attendees: 289 },
    { date: "23/11/2024", name: "Investigation of NDPS Cases", mode: "Online", trainer: "Ramesh Iyer", totalRegistrations: 199, attendees: 157 },
    { date: "29/11/2024", name: "Investigation of Cyber Crime Related to Social Media", mode: "Offline", trainer: "Sneha Dutta", totalRegistrations: 398, attendees: 328 },
    { date: "6/12/2024", name: "Investigation of Bank Fraud Cases", mode: "Offline", trainer: "Varun Saxena", totalRegistrations: 354, attendees: 313 },
    { date: "19/12/2024", name: "Departmental Enquiry/ Primary Enquiry", mode: "Offline", trainer: "Nidhi Chauhan", totalRegistrations: 387, attendees: 334 },
    { date: "3/1/2025", name: "Investigation of Economic Crime Cases", mode: "Online", trainer: "Akhil Menon", totalRegistrations: 15, attendees: 13 },
    { date: "8/1/2025", name: "Investigation of NDPS Cases", mode: "Offline", trainer: "Priya Bhatt", totalRegistrations: 42, attendees: 30 },
    { date: "11/1/2025", name: "Departmental Enquiry/ Primary Enquiry", mode: "Online", trainer: "Ram Kumar", totalRegistrations: 309, attendees: 281 }
  ];



  // Initialize an object to hold counts for each month

  // Array of month names for formatting
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
  ];

  const monthlyCounts = {};

  // Loop through each training entry
  trainingDataa.forEach(entry => {
    const dateParts = entry.date.split('/');
    const month = parseInt(dateParts[1], 10); // Get the month (1-12)
    const year = parseInt(dateParts[2], 10); // Get the year
    const key = `${year}-${month}`; // Create a unique key for each month

    // Initialize if not present
    if (!monthlyCounts[key]) {
      monthlyCounts[key] = {
        onlineRegistrations: 0,
        offlineRegistrations: 0,
        onlineAttendees: 0,
        offlineAttendees: 0
      };
    }

    // Accumulate data based on mode
    if (entry.mode === "Online") {
      monthlyCounts[key].onlineRegistrations += entry.totalRegistrations;
      monthlyCounts[key].onlineAttendees += entry.attendees;
    } else if (entry.mode === "Offline") {
      monthlyCounts[key].offlineRegistrations += entry.totalRegistrations;
      monthlyCounts[key].offlineAttendees += entry.attendees;
    }
  });

  // Prepare chart data
  const months = [];
  const onlineRegistrations = [];
  const offlineRegistrations = [];
  const onlineAttendees = [];
  const offlineAttendees = [];

  // Sort the months chronologically
  const sortedKeys = Object.keys(monthlyCounts).sort((a, b) => {
    const [yearA, monthA] = a.split('-').map(Number);
    const [yearB, monthB] = b.split('-').map(Number);
    return yearA === yearB ? monthA - monthB : yearA - yearB;
  });

  // Populate data arrays
  sortedKeys.forEach(key => {
    const [year, month] = key.split('-');
    const monthName = monthNames[parseInt(month, 10) - 1]; // Convert month number to name
    months.push(`${monthName} ${year}`); // Format as "Month Year"

    onlineRegistrations.push(monthlyCounts[key].onlineRegistrations);
    offlineRegistrations.push(monthlyCounts[key].offlineRegistrations);
    onlineAttendees.push(monthlyCounts[key].onlineAttendees);
    offlineAttendees.push(monthlyCounts[key].offlineAttendees);
  });


  const trainingData = {
    labels: months,
    datasets: [
      {
        label: "Online Registrations",
        data: onlineRegistrations,
        backgroundColor: "rgba(54, 162, 235, 0.7)", // Blue
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        stack: "Stack 0",
      },
      {
        label: "Online Attendees",
        data: onlineAttendees,
        backgroundColor: "rgba(54, 162, 235, 1)", // Darker Blue
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        stack: "Stack 0",
      },
      {
        label: "Offline Registrations",
        data: offlineRegistrations,
        backgroundColor: "rgba(255, 99, 132, 0.7)", // Red
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        stack: "Stack 1",
      },
      {
        label: "Offline Attendees",
        data: offlineAttendees,
        backgroundColor: "rgba(255, 99, 132, 1)", // Darker Red
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        stack: "Stack 1",
      },
    ],
  };




  const filteredTrainingData =
  view === "dates" && selectedDate
    ? trainingDataa.filter((item) => selectedDate.includes(item.date)) // Filter by selected dates
    : selectedMonth
    ? trainingDataa.filter((item) => {
        const [day, month, year] = item.date.split('/').map(Number);
        return `${month}/${year}` === selectedMonth && item.mode === selectedMode; // Filter by month, year, and mode
      })
    : trainingDataa.filter((item) => item.mode === selectedMode); // Show overall month/year/mode data if no date is selected

const dateData = {
  labels: filteredTrainingData.map((item) => item.date), // Dates in filtered month
  datasets: [
    // Total Registrations Line
    {
      label: `${selectedMode} Training - Total Registrations`,
      data: filteredTrainingData.map((item) =>
        item.mode === selectedMode ? item.totalRegistrations : 0
      ),
      backgroundColor: selectedMode === "Online" ? chartColors[2] : chartColors[3], 
      borderColor: selectedMode === "Online" ? chartColors[2] : chartColors[3], 
      borderWidth: 2,
      tension: 0.4,
    },

    // Total Attendees Line
    {
      label: `${selectedMode} Training - Total Attendees`,
      data: filteredTrainingData.map((item) =>
        item.mode === selectedMode ? item.attendees : 0
      ),
      backgroundColor: selectedMode === "Online" ? chartColors[0] : chartColors[1],
      borderColor: selectedMode === "Online" ? chartColors[0] : chartColors[1],
      borderWidth: 2,
      tension: 0.4,
    },
  ],
};

        



  // Detailed bar data for the selected date
  const detailedBarData = {
    labels: ["Session 1", "Session 2", "Session 3", "Session 4"],
    datasets: [
      {
        label: "Participants",
        data: [10, 15, 20, 25],
        backgroundColor: chartColors[2],
      },
    ],
  };

  // const handleMonthClick = (event, elements) => {
  //   if (!elements.length) return;
  //   setView("dates");
  // };

  const handleMonthClick = (event, elements) => {
    if (elements.length > 0) {
      const dataIndex = elements[0].index; // Index of clicked bar
      const datasetLabel = trainingData.datasets[elements[0].datasetIndex].label; // Get label dynamically
  
      const monthYear = trainingData.labels[dataIndex]; // e.g., "Nov 2023"
      const [monthName, year] = monthYear.split(" "); // Extract month name and year
  
      // Convert month name to a number (Jan = 1, Feb = 2, ..., Dec = 12)
      const month = monthNames.indexOf(monthName) + 1; // Get the month number
  
      // Determine mode dynamically from label
      const mode = datasetLabel.includes("Online") ? "Online" : "Offline";
  
      console.log(`Month: ${month}, Year: ${year}, Mode: ${mode}`);
  
      // Filter data for the selected month, year, and mode
      const filteredDates = trainingDataa
        .filter((item) => {
          const [day, itemMonth, itemYear] = item.date.split('/').map(Number);
          return itemMonth === month && itemYear === parseInt(year) && item.mode === mode;
        })
        .map((item) => item.date); // Extract only the dates
  
      setSelectedMonth(`${month}/${year}`); // Store selected month
      setSelectedMode(mode); // Store selected mode
      setSelectedDate(filteredDates); // Store filtered dates
      setView("dates"); // Switch view to date-based visualization
    }
  };
  




  const handleDateClick = (event, elements) => {
    if (!elements.length) return;
    setSelectedDate("01"); // Replace with actual selected date
    setView("sessions");
  };



  // ------------------------------
  const registeredCounts = [
    229, 261, 227, 83, 183, 367, 444, 88, 379, 167, 145, 234, 233, 360, 185, 133, 431, 93, 477, 453, 492, 306, 206, 231, 330, 368, 271, 285, 90, 237, 147, 69,
    369, 70, 76, 448, 499, 316, 388, 43, 472, 196, 402, 230, 95, 470, 156, 36, 404, 413, 168, 365, 432, 428, 219, 52, 265, 326, 242, 334, 244, 412, 179, 376,
    500, 159, 166, 304, 418, 264, 356, 203, 154, 223, 136, 47, 56, 198, 481, 475, 443, 362, 75, 28, 204, 382, 235, 408, 401, 343, 62, 420, 225, 192, 45, 361,
    392, 337, 297, 494, 335, 176, 14, 427, 288, 447, 406, 11, 352, 249, 91, 429, 342, 332, 395, 341, 97, 417, 479, 31, 377, 311, 452, 461, 59, 48, 187, 381,
    157, 301, 118, 282, 399, 148, 190, 490, 217, 284, 131, 87, 462, 73, 40, 489, 435, 44, 273, 254, 54, 123, 144, 338, 262, 439, 272, 32, 177, 10, 260, 314,
    39, 269, 37, 296, 454, 98, 12, 410, 213, 188, 389, 49, 241, 245, 46, 263, 473, 460, 355, 171, 308, 442, 74, 277, 60, 327, 182, 38, 92, 426, 445, 409, 268,
    109, 58, 305, 216, 486, 79, 255, 347, 496, 394, 155, 484, 111, 321, 55, 346, 493, 466, 407, 487, 9, 390, 247, 383, 199, 398, 354, 387, 15, 42, 309
  ];
  const attendedCounts = [
    23, 65, 76, 54, 54, 303, 87, 81, 43, 56, 87, 98, 90, 54, 89, 90, 234, 43, 399, 98, 90, 290, 189, 187, 267, 254, 65, 89, 67, 201, 111, 13, 310, 23, 25, 410,
    409, 199, 100, 34, 410, 99, 201, 201, 10, 401, 140, 19, 202, 199, 100, 34, 410, 99, 201, 43, 100, 301, 140, 199, 202, 400, 19, 100, 301, 140, 19, 202,
    400, 199, 98, 45, 87, 87, 89, 41, 20, 99, 56, 87, 98, 75, 32, 14, 100, 109, 209, 400, 299, 341, 60, 410, 201, 187, 41, 309, 310, 310, 291, 490, 330, 167,
    11, 410, 210, 410, 389, 10, 340, 201, 76, 410, 309, 330, 378, 330, 34, 409, 418, 29, 87, 89, 51, 410, 55, 44, 18, 290, 154, 300, 109, 281, 310, 140, 180,
    410, 210, 210, 110, 85, 409, 71, 20, 409, 48, 41, 75, 89, 9, 110, 121, 190, 209, 410, 218, 13, 109, 7, 29, 311, 13, 193, 21, 244, 379, 82, 8, 313, 178,
    116, 298, 21, 188, 184, 31, 208, 367, 388, 265, 116, 273, 428, 63, 214, 25, 310, 144, 25, 70, 380, 356, 376, 186, 79, 36, 286, 167, 413, 44, 195, 267,
    410, 298, 135, 386, 78, 266, 32, 289, 416, 392, 356, 416, 6, 301, 183, 289, 157, 328, 313, 334, 13, 30, 281
  ];


  const remainingCounts = registeredCounts.map((reg, i) => reg - attendedCounts[i]);

  const attendanceData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"], // Example months
    datasets: [
      {
        label: "Attended Count",
        data: attendedCounts,
        backgroundColor: "#8884d8", // Purple
      },
      {
        label: "Not Attended (Remaining)",
        data: remainingCounts,
        backgroundColor: "#82ca9d", // Green
      },
    ],
  };

  const dailyAttendanceData = {
    labels: ["Day-1", "Day-2", "Day-3", "Day-4", "Day-5", "Day-6", "Day-7"],
    datasets: [
      {
        label: "Daily Attendance",
        data: [30, 45, 50, 40, 55, 60, 70],
        borderColor: chartColors[2],
        backgroundColor: "rgba(242, 197, 124, 0.5)",
      },
    ],
  };

  const handleBarClickTraining = (event, elements) => {
    if (!elements.length) return;
    setView("subject");
  };

  const handleBarClickAttendance = (event, elements) => {
    if (!elements.length) return;
    const monthIndex = elements[0].index;
    setSelectedMonth(months[monthIndex]);
    setView("dailyAttendance");
  };

  const goBack = () => {
    if (view === "dailyAttendance") {
      setView("main");
      setSelectedMonth(null);
    }
    else if (view === "subject") {
      setView("main")
      setSelectedMonth(null);
    }
    else if (view === "attendance") {
      setView("main")
      setSelectedMonth(null);
    }
    else if (view === "sessions") {
      setView("dates");
      setSelectedDate(null);
    } else {
      setView("main");
    }
    setSelectedTraining("")
  };



  // ------------------date_filter_use------------------------
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [fromDate2, setFromDate2] = useState(null);
  const [toDate2, setToDate2] = useState(null);
  const [filteredicjs, setFilteredICJSData] = useState(null)
  const [filtered, setFiltered] = useState(null)


  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);


  const handleMonthChange = (newValue) => {
    if (newValue) {
      const month = newValue.month() + 1; // Get month number (1-12)
      const year = newValue.year();
      setSelectedMonth(`${month}/${year}`);
    } else {
      setSelectedMonth(null);
    }
  };

  const ClearFilter = (type) => {
    console.log('type', type);

    if (type === '1') {
      setFromDate(null);
      setToDate(null);
    }
  };




  // console.log(jsonData, "....................JSON_DATA...................");

  useEffect(() => {
    // Reset dropdown when selectedDate updates externally
    if (!selectedDate) {
      setSelectedTraining("");
    }
  }, [selectedDate]);




  return (
    <div className="p-6 w-full max-w-5xl mx-auto" >
      {/* Tabs */}
      <div className="flex mb-6 border-b">
        {["Training", "Attendance"].map((tab) => (
          <button
            key={tab}
            className={`p-3 px-6 text-lg font-semibold ${selectedTab === tab
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500"
              }`}
            onClick={() => {
              setSelectedTab(tab);
              setView("main");
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Training Tab */}
      {selectedTab === "Training" && (
        <>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className="flex justify-between mb-4">


            {/* <select
              className="p-2 border rounded"
              onChange={(e) => setSelectedMode(e.target.value)}
              value={selectedMode}
            >
              {modes.map((mode) => (
                <option key={mode} value={mode}>
                  {mode}
                </option>
              ))}
            </select> */}

            {view === "dates" && (
              <select
              className="p-2 border rounded"
              onChange={(e) => {
                const trainingName = e.target.value;
                setSelectedTraining(trainingName);
            
                if (!selectedMonth) return; // Ensure selectedMonth exists before proceeding
            
                // Extract month and year from selectedMonth
                const [selectedMonthValue, selectedYearValue] = selectedMonth.split('/').map(Number);
            
                // Filter training data
                const filteredEntries = trainingDataa.filter((item) => {
                  const [day, month, year] = item.date.split('/').map(Number);
                  return (
                    item.name === trainingName &&
                    month === selectedMonthValue &&
                    year === selectedYearValue &&
                    item.mode === selectedMode
                  );
                });
            
                // Extract matching dates
                const selectedDates = filteredEntries.map((entry) => entry.date);
                setSelectedDate(selectedDates.length > 0 ? selectedDates : null);
              }}
              value={selectedTraining}
            >
              <option value="">Select Training</option>
              {[...new Set(trainingDataa.map((training) => training.name))].map((uniqueName) => (
                <option key={uniqueName} value={uniqueName}>
                  {uniqueName}
                </option>
              ))}
            </select>            
            )}




          </div>

          {/* {view === "main" && (
          <div className="mb-4">
            <label className="mr-2 font-semibold">Select Month:</label>
            <DatePicker
              views={["year", "month"]}
              value={selectedMonth ? dayjs(`${selectedMonth.split("/")[1]}-${selectedMonth.split("/")[0]}`) : null}
              onChange={handleMonthChange}
              renderInput={(params) => <TextField {...params} className="border p-2 rounded" />}
            />
          </div>
        )} */}

          {/* Main View: Monthly Data */}
          {view === "main" && (
            <Bar

              data={trainingData}
              options={{
                responsive: true,
                plugins: {
                  title: { display: true, text: "Training Data by Month (Stacked)" },
                  legend: { position: "top" },
                },
                onClick: handleMonthClick,
                scales: {
                  x: { stacked: true },
                  y: { stacked: true },
                },
              }}
            />
          )}

          {/* Drilldown View: Dates within the selected month */}
          {view === "dates" && (
            <div>
              <button
                onClick={goBack}
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
              >
                Back
              </button>
              <Line
                data={dateData}
                options={{
                  responsive: true,
                  plugins: {
                    title: {
                      display: true,
                      text: `Training Data for ${selectedMonth}`,
                    },
                  },
                  onClick: handleDateClick,
                }}
              />
            </div>
          )}

          {/* Drilldown View: Training Details for a Selected Date */}
          {view === "sessions" && (
            <div>
              <button
                onClick={goBack}
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
              >
                Back
              </button>
              <Bar
                data={detailedBarData}
                options={{
                  responsive: true,
                  plugins: {
                    title: {
                      display: true,
                      text: `Training Sessions for ${selectedMonth} ${selectedDate}`,
                    },
                  },
                }}
              />
            </div>
          )}

</LocalizationProvider>


        </>
      )}



      {/* Attendance Tab */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {selectedTab === "Attendance" && (


          <>
            <div className="flex items-center gap-4">
              <div>

                <DatePicker
                  label='From'
                  views={["year", "month"]}
                  value={fromDate}
                  onChange={(newValue) => setFromDate(newValue)}
                  slotProps={{
                    textField: {
                      variant: "outlined",
                      size: "small",
                      sx: { width: "140px", fontSize: "12px" },
                    }
                  }}
                  sx={{ "& .MuiPickersPopper-paper": { transform: "scale(0.9)" } }}
                />
              </div>
              <div>

                <DatePicker
                  label='To'
                  views={["year", "month"]}
                  value={toDate}
                  onChange={(newValue) => setToDate(newValue)}
                  slotProps={{
                    textField: {
                      variant: "outlined",
                      size: "small",
                      sx: { width: "140px", fontSize: "12px" },
                    }
                  }}
                  sx={{ "& .MuiPickersPopper-paper": { transform: "scale(0.9)" } }}
                />
              </div>

              <button
                onClick={() => ClearFilter('1')}
                className="bg-blue-500 text-white px-3 py-1 rounded-md "
                style={{ backgroundColor: "#2d3748" }}>
                Clear Filter
              </button>
            </div>
            {view === "main" && (
              <Bar
                data={attendanceData}
                options={{
                  responsive: true,
                  plugins: {
                    title: { display: true, text: "Attendance Data" },
                  },
                  scales: {
                    x: { stacked: true },
                    y: { stacked: true },
                  },
                  onClick: handleBarClickAttendance,
                }}
              />

            )}

            {view === "dailyAttendance" && (
              <div>
                <button
                  onClick={goBack}
                  className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Back
                </button>
                <Line
                  data={dailyAttendanceData}
                  options={{
                    responsive: true,
                    plugins: {
                      title: {
                        display: true,
                        text: `Daily Attendance for ${selectedMonth}`,
                      },
                    },
                  }}
                />
              </div>
            )}
          </>
        )}
      </LocalizationProvider>



    </div>
  );
};

export default DrilldownTrainingChart;
