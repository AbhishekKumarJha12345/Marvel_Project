import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { Card, CardContent } from "@/components/ui/card";
import DataTable from "react-data-table-component";
import AdminRegister from './Admincontroll';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const AdminUserTable = () => {
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({ username: "", role: "", station: "", created_on: "", created_by: "" });
  const [filteredData, setFilteredData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get("/users");
      setUsers(response.data);
      setFilteredData(response.data.reverse());
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
        .reverse()
    );
  };
  const handleUserRegistered = () => {
    fetchUsers();  // Refresh user list after new registration
    setIsOpen(false); // Close modal after registration
  };


  const columns = [
    { name: "Username", selector: (row) => row.username, sortable: true, filterKey: "username" },
    {
      name: "Role", selector: (row) => {
        if (row.role === "chief secretary") return "Chief Secretry";
        if (row.role === "Correction") return "Correctional Services";
        if (row.role === "Forensic") return "Forensic";
        if (row.role === "police") return "Police";
        if (row.role === "Prosecutor") return "Prosecution";
        if (row.role === "admin") return "Admin";
        if (row.role === "Court") return "Courts"
        return row.role;
      }, sortable: true, filterKey: "station"
    },
    // { name: "Rank", selector: (row) => row.rank, sortable: true, filterKey: "rank" },
    { name: "Location", selector: (row) => row.station, sortable: true, filterKey: "station" },
    { name: "Created On", selector: (row) => row.created_on, sortable: true, filterKey: "created_on" },
    { name: "Created By", selector: (row) => row.created_by, sortable: true, filterKey: "created_by" }
  ];

  return (
    <Card className="max-w-4xl mx-auto p-6 rounded-lg shadow-md">
      <CardContent className="border-none">
        <div className="flex justify-between items-center mb-4 p-3">
          <h2 className="text-xl font-bold">Admin Users</h2>
          <button
            className="bg-[#2d3748] text-white px-4 py-2 rounded"
            onClick={() => setIsOpen(true)}
          >
            Open Registration
          </button>
        </div>



        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-3">
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
        <div className="mb-4 grid grid-cols-5 gap-2 px-3">
          {columns.filter((col) => col.filterKey).map((col, index) => (
            <div key={index} className="flex flex-col">
              <label className="text-sm font-medium">{col.name} : </label>
              <input
                type={col.name === 'Created On' ? 'date' : 'text'}
                placeholder={`Search by ${col.name}`}
                value={filters[col.filterKey] || ""}
                onChange={(e) => handleFilter(e, col.filterKey)}
                className="p-2 border border-gray-300 rounded-md w-[300px] text-sm"
              />
            </div>
          ))}
        </div>

        <DataTable columns={columns} data={filteredData} pagination highlightOnHover striped responsive customStyles={{
          headCells: {
            style: {
              backgroundColor: "#d3d3d3", // Light grey
              color: "#000", // Black text for contrast
              fontWeight: "bold",
            },
          },
        }} />
      </CardContent>
    </Card>
  );
};

export default AdminUserTable;
