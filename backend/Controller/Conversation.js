const conversation = require("../Schema/Conversation");
const user = require("../Schema/UserSchema");

const createConversation = async (req, res) => {
  const { userId } = req.body;
  const currentUserId = req.userData._id;
  try {
    const existingConversation = await conversation.findOne({
      users: { $all: [currentUserId, userId] },
    });

    if (existingConversation) {
      return res.status(200).json({
        success: true,
        message: "Conversation already exists",
        data: existingConversation._id,
      });
    } else {
      const newConversation = new conversation({
        users: [currentUserId, userId],
      });

      await newConversation.save();

      return res.status(201).json({
        success: true,
        message: "Conversation created successfully",
        data: newConversation._id,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getUserDetails = async (req, res) => {
  const { conversationId } = req.body;
  const userData = req.userData;

  try {
    const findUser = await conversation.findById(conversationId);

    if (!findUser) {
      return res.status(404).json({
        success: false,
        message: "No user found",
      });
    }

    const otherUsers = await findUser.users.find(
      (id) => id.toString() !== userData._id.toString()
    );

    const getUserDetails = await user
      .findById(otherUsers.toString())
      .select("-password");

    return res.status(201).json({
      success: true,
      message: getUserDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createConversation,
  getUserDetails,
};
