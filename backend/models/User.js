const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const DEFAULT_AVATAR = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters long']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Please enter a valid email address'
      ]
    },
    passwordHash: {
      type: String,
      required: [true, 'Password is required'],
      select: false
    },
    age: {
      type: Number,
      default: 28,
      min: [0, 'Age cannot be negative'],
      max: [120, 'Age is out of realistic range']
    },
    height: {
      type: Number,
      default: 175,
      min: [0, 'Height cannot be negative']
    },
    weight: {
      type: Number,
      default: 68.5,
      min: [0, 'Weight cannot be negative']
    },
    fitnessGoal: {
      type: String,
      default: 'Build Muscle',
      trim: true
    },
    activityLevel: {
      type: String,
      default: 'Moderately Active',
      trim: true
    },
    avatar: {
      type: String,
      default: DEFAULT_AVATAR
    }
  },
  {
    timestamps: true
  }
);

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.passwordHash);
};

userSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.passwordHash;
    delete ret.__v;
    return ret;
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
