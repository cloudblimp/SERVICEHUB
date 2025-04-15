const chatController = require("../../controller/chats/ChatController");

const router = require("express").Router();

router.post("/addChat", chatController.addChat);
router.get("/getAllChat", chatController.getAllChat);
router.get("/checkExistingChat", chatController.checkExistingChat);
router.get("/getchatbyID/:spid", chatController.getchatbyID);

module.exports = router;
