const serviceController = require("../../controller/service/ServiceController");

const router = require("express").Router();

router.post("/addService", serviceController.addService);
router.get("/getAllService", serviceController.getAllService);
router.put("/updateServiceById/:id", serviceController.updateServiceById);
router.delete("/deleteServiceById/:id", serviceController.deleteServiceById);
router.get("/getServiceByMini/:id", serviceController.getServiceByMini);
router.get("/getService/:id", serviceController.getService);
router.get("/getServiceByID/:id", serviceController.getServiceByID);

module.exports = router;
