const WorkoutHistory = require('../models/WorkoutHistory');

// @desc    Save completed workout session
// @route   POST /api/workouts/history
// @access  Public
const createWorkoutHistory = async (req, res) => {
  try {
    const {
      userId,
      workoutId,
      workoutName,
      exercisesCompleted,
      setsCompleted,
      duration,
      calories,
      completedAt
    } = req.body;

    if (!workoutId || !workoutName) {
      return res.status(400).json({
        success: false,
        message: 'workoutId and workoutName are required'
      });
    }

    const historyEntry = new WorkoutHistory({
      userId: userId || 'demo-user-123',
      workoutId,
      workoutName,
      exercisesCompleted: Number(exercisesCompleted) || 0,
      setsCompleted: Number(setsCompleted) || 0,
      duration: Number(duration) || 0,
      calories: Number(calories) || 0,
      completedAt: completedAt ? new Date(completedAt) : new Date()
    });

    const savedEntry = await historyEntry.save();

    return res.status(201).json({
      success: true,
      message: 'Workout history saved successfully',
      data: savedEntry
    });
  } catch (error) {
    console.error('Error saving workout history:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to save workout history',
      error: error.message
    });
  }
};

// @desc    Get workout history entries
// @route   GET /api/workouts/history
// @access  Public
const getWorkoutHistory = async (req, res) => {
  try {
    const { userId } = req.query;
    const filter = userId ? { userId } : {};

    const history = await WorkoutHistory.find(filter)
      .sort({ completedAt: -1 })
      .limit(50);

    return res.status(200).json({
      success: true,
      count: history.length,
      data: history
    });
  } catch (error) {
    console.error('Error fetching workout history:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch workout history',
      error: error.message
    });
  }
};

module.exports = {
  createWorkoutHistory,
  getWorkoutHistory
};
