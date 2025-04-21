const mongoose = require("mongoose");

const meetingSchema = new mongoose.Schema(
  {
    fromUserId: { type: String, required: true },
    toUserId: { type: String, required: true },
    roomId: { type: String, required: true },
    status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Meeting", meetingSchema);