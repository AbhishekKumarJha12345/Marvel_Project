import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

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
    <Card className="max-w-md mx-auto shadow-lg rounded-2xl p-6">
      <CardContent>
        <h2 className="text-xl font-semibold text-center mb-4">Register Admin</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
              <option value="Correction">Correction Services</option>
              <option value="Court">Court</option>
              <option value="Forensic">Forensic</option>
            </select>
          </div>
          {/* <div>
            <Label htmlFor="rank">Rank</Label>
            <input
              type="text"
              id="rank"
              name="rank"
              value={formData.rank}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
            />
          </div> */}
          <div>
            <Label htmlFor="station">Station</Label>
            <input
              type="text"
              id="station"
              name="station"
              value={formData.station}
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
      </CardContent>
    </Card>
  );
};

export default AdminRegister;
