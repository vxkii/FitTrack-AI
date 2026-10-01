const mongoose = require('mongoose');

const workoutHistorySchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, 'userId is required'],
      default: 'demo-user-123',
      trim: true,
      index: true
    },
    workoutId: {
      type: String,
      required: [true, 'workoutId is required'],
      trim: true
    },
    workoutName: {
      type: String,
      required: [true, 'workoutName is required'],
      trim: true
    },
    exercisesCompleted: {
      type: Number,
      required: [true, 'exercisesCompleted is required'],
      min: 0
    },
    setsCompleted: {
      type: Number,
      required: [true, 'setsCompleted is required'],
      min: 0
    },
    duration: {
      type: Number,
      required: [true, 'duration is required'],
      min: 0
    },
    calories: {
      type: Number,
      required: [true, 'calories is required'],
      min: 0
    },
    completedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

const WorkoutHistory = mongoose.model('WorkoutHistory', workoutHistorySchema);

module.exports = WorkoutHistory;
