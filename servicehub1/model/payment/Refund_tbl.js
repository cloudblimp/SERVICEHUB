const mongoose = require("mongoose");

const refundSchema = new mongoose.Schema({
  payment_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Payment_Table",
  },
  service_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service_Req_Table",
  },
  refund_amount: {
    type: Number,
    required: true,
  },
  refund_status: {
    type: Number,
    maxlength: 1,
    required: true,
    validate: {
      validator: (value) => [0, 1, 2].includes(value), // Assuming 0 : Pending, 1: Approved, 2: Rejected
      message: "Invalid Value",
    },
  },
  refund_date: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Refund_Table", refundSchema);
