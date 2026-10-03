import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  collection,
  query,
  orderBy,
  onSnapshot
} from 'firebase/firestore';
import { auth, db } from './firebase';

/**
 * Maps Firebase Auth and Firestore errors to standard user-facing messages.
 */
export const mapFirebaseError = (error) => {
  if (!error) return 'Something went wrong. Please try again later.';

  const code = error.code || '';
  const message = error.message || '';

  if (code === 'auth/email-already-in-use') {
    return 'This email is already registered.';
  }
  if (
    code === 'auth/invalid-credential' ||
    code === 'auth/user-not-found' ||
    code === 'auth/wrong-password' ||
    code === 'auth/invalid-email'
  ) {
    return 'Invalid email or password.';
  }
  if (
    code === 'permission-denied' ||
    message.includes('insufficient permissions') ||
    message.includes('permission-denied')
  ) {
    return 'Firestore Security Rules permission denied. Please publish Firestore Security Rules in Firebase Console.';
  }
  if (
    code === 'auth/network-request-failed' ||
    code === 'unavailable' ||
    message.includes('network')
  ) {
    return 'Unable to connect to Firebase. Please try again.';
  }
  if (
    code === 'auth/user-token-expired' ||
    code === 'auth/session-cookie-expired'
  ) {
    return 'Your session has expired. Please log in again.';
  }

  return 'Something went wrong. Please try again later.';
};

/**
 * Default fallback avatar if none provided.
 */
const DEFAULT_AVATAR = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80';

/**
 * Registers a new user with Firebase Authentication and creates a user profile document in Firestore.
 * Firestore Document Path: users/{uid}
 * DOES NOT store passwords in Firestore.
 */
export const registerUserWithFirebase = async (userData) => {
  try {
    const {
      email,
      password,
      name,
      age,
      height,
      weight,
      fitnessGoal,
      activityLevel,
      avatar
    } = userData;

    // 1. Create account with Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    // 2. Prepare user profile document for Firestore (NO password stored)
    const timestamp = new Date().toISOString();
    const profileData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      age: Number(age) || 25,
      height: Number(height) || 175,
      weight: Number(weight) || 70,
      fitnessGoal: fitnessGoal || 'Build Muscle',
      activityLevel: activityLevel || 'Moderately Active',
      avatar: avatar || DEFAULT_AVATAR,
      createdAt: timestamp,
      updatedAt: timestamp
    };

    // 3. Save profile under users/{uid} in Cloud Firestore
    try {
      await setDoc(doc(db, 'users', uid), profileData);
    } catch (fsErr) {
      console.warn('Firestore setDoc notice during registration:', fsErr.message);
    }

    return {
      success: true,
      status: 'success',
      message: 'Registration successful! Welcome to FitTrack AI.',
      uid,
      user: { uid, ...profileData }
    };
  } catch (error) {
    console.error('Firebase Registration Error:', error);
    return {
      success: false,
      status: 'rejected',
      message: mapFirebaseError(error),
      error
    };
  }
};

/**
 * Logs in user using Firebase Authentication and retrieves their profile from Firestore.
 */
export const loginUserWithFirebase = async (email, password) => {
  try {
    // 1. Authenticate credentials with Firebase Authentication
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    // 2. Load user profile from Cloud Firestore: users/{uid}
    const profile = await getUserProfileFromFirestore(uid, userCredential.user);

    return {
      success: true,
      status: 'success',
      message: 'Login successful! Welcome back.',
      uid,
      user: profile || {
        uid,
        email: userCredential.user.email,
        name: userCredential.user.displayName || email.split('@')[0],
        avatar: DEFAULT_AVATAR
      }
    };
  } catch (error) {
    console.error('Firebase Login Error:', error);
    return {
      success: false,
      status: 'rejected',
      message: mapFirebaseError(error),
      error
    };
  }
};

/**
 * Logs out the current user via Firebase signOut().
 */
export const logoutUserFromFirebase = async () => {
  try {
    await signOut(auth);
    return {
      success: true,
      status: 'success',
      message: 'Logged out successfully.'
    };
  } catch (error) {
    console.error('Firebase Logout Error:', error);
    return {
      success: false,
      status: 'error',
      message: mapFirebaseError(error)
    };
  }
};

/**
 * Fetches user profile document from Firestore: users/{uid}
 * If document doesn't exist, initializes a default profile document under users/{uid}.
 */
