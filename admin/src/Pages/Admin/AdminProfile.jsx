import React, { useState } from "react";
import Sidebar from "../../components/Dashboard/Sidebar/Sidebar";

const AdminProfile = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordChanged, setPasswordChanged] = useState(false);

  const handleChangePassword = () => {
    // Add your logic to handle password change here
    if (newPassword === confirmNewPassword) {
      // Passwords match, proceed with change
      setPasswordChanged(true);
    } else {
      // Passwords don't match, display error or handle accordingly
      alert("New passwords don't match!");
    }
  };

  return (
    <div className="provider">
      <Sidebar />
      <div className="w-[85%] bg-slate-50">
        <div className="w-[70%] text-white bg-[#1A3570] mx-10 my-12 p-5">
          <h1 className="text-3xl font-bold mb-4">Service Hub</h1>
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4 flex gap-10">
              <span>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Admin Username
                </label>
                <p className="text-gray-700 text-lg">admin@gmail.com</p>
              </span>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Current Password
              </label>
              <input
                type="password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                New Password
              </label>
              <input
                type="password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Confirm new password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-[#1A3570] hover:bg-[#1A3570] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleChangePassword}
              >
                Change Password
              </button>
              {passwordChanged && (
                <p className="text-green-500 text-sm">
                  Password changed successfully!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
