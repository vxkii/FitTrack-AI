const express = require('express');
const router = express.Router();
const {
  createWorkoutHistory,
  getWorkoutHistory
} = require('../controllers/workoutController');

router.post('/history', createWorkoutHistory);
router.get('/history', getWorkoutHistory);

module.exports = router;
