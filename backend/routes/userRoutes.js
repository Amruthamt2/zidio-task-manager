// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const User = require("../models/user");

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find({ role: "user" }).select("_id name email"); // only regular users
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;