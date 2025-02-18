import React, { useState } from "react";
import DataTable from "react-data-table-component";
import "tailwindcss/tailwind.css";

const initialData = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", date: "2024-01-01", firType: "FIR" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", date: "2024-01-02", firType: "Charge Sheet" },
  { id: 3, name: "Alice Johnson", email: "alice@example.com", role: "Editor", date: "2024-02-15", firType: "FIR" },
  { id: 4, name: "Bob Brown", email: "bob@example.com", role: "Viewer", date: "2024-03-10", firType: "Charge Sheet" },
  { id: 5, name: "Charlie White", email: "charlie@example.com", role: "User", date: "2024-04-22", firType: "FIR" },
  { id: 6, name: "David Black", email: "david@example.com", role: "Editor", date: "2024-05-05", firType: "Charge Sheet" },
];

const ZeroFirNcloutside = () => {
  const [filters, setFilters] = useState({ id: "", name: "", email: "", role: "", date: "", firType: "" });
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
      name:  <span className="font-semibold text-[14px]">FIR No</span>,
      selector: (row) => row.id,
      sortable: true,
      filterKey: "id",
    },
    {
      name:  <span className="font-semibold text-[14px]">State</span>,
      selector: (row) => row.name,
      sortable: true,
      filterKey: "name",
    },
    {
      name: <span className="font-semibold text-[14px]">City</span>,
      selector: (row) => row.email,
      sortable: true,
      filterKey: "email",
    },
    {
      name: <span className="font-semibold text-[14px]">Ps Name</span>,
      selector: (row) => row.role,
      sortable: true,
      filterKey: "role",
    },
    {
      name:  <span className="font-semibold text-[14px]">Date</span>,
      selector: (row) => row.date,
      sortable: true,
      filterKey: "date",
    },
    {
      name: <span className="font-semibold text-[14px]">FIR</span>,
      selector: (row) => row.firType,
      sortable: true,
      filterKey: "firType",
    },
  ];

  return (
    <div className="mt-5">
      <h2 className="text-center text-2xl font-semibold mb-4">First zero FIR outside Maharashtra under NCL</h2>
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

export default ZeroFirNcloutside;