export const getUserProfileFromFirestore = async (uid, firebaseUserObj = null) => {
  if (!uid) return null;
  try {
    const userDocRef = doc(db, 'users', uid);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      return { uid, ...docSnap.data() };
    }

    // Document does not exist in Firestore yet: auto-create default profile for this UID
    const email = firebaseUserObj?.email || auth.currentUser?.email || '';
    const name = firebaseUserObj?.displayName || (email ? email.split('@')[0] : 'User');
    const timestamp = new Date().toISOString();

    const initialProfile = {
      name,
      email,
      age: 25,
      height: 175,
      weight: 70,
      fitnessGoal: 'Build Muscle',
      activityLevel: 'Moderately Active',
      avatar: DEFAULT_AVATAR,
      createdAt: timestamp,
      updatedAt: timestamp
    };

    try {
      await setDoc(userDocRef, initialProfile);
    } catch (e) {
      console.warn('Unable to auto-create Firestore doc:', e.message);
    }

    return { uid, ...initialProfile };
  } catch (error) {
    console.error('Error fetching Firestore user profile:', error);
    return null;
  }
};

/**
 * Updates user profile document in Firestore: users/{uid}
 */
export const updateUserProfileInFirestore = async (uid, updateFields) => {
  if (!uid) return { success: false, message: 'User ID missing.' };
  try {
    const userDocRef = doc(db, 'users', uid);
    const payload = {
      ...updateFields,
      updatedAt: new Date().toISOString()
    };
    await updateDoc(userDocRef, payload);

    return {
      success: true,
      message: 'Profile updated successfully.',
      payload
    };
  } catch (error) {
    console.error('Error updating Firestore user profile:', error);
    return {
      success: false,
      message: mapFirebaseError(error)
    };
  }
};

/**
 * Saves a completed workout session to Cloud Firestore path: users/{uid}/workoutHistory/{workoutId}
 */
export const saveWorkoutHistoryToFirestore = async (uid, workoutData) => {
  if (!uid) return { success: false, message: 'User ID missing.' };
  try {
    const workoutId = workoutData.workoutId || `workout_${Date.now()}`;
    const workoutDocRef = doc(db, 'users', uid, 'workoutHistory', workoutId);

    const payload = {
      ...workoutData,
      workoutId,
      completedAt: new Date().toISOString()
    };

    await setDoc(workoutDocRef, payload);

    return {
      success: true,
      workoutId,
      message: 'Workout history saved successfully to Firestore.'
    };
  } catch (error) {
    console.error('Error saving workout history to Firestore:', error);
    return {
      success: false,
      message: mapFirebaseError(error)
    };
  }
};

/**
 * Fetches user's workout history from Cloud Firestore path: users/{uid}/workoutHistory
 */
export const getWorkoutHistoryFromFirestore = async (uid) => {
  if (!uid) return [];
  try {
    const historyColRef = collection(db, 'users', uid, 'workoutHistory');
    const q = query(historyColRef, orderBy('completedAt', 'desc'));
    const snapshot = await getDocs(q);
    const history = [];
    snapshot.forEach((docSnap) => {
      history.push({ id: docSnap.id, ...docSnap.data() });
    });
    return history;
  } catch (error) {
    console.error('Error fetching workout history from Firestore:', error);
    return [];
  }
};

/**
 * Subscribes to Firebase Authentication state changes via onAuthStateChanged.
 */
export const subscribeToAuthState = (callback) => {
  return onAuthStateChanged(auth, callback);
};

/**
 * Calculates current week's (Monday through Sunday) aggregated calories and workout duration
 * from an array of completed workout history items from Firestore users/{uid}/workoutHistory.
 */
