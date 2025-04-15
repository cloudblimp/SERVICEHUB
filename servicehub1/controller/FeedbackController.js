const feedbackModel = require("../model/Feedback_tbl");
const SpSchema = require("../model/userModels/Sp_tbl");
const addFeedback = async (req, res) => {
  const user = req.body;

  try {
    // Await the creation of the feedback document
    const feedback = await feedbackModel.create({
      service_id: user.service_id,
      user_id: user.user_id,
      rating: user.rating,
      comment: user.message,
    });

    if (feedback) {
      // Return a success response if feedback creation was successful
      res.status(201).json({
        message: "Feedback created successfully...",
        data: feedback,
      });
    } else {
      // Return an error response if feedback creation failed
      res.status(500).json({
        message: "Failed to create feedback",
      });
    }
  } catch (err) {
    // Handle any errors that occur during the feedback creation process
    res.status(500).json({
      message: "Error creating feedback",
      error: err.message,
    });
  }
};

const getAllFeedback = async (req, res) => {
  try {
    const user = await feedbackModel
      .find()
      .populate("user_id")
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
      });
    if (user) {
      res.status(201).json({
        message: "Feedback get successfully",
        data: user,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
const getByFeedbackID = async (req, res) => {
  const { id } = req.params;
  try {
    const feedback = await feedbackModel
      .find()
      .populate({
        path: "service_id",
        populate: [{ path: "sp_id" }, { path: "mini_cat_id" }],
      })
      .populate("user_id");

    // Filter feedback based on provided sp_id
    const user = feedback.filter((feedbackItem) => {
      return feedbackItem.service_id.sp_id._id.toString() == id;
    });
    console.log("feedback:", user);
    if (user && user != undefined) {
      res.status(201).json({
        message: "Category fetched successfully",
        data: user,
      });
    } else {
      res.status(404).json({
        message: "Category not found",
        data: [],
      });
    }
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
module.exports = {
  addFeedback,
  getAllFeedback,
  getByFeedbackID,
};
