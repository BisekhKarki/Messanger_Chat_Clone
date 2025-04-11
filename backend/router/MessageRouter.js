const express = require("express");
const router = express.Router();
const { sendMessage, getAllMessage } = require("../Controller/Message");
const validateUser = require("../middleware/ProtectRoute");

router.post("/send", validateUser, sendMessage);
router.get("/get/:id", validateUser, getAllMessage);

module.exports = router;