export const calculateWeeklyActivity = (workoutHistory = []) => {
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const now = new Date();
  const currentDay = now.getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat

  // Monday calculation:
  // If currentDay is 0 (Sun), Monday was 6 days ago.
  // Otherwise, Monday was (currentDay - 1) days ago.
  const daysSinceMonday = currentDay === 0 ? 6 : currentDay - 1;

  const monday = new Date(now);
  monday.setDate(now.getDate() - daysSinceMonday);
  monday.setHours(0, 0, 0, 0);

  const weekDays = daysOfWeek.map((dayName, index) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + index);

    const startOfDay = new Date(d);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(d);
    endOfDay.setHours(23, 59, 59, 999);

    return {
      day: dayName,
      startMs: startOfDay.getTime(),
      endMs: endOfDay.getTime(),
      calories: 0,
      duration: 0,
      exercises: 0
    };
  });

  if (Array.isArray(workoutHistory)) {
    workoutHistory.forEach((item) => {
      if (!item || !item.completedAt) return;

      const itemTime = new Date(item.completedAt).getTime();
      if (isNaN(itemTime)) return;

      const targetDay = weekDays.find(
        (wd) => itemTime >= wd.startMs && itemTime <= wd.endMs
      );

      if (targetDay) {
        const cal = Number(item.calories) || 0;
        const rawDur = Number(item.duration) || 0;
        const durMin = rawDur > 120 ? Math.round(rawDur / 60) : rawDur;
        const exCount = Number(item.exercisesCompleted) || 1;

        targetDay.calories += cal;
        targetDay.duration += durMin;
        targetDay.exercises += exCount;
      }
    });
  }

  return weekDays.map(({ day, calories, duration, exercises }) => ({
    day,
    calories,
    duration,
    exercises
  }));
};

/**
 * Realtime listener for user's workout history from Cloud Firestore path: users/{uid}/workoutHistory
 * Returns an unsubscribe function to clean up when unmounted.
 */
export const subscribeToWorkoutHistory = (uid, callback) => {
  if (!uid) {
    callback([]);
    return () => {};
  }
  try {
    const historyColRef = collection(db, 'users', uid, 'workoutHistory');
    const q = query(historyColRef, orderBy('completedAt', 'desc'));
    return onSnapshot(
      q,
      (snapshot) => {
        const history = [];
        snapshot.forEach((docSnap) => {
          history.push({ id: docSnap.id, ...docSnap.data() });
        });
        callback(history);
      },
      (error) => {
        console.error('Error listening to workout history in Firestore:', error);
        callback([]);
      }
    );
  } catch (error) {
    console.error('Error setting up workout history listener:', error);
    callback([]);
    return () => {};
  }
};

/**
 * Saves a logged meal to Cloud Firestore path: users/{uid}/mealHistory/{mealId}
 */
export const saveMealToFirestore = async (uid, mealData) => {
  if (!uid) return { success: false, message: 'User ID missing.' };
  try {
    const mealId = mealData.mealId || `meal_${Date.now()}`;
    const mealDocRef = doc(db, 'users', uid, 'mealHistory', mealId);

    const payload = {
      ...mealData,
      mealId,
      createdAt: new Date().toISOString()
    };

    await setDoc(mealDocRef, payload);
    return { success: true, mealId, message: 'Meal logged to Firestore.' };
  } catch (error) {
    console.error('Error saving meal to Firestore:', error);
    return { success: false, message: mapFirebaseError(error) };
  }
};

/**
 * Realtime listener for user's meal history from Cloud Firestore path: users/{uid}/mealHistory
 */
export const subscribeToMealHistory = (uid, callback) => {
  if (!uid) {
    callback([]);
    return () => {};
  }
  try {
    const colRef = collection(db, 'users', uid, 'mealHistory');
    const q = query(colRef, orderBy('createdAt', 'desc'));
    return onSnapshot(
      q,
      (snapshot) => {
        const meals = [];
        snapshot.forEach((docSnap) => {
          meals.push({ id: docSnap.id, ...docSnap.data() });
        });
        callback(meals);
      },
      (error) => {
        console.error('Error listening to meal history in Firestore:', error);
        callback([]);
      }
    );
  } catch (error) {
    console.error('Error setting up meal history listener:', error);
    callback([]);
    return () => {};
  }
};

/**
 * Saves logged water to Cloud Firestore path: users/{uid}/waterHistory/{waterId}
 */
export const saveWaterToFirestore = async (uid, waterData) => {
  if (!uid) return { success: false, message: 'User ID missing.' };
  try {
    const waterId = waterData.waterId || `water_${Date.now()}`;
    const waterDocRef = doc(db, 'users', uid, 'waterHistory', waterId);

    const payload = {
      ...waterData,
      waterId,
      createdAt: new Date().toISOString()
    };

    await setDoc(waterDocRef, payload);
    return { success: true, waterId, message: 'Water intake logged to Firestore.' };
  } catch (error) {
    console.error('Error saving water intake to Firestore:', error);
    return { success: false, message: mapFirebaseError(error) };
  }
};

/**
 * Realtime listener for user's water intake from Cloud Firestore path: users/{uid}/waterHistory
 */
