const otpModel = require("../../model/userModels/Otp_tbl");

const addOtp = async (req, res) => {
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

const getOtp = async (req, res) => {
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

module.exports = {
  addOtp,
  getOtp,
};
