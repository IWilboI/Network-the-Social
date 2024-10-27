const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require('../controllers/thoughtController');

const { authenticate } = require('../middleware/auth.js');

// /api/thoughts
router.route('/').get(getThoughts).post(authenticate, createThought);

// /api/thoughts/:thoughtId
router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(authenticate, updateThought)
  .delete(authenticate, deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(authenticate, addReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(authenticate, removeReaction);

module.exports = router;
