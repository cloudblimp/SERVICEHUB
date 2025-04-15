const spController = require("../../controller/user/ServiceProviderController");

const router = require("express").Router();

router.post("/addSp", spController.addSp);
router.get("/getAllSp", spController.getAllSp);
router.post("/loginSp", spController.loginSp);
router.put("/updateSp/:id", spController.updateSp);
router.get("/getSpById/:id", spController.getSpById);
router.post("/changePassword", spController.changePassword);

router.delete("/deleteSpById/:id", spController.deleteSpById);

module.exports = router;
