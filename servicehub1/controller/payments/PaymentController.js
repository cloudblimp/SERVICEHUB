// const paymentModel = require("../../model/payment/Payment_tbl");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const Payment = require("../../model/payment/paymentModel.js");
const paymentModel = require("../../model/payment/Payment_tbl.js");
const ServiceReqTable = require("../../model/services/Service_Req_tbl.js");
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_APT_SECRET,
});
const checkout = async (req, res) => {
  const options = {
    amount: Number(req.body.amount * 100),
    currency: "INR",
  };
  const order = await instance.orders.create(options);

  res.status(200).json({
    success: true,
    order,
  });
};

const paymentVerification = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;
  const serviceReqID = req.params.serviceid;
  const amountPaid = req.params.amount;

  if (isAuthentic) {
    await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });
    await paymentModel.create({
      request_id: serviceReqID,
      amount: amountPaid,
      razorpay_order_id: razorpay_order_id,
      razorpay_payment_id: razorpay_payment_id,
    });

    res.redirect(
      `http://localhost:3000/bookingdetails/?id=${razorpay_order_id}`
    );
  } else {
    res.status(400).json({
      success: false,
    });
  }
};
const checkOrderID = async (req, res) => {
  const orderID = req.params.orderid;
  try {
    const paymentRecord = await paymentModel.findOne({
      razorpay_order_id: orderID,
    });
    if (paymentRecord) {
      const updatedStatus = await ServiceReqTable.findByIdAndUpdate(
        paymentRecord.request_id,
        { payment_status: 1 }
      );
      return updatedStatus
        ? res
            .status(200)
            .json({ message: "Payment status updated successfully" })
        : res.status(400).json({ message: "Payment Status updation problem" });
    }
    return res
      .status(404)
      .json({ message: "Order ID not found in payment records" });
  } catch (error) {
    console.error("Error updating payment status:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
const getPaymentID = async (req, res) => {
  const requestID = req.params.requestid;
  try {
    const paymentRecord = await paymentModel.findOne({
      request_id: requestID,
    });
    return paymentRecord
      ? res.status(200).json({
          message: "Payment id successfully",
          data: paymentRecord,
        })
      : res.status(400).json({ message: "Payment id get  problem" });
  } catch (error) {}
};
module.exports = {
  checkout,
  paymentVerification,
  checkOrderID,
  getPaymentID,
};
