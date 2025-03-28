import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import Avatar from 'react-avatar';

import jsPDF from "jspdf";
import logo from '../../../dist/assets/logo22-DGid_2oD.png'

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DownloadIcon from '@mui/icons-material/Download';

import Select from "react-select";







const downloadPDF = (newData) => {
    console.log("newData:", newData);

    const doc = new jsPDF({ orientation: "landscape" });
    let pageHeight = doc.internal.pageSize.height;
    let pageWidth = doc.internal.pageSize.width;
    let y = 15;
    let pageNumber = 1;

    const { timeStamp, submited_by, sampleDataIN } = newData;

    // Function to add footer
    const addFooter = () => {
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text(`Email: ${localStorage.getItem("email")}`, 14, pageHeight - 10);
        doc.text(`Page ${pageNumber}`, pageWidth - 30, pageHeight - 10);
    };

    // Header - Logo and Title
    doc.addImage(logo, "PNG", pageWidth / 2 - 15, y, 30, 30);
    y += 40;

    doc.setFontSize(22);
    doc.setTextColor(30, 30, 120);
    doc.setFont("helvetica", "bold");
    doc.text("MARVEL CONSOLIDATED REPORT", pageWidth / 2 - 55, y);
    y += 12;

    doc.setDrawColor(100, 100, 100);
    doc.line(10, y, pageWidth - 10, y); // Divider Line
    y += 8;

    // Report Metadata
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "bold");

    if (timeStamp) doc.text(`Submited On:`, 14, y);
    if (submited_by) doc.text(`Submited By:`, 14, y + 8);
    doc.text(`Downloaded By:`, 14, y + (timeStamp ? 16 : 0));

    doc.setFont("helvetica", "normal");
    if (timeStamp) doc.text(timeStamp, 50, y);
    if (submited_by) doc.text(submited_by, 50, y + 8);
    doc.text(localStorage.getItem("email"), 50, y + (timeStamp ? 16 : 0));

    y += 30; // Space before adding content

    // Retrieve MLReport content
    const mlReportHTML = localStorage.getItem("MLReport");

    // Function to format column names
    const formatColumnName = (str) => {
        return str.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    // Loop through all forms and display data
    Object.entries(sampleDataIN).forEach(([formType, records]) => {
        const formattedFormType = formatColumnName(formType);

        // Check for page overflow
        if (y > pageHeight - 50) {
            doc.addPage();
            pageNumber++;
            y = 15;
            addFooter();
        }

        // Section Header
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(30, 30, 120);
        doc.text(`${formattedFormType}`, 14, y);
        y += 8;

        // ML Report Handling for "Police Training"
        if (formattedFormType === "Police Training" && mlReportHTML) {
            doc.setFontSize(10);
            doc.setFont("helvetica", "bold");
            doc.setTextColor(0, 0, 150);
            doc.text("AI Insights :", 14, y);
            y += 5;

            doc.setFont("helvetica", "normal");
            doc.setTextColor(0, 0, 0);

            const mlReportText = mlReportHTML.replace(/<[^>]*>/g, "");
            const splitText = doc.splitTextToSize(mlReportText, pageWidth - 30);
            doc.text(splitText, 14, y);
            y += splitText.length * 5 + 10;
        }

        // For all other formTypes, display "No ML Data Generated"
        if (formattedFormType !== "Police Training") {
            doc.setFont("helvetica", "italic");
            doc.setTextColor(255, 0, 0);
            doc.text("No ML Data Generated", 14, y);
            y += 10;
        }

        // If records exist, generate table; otherwise, display "No Data Available"
        if (records.length > 0) {
            const tableColumn = Object.keys(records[0]).map(formatColumnName);
            const tableRows = records.map(row => Object.values(row));

            doc.autoTable({
                startY: y,
                head: [tableColumn],
                body: tableRows,
                theme: "grid",
                margin: { left: 14, right: 14 },
                styles: { fontSize: 9, cellPadding: 3, halign: "center", textColor: [50, 50, 50] },
                headStyles: { fillColor: [41, 128, 185], textColor: [255, 255, 255], fontSize: 10, fontStyle: "bold" },
                bodyStyles: { fillColor: (rowIndex) => (rowIndex % 2 === 0 ? [245, 245, 245] : [255, 255, 255]) },
                alternateRowStyles: { fillColor: [235, 235, 235] },
                didDrawPage: () => addFooter(),
            });

            y = doc.autoTable.previous.finalY + 10;
        } else {
            doc.setFont("helvetica", "italic");
            doc.setTextColor(150, 0, 0);
            doc.text("No data available", 30, y);
            y += 10;
        }

        // Page Break Handling
        if (y > pageHeight - 50) {
            doc.addPage();
            pageNumber++;
            y = 15;
            addFooter();
        }
    });

    addFooter();
    doc.save("Marvel_Consolidated_Report.pdf");
};







