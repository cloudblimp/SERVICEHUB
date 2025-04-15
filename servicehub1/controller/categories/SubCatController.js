const fileUplaodService = require("../../fileUploadService");
const subCatModel = require("../../model/category/Sub_Cat_tbl");
const mongoose = require("mongoose");
const addSubCat = async (req, res) => {
  const photo = req.files.photo;

  if (!photo) {
    return res
      .status(400)
      .json({ success: false, message: "No photo uploaded" });
  }

  console.log("addSubCat:", req.body);

  try {
    const data = await fileUplaodService(photo.tempFilePath);

    const cat = await subCatModel.create({
      sub_category_name: req.body.sub_category_name,
      photo: data.secure_url,
      s_id: req.body.s_id,
    });

    return res.status(201).json({
      success: true,
      message: "Cat created successfully!",
      data: cat,
    });
  } catch (error) {
    // Handle any errors that occur during category creation
    console.error("Error creating category:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while creating the category",
    });
  }
};

const getAllSubCat = async (req, res) => {
  try {
    const user = await subCatModel.find();
    if (user) {
      res.status(201).json({
        message: "Sub Category get successfully",
        data: user,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
const updateSubCatById = async (req, res) => {
  const id = req.params.id;
  const photo = req.files;
  try {
    const user = await subCatModel.findByIdAndUpdate(id, req.body);

    if (user) {
      res.status(201).json({
        message: "Sub Category updated successfully",
        data: user,
      });
    } else {
      res.status(404).json({
        message: "sub category not found",
        data: [],
      });
    }
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

const deleteSubCatById = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await subCatModel.findByIdAndDelete(id, req.body);

    if (user) {
      res.status(201).json({
        message: "Sub Category deleted successfully",
        data: user,
      });
    } else {
      res.status(404).json({
        message: "Sub Category not found",
        data: [],
      });
    }
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
const getSubCatById = async (req, res) => {
  // console.log("subcategori", req.params.id);
  try {
    const subcategories = await subCatModel.find({
      s_id: req.params.id,
    });
    console.log("subcategori", subcategories);
    if (subcategories && subcategories.length > 0) {
      res.status(200).json({
        message: "Subcategories fetched successfully",
        data: subcategories,
      });
    } else {
      res.status(404).json({
        message: "Subcategories not found",
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
  addSubCat,
  getAllSubCat,
  updateSubCatById,
  deleteSubCatById,
  getSubCatById,
};
