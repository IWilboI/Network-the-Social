const { Thought } = require('../models');

// Get all thoughts (public)
const getThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single thought by ID
const getSingleThought = async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) return res.status(404).json({ message: 'Thought not found' });
    res.json(thought);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new thought (protected)
const createThought = async (req, res) => {
  try {
    const thought = new Thought({
      content: req.body.content,
      user: req.user.id,  // Ensure req.user.id exists
    });

    await thought.save();
    res.status(201).json(thought);
  } catch (err) {
    console.error('Error creating thought:', err.message);  // Log any errors
    res.status(500).json({ error: err.message });
  }
};

// Update a thought by ID
const updateThought = async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      req.body,
      { new: true, runValidators: true }
    );

    if (!thought) return res.status(404).json({ message: 'Thought not found' });
    res.json(thought);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a thought by ID
const deleteThought = async (req, res) => {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
    if (!thought) return res.status(404).json({ message: 'Thought not found' });
    res.json({ message: 'Thought deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a reaction to a thought
const addReaction = async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) return res.status(404).json({ message: 'Thought not found' });

    thought.reactions.push(req.body);
    await thought.save();
    res.json(thought);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Remove a reaction from a thought
const removeReaction = async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) return res.status(404).json({ message: 'Thought not found' });

    thought.reactions = thought.reactions.filter(
      (reaction) => reaction._id.toString() !== req.params.reactionId
    );
    await thought.save();
    res.json(thought);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Exporting the controller functions
module.exports = {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
};
