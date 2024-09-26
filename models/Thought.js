const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// Schema for reactions (subdocument for Thought model)
const reactionSchema = new Schema(
  {
    reactionId: { type: Schema.Types.ObjectId, default: () => new Types.ObjectId() },
    reactionBody: { type: String, required: true, maxLength: 280 },
    username: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, get: (timestamp) => dateFormat(timestamp) },
  },
  { toJSON: { getters: true }, id: false }
);

// Schema for Thought model
const thoughtSchema = new Schema(
  {
    thoughtText: { type: String, required: true, minLength: 1, maxLength: 280 },
    createdAt: { type: Date, default: Date.now, get: (timestamp) => dateFormat(timestamp) },
    username: { type: String, required: true },
    reactions: [reactionSchema],
  },
  { toJSON: { virtuals: true, getters: true }, id: false }
);

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
