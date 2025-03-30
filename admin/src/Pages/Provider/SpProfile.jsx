import React, { useState } from "react";
import Sidebar from "../../components/Dashboard/Sidebar/Sidebar";
import { Input } from "@material-tailwind/react";
import { useEffect } from "react";
import axios from "axios";
import { postData } from "../../services/Apis";
import { useNavigate } from "react-router-dom";

const SpProfile = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [details, setDetails] = useState([]);
  const [documents, setDocuments] = useState({ title: "", file: null });
  const navigate = useNavigate();
  const spid = localStorage.getItem("userID");

  useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = async () => {
    try {
      const rep = await axios.get(`http://localhost:1000/sp/getSpById/${spid}`);
      console.log("d", rep.data.data);
      setDetails(rep.data.data);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const gender = details.gender === 1 ? "male" : "female";

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setDocuments({ file });
  };
  const addTodo = async () => {
    try {
      const formDataWithDocument = new FormData();
      for (let key in documents) {
        formDataWithDocument.append(key, documents[key]);
      }
      formDataWithDocument.append("photo", documents.file); // Corrected here
      formDataWithDocument.append("documentTitle", documents.title);

      const resp = await postData(
        formDataWithDocument,
        "/doc/addDoc",
        "multipart/form-data"
      );

      if (resp.status === 200 || resp.status === 201) {
        alert("Document uploaded successfully!");
        const docid = resp.data.data._id;

        const res = await axios.post("http://localhost:1000/spDoc/addSpDoc", {
          doc_id: docid,
          sp_id: spid,
        });

        if (res.status === 200 || res.status === 201) {
          alert("Success");
          setDocuments({ title: "", file: null });
        } else {
          console.log("Error in the uploading of id in the spdoc table");
        }
      } else {
        console.error(
          "Error uploading document. Response status:",
          resp.status
        );
        alert("Error uploading document");
      }
    } catch (error) {
      console.error("Error uploading document:", error);
      alert("Error uploading document");
    }
  };
  const handleChangePassword = async () => {
    try {
      if (newPassword === confirmNewPassword) {
        const response = await axios.post(
          "http://localhost:1000/sp/changePassword",
          {
            sp_id: spid,
            currentPassword,
            newPassword,
          }
        );
        if (response.status === 200) {
          setCurrentPassword("");
          setNewPassword("");
          setConfirmNewPassword("");
          setPasswordChanged(true);
        } else {
          alert("Failed to change password");
        }
      } else {
        alert("New passwords don't match!");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      alert("Error changing password");
    }
  };

  return (
    <div className="provider">
      <Sidebar />
      <div className="w-[85%] bg-slate-50 ">
        <div className="w-[100%] h-50 bg-gray-200 py-5 px-10 flex justify-between">
          <div className="w-3/4 mr-10">
            <h1 className="text-4xl mb-6">My Profile</h1>
            <div className="customer-details shadow-lg bg-white p-6 rounded-lg flex justify-between">
              <div className="">
                <div className="mb-4 flex gap-10">
                  <span>
                    <h3 className="font-bold ">First Name</h3>
                    <p className="text-gray-600">{details.firstName}</p>
                  </span>
                  <span>
                    <h3 className="font-bold ">Middle Name</h3>
                    <p className="text-gray-600">{details.middleName}</p>
                  </span>
                  <span>
                    <h3 className="font-bold ">Last Name</h3>
                    <p className="text-gray-600">{details.lastName}</p>
                  </span>
                </div>
                <div className="mb-4">
                  <h3 className="font-bold ">Gender</h3>
                  <p className="text-gray-600">{gender}</p>
                </div>
                <div className="mb-4">
                  <h3 className="font-bold ">Address</h3>
                  <p className="text-gray-600">{details.address}</p>
                </div>
                <div className="mb-4">
                  <h3 className="font-bold ">Email</h3>
                  <p className="text-gray-600">{details.email}</p>
                </div>
                <div className="mb-4">
                  <h3 className="font-bold ">Phone</h3>
                  <p className="text-gray-600">{details.phoneNo}</p>
                </div>
              </div>
              <div>
                <img
                  src={details.photo}
                  alt="Profile"
                  className="w-[24rem] h-[20rem] rounded-md"
                />
              </div>
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
              {passwordChanged && (
                <p className="text-green-300">Password changed successfully!</p>
              )}
            </div>
          </div>
        </div>
        <div>
          <div className=" px-20 pb-10 pl-10 bg-gray-200">
            <div className=" bg-white shadow-md rounded-lg w-[55rem] px-10 py-5">
              <div className="mb-6 pt-4">
                <label className="mb-5 block text-xl font-semibold text-[#07074D]">
                  Upload File
                </label>
                <div className=" flex flex-col gap-y-4">
                  <Input
                    type="text"
                    name="title"
                    label="Document Title"
                    value={documents.title}
                    onChange={(e) => setDocuments({ title: e.target.value })}
                  />
                  <Input
                    type="file"
                    name="Document"
                    label="Document Upload"
                    onChange={(e) => handleFileChange(e)}
                  />
                </div>
              </div>

              <div>
                <button
                  className="hover:shadow-form w-full rounded-md bg-yellow-600 py-3 px-8 text-center text-base font-semibold  outline-none"
                  onClick={addTodo}
                >
                  Send File
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpProfile;
