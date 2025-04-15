const mongoose = require("mongoose");

const NestCategorySchema = new mongoose.Schema({
  nest_category_name: {
    type: String,
    required: true,
  },

  sub_cat_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Sub_Cat_Table",
  },
});

module.exports = mongoose.model("Nested_Cat_Table", NestCategorySchema);
