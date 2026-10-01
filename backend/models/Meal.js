const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, 'userId is required'],
      trim: true,
      index: true
    },
    name: {
      type: String,
      required: [true, 'Meal name is required'],
      trim: true,
      minlength: [2, 'Meal name must be at least 2 characters long']
    },
    type: {
      type: String,
      default: 'Breakfast',
      enum: ['Breakfast', 'Lunch', 'Dinner', 'Snack'],
      trim: true
    },
    calories: {
      type: Number,
      required: [true, 'Calories are required'],
      min: [0, 'Calories cannot be negative']
    },
    protein: {
      type: Number,
      default: 0,
      min: [0, 'Protein cannot be negative']
    },
    carbs: {
      type: Number,
      default: 0,
      min: [0, 'Carbohydrates cannot be negative']
    },
    fat: {
      type: Number,
      default: 0,
      min: [0, 'Fat cannot be negative']
    },
    time: {
      type: String,
      trim: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    icon: {
      type: String,
      default: 'Utensils'
    }
  },
  {
    timestamps: true
  }
);

const Meal = mongoose.model('Meal', mealSchema);

module.exports = Meal;
