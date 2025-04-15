const mongoose = require("mongoose");

const serviceReqSchema = new mongoose.Schema({
  service_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service_Table",
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User_Table",
  },
  customer: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: Number,
    required: true,
    maxlength: 10,
  },
  address: {
    type: String,
    required: true,
  },
  available_date: {
    type: String,
    required: true,
  },
  available_time: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  orderTime: {
    type: Date,
    default: Date.now,
  },
  booking_status: {
    type: Number,
    maxlength: 1,
    default: 0,
    validate: {
      validator: (value) => [0, 1, 2].includes(value), // Assuming 0 : Pending, 1: Confirmed, 2: Canceled
      message: "Invalid value.",
    },
  },
  payment_status: {
    type: Number,
    maxlength: 1,
    default: 2,
    validate: {
      validator: (value) => [0, 1, 2].includes(value), // Assuming 0 : Pending, 1: Paid, 2: Unpaid
      message: "Invalid Value",
    },
  },
  order_status: {
    type: Number,
    default: 0, // Assuming 0 : Pending, 1: Confirmed, 2: Canceled
  },
});

module.exports = mongoose.model("Service_Req_Table", serviceReqSchema);
