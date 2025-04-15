const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User_Table",
  },
  added_at: {
    type: Date,
    default: Date.now(),
    required: true,
  },
});

module.exports = mongoose.model("Cart_Table", cartSchema);
