const express = require("express");
const UserSchema = require("../Schema/UserSchema");

const getAllUser = async (req, res) => {
  try {
    const userData = req.userData;

    const getUsers = await UserSchema.find({}).select("-password");

    if (!getUsers) {
      return res.status(400).json({
        success: false,
        message: "No users found",
      });
    }

    const filterUsers = await getUsers.filter(
      (user) => user._id !== userData._id
    );

    if (!filterUsers) {
      return res.status(400).json({
        success: false,
        message: "No users found",
      });
    }

    return res.status(200).json({
      success: true,
      message: filterUsers,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAllUser,
};
