const express = require("express");
const router = express.Router();
const {
  createConversation,
  getUserDetails,
} = require("../Controller/Conversation");
const validateUser = require("../middleware/ProtectRoute");

router.post("/create", validateUser, createConversation);
router.post("/userDetails", validateUser, getUserDetails);

module.exports = router;
