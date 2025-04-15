const yoeController = require('../controller/YoeController')

const router = require('express').Router()

router.post("/addYoe",yoeController.addYoe)
router.get("/getAllYoe",yoeController.getAllYoe)



module.exports = router

