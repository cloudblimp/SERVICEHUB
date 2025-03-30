// ForgotPassword.js

import React, { useState } from "react";
import { addFunction, getdata } from "../../services/Apis";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const ForgotPassword = ({ onCancel }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [Sentotp, setSentotp] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleNextStep = async () => {
    const toastId = toast.loading("loading....");
    try {
      const data = await axios.post(
        "http://localhost:1000/user/forgotPassword",
        { email: email }
      );
      console.log(data.data);
      setSentotp(data.data.data.otp);
      setMessage("Password reset email sent successfully");
      setStep((prevStep) => prevStep + 1);
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error sending email");
    }
    toast.dismiss(toastId);
  };

  const handleNextStep2 = async () => {
    const toastId = toast.loading("loading....");

    try {
      if (Sentotp == otp) {
        setStep((prevStep) => prevStep + 1);
      }
    } catch (error) {
      console.error("Error:", error);
    }
    toast.dismiss(toastId);
  };
  const handlePreviousStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async () => {
    try {
      if (newPassword === confirmPassword) {
        const resp = await axios.put(
          "http://localhost:1000/user/updatePassword",
          {
            email: email,
            newPassword: newPassword,
          }
        );

        if (resp.status === 200 || resp.status === 201) {
          console.log("Password updated successfully");
          alert("Password changed Successfully");
          navigate("/");
        } else {
          console.error(
            "Error updating password. Response status:",
            resp.status
          );
          // Handle other status codes if needed
        }
      } else {
        // Passwords don't match, show an error message or take appropriate action
        console.error("New password and confirm password do not match");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      // Handle error
    }
  };

  return (
    <>
      {step === 1 && (
        <>
          <p className="text-[1vw]">Enter your email to reset password</p>
          <input
            type="text"
            className="w-[90%] px-4 py-2 mb-4 mt-1 border"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            className="bg-blue-700 text-white py-2 px-8 hover:bg-blue-500"
            onClick={handleNextStep}
          >
            Next
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <p className="text-[1vw]">Check your email for the OTP</p>
          <input
            type="text"
            className="w-[90%] px-4 py-2 mb-4 mt-1 border"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button
            className="bg-blue-700 text-white py-2 px-8 hover:bg-blue-500 mr-2"
            onClick={handlePreviousStep}
          >
            Previous
          </button>
          <button
            className="bg-blue-700 text-white py-2 px-8 hover:bg-blue-500"
            onClick={handleNextStep2}
          >
            Next
          </button>
        </>
      )}

      {step === 3 && (
        <>
          <p className="text-[1vw]">Set a new password</p>
          <input
            type="password"
            className="w-[90%] px-4 py-2 mb-4 mt-1 border"
            placeholder="Enter New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            className="w-[90%] px-4 py-2 mb-4 mt-1 border"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            className="bg-blue-700 text-white py-2 px-8 hover:bg-blue-500 mr-2"
            onClick={handlePreviousStep}
          >
            Previous
          </button>
          <button
            className="bg-blue-700 text-white py-2 px-8 hover:bg-blue-500"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </>
      )}
    </>
  );
};

export default ForgotPassword;
