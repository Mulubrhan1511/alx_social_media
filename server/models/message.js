const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const messageSchema = new mongoose.Schema({
  sender: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  recipient: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('Message', messageSchema);