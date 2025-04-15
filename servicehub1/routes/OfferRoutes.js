const offerController = require("../controller/OfferController");

const router = require("express").Router();

router.post("/addOffer", offerController.addOffer);
router.get("/getAllOffer", offerController.getAllOffer);
router.put("/updateOfferById/:id", offerController.updateOfferById);
router.delete("/deleteOfferById/:id", offerController.deleteOfferById);
router.get("/OfferForService", offerController.OfferForService);
module.exports = router;
