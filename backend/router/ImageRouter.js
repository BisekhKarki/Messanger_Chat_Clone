const express = require("express");
const validateUser = require("../middleware/ProtectRoute");
const router = express.Router();
const multer = require("multer");
const { sendImages } = require("../Controller/Message");
// const path = require("path");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();

// const uploadDir = path.join(__dirname, "../uploads");

// // Setting up the storage
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, uploadDir); // Folder to store uploaded images
//   },
//   filename: function (req, file, cb) {
//     const uniqueName = `${Date.now()}-${file.originalname}`;
//     cb(null, uniqueName);
//   },
// });

const upload = multer({ storage });

router.post("/send", upload.single("image"), validateUser, sendImages);

module.exports = router;
