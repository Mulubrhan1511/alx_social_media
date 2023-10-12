const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const User = mongoose.model("User");
const Message = mongoose.model("Message");

// Route to get followers of a user
router.get("/followers", requireLogin, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
  });

  router.get("/users", requireLogin, async (req, res) => {
    try {
      const users = await User.find().select("-password");
      res.json(users);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    }
  });

// Route to add a new message
router.post("/messages", requireLogin, async (req, res) => {
  const { recipientId, content } = req.body;

  try {
    const senderId = req.user._id;

    const newMessage = new Message({
      sender: senderId,
      recipient: recipientId,
      content: content
    });

    const savedMessage = await newMessage.save();
    res.json(savedMessage);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/messages", requireLogin, async (req, res) => {
  try {
    const userId = req.user._id;

    // Find messages where the current user is the sender or recipient
    const messages = await Message.find({
      $or: [{ sender: userId }, { recipient: userId }]
    })
    .populate("sender", "-password")
    .populate("recipient", "-password");

    res.json(messages);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;