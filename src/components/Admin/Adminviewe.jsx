import { useEffect, useState, useRef } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { Card, CardContent } from "@/components/Ui/Card.jsx";
import DataTable from "react-data-table-component";
import AdminRegister from './Admincontroll';
import { Button } from "@/components/Ui/Button.jsx";
import { Pencil, Trash } from "lucide-react";

const AdminUserTable = () => {
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({ username: "", role: "", station: "", created_on: "", created_by: "", email: "" });
  const [filteredData, setFilteredData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedZone, setSelectedZone] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState([]);
  const dropdownRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");


  // Zones data
  const zones = {
    Amravati: ["Akola", "Amravati", "Buldana", "Washim", "Yavatmal"],
    'Chhatrapati Sambhajinagar': ["Chhatrapati Sambhajinagar", "Beed", "Hingoli", "Jalna", "Latur", "Nanded", "Osmanabad", "Parbhani"],
    Konkan: ["Mumbai", "Mumbai Suburban", "Palghar", "Raigad", "Ratnagiri", "Sindhudurg", "Thane"],
    Nagpur_Rural: ["Bhandara", "Chandrapur", "Gadchiroli", "Gondia", "Nagpur Rural", "Wardha"],
    Nashik: ["Ahmednagar", "Dhule", "Jalgaon", "Nandurbar", "Nashik"],
    Pune: ["Kolhapur", "Pune", "Sangli", "Satara", "Solapur"],
  };

  // Initialize editFormData with localStorage data
  const sanitizeValue = (value) => (value === "N/A" ? " " : value);

  const [editFormData, setEditFormData] = useState({
    username: sanitizeValue(users.userName) || "",
    role: sanitizeValue(users.role) || "",
    station: sanitizeValue(users.state) || "", // Map "state" to "station"
    password: "",
    district: sanitizeValue(users.district) || "",
    email: sanitizeValue(users.email) || "",
    emp_id: sanitizeValue(users.emp_id) || "",
    mobile_number: sanitizeValue(users.mobile_number) || "",
    rank: sanitizeValue(users.rank) || "",
    sub_role: sanitizeValue(users.sub_role) || "",
    zone: sanitizeValue(users.zone) || "",
    city: sanitizeValue(users.city) || "",
  });


  // Fetch users on component mount
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

  // Handle filter changes
  const handleFilter = (event, key) => {
    const newFilters = { ...filters, [key]: event.target.value.toLowerCase() };
    setFilters(newFilters);
    setFilteredData(
      users.filter((user) =>
        Object.keys(newFilters).every((filterKey) =>
          user[filterKey]?.toString().toLowerCase().includes(newFilters[filterKey])
        )
      ).reverse()
    );
  };

  // Handle user registration
  const handleUserRegistered = () => {
    fetchUsers();
    setIsOpen(false);
  };

  // Handle edit click
  const handleEditClick = (user) => {
    setSelectedUser(user);
    setEditFormData({
      username: user.username,
      role: user.role,
      station: user.station,
      password: "",
      district: user.district || "",
      email: user.email || "",
      emp_id: user.emp_id || "",
      mobile_number: user.mobile_number || "",
      rank: user.rank || "",
      sub_role: user.sub_role || "",
      zone: user.zone || "",
      city: user.city || "",
    });
    setEditOpen(true);
  };

  // Handle edit form changes
  const handleEditChange = (event) => {
    setEditFormData({ ...editFormData, [event.target.name]: event.target.value });
  };

  // Handle delete click
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

  // Handle district selection
  const handleDistrictChange = (e) => {
    const { value } = e.target;
  
    setSelectedDistrict(value); // Update selected district state
  
    setEditFormData((prevFormData) => ({
      ...prevFormData,
      district: value, // Save the selected district in formData
    }));
  };


  const handleCityChange = (e) => {
    const value = e.target.value;
    setSelectedCity(value);
    setEditFormData((prevFormData) => ({ ...prevFormData,
      city: value })); // Reset district when zone changes
    
  };
  
  // const handleDistrictChange = (e) => {
  //   const { value, checked } = e.target;

  //   setSelectedDistrict((prev) => {
  //     const updatedSelection = checked
  //       ? [...prev, value] // Add selected district
  //       : prev.filter((district) => district !== value); // Remove if unchecked

  //     setEditFormData((prevFormData) => ({
  //       ...prevFormData,
  //       district: updatedSelection, // Store in formData
  //     }));

  //     return updatedSelection; // Update state
  //   });
  // };

  // Handle zone selection
  const handleZoneChange = (e) => {
    const zone = e.target.value;
    setSelectedZone(zone);
    setEditFormData((prev) => ({ ...prev, zone, district: [] })); // Reset district when zone changes
    setSelectedDistrict([]); // Reset selected district
  };

  // Handle user update
  const handleUpdateUser = async () => {
    try {
      const updatedData = { ...editFormData };
      if (!updatedData.password) {
        delete updatedData.password;
      }

      const response = await axiosInstance.put(`/users/${selectedUser.id}`, updatedData);
      alert("User updated successfully");
      fetchUsers();
      setEditOpen(false);
    } catch (error) {
      console.error("Error updating user", error);
    }
  };

  // Custom styles for DataTable
  const customStyles = {
    headCells: {
      style: {
        fontWeight: "600",
        fontSize: "14px",
      },
    },
  };

  // Columns for DataTable
  const columns = [
    { name: "Username", selector: (row) => row.username, sortable: true, filterKey: "username" },
    {
      name: "Role",
      selector: (row) => {
        const roles = {
          "Chief secretary": "Chief Secretary",
          "Correction": "Correctional Services",
          "Forensic": "Forensic",
          "Police": "Police",
          "Prosecutor": "Prosecution",
          "Admin": "Admin",
          "Court": "Courts"
        };
        return roles[row.role] || row.role;
      },
      sortable: true,
      filterKey: "role"
    },
    { name: "email", selector: (row) => row.email, sortable: true, filterKey: "email" },
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
            <div className="bg-white p-6 rounded-lg shadow-lg w-[500px] max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Edit User</h3>
                <button className="text-gray-500 text-lg font-bold" onClick={() => setEditOpen(false)}>✖</button>
              </div>
              <form onSubmit={(e) => { e.preventDefault(); handleUpdateUser(); }}>
                <div className="mb-4">
                  <label className="block text-sm font-medium">Employee ID</label>
                  <input type="text" name="emp_id" value={editFormData.emp_id} onChange={handleEditChange} className="p-2 border border-gray-300 rounded-md w-full" />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium">Email Id</label>
                  <input type="text" name="email" value={editFormData.email} onChange={handleEditChange} className="p-2 border border-gray-300 rounded-md w-full" />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium">Username</label>
                  <input type="text" name="user_name" value={editFormData.username} onChange={handleEditChange} className="p-2 border border-gray-300 rounded-md w-full" />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium">Role</label>
                  <input type="text" name="role" value={editFormData.role} readOnly className="p-2 border border-gray-300 rounded-md w-full bg-gray-100 cursor-not-allowed" />
                </div>
                {editFormData.role === "police" ? (
                  <div className="mb-4">
                    <label className="block text-sm font-medium">Sub Role</label>
                    <select
                      name="sub_role"
                      value={editFormData.sub_role}
                      onChange={handleEditChange}
                      className="w-full p-2 border rounded-md bg-white"
                    >
                     <option value="">Select SubRole</option>
                      <option value="IG/DIG">IG/DIG</option>
                      <option value="SP">SP</option>
                      <option value="CP">CP</option>
                    </select>
                  </div>
                ) : (
                  <></>
                  // <div className="mb-4">
                  //   <label className="block text-sm font-medium">Sub Role</label>
                  //   <input
                  //     type="text"
                  //     name="sub_role"
                  //     value={editFormData.sub_role}
                  //     onChange={handleEditChange}
                  //     className="w-full p-2 border rounded-md bg-white"
                  //     placeholder="Enter Sub Role"
                  //   />
                  // </div>
                )}
                <div className="mb-4">
                  <label className="block text-sm font-medium">Rank</label>
                  <input type="text" name="rank" value={editFormData.rank} onChange={handleEditChange} className="p-2 border border-gray-300 rounded-md w-full" />
                </div>
                {(editFormData.sub_role !== "CP") &&(
                <div className="mb-4">
                  <label className="block text-sm font-medium">Zone</label>
                  <select
                    name="zone"
                    value={selectedZone}
                    onChange={handleZoneChange}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="">Select Zone</option>
                    {Object.keys(zones).map((zone) => (
                      <option key={zone} value={zone}>
                        {zone}
                      </option>
                    ))}
                  </select>
                </div>)}

                {(editFormData.sub_role !== "IG/DIG" || editFormData.sub_role !== "CP") && (

editFormData.sub_role == "CP" ? (<div ref={dropdownRef} className="relative mb-4">
  <label className="block text-sm font-medium">City</label>
  <select
id="city"
value={selectedCity}
onChange={handleCityChange} // Use the updated function
className="w-full p-2 border rounded-md bg-white"
>
<option value="">Select City</option>
<option value="Mumbai City">Mumbai City</option>
<option value="Thane City">Thane City</option>
<option value="Mira Bhainder">Mira Bhainder</option>
<option value="Navi Mumbai">Navi Mumbai</option>
<option value="Pune City">Pune City</option>
<option value="Pimpri Chinchwad">Pimpri Chinchwad</option>
<option value="Amravati City">Amravati City</option>
<option value="Nagpur City">Nagpur City</option>
<option value="Nashik City">Nashik City</option>
<option value="Chhatrapati Sambhajinagar City">Chhatrapati Sambhajinagar City</option>
<option value="Solapur City">Solapur City</option>

</select>

</div>) :

(<div ref={dropdownRef} className="relative">
<label htmlFor="district">District</label>
<select
id="district"
value={selectedDistrict}
onChange={handleDistrictChange} // Use the updated function
className="w-full p-2 border rounded-md bg-white"
>
<option value="">Select District</option>
{selectedZone &&
zones[selectedZone].map((district) => (
<option key={district} value={district}>
{district}
</option>
))}
</select>

</div>)
)}

                <div className="mb-4">
                  <label className="block text-sm font-medium">Mobile Number</label>
                  <input
                    type="text"
                    name="mobile_number"
                    value={editFormData.mobile_number}
                    onChange={handleEditChange}
                    className="p-2 border border-gray-300 rounded-md w-full"
                    maxLength="10"
                    pattern="[0-9]*"
                    inputMode="numeric"
                    placeholder="Enter 10-digit mobile number"
                  />
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
        {/* <div className="mb-4 grid grid-cols-5 gap-2 px-3">
          {columns.filter((col) => col.filterKey).map((col, index) => (
            <div key={index} className="flex flex-col">
              <label className="text-sm">{col.name}:</label>
              <input type={col.name === 'Created On' ? 'date' : 'text'} placeholder={`Search by ${col.name}`} value={filters[col.filterKey] || ""} onChange={(e) => handleFilter(e, col.filterKey)} className="p-2 border border-gray-300 rounded-md w-[270px]" />
            </div>
          ))}
        </div> */}
        <div className='p-3'>
          <DataTable columns={columns} data={filteredData} pagination highlightOnHover striped responsive customStyles={customStyles} />
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminUserTable;


// import { useEffect, useState, useRef } from "react";
// import axiosInstance from "../../utils/axiosInstance";
// import { Card, CardContent } from "@/components/Ui/Card.jsx";
// import DataTable from "react-data-table-component";
// import AdminRegister from './Admincontroll';
// import { Button } from "@/components/Ui/Button.jsx";
// import { Pencil, Trash } from "lucide-react";
// const AdminUserTable = () => {
//   const [users, setUsers] = useState([]);
//   const [filters, setFilters] = useState({ username: "", role: "", station: "", created_on: "", created_by: "", email: "", emp_id: "", sub_role: "", state: "", zone: "", rank: "", district: "", mobile_number: "" });
//   const [filteredData, setFilteredData] = useState([]);
//   const [isOpen, setIsOpen] = useState(false);
//   const [editOpen, setEditOpen] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const dropdownRef = useRef(null);
//   const [selectedDistrict, setSelectedDistrict] = useState([]);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);


//   const [editFormData, setEditFormData] = useState({
//     username: "",
//     role: "",
//     station: "",
//     email: "",
//     emp_id: "",
//     sub_role: "",
//     state: "",
//     rank: "",
//     zone: "",
//     district: "",
//     mobile_number: "",
//     password: "",
//   });

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const response = await axiosInstance.get("/users");
//       setUsers(response.data);
//       setFilteredData(response.data.reverse());

//     } catch (error) {
//       console.error("Error fetching users", error);
//     }
//   };

//   const handleFilter = (event, key) => {
//     const newFilters = { ...filters, [key]: event.target.value.toLowerCase() };
//     setFilters(newFilters);
//     setFilteredData(
//       users.filter((user) =>
//         Object.keys(newFilters).every((filterKey) =>
//           user[filterKey]?.toString().toLowerCase().includes(newFilters[filterKey])
//         )
//       )
//         .reverse()
//     );
//   };

//   const handleUserRegistered = () => {
//     fetchUsers();
//     setIsOpen(false);
//   };

//   const handleEditClick = (user) => {
//     setSelectedUser(user);
//     setEditFormData({
//       username: user.username,
//       role: user.role,
//       email: user.email,
//       emp_id: user.emp_id,
//       sub_role: user.sub_role,
//       state: user.state,
//       rank: user.rank,
//       zone: user.zone,
//       district: user.district,
//       mobile_number: user.mobile_number,
//       password: "",
//     });
//     setEditOpen(true);
//   };

//   const handleEditChange = (event) => {
//     setEditFormData({ ...editFormData, [event.target.name]: event.target.value });
//   };

//   const handleDeleteClick = (userId) => {
//     if (window.confirm("Are you sure you want to delete this user?")) {
//       axiosInstance.delete(`/users/${userId}`)
//         .then(() => {
//           alert("User deleted successfully");
//           fetchUsers();
//         })
//         .catch((error) => {
//           console.error("Error deleting user", error);
//           alert("Failed to delete user. Please try again.");
//         });
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditUserData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };
//   const handleUpdateUser = async () => {
//     try {
//       const updatedData = { ...editFormData };
//       if (!updatedData.password) {
//         delete updatedData.password;
//       }

//       console.log("Updating user:", selectedUser.id, updatedData);
//       const response = await axiosInstance.put(`/users/${selectedUser.id}`, updatedData);
//       console.log("Update successful", response.data);


//       alert("User updated Successfully")
//       fetchUsers();
//       setEditOpen(false);
//     } catch (error) {
//       console.error("Error updating user", error);
//     }
//   };
//   //added_25
//   const customStyles = {
//     headCells: {
//       style: {
//         fontWeight: "600", // Equivalent to font-semibold
//         fontSize: "14px",  // Equivalent to text-[14px]
//       },
//     },
//   }; //added_25

//   // --------------------------------------------------------------
//    // Handle district selection
//    const handleDistrictChange = (e) => {
//     const { value, checked } = e.target;

//     setSelectedDistrict((prev) => {
//       const updatedSelection = checked
//         ? [...prev, value] // Add selected district
//         : prev.filter((district) => district !== value); // Remove if unchecked

//       setEditFormData((prevFormData) => ({
//         ...prevFormData,
//         district: updatedSelection, // Store in formData
//       }));

//       return updatedSelection; // Update state
//     });
//   };

//   // Handle zone selection
//   const handleZoneChange = (e) => {
//     const zone = e.target.value;
//     setSelectedZone(zone);
//     setEditFormData((prev) => ({ ...prev, zone, district: [] })); // Reset district when zone changes
//     setSelectedDistrict([]); // Reset selected district
//   };
//   // ----------------------------------------

//   const columns = [
//     { name: "Username", selector: (row) => row.username, sortable: true, filterKey: "username" },
//     {
//       name: "Role",
//       selector: (row) => {
//         const roles = {
//           "chief secretary": "Chief Secretary",
//           "Correction": "Correctional Services",
//           "Forensic": "Forensic",
//           "police": "Police",
//           "Prosecutor": "Prosecution",
//           "admin": "Admin",
//           "Court": "Courts"
//         };
//         return roles[row.role] || row.role;
//       },
//       sortable: true,
//       filterKey: "role"
//     },
//     // { name: "Location", selector: (row) => row.station, sortable: true, filterKey: "station" },
//     { name: "Email", selector: (row) => row.email, sortable: true, filterKey: "email" },
//     { name: "Created On", selector: (row) => row.created_on, sortable: true, filterKey: "created_on" },
//     { name: "Created By", selector: (row) => row.created_by, sortable: true, filterKey: "created_by" },
//     {
//       name: "Edit",
//       cell: (row) => (
//         <button
//           onClick={() => handleEditClick(row)}
//           className="bg-[#2d3748] text-white px-3 py-1 rounded-md flex items-center justify-center"
//         >
//           <Pencil size={18} />
//         </button>
//       ),

//       button: true,
//     },
//     {
//       name: "Delete",
//       cell: (row) => (
//         <button
//           onClick={() => handleDeleteClick(row.id)}
//           className="!bg-red-500 hover:!bg-red-600 text-white px-3 py-1 rounded-md flex items-center justify-center"
//         >
//           <Trash size={18} />
//         </button>
//       ),

//       button: true,
//     }

//   ];

//   return (
//     <Card className="max-w-4xl mx-auto p-6 rounded-lg shadow-md">
//       <CardContent className="border-none">
//         <div className="flex justify-between items-center mb-4 p-3">
//           <h2 className="text-xl font-bold">Admin Users</h2>
//           <button className="bg-[#2d3748] text-white px-4 py-2 rounded" onClick={() => setIsOpen(true)}>Open Registration</button>
//         </div>

//         {/* Registration Modal */}
//         {isOpen && (
//           <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-3">
//             <div className="bg-white p-6 rounded-lg shadow-lg w-[600px]">
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-lg font-semibold">Register Admin</h3>
//                 <button className="text-gray-500 text-lg font-bold" onClick={() => setIsOpen(false)}>✖</button>
//               </div>
//               <AdminRegister onRegister={handleUserRegistered} onClose={() => setIsOpen(false)} />
//             </div>
//           </div>
//         )}

//         {/* Edit Modal */}
//         {editOpen && selectedUser && (
//           <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-3">
//             <div className="bg-white p-6 rounded-lg shadow-lg w-[500px] max-h-[80vh] overflow-y-auto">
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-lg font-semibold">Edit User</h3>
//                 <button className="text-gray-500 text-lg font-bold" onClick={() => setEditOpen(false)}>✖</button>
//               </div>
//               <form onSubmit={(e) => { e.preventDefault(); handleUpdateUser(); }}>
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium">Email</label>
//                   <input type="text" name="email" value={editFormData.email} onChange={handleEditChange} className="p-2 border border-gray-300 rounded-md w-full" />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium">Officer Id</label>
//                   <input type="text" name="emp_id" value={editFormData.emp_id} onChange={handleEditChange} className="p-2 border border-gray-300 rounded-md w-full" />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium">Username</label>
//                   <input type="text" name="username" value={editFormData.username} onChange={handleEditChange} className="p-2 border border-gray-300 rounded-md w-full" />
//                 </div>

//                 {editFormData.role === "police" ? (
//                   <div className="mb-4">
//                     <label className="block text-sm font-medium">Sub Role</label>
//                     <select
//                       name="sub_role"
//                       value={editFormData.sub_role}
//                       onChange={handleEditChange}
//                       className="w-full p-2 border rounded-md bg-white"
//                     >
//                       <option value="">Select SubRole</option>
//                       <option value="IG/DIG">IG/DIG</option>
//                       <option value="SP">SP</option>
//                       <option value="ADDL_SP/DSP">ADDL-SP/DSP</option>
//                       <option value="INSPR">INSPR</option>
//                       <option value="SI">SI</option>
//                       <option value="ASI">ASI</option>
//                       <option value="HC">HC</option>
//                     </select>
//                   </div>
//                 ) : (
//                   <div className="mb-4">
//                     <label className="block text-sm font-medium">Sub Role</label>
//                     <input
//                       type="text"
//                       name="sub_role"
//                       value={editFormData.sub_role}
//                       onChange={handleEditChange}
//                       className="w-full p-2 border rounded-md bg-white"
//                       placeholder="Enter Sub Role"
//                     />
//                   </div>
//                 )}
//                 {/* <div className="mb-4">
//                   <label className="block text-sm font-medium">Sub Role</label>
//                   <input type="text" name="sub_role" value={editFormData.sub_role} onChange={handleEditChange} className="p-2 border border-gray-300 rounded-md w-full" />
//                 </div> */}
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium">Rank</label>
//                   <input type="text" name="rank" value={editFormData.rank} onChange={handleEditChange} className="p-2 border border-gray-300 rounded-md w-full" />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium">State</label>
//                   <input type="text" name="state" value={editFormData.state} onChange={handleEditChange} className="p-2 border border-gray-300 rounded-md w-full" />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium">Zone</label>
//                   <input type="text" name="zone" value={editFormData.zone} onChange={handleEditChange} className="p-2 border border-gray-300 rounded-md w-full" />
//                 </div>
//                 {editFormData.sub_role !== "IG/DIG" && (
//                   <div className="mb-4">
//                     <label className="block text-sm font-medium">District</label>
//                     <div ref={dropdownRef} className="relative">
//                       <button
//                         type="button"
//                         onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//                         className="w-full p-2 border rounded-md bg-white text-left"
//                       >
//                         {selectedDistrict.length > 0 ? selectedDistrict.join(", ") : "Select District"}
//                       </button>
//                       {isDropdownOpen && selectedZone && (
//                         <div className="absolute top-full left-0 w-full bg-white border rounded-md shadow-lg p-2 z-50 max-h-40 overflow-auto">
//                           {zones[selectedZone].map((district) => (
//                             <label key={district} className="flex items-center space-x-2 p-1">
//                               <input
//                                 type="checkbox"
//                                 value={district}
//                                 checked={selectedDistrict.includes(district)}
//                                 onChange={handleDistrictChange}
//                                 className="form-checkbox text-blue-500"
//                               />
//                               <span className="text-gray-800">{district}</span>
//                             </label>
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 )}
//                 {/* <div className="mb-4">
//                   <label className="block text-sm font-medium">District</label>
//                   <input type="text" name="district" value={editFormData.district} onChange={handleEditChange} className="p-2 border border-gray-300 rounded-md w-full" />
//                 </div> */}
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium">Mobile Number</label>
//                   <input type="text" name="mobile_number" value={editFormData.mobile_number} onChange={handleEditChange} className="p-2 border border-gray-300 rounded-md w-full" />
//                 </div>


