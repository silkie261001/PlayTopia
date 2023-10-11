const memoryGameController = require("../controllers/memoryGameController");
const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();

//routes for chatBot
router.get("/memorygame", auth, memoryGameController().index);

module.exports = router;
