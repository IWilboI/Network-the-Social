const express = require('express');
const { Thought } = require('../models');
const { authenticate } = require('../middleware/auth');
const router = express.Router();

// Get all thoughts (public)
router.get('/', async (req, res) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create a new thought (protected)
router.post('/', authenticate, async (req, res) => {
    const thought = new Thought({
        content: req.body.content,
        user: req.user.id, // use the authenticated user's ID
    });

    try {
        await thought.save();
        res.status(201).json(thought);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Other protected routes (update, delete) can be added similarly
