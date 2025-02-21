import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component"; 
import "tailwindcss/tailwind.css";

// Dummy van data
// const vanData = [
//   { vanId: "VAN001", city: "New York", date: "2024-07-01", count: 2 },
//   { vanId: "VAN002", city: "Los Angeles", date: "2024-07-02", count: 1 },
//   { vanId: "VAN003", city: "Chicago", date: "2024-07-03", count: 3 },
//   { vanId: "VAN004", city: "Houston", date: "2024-07-04", count: 1 },
//   { vanId: "VAN005", city: "Phoenix", date: "2024-07-05", count: 2 },
// ];

const VanAvailability = ({vanData}) => {
  const [filters, setFilters] = useState({ vanId: "", city: "", date: "", count: "" });
  const [filteredData, setFilteredData] = useState(vanData);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const [selectedVan, setSelectedVan] = useState(null);   // State for the selected van

  const handleOpenModal = (van) => {
    setSelectedVan(van);
    setIsModalOpen(true); // Show modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close modal
    setSelectedVan(null);  // Reset selected van
  };


  useEffect(() => {
  console.log("Van Table Data is:", vanData)

    if (vanData && Array.isArray(vanData)) {
      setFilteredData(vanData);
    }
  }, [vanData]);

  const handleFilter = (event, key) => {
    const newFilters = { ...filters, [key]: event.target.value.toLowerCase() };
    setFilters(newFilters);

    setFilteredData(
      vanData.filter((row) =>
        // Exclude 'Action' column from the filtering
        Object.keys(newFilters).every((filterKey) =>
          filterKey !== "action" && row[filterKey]?.toString().toLowerCase().includes(newFilters[filterKey])
        )
      )
    );
  };

  const columns = [
    {
      name: <span className="font-semibold text-[14px]">VAN ID</span>,
      selector: (row) => row.vanId,
      sortable: true,
      filterKey: "vanId",
    },
    {
      name: <span className="font-semibold text-[14px]">City</span>,
      selector: (row) => row.city,
      sortable: true,
      filterKey: "city",
    },
    {
      name: <span className="font-semibold text-[14px]">Date</span>,
      selector: (row) => row.date,
      sortable: true,
      filterKey: "date",
    },
    {
      name: <span className="font-semibold text-[14px]">Count</span>,
      selector: (row) => row.count,
      sortable: true,
      filterKey: "count",
    },
    {
      name: <span className="font-semibold text-[14px]">Action</span>, // Button column
      cell: (row) => (
        <button
          onClick={() => handleOpenModal(row)}
          className="bg-grey text-black py-1 px-4 border border-black-900 rounded-lg hover:bg-white"
        >
          View Facility
        </button>
      ),
    },
  ];

  return (
    <div className="mt-5">
      <h2 className="text-center text-2xl font-semibold mb-4">Mobile Forensic Vans Dashboard</h2>
      <div className="bg-white p-4 rounded-xl shadow-md">
        {/* Filters */}
        <div className="mb-4">
          <div className="grid grid-cols-4 gap-2">
            {columns.filter((col) => col.filterKey && col.filterKey !== "action").map((col, index) => (
              <input
                key={index}
                type="text"
                placeholder={`Search by ${col.name.props.children}`}
                value={filters[col.filterKey]}
                onChange={(e) => handleFilter(e, col.filterKey)}
                className="p-2 border border-gray-300 rounded-md w-full text-sm"
              />
            ))}
          </div>
        </div>

        {/* Data Table */}
        <DataTable
          columns={columns}
          data={filteredData}
          pagination
          highlightOnHover
          striped
          responsive
        />
      </div>

      {/* Modal for Van Facility */}
      {isModalOpen && selectedVan && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl max-w-lg w-full relative">
            <h3 className="text-xl font-semibold mb-4">Van Facility Details</h3>
            <p><strong>VAN ID:</strong> {selectedVan.vanId}</p>
            <p><strong>City:</strong> {selectedVan.city}</p>
            <p><strong>Date:</strong> {selectedVan.date}</p>
            <p><strong>Count:</strong> {selectedVan.count}</p>

            {/* List of forensic kits */}
            <h4 className="mt-6 text-lg font-semibold">Forensic Kits</h4>
            <ul className="list-disc pl-6">
              <li>Crime Scene Cordoning / Protection Kit</li>
              <li>General Investigation Kit</li>
              <li>Evidence Packing and Collection Kit</li>
              <li>Foot & Tyre Print Casting Kit</li>
              <li>High Intensity Forensic Light Source</li>
              <li>Blood Detection and Semen Detection Kit</li>
              <li>DNA Collection and Sexual Assault Kit</li>
              <li>Explosive Detection Kit</li>
              <li>Narcotic Detection Kit</li>
              <li>Gun Shot Residue Test Kit</li>
              <li>Bullet Hole Testing Kit</li>
              <li>Arson Investigation Kit with Gas Detector</li>
              <li>Cyber Crime Investigation Kit</li>
              <li>Camera and Bar Code Scanner</li>
              <li>Crime Scene Hand Held Search Light and Light in a Bag</li>
              <li>Set of Uniform and Protective Gears for Forensic Expert</li>
            </ul>

            <div className="mt-4 flex justify-end">
              <button
                onClick={handleCloseModal}
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VanAvailability;
