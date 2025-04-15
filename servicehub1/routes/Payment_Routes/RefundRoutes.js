const refundController = require('../../controller/payments/RefundController')

const router = require('express').Router()

router.post("/addRefund",refundController.addRefund)
router.get("/getAllRefund",refundController.getAllRefund)


module.exports = router

