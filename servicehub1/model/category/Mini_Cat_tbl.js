const mongoose = require("mongoose");

const miniCategorySchema = new mongoose.Schema({
  mini_cat_name: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    required: true,
  },

  nested_cat_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Nested_Cat_Table",
  },
  min_price: {
    type: Number,
    required: true,
    min: 0,
    max: 99999.99,
  },
  max_price: {
    type: Number,
    required: true,
    min: 0,
    max: 99999.99,
  },
  mini_cat_image: {
    type: String,
    required: true,
  },
  offer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Offer_Table",
    required: false,
  },
});

module.exports = mongoose.model("Mini_Cat_Table", miniCategorySchema);
