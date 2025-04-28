const messageSchema = require("../Schema/Message");
const conversation = require("../Schema/Conversation");
const cloudinary = require("cloudinary").v2;

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

const sendImages = async (req, res) => {
  // console.log(req.body);
  const { conversationId, receiverId } = req.body;
  const userData = req.userData;

  try {
    const findConversation = await conversation.findById(conversationId);

    if (!findConversation) {
      return res.status(400).json({
        success: false,
        message: "Conversation do not exists",
      });
    }
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image provided",
      });
    }

    // const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
    //   req.file.filename
    // }`;

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "chat-images",
          resource_type: "auto",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(req.file.buffer);
    });

    const newMessage = new messageSchema({
      conversationId: conversationId,
      senderId: userData._id,
      receiverId: receiverId,
      message: result.secure_url,
      messageType: "Image",
    });

    await newMessage.save();

    return res.status(200).json({
      success: true,
      message: "Sent",
      newConversation: newMessage,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteMessage = async (req, res) => {
  const { id } = req.params;

  try {
    const message = await messageSchema.findByIdAndDelete(id);
    if (!message) {
      return res.status(400).json({
        success: false,
        message: "No message found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Message Deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const editMessage = async (req, res) => {
  const { id } = req.params;
  const { message } = req.body;

  try {
    const messageGet = await messageSchema.findByIdAndUpdate(id, {
      message: message,
    });
    if (!messageGet) {
      return res.status(400).json({
        success: false,
        message: "No message found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Message Updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const lastMessage = async (req, res) => {
  const userData = req.userData;
  const { otherUser } = req.body;
  try {
    const conversations = await conversation.findOne({
      users: [userData._id, otherUser],
    });

    if (conversations) {
      const messages = await messageSchema.find({
        conversationId: conversations._id,
      });

      return res.status(200).json({
        success: true,
        message: messages,
      });
    } else {
      return res.status(200).json({
        success: true,
        message: [],
      });
    }
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
  sendImages,
  deleteMessage,
  editMessage,
  lastMessage,
};
