import React, { useState } from "react";
import DataTable from "react-data-table-component";
import "tailwindcss/tailwind.css";

const initialData = [
  { date: "01-03-2025", unitname: "Forensic Investigation Unit (FIU)", count: "10" },
  { date: "02-03-2025", unitname: "Crime Scene Investigation Unit (CSIU)", count: "20" },
  { date: "03-03-2025", unitname: "Digital Forensics Unit (DFU)", count: "25" },
  { date: "04-03-2025", unitname: "Major Crimes Forensic Division (MCFD)", count: "30" },
  { date: "05-03-2025", unitname: "Forensic Response Team (FRT)", count: "40" },
  { date: "06-03-2025", unitname: "Cyber Forensics Unit (CFU)", count: "50" },
  { date: "07-03-2025", unitname: "DNA Analysis Unit (DAU)", count: "60" },
  { date: "08-03-2025", unitname: "Forensic Investigation Unit (FIU)", count: "70" },
  { date: "09-03-2025", unitname: "Crime Scene Investigation Unit (CSIU)", count: "80" },
  { date: "10-03-2025", unitname: "Digital Forensics Unit (DFU)", count: "90" },
  { date: "11-03-2025", unitname: "Major Crimes Forensic Division (MCFD)", count: "98" },
  { date: "12-03-2025", unitname: "Forensic Response Team (FRT)", count: "97" },
];

const Policevisitsforensic = () => {
  const [filters, setFilters] = useState({ date: "", unitname: "", count: "" });
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
      name: <span className="font-semibold text-[14px]">Date</span>,
      selector: (row) => row.date,
      sortable: true,
      filterKey: "date",
    },
    {
      name: <span className="font-semibold text-[14px]">Unit Name</span>,
      selector: (row) => row.unitname,
      sortable: true,
      filterKey: "unitname",
    },
    {
      name: <span className="font-semibold text-[14px]">Forensic Van Visits</span>,
      selector: (row) => row.count,
      sortable: true,
      filterKey: "count",
    },
  ];

  return (
    <div className="mt-5">
      <h2 className="text-center text-2xl font-semibold mb-4">Police W.R.T Forensic Visits</h2>
      <div className="p-6 w-[98%] mx-auto bg-white shadow-lg rounded-lg">
        {/* Filters */}
        <div className="mb-4">
          <div className="grid grid-cols-3 gap-2"> {/* Adjusted grid to fit 3 columns */}
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

export default Policevisitsforensic;
