import React, { useState } from "react";
import DataTable from "react-data-table-component";
import "tailwindcss/tailwind.css";

const initialData = [
  { id: 1, fromState: "Maharashtra", toState: "Karnataka", receivedTransferred: "Transferred", count: "15", department: "Traffic Police" },
  { id: 2, fromState: "Maharashtra", toState: "Goa", receivedTransferred: "Transferred", count: "20", department: "Forensic Department" },
  { id: 3, fromState: "Maharashtra", toState: "Gujarat", receivedTransferred: "Received", count: "10", department: "Narcotics Division" },
  { id: 4, fromState: "Maharashtra", toState: "Delhi", receivedTransferred: "Transferred", count: "12", department: "Domestic Violence Unit" },
  { id: 5, fromState: "Maharashtra", toState: "Uttar Pradesh", receivedTransferred: "Received", count: "18", department: "Cyber Crime Division" },
  { id: 6, fromState: "Maharashtra", toState: "Rajasthan", receivedTransferred: "Transferred", count: "22", department: "Vice Squad" },
];

const Receivedfromotherstates = () => {
  const [filters, setFilters] = useState({ id: "", fromState: "", toState: "", receivedTransferred: "", count: "", department: "" });
  const [filteredData, setFilteredData] = useState(initialData);

  const handleFilter = (event, key) => {
    const value = event.target.value.toLowerCase();
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);

    setFilteredData(
      initialData.filter((row) =>
        Object.keys(newFilters).every((filterKey) =>
          row[filterKey]
            ? row[filterKey].toString().toLowerCase().includes(newFilters[filterKey])
            : true
        )
      )
    );
  };

  const columns = [
    {
      name: <span className="font-semibold text-[14px]">FIR ID</span>,
      selector: (row) => row.id,
      sortable: true,
      filterKey: "id",
    },
    {
      name: <span className="font-semibold text-[14px]">From State</span>,
      selector: (row) => row.fromState,
      sortable: true,
      filterKey: "fromState",
    },
    {
      name: <span className="font-semibold text-[14px]">To State</span>,
      selector: (row) => row.toState,
      sortable: true,
      filterKey: "toState",
    },
    {
      name: <span className="font-semibold text-[14px]">Received/Transferred</span>,
      selector: (row) => row.receivedTransferred,
      sortable: true,
      filterKey: "receivedTransferred",
    },
    {
      name: <span className="font-semibold text-[14px]">Count</span>,
      selector: (row) => row.count,
      sortable: true,
      filterKey: "count",
    },
    {
      name: <span className="font-semibold text-[14px]">Department</span>,
      selector: (row) => row.department,
      sortable: true,
      filterKey: "department",
    },
  ];

  return (
    <div className="mt-5">
      <h2 className="text-center text-2xl font-semibold mb-4">Received From Other States</h2>
      <div className="p-6 w-[98%] mx-auto bg-white shadow-lg rounded-lg">
        {/* Filters */}
        <div className="mb-4">
          <div className="grid grid-cols-6 gap-2">
            {columns.map((col, index) => (
              <div key={index} className="flex flex-col">
                <input
                  type="text"
                  placeholder={`Search by ${col.name.props.children}`}
                  value={filters[col.filterKey]}
                  onChange={(e) => handleFilter(e, col.filterKey)}
                  className="p-2 border border-gray-300 rounded-md w-full text-sm"
                />
              </div>
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
    </div>
  );
};

export default Receivedfromotherstates;
