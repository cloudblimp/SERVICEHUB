const spModel = require("../../model/userModels/Sp_tbl");
const bcrypt = require("bcryptjs");
const fileUplaodService = require("../../fileUploadService");

const addSp = async (req, res) => {
  const data = req.body;
  const photo = req.files.photo;
  // console.log("AddSp: ", photo);
  if (!photo) {
    return res
      .status(400)
      .json({ success: false, message: "No photo uploaded" });
  }
  let user = await spModel.findOne({ email: data.email });
  if (user) {
    return res.status(401).json({
      success: false,
      message: "provider account already exisits",
    });
  }
  try {
    const profilephoto = await fileUplaodService(photo.tempFilePath);
    console.log("AddSp: ", profilephoto);
    const newPass = await bcrypt.hash(data.password, 12);
    sp = await spModel.create({
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
      gender: data.gender,
      address: data.address,
      email: data.email,
      phoneNo: data.phoneNo,
      password: newPass,
      photo: profilephoto.secure_url,
      doj: data.doj,
      avgRating: data.avgRating,
    });

    return res.status(201).json({
      success: true,
      message: "sp created successfully!",
      data: sp,
    });
  } catch (error) {
    console.error("Error creating sp:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while creating the sp",
    });
  }
};

const getAllSp = async (req, res) => {
  try {
    const user = await spModel.find();
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

const loginSp = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the service provider by email
    const sp = await spModel.findOne({ email });

    // Check if the service provider exists
    if (!sp) {
      return res.status(401).json({ message: "Invalid email" });
    }

    const passwordMatch = await bcrypt.compare(password, sp.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // If login is successful, return a success message along with the service provider information
    res.status(200).json({ message: "Login successful", sp });
  } catch (error) {
    // If an error occurs during the login process, return a generic error message
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const updateSp = async (req, res) => {
  const id = req.params.id;
  console.log("req bOdy", req.body);
  try {
    const user = await spModel.findByIdAndUpdate(id, req.body);

    if (user) {
      res.status(201).json({
        message: "Service provider updated successfully",
        data: user,
      });
    } else {
      res.status(404).json({
        message: "Service provider not found",
        data: [],
      });
    }
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
const updateStatus = async (req, res) => {
  const id = req.params.id;
  console.log(req.params.status); // Log the request body
  try {
    const user = await spModel.findByIdAndUpdate(id, {
      approval: req.params.status,
    });

    if (user) {
      res.status(201).json({
        message: "Service provider status updated successfully",
        data: user,
      });
      console.log(user);
    } else {
      res.status(404).json({
        message: "Service provider not found",
        data: [],
      });
    }
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

const deleteSpById = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await spModel.findByIdAndDelete(id, req.body);

    if (user) {
      res.status(201).json({
        message: "Service provider deleted successfully",
        data: user,
      });
    } else {
      res.status(404).json({
        message: "Service provider not found",
        data: [],
      });
    }
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

const getSpById = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await spModel.findById(id);

    if (user && user != undefined) {
      res.status(201).json({
        message: "Service Provider fetched successfully",
        data: user,
      });
    } else {
      res.status(404).json({
        message: "Service Provider not found",
        data: [],
      });
    }
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const { sp_id, currentPassword, newPassword } = req.body;
    const serviceProvider = await spModel.findById(sp_id);
    if (!serviceProvider) {
      return res.status(404).json({ message: "Service provider not found" });
    }
    console.log("password::", currentPassword, serviceProvider.password);
    const hashedPasswordFromDB = serviceProvider.password;
    const isPasswordMatch = await bcrypt.compare(
      currentPassword,
      hashedPasswordFromDB
    );
    console.log("password::", isPasswordMatch);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Incorrect current password" });
    }
    serviceProvider.password = await bcrypt.hash(newPassword, 12);
    await serviceProvider.save();
    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  addSp,
  getAllSp,
  loginSp,
  updateSp,
  deleteSpById,
  updateStatus,
  getSpById,
  changePassword,
};
