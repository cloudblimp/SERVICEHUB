const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  sp_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SP_Table",
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User_Table",
  },
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service_Req_Table",
  },
  chat_date: {
    type: Date,
  },
});

module.exports = mongoose.model("Chat_Table", chatSchema);
