export const muscleBuildingPlans = [
  {
    id: 'mb_plan_1',
    name: 'Muscle Building Option 1: Idli, Dal Rice, Banana-Peanut & Egg Chapati',
    type: 'Muscle Building Plan',
    dailyCaloriesTarget: 2150,
    dailyCaloriesConsumed: 1890,
    macros: {
      protein: { current: 108, target: 135, unit: 'g', color: '#3B82F6' },
      carbs: { current: 228, target: 250, unit: 'g', color: '#10B981' },
      fat: { current: 52, target: 60, unit: 'g', color: '#F59E0B' }
    },
    macroRatio: [
      { name: 'Protein', value: 108, color: '#3B82F6' },
      { name: 'Carbs', value: 228, color: '#10B981' },
      { name: 'Fat', value: 52, color: '#F59E0B' }
    ],
    meals: [
      {
        id: 'mb1_m1',
        type: 'Breakfast',
        name: '2 Idli (80 g) + Sambar (200 g) + 2 Eggs (100 g) + 1 Banana (100–120 g)',
        calories: 540,
        protein: 32,
        carbs: 68,
        fat: 14,
        time: '08:15 AM',
        icon: 'Coffee'
      },
      {
        id: 'mb1_m2',
        type: 'Lunch',
        name: 'Cooked Rice (150 g) + Dal (150 g) + Vegetables (200 g) + Curd (100 g)',
        calories: 600,
        protein: 41,
        carbs: 74,
        fat: 12,
        time: '01:30 PM',
        icon: 'Utensils'
      },
      {
        id: 'mb1_m3',
        type: 'Snack',
        name: '1 Banana (100–120 g) + Peanuts (15–20 g)',
        calories: 230,
        protein: 7,
        carbs: 32,
        fat: 10,
        time: '04:45 PM',
        icon: 'Apple'
      },
      {
        id: 'mb1_m4',
        type: 'Dinner',
        name: '2 Chapati (80 g) + 2 Eggs (100 g) + Vegetables (200 g)',
        calories: 520,
        protein: 28,
        carbs: 54,
        fat: 16,
        time: '07:30 PM',
        icon: 'Pizza'
      }
    ]
  },
  {
    id: 'mb_plan_2',
    name: 'Muscle Building Option 2: Dosa, Chicken Rice, Boiled Eggs & Fish Rice',
    type: 'Muscle Building Plan',
    dailyCaloriesTarget: 2150,
    dailyCaloriesConsumed: 1840,
    macros: {
      protein: { current: 130, target: 145, unit: 'g', color: '#3B82F6' },
      carbs: { current: 198, target: 220, unit: 'g', color: '#10B981' },
      fat: { current: 50, target: 60, unit: 'g', color: '#F59E0B' }
    },
    macroRatio: [
      { name: 'Protein', value: 130, color: '#3B82F6' },
      { name: 'Carbs', value: 198, color: '#10B981' },
      { name: 'Fat', value: 50, color: '#F59E0B' }
    ],
    meals: [
      {
        id: 'mb2_m1',
        type: 'Breakfast',
        name: '2 Dosa (150 g) + Sambar (200 g) + 2 Eggs (100 g)',
        calories: 510,
        protein: 26,
        carbs: 60,
        fat: 14,
        time: '08:15 AM',
        icon: 'Coffee'
      },
      {
        id: 'mb2_m2',
        type: 'Lunch',
        name: 'Cooked Rice (150 g) + Chicken (100 g) + Vegetables (200 g) + Curd (100 g)',
        calories: 600,
        protein: 48,
        carbs: 65,
        fat: 16,
        time: '01:30 PM',
        icon: 'Utensils'
      },
      {
        id: 'mb2_m3',
        type: 'Snack',
        name: '2 Eggs (100 g) + 1 Fruit (100–150 g)',
        calories: 220,
        protein: 14,
        carbs: 22,
        fat: 8,
        time: '04:45 PM',
        icon: 'Apple'
      },
      {
        id: 'mb2_m4',
        type: 'Dinner',
        name: 'Cooked Rice (150 g) + Fish (100 g) + Vegetables (200 g)',
        calories: 510,
        protein: 42,
        carbs: 58,
        fat: 12,
        time: '07:30 PM',
        icon: 'Pizza'
      }
    ]
  },
  {
    id: 'mb_plan_3',
    name: 'Muscle Building Option 3: Oats Shake, Fish Rice, Channa & Chicken Rice',
    type: 'Muscle Building Plan',
    dailyCaloriesTarget: 2050,
    dailyCaloriesConsumed: 1770,
    macros: {
      protein: { current: 109, target: 130, unit: 'g', color: '#3B82F6' },
      carbs: { current: 218, target: 240, unit: 'g', color: '#10B981' },
      fat: { current: 43, target: 55, unit: 'g', color: '#F59E0B' }
    },
    macroRatio: [
      { name: 'Protein', value: 109, color: '#3B82F6' },
      { name: 'Carbs', value: 218, color: '#10B981' },
      { name: 'Fat', value: 43, color: '#F59E0B' }
    ],
    meals: [
      {
        id: 'mb3_m1',
        type: 'Breakfast',
        name: 'Oats (50 g) + Milk (250 ml) + Banana (100 g) + Peanuts (15 g)',
        calories: 420,
        protein: 18,
        carbs: 58,
        fat: 14,
        time: '08:15 AM',
        icon: 'Coffee'
      },
      {
        id: 'mb3_m2',
        type: 'Lunch',
        name: 'Cooked Rice (150 g) + Fish (100 g) + Vegetables (200 g) + Curd (100 g)',
        calories: 580,
        protein: 42,
        carbs: 62,
        fat: 14,
        time: '01:30 PM',
        icon: 'Utensils'
      },
      {
        id: 'mb3_m3',
        type: 'Snack',
        name: 'Roasted Channa (30 g) + 1 Banana (100–120 g)',
        calories: 210,
        protein: 9,
        carbs: 38,
        fat: 3,
        time: '04:45 PM',
        icon: 'Apple'
      },
      {
        id: 'mb3_m4',
        type: 'Dinner',
        name: 'Cooked Rice (150 g) + Chicken (100 g) + Vegetables (200 g)',
        calories: 560,
        protein: 40,
        carbs: 60,
        fat: 12,
        time: '07:30 PM',
        icon: 'Pizza'
      }
    ]
  },
  {
    id: 'mb_plan_4',
    name: 'Muscle Building Option 4: Chapati Eggs, Chickpeas Rice, Sundal & Soy Chunks',
    type: 'Muscle Building Plan',
    dailyCaloriesTarget: 2000,
    dailyCaloriesConsumed: 1750,
    macros: {
      protein: { current: 94, target: 125, unit: 'g', color: '#3B82F6' },
      carbs: { current: 232, target: 250, unit: 'g', color: '#10B981' },
      fat: { current: 44, target: 55, unit: 'g', color: '#F59E0B' }
    },
    macroRatio: [
      { name: 'Protein', value: 94, color: '#3B82F6' },
      { name: 'Carbs', value: 232, color: '#10B981' },
      { name: 'Fat', value: 44, color: '#F59E0B' }
    ],
    meals: [
      {
        id: 'mb4_m1',
        type: 'Breakfast',
        name: '2 Chapati (80 g) + Curd (150 g) + 2 Eggs (100 g)',
        calories: 450,
        protein: 26,
        carbs: 48,
        fat: 16,
        time: '08:15 AM',
        icon: 'Coffee'
      },
      {
        id: 'mb4_m2',
        type: 'Lunch',
        name: 'Cooked Rice (150 g) + Chickpeas (100 g) + Vegetables (200 g) + Curd (100 g)',
        calories: 590,
        protein: 24,
        carbs: 82,
        fat: 12,
        time: '01:30 PM',
        icon: 'Utensils'
      },
      {
        id: 'mb4_m3',
        type: 'Snack',
        name: 'Sundal (100 g) + 1 Fruit (100–150 g)',
        calories: 230,
        protein: 10,
        carbs: 38,
        fat: 4,
        time: '04:45 PM',
        icon: 'Apple'
      },
      {
        id: 'mb4_m4',
        type: 'Dinner',
        name: '2 Chapati (80 g) + Dal (100 g) + Soy Chunks (30 g dry) + Vegetables (200 g)',
        calories: 530,
        protein: 34,
        carbs: 64,
        fat: 12,
        time: '07:30 PM',
        icon: 'Pizza'
      }
    ]
  },
  {
    id: 'mb_plan_5',
    name: 'Muscle Building Option 5: Upma Sambar, Chapati Dal, Curd Fruit & Egg Sambar Rice',
    type: 'Muscle Building Plan',
    dailyCaloriesTarget: 1950,
    dailyCaloriesConsumed: 1730,
    macros: {
      protein: { current: 81, target: 115, unit: 'g', color: '#3B82F6' },
      carbs: { current: 224, target: 240, unit: 'g', color: '#10B981' },
      fat: { current: 47, target: 55, unit: 'g', color: '#F59E0B' }
    },
    macroRatio: [
      { name: 'Protein', value: 81, color: '#3B82F6' },
      { name: 'Carbs', value: 224, color: '#10B981' },
      { name: 'Fat', value: 47, color: '#F59E0B' }
    ],
    meals: [
      {
        id: 'mb5_m1',
        type: 'Breakfast',
        name: 'Upma (150 g) + Sambar (200 g) + 2 Eggs (100 g)',
        calories: 460,
        protein: 22,
        carbs: 56,
        fat: 12,
        time: '08:15 AM',
        icon: 'Coffee'
      },
      {
        id: 'mb5_m2',
        type: 'Lunch',
        name: '2 Chapati (80 g) + Dal (150 g) + Vegetables (200 g) + Curd (100 g)',
        calories: 540,
        protein: 24,
        carbs: 72,
        fat: 14,
        time: '01:30 PM',
        icon: 'Utensils'
      },
      {
        id: 'mb5_m3',
        type: 'Snack',
        name: 'Curd (150 g) + Banana (100 g) + Peanuts (10 g)',
        calories: 220,
        protein: 10,
        carbs: 28,
        fat: 7,
        time: '04:45 PM',
        icon: 'Apple'
      },
      {
        id: 'mb5_m4',
        type: 'Dinner',
        name: 'Cooked Rice (150 g) + Sambar (200 g) + 2 Eggs (100 g) + Vegetables (150 g)',
        calories: 530,
        protein: 25,
        carbs: 68,
        fat: 14,
        time: '07:30 PM',
        icon: 'Pizza'
      }
    ]
  },
  {
    id: 'mb_plan_6',
    name: 'Muscle Building Option 6: Pongal Sambar, Egg Curry Rice, Milk Oats & Chapati Chickpeas',
    type: 'Muscle Building Plan',
    dailyCaloriesTarget: 2000,
    dailyCaloriesConsumed: 1750,
    macros: {
      protein: { current: 80, target: 115, unit: 'g', color: '#3B82F6' },
      carbs: { current: 232, target: 245, unit: 'g', color: '#10B981' },
      fat: { current: 46, target: 55, unit: 'g', color: '#F59E0B' }
    },
    macroRatio: [
      { name: 'Protein', value: 80, color: '#3B82F6' },
      { name: 'Carbs', value: 232, color: '#10B981' },
      { name: 'Fat', value: 46, color: '#F59E0B' }
    ],
    meals: [
      {
        id: 'mb6_m1',
        type: 'Breakfast',
        name: 'Pongal (150 g) + Sambar (200 g) + 2 Eggs (100 g)',
        calories: 480,
        protein: 22,
        carbs: 60,
        fat: 14,
        time: '08:15 AM',
        icon: 'Coffee'
      },
      {
        id: 'mb6_m2',
        type: 'Lunch',
        name: 'Cooked Rice (150 g) + 2 Eggs (100 g) + Vegetables (200 g)',
        calories: 510,
        protein: 25,
        carbs: 64,
        fat: 14,
        time: '01:30 PM',
        icon: 'Utensils'
      },
      {
        id: 'mb6_m3',
        type: 'Snack',
        name: 'Milk (200 ml) + Banana (100 g) + Oats (20 g)',
        calories: 260,
        protein: 12,
        carbs: 38,
        fat: 6,
        time: '04:45 PM',
        icon: 'Apple'
      },
      {
        id: 'mb6_m4',
        type: 'Dinner',
        name: '2 Chapati (80 g) + Chickpeas (100 g) + Curd (100 g)',
        calories: 500,
        protein: 21,
        carbs: 70,
        fat: 12,
        time: '07:30 PM',
        icon: 'Pizza'
      }
    ]
  },
  {
    id: 'mb_plan_7',
    name: 'Muscle Building Option 7: Ragi Dosa Sambar, Veg Sambar Egg Rice, Sprouts & Ragi Egg Dosa',
    type: 'Muscle Building Plan',
    dailyCaloriesTarget: 1950,
    dailyCaloriesConsumed: 1690,
    macros: {
      protein: { current: 77, target: 115, unit: 'g', color: '#3B82F6' },
      carbs: { current: 214, target: 230, unit: 'g', color: '#10B981' },
      fat: { current: 37, target: 50, unit: 'g', color: '#F59E0B' }
    },
    macroRatio: [
      { name: 'Protein', value: 77, color: '#3B82F6' },
      { name: 'Carbs', value: 214, color: '#10B981' },
      { name: 'Fat', value: 37, color: '#F59E0B' }
    ],
    meals: [
      {
        id: 'mb7_m1',
        type: 'Breakfast',
        name: '2 Ragi Dosa (150 g) + Sambar (200 g) + Curd (100 g)',
        calories: 420,
        protein: 16,
        carbs: 64,
        fat: 8,
        time: '08:15 AM',
        icon: 'Coffee'
      },
      {
        id: 'mb7_m2',
        type: 'Lunch',
        name: 'Cooked Rice (150 g) + Sambar (200 g) + Beans/Carrot (150 g) + 2 Eggs (100 g)',
        calories: 520,
        protein: 25,
        carbs: 68,
        fat: 14,
        time: '01:30 PM',
        icon: 'Utensils'
      },
      {
        id: 'mb7_m3',
        type: 'Snack',
        name: 'Sprouts (100 g) + Cucumber (100 g) + Tomato (50 g)',
        calories: 160,
        protein: 12,
        carbs: 24,
        fat: 1,
        time: '04:45 PM',
        icon: 'Apple'
      },
      {
        id: 'mb7_m4',
        type: 'Dinner',
        name: '2 Ragi Dosa (150 g) + 2 Eggs (100 g) + Vegetables (150 g)',
        calories: 490,
        protein: 24,
        carbs: 58,
        fat: 12,
        time: '07:30 PM',
        icon: 'Pizza'
      }
    ]
  }
];

