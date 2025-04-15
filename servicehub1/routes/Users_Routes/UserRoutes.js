const userController = require("../../controller/user/UserController");

const router = require("express").Router();

router.post("/addUser", userController.addUser);
router.get("/getAllUser", userController.getAllUser);
router.post("/loginUser", userController.loginUser);
router.post("/forgotPassword", userController.forgotPassword);
router.put("/updatePassword", userController.updatePassword);
router.get("/getuserdetails", userController.getuserdetails);
router.get("/getUserById/:id", userController.getUserById);
router.put("/updateUserById/:id", userController.updateUserById);
router.delete("/deleteUserById/:id", userController.deleteUserById);
module.exports = router;
