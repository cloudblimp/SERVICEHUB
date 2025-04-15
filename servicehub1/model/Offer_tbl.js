const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 20,
  },
  description: {
    type: String,
    required: true,
    maxlength: 255,
  },
  start_date: {
    type: Date,
    required: true,
  },
  end_date: {
    type: String,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
    maxlength: 2,
  },
  Created_at: {
    type: String,
  },
  Update_at: {
    type: String,
  },
});

module.exports = mongoose.model("Offer_Table", offerSchema);
