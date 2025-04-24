const express = require("express");
const validateUser = require("../middleware/ProtectRoute");
const router = express.Router();
const multer = require("multer");
const { sendImages } = require("../Controller/Message");

// Setting up the storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Folder to store uploaded images
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

router.post("/send", upload.single("image"), validateUser, sendImages);

module.exports = router;
