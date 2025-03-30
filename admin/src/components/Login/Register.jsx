import React, { useState, useEffect } from "react";
import Navbar from "../../components/Customer/Navbar/Navbar";
import bg from "../../images/Cleaning/Pocha.jpg";
import { addFunction, docuplaod, postData } from "../../services/Apis";
import { useNavigate } from "react-router-dom";
import { Select, Option, Input } from "@material-tailwind/react";
import axios from "axios";
const Register = () => {
  const navigate = useNavigate();
  const [selectedGender, setSelectedGender] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    gender: null,
    address: "",
    email: "",
    phoneNo: "",
    password: "",
    confirmPassword: "",
    doj: null,
    accountType: true,
  });
  const [documents, setDocuments] = useState({ title: "", file: null });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
    password: "",
    confirmPassword: "",
    address: "",
  });

  const [currentStep, setCurrentStep] = useState(1);

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };
  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    setFormData({
      ...formData,
      photo: file,
    });
  };
  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    if (name === "type") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        accountType: value === "user",
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }

    // Clear the specific error when the user starts typing
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));

    // Additional validation for specific fields
    if (name === "firstName") {
      // Validate if firstName contains digits when the type is text
      if (type === "text" && /\d/.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          firstName: "First Name should not contain digits",
        }));
      } else if (type === "tel" && value.trim() !== "") {
        // Validate if firstName is not empty when the type is tel
        setErrors((prevErrors) => ({
          ...prevErrors,
          firstName: "First Name should be empty for phone number",
        }));
      }
    } else if (name === "phoneNo" && type === "text") {
      // Validate if phoneNo contains non-digits
      if (/\D/.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          phoneNo: "Phone No should only contain digits",
        }));
      } else if (value.trim() !== "" && formData.firstName.trim() === "") {
        // Validate if firstName is not empty when phoneNo is not empty
        setErrors((prevErrors) => ({
          ...prevErrors,
          firstName: "First Name is required for phone number",
        }));
      }
    } else if (name === "confirmPassword") {
      // Validate if confirmPassword matches password
      if (value !== formData.password) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          confirmPassword: "Passwords do not match",
        }));
      }
    } else if (name === "address") {
    }
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return validateNames();
      case 2:
        return validateEmailPhonePassword();
      default:
        return true;
    }
  };

  const validateNames = () => {
    const { firstName, lastName } = formData;
    let isValid = true;
    const newErrors = {};

    if (!firstName.trim()) {
      newErrors.firstName = "First Name is required";
      isValid = false;
    }

    if (!lastName.trim()) {
      newErrors.lastName = "Last Name is required";
      isValid = false;
    }

    setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));
    return isValid;
  };

  const validateEmailPhonePassword = () => {
    const { email, phoneNo, password } = formData;
    let isValid = true;
    const newErrors = {};

    // Validate Email
    const cleanedEmail = email.replace(/\s/g, "");
    const isPhoneNumber = !isNaN(cleanedEmail) && cleanedEmail.length === 10;

    if (
      !(
        (cleanedEmail.includes("@") && cleanedEmail.includes(".com")) ||
        isPhoneNumber
      )
    ) {
      newErrors.email =
        "Please enter a valid email address or a 10-digit phone number";
      isValid = false;
    }

    // Validate Password
    if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
      isValid = false;
    }

    // Validate Confirm Password
    if (password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    // Validate Address
    if (formData.address.trim() === "") {
      newErrors.address = "Address is required";
      isValid = false;
    }

    setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));
    return isValid;
  };
  const handleAddressChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      address: value,
    }));
    if (value.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        address: "Address is required",
      }));
    } else {
      // Clear address error if address is not empty
      setErrors((prevErrors) => ({
        ...prevErrors,
        address: "",
      }));
    }
  };

  const handleGender = (value) => {
    console.log("gender", value);
    setSelectedGender(value);
    if (value === "male") {
      setFormData({ ...formData, gender: 1 });
    } else if (value === "female") {
      setFormData({ ...formData, gender: 2 });
    } else {
      setFormData({ ...formData, gender: 0 });
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setDocuments({ title: file.name, file });
  };
  const addTodo = async (e) => {
    e.preventDefault();

    try {
      if (formData.accountType) {
        const response = await addFunction(formData, "/user/addUser"); //DATA BEING SEND TO BACKEND
        console.log("User created successfully:", response);
        alert("success");
        navigate("/login");
      } else {
        const today = new Date().toISOString().split("T")[0];
        formData.doj = today;

        const response = await postData(
          formData,
          "/sp/addSp",
          "multipart/form-data"
        );

        if (response.status === 200 || response.status === 201) {
          console.log("Service provider added successfully:", response.data);
          alert("Service provider added successfully!");

          try {
            const formDataWithDocument = new FormData();
            for (let key in formData) {
              formDataWithDocument.append(key, formData[key]);
            }
            formDataWithDocument.append("document", document.file);
            formDataWithDocument.append("documentTitle", document.title);

            const resp = await postData(
              formDataWithDocument,
              "/doc/addDoc",
              "multipart/form-data"
            );

            if (resp.status === 200 || resp.status === 201) {
              alert("Document uploaded successfully!");
              const docid = resp.data.data._id;
              const spid = response.data.data._id;
              const res = await axios.post(
                "http://localhost:1000/spDoc/addSpDoc",
                { doc_id: docid, sp_id: spid }
              );
              if (res.status === 200 || res.status === 201) {
                alert("Success");
                navigate("/login");
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
        } else {
          console.error(
            "Error adding service provider. Response status:",
            response.status
          );
          alert("Error adding service provider");
        }
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <span className="flex gap-2 mb-4">
              <div>
                <Input
                  type="text"
                  name="firstName"
                  label="First Name"
                  // className="w-[90%] px-4 py-2 mb-4 mt-1 border"
                  required
                  onChange={handleInputChange}
                />
                {errors.firstName && (
                  <div className="text-red-500">{errors.firstName}</div>
                )}
              </div>
              <div>
                <Input
                  type="text"
                  name="middleName"
                  label="Middle Name"
                  // className="w-[90%] px-4 py-2 mb-4 mt-1 border"
                  placeholder="Enter Middle Name"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Input
                  type="text"
                  label="Last Name"
                  name="lastName"
                  // className="w-[90%] px-4 py-2 mb-4 mt-1 border"
                  placeholder="Enter Last Name"
                  required
                  onChange={handleInputChange}
                />
                {errors.lastName && (
                  <div className="text-red-500">{errors.lastName}</div>
                )}
              </div>
            </span>
            <span className="flex gap-2 items-center mb-4">
              <Select
                id="gender"
                name="gender"
                label="Gender"
                required
                onChange={(value) => handleGender(value)}
                value={selectedGender}
              >
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="other">Other</Option>
              </Select>

              <div className="ml-8 flex gap-4 items-center">
                <Select
                  name="address"
                  label="Region"
                  value={formData.address}
                  required
                  onChange={(value) => handleAddressChange(value)}
                >
                  <Option value="Ahmedabad">Ahmedabad</Option>
                  <Option value="Bhavnagar">Bhavnagar</Option>
                  <Option value="Dwarka">Dwarka</Option>
                  <Option value="Gandhinagar">Gandhinagar</Option>
                  <Option value="Jamnagar">Jamnagar</Option>
                  <Option value="Rajkot">Rajkot</Option>
                  <Option value="Surat">Surat</Option>
                  <Option value="Vadodara">Vadodara</Option>

                </Select>
                {errors.address && (
                  <div className="text-red-500">{errors.address}</div>
                )}
              </div>
            </span>
            <span className="flex gap-2 items-center mb-4">
              <label htmlFor="types">Type</label>
              <br />
              <input
                type="radio"
                id="user"
                name="type"
                value="user"
                checked={formData.accountType === true}
                onChange={handleInputChange}
              />
              <label htmlFor="user">User</label>
              <input
                type="radio"
                id="serviceprovider"
                name="type"
                value="serviceprovider"
                checked={formData.accountType === false}
                onChange={handleInputChange}
              />
              <label htmlFor="serviceprovider">Service provider</label>
            </span>

            <button
              className="bg-blue-700 text-white py-2 px-8 hover:bg-blue-500"
              onClick={handleNextStep}
              disabled={errors.address !== ""}
            >
              Next
            </button>
          </>
        );

      case 2:
        return (
          <>
            <span className="flex gap-4 mb-4">
              <div>
                <Input
                  type="text"
                  name="email"
                  label="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {errors.email && (
                  <div className="text-red-500">{errors.email}</div>
                )}
              </div>
              <div>
                <Input
                  type="text"
                  name="phoneNo"
                  label="Phone No"
                  value={formData.phoneNo}
                  onChange={handleInputChange}
                />
                {errors.phoneNo && (
                  <div className="text-red-500">{errors.phoneNo}</div>
                )}
              </div>
            </span>
            <span className="flex gap-4 mb-4">
              <div>
                <Input
                  type="password"
                  name="password"
                  label="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                {errors.password && (
                  <div className="text-red-500">{errors.password}</div>
                )}
              </div>
              <div>
                <Input
                  type="password"
                  name="confirmPassword"
                  label="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
                {errors.confirmPassword && (
                  <div className="text-red-500">{errors.confirmPassword}</div>
                )}
              </div>
            </span>
            <button
              className="bg-blue-700 text-white py-2 px-8 hover:bg-blue-500 mr-2"
              onClick={handlePreviousStep}
            >
              Previous
            </button>
            {formData.accountType ? (
              <button
                className="bg-blue-700 text-white py-2 px-8 hover:bg-blue-500"
                onClick={addTodo}
                disabled={
                  errors.email !== "" ||
                  errors.phoneNo !== "" ||
                  errors.password !== "" ||
                  errors.confirmPassword !== ""
                }
              >
                Submit
              </button>
            ) : (
              <button
                className="bg-blue-700 text-white py-2 px-8 hover:bg-blue-500"
                onClick={handleNextStep}
                disabled={
                  errors.email !== "" ||
                  errors.phoneNo !== "" ||
                  errors.password !== "" ||
                  errors.confirmPassword !== ""
                }
              >
                Next
              </button>
            )}
          </>
        );

      case 3:
        return (
          <>
            <span className="flex gap-3">
              <div>
                <Input
                  type="file"
                  name="photo"
                  label="Profile Photo"
                  onChange={(e) => handleImageUpload(e)}
                  // className="w-[90%] px-4 py-2 mb-4 mt-1 border"
                />
              </div>

              <div className="border border-red-800 flex flex-col gap-y-4">
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
            </span>
            <button
              className="bg-blue-700 text-white py-2 px-8 hover:bg-blue-500 mr-2"
              onClick={handlePreviousStep}
            >
              Previous
            </button>

            <button
              className="bg-blue-700 text-white py-2 px-8 hover:bg-blue-500"
              onClick={addTodo}
              // disabled={errors.profilePhoto !== "" || errors.documents !== ""}
            >
              Submit
            </button>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-screen overflow-hidden h-screen">
      <Navbar />
      <div
        className="flex items-center justify-center h-screen"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex">
          <div className="bg-white p-8 text-left w-100 shadow-xl">
            <h2 className="text-2xl mb-6">Register</h2>
            {renderStep()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
