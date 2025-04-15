const refundModel = require("../../model/payment/Refund_tbl");

const addRefund = async (req, res) => {
  const user = req.body;

  try {
    const saveUser = await refundModel.create({
      payment_id: user.payment_id,
      refund_amount: user.refund_amount,
      service_id: user.service_id,
      refund_status: user.refund_status,
      refund_date: user.refund_date,
    });

    if (saveUser) {
      res.status(201).json({
        message: "Request created successfully...",
        data: saveUser,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "error to create Refund",
      error: err.message,
    });
  }
};

const getAllRefund = async (req, res) => {
  try {
    const user = await refundModel.find();
    if (user) {
      res.status(201).json({
        message: "Refund get successfully",
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
  addRefund,
  getAllRefund,
};
