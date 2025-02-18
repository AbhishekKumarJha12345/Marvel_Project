import React, { useState } from "react";
import DataTable from "react-data-table-component";
import "tailwindcss/tailwind.css";

const initialData = [
  { firNo: 1, state: "Maharashtra", city: "Mumbai", psName: "Andheri PS", date: "2024-01-01", fir: "FIR" },
  { firNo: 2, state: "Maharashtra", city: "Pune", psName: "Kothrud PS", date: "2024-01-02", fir: "FIR" },
  { firNo: 3, state: "Delhi", city: "New Delhi", psName: "Connaught Place PS", date: "2024-02-15", fir: "FIR" },
  { firNo: 4, state: "Karnataka", city: "Bengaluru", psName: "MG Road PS", date: "2024-03-10", fir: "FIR" },
  { firNo: 5, state: "Uttar Pradesh", city: "Lucknow", psName: "Hazratganj PS", date: "2024-04-22", fir: "FIR" },
  { firNo: 6, state: "Rajasthan", city: "Jaipur", psName: "Mansarovar PS", date: "2024-05-05", fir: "FIR" },
];


const FirstFirdata = () => {
  const [filters, setFilters] = useState({ firNo: "", state: "", city: "", psName: "", date: "", fir: "" });
  const [filteredData, setFilteredData] = useState(initialData);

  const handleFilter = (event, key) => {
    const newFilters = { ...filters, [key]: event.target.value.toLowerCase() };
    setFilters(newFilters);

    setFilteredData(
      initialData.filter((row) =>
        Object.keys(newFilters).every((filterKey) =>
          row[filterKey].toString().toLowerCase().includes(newFilters[filterKey])
        )
      )
    );
  };

  const columns = [
    {
      name: <span className="font-semibold text-[14px]">FIR No</span>,
      selector: (row) => row.firNo,
      sortable: true,
      filterKey: "firNo",
    },
    {
      name: <span className="font-semibold text-[14px]">State</span>,
      selector: (row) => row.state,
      sortable: true,
      filterKey: "state",
    },
    {
      name: <span className="font-semibold text-[14px]">City</span>,
      selector: (row) => row.city,
      sortable: true,
      filterKey: "city",
    },
    {
      name: <span className="font-semibold text-[14px]">Ps Name</span>,
      selector: (row) => row.psName,
      sortable: true,
      filterKey: "psName",
    },
    {
      name: <span className="font-semibold text-[14px]">Date</span>,
      selector: (row) => row.date,
      sortable: true,
      filterKey: "date",
    },
    {
      name: <span className="font-semibold text-[14px]">FIR</span>,
      selector: (row) => row.fir,
      sortable: true,
      filterKey: "fir",
    },
  ];
  
  return (
    <div className="mt-5">
      <h2 className="text-center text-2xl font-semibold mb-4">First FIR's Data</h2>
      <div className="p-6 w-[98%] mx-auto bg-white shadow-lg rounded-lg">
        <div className="grid grid-cols-6 gap-2 mb-4">
          {columns.map((col, index) => (
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

export default FirstFirdata;
