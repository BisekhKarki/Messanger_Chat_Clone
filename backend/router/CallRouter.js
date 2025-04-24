const express = require("express");
const validateUser = require("../middleware/ProtectRoute");
const {
  sendCallRequest,
  callRequestUpdate,
} = require("../Controller/CallController");
const router = express.Router();

router.post("/send", validateUser, sendCallRequest);
router.patch("/:requestId/update", validateUser, callRequestUpdate);

module.exports = router;
