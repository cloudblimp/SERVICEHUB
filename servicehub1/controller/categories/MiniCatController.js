const miniCatModel = require("../../model/category/Mini_Cat_tbl");
const fileUploadService = require("../../fileUploadService");
const mongoose = require("mongoose");
const fs = require("fs").promises; // For file cleanup

// Add a new mini category
const addMiniCat = async (req, res) => {
  try {
    console.log("Request received to add mini category", req.body);

    // Validate file upload
    if (!req.files || !req.files.mini_cat_image) {
      console.error("No photo uploaded in the request");
      return res.status(400).json({
        success: false,
        message: "No photo uploaded",
      });
    }

    const photo = req.files.mini_cat_image;
    console.log("Photo details:", photo);

    // Validate database connection
    if (mongoose.connection.readyState !== 1) {
      console.error("Database not connected");
      throw new Error("Database not connected");
    }

    // Validate ObjectId fields
    if (!mongoose.Types.ObjectId.isValid(req.body.nested_cat_id)) {
      console.error("Invalid nested_cat_id provided:", req.body.nested_cat_id);
      return res.status(400).json({
        success: false,
        message: "Invalid nested_cat_id",
      });
    }
    if (req.body.offer_id && !mongoose.Types.ObjectId.isValid(req.body.offer_id)) {
      console.error("Invalid offer_id provided:", req.body.offer_id);
      return res.status(400).json({
        success: false,
        message: "Invalid offer_id",
      });
    }

    // Validate other fields
    const { mini_cat_name, min_price, max_price, tag } = req.body;
    if (!mini_cat_name || typeof mini_cat_name !== "string") {
      console.error("Invalid mini_cat_name provided:", mini_cat_name);
      return res.status(400).json({
        success: false,
        message: "Mini category name is required and must be a string",
      });
    }
    if (!min_price || isNaN(min_price) || min_price < 0) {
      console.error("Invalid min_price provided:", min_price);
      return res.status(400).json({
        success: false,
        message: "Minimum price is required and must be a positive number",
      });
    }
    if (!max_price || isNaN(max_price) || max_price < 0) {
      console.error("Invalid max_price provided:", max_price);
      return res.status(400).json({
        success: false,
        message: "Maximum price is required and must be a positive number",
      });
    }
    if (parseFloat(min_price) > parseFloat(max_price)) {
      console.error("min_price is greater than max_price:", { min_price, max_price });
      return res.status(400).json({
        success: false,
        message: "Minimum price cannot be greater than maximum price",
      });
    }
    if (tag && typeof tag !== "string") {
      console.error("Invalid tag provided:", tag);
      return res.status(400).json({
        success: false,
        message: "Tag must be a string",
      });
    }

    // Upload file
    const data = await fileUploadService(photo.tempFilePath);
    if (!data.secure_url) {
      console.error("File upload failed, no secure URL returned");
      throw new Error("File upload failed, no secure URL");
    }

    console.log("File uploaded successfully, secure URL:", data.secure_url);

    // Prepare data for creation
    const createData = {
      mini_cat_name, // Match frontend field name
      nested_cat_id: req.body.nested_cat_id,
      min_price: parseFloat(min_price),
      max_price: parseFloat(max_price),
      mini_cat_image: data.secure_url,
      offer_id: req.body.offer_id || null,
      //tag: tag || null, 
      tag: tag || "",
    };

    console.log("Data prepared for mini category creation:", createData);

    // Create mini category
    const miniCat = await miniCatModel.create(createData);

    console.log("Mini category created successfully:", miniCat);

    return res.status(201).json({
      success: true,
      message: "Mini category created successfully",
      data: miniCat,
    });
  } catch (err) {
    console.error("Error occurred while creating mini category:", err);
    return res.status(500).json({
      success: false,
      message: "Error creating mini category",
      error: err.message,
    });
  }
};

// Get all mini categories
const getAllMiniCat = async (req, res) => {
  try {
    console.log("Fetching all mini categories from the database...");

    const miniCats = await miniCatModel.find().populate({
      path: "nested_cat_id",
      populate: {
        path: "sub_cat_id",
        populate: {
          path: "s_id",
        },
      },
    });

    if (!miniCats || miniCats.length === 0) {
      console.warn("No mini categories found in the database.");
      return res.status(200).json({
        success: true,
        message: "Mini categories fetched successfully",
        data: [],
      });
    }

    console.log("Mini categories fetched successfully:", miniCats);

    return res.status(200).json({
      success: true,
      message: "Mini categories fetched successfully",
      data: miniCats,
    });
  } catch (err) {
    console.error("Error fetching mini categories:", err);
    return res.status(500).json({
      success: false,
      message: "Error fetching mini categories",
      error: err.message,
    });
  }
};

