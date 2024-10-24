const mongoose = require('mongoose');

const ThoughtSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  reactions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Reaction',
    },
  ],
});

const Thought = mongoose.model('Thought', ThoughtSchema);
module.exports = Thought;
