const express = require("express");
const { processPrompt } = require("../controllers/playlistController");

const router = express.Router();

router.post("/process-prompt", processPrompt);

module.exports = router;
