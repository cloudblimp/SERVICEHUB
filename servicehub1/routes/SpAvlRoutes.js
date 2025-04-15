const spAvlController = require("../controller/SpAvlController");

const router = require("express").Router();

router.post("/addSpAvl", spAvlController.addSpAvl);
router.get("/getAllSpAvl", spAvlController.getAllSpAvl);
router.get("/getSpAvl/:id", spAvlController.getSpAvl);
router.put("/updateSpAvlById/:id/:day", spAvlController.updateSpAvlById);
router.delete("/deleteSpAvlById/:id", spAvlController.deleteSpAvlById);
module.exports = router;
