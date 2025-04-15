const chatModel = require("../../model/chat/Chat_tbl");

const addChat = async (req, res) => {
  const user = req.body;

  try {
    // Check if the chat entry already exists for the given user_id and sp_id
    const existingChat = await chatModel.findOne({
      user_id: user.user_id,
      sp_id: user.sp_id,
      order_id: user.order_id,
      chat_date: user.chat_date,
    });

    // If the chat entry already exists, send a response indicating that it's a duplicate
    if (existingChat) {
      return res.status(200).json({
        message: "Chat entry already exists for the provided user_id and sp_id",
        data: existingChat,
      });
    } else {
      const saveUser = await chatModel.create({
        user_id: user.user_id,
        sp_id: user.sp_id,
        order_id: user.order_id,
        chat_date: user.chat_date,
      });

      if (saveUser) {
        return res.status(201).json({
          message: "Chat created successfully...",
          data: saveUser,
        });
      }
    }
  } catch (err) {
    res.status(500).json({
      message: "Error creating Chat",
      error: err.message,
    });
  }
};

const getAllChat = async (req, res) => {
  try {
    const data = {
      sp_id: "657d9c20dc39e076811ad0a5",
      user_id: "657d942fe9321cd96a1b8428",
      chat_date: new Date(),
    };

    let addNewdata = await chatModel.create({
      ...data,
    });

    // console.log(addNewdata);
    let user = await chatModel.find({});
    // console.log(user);
    if (user.length !== 0) {
      res.status(201).json({
        message: "Chat get successfully",
        data: user,
      });
    } else {
      res.status(201).json({
        success: false,
        message: "No message",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
const checkExistingChat = async (req, res) => {
  const { user_id, sp_id } = req.body;
  try {
    const existingChat = await chatModel.findOne({ user_id, sp_id });
    res.json({ exists: !!existingChat, chat: existingChat });
  } catch (error) {
    console.error("Error checking chat existence:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const getchatbyID = async (req, res) => {
  const { spid } = req.params;
  try {
    const chatdata = await chatModel
      .findOne({ sp_id: spid })
      .populate({
        path: "order_id",
        populate: {
          path: "service_id",
          populate: {
            path: "mini_cat_id",
          },
        },
      })
      .populate("sp_id user_id");
    res.status(200).json({ message: "Successfull", data: chatdata });
  } catch (error) {
    console.error("Error checking chat existence:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = {
  addChat,
  getAllChat,
  checkExistingChat,
  getchatbyID,
};