export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState("profile");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const role = localStorage.getItem("role")
    const sub_role = localStorage.getItem("sub_role")

    return (
        <div className="max-w-[85vw] mx-auto mt-5 min-h-[82vh] p-6 bg-white rounded-lg shadow-lg flex flex-col">

            {/* Tabs Navigation */}
            <div className="flex border-b">
                <button
                    className={`px-6 py-2 text-lg font-semibold ${activeTab === "profile"
                        ? "border-b-4 border-blue-600 text-blue-600"
                        : "text-gray-600 hover:text-blue-600"
                        }`}
                    onClick={() => setActiveTab("profile")}
                >
                    My Profile
                </button>
                { activeTab != "profile" && (role == 'chief secretary' || role == 'ACS' || role == 'DGP' || sub_role == "IG/DIG") ?
                (<button
                    className={`px-6 py-2 text-lg font-semibold ${activeTab === "history"
                        ? "border-b-4 border-blue-600 text-blue-600"
                        : "text-gray-600 hover:text-blue-600"
                        }`}
                    onClick={() => setActiveTab("history")}
                >
                    Form History
                </button>) : null
                }
            </div>

            {
                activeTab != "profile" && (role == 'chief secretary' || role == 'ACS' || role == 'DGP' || sub_role == "IG/DIG") ?
            (<button
                className="mt-4 px-4 py-2 bg-blue-500 w-fit ml-auto text-white rounded hover:bg-blue-700"
                onClick={() => setIsModalOpen(true)}
                >
                    Cumulative Report
                </button>) : null
            }

            {/* Content Area */}
            <div className="mt-4">{activeTab === "profile" ? <ProfileSection /> : role != 'admin' ? <FormHistory /> : null}</div>


            {/* Report Modal */}
            {isModalOpen && <ReportModal onClose={() => setIsModalOpen(false)} />}
        </div>
    );
}




const zones = {
    Amravati: ["Akola", "Amravati Rural", "Buldana", "Washim", "Yavatmal"],
    'Chhatrapati Sambhajinagar': ["Chhatrapati Sambhajinagar", "Beed", "Hingoli", "Jalna", "Latur", "Nanded", "Osmanabad", "Parbhani"],
    Konkan: ["Mumbai", "Mumbai Suburban", "Palghar", "Raigad", "Ratnagiri", "Sindhudurg", "Thane Rural"],
    Nagpur: ["Bhandara", "Chandrapur", "Gadchiroli", "Gondia", "Nagpur Rural", "Wardha"],
    Nashik: ["Ahmednagar", "Dhule", "Jalgaon", "Nandurbar", "Nashik"],
    Pune: ["Kolhapur", "Pune Rural", "Sangli", "Satara", "Solapur Rural"],
};



// Card Module

