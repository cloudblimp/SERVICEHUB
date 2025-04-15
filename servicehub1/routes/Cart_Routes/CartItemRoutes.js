const cartItemController = require('../../controller/carts/CartItemController')

const router = require('express').Router()

router.post("/addCartItem",cartItemController.addCartItem)
router.get("/getAllCartItem",cartItemController.getAllCartItem)



module.exports = router

