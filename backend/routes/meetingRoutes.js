const express = require("express");
const router = express.Router();
const Meeting = require("../models/Meeting");

// Create meeting (admin assigns user)
router.post("/", async (req, res) => {
  try {
    const { title, assignedTo } = req.body;
    const roomId = "zidio-" + Math.random().toString(36).substring(2, 10);
    const meeting = new Meeting({
      title,
      roomId,
      createdBy: req.body.createdBy,
      assignedTo,
    });
    await meeting.save();
    res.status(201).json({ message: "Meeting created", meeting });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get meetings for a specific user
router.get("/user/:id", async (req, res) => {
  try {
    const meetings = await Meeting.find({ assignedTo: req.params.id });
    res.status(200).json(meetings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;