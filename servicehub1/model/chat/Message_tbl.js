const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  Chat_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chat_Table",
  },
  Sender_id: {
    type: mongoose.Schema.Types.ObjectId,
    maxlength: 24,
    required: true,
    ref: "SP_Table",
    ref: "User_Table",
  },
  receiver_id: {
    type: mongoose.Schema.Types.ObjectId,
    maxlength: 24,
    required: true,
    ref: "SP_Table",
    ref: "User_Table",
  },
  content: {
    type: String,
    required: true,
  },
  message_time: {
    type: Date,
    default: Date.now(),
    required: true,
  },
});

module.exports = mongoose.model("Message_Table", messageSchema);
