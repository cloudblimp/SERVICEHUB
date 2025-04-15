const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
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
    maxlength: 20,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  phoneNo: {
    type: Number,
    maxlength: 10,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  accountType: {
    type: Boolean,
    required: true,
    validate: {
      validator: (value) => [true, false].includes(value), // Assuming true : Customer, false :
      message: "Invalid Account type.",
    },
  },
  gender: {
    type: Number,
    maxlength: 1,
    required: true,
    validate: {
      validator: (value) => [0, 1, 2].includes(value), // Assuming 0 : Male, 1: Female, 2: Other
      message: "Invalid gender value.",
    },
  },
  address: {
    type: String,
    maxlength: 100,
    required: true,
  },
});

module.exports = mongoose.model("User_Table", userSchema);
