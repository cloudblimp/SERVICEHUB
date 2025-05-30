const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  otp: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600, // Expires after 1 hour (in seconds)
  },
});

const OTP = mongoose.model("OTP", otpSchema);

module.exports = OTP;
