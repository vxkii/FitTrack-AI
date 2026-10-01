export const workoutsData = [
  {
    id: 'w_poster',
    name: 'Full-Body Poster Routine',
    category: 'Strength',
    difficulty: 'Intermediate',
    duration: 35,
    calories: 360,
    exerciseCount: 8,
    description: 'The complete 8-exercise full-body routine featured in the master exercise poster: Squat, Deadlift, Bent Over Row, Iron Cross, KB Swing, Cross Push Up, Bench Dips, and Spider Plank.',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80',
    exercises: [
      {
        name: 'Squat',
        category: 'Strength',
        illustrationType: 'squat',
        primaryMuscles: ['Quadriceps', 'Glutes'],
        secondaryMuscles: ['Hamstrings', 'Calves', 'Core'],
        startingPosition: 'Upright standing posture with feet shoulder-width apart & barbell across traps',
        movementPosition: 'Deep 90° knee flexion with hips sunk parallel to floor',
        muscleHighlightInfo: 'Primary activation on Quadriceps & Glutes; Secondary on Hamstrings & Core',
        sets: 4,
        reps: '15 reps',
        duration: '5 min',
        targetMuscles: 'Quadriceps, Glutes & Hamstrings',
        instructions: [
          'Unrack barbell across upper back or stand with feet shoulder-width apart.',
          'Hinge at hips and bend knees to sink down until thighs are parallel to ground.',
          'Keep chest proud, spine neutral, and knees tracking in line with toes.',
          'Drive forcefully through heels to explode back up to full lockout.'
        ]
      },
      {
        name: 'Deadlift',
        category: 'Strength',
        illustrationType: 'deadlift',
        primaryMuscles: ['Hamstrings', 'Glutes', 'Erector Spinae (Lower Back)'],
        secondaryMuscles: ['Lats', 'Traps', 'Forearms', 'Core'],
        startingPosition: 'Hinged forward at 60° over barbell with shins touching bar',
        movementPosition: 'Full standing lockout with hips driven forward & spine erect',
        muscleHighlightInfo: 'Primary activation on Hamstrings, Glutes & Lower Back; Secondary on Upper Back',
        sets: 4,
        reps: '12 reps',
        duration: '5 min',
        targetMuscles: 'Posterior Chain, Glutes, Hamstrings & Erector Spinae',
        instructions: [
          'Stand over barbell with feet hip-width apart and shins touching bar.',
          'Hinge at hips and grip bar just outside knees with a firm overhand grip.',
          'Engage lats, keep spine straight, and lift bar by extending hips and knees simultaneously.',
          'Lower weight back down under control maintaining flat back alignment.'
        ]
      },
      {
        name: 'Bent Over Row',
        category: 'Strength',
        illustrationType: 'bent_over_row',
        primaryMuscles: ['Latissimus Dorsi (Lats)', 'Rhomboids'],
        secondaryMuscles: ['Biceps Brachii', 'Rear Deltoids', 'Lower Back'],
        startingPosition: 'Hinged forward at 45° angle with arms hanging straight down holding bar',
        movementPosition: 'Barbell pulled upward into lower ribcage with scapular contraction',
        muscleHighlightInfo: 'Primary activation on Lats & Rhomboids; Secondary on Biceps & Lower Back',
        sets: 4,
        reps: '12 reps',
        duration: '4 min',
        targetMuscles: 'Latissimus Dorsi, Rhomboids & Rear Deltoids',
        instructions: [
          'Hinge forward at hips at roughly 45° angle with knees slightly soft.',
          'Hold barbell or dumbbells hanging straight down from shoulders.',
          'Pull weight upward towards lower ribcage by squeezing shoulder blades together.',
          'Lower back down under full control without swinging torso.'
        ]
      },
      {
        name: 'Iron Cross Squat',
        category: 'Strength',
        illustrationType: 'iron_cross',
        primaryMuscles: ['Anterior & Lateral Deltoids', 'Quadriceps'],
        secondaryMuscles: ['Glutes', 'Upper Traps', 'Core'],
        startingPosition: 'Standing tall holding dumbbells extended horizontally sideways in cross shape',
        movementPosition: 'Deep 90° squat while maintaining extended horizontal arm cross posture',
        muscleHighlightInfo: 'Primary activation on Deltoids & Quads; Secondary on Traps & Core',
        sets: 3,
        reps: '12 reps',
        duration: '4 min',
        targetMuscles: 'Deltoids, Upper Traps, Quads & Core Stability',
        instructions: [
          'Hold dumbbells straight out to sides at shoulder height forming a cross.',
          'Maintain extended arms while descending into a full 90° squat.',
          'Keep core braced and shoulders engaged throughout the squat reps.',
          'Press back up to standing while maintaining arm cross posture.'
        ]
      },
      {
        name: 'Kettlebell Swing',
        category: 'Strength',
        illustrationType: 'kb_swing',
        primaryMuscles: ['Glutes', 'Hamstrings'],
        secondaryMuscles: ['Core Abdominals', 'Anterior Deltoids', 'Forearms'],
        startingPosition: 'Hips hinged backward with kettlebell swinging between thighs',
        movementPosition: 'Explosive hip thrust propelling kettlebell in smooth arc to eye level',
        muscleHighlightInfo: 'Primary activation on Glutes & Hamstrings; Secondary on Core & Shoulders',
        sets: 4,
        reps: '20 reps',
        duration: '4 min',
        targetMuscles: 'Glutes, Hamstrings, Core & Shoulders',
        instructions: [
          'Stand over kettlebell with feet wider than shoulder-width apart.',
          'Hinge at hips to swing kettlebell backward between legs.',
          'Explode hips forward powerfully to drive kettlebell up to chest/eye level.',
          'Let weight fall back naturally into hip hinge for next rep.'
        ]
      },
      {
        name: 'Cross Push Up',
        category: 'Strength',
        illustrationType: 'pushup',
        primaryMuscles: ['Pectorals (Chest)', 'Triceps Brachii'],
        secondaryMuscles: ['Anterior Deltoids', 'Core Abdominals'],
        startingPosition: 'High plank stance with hands placed in offset cross alignment',
        movementPosition: 'Chest lowered within 2 inches of floor with body rigid',
        muscleHighlightInfo: 'Primary activation on Pectorals & Triceps; Secondary on Shoulders & Core',
        sets: 3,
        reps: '15 reps',
        duration: '4 min',
        targetMuscles: 'Pectorals, Anterior Deltoids & Core',
        instructions: [
          'Assume high plank position with hands positioned in offset or cross alignment.',
          'Lower chest towards floor while keeping core braced and body rigid.',
          'Push back up explosively and alternate hand cross positioning per set.'
        ]
      },
      {
        name: 'Bench Dips',
        category: 'Strength',
        illustrationType: 'bench_dips',
        primaryMuscles: ['Triceps Brachii'],
        secondaryMuscles: ['Pectorals', 'Anterior Deltoids'],
        startingPosition: 'Seated between dual benches with palms on rear bench edge, legs out',
        movementPosition: 'Hips dipped downward as elbows flex to 90° angle',
        muscleHighlightInfo: 'Primary activation on Triceps Brachii; Secondary on Chest & Front Shoulders',
        sets: 4,
        reps: '15 reps',
        duration: '4 min',
        targetMuscles: 'Triceps Brachii, Anterior Deltoids & Upper Chest',
        instructions: [
          'Place palms on edge of bench behind you with feet extended on floor or secondary bench.',
          'Lower hips down by bending elbows to 90° angle.',
          'Press through palms to extend arms fully and isolate triceps.'
        ]
      },
      {
        name: 'Spider Plank',
        category: 'Strength',
        illustrationType: 'spider_plank',
        primaryMuscles: ['Obliques', 'Rectus Abdominals'],
        secondaryMuscles: ['Hip Flexors', 'Deltoids'],
        startingPosition: 'Forearm low plank position parallel to floor',
        movementPosition: 'Knee driven laterally outward toward same-side elbow',
        muscleHighlightInfo: 'Primary activation on Obliques & Abdominals; Secondary on Hip Flexors',
        sets: 3,
        reps: '45 sec',
        duration: '3 min',
        targetMuscles: 'Obliques, Rectus Abdominis & Hip Flexors',
        instructions: [
          'Start in a forearm low plank position keeping spine parallel to floor.',
          'Drive right knee outward towards right elbow without raising hips.',
          'Return to plank and repeat with left knee to left elbow in alternating tempo.'
        ]
      }
    ]
  },
  {
    id: 'w1',
    name: 'Full Body Strength',
    category: 'Strength',
    difficulty: 'Intermediate',
    duration: 30,
    calories: 320,
    exerciseCount: 8,
    description: 'A comprehensive full-body session targeting major muscle groups for maximum strength and endurance gains.',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80',
    exercises: [
      {
        name: 'Push-ups',
        isVideo: true,
        videoUrl: '/pushup_video.webm',
        sets: 3,
        reps: '15 reps',
        duration: '4 min',
        image: '/pushup_action.jpg',
        targetMuscles: 'Chest, Front Deltoids & Triceps',
        instructions: [
          'Place hands slightly wider than shoulder-width apart on the floor.',
          'Keep your core tight, back straight, and hips aligned with shoulders.',
          'Lower your chest until it nearly touches the floor by bending elbows to 90°.',
          'Push back up forcefully to full arm extension.'
        ]
      },
      {
        name: 'Bodyweight Squats',
        isVideo: true,
        videoUrl: '/squat_action.jpg',
        sets: 4,
        reps: '20 reps',
        duration: '5 min',
        image: '/squat_action.jpg',
        targetMuscles: 'Quadriceps, Glutes & Hamstrings',
        instructions: [
          'Stand with feet shoulder-width apart and toes slightly turned out.',
          'Inhale as you sit your hips back and lower down until thighs are parallel to floor.',
          'Drive through heels to explode back up to starting standing position.'
        ]
      },
      {
        name: 'Walking Lunges',
        isVideo: true,
        videoUrl: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=600&auto=format&fit=crop&q=80',
        sets: 3,
        reps: '12 reps',
        duration: '4 min',
        image: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=600&auto=format&fit=crop&q=80',
        targetMuscles: 'Quads, Glutes & Calves',
        instructions: [
          'Take a large step forward with one leg.',
          'Lower your rear knee towards the floor until both knees form 90° angles.',
          'Drive off front foot to step forward into the next lunge.'
        ]
      },
      {
        name: 'Plank Hold',
        isVideo: true,
        videoUrl: '/plank_action.jpg',
        sets: 3,
        reps: '60 sec',
        duration: '3 min',
        image: '/plank_action.jpg',
        targetMuscles: 'Core, Abs & Lower Back',
        instructions: [
          'Place forearms on the ground with elbows directly under shoulders.',
          'Keep your body in a straight rigid line from head to heels.',
          'Brace core tightly and breathe steadily.'
        ]
      },
      {
        name: 'Dumbbell Rows',
        isVideo: true,
        videoUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80',
        sets: 3,
        reps: '12 reps',
        duration: '5 min',
        image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80',
        targetMuscles: 'Lats, Rhomboids & Rear Delts',
        instructions: [
          'Hinge forward at the hips with knees slightly bent and back flat.',
          'Pull weight towards your torso while squeezing shoulder blades.',
          'Lower back down under control.'
        ]
      },
      {
        name: 'Glute Bridges',
        isVideo: true,
        videoUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&auto=format&fit=crop&q=80',
        sets: 3,
        reps: '15 reps',
        duration: '4 min',
        image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&auto=format&fit=crop&q=80',
        targetMuscles: 'Glutes & Hamstrings',
        instructions: [
          'Lie flat on your back with knees bent and feet flat on floor.',
          'Drive through heels to lift hips towards ceiling.',
          'Squeeze glutes at top before lowering back down.'
        ]
      },
      {
        name: 'Mountain Climbers',
        isVideo: true,
        videoUrl: 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?w=600&auto=format&fit=crop&q=80',
        sets: 3,
        reps: '45 sec',
        duration: '3 min',
        image: 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?w=600&auto=format&fit=crop&q=80',
        targetMuscles: 'Core & Cardiovascular Conditioning',
        instructions: [
          'Start in high plank position.',
          'Drive one knee towards chest, then switch rapidly in a running motion.',
          'Keep hips level and hands firmly under shoulders.'
        ]
      },
      {
        name: 'Cool-down Stretch',
        isVideo: true,
        videoUrl: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&auto=format&fit=crop&q=80',
        sets: 1,
        reps: '2 min',
        duration: '2 min',
        image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&auto=format&fit=crop&q=80',
        targetMuscles: 'Full Body Mobility & Flexiblity',
        instructions: [
          'Perform deep slow breathing while stretching hamstrings, chest, and hip flexors.'
        ]
      }
    ]
  },
  {
    id: 'w2',
    name: 'Upper Body Blast',
    category: 'Strength',
    difficulty: 'Advanced',
    duration: 45,
    calories: 410,
    exerciseCount: 7,
    description: 'Intense hypertrophy workout focusing on chest, back, shoulders, biceps, and triceps.',
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80',
    exercises: [
      {
        name: 'Push-ups',
        isVideo: true,
        videoUrl: '/pushup_video.webm',
        sets: 4,
        reps: '20 reps',
        duration: '5 min',
        image: '/pushup_action.jpg',
        targetMuscles: 'Chest, Shoulders & Triceps',
        instructions: [
          'Place hands shoulder-width apart.',
          'Lower body until chest touches floor.',
          'Press up powerfully keeping elbows locked into 45 degrees.'
        ]
      },
      {
        name: 'Bench Press',
        isVideo: true,
        videoUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80',
        sets: 4,
        reps: '10 reps',
        duration: '8 min',
        image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80',
        targetMuscles: 'Pectorals & Triceps',
        instructions: [
          'Lie flat on bench, unrack barbell, and lower to mid-chest.',
          'Press bar back up until arms are extended.'
        ]
      },
      {
        name: 'Inverted Rows',
        isVideo: true,
        videoUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80',
        sets: 4,
        reps: '10 reps',
        duration: '8 min',
        image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80',
        targetMuscles: 'Upper Back & Lats',
        instructions: [
          'Hang underneath bar with straight body.',
          'Pull chest up to touch bar.'
        ]
      },
      {
        name: 'Overhead Shoulder Press',
        isVideo: true,
        videoUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80',
        sets: 3,
        reps: '12 reps',
        duration: '6 min',
        image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80',
        targetMuscles: 'Deltoids & Upper Traps',
        instructions: [
          'Press dumbbells overhead from shoulder level until arms lock out.'
        ]
      },
      {
        name: 'Lateral Raises',
        isVideo: true,
        videoUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80',
        sets: 3,
        reps: '15 reps',
        duration: '5 min',
        image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80',
        targetMuscles: 'Lateral Deltoids',
        instructions: [
          'Raise weights out to sides until parallel to ground.'
        ]
      },
      {
        name: 'Tricep Dips',
        isVideo: true,
        videoUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80',
        sets: 3,
        reps: '12 reps',
        duration: '5 min',
        image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80',
        targetMuscles: 'Triceps',
        instructions: [
          'Lower body between parallel bars by bending elbows to 90°.'
        ]
      },
      {
        name: 'Bicep Curls',
        isVideo: true,
        videoUrl: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&auto=format&fit=crop&q=80',
        sets: 3,
        reps: '12 reps',
        duration: '5 min',
        image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&auto=format&fit=crop&q=80',
        targetMuscles: 'Biceps Brachii',
        instructions: [
          'Curl weights upward keeping elbows pinned to ribs.'
        ]
      }
    ]
  },
  {
    id: 'w3',
    name: 'Lower Body Power',
    category: 'Strength',
    difficulty: 'Intermediate',
    duration: 40,
    calories: 380,
    exerciseCount: 5,
    description: 'Build powerful legs and glutes with compound movements and plyometric finishers.',
    image: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=600&auto=format&fit=crop&q=80',
    exercises: [
      {
        name: 'Goblet Squats',
        isVideo: true,
        videoUrl: '/squat_action.jpg',
        sets: 4,
        reps: '12 reps',
        duration: '7 min',
        image: '/squat_action.jpg',
        targetMuscles: 'Quadriceps & Glutes',
        instructions: [
          'Hold weight close to chest and squat down deep.',
          'Drive through heels to stand.'
        ]
      },
      {
        name: 'Romanian Deadlifts',
        isVideo: true,
        videoUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80',
        sets: 4,
        reps: '10 reps',
        duration: '8 min',
        image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80',
        targetMuscles: 'Hamstrings & Posterior Chain',
        instructions: [
          'Hinge at hips lowering weight along shins with slight knee bend.'
        ]
      },
      {
        name: 'Bulgarian Split Squats',
        isVideo: true,
        videoUrl: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=600&auto=format&fit=crop&q=80',
        sets: 3,
        reps: '10 reps',
        duration: '6 min',
        image: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=600&auto=format&fit=crop&q=80',
        targetMuscles: 'Quads & Glute Medius',
        instructions: [
          'Elevate rear foot on bench and lower front leg to 90 degrees.'
        ]
      },
      {
        name: 'Calf Raises',
        isVideo: true,
        videoUrl: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=600&auto=format&fit=crop&q=80',
        sets: 4,
        reps: '20 reps',
        duration: '5 min',
        image: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=600&auto=format&fit=crop&q=80',
        targetMuscles: 'Gastrocnemius & Soleus',
        instructions: [
          'Rise high onto toes and pause before lowering.'
        ]
      },
      {
        name: 'Jump Squats',
        isVideo: true,
        videoUrl: '/squat_action.jpg',
        sets: 3,
        reps: '15 reps',
        duration: '5 min',
        image: '/squat_action.jpg',
        targetMuscles: 'Explosive Leg Power',
        instructions: [
          'Squat down and explode upwards into a high jump.'
        ]
      }
    ]
  },
  {
    id: 'w4',
    name: 'HIIT Cardio Burn',
    category: 'HIIT',
    difficulty: 'Advanced',
    duration: 25,
    calories: 350,
    exerciseCount: 5,
    description: 'High-intensity interval training designed to maximize calorie burn and elevate metabolic rate.',
    image: 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?w=600&auto=format&fit=crop&q=80',
    exercises: [
      {
        name: 'Burpees',
        isVideo: true,
        videoUrl: '/pushup_action.jpg',
        sets: 4,
        reps: '45 sec',
        duration: '4 min',
        image: '/pushup_action.jpg',
        targetMuscles: 'Total Body Conditioning',
        instructions: [
          'Drop into pushup position, complete a pushup, jump feet in and leap overhead.'
        ]
      },
      {
        name: 'High Knees',
        isVideo: true,
        videoUrl: 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?w=600&auto=format&fit=crop&q=80',
        sets: 4,
        reps: '45 sec',
        duration: '4 min',
        image: 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?w=600&auto=format&fit=crop&q=80',
        targetMuscles: 'Cardio & Hip Flexors',
        instructions: [
          'Run in place lifting knees high to hip level.'
        ]
      },
      {
        name: 'Jumping Jacks',
        isVideo: true,
        videoUrl: 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?w=600&auto=format&fit=crop&q=80',
        sets: 4,
        reps: '45 sec',
        duration: '4 min',
        image: 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?w=600&auto=format&fit=crop&q=80',
        targetMuscles: 'Full Body Endurance',
        instructions: [
          'Jump spreading legs and raising arms overhead in rhythmic movement.'
        ]
      },
      {
        name: 'Skaters',
        isVideo: true,
        videoUrl: 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?w=600&auto=format&fit=crop&q=80',
        sets: 4,
        reps: '45 sec',
        duration: '4 min',
        image: 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?w=600&auto=format&fit=crop&q=80',
        targetMuscles: 'Lateral Agility & Glutes',
        instructions: [
          'Leap side to side landing soft on outside foot.'
        ]
      },
      {
        name: 'Tuck Jumps',
        isVideo: true,
        videoUrl: 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?w=600&auto=format&fit=crop&q=80',
        sets: 3,
        reps: '30 sec',
        duration: '3 min',
        image: 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?w=600&auto=format&fit=crop&q=80',
        targetMuscles: 'Explosive Lower Body Power',
        instructions: [
          'Explode upward pulling knees tightly to chest.'
        ]
      }
    ]
  },
  {
    id: 'w5',
    name: 'Core Crusher',
    category: 'Strength',
    difficulty: 'Beginner',
    duration: 20,
    calories: 180,
    exerciseCount: 5,
    description: 'Target all angles of your core including abs, obliques, and lower back stability.',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&auto=format&fit=crop&q=80',
    exercises: [
      {
        name: 'Bicycle Crunches',
        isVideo: true,
        videoUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&auto=format&fit=crop&q=80',
        sets: 3,
        reps: '20 reps',
        duration: '4 min',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&auto=format&fit=crop&q=80',
        targetMuscles: 'Obliques & Rectus Abdominis',
        instructions: [
          'Pedal legs while twisting opposite elbow to opposite knee.'
        ]
      },
      {
        name: 'Side Plank Holds',
        isVideo: true,
        videoUrl: 'https://images.unsplash.com/photo-1566241142559-40e1dab266c6?w=600&auto=format&fit=crop&q=80',
        sets: 3,
        reps: '45 sec/side',
        duration: '4 min',
        image: 'https://images.unsplash.com/photo-1566241142559-40e1dab266c6?w=600&auto=format&fit=crop&q=80',
        targetMuscles: 'Obliques & Lateral Core',
        instructions: [
          'Support body sideways on one forearm keeping hips stacked high.'
        ]
      },
      {
        name: 'Russian Twists',
        isVideo: true,
        videoUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&auto=format&fit=crop&q=80',
        sets: 3,
        reps: '20 reps',
        duration: '3 min',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&auto=format&fit=crop&q=80',
        targetMuscles: 'Obliques & Core Rotational Strength',
        instructions: [
          'Sit with feet elevated and rotate torso from side to side.'
        ]
      },
      {
        name: 'Leg Raises',
        isVideo: true,
        videoUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&auto=format&fit=crop&q=80',
        sets: 3,
        reps: '12 reps',
        duration: '4 min',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&auto=format&fit=crop&q=80',
        targetMuscles: 'Lower Abs',
        instructions: [
          'Lie flat and lift legs straight up to 90° without arching lower back.'
        ]
      },
      {
        name: 'Superman Hold',
        isVideo: true,
        videoUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&auto=format&fit=crop&q=80',
        sets: 3,
        reps: '30 sec',
        duration: '3 min',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&auto=format&fit=crop&q=80',
        targetMuscles: 'Erector Spinae & Lower Back',
        instructions: [
          'Lie face down and raise arms and legs off ground simultaneously.'
        ]
      }
    ]
  },
  {
    id: 'w6',
    name: 'Morning Yoga Flow',
    category: 'Yoga',
    difficulty: 'Beginner',
    duration: 35,
    calories: 140,
    exerciseCount: 5,
    description: 'Gentle morning vinyasa flow to awaken joints, lengthen muscles, and focus your mind.',
    image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&auto=format&fit=crop&q=80',
    exercises: [
      {
        name: 'Sun Salutation A',
        isVideo: true,
        videoUrl: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&auto=format&fit=crop&q=80',
        sets: 3,
        reps: '5 min',
        duration: '5 min',
        image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&auto=format&fit=crop&q=80',
        targetMuscles: 'Full Body Mobility',
        instructions: ['Fluid sequence connecting forward folds, plank, chaturanga and upward dog.']
      },
      {
        name: 'Warrior II Pose',
        isVideo: true,
        videoUrl: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&auto=format&fit=crop&q=80',
        sets: 2,
        reps: '3 min',
        duration: '4 min',
        image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&auto=format&fit=crop&q=80',
        targetMuscles: 'Hips & Legs',
        instructions: ['Deep lunge position with arms extended parallel to floor over feet.']
      },
      {
        name: 'Tree Pose',
        isVideo: true,
        videoUrl: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&auto=format&fit=crop&q=80',
        sets: 2,
        reps: '2 min',
        duration: '3 min',
        image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&auto=format&fit=crop&q=80',
        targetMuscles: 'Balance & Ankle Stability',
        instructions: ['Stand on one foot placing sole of other foot against inner thigh.']
      },
      {
        name: 'Downward Dog Hold',
        isVideo: true,
        videoUrl: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&auto=format&fit=crop&q=80',
        sets: 2,
        reps: '3 min',
        duration: '4 min',
        image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&auto=format&fit=crop&q=80',
        targetMuscles: 'Hamstrings & Calves',
        instructions: ['Press hips up into an inverted V shape extending shoulders and spine.']
      },
      {
        name: "Child's Pose",
        isVideo: true,
        videoUrl: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&auto=format&fit=crop&q=80',
        sets: 1,
        reps: '5 min',
        duration: '5 min',
        image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&auto=format&fit=crop&q=80',
        targetMuscles: 'Resting Spine Stretch',
        instructions: ['Kneel with forehead resting on floor and arms extended forward.']
      }
    ]
  },
  {
    id: 'w7',
    name: 'Mobility & Recovery',
    category: 'Mobility',
    difficulty: 'Beginner',
    duration: 25,
    calories: 110,
    exerciseCount: 4,
    description: 'Active recovery routine aiming to reduce soreness and improve joint range of motion.',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&auto=format&fit=crop&q=80',
    exercises: [
      {
        name: 'Thoracic Spine Rotations',
        isVideo: true,
        videoUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&auto=format&fit=crop&q=80',
        sets: 2,
        reps: '10 reps',
        duration: '4 min',
        image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&auto=format&fit=crop&q=80',
        targetMuscles: 'Thoracic Mobility',
        instructions: ['Rotate upper torso reaching hand towards ceiling on hands and knees.']
      },
      {
        name: 'Hip Openers & 90/90 Stretch',
        isVideo: true,
        videoUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&auto=format&fit=crop&q=80',
        sets: 2,
        reps: '3 min',
        duration: '5 min',
        image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&auto=format&fit=crop&q=80',
        targetMuscles: 'Hip Joint Flexibility',
        instructions: ['Sit with both legs bent at 90 degree angles and lean over front leg.']
      },
      {
        name: 'Hamstring Dynamic Stretch',
        isVideo: true,
        videoUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&auto=format&fit=crop&q=80',
        sets: 2,
        reps: '10 reps',
        duration: '4 min',
        image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&auto=format&fit=crop&q=80',
        targetMuscles: 'Hamstrings',
        instructions: ['Kick leg straight forward gently increasing range of motion.']
      },
      {
        name: 'Cat-Cow Stretch',
        isVideo: true,
        videoUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&auto=format&fit=crop&q=80',
        sets: 2,
        reps: '12 reps',
        duration: '4 min',
        image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&auto=format&fit=crop&q=80',
        targetMuscles: 'Spinal Articulation',
        instructions: ['Alternate arching and rounding back on all fours with rhythmic breathing.']
      }
    ]
  },
  {
    id: 'w8',
    name: 'Outdoor Cardio Blast',
    category: 'Cardio',
    difficulty: 'Intermediate',
    duration: 45,
    calories: 450,
    exerciseCount: 4,
    description: 'Outdoor running intervals interspersed with bodyweight drills for maximum stamina.',
    image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=600&auto=format&fit=crop&q=80',
    exercises: [
      {
        name: 'Warm-up Jog',
        isVideo: true,
        videoUrl: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=600&auto=format&fit=crop&q=80',
        sets: 1,
        reps: '5 min',
        duration: '5 min',
        image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=600&auto=format&fit=crop&q=80',
        targetMuscles: 'Aerobic Warmup',
        instructions: ['Light easy pace jogging to warm muscles and elevate heart rate.']
      },
      {
        name: 'Tempo Sprint Intervals',
        isVideo: true,
        videoUrl: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=600&auto=format&fit=crop&q=80',
        sets: 6,
        reps: '2 min',
        duration: '15 min',
        image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=600&auto=format&fit=crop&q=80',
        targetMuscles: 'Anaerobic Capacity',
        instructions: ['Sprint hard at 85-90% max effort for 2 minutes.']
      },
      {
        name: 'Walking Recovery',
        isVideo: true,
        videoUrl: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=600&auto=format&fit=crop&q=80',
        sets: 5,
        reps: '1 min',
        duration: '5 min',
        image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=600&auto=format&fit=crop&q=80',
        targetMuscles: 'Heart Rate Recovery',
        instructions: ['Breathe deeply and walk to bring heart rate down.']
      },
      {
        name: 'Cool-down Walk & Stretch',
        isVideo: true,
        videoUrl: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=600&auto=format&fit=crop&q=80',
        sets: 1,
        reps: '10 min',
        duration: '10 min',
        image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=600&auto=format&fit=crop&q=80',
        targetMuscles: 'Lower Body Flexibility',
        instructions: ['Slow walk followed by deep static hamstring and calf stretches.']
      }
    ]
  }
];
