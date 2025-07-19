import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavPanel from './NavPanel';


const AdminSettings = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirmation do not match.");
      return;
    }

    try {
      // Fetch admin's current details
      const response = await axios.get(`http://localhost:7072/myAdmin/1`);
      const adminData = response.data;

      if (adminData.password !== currentPassword) {
        setError("Current password is incorrect.");
        return;
      }

      // Update the admin's password
      await axios.patch(`http://localhost:7072/myAdmin/1`, {
        password: newPassword,
      });

      setSuccess("Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      // Optionally, navigate to another page
      setTimeout(() => {
        navigate("/admindashboard");
      }, 2000);
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
        <NavPanel>

    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-4">Change Admin Password</h2>
      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
      {success && <div className="text-green-500 text-sm mb-4">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">Current Password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter current password"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter new password"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">Confirm New Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Confirm new password"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Update Password
        </button>
      </form>
    </div>
    </NavPanel>
  );
};

export default AdminSettings;
