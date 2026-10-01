import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDGgAGSHmE5eZCmJvWosFIJCwXiGmK1KeQ",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "fittrack2027.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "fittrack2027",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "fittrack2027.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "288034521802",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:288034521802:web:b14335e0c4113ea2536a33",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-JM63VQF9JB"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firebase Services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
