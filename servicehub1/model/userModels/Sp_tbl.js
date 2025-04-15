const mongoose = require("mongoose");

const serivceProviderSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    maxlength: 20,
  },
  middleName: {
    type: String,
    maxlength: 20,
  },
  lastName: {
    type: String,
    required: true,
    maxlength: 20,
  },
  email: {
    type: String,
    unique: true,
  },
  phoneNo: {
    type: Number,
    required: true,
    maxlength: 10,
  },
  password: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
    maxlength: 250,
  },
  gender: {
    type: Number,
    required: true,
    maxlength: 1,
    validate: {
      validator: (value) => [0, 1, 2].includes(value), // Assuming 0 : Male, 1: Female, 2: Other
      message: "Invalid gender value.",
    },
  },
  address: {
    type: String,
    required: true,
    maxlength: 100,
  },
  doj: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  avgRating: {
    type: Number,
    maxlength: 1,
  },
  approval: {
    type: Boolean,
    required: true,
    default: false,
  },
});
//hash password

module.exports = mongoose.model("SP_Table", serivceProviderSchema);
