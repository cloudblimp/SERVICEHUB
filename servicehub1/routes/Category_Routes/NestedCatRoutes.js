const nestCatController = require("../../controller/categories/NestedCatController");

const router = require("express").Router();

router.post("/addNestCat", nestCatController.addNestCat);
router.get("/getAllNestCat", nestCatController.getAllNestCat);
router.put("/updateNestCatById/:id", nestCatController.updateNestCatById);
router.delete("/deleteNestCatById/:id", nestCatController.deleteNestCatById);

module.exports = router;
