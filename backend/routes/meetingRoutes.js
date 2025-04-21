const express = require("express");
const router = express.Router();
const Meeting = require("../models/Meeting");

// Create a meeting request
router.post("/create", async (req, res) => {
  try {
    const newMeeting = new Meeting(req.body);
    await newMeeting.save();
    res.status(201).json(newMeeting);
  } catch (err) {
    res.status(500).json({ message: "Failed to create meeting" });
  }
});

// Get all meetings for a user
router.get("/user/:userId", async (req, res) => {
  try {
    const meetings = await Meeting.find({
      $or: [
        { fromUserId: req.params.userId },
        { toUserId: req.params.userId },
      ],
    }).sort({ createdAt: -1 });
    res.status(200).json(meetings);
  } catch (err) {
    res.status(500).json({ message: "Failed to get meetings" });
  }
});

// Update status
router.patch("/status/:id", async (req, res) => {
  try {
    const updated = await Meeting.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update meeting status" });
  }
});

module.exports = router;