import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
// import { Card, CardContent } from "@/components/ui/card";
import { Card, CardContent } from "@/components/Ui/Card";

import { Button } from "@/components/Ui/Button";
import { Label } from "@/components/Ui/Label";

const AdminRegister = ({ onRegister, onClose }) => {
  const [formData, setFormData] = useState({
    user_name: "",
    password: "",
    role: "",
    // rank: "",
    station: "",
    created_on: new Date().toISOString().split("T")[0],
    created_by: "admin",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/create_user", formData);
      if (onRegister) onRegister(response.data);
      if (onClose) onClose(); // Close modal after successful registration
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <Card className="max-w-md  mx-auto shadow-lg rounded-2xl p-6 ">
      <CardContent>
        <h2 className="text-xl font-semibold text-center mb-4">Register Admin</h2>
        <div className="max-h-[700px] overflow-y-auto p-2">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="max-h-96 overflow-y-auto p-2">
              <Label htmlFor="email">Email</Label>
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <Label htmlFor="email">Employee ID</Label>
              <input
                type="text"
                id="emp_id"
                name="emp_id"
                value={formData.emp_id}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <Label htmlFor="user_name">Username</Label>
              <input
                type="text"
                id="user_name"
                name="user_name"
                value={formData.user_name}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <Label htmlFor="role">Role</Label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md bg-white"
              >
                <option value="">Select Role</option>
                <option value="chief secretary">Chief Secretary</option>
                <option value="police">Police</option>
                <option value="Prosecutor">Prosecutor</option>
                <option value="Correction">Correctional Services</option>
                <option value="Court">Courts</option>
                <option value="Forensic">Forensic</option>
              </select>
            </div>
            <div>
              <Label htmlFor="email">Rank</Label>
              <input
                type="text"
                id="rank"
                name="rank"
                value={formData.rank}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <Label htmlFor="email">State</Label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <Label htmlFor="email">Zone</Label>
              <input
                type="text"
                id="zone"
                name="zone"
                value={formData.zone}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <Label htmlFor="email">District</Label>
              <input
                type="text"
                id="district"
                name="district"
                value={formData.district}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <Label htmlFor="email">Mobile Number</Label>
              <input
                type="text"
                id="mobile_number"
                name="mobile_number"
                value={formData.mobile_number}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <Label htmlFor="email">Alternate Mobile Number</Label>
              <input
                type="text"
                id="alter_mobile_number"
                name="alter_mobile_number"
                value={formData.alter_mobile_number}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <Label htmlFor="email">Telephone Number</Label>
              <input
                type="text"
                id="tele_phone_number"
                name="tele_phone_number"
                value={formData.tele_phone_number}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <Label htmlFor="email">Address</Label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="flex justify-between gap-4">
              <button type="submit" className="w-full" style={{
                backgroundColor: "#2d3748",
                color: "white",
                padding: "8px 16px",
                borderRadius: "6px",
                border: "none",
              }}>Register</button>
              {onClose && (
                <button type="button" variant="outline" onClick={onClose} className="w-full" style={{
                  backgroundColor: "#dc3545",
                  color: "white",
                  padding: "8px 16px",
                  borderRadius: "6px",
                  border: "none",
                }}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminRegister;