// Update a mini category by ID
const updateMiniCatById = async (req, res) => {
  try {
    const id = req.params.id;

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid mini category ID",
      });
    }

    // Validate fields
    const { mini_cat_name, min_price, max_price, nested_cat_id, offer_id, tag } = req.body;

    if (nested_cat_id && !mongoose.Types.ObjectId.isValid(nested_cat_id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid nested_cat_id",
      });
    }
    if (offer_id && !mongoose.Types.ObjectId.isValid(offer_id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid offer_id",
      });
    }
    if (min_price && (isNaN(min_price) || min_price < 0)) {
      return res.status(400).json({
        success: false,
        message: "Minimum price must be a positive number",
      });
    }
    if (max_price && (isNaN(max_price) || max_price < 0)) {
      return res.status(400).json({
        success: false,
        message: "Maximum price must be a positive number",
      });
    }
    if (min_price && max_price && parseFloat(min_price) > parseFloat(max_price)) {
      return res.status(400).json({
        success: false,
        message: "Minimum price cannot be greater than maximum price",
      });
    }

    // Handle file upload if present
    let mini_cat_image = undefined;
    if (req.files && req.files.mini_cat_image) {
      const photo = req.files.mini_cat_image;
      const data = await fileUploadService(photo.tempFilePath);
      if (!data.secure_url) {
        throw new Error("File upload failed, no secure URL");
      }
      mini_cat_image = data.secure_url;

      // Clean up temporary file
      await fs.unlink(photo.tempFilePath).catch((err) =>
        console.error("Failed to delete temp file:", err)
      );
    }

    const updateData = {
      ...(mini_cat_name && { mini_cat_name }),
      ...(nested_cat_id && { nested_cat_id }),
      ...(min_price && { min_price: parseFloat(min_price) }),
      ...(max_price && { max_price: parseFloat(max_price) }),
      ...(mini_cat_image && { mini_cat_image }),
      ...(offer_id && { offer_id }),
      ...(tag !== undefined && { tag }),
    };

    const miniCat = await miniCatModel.findByIdAndUpdate(id, updateData, { new: true });

    if (!miniCat) {
      return res.status(404).json({
        success: false,
        message: "Mini category not found",
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Mini category updated successfully",
      data: miniCat,
    });
  } catch (err) {
    console.error("Error updating mini category:", err);
    return res.status(500).json({
      success: false,
      message: "Error updating mini category",
      error: err.message,
    });
  }
};

// Delete a mini category by ID
const deleteMiniCatById = async (req, res) => {
  try {
    const id = req.params.id;

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid mini category ID",
      });
    }

    const miniCat = await miniCatModel.findByIdAndDelete(id);

    if (!miniCat) {
      return res.status(404).json({
        success: false,
        message: "Mini category not found",
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Mini category deleted successfully",
      data: miniCat,
    });
  } catch (err) {
    console.error("Error deleting mini category:", err);
    return res.status(500).json({
      success: false,
      message: "Error deleting mini category",
      error: err.message,
    });
  }
};

// Get mini categories by nested category ID
const getMini = async (req, res) => {
  try {
    const nestedCatId = req.params.id;

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(nestedCatId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid nested category ID",
      });
    }

    const miniCats = await miniCatModel.find({ nested_cat_id: nestedCatId });

    if (miniCats.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No mini categories found for this nested category",
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Mini categories fetched successfully",
      data: miniCats,
    });
  } catch (err) {
    console.error("Error fetching mini categories:", err);
    return res.status(500).json({
      success: false,
      message: "Error fetching mini categories",
      error: err.message,
    });
  }
};

// Get a mini category by ID
const getMiniCatByID = async (req, res) => {
  try {
    const id = req.params.id;

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid mini category ID",
      });
    }

    const miniCats = await miniCatModel.find({ _id: id });

    if (miniCats.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Mini category not found",
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Mini category fetched successfully",
      data: miniCats[0], // Since we're querying by ID, return the first item
    });
  } catch (err) {
    console.error("Error fetching mini category:", err);
    return res.status(500).json({
      success: false,
      message: "Error fetching mini category",
      error: err.message,
    });
  }
};

// Get mini categories by tag
const getMiniBytag = async (req, res) => {
  try {
    const tag = req.params.tag;

    // Validate tag
    if (!tag || typeof tag !== "string") {
      return res.status(400).json({
        success: false,
        message: "Tag must be a non-empty string",
      });
    }

    const miniCats = await miniCatModel.find({ tag });

    if (miniCats.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No mini categories found with this tag",
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Mini categories fetched successfully",
      data: miniCats,
    });
  } catch (err) {
    console.error("Error fetching mini categories by tag:", err);
    return res.status(500).json({
      success: false,
      message: "Error fetching mini categories by tag",
      error: err.message,
    });
  }
};

module.exports = {
  addMiniCat,
  getAllMiniCat,
  updateMiniCatById,
  deleteMiniCatById,
  getMini,
  getMiniCatByID,
  getMiniBytag,
};
