const miniCatModel = require("../../model/category/Mini_Cat_tbl");
const fileUplaodService = require("../../fileUploadService");

const addMiniCat = async (req, res) => {
  const photo = req.files.mini_cat_image;

  if (!photo) {
    return res
      .status(400)
      .json({ success: false, message: "No photo uploaded" });
  }

  try {
    const data = await fileUplaodService(photo.tempFilePath);

    const Minicat = await miniCatModel.create({
      mini_cat_name: req.body.mini_category_name,
      nested_cat_id: req.body.nested_cat_id,
      min_price: req.body.min_price,
      max_price: req.body.max_price,
      mini_cat_image: data.secure_url,
      offer_id: req.body.offer_id,
      tag: req.body.tag,
    });

    return res.status(201).json({
      success: true,
      message: "Cat created successfully!",
      data: Minicat,
    });
  } catch (err) {
    res.status(500).json({
      message: "error to create mini category",
      error: err.message,
    });
  }
};

const getAllMiniCat = async (req, res) => {
  try {
    const user = await miniCatModel.find().populate({
      path: "nested_cat_id",
      populate: {
        path: "sub_cat_id",
        populate: {
          path: "s_id",
        },
      },
    });

    if (user) {
      res.status(201).json({
        message: "Mini Category get successfully",
        data: user,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
const updateMiniCatById = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await miniCatModel.findByIdAndUpdate(id, req.body);

    if (user) {
      res.status(201).json({
        message: "Mini Category updated successfully",
        data: user,
      });
    } else {
      res.status(404).json({
        message: "Mini category not found",
        data: [],
      });
    }
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

const deleteMiniCatById = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await miniCatModel.findByIdAndDelete(id, req.body);

    if (user) {
      res.status(201).json({
        message: "Mini Category deleted successfully",
        data: user,
      });
    } else {
      res.status(404).json({
        message: "Mini Category not found",
        data: [],
      });
    }
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

const getMini = async (req, res) => {
  try {
    const user = await miniCatModel.find({
      nested_cat_id: req.params.id,
    });

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
const getMiniCatByID = async (req, res) => {
  try {
    const user = await miniCatModel.find({
      _id: req.params.id,
    });

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
const getMiniBytag = async (req, res) => {
  try {
    const user = await miniCatModel.find({
      tag: req.params.tag,
    });

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
  addMiniCat,
  getAllMiniCat,
  updateMiniCatById,
  deleteMiniCatById,
  getMini,
  getMiniCatByID,
  getMiniBytag,
};
