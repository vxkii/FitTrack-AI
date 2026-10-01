export const initialProgress = {
  currentWeight: 68.5,
  startingWeight: 74.0,
  weightChange: -5.5,
  bmi: 22.4,
  bmiStatus: 'Normal',
  biWeeklyDaysRemaining: 3,
  biWeeklyWeightChange: -0.8,
  disciplineScore: 94,
  streakWeeks: 6,

  // Bi-Weekly Weight Progression Data (Measured Every 2 Weeks)
  biWeeklyWeightHistory: [
    { period: 'Week 0', weight: 74.0, goal: 65.0, label: 'Baseline' },
    { period: 'Week 2', weight: 72.8, goal: 65.0, label: '-1.2 kg' },
    { period: 'Week 4', weight: 71.5, goal: 65.0, label: '-1.3 kg' },
    { period: 'Week 6', weight: 70.2, goal: 65.0, label: '-1.3 kg' },
    { period: 'Week 8', weight: 69.4, goal: 65.0, label: '-0.8 kg' },
    { period: 'Week 10', weight: 68.8, goal: 65.0, label: '-0.6 kg' },
    { period: 'Week 12', weight: 68.5, goal: 65.0, label: '-0.3 kg' }
  ],

  // Bi-Weekly Workout & Discipline Frequency Data (2-Week Blocks)
  biWeeklyWorkoutFrequency: [
    { period: 'Bi-Week 1', completed: 8, target: 10, discipline: '80%' },
    { period: 'Bi-Week 2', completed: 9, target: 10, discipline: '90%' },
    { period: 'Bi-Week 3', completed: 10, target: 10, discipline: '100%' },
    { period: 'Bi-Week 4', completed: 9, target: 10, discipline: '90%' }
  ],

  // Real Weekly Activity Data (Calories Burned & Workout Duration per Day)
  weeklyActivity: [
    { day: 'Mon', calories: 420, duration: 45, exercises: 8 },
    { day: 'Tue', calories: 320, duration: 35, exercises: 6 },
    { day: 'Wed', calories: 510, duration: 55, exercises: 10 },
    { day: 'Thu', calories: 280, duration: 30, exercises: 5 },
    { day: 'Fri', calories: 580, duration: 60, exercises: 12 },
    { day: 'Sat', calories: 250, duration: 25, exercises: 4 },
    { day: 'Sun', calories: 380, duration: 40, exercises: 7 }
  ],

  caloriesBurnedHistory: [
    { day: 'Mon', burned: 420 },
    { day: 'Tue', burned: 320 },
    { day: 'Wed', burned: 510 },
    { day: 'Thu', burned: 280 },
    { day: 'Fri', burned: 580 },
    { day: 'Sat', burned: 150 },
    { day: 'Sun', burned: 320 }
  ],

  insights: [
    {
      title: 'Bi-Weekly Discipline Shield 🔥',
      text: 'You achieved 94% workout discipline over your latest 2-week cycle. Keep your momentum going!',
      type: 'positive'
    },
    {
      title: '2-Week Weight Progression',
      text: 'Consistent bi-weekly weight reduction of -0.8 kg. On track for your 65.0 kg target by November.',
      type: 'info'
    },
    {
      title: 'Next Bi-Weekly Check-in',
      text: 'Your next official 2-week weigh-in is scheduled in 3 days for maximum accuracy and motivation.',
      type: 'warning'
    }
  ]
};
