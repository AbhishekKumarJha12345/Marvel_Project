import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { Card, CardContent } from "@/components/Ui/Card.jsx";
import DataTable from "react-data-table-component";
import AdminRegister from './Admincontroll';
import { Button } from "@/components/Ui/Button.jsx";
import { Pencil, Trash } from "lucide-react";
const AdminUserTable = () => {
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({ username: "", role: "", station: "", created_on: "", created_by: "" });
  const [filteredData, setFilteredData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editFormData, setEditFormData] = useState({
    username: "",
    role: "",
    station: "",
    password: "",  
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get("/users");
      setUsers(response.data);
      setFilteredData(response.data.reverse());
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

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
    fetchUsers();
    setIsOpen(false);
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setEditFormData({
      username: user.username,
      role: user.role,
      station: user.station,
      password: "",  
    });
    setEditOpen(true);
  };

  const handleEditChange = (event) => {
    setEditFormData({ ...editFormData, [event.target.name]: event.target.value });
  };

  const handleDeleteClick = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axiosInstance.delete(`/users/${userId}`)
        .then(() => {
          alert("User deleted successfully"); 
          fetchUsers(); 
        })
        .catch((error) => {
          console.error("Error deleting user", error);
          alert("Failed to delete user. Please try again."); 
        });
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleUpdateUser = async () => {
    try {
      const updatedData = { ...editFormData };
      if (!updatedData.password) {
        delete updatedData.password; 
      }

      console.log("Updating user:", selectedUser.id, updatedData);
      const response = await axiosInstance.put(`/users/${selectedUser.id}`, updatedData);
      console.log("Update successful", response.data);


      alert("User updated Successfully")
      fetchUsers();
      setEditOpen(false);
    } catch (error) {
      console.error("Error updating user", error);
    }
  };
  //added_25
  const customStyles = {
    headCells: {
      style: {
        fontWeight: "600", // Equivalent to font-semibold
        fontSize: "14px",  // Equivalent to text-[14px]
      },
    },
  }; //added_25

  const columns = [
    { name: "Username", selector: (row) => row.username, sortable: true, filterKey: "username" },
    {
      name: "Role",
      selector: (row) => {
        const roles = {
          "chief secretary": "Chief Secretary",
          "Correction": "Correctional Services",
          "Forensic": "Forensic",
          "police": "Police",
          "Prosecutor": "Prosecution",
          "admin": "Admin",
          "Court": "Courts"
        };
        return roles[row.role] || row.role;
      },
      sortable: true,
      filterKey: "role"
    },
    // { name: "Location", selector: (row) => row.station, sortable: true, filterKey: "station" },
    { name: "Email", selector: (row) => row.email, sortable: true, filterKey: "email" },
    { name: "Created On", selector: (row) => row.created_on, sortable: true, filterKey: "created_on" },
    { name: "Created By", selector: (row) => row.created_by, sortable: true, filterKey: "created_by" },
    {
      name: "Edit",
      cell: (row) => (
        <button
          onClick={() => handleEditClick(row)}
          className="bg-[#2d3748] text-white px-3 py-1 rounded-md flex items-center justify-center"
        >
          <Pencil size={18} />
        </button>
      ),
    
      button: true,
    },
    {
      name: "Delete",
      cell: (row) => (
        <button
          onClick={() => handleDeleteClick(row.id)}
          className="!bg-red-500 hover:!bg-red-600 text-white px-3 py-1 rounded-md flex items-center justify-center"
        >
          <Trash size={18} />
        </button>
      ),
     
      button: true,
    }
    
  ];

  return (
    <Card className="max-w-4xl mx-auto p-6 rounded-lg shadow-md">
      <CardContent className="border-none">
        <div className="flex justify-between items-center mb-4 p-3">
          <h2 className="text-xl font-bold">Admin Users</h2>
          <button className="bg-[#2d3748] text-white px-4 py-2 rounded" onClick={() => setIsOpen(true)}>Open Registration</button>
        </div>

        {/* Registration Modal */}
        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-3">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[600px]">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Register Admin</h3>
                <button className="text-gray-500 text-lg font-bold" onClick={() => setIsOpen(false)}>✖</button>
              </div>
              <AdminRegister onRegister={handleUserRegistered} onClose={() => setIsOpen(false)} />
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {editOpen && selectedUser && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-3">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Edit User</h3>
                <button className="text-gray-500 text-lg font-bold" onClick={() => setEditOpen(false)}>✖</button>
              </div>
              <form onSubmit={(e) => { e.preventDefault(); handleUpdateUser(); }}>
                <div className="mb-4">
                  <label className="block text-sm font-medium">Username</label>
                  <input type="text" name="username" value={editFormData.username} onChange={handleEditChange} className="p-2 border border-gray-300 rounded-md w-full" />
                </div>
                <div className="mb-4">
                <label className="block text-sm font-medium">Role</label>
                <input 
                  type="text" 
                  name="role" 
                  value={editFormData.role} 
                  readOnly 
                  className="p-2 border border-gray-300 rounded-md w-full bg-gray-100 cursor-not-allowed" 
                />
              </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium">Location</label>
                  <input type="text" name="station" value={editFormData.station} onChange={handleEditChange} className="p-2 border border-gray-300 rounded-md w-full" />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium">New Password (optional)</label>
                  <input type="password" name="password" value={editFormData.password} onChange={handleEditChange} className="p-2 border border-gray-300 rounded-md w-full" placeholder="Leave blank to keep current password" />
                </div>
                <div className="flex justify-end">
                  <button type="submit" className="bg-[#2d3748] text-white px-4 py-2 rounded">Update</button>
                </div>
              </form>

            </div>
          </div>
        )}

        {/* Filters */}
        <div className="mb-4 grid grid-cols-5 gap-2 px-3 " >
          {columns.filter((col) => col.filterKey).map((col, index) => (
            <div key={index} className="flex flex-col ">
              <label className="text-sm ">{col.name}:</label>
              <input type={col.name === 'Created On' ? 'date' : 'text'} placeholder={`Search by ${col.name}`} value={filters[col.filterKey] || ""} onChange={(e) => handleFilter(e, col.filterKey)} className="p-2 border border-gray-300 rounded-md w-[270px]" />
            </div>
          ))}
        </div>
        <div className='p-3'>
        {/* added_25 */}
        <DataTable columns={columns} data={filteredData} pagination highlightOnHover striped responsive customStyles={customStyles}/>      
        </div>
      </CardContent>
    </Card>
  );
};
export default AdminUserTable;
