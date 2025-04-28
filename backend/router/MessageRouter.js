const express = require("express");
const router = express.Router();
const {
  sendMessage,
  getAllMessage,
  deleteMessage,
  editMessage,
  lastMessage,
} = require("../Controller/Message");
const validateUser = require("../middleware/ProtectRoute");

router.post("/send", validateUser, sendMessage);
router.get("/get/:id", validateUser, getAllMessage);
router.delete("/delete/:id", validateUser, deleteMessage);
router.patch("/edit/:id", validateUser, editMessage);
router.post("/last", validateUser, lastMessage);

module.exports = router;
