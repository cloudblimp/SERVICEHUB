// Login.js
import React, { useState } from "react";
import Navbar from "../Customer/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import ForgotPassword from "./ForgotPassword";
import bg from "../../images/Cleaning/Pocha.jpg";
import axios from "axios";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, setIsLoggedIn } = useAuth();
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [selectedType, setSelectedType] = useState("serviceprovider");

  const openRegister = () => {
    navigate("/register");
  };

  const openForgotPassword = () => {
    setShowForgotPassword(true);
  };

  const validateForm = () => {
    const cleanedEmail = email.replace(/\s/g, "");
    const isPhoneNumber = !isNaN(cleanedEmail) && cleanedEmail.length === 10;

    if (
      !(
        (cleanedEmail.includes("@") && cleanedEmail.includes(".com")) ||
        isPhoneNumber
      )
    ) {
      setError("Please enter a valid email address");
      return false;
    }

    if (password.length < 6 || !/[A-Z]/.test(password)) {
      setError(
        "Password must be at least 6 characters long and contain at least one capital letter"
      );
      return false;
    }

    return true;
  };
  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
    // Update the selected value in state
  };
  const handleLogin = async () => {
    setError("");

    try {
      if (!validateForm()) {
        return;
      }

      // Check if the email and password match the hardcoded admin credentials
      if (email === "admin@gmail.com" && password === "@Admin123") {
        login("admin");
        setIsLoggedIn(true);
        localStorage.setItem("Loggedin", "admin");
        navigate("/admin/home");
        return;
      }

      const loginEndpoint =
        selectedType === "serviceprovider"
          ? "http://localhost:1000/sp/loginSp"
          : "http://localhost:1000/user/loginUser";

      const response = await axios.post(loginEndpoint, {
        email,
        password,
      });
      if (response && response.data && response.status === 200) {
        alert("Login successful");

        switch (selectedType) {
          case "user":
            login("user");
            setIsLoggedIn(true);
            localStorage.setItem("Loggedin", "user");
            navigate("/");

            localStorage.setItem("userID", response.data.user._id);

            break;
          case "serviceprovider":
            login("serviceprovider");
            localStorage.setItem("Loggedin", "serviceprovider");
            setIsLoggedIn(true);
            navigate("/serviceprovider/home");
            localStorage.setItem("userID", response.data.sp._id);

            break;
          default:
            break;
        }
      } else {
        // Login failed, handle the error
        setError("Invalid email or password. Please try again.");
      }
    } catch (error) {
      // Handle errors
      console.error("Error logging me in:", error.response.data.message);
      setError("Error logging in. Please try again.");
    }
  };

  return (
    <div className="w-screen overflow-hidden">
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
          <div className="bg-white p-8 text-left w-100">
            <h2 className="text-2xl mb-6">LOGIN</h2>
            {showForgotPassword ? (
              <ForgotPassword onCancel={() => setShowForgotPassword(false)} />
            ) : (
              <>
                <p className="text-[1vw]">Email Address</p>
                <input
                  type="text"
                  className="w-[90%] px-4 py-2 mb-4 mt-1 border"
                  placeholder="Enter Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <p className="text-[1vw]">Password</p>
                <input
                  type="password"
                  className="w-[90%] px-4 py-2 mb-4 mt-1 border"
                  placeholder="Enter your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p className="text-red-500">{error}</p>}
                <label htmlFor="types">Type</label>
                <br />
                <select
                  id="user"
                  name=""
                  required
                  value={selectedType}
                  className="w-[70%] h-10 px-4 py-2 mb-4 mt-1 border"
                  onChange={handleTypeChange}
                >
                  <option value="user">user</option>
                  <option value="serviceprovider">service provider</option>
                </select>
                <br></br>
                <button
                  className="bg-[#1A3570] text-white py-2 px-8 hover:bg-blue-500"
                  onClick={handleLogin}
                >
                  Login
                </button>
                <p
                  className="text-sm mt-4 cursor-pointer text-[#1A3570] hover:underline"
                  onClick={openForgotPassword}
                >
                  Forgot Password?
                </p>
              </>
            )}
          </div>

          <div className="bg-[#1A3570] text-white p-8 text-left items-center w-72 shadow-md ">
            <div className="mt-[50%]">
              <h1 className="text-2xl mb-4">NOT A MEMBER ?</h1>
              <button
                className="bg-[#FCA311] text-white py-2 px-6 hover:bg-red-700 w-full"
                onClick={openRegister}
              >
                Register Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
