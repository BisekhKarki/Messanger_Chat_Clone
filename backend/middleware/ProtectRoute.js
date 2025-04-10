const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");

const validateUser = async (req, res, next) => {
  try {
    const tokenValue = req.headers.authorization;
    console.log(tokenValue);
    if (!tokenValue) {
      return res.redirect("/login");
    }
    const token = tokenValue.split(" ")[1];

    if (!token) {
      return res.redirect("/login");
    }

    const decodedUser = jwt.decode(token, process.env.JWT_SECRET);

    if (!decodedUser || !decodedUser.data._id) {
      return res.redirect("/login");
    }

    // console.log(decodedUser.data);
    req.userData = decodedUser.data;

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = validateUser;
