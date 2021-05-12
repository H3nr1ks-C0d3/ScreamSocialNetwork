const express = require("express")
const router = express.Router()
const feedController = require("../controllers/feed")
const { ensureAuth, ensureGuest } = require("../middleware/auth")

router.get("/", ensureAuth, feedController.getContent)
router.post("/postScream", feedController.postScream)
router.put("/likePost/:id", feedController.likePost)
router.put("/rescreamPost/:id", feedController.rescream)

module.exports = router