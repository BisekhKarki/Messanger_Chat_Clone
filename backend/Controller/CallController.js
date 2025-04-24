const { pusherServer } = require("../lib/pusher");
const CallRequestSchema = require("../Schema/CallRequestSchema");
const Pusher = require("pusher");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.NEXT_PUBLIC_PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
  useTLS: true,
});

const sendCallRequest = async (req, res) => {
  const { calleeId, channelName } = req.body;
  const userData = req.userData;

  try {
    const newRequest = new CallRequestSchema({
      callerId: userData._id,
      calleeId,
      channelName,
      status: "pending",
    });
    const savedRequest = await newRequest.save();
    console.log(savedRequest);

    await pusher.trigger(`user-${calleeId}`, "incoming-call", {
      callerId: userData._id,
      channelName,
      requestId: savedRequest._id,
    });

    return res.status(200).json({
      success: true,
      message: "Call request sent",
      requestId: savedRequest._id,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const callRequestUpdate = async (req, res) => {
  const { requestId } = req.params;
  const { status } = req.body;

  // 1. Validate requestId format
  if (!mongoose.Types.ObjectId.isValid(requestId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid request ID format",
    });
  }

  // 2. Validate status value
  const validStatuses = ["accepted", "rejected"];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: `Invalid status. Allowed values: ${validStatuses.join(", ")}`,
    });
  }

  try {
    // 3. Add existence check
    const existingRequest = await CallRequestSchema.findById(requestId);
    if (!existingRequest) {
      return res.status(404).json({
        success: false,
        message: "Call request not found",
      });
    }

    // 4. Use proper update syntax
    const updatedRequest = await CallRequestSchema.findByIdAndUpdate(
      requestId,
      { $set: { status } },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: updatedRequest,
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  sendCallRequest,
  callRequestUpdate,
};
