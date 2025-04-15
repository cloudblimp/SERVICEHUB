const express = require("express");
const paymentController = require("../../controller/payments/PaymentController");

const router = express.Router();

// router.post("/addPayment", paymentController.addPayment);
// router.get("/getAllPayment", paymentController.getAllPayment);
router.post("/checkout", paymentController.checkout);
router.post(
  "/paymentverification/:serviceid/:amount",
  paymentController.paymentVerification
);
router.get("/checkOrderID/:orderid", paymentController.checkOrderID);
router.get("/getPaymentID/:requestid", paymentController.getPaymentID);
module.exports = router;
