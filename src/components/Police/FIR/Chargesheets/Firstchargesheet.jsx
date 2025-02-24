import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import "tailwindcss/tailwind.css";
import ModalComponent from "../../ModalComponent"; 
import axiosInstance from "../../../../utils/axiosInstance";

const Chargesheet = () => {
  const [filters, setFilters] = useState({ 
    id: "", 
    state: "", 
    city: "", 
    ps_name: "", 
    date_of_data: "", 
    type_of_data: "" 
  });

  const [data, setData] = useState([]); // Ensure initial state is an array
  const [filteredData, setFilteredData] = useState([]); // To store filtered results

  const [showModal, setShowModal] = useState(false);
  
  // const handleFilter = (event, key) => {
  //   const value = event.target.value.toLowerCase();
    
    
  //   // Update the filters state
  //   const newFilters = { ...filters, [key]: value };
  //   setFilters(newFilters);
  
  //   // Filter the data based on all filters
  //   const filtered = data.filter((row) =>
  //     Object.keys(newFilters).every((filterKey) =>
  //       newFilters[filterKey]
  //         ? row[filterKey]?.toString().toLowerCase().includes(newFilters[filterKey])
  //         : true
  //     )
  //   );
  
  //   setFilteredData(filtered);
  //   console.log('filtered::',filtered)

  // };
  
//added
  const handleFilter = (event, key) => {
    let value = event.target.value.trim().toLowerCase(); 
    if (key === "date_of_data" && value) {
      value = formatDateToYYYYMMDD(value); 
    }

    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);

    const filtered = data.filter((row) =>
      Object.keys(newFilters).every((filterKey) => {
        if (!newFilters[filterKey]) return true;

        let cellValue = row[filterKey];
        if (!cellValue) return false;

        cellValue = cellValue.toString().trim().toLowerCase(); 
        if (filterKey === "date_of_data") {
          cellValue = formatDateToYYYYMMDD(cellValue);
        }

        return cellValue.includes(newFilters[filterKey]);
      })
    );

    setFilteredData(filtered);
  };


  
  //added
  const formatDateToYYYYMMDD = (dateStr) => {
    if (!dateStr) return "";
  
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
  
    // Convert from DD/MM/YYYY to YYYY-MM-DD
    const parts = dateStr.split("/");
    if (parts.length === 3) {
      const [day, month, year] = parts;
      return `${year}-${month}-${day}`;
    }
  
    return dateStr; 
  };
  
  
  
  
  const columns = [
    { name: <span className="font-semibold text-[14px]">Charge Sheet No</span>, selector: (row) => row.id, sortable: true, filterKey: "id" },
    { name: <span className="font-semibold text-[14px]">State</span>, selector: (row) => row.state, sortable: true, filterKey: "state" },
    { name: <span className="font-semibold text-[14px]">City</span>, selector: (row) => row.city, sortable: true, filterKey: "city" },
    { name: <span className="font-semibold text-[14px]">PS Name</span>, selector: (row) => row.ps_name, sortable: true, filterKey: "ps_name" },
    //added this formatDate(row.date_of_data),
    { name: <span className="font-semibold text-[14px]">Date of Data</span>, selector: (row) => formatDateToYYYYMMDD(row.date_of_data), sortable: true, filterKey: "date_of_data" },
    { name: <span className="font-semibold text-[14px]">Charge Sheet Type</span>, selector: (row) => row.type_of_data, sortable: true, filterKey: "type_of_data" },
  ];
  
  const fetchFir5Data = async () => {
    try {
      const response = await axiosInstance.get("/live_data", { params: { type: "fir_5" } });
      if (Array.isArray(response.data.data_dict)) {
        setData(response.data.data_dict);
        setFilteredData(response.data.data_dict); 
      } else {
        console.error("Expected an array but got:", typeof response.data.data_dict);
        setData([]);
        setFilteredData([]);
      }
    } catch (error) {
      console.error("Error fetching FIR_5 data:", error);
      setData([]);
      setFilteredData([]); // Prevent undefined issues
    }
  };
  

  useEffect(() => {
    fetchFir5Data();
  }, []);

  return (
    <div className="mt-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-center flex-grow">
          First Charge Sheet Data Criminal Laws
        </h2>
        {localStorage.getItem('role') !=='chief secretary' && <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          style={{ backgroundColor: "#2d3748" }}
          onClick={() => setShowModal(true)}
        >
          Add On
        </button>}
      </div>
          
      <div className="p-6 w-[98%] mx-auto bg-white shadow-lg rounded-lg">
        <div className="grid grid-cols-6 gap-2 mb-4">
          {columns.map((col, index) => (
            <input
              key={index}
              // type="text"
              //added
              type={col.filterKey === 'date_of_data' ? 'date' : 'text'}


              placeholder={`Search by ${col.name.props.children}`}
              value={filters[col.filterKey]}
              onChange={(e) => handleFilter(e, col.filterKey)}
              className="p-2 border border-gray-300 rounded-md w-full text-sm"
            />
          ))}
        </div>

        <DataTable
          columns={columns}
          data={filteredData||[] }
          pagination
          highlightOnHover
          striped
          responsive
        />

        <ModalComponent open={showModal} type="fir_5" onClose={() => setShowModal(false)} />
      </div>
    </div>
  );
};

export default Chargesheet;
