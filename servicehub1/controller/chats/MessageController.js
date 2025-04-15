const messageModel = require("../../model/chat/Message_tbl");
const userModel = require("../../model/userModels/User_tbl");
const spModel = require("../../model/userModels/Sp_tbl");
const addMessage = async (req, res) => {
  const user = req.body;
  try {
    const savedOffer = await messageModel.create({
      Chat_id: user.chat_id,
      Sender_id: user.Sender_id,
      receiver_id: user.receiver_id,
      content: user.chats[0].text,
    });

    if (savedOffer) {
      res.status(201).json({
        message: "message created successfully...",
        data: savedOffer,
      });
    } else {
      res.status(500).json({
        message: "Error creating message",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Error creating message",
      error: err.message,
    });
  }
};

const getAllMessage = async (req, res) => {
  try {
    const users = await messageModel.find().populate({
      path: "Chat_id",
      populate: [
        { path: "user_id", model: userModel },
        { path: "sp_id", model: spModel },
      ],
    });

    const populatedUsers = users.map((user) => {
      const chat = user.Chat_id._id;
      if (chat) {
        // Check if sender_id matches user_id or sp_id in the chat
        if (user.Sender_id === chat.user_id._id) {
          // Populate sender_id with user_id data
          user.sender_id = chat.user_id;
        } else if (user.sender_id === chat.sp_id) {
          // Populate sender_id with sp_id data
          user.sender_id = chat.sp_id;
        }
      }
      console.log(user);
      return user;
    });

    res.status(200).json({
      message: "Messages retrieved successfully",
      data: populatedUsers,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving messages",
      error: error.message,
    });
  }
};

module.exports = {
  addMessage,
  getAllMessage,
};
