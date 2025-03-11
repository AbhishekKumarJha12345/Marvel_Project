import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { Card, CardContent } from "@/components/Ui/Card";
import { Button } from "@/components/Ui/Button";
import { Label } from "@/components/Ui/Label";

const Admincontroll = ({ onRegister, onClose }) => {
  const [formData, setFormData] = useState({
    email: "",
    emp_id: "",
    user_name: "",
    role: "",
    sub_role:"",
    rank: "",
    state: "",
    zone: "",
    district: "",
    mobile_number: "",
    alter_mobile_number: "",
    tele_phone_number: "",
    address: "",
    password: "",
    station: "",
    created_on: new Date().toISOString().split("T")[0],
    created_by: "admin",
  });

  const [selectedZone, setSelectedZone] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const zones = {
    Amravati: ["Akola", "Amravati", "Buldana", "Washim", "Yavatmal"],
    Aurangabad: ["Aurangabad", "Beed", "Hingoli", "Jalna", "Latur", "Nanded", "Osmanabad", "Parbhani"],
    Konkan: ["Mumbai", "Mumbai Suburban", "Palghar", "Raigad", "Ratnagiri", "Sindhudurg", "Thane"],
    Nagpur: ["Bhandara", "Chandrapur", "Gadchiroli", "Gondia", "Nagpur", "Wardha"],
    Nashik: ["Ahmednagar", "Dhule", "Jalgaon", "Nandurbar", "Nashik"],
    Pune: ["Kolhapur", "Pune", "Sangli", "Satara", "Solapur"],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // ✅ Only allow numbers for mobile fields
    if (["mobile_number", "alter_mobile_number"].includes(name)) {
      if (!/^\d*$/.test(value)) return; // Prevent non-numeric input
      if (value.length > 10) return; // Restrict input length to 10
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleZoneChange = (e) => {
    const zone = e.target.value;
    setSelectedZone(zone);
    setFormData({ ...formData, zone, district: "" }); // Reset district when zone changes
    setSelectedDistrict(""); // Reset selected district
  };

  const handleDistrictChange = (e) => {
    const district = e.target.value;
    setSelectedDistrict(district);
    setFormData({ ...formData, district });
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
        <div className="max-h-[700px] overflow-y-auto p-2">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div>
              <Label htmlFor="emp_id">Employee ID</Label>
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
            {formData.role === "police" && (
                <div>
                  <Label htmlFor="sub_role">Sub Role</Label>
                  <select
                    id="sub_role"
                    name="sub_role"
                    value={formData.sub_role}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded-md bg-white"
                  >
                    <option value="">Select SubRole</option>
                    <option value="IG/DIG">IG/DIG</option>
                    <option value="SP">SP</option>
                    <option value="ADDL_SP/DSP">ADDL-SP/DSP</option>
                    <option value="INSPR">INSPR</option>
                    <option value="SI">SI</option>
                    <option value="ASI">ASI</option>
                    <option value="HC">HC</option>
                  </select>
                </div>
              )}
            <div>
            {formData.role !== "police" && (
            <div>
        <Label htmlFor="sub_role">Sub Role</Label>
        <input
          type="text"
          id="sub_role"
          name="sub_role"
          value={formData.sub_role}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-md bg-white"
          placeholder="Enter Sub Role"
        />
      </div>
        )}
              <Label htmlFor="rank">Rank</Label>
              <select
                id="rank"
                name="rank"
                value={formData.rank}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md"
              >
                <option value="">Select Rank</option>
                <option value="S">S</option>
                <option value="E">E</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>
            </div>

            <div>
              <Label htmlFor="state">State</Label>
              <select
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md"
              >
                <option value="">Select State</option>
                <option value="Maharashtra">Maharashtra</option>
              </select>
            </div>

         
            <div>
                {/* Zone Dropdown */}
                <div>
                  <Label htmlFor="zone">Zone</Label>
                  <select
                    id="zone"
                    name="zone"
                    value={selectedZone}
                    onChange={handleZoneChange}
                    className="w-full p-2 border rounded-md"
                    required
                  >
                    <option value="">Select Zone</option>
                    {Object.keys(zones).map((zone) => (
                      <option key={zone} value={zone}>
                        {zone}
                      </option>
                    ))}
                  </select>
                </div>

                {/* District Dropdown */}
                <div>
                  <Label htmlFor="district">District</Label>
                  <select
                    id="district"
                    name="district"
                    value={selectedDistrict}
                    onChange={handleDistrictChange}
                    className="w-full p-2 border rounded-md"
                    required
                    disabled={!selectedZone} // Disable if no zone is selected
                  >
                    <option value="">Select District</option>
                    {selectedZone &&
                      zones[selectedZone].map((district) => (
                        <option key={district} value={district}>
                          {district}
                        </option>
                      ))}
                  </select>
                  {/* Validation Message */}
                  {!selectedZone && (
                    <p className="text-red-500 text-sm mt-1">Please select a zone first.</p>
                  )}
                </div>
              </div>

            <div>
              <Label htmlFor="mobile_number">Mobile Number</Label>
              <input
                type="text"
                id="mobile_number"
                name="mobile_number"
                value={formData.mobile_number}
                onChange={handleChange}
                required
                className={`w-full p-2 border rounded-md ${
                  formData.mobile_number.length === 10 ? "border-green-500" : "border-red-500"
                }`}
              />
              {formData.mobile_number.length > 0 && formData.mobile_number.length !== 10 && (
                <p className="text-red-500 text-sm mt-1">Mobile number must be exactly 10 digits</p>
              )}
            </div>

            <div>
              <Label htmlFor="alter_mobile_number">Alternate Mobile Number</Label>
              <input
                type="text"
                id="alter_mobile_number"
                name="alter_mobile_number"
                value={formData.alter_mobile_number}
                onChange={handleChange}
                required
                className={`w-full p-2 border rounded-md ${
                  formData.alter_mobile_number.length === 10 ? "border-green-500" : "border-red-500"
                }`}
              />
              {formData.alter_mobile_number.length > 0 && formData.alter_mobile_number.length !== 10 && (
                <p className="text-red-500 text-sm mt-1">Mobile number must be exactly 10 digits</p>
              )}
            </div>

            <div>
              <Label htmlFor="tele_phone_number">Telephone Number</Label>
              <input
                type="text"
                id="tele_phone_number"
                name="tele_phone_number"
                value={formData.tele_phone_number}
                onChange={handleChange}
                required
                className={`w-full p-2 border rounded-md ${
                  formData.tele_phone_number.length >= 7 && formData.tele_phone_number.length <= 12
                    ? "border-green-500"
                    : "border-red-500"
                }`}
              />
              {formData.tele_phone_number.length > 0 &&
                (formData.tele_phone_number.length < 7 || formData.tele_phone_number.length > 12) && (
                  <p className="text-red-500 text-sm mt-1">Telephone number must be between 7 and 12 digits</p>
                )}
            </div>

            <div>
              <Label htmlFor="address">Address</Label>
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
              <button type="submit" className="w-full bg-gray-800 text-white p-2 rounded-md">
                Register
              </button>
              {onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full bg-red-600 text-white p-2 rounded-md"
                >
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

export default Admincontroll;
