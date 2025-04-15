const cartController = require('../../controller/carts/CartController')

const router = require('express').Router()

router.post("/addCart",cartController.addCart)
router.get("/getAllCart",cartController.getAllCart)



module.exports = router