function ReportModal({ onClose }) {
    const [filtersoverall, setfiltersoverall] = useState({
        fromDate: "",
        toDate: "",
        selectedDistrict: [] // Keep as an array for multi-select
    });

    const districtOptions = Object.values(zones).flat().map(district => ({
        value: district,
        label: district
    }));



    const handelOverAllReport = async () => {
        try {
            const response = await axiosInstance.post("/overAllCumilative", filtersoverall);

            const result = {
                timeStamp: null,
                submited_by: null,
                email: null,
                rang: null,
                district: null,
                sampleDataIN: response.data
            };

            downloadPDF(result);
        } catch (error) {
            console.error("Error fetching form details", error);
        }
    };

    // Check if all fields are filled (dates and at least one district)
    const isFormComplete = filtersoverall.fromDate && filtersoverall.toDate ;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold mb-4">Cumulative Report Filters</h2>

                {/* Date Pickers */}
                <div className="mb-4">
                    <label className="block font-semibold">From:</label>
                    <input
                        type="month"
                        value={filtersoverall.fromDate}
                        onChange={(e) => setfiltersoverall(prev => ({ ...prev, fromDate: e.target.value }))}
                        className="border p-2 rounded w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block font-semibold">To:</label>
                    <input
                        type="month"
                        value={filtersoverall.toDate}
                        onChange={(e) => setfiltersoverall(prev => ({ ...prev, toDate: e.target.value }))}
                        className="border p-2 rounded w-full"
                    />
                </div>

                {/* Multi-Select District Dropdown */}
                <div className="mb-4">
                    <label className="block font-semibold">District:</label>
                    <Select
                        options={districtOptions}
                        value={districtOptions.filter(option => filtersoverall.selectedDistrict.includes(option.value))}
                        onChange={(selectedOptions) => setfiltersoverall(prev => ({
                            ...prev,
                            selectedDistrict: selectedOptions.map(option => option.value) // Store as array
                        }))}
                        isMulti
                        isSearchable
                        placeholder="All Districts"
                        className="w-full"
                    />
                </div>

                {/* Buttons */}
                <div className="flex justify-end space-x-2">
                    <button className="px-4 py-2 bg-red-400 text-white rounded-lg" onClick={onClose}>
                        Cancel
                    </button>
                    <button
                        className={`px-4 py-2 text-white rounded-lg ${isFormComplete ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
                        onClick={handelOverAllReport}
                        disabled={!isFormComplete} // Disable when form is incomplete
                    >
                        Generate Report
                    </button>
                </div>
            </div>
        </div>
    );
}






// Profile Section
function ProfileSection() {

    const [users, setUsers] = useState({})

    const fetchUsers = async () => {

        const payload = {
            email: localStorage.getItem('email')
        }

        try {
            const response = await axiosInstance.post("/userProfile", payload);
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users", error);
        }
    };

    useEffect(() => {
        fetchUsers()
    }, [])

    return (
        <div>
            {/* Profile Header */}
            <div className="flex items-center space-x-4">
                <Avatar name={users.userName} size="80" round={true} />

                <div>
                    <h2 className="text-2xl font-bold">{users.userName}</h2>
                    <p className="text-lg text-gray-500">{users.sub_role}</p>
                    <p className="text-lg text-gray-400">{users.state}, India</p>
                </div>
            </div>

            {/* Personal Info */}
            {/* <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                <h3 className="text-xl font-semibold">Personal Information</h3>
                <div className="grid grid-cols-2 gap-4 mt-2">
                <p className="text-lg">
  <strong style={{ fontSize: "18px" }}>First Name:</strong> 
  <span style={{ fontSize: "14px", color: "black", fontWeight: "600", marginLeft: "5px" }}>
    {users.userName}
  </span>
</p>


                    <p className="text-lg"><strong style={{fontSize:"16px"}}>Email:</strong> {users.email}</p>
                    <p className="text-lg"><strong style={{fontSize:"16px"}}>Rank:</strong> {users.sub_role}</p>
                    <p className="text-lg"><strong style={{fontSize:"16px"}}>Phone:</strong> {users.mobile_number}</p>
                    <p className="text-lg"><strong style={{fontSize:"16px"}}>Officer Id:</strong> {users.emp_id}</p>
                </div>
            </div> */}
            <div className="mt-6 p-4 bg-gray-100 rounded-lg">
  <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
  
  <div className="grid grid-cols-2 gap-4">
    <div className="flex flex-col">
      <label className="text-lg font-semibold text-gray-700">First Name:</label>
      <span className="text-md font-medium text-black">{users.userName}</span>
    </div>

    <div className="flex flex-col">
      <label className="text-lg font-semibold text-gray-700">Email:</label>
      <span className="text-md font-medium text-black">{users.email}</span>
    </div>

    <div className="flex flex-col">
      <label className="text-lg font-semibold text-gray-700">Rank:</label>
      <span className="text-md font-medium text-black">{users.sub_role}</span>
    </div>

    <div className="flex flex-col">
      <label className="text-lg font-semibold text-gray-700">Phone:</label>
      <span className="text-md font-medium text-black">{users.mobile_number}</span>
    </div>

    <div className="flex flex-col">
      <label className="text-lg font-semibold text-gray-700">Officer ID:</label>
      <span className="text-md font-medium text-black">{users.emp_id}</span>
    </div>
  </div>
</div>


            {/* Address */}
            {/* <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                <h3 className="text-xl font-semibold">Officer Location</h3>
                <div className="grid grid-cols-2 gap-4 mt-2">
                    {users.city ? <p className="text-lg"><strong>City:</strong> {users.city}</p> : null}
                    {users.district ? <p className="text-lg"><strong>District:</strong> {users.district}</p> : null}
                    {users.zone ? <p className="text-lg"><strong>Range:</strong> {users.zone}</p> : null}
                    <p className="text-lg"><strong style={{fontSize:"16px"}}>State:</strong> Maharashtra</p>
                    <p className="text-lg"><strong style={{fontSize:"16px"}}>Country:</strong> INDIA</p>
                </div>
            </div> */}
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
  <h3 className="text-xl font-semibold mb-4">Officer Location</h3>

  <div className="grid grid-cols-2 gap-4">
    {users.city && (
      <div className="flex flex-col">
        <label className="text-lg font-semibold text-gray-700">City:</label>
        <span className="text-md font-medium text-black">{users.city}</span>
      </div>
    )}

    {users.district && (
      <div className="flex flex-col">
        <label className="text-lg font-semibold text-gray-700">District:</label>
        <span className="text-md font-medium text-black">{users.district}</span>
      </div>
    )}

    {users.zone && (
      <div className="flex flex-col">
        <label className="text-lg font-semibold text-gray-700">Range:</label>
        <span className="text-md font-medium text-black">{users.zone}</span>
      </div>
    )}

    <div className="flex flex-col">
      <label className="text-lg font-semibold text-gray-700">State:</label>
      <span className="text-md font-medium text-black">Maharashtra</span>
    </div>

    <div className="flex flex-col">
      <label className="text-lg font-semibold text-gray-700">Country:</label>
      <span className="text-md font-medium text-black">INDIA</span>
    </div>
  </div>
</div>

        </div>

    );
}







function FormHistory() {
    const [summaryData, setSummaryData] = useState([]); // Summary table data
    const [detailedData, setDetailedData] = useState(null); // Detailed table data
    const [loading, setLoading] = useState(false);
    const [formdata, setformdata] = useState({});

    // Get user details from localStorage
    const role = localStorage.getItem("role");
    const sub_role = localStorage.getItem("sub_role");
    const email = localStorage.getItem("email") || "";

    // Initial filters
    const [filters, setFilters] = useState({
        zone: localStorage.getItem("zone") || "",
        district: localStorage.getItem("district") || "",
        city: localStorage.getItem("city") || "",
        startDate: "",
        endDate: "",
        role: role,
        sub_role: sub_role,
        email: email,
    });

    const fetchSummaryData = async () => {
        try {
            // Ensure filters fallback to localStorage values if empty
            const updatedFilters = {
                ...filters,
                zone: filters.zone || localStorage.getItem("zone") || "",
                district: filters.district || localStorage.getItem("district") || "",
                city: filters.city || localStorage.getItem("city") || "",
                startDate: filters.startDate,
                endDate: filters.endDate,
                role: filters.role,
                sub_role: filters.sub_role,
                email: filters.email,
            };

            const response = await axiosInstance.post("/userFormSubmissionsPerDate", updatedFilters);
            setSummaryData(response.data);
        } catch (error) {
            console.error("Error fetching form history", error);
        }
    };


    // Fetch detailed form data
    const fetchDetailedData = async (form) => {
        setLoading(true);
        setformdata(form)
        try {
            const payload = {
                uploaded_on: form.submitted_on,
                zone: form.zone,
                district: form.district,
                city: form.city,
                uploaded_by: form.uploaded_by,
            };

            const response = await axiosInstance.post("/userFormSubmissions", payload);
            setDetailedData(response.data);

        } catch (error) {
            console.error("Error fetching form details", error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch data when component mounts or filters change
    useEffect(() => {
        if (filters.email) {
            fetchSummaryData();
        }
    }, [filters]);

    const handelDownload = async (form) => {

        try {
            const payload = {
                uploaded_on: form.submitted_on,
                zone: form.zone,
                district: form.district,
                city: form.city,
                uploaded_by: form.uploaded_by,
            };
            const response = await axiosInstance.post("/userFormSubmissions", payload);

    //   const { timeStamp, submited_by, email, rang, district, sampleDataIN } = newData;


            const result = {
                timeStamp:form.submitted_on,
                submited_by:form.uploaded_by,
                email:form.uploaded_by,
                rang:form.zone,
                district:form.district,
                sampleDataIN:response.data
            }



            downloadPDF(result);

        } catch (error) {
            console.error("Error fetching form details", error);
        } finally {
            setLoading(false);
        }

    }

    return (
        <div className="p-4 bg-gray-100 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Form History</h3>

            {/* Filters Section */}
            <div className="mb-4 p-4 bg-white rounded-lg shadow">
                <h4 className="text-md font-semibold mb-2">Filters</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                    {(role === "chief secretary" || role === "ACS" || role === "DGP" || sub_role == "IG/DIG") && !filters.city && (
                        <div className="flex flex-col flex-grow min-w-[200px]">
                            <label className="text-gray-700 font-medium text-lg ">Zone</label>
                            <select
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                                value={filters.zone}
                                onChange={(e) => setFilters({ ...filters, zone: e.target.value })}
                            >
                                <option value="">Select Zone</option>
                                {Object.keys(zones).map((zone) => (
                                    <option key={zone} value={zone}>
                                        {zone}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* District */}
                    {filters.zone && (!filters.city || filters.city === "null") &&
                        ((!filters.district || filters.district === "null") || sub_role !== "SP" || sub_role == "IG/DIG") && (
                            <div className="flex flex-col flex-grow min-w-[200px]">
                                <label className="text-gray-700 font-medium text-lg">District</label>
                                <select
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                                    value={filters.district}
                                    onChange={(e) => setFilters({ ...filters, district: e.target.value })}
                                >
                                    <option value="">Select District</option>
                                    {zones[filters.zone]?.map((district) => (
                                        <option key={district} value={district}>
                                            {district}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                    {/* City */}
                    {(!filters.zone && sub_role !== "CP" || sub_role == "IG/DIG") && (
                        <div className="flex flex-col flex-grow min-w-[200px]">
                            <label className="text-gray-700 font-medium text-lg">City</label>
                            <select
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                                value={filters.city}
                                onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                            >
                                <option value="">Select City</option>
                                <option value="Mumbai City">Mumbai City</option>
                                <option value="Thane City">Thane City</option>
                                <option value="Mira Bhainder">Mira Bhainder</option>
                                <option value="Navi Mumbai">Navi Mumbai</option>
                                <option value="Pune City">Pune City</option>
                                <option value="Pimpri Chinchwad">Pimpri Chinchwad</option>
                                <option value="Amravati City">Amravati City</option>
                                <option value="Nagpur City">Nagpur City</option>
                                <option value="Nashik City">Nashik City</option>
                                <option value="Chhatrapati Sambhajinagar City">Chhatrapati Sambhajinagar City</option>
                                <option value="Solapur City">Solapur City</option>
                            </select>
                        </div>
                    )}

                    {/* Date Pickers */}

                    <div className="flex flex-col flex-grow min-w-[200px]">
                            <label className="text-gray-700 font-medium text-lg">From Date:</label>
                    <input
                        type="date"
                        className="p-3 border rounded"
                        value={filters.startDate}
                        onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                    />
                    </div>

                    <div className="flex flex-col flex-grow min-w-[200px]">
                            <label className="text-gray-700 font-medium text-lg">To Date:</label>
                    <input
                        type="date"
                        className="p-3 border rounded"
                        value={filters.endDate}
                        onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                    />
                    </div>
                </div>
                {/* <button
                    className="mt-3 px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={fetchSummaryData}
                >
                    Apply Filters
                </button> */}
            </div>

            {/* Show Detailed Data when a Form is Selected */}
            {detailedData ? (
                <div className="p-4 bg-white rounded-lg shadow-lg">
                    <div className="flex justify-between">
                    <button
                        className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
                        onClick={() => {setDetailedData(null) ,setformdata({})}}
                    >
                                    <ArrowBackIcon />

                    </button>
                    <button
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                        onClick={() => handelDownload(formdata)}
                    >
                       <DownloadIcon/>
                    </button>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Form Details</h3>
                    {loading ? (
                        <p className="text-blue-600">Loading form details...</p>
                    ) : (
                        <div className="overflow-x-auto">
                            {Object.keys(detailedData).map((tableName, index) => (
                                <div key={index} className="mb-6">
                                    <h4 className="text-lg font-bold mb-2">{tableName}</h4>

                                    {Array.isArray(detailedData[tableName]) && detailedData[tableName].length > 0 ? (
                                        <table className="min-w-full bg-white border rounded-lg">
                                            <thead>
                                                <tr className="bg-gray-200">
                                                    {Object.keys(detailedData[tableName][0] || {}).map((col, colIndex) => (
                                                        <th key={colIndex} className="p-3 text-left">{col}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {detailedData[tableName].map((row, rowIndex) => (
                                                    <tr key={rowIndex} className="border-b hover:bg-gray-100">
                                                        {Object.values(row).map((val, valIndex) => (
                                                            <td key={valIndex} className="p-3">{val}</td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    ) : (
                                        <p className="text-gray-500">No data available</p>
                                    )}
                                </div>
                            ))}

                        </div>
                    )}
                    
                </div>
            ) : (
                // Summary Table
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border rounded-lg">
                        <thead>
                            <tr className="bg-blue-500 text-white text-lg">
                                <th className="p-3 text-left text-lg">Uploaded By</th>
                                <th className="p-3 text-left text-lg">Zone</th>
                                <th className="p-3 text-left text-lg">District</th>
                                <th className="p-3 text-left text-lg">City</th>
                                <th className="p-3 text-left text-lg">Submitted On</th>
                                <th className="p-3 text-left text-lg">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {summaryData.length > 0 ? (
                                summaryData.map((form, index) => (
                                    <tr key={index} className="border-b hover:bg-gray-100">
                                        <td className="p-3 text-lg">{form.uploaded_by}</td>
                                        <td className="p-3 text-lg">{form.zone}</td>
                                        <td className="p-3 text-lg">{form.district}</td>
                                        <td className="p-3 text-lg">{form.city}</td>
                                        <td className="p-3 text-lg">{form.submitted_on}</td>
                                        <td className="p-3 text-lg">
                                            <button
                                                className="px-3 py-1 bg-blue-500 text-white rounded"
                                                onClick={() => fetchDetailedData(form)}
                                            >
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="p-3 text-center text-gray-500">
                                        No form submissions found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
             

            )}
        </div>
    );
}