const animatedGameController = require("../controllers/2048animated");
const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();

//routes for chatBot
router.get("/animated", auth, animatedGameController().index);

module.exports = router;
