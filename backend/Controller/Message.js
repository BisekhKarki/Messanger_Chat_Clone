const messageSchema = require("../Schema/Message");
const conversation = require("../Schema/Conversation");

const sendMessage = async (req, res) => {
  const { conversationId, receiverId, message } = req.body;
  const userData = req.userData;
  try {
    const findConversation = await conversation.findById(conversationId);

    if (!findConversation) {
      return res.status(400).json({
        success: false,
        message: "Conversation do not exists",
      });
    }

    const newMessage = new messageSchema({
      conversationId: conversationId,
      senderId: userData._id,
      receiverId: receiverId,
      message: message,
    });

    await newMessage.save();

    return res.status(200).json({
      success: true,
      message: "Sent",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllMessage = async (req, res) => {
  const { id } = req.params;
  try {
    const findConversation = await messageSchema
      .find({ conversationId: id })
      .sort({ createdAt: 1 });

    return res.status(200).json({
      success: true,
      message: findConversation,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  sendMessage,
  getAllMessage,
};