export const fatLossPlans = [
  {
    id: 'fatloss_1',
    name: 'Fat Loss Calorie Deficit Option 1: Idli Sambar Deficit & Egg Chapati',
    type: 'Fat Loss Deficit',
    dailyCaloriesTarget: 1750,
    dailyCaloriesConsumed: 1520,
    macros: {
      protein: { current: 95, target: 115, unit: 'g', color: '#3B82F6' },
      carbs: { current: 182, target: 195, unit: 'g', color: '#10B981' },
      fat: { current: 40, target: 48, unit: 'g', color: '#F59E0B' }
    },
    macroRatio: [
      { name: 'Protein', value: 95, color: '#3B82F6' },
      { name: 'Carbs', value: 182, color: '#10B981' },
      { name: 'Fat', value: 40, color: '#F59E0B' }
    ],
    meals: [
      {
        id: 'fl1_m1',
        type: 'Breakfast',
        name: '2 Idli (80 g) + Sambar (200 g) + 2 Boiled Eggs (100 g)',
        calories: 380,
        protein: 24,
        carbs: 48,
        fat: 10,
        time: '08:15 AM',
        icon: 'Coffee'
      },
      {
        id: 'fl1_m2',
        type: 'Lunch',
        name: 'Cooked Rice (120 g) + Dal (150 g) + Vegetables (200 g) + Curd (100 g)',
        calories: 500,
        protein: 34,
        carbs: 62,
        fat: 10,
        time: '01:30 PM',
        icon: 'Utensils'
      },
      {
        id: 'fl1_m3',
        type: 'Snack',
        name: '1 Banana (100–120 g) + Peanuts (10 g)',
        calories: 170,
        protein: 4,
        carbs: 28,
        fat: 6,
        time: '04:45 PM',
        icon: 'Apple'
      },
      {
        id: 'fl1_m4',
        type: 'Dinner',
        name: '2 Chapati (80 g) + 2 Eggs (100 g) + Vegetables (200 g)',
        calories: 470,
        protein: 26,
        carbs: 44,
        fat: 14,
        time: '07:30 PM',
        icon: 'Pizza'
      }
    ]
  },
  {
    id: 'fatloss_2',
    name: 'Fat Loss Calorie Deficit Option 2: Dosa Egg, Chicken Deficit & Fish Rice',
    type: 'Fat Loss Deficit',
    dailyCaloriesTarget: 1750,
    dailyCaloriesConsumed: 1530,
    macros: {
      protein: { current: 114, target: 130, unit: 'g', color: '#3B82F6' },
      carbs: { current: 165, target: 180, unit: 'g', color: '#10B981' },
      fat: { current: 42, target: 50, unit: 'g', color: '#F59E0B' }
    },
    macroRatio: [
      { name: 'Protein', value: 114, color: '#3B82F6' },
      { name: 'Carbs', value: 165, color: '#10B981' },
      { name: 'Fat', value: 42, color: '#F59E0B' }
    ],
    meals: [
      {
        id: 'fl2_m1',
        type: 'Breakfast',
        name: '2 Dosa (120 g) + Sambar (200 g) + 2 Boiled Eggs (100 g)',
        calories: 440,
        protein: 24,
        carbs: 52,
        fat: 12,
        time: '08:15 AM',
        icon: 'Coffee'
      },
      {
        id: 'fl2_m2',
        type: 'Lunch',
        name: 'Cooked Rice (120 g) + Chicken (100 g) + Vegetables (200 g) + Curd (100 g)',
        calories: 510,
        protein: 44,
        carbs: 51,
        fat: 12,
        time: '01:30 PM',
        icon: 'Utensils'
      },
      {
        id: 'fl2_m3',
        type: 'Snack',
        name: '2 Boiled Eggs (100 g) + 1 Fruit (Apple/Guava 100 g)',
        calories: 190,
        protein: 14,
        carbs: 18,
        fat: 8,
        time: '04:45 PM',
        icon: 'Apple'
      },
      {
        id: 'fl2_m4',
        type: 'Dinner',
        name: 'Cooked Rice (120 g) + Fish (100 g) + Vegetables (200 g)',
        calories: 390,
        protein: 32,
        carbs: 44,
        fat: 10,
        time: '07:30 PM',
        icon: 'Pizza'
      }
    ]
  },
  {
    id: 'fatloss_3',
    name: 'Fat Loss Calorie Deficit Option 3: Lean Oats, Fish Rice & Chicken Deficit',
    type: 'Fat Loss Deficit',
    dailyCaloriesTarget: 1700,
    dailyCaloriesConsumed: 1490,
    macros: {
      protein: { current: 96, target: 120, unit: 'g', color: '#3B82F6' },
      carbs: { current: 178, target: 190, unit: 'g', color: '#10B981' },
      fat: { current: 36, target: 45, unit: 'g', color: '#F59E0B' }
    },
    macroRatio: [
      { name: 'Protein', value: 96, color: '#3B82F6' },
      { name: 'Carbs', value: 178, color: '#10B981' },
      { name: 'Fat', value: 36, color: '#F59E0B' }
    ],
    meals: [
      {
        id: 'fl3_m1',
        type: 'Breakfast',
        name: 'Oats (40 g) + Toned Milk (200 ml) + ½ Banana + Peanuts (10 g)',
        calories: 340,
        protein: 15,
        carbs: 46,
        fat: 10,
        time: '08:15 AM',
        icon: 'Coffee'
      },
      {
        id: 'fl3_m2',
        type: 'Lunch',
        name: 'Cooked Rice (120 g) + Fish (100 g) + Vegetables (200 g) + Curd (100 g)',
        calories: 490,
        protein: 38,
        carbs: 50,
        fat: 12,
        time: '01:30 PM',
        icon: 'Utensils'
      },
      {
        id: 'fl3_m3',
        type: 'Snack',
        name: 'Roasted Channa (30 g) + 1 Apple',
        calories: 180,
        protein: 8,
        carbs: 32,
        fat: 3,
        time: '04:45 PM',
        icon: 'Apple'
      },
      {
        id: 'fl3_m4',
        type: 'Dinner',
        name: 'Cooked Rice (120 g) + Chicken (100 g) + Vegetables (200 g)',
        calories: 480,
        protein: 35,
        carbs: 50,
        fat: 11,
        time: '07:30 PM',
        icon: 'Pizza'
      }
    ]
  },
  {
    id: 'fatloss_4',
    name: 'Fat Loss Calorie Deficit Option 4: Chapati Eggs, Chickpeas Deficit & Soy Chunks',
    type: 'Fat Loss Deficit',
    dailyCaloriesTarget: 1750,
    dailyCaloriesConsumed: 1510,
    macros: {
      protein: { current: 86, target: 115, unit: 'g', color: '#3B82F6' },
      carbs: { current: 194, target: 210, unit: 'g', color: '#10B981' },
      fat: { current: 35, target: 45, unit: 'g', color: '#F59E0B' }
    },
    macroRatio: [
      { name: 'Protein', value: 86, color: '#3B82F6' },
      { name: 'Carbs', value: 194, color: '#10B981' },
      { name: 'Fat', value: 35, color: '#F59E0B' }
    ],
    meals: [
      {
        id: 'fl4_m1',
        type: 'Breakfast',
        name: '2 Chapati (80 g) + Curd (100 g) + 2 Boiled Eggs (100 g)',
        calories: 410,
        protein: 24,
        carbs: 42,
        fat: 14,
        time: '08:15 AM',
        icon: 'Coffee'
      },
      {
        id: 'fl4_m2',
        type: 'Lunch',
        name: 'Cooked Rice (120 g) + Chickpeas (100 g) + Vegetables (200 g) + Curd (100 g)',
        calories: 490,
        protein: 21,
        carbs: 68,
        fat: 10,
        time: '01:30 PM',
        icon: 'Utensils'
      },
      {
        id: 'fl4_m3',
        type: 'Snack',
        name: 'Sundal (80 g) + 1 Fruit (100 g)',
        calories: 180,
        protein: 8,
        carbs: 30,
        fat: 3,
        time: '04:45 PM',
        icon: 'Apple'
      },
      {
        id: 'fl4_m4',
        type: 'Dinner',
        name: '2 Chapati (80 g) + Dal (100 g) + Soy Chunks (25 g dry) + Vegetables (200 g)',
        calories: 430,
        protein: 33,
        carbs: 54,
        fat: 8,
        time: '07:30 PM',
        icon: 'Pizza'
      }
    ]
  },
  {
    id: 'fatloss_5',
    name: 'Fat Loss Calorie Deficit Option 5: Upma Egg, Chapati Dal & Curd Fruit Deficit',
    type: 'Fat Loss Deficit',
    dailyCaloriesTarget: 1700,
    dailyCaloriesConsumed: 1480,
    macros: {
      protein: { current: 75, target: 110, unit: 'g', color: '#3B82F6' },
      carbs: { current: 188, target: 200, unit: 'g', color: '#10B981' },
      fat: { current: 39, target: 45, unit: 'g', color: '#F59E0B' }
    },
    macroRatio: [
      { name: 'Protein', value: 75, color: '#3B82F6' },
      { name: 'Carbs', value: 188, color: '#10B981' },
      { name: 'Fat', value: 39, color: '#F59E0B' }
    ],
    meals: [
      {
        id: 'fl5_m1',
        type: 'Breakfast',
        name: 'Upma (120 g) + Sambar (200 g) + 2 Boiled Eggs (100 g)',
        calories: 400,
        protein: 20,
        carbs: 48,
        fat: 10,
        time: '08:15 AM',
        icon: 'Coffee'
      },
      {
        id: 'fl5_m2',
        type: 'Lunch',
        name: '2 Chapati (80 g) + Dal (150 g) + Vegetables (200 g) + Curd (100 g)',
        calories: 480,
        protein: 22,
        carbs: 64,
        fat: 12,
        time: '01:30 PM',
        icon: 'Utensils'
      },
      {
        id: 'fl5_m3',
        type: 'Snack',
        name: 'Curd (120 g) + Banana (80 g) + Peanuts (10 g)',
        calories: 170,
        protein: 8,
        carbs: 22,
        fat: 5,
        time: '04:45 PM',
        icon: 'Apple'
      },
      {
        id: 'fl5_m4',
        type: 'Dinner',
        name: 'Cooked Rice (120 g) + Sambar (200 g) + 2 Eggs (100 g) + Vegetables (150 g)',
        calories: 430,
        protein: 25,
        carbs: 54,
        fat: 12,
        time: '07:30 PM',
        icon: 'Pizza'
      }
    ]
  },
  {
    id: 'fatloss_6',
    name: 'Fat Loss Calorie Deficit Option 6: Pongal Egg, Egg Curry Rice & Low-Fat Shake',
    type: 'Fat Loss Deficit',
    dailyCaloriesTarget: 1720,
    dailyCaloriesConsumed: 1500,
    macros: {
      protein: { current: 74, target: 110, unit: 'g', color: '#3B82F6' },
      carbs: { current: 195, target: 210, unit: 'g', color: '#10B981' },
      fat: { current: 38, target: 45, unit: 'g', color: '#F59E0B' }
    },
    macroRatio: [
      { name: 'Protein', value: 74, color: '#3B82F6' },
      { name: 'Carbs', value: 195, color: '#10B981' },
      { name: 'Fat', value: 38, color: '#F59E0B' }
    ],
    meals: [
      {
        id: 'fl6_m1',
        type: 'Breakfast',
        name: 'Pongal (120 g) + Sambar (200 g) + 2 Boiled Eggs (100 g)',
        calories: 420,
        protein: 20,
        carbs: 50,
        fat: 12,
        time: '08:15 AM',
        icon: 'Coffee'
      },
      {
        id: 'fl6_m2',
        type: 'Lunch',
        name: 'Cooked Rice (120 g) + 2 Eggs (100 g) + Vegetables (200 g)',
        calories: 440,
        protein: 22,
        carbs: 52,
        fat: 12,
        time: '01:30 PM',
        icon: 'Utensils'
      },
      {
        id: 'fl6_m3',
        type: 'Snack',
        name: 'Low-Fat Milk (180 ml) + Banana (80 g) + Oats (15 g)',
        calories: 210,
        protein: 10,
        carbs: 30,
        fat: 4,
        time: '04:45 PM',
        icon: 'Apple'
      },
      {
        id: 'fl6_m4',
        type: 'Dinner',
        name: '2 Chapati (80 g) + Chickpeas (80 g) + Curd (100 g)',
        calories: 430,
        protein: 22,
        carbs: 63,
        fat: 10,
        time: '07:30 PM',
        icon: 'Pizza'
      }
    ]
  },
  {
    id: 'fatloss_7',
    name: 'Fat Loss Calorie Deficit Option 7: Ragi Dosa Sambar, Egg Veg Rice & Sprouts Salad',
    type: 'Fat Loss Deficit',
    dailyCaloriesTarget: 1700,
    dailyCaloriesConsumed: 1470,
    macros: {
      protein: { current: 75, target: 110, unit: 'g', color: '#3B82F6' },
      carbs: { current: 184, target: 195, unit: 'g', color: '#10B981' },
      fat: { current: 31, target: 40, unit: 'g', color: '#F59E0B' }
    },
    macroRatio: [
      { name: 'Protein', value: 75, color: '#3B82F6' },
      { name: 'Carbs', value: 184, color: '#10B981' },
      { name: 'Fat', value: 31, color: '#F59E0B' }
    ],
    meals: [
      {
        id: 'fl7_m1',
        type: 'Breakfast',
        name: '2 Ragi Dosa (150 g) + Sambar (200 g) + Curd (100 g)',
        calories: 390,
        protein: 16,
        carbs: 60,
        fat: 8,
        time: '08:15 AM',
        icon: 'Coffee'
      },
      {
        id: 'fl7_m2',
        type: 'Lunch',
        name: 'Cooked Rice (120 g) + Sambar (200 g) + Beans/Carrot (150 g) + 2 Boiled Eggs (100 g)',
        calories: 450,
        protein: 23,
        carbs: 56,
        fat: 12,
        time: '01:30 PM',
        icon: 'Utensils'
      },
      {
        id: 'fl7_m3',
        type: 'Snack',
        name: 'Sprouts (100 g) + Cucumber (100 g) + Tomato (50 g)',
        calories: 160,
        protein: 12,
        carbs: 24,
        fat: 1,
        time: '04:45 PM',
        icon: 'Apple'
      },
      {
        id: 'fl7_m4',
        type: 'Dinner',
        name: '2 Ragi Dosa (150 g) + 2 Boiled Eggs (100 g) + Vegetables (150 g)',
        calories: 470,
        protein: 24,
        carbs: 44,
        fat: 10,
        time: '07:30 PM',
        icon: 'Pizza'
      }
    ]
  }
];

export const mealPlans = [...muscleBuildingPlans, ...fatLossPlans];
export const initialNutrition = muscleBuildingPlans[0];

