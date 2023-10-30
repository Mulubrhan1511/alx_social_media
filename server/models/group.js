const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  type: {
    type: String,
    required: false
  },
  pic: {
    type: String,
    default: "https://res.cloudinary.com/dhw1mueq4/image/upload/v1698404593/images_w9kwcl.jpg"
  },
  members: [{
    type: ObjectId,
    ref: 'User'
  }],
  owner: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  messages: [{
    content: {
      type: String,
      required: true
    },
    sender: {
      type: ObjectId,
      ref: 'User',
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }]
  // Add any other fields you need for your groups
});

mongoose.model('Group', groupSchema);