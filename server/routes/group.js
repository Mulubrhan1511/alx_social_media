const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');

const User = mongoose.model("User");
const Group = mongoose.model("Group");
const Message = mongoose.model("Message");

router.post('/creatgroup', requireLogin, (req, res) => {
  const { description, name, pic, type } = req.body;

  if (!description || !name) {
    return res.status(422).json({ error: "Please add all the fields" });
  }

  const group = new Group({
    owner: req.user._id,
    name,
    description,
    pic,
    members: [req.user._id],
    type // Add the current user's ID to the members array
  });

  group.save()
    .then(() => {
      res.status(200).json({ message: "Group created successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Failed to create group" });
    });
});

router.get('/allgroups',requireLogin,(req,res)=>{
  Group.find()
  .then(groups=>{
      res.json({groups})
  })
  .catch(err=>{
      console.log(err)
  })
})
router.get('/group/:id', requireLogin, async (req, res) => {
  try {
    const group = await Group.findOne({ _id: req.params.id });
    res.json({ group });
  } catch (err) {
    return res.status(404).json({ error: "User not found" });
  }
});

router.put('/joingroup', requireLogin, (req, res) => {
  Group.findByIdAndUpdate(req.body.group, {
    $push: { members: req.body.members }
  }, { new: true })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(422).json({ error: err });
    });
});
router.put('/leavegroup', requireLogin, (req, res) => {
  Group.findByIdAndUpdate(req.body.group, {
    $pull: { members: req.body.members }
  }, { new: true })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(422).json({ error: err });
    });
});

// POST route to add a message to a group
router.post('/groups/:groupId/messages', async (req, res) => {
  const { groupId } = req.params;
  const { content, senderId } = req.body;

  try {
    const group = await Group.findById(groupId);
    const sender = await User.findById(senderId);

    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }

    if (!sender) {
      return res.status(404).json({ error: 'Sender not found' });
    }

    const newMessage = {
      content,
      sender: sender._id
    };

    group.messages.push(newMessage);
    group.save();
    
    res.json(group);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
module.exports = router