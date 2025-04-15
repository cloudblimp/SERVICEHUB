const feedbackController = require("../controller/FeedbackController");

const router = require("express").Router();

router.post("/addFeedback", feedbackController.addFeedback);
router.get("/getAllFeedback", feedbackController.getAllFeedback);
router.get("/getByFeedbackID/:id", feedbackController.getByFeedbackID);

module.exports = router;
