const express = require("express");
const {
  getAllUser,
  getSingleUser,
} = require("../Controller/UserDetailsController");
const validateUser = require("../middleware/ProtectRoute");
const router = express.Router();

router.get("/user", validateUser, getAllUser);
router.get("/single", validateUser, getSingleUser);

module.exports = router;
