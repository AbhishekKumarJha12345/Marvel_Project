import React, { useState } from "react";
import DataTable from "react-data-table-component";
import "tailwindcss/tailwind.css";

const initialData = [
    { count: "10", district: "Mumbai", city: "Mumbai", date: "01-03-2025" },
    { count: "20", district: "Pune", city: "Pune", date: "02.03.2025" },
    { count: "25", district: "Nashik", city: "Nashik", date: "03.03.2025" },
    { count: "30", district: "Nagpur", city: "Nagpur", date: "04.03.2025" },
    { count: "40", district: "Aurangabad", city: "Aurangabad", date: "05.03.2025" },
    { count: "50", district: "Thane", city: "Thane", date: "06.03.2025" },
    { count: "60", district: "Solapur", city: "Solapur", date: "07.03.2025" },
    { count: "70", district: "Kolhapur", city: "Kolhapur", date: "08.03.2025" },
    { count: "80", district: "Satara", city: "Satara", date: "09.03.2025" },
    { count: "90", district: "Aurangabad", city: "Aurangabad", date: "10.03.2025" },
    { count: "98", district: "Navi Mumbai", city: "Navi Mumbai", date: "11.03.2025" },
    { count: "97", district: "Latur", city: "Latur", date: "12.03.2025" },
    { count: "95", district: "Pune", city: "Pimpri-Chinchwad", date: "13.03.2025"},
    { count: "92", district: "Pune", city: "Khadki", date: "14.03.2025"},
    { count: "85", district: "Pune", city: "Dehu Road", date: "15.03.2025"},
    { count: "81", district: "Pune", city: "Alandi", date: "16.03.2025"},
    { count: "78", district: "Pune", city: "Baramati", date: "17.03.2025"}

  ];

  
const PolicevisitsforensicTeams = () => {
  const [filters, setFilters] = useState({ count: "", district: "", city: "", date: "" });
  const [filteredData, setFilteredData] = useState(initialData);

  // const handleFilter = (event, key) => {
  //   const value = event.target.value.toLowerCase();
  //   const newFilters = { ...filters, [key]: value };
  //   setFilters(newFilters);
  //   setFilteredData(
  //     initialData.filter((row) =>
  //       Object.keys(newFilters).every((filterKey) =>
  //         row[filterKey]
  //           ? row[filterKey].toString().toLowerCase().includes(newFilters[filterKey])
  //           : true
  //       )
  //     )
  //   );
  // };

  //added
  const handleFilter = (event, key) => {
    let value = event.target.value.toLowerCase().trim();
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
  
    const filtered = initialData.filter((row) => {
      return Object.keys(newFilters).every((filterKey) => {
        if (!newFilters[filterKey]) return true; // Ignore empty filters
  
        let cellValue = row[filterKey]?.toString().toLowerCase().trim(); 
        if (!cellValue) return false;
  
        // Convert date formats to YYYY-MM-DD for filtering
        if (filterKey === "date") {
          cellValue = normalizeDateFormat(cellValue); 
          value = normalizeDateFormat(value);
        }
  
        return cellValue.includes(newFilters[filterKey]);
      });
    });
  
    setFilteredData(filtered);
  };
  
//added
  const normalizeDateFormat = (dateStr) => {
    if (!dateStr) return "";
  
    // If already in YYYY-MM-DD format, return it
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
  
    // Convert from DD-MM-YYYY or DD.MM.YYYY to YYYY-MM-DD
    const parts = dateStr.split(/[-.]/); 
    if (parts.length === 3) {
      const [day, month, year] = parts;
      return `${year}-${month}-${day}`; // Convert to YYYY-MM-DD
    }
  
    return dateStr; // Return as is if unknown format
  };
  

  const columns = [
    {
      name: <span className="font-semibold text-[14px]">Count</span>,
      selector: (row) => row.count,
      sortable: true,
      filterKey: "count",
    },
    {
      name: <span className="font-semibold text-[14px]">District</span>,
      selector: (row) => row.district,
      sortable: true,
      filterKey: "district",
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
  ];

  return (
    <div className="mt-5">
      <h2 className="text-center text-2xl font-semibold mb-4">Police Visits Of Forensic Teams</h2>
      <div className="p-6 w-[98%] mx-auto bg-white shadow-lg rounded-lg">
        {/* Filters */}
        <div className="mb-4">
          <div className="grid grid-cols-4 gap-2"> {/* Adjusted grid to fit 4 columns */}
            {columns.map((col, index) => (
              <div key={index} className="flex flex-col">
                <input
                  // type="text"
                  //added
                  type={col.filterKey === 'date' ? 'date' : 'text'}

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

export default PolicevisitsforensicTeams;
