const express = require("express");
const { getAllUser } = require("../Controller/UserDetailsController");
const validateUser = require("../middleware/ProtectRoute");
const router = express.Router();

router.get("/user", validateUser, getAllUser);

module.exports = router;
