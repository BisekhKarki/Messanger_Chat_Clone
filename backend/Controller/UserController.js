const express = require("express");
const UserSchema = require("../Schema/UserSchema");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { name, email, password, phone, gender, date_of_birth } = req.body;
  console.log(req.body);
  console.log(req.file);
  try {
    const checkUser = await UserSchema.findOne({ email: req.body.email });
    if (checkUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    if (req.body.password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be of minimum 8 characters",
      });
    }

    const hashedPassword = await bcryptjs.hash(req.body.password, 10);
    const newUser = new UserSchema({
      name,
      email,
      password: hashedPassword,
      phone,
      gender,
      date_of_birth,
      image: "",
    });
    await newUser.save();

    if (!newUser) {
      res.status(400).json({
        success: false,
        message: "Failed to save user",
      });
    }

    res.status(200).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const generateToken = async (data) => {
  return jwt.sign({ data }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const findUser = await UserSchema.findOne({ email });
    if (!findUser) {
      return res.status(404).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const comparePassword = await bcryptjs.compare(password, findUser.password);
    if (!comparePassword) {
      return res.status(404).json({
        success: false,
        message: "Incorrect password",
      });
    }
    const user = await UserSchema.findOne({ email }).select("-password");

    const token = await generateToken(user);

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
