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
  collection,
  query,
  orderBy
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
