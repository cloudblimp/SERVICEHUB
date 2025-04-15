const spDocController = require('../../controller/doc/SpDocumentController')

const router = require('express').Router()

router.post("/addSpDoc",spDocController.addSpDoc)
router.get("/getAllSpDoc",spDocController.getAllSpDoc)



module.exports = router

