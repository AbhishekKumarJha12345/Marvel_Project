import React, { useState } from "react";
import DataTable from "react-data-table-component";
import "tailwindcss/tailwind.css";

const initialData = [
    { sectionName: "Punishment for Culpable Homicide not amounting to Murder", sectionNo: "304", count: 5 },
    { sectionName: "Right of Private Defence of the Body and of Property", sectionNo: "103", count: 10 },
    { sectionName: "Abetting commission of offence by the public or by a person who is not a principal", sectionNo: "117", count: 8 },
    { sectionName: "Abetment of suicide", sectionNo: "113", count: 12 },
    { sectionName: "Abetment of an offense", sectionNo: "111", count: 7 },
    { sectionName: "Punishment for an offense committed due to abetment", sectionNo: "112", count: 9 },
  ];
  
const Firnewoffence = () => {
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
      name: <span className="font-semibold text-[14px]">Section Name</span>,
      selector: (row) => row.sectionName,
      sortable: true,
      filterKey: "sectionName",
    },
    {
      name: <span className="font-semibold text-[14px]">Section No</span>,
      selector: (row) => row.sectionNo,
      sortable: true,
      filterKey: "sectionNo",
    },
    {
      name: <span className="font-semibold text-[14px]">Count</span>,
      selector: (row) => row.count,
      sortable: true,
      filterKey: "count",
    },
  ];
  
  return (
    <div className="mt-5">
      <h2 className="text-center text-2xl font-semibold mb-4">FIRs under Key New Offences</h2>
      <div className="p-6 w-[98%] mx-auto bg-white shadow-lg rounded-lg">
        {/* Filters */}
        <div className="mb-4">
          <div className="grid grid-cols-3 gap-2">
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

export default Firnewoffence;
