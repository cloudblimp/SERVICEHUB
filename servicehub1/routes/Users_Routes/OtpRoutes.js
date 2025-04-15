const userController = require("../../controller/user/OtpController");

const router = require("express").Router();

router.post("/addOtp", userController.addOtp);
router.get("/getOtp/:id", userController.getOtp);

module.exports = router;
