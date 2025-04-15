const docController = require("../../controller/doc/DocumentController");

const router = require("express").Router();

router.post("/addDoc", docController.addDoc);
router.get("/getAllDoc", docController.getAllDoc);
router.put("/updateDocById/:id", docController.updateDocById);
router.delete("/deleteDocById/:id", docController.deleteDocById);
module.exports = router;
