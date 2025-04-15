const serviceReqModel = require("../../model/services/Service_Req_tbl");
const mongoose = require("mongoose");

const addServiceReq = async (req, res) => {
  const {
    service_id,
    user_id,
    customer,
    phoneNo,
    address,
    available_date,
    available_time,
    price,
    booking_status,
    payment_status,
  } = req.body;

  try {
    const addOrder = await serviceReqModel.create({
      service_id,
      user_id,
      customer,
      phoneNo,
      address,
      available_date,
      available_time,
      price,
      booking_status,
      payment_status,
    });

    if (addOrder) {
      res.status(201).json({
        message: "Service Request created successfully...",
        data: addOrder,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "error to create service request",
      error: err.message,
    });
  }
};

const getAllServiceReq = async (req, res) => {
  try {
    const user = await serviceReqModel
      .find()
      .populate({
        path: "service_id",
        populate: {
          path: "sp_id",
        },
      })
      .populate({
        path: "service_id",
        populate: {
          path: "mini_cat_id",
          populate: {
            path: "nested_cat_id",
          },
        },
      })
      .populate("user_id");
    if (user) {
      res.status(201).json({
        message: "Services Request get successfully",
        data: user,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const getServiceReqID = async (req, res) => {
  try {
    const user = await serviceReqModel.find({ user_id: req.params.id });

    if (!user) {
      // If no user is found, return a 404 Not Found status
      return res.status(404).json({
        message: "User not found",
      });
    }
    console.log("UserGEt COntroller:", user);
    // If a user is found, return the user details with a 200 OK status
    res.status(200).json({
      message: "User retrieved successfully",
      data: user,
    });
  } catch (err) {
    // If there's an error during the database operation, return a 500 Internal Server Error status
    res.status(500).json({
      message: err.message,
    });
  }
};
const getServiceAgg = async (req, res) => {
  const userId = req.params.id;
  try {
    const orders = await serviceReqModel
      .find({ user_id: userId })
      .populate({
        path: "service_id",
        populate: {
          path: "sp_id",
        },
      })
      .populate({
        path: "service_id",
        populate: {
          path: "mini_cat_id",
        },
      })
      .populate("user_id");

    res.status(200).json({
      message: "Orders retrieved successfully",
      data: orders,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({
      message: "Error fetching orders",
      error: error.message,
    });
  }
};
const getOrdersBySPID = async (req, res) => {
  const spid = req.params.spid;
  try {
    const orders = await serviceReqModel
      .find()
      .populate({
        path: "service_id",
        populate: [{ path: "sp_id" }, { path: "mini_cat_id" }],
      })
      .populate("user_id");
    console.log();
    const ordersBySPID = orders.filter(
      (order) => order.service_id.sp_id._id == spid
    );

    res.status(200).json({
      message: "Orders retrieved successfully",
      data: ordersBySPID,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({
      message: "Error fetching orders",
      error: error.message,
    });
  }
};

const updateBookingStatus = async (req, res) => {
  const { servicereq_id } = req.params;
  const { status } = req.params;
  try {
    // Find the service request by ID and update the booking status
    const updatedServiceReq = await serviceReqModel.findByIdAndUpdate(
      servicereq_id,
      { booking_status: status },
      { new: true } // Return the updated document
    );
    console.log("updates service booking", updatedServiceReq);
    res.status(200).json({
      message: "Booking status updated successfully",
      data: updatedServiceReq,
    });
  } catch (error) {
    console.error("Error updating booking status:", error);
    res.status(500).json({
      message: "Error updating booking status",
      error: error.message,
    });
  }
};
const updateOrderStatus = async (req, res) => {
  const { servicereq_id } = req.params;
  const { status } = req.params;

  try {
    const updatedServiceReq = await serviceReqModel.findByIdAndUpdate(
      servicereq_id,
      { order_status: status },
      { new: true } // Return the updated document
    );
    res.status(200).json({
      message: "Order status updated successfully",
      data: updatedServiceReq,
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({
      message: "Error updating order status",
      error: error.message,
    });
  }
};
const updateStatus = async (req, res) => {
  const { servicereq_id } = req.params;
  const { status } = req.params;
  try {
    const updatedServiceReq = await serviceReqModel.findByIdAndUpdate(
      servicereq_id,
      { payment_status: status },
      { new: true } // Return the updated document
    );
    console.log("updates service booking", updatedServiceReq);
    res.status(200).json({
      message: "payment status updated successfully",
      data: updatedServiceReq,
    });
  } catch (error) {
    console.error("Error updating payment status:", error);
    res.status(500).json({
      message: "Error updating booking status",
      error: error.message,
    });
  }
};
module.exports = {
  addServiceReq,
  getServiceReqID,
  getAllServiceReq,
  getServiceAgg,
  getOrdersBySPID,
  updateBookingStatus,
  updateOrderStatus,
  updateStatus,
};
