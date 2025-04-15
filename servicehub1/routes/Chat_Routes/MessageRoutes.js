const messageController = require('../../controller/chats/MessageController')

const router = require('express').Router()

router.post("/addMessage",messageController.addMessage)
router.get("/getAllMessage",messageController.getAllMessage)


module.exports = router

