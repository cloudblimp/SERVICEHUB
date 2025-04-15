const subCatController = require("../../controller/categories/SubCatController");

const router = require("express").Router();

router.post("/addSubCat", subCatController.addSubCat);
router.get("/getAllSubCat", subCatController.getAllSubCat);
router.put("/updateSubCatById/:id", subCatController.updateSubCatById);
router.delete("/deleteSubCatById/:id", subCatController.deleteSubCatById);
router.get("/getSubCatById/:id", subCatController.getSubCatById);

module.exports = router;
