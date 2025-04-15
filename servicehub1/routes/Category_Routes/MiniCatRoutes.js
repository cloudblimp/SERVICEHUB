const miniCatController = require("../../controller/categories/MiniCatController");

const router = require("express").Router();

router.post("/addMiniCat", miniCatController.addMiniCat);
router.get("/getAllMiniCat", miniCatController.getAllMiniCat);
router.put("/updateMiniCatById/:id", miniCatController.updateMiniCatById);
router.delete("/deleteMiniCatById/:id", miniCatController.deleteMiniCatById);
router.get("/getMini/:id", miniCatController.getMini);
router.get("/getMiniCatByID/:id", miniCatController.getMiniCatByID);
router.get("/getMiniBytag/:tag", miniCatController.getMiniBytag);
module.exports = router;
