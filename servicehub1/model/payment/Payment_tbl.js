const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  request_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service_Req_Table",
  },
  amount: {
    type: Number,
    required: true,
  },
  razorpay_order_id: {
    type: String,
    required: true,
  },
  razorpay_payment_id: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Payment_Table", paymentSchema);
