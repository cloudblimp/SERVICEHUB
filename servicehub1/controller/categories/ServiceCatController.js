const fileUpload = require("../../fileUploadService");
const spCatModel = require("../../model/category/Service_cat_tbl");

const addCat = async (req, res) => {
  const photo = req.files.photo;

  if (!photo) {
    return res
      .status(400)
      .json({ success: false, message: "No photo uploaded" });
  }

  console.log("addCat:", req.body);

  try {
    const data = await fileUpload(photo.tempFilePath);

    const cat = await spCatModel.create({
      service_name: req.body.service_name,
      photo: data.secure_url,
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

const getAllCat = async (req, res) => {
  try {
    const user = await spCatModel.find();
    console.log(user);
    if (user) {
      res.status(201).json({
        message: "Category get successfully",
        data: user,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
const updateCatById = async (req, res) => {
  const id = req.params.id;
  const photo = req.files;
  console.log(id, photo);
  try {
    let updatedCatData = { service_name: req.body.service_name };

    // Check if a new photo is uploaded
    if (photo) {
      const uploadedPhoto = await fileUpload(photo.tempFilePath);
      updatedCatData.photo = uploadedPhoto.secure_url;
    }

    console.log(updatedCatData);

    const updatedCat = await spCatModel.findByIdAndUpdate(id, updatedCatData, {
      new: true,
    });

    if (updatedCat) {
      res.status(200).json({
        success: true,
        message: "Category updated successfully",
        data: updatedCat,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Category not found",
        data: [],
      });
    }
  } catch (err) {
    console.error("Error updating category:", err);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the category",
      error: err.message,
    });
  }
};

const deleteCatById = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await spCatModel.findByIdAndDelete(id, req.body);

    if (user) {
      res.status(201).json({
        message: "Category deleted successfully",
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
const getCatById = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await spCatModel.findById(id);

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
  addCat,
  getAllCat,
  updateCatById,
  deleteCatById,
  getCatById,
};
