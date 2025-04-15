const catController = require("../../controller/categories/ServiceCatController");
const router = require("express").Router();

router.post("/addCat", catController.addCat);
router.get("/getAllCat", catController.getAllCat);
router.get("/getCatById/:id", catController.getCatById);
router.put("/updateCatById/:id", catController.updateCatById);
router.delete("/deleteCatById/:id", catController.deleteCatById);
module.exports = router;
