import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import "tailwindcss/tailwind.css";

const Chargesheetstatus = ({ apidata }) => {
  console.log(apidata, 'FIR33333333333333333333333');

  const [filters, setFilters] = useState({ id: "", act: "", chargesheeted: "", total_registered: "", under_investigation: "", firType: "" });
  const [filteredData, setFilteredData] = useState([]);

  const handleFilter = (event, key) => {
    const newFilters = { ...filters, [key]: event.target.value.toLowerCase() };
    setFilters(newFilters);

    setFilteredData(
      filteredData.filter((row) =>
        Object.keys(newFilters).every((filterKey) =>
          row[filterKey].toString().toLowerCase().includes(newFilters[filterKey])
        )
      )
    );
  };

  useEffect(() => {
    if (apidata && typeof apidata === 'object') {
      // Transform the backend data to match initialData structure
      const transformedData = [{
        id: apidata.id || "N/A",
        act: apidata.act || "N/A",  // Assuming 'act' corresponds to 'name'
        chargesheeted: apidata.chargesheeted || "N/A",  // Using 'file_path' as a placeholder for 'email'
        total_registered: apidata.total_registered || "N/A",  // Using 'chargesheeted' as a placeholder for 'role'
        under_investigation: apidata.under_investigation || "N/A",
        firType: apidata.act ? "FIR" : "Charge Sheet"  // Adjust as needed
      }];

      // Set the transformed data
      setFilteredData(transformedData);
    }
  }, [apidata]);

  console.log(filteredData, 'filtered data');

  const columns = [
    {
      name: <span className="font-semibold text-[14px]">Act and Section</span>,
      selector: (row) => row.act,
      sortable: true,
      filterKey: "act",
    },
    {
      name: <span className="font-semibold text-[14px]">Total Registered</span>,
      selector: (row) => row.total_registered,
      sortable: true,
      filterKey: "total_registered",
    },
    {
      name: <span className="font-semibold text-[14px]">Chargesheeted</span>,
      selector: (row) => row.chargesheeted,
      sortable: true,
      filterKey: "chargesheeted",
    },
    {
      name: <span className="font-semibold text-[14px]">Under Investigation</span>,
      selector: (row) => row.under_investigation,
      sortable: true,
      filterKey: "under_investigation",
    },
  ];

  return (
    <div className="mt-5">
      <h2 className="text-center text-2xl font-semibold mb-4">Chargesheet Status: Key offences</h2>
      <div className="p-6 w-[98%] mx-auto bg-white shadow-lg rounded-lg">
        {/* Filters */}
        <div className="mb-4">
          {/* Search filters */}
          <div className="grid grid-cols-4 gap-2">
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

export default Chargesheetstatus;