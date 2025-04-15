const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema({
  sub_category_name: {
    type: String,

    required: true,
  },
  photo: {
    type: String,
    maxlength: 250,
  },
  s_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service_Category_Table",
  },
});

module.exports = mongoose.model("Sub_Cat_Table", subCategorySchema);