export const subscribeToWaterHistory = (uid, callback) => {
  if (!uid) {
    callback([]);
    return () => {};
  }
  try {
    const colRef = collection(db, 'users', uid, 'waterHistory');
    const q = query(colRef, orderBy('createdAt', 'desc'));
    return onSnapshot(
      q,
      (snapshot) => {
        const items = [];
        snapshot.forEach((docSnap) => {
          items.push({ id: docSnap.id, ...docSnap.data() });
        });
        callback(items);
      },
      (error) => {
        console.error('Error listening to water history in Firestore:', error);
        callback([]);
      }
    );
  } catch (error) {
    console.error('Error setting up water history listener:', error);
    callback([]);
    return () => {};
  }
};

/**
 * Aggregates today's real stats from workoutHistory, mealHistory, and waterHistory.
 */
export const calculateTodayStats = (workoutHistory = [], mealHistory = [], waterHistory = []) => {
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0).getTime();
  const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999).getTime();

  let workoutMinutesToday = 0;
  if (Array.isArray(workoutHistory)) {
    workoutHistory.forEach((item) => {
      if (!item || !item.completedAt) return;
      const itemTime = new Date(item.completedAt).getTime();
      if (itemTime >= startOfToday && itemTime <= endOfToday) {
        const rawDur = Number(item.duration) || 0;
        const durMin = rawDur > 120 ? Math.round(rawDur / 60) : rawDur;
        workoutMinutesToday += durMin;
      }
    });
  }

  let caloriesToday = 0;
  if (Array.isArray(mealHistory)) {
    mealHistory.forEach((item) => {
      if (!item) return;
      const itemTime = new Date(item.createdAt || item.completedAt || item.date).getTime();
      if (itemTime >= startOfToday && itemTime <= endOfToday) {
        caloriesToday += Number(item.calories) || 0;
      }
    });
  }

  let waterLitersToday = 0;
  if (Array.isArray(waterHistory)) {
    waterHistory.forEach((item) => {
      if (!item) return;
      const itemTime = new Date(item.createdAt || item.completedAt || item.date).getTime();
      if (itemTime >= startOfToday && itemTime <= endOfToday) {
        const amt = Number(item.amount || item.liters) || 0;
        waterLitersToday += amt;
      }
    });
  }

  return {
    workoutMinutesToday,
    caloriesToday,
    waterLitersToday: +waterLitersToday.toFixed(1),
    stepsToday: 0
  };
};

/**
 * Calculates Bi-Weekly Workout Frequency (4 consecutive 14-day blocks ending today)
 * from real completed workouts in Firestore users/{uid}/workoutHistory.
 */
export const calculateBiWeeklyWorkoutFrequency = (workoutHistory = [], targetPerBiWeek = 10) => {
  const now = new Date();

  // End of today (23:59:59)
  const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);

  const blocks = [];
  const TOTAL_BLOCKS = 4;
  const DAYS_PER_BLOCK = 14;

  for (let i = TOTAL_BLOCKS - 1; i >= 0; i--) {
    const blockEnd = new Date(endOfToday);
    blockEnd.setDate(endOfToday.getDate() - (i * DAYS_PER_BLOCK));

    const blockStart = new Date(blockEnd);
    blockStart.setDate(blockEnd.getDate() - (DAYS_PER_BLOCK - 1));
    blockStart.setHours(0, 0, 0, 0);

    const blockNumber = TOTAL_BLOCKS - i;
    const periodName = i === 0 ? 'Bi-Week 4 (Current)' : `Bi-Week ${blockNumber}`;

    blocks.push({
      blockIndex: blockNumber,
      period: periodName,
      startMs: blockStart.getTime(),
      endMs: blockEnd.getTime(),
      completed: 0,
      target: targetPerBiWeek
    });
  }

  if (Array.isArray(workoutHistory)) {
    workoutHistory.forEach((item) => {
      if (!item || !item.completedAt) return;

      const itemTime = new Date(item.completedAt).getTime();
      if (isNaN(itemTime)) return;

      const targetBlock = blocks.find(
        (b) => itemTime >= b.startMs && itemTime <= b.endMs
      );

      if (targetBlock) {
        targetBlock.completed += 1;
      }
    });
  }

  return blocks.map(({ period, completed, target }) => ({
    period,
    completed,
    target,
    discipline: target > 0 ? `${Math.min(100, Math.round((completed / target) * 100))}%` : '0%'
  }));
};

