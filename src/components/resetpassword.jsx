import React, { useState } from "react";
import { X } from "lucide-react";

const ResetPasswordModal = ({ onClose, onUpdate, email }) => {
    const [old_password, setOldPassword] = useState("");
    const [new_password, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleUpdate = () => {
        if (!old_password || !new_password || !confirmPassword) {
            alert("All fields are required!");
            return;
        }

        if (new_password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        // Sending only required data
        onUpdate({ email, old_password, new_password });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold mb-4">Reset Password</h2>
                    <button
                        className="ml-8 bg-transparent text-black rounded p-2"
                        onClick={onClose}
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Email Field (Read-Only) */}
                <input
                    type="email"
                    value={email}
                    disabled
                    className="w-full px-4 py-2 mb-4 border rounded bg-gray-200"
                />

                {/* Old Password */}
                <input
                    type="password"
                    placeholder="Old Password"
                    className="w-full px-4 py-2 mb-4 border rounded"
                    value={old_password}
                    onChange={(e) => setOldPassword(e.target.value)}
                />

                {/* New Password */}
                <input
                    type="password"
                    placeholder="New Password"
                    className="w-full px-4 py-2 mb-4 border rounded"
                    value={new_password}
                    onChange={(e) => setNewPassword(e.target.value)}
                />

                {/* Confirm Password */}
                <input
                    type="password"
                    placeholder="Confirm New Password"
                    className="w-full px-4 py-2 mb-4 border rounded"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                {/* Update Button */}
                <button
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded"
                    onClick={handleUpdate}
                >
                    Update Password
                </button>
            </div>
        </div>
    );
};

export default ResetPasswordModal;
