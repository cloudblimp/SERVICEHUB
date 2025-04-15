const userModel = require("../../model/userModels/User_tbl");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const OTP = require("../../model/userModels/Otp_tbl");

const addUser = async (req, res) => {
  const data = req.body;

  let user = await userModel.findOne({ email: data.email });
  console.log(user);

  if (user) {
    return res.status(401).json({
      success: false,
      message: "user already exists",
    });
  }

  const newPass = await bcrypt.hash(data.password, 12);

  user = await userModel.create({
    firstName: data.firstName,
    middleName: data.middleName,
    lastName: data.lastName,
    gender: data.gender,
    address: data.address,
    email: data.email,
    phoneNo: data.phoneNo,
    password: newPass,
    accountType: true,
  });

  if (user) {
    res.status(201).json({
      success: true,
      message: "user created successfully!",
      data: data,
    });
  } else {
    res.status(401).json({
      success: false,
      message: "user not created!",
    });
  }
};

const getAllUser = async (req, res) => {
  try {
    const user = await userModel.find();

    if (user) {
      res.status(201).json({
        message: "user get successfully",
        data: user,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // If email and password are correct, return success response
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found", data: user });
    }
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      auth: {
        user: "goel.aarushi2203@gmail.com", // Your Gmail email address
        pass: "wsvnjhlqcdzddnik", // Your Gmail password
      },
    });
    const otp = Math.floor(1000 + Math.random() * 9000);
    const mailOptions = {
      from: "Service hub",
      to: user.email,
      subject: "Your OTP for Verification",
      html: `Your OTP is ${otp}. Please use this OTP to verify your account.`,
    };

    transporter.sendMail(mailOptions);

    const otpData = new OTP({
      otp: otp,
      email: user.email,
    });
    await otpData.save();

    res.status(200).json({ message: "Email sent successfully", data: { otp } });
  } catch (error) {
    console.error("Error in forgot password:", error);
    res.status(500).json({ message: "Server error" });
  }
};
const updatePassword = async (req, res) => {
  const { email, newPassword } = req.body;
  console.log("userDetails", email, newPassword);
  try {
    const user = await userModel.findOne({ email });
    console.log("userDetails", user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("userDetails", user);
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    const updatedUser = await userModel.findByIdAndUpdate(
      user._id,
      { password: hashedPassword },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ message: "Server error" });
  }
};
const getuserdetails = async (req, res) => {
  console.log(req.body);
  // const { userID } = req.body; // Extracting email from the request body
  try {
    const user = await userModel.findById(userID); // Finding the user by email

    if (!user) {
      // If no user is found, return a 404 Not Found status
      return res.status(404).json({
        message: "User not found",
      });
    }
    console.log("UserGEt COntroller:", user);
    // If a user is found, return the user details with a 200 OK status
    res.status(200).json({
      message: "User retrieved successfully",
      data: user,
    });
  } catch (err) {
    // If there's an error during the database operation, return a 500 Internal Server Error status
    res.status(500).json({
      message: err.message,
    });
  }
};
const getUserById = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await userModel.findById(id);

    if (user && user != undefined) {
      res.status(201).json({
        message: "User fetched successfully",
        data: user,
      });
    } else {
      res.status(404).json({
        message: "User not found",
        data: [],
      });
    }
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
const updateUserById = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await userModel.findByIdAndUpdate(id, req.body);

    if (user) {
      res.status(201).json({
        message: "User updated successfully",
        data: user,
      });
    } else {
      res.status(404).json({
        message: "User not found",
        data: [],
      });
    }
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
const deleteUserById = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await userModel.findByIdAndDelete(id, req.body);

    if (user) {
      res.status(201).json({
        message: "User deleted successfully",
        data: user,
      });
    } else {
      res.status(404).json({
        message: "User not found",
        data: [],
      });
    }
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
module.exports = {
  addUser,
  getAllUser,
  loginUser,
  getuserdetails,
  getUserById,
  updateUserById,
  deleteUserById,
  forgotPassword,
  updatePassword,
};
