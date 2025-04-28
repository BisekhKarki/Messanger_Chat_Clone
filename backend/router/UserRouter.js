const express = require("express");
const {
  registerUser,
  loginUser,
  getUser,
} = require("../Controller/UserController");
const validateUser = require("../middleware/ProtectRoute");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/get", validateUser, getUser);

module.exports = router;
