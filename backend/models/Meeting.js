const mongoose = require("mongoose");

const meetingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  roomId: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Meeting", meetingSchema);