/**
 * Calculates Discipline Score (0% to 100%) based on real user activity over the last 14 days:
 * - Workout Adherence (70%): Completed workouts vs 10-workout 2-week goal
 * - Meal Logging Adherence (20%): Days with logged meals vs 14 days
 * - Weight Check-In Consistency (10%): Has logged a weight check-in in the last 14 days
 */
export const calculateDisciplineScore = (workoutHistory = [], mealHistory = [], weightHistory = []) => {
  const now = new Date();
  const fourteenDaysAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 13, 0, 0, 0, 0).getTime();
  const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999).getTime();

  // 1. Workout Adherence (Last 14 days)
  let workoutsLast14Days = 0;
  if (Array.isArray(workoutHistory)) {
    workoutHistory.forEach((item) => {
      if (!item || !item.completedAt) return;
      const itemTime = new Date(item.completedAt).getTime();
      if (itemTime >= fourteenDaysAgo && itemTime <= endOfToday) {
        workoutsLast14Days += 1;
      }
    });
  }
  const TARGET_WORKOUTS_PER_BIWEEK = 10;
  const workoutAdherence = Math.min(100, (workoutsLast14Days / TARGET_WORKOUTS_PER_BIWEEK) * 100);

  // 2. Meal Logging Consistency (Last 14 days)
  const mealDaysSet = new Set();
  if (Array.isArray(mealHistory)) {
    mealHistory.forEach((item) => {
      if (!item) return;
      const itemTime = new Date(item.createdAt || item.completedAt || item.date).getTime();
      if (itemTime >= fourteenDaysAgo && itemTime <= endOfToday) {
        const dateKey = new Date(itemTime).toISOString().split('T')[0];
        mealDaysSet.add(dateKey);
      }
    });
  }
  const mealDaysCount = mealDaysSet.size;
  const mealAdherence = (mealDaysCount / 14) * 100;

  // 3. Weight Check-In Consistency (Last 14 days)
  let hasCheckInLast14Days = false;
  if (Array.isArray(weightHistory)) {
    weightHistory.forEach((item) => {
      if (!item) return;
      const itemTime = new Date(item.createdAt || item.date).getTime();
      if (itemTime >= fourteenDaysAgo && itemTime <= endOfToday) {
        hasCheckInLast14Days = true;
      }
    });
  }
  const checkInAdherence = hasCheckInLast14Days ? 100 : 0;

  // Composite Weighted Score
  const score = Math.min(
    100,
    Math.round(0.70 * workoutAdherence + 0.20 * mealAdherence + 0.10 * checkInAdherence)
  );

  let badgeText = 'No Activity Yet';
  if (score >= 80) {
    badgeText = 'Highly Disciplined';
  } else if (score >= 50) {
    badgeText = 'Consistent';
  } else if (score > 0) {
    badgeText = 'Getting Started';
  }

  return {
    score,
    badgeText,
    workoutsLast14Days,
    mealDaysCount,
    hasCheckInLast14Days
  };
};



/**
 * Saves a 2-Week Weight Check-In to Cloud Firestore path: users/{uid}/weightHistory/{checkInId}
 * And updates current weight on profile document users/{uid}.
 */
export const saveWeightCheckInToFirestore = async (uid, checkInData) => {
  if (!uid) return { success: false, message: 'User ID missing.' };
  try {
    const weightVal = Number(checkInData.weight);
    if (isNaN(weightVal) || weightVal <= 0) {
      return { success: false, message: 'Invalid weight value.' };
    }

    const checkInId = checkInData.checkInId || `checkin_${Date.now()}`;
    const checkInDocRef = doc(db, 'users', uid, 'weightHistory', checkInId);

    const payload = {
      weight: weightVal,
      period: checkInData.period || 'Check-in',
      checkInId,
      createdAt: new Date().toISOString()
    };

    await setDoc(checkInDocRef, payload);

    const userDocRef = doc(db, 'users', uid);
    await updateDoc(userDocRef, {
      weight: weightVal,
      updatedAt: new Date().toISOString()
    }).catch(async () => {
      await setDoc(userDocRef, { weight: weightVal, updatedAt: new Date().toISOString() }, { merge: true });
    });

    return { success: true, checkInId, message: 'Weight check-in saved to Firestore.' };
  } catch (error) {
    console.error('Error saving weight check-in to Firestore:', error);
    return { success: false, message: mapFirebaseError(error) };
  }
};

