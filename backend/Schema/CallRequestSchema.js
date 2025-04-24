const mongoose = require("mongoose");

const CallRequestSchema = new mongoose.Schema({
  callerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  calleeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const call =
  mongoose.models.CallRequestSchema ||
  mongoose.model("CallRequest", CallRequestSchema);

module.exports = call;
