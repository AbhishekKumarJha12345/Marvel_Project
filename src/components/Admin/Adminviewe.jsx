import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { Card, CardContent } from "@/components/ui/card";
import DataTable from "react-data-table-component";
import AdminRegister from './Admincontroll';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const AdminUserTable = () => {
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({ username: "", role: "", rank: "", station: "", created_on: "", created_by: "" });
  const [filteredData, setFilteredData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get("/users");
      setUsers(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleFilter = (event, key) => {
    const newFilters = { ...filters, [key]: event.target.value.toLowerCase() };
    setFilters(newFilters);
    setFilteredData(
      users.filter((user) =>
        Object.keys(newFilters).every((filterKey) =>
          user[filterKey]?.toString().toLowerCase().includes(newFilters[filterKey])
        )
      )
    );
  };
  const handleUserRegistered = () => {
    fetchUsers();  // Refresh user list after new registration
    setIsOpen(false); // Close modal after registration
  };
  

  const columns = [
    { name: "Username", selector: (row) => row.username, sortable: true, filterKey: "username" },
    { name: "Role", selector: (row) => row.role, sortable: true, filterKey: "role" },
    { name: "Rank", selector: (row) => row.rank, sortable: true, filterKey: "rank" },
    { name: "Station", selector: (row) => row.station, sortable: true, filterKey: "station" },
    { name: "Created On", selector: (row) => row.created_on, sortable: true, filterKey: "created_on" },
    { name: "Created By", selector: (row) => row.created_by, sortable: true, filterKey: "created_by" }
  ];

  return (
    <Card className="max-w-4xl mx-auto p-6 rounded-lg shadow-md">
      <CardContent>
         <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Admin Users</h2>
                <button 
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() => setIsOpen(true)}
                >
                    Open Registration
                </button>
            </div>



            {isOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-[600px]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Register Admin</h3>
        <button 
          className="text-gray-500 text-lg font-bold"
          onClick={() => setIsOpen(false)}
        >
          ✖
        </button>
      </div>
      <AdminRegister onRegister={handleUserRegistered} onClose={() => setIsOpen(false)} />
    </div>
  </div>
)}



        {/* Filters */}
        <div className="mb-4 grid grid-cols-4 gap-2">
          {columns.filter((col) => col.filterKey).map((col, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Search by ${col.name}`}
              value={filters[col.filterKey]}
              onChange={(e) => handleFilter(e, col.filterKey)}
              className="p-2 border border-gray-300 rounded-md w-full text-sm"
            />
          ))}
        </div>
        <DataTable columns={columns} data={filteredData} pagination highlightOnHover striped responsive />
      </CardContent>
    </Card>
  );
};

export default AdminUserTable;