//                 <div className="mb-4">
//                   <label className="block text-sm font-medium">New Password (optional)</label>
//                   <input type="password" name="password" value={editFormData.password} onChange={handleEditChange} className="p-2 border border-gray-300 rounded-md w-full" placeholder="Leave blank to keep current password" />
//                 </div>
//                 <div className="flex justify-end">
//                   <button type="submit" className="bg-[#2d3748] text-white px-4 py-2 rounded">Update</button>
//                 </div>
//               </form>

//             </div>
//           </div>
//         )}

//         {/* Filters */}
//         <div className="mb-4 grid grid-cols-5 gap-2 px-3 " >
//           {columns.filter((col) => col.filterKey).map((col, index) => (
//             <div key={index} className="flex flex-col ">
//               <label className="text-sm ">{col.name}:</label>
//               <input type={col.name === 'Created On' ? 'date' : 'text'} placeholder={`Search by ${col.name}`} value={filters[col.filterKey] || ""} onChange={(e) => handleFilter(e, col.filterKey)} className="p-2 border border-gray-300 rounded-md w-[270px]" />
//             </div>
//           ))}
//         </div>
//         <div className='p-3'>
//           {/* added_25 */}
//           <DataTable columns={columns} data={filteredData} pagination highlightOnHover striped responsive customStyles={customStyles} />
//         </div>
//       </CardContent>
//     </Card>
//   );
// };
// export default AdminUserTable;
