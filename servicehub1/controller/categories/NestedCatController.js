const nestCatModel = require("../../model/category/Nested_Cat_tbl");

const addNestCat = async (req, res) => {
  // Validate request body
  const { nest_category_name, sub_cat_id } = req.body;
  if (!nest_category_name || !sub_cat_id) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields: nest_category_name or sub_cat_id",
    });
  }

  try {
    // Create a new nested category
    const Nestedcat = await nestCatModel.create({
      nest_category_name,
      sub_cat_id,
    });

    // Return success response
    return res.status(201).json({
      success: true,
      message: "Nested Cat created successfully!",
      data: Nestedcat,
    });
  } catch (error) {
    // Handle database errors
    console.error("Error creating nested category:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while creating the nested category",
      error: error.message, // Optionally, provide more details about the error
    });
  }
};

const getAllNestCat = async (req, res) => {
  try {
    const user = await nestCatModel.find();
    if (user) {
      res.status(201).json({
        message: "Nested Category get successfully",
        data: user,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const updateNestCatById = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await nestCatModel.findByIdAndUpdate(id, req.body);

    if (user) {
      res.status(201).json({
        message: "Nest Category updated successfully",
        data: user,
      });
    } else {
      res.status(404).json({
        message: "Nest category not found",
        data: [],
      });
    }
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

const deleteNestCatById = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await nestCatModel.findByIdAndDelete(id, req.body);

    if (user) {
      res.status(201).json({
        message: "Nested Category deleted successfully",
        data: user,
      });
    } else {
      res.status(404).json({
        message: "Nested Category not found",
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
  addNestCat,
  getAllNestCat,
  updateNestCatById,
  deleteNestCatById,
};