/**
 * Realtime listener for user's weight check-in history from Cloud Firestore path: users/{uid}/weightHistory
 */
export const subscribeToWeightHistory = (uid, callback) => {
  if (!uid) {
    callback([]);
    return () => {};
  }
  try {
    const colRef = collection(db, 'users', uid, 'weightHistory');
    const q = query(colRef, orderBy('createdAt', 'asc'));
    return onSnapshot(
      q,
      (snapshot) => {
        const history = [];
        snapshot.forEach((docSnap) => {
          history.push({ id: docSnap.id, ...docSnap.data() });
        });
        callback(history);
      },
      (error) => {
        console.error('Error listening to weight history in Firestore:', error);
        callback([]);
      }
    );
  } catch (error) {
    console.error('Error setting up weight history listener:', error);
    callback([]);
    return () => {};
  }
};

/**
 * Realtime listener for user profile document from Cloud Firestore path: users/{uid}
 */
export const subscribeToUserProfile = (uid, callback) => {
  if (!uid) {
    callback(null);
    return () => {};
  }
  try {
    const userDocRef = doc(db, 'users', uid);
    return onSnapshot(
      userDocRef,
      (docSnap) => {
        if (docSnap.exists()) {
          callback({ uid, ...docSnap.data() });
        } else {
          callback(null);
        }
      },
      (error) => {
        console.error('Error listening to user profile in Firestore:', error);
        callback(null);
      }
    );
  } catch (error) {
    console.error('Error setting up user profile listener:', error);
    callback(null);
    return () => {};
  }
};

/**
 * Realtime listener for custom user goals from Cloud Firestore path: users/{uid}/goals
 */
export const subscribeToGoals = (uid, callback) => {
  if (!uid) {
    callback([]);
    return () => {};
  }
  try {
    const goalsColRef = collection(db, 'users', uid, 'goals');
    return onSnapshot(
      goalsColRef,
      (snapshot) => {
        const goalsList = [];
        snapshot.forEach((docSnap) => {
          goalsList.push({ id: docSnap.id, ...docSnap.data() });
        });
        callback(goalsList);
      },
      (error) => {
        console.error('Error listening to goals in Firestore:', error);
        callback([]);
      }
    );
  } catch (error) {
    console.error('Error setting up goals listener:', error);
    callback([]);
    return () => {};
  }
};

/**
 * Saves a new goal to Cloud Firestore path: users/{uid}/goals/{goalId}
 */
export const saveGoalToFirestore = async (uid, goalData) => {
  if (!uid) return { success: false, message: 'User ID missing.' };
  try {
    const goalId = goalData.id || `goal_${Date.now()}`;
    const goalDocRef = doc(db, 'users', uid, 'goals', goalId);
    const payload = {
      ...goalData,
      id: goalId,
      updatedAt: new Date().toISOString()
    };
    await setDoc(goalDocRef, payload);
    return { success: true, goalId, message: 'Goal saved successfully.' };
  } catch (error) {
    console.error('Error saving goal to Firestore:', error);
    return { success: false, message: mapFirebaseError(error) };
  }
};

/**
 * Updates an existing goal in Cloud Firestore path: users/{uid}/goals/{goalId}
 */
export const updateGoalInFirestore = async (uid, goalId, updateData) => {
  if (!uid || !goalId) return { success: false, message: 'User ID or Goal ID missing.' };
  try {
    const goalDocRef = doc(db, 'users', uid, 'goals', goalId);
    const payload = {
      ...updateData,
      updatedAt: new Date().toISOString()
    };
    await updateDoc(goalDocRef, payload);
    return { success: true, message: 'Goal updated successfully.' };
  } catch (error) {
    console.error('Error updating goal in Firestore:', error);
    return { success: false, message: mapFirebaseError(error) };
  }
};

/**
 * Deletes a goal from Cloud Firestore path: users/{uid}/goals/{goalId}
 */
export const deleteGoalFromFirestore = async (uid, goalId) => {
  if (!uid || !goalId) return { success: false, message: 'User ID or Goal ID missing.' };
  try {
    const goalDocRef = doc(db, 'users', uid, 'goals', goalId);
    await deleteDoc(goalDocRef);
    return { success: true, message: 'Goal deleted successfully.' };
  } catch (error) {
    console.error('Error deleting goal from Firestore:', error);
    return { success: false, message: mapFirebaseError(error) };
  }
};




