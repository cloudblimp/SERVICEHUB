import React, { useState, useEffect } from "react";
import Navbar from "../../components/Customer/Navbar/Navbar";
import { Input, Spinner } from "@material-tailwind/react";
import axios from "axios";

const Profile = () => {
  // Change password state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [data, setdata] = useState(null);
  const [loading, setLoading] = useState(true);
  const handleChangePassword = () => {
    if (newPassword === confirmNewPassword) {
      setPasswordChanged(true);
    } else {
      alert("New passwords don't match!");
    }
  };
  useEffect(() => {
    const userID = localStorage.getItem("userID");
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/user/getUserById/" + userID
        );
        setdata(response.data.data);
        setLoading(false);
        console.log("Data Fetch:", response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  console.log("Data Fetch:", data, loading);
  // let gender;
  // if (data.gender === 2) {
  //   gender = "female";
  // } else if (data.gender === 1) {
  //   gender = "male";
  // } else {
  //   gender = "others";
  // }
  return (
    <div className="overflow-h-auto w-screen">
      <Navbar />
      <div className="w-screen h-screen bg-gray-200 py-5 px-10 flex justify-between">
        <div className="w-3/4 mr-10">
          <h1 className="text-4xl mb-6">My Profile</h1>
          <div className="customer-details shadow-lg bg-white p-6 rounded-lg flex justify-between">
            {loading ? (
              <div class="flex justify-center items-center space-x-1 text-sm text-gray-700">
                <Spinner h-12 w-12 />

                <div>Loading ...</div>
              </div>
            ) : (
              data && (
                <div className="">
                  <div className="mb-4 flex gap-10">
                    <span>
                      <h3 className="font-bold ">First Name</h3>
                      <p className="text-gray-600">{data.firstName}</p>
                    </span>
                    <span>
                      {" "}
                      <h3 className="font-bold ">Middle Name</h3>
                      <p className="text-gray-600">{data.middleName}</p>
                    </span>
                    <span>
                      {" "}
                      <h3 className="font-bold ">Last Name</h3>
                      <p className="text-gray-600">{data.lastName}</p>
                    </span>
                  </div>

                  <div className="mb-4">
                    <h3 className="font-bold ">Gender</h3>
                    <p className="text-gray-600">{data.gender}</p>
                  </div>
                  <div className="mb-4">
                    <h3 className="font-bold ">Address</h3>
                    <p className="text-gray-600">{data.address}</p>
                  </div>
                  <div className="mb-4">
                    <h3 className="font-bold ">Email</h3>
                    <p className="text-gray-600">{data.email}</p>
                  </div>
                  <div className="mb-4">
                    <h3 className="font-bold ">Phone</h3>
                    <p className="text-gray-600">{data.phoneNo}</p>
                  </div>
                </div>
              )
            )}
            {/* <div>
              <img
                src="https://cdn.psychologytoday.com/sites/default/files/styles/article-inline-half/public/field_blog_entry_images/shutterstock_105623048_1.jpg?itok=IcdHbI7U"
                alt="Profile"
                className="w-[24rem] h-[20rem] rounded-md"
              />
            </div> */}
          </div>
        </div>
        <div className="w-1/4">
          <h1 className="text-4xl mb-6">Change Password</h1>
          <div className="changepassword shadow-lg bg-white p-6 rounded-lg flex flex-col gap-7">
            <Input
              className="input-field mb-4"
              type="password"
              label="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <Input
              className="input-field mb-4"
              type="password"
              label="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Input
              className="input-field mb-4"
              type="password"
              label="Confirm New Password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
            <button
              className="bg-yellow-400 py-3 px-3 rounded-md"
              onClick={handleChangePassword}
            >
              Change Password
            </button>
            {passwordChanged && <p>Password changed successfully!</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
