const spAvlModel = require("../model/Sp_Avl_tbl");

const addSpAvl = async (req, res) => {
  try {
    const { sp_id, selectedDays } = req.body;
    const availabilityDocuments = [];
    for (const dayOfWeek in selectedDays) {
      const slots = [];
      selectedDays[dayOfWeek].forEach((slot) => {
        slots.push({ slot: slot, isAvailable: true });
      });
      availabilityDocuments.push({
        sp_id: sp_id,
        dayOfWeek: dayOfWeek,
        availableSlots: slots,
      });
    }
    const result = await spAvlModel.insertMany(availabilityDocuments);
    return res.status(201).json({
      success: true,
      message: "Availability documents inserted successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error inserting availability documents:", error);
    // Return error response
    return res.status(500).json({
      success: false,
      message: "An error occurred while inserting availability documents",
    });
  }
};

const getAllSpAvl = async (req, res) => {
  try {
    const user = await spAvlModel.find();
    if (user) {
      res.status(201).json({
        message: "sp_availability get successfully",
        data: user,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const getSpAvl = async (req, res) => {
  console.log("request,", req);
  try {
    const user = await spAvlModel.find({
      sp_id: req.params.id,
    });
    console.log(user);
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

const updateSpAvlById = async (req, res) => {
  const id = req.params.id;
  const dayOfWeek = req.params.day;
  const { selectedDays } = req.body;
  console.log("req", req.body);
  try {
    // Construct the update object based on selectedDays
    const updateObj = {};
    for (const day in selectedDays) {
      updateObj[`availableSlots`] = selectedDays[day].map((slot) => ({
        slot,
        isAvailable: true,
      }));
    }

    // Find and update the document
    const updatedData = await spAvlModel.findOneAndUpdate(
      { sp_id: id, dayOfWeek: dayOfWeek },
      { $set: updateObj },
      { new: true }
    );

    if (updatedData) {
      res.status(201).json({
        message: "Sp_Availability updated successfully",
        data: updatedData,
      });
    } else {
      res.status(404).json({
        message: "Sp_Availability not found",
        data: [],
      });
    }
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

const deleteSpAvlById = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await spAvlModel.findByIdAndDelete(id, req.body);

    if (user) {
      res.status(201).json({
        message: "Sp_Availability deleted successfully",
        data: user,
      });
    } else {
      res.status(404).json({
        message: "Sp_Availability not found",
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
  addSpAvl,
  getAllSpAvl,
  getSpAvl,
  updateSpAvlById,
  deleteSpAvlById,
};
