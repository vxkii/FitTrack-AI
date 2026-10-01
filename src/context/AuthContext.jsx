import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  registerUserWithFirebase,
  loginUserWithFirebase,
  logoutUserFromFirebase,
  getUserProfileFromFirestore,
  updateUserProfileInFirestore,
  subscribeToAuthState
} from '../services/firebaseAuth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Subscribe to Firebase Authentication state changes
  useEffect(() => {
    const unsubscribe = subscribeToAuthState(async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const profile = await getUserProfileFromFirestore(firebaseUser.uid);
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            name: firebaseUser.displayName || firebaseUser.email.split('@')[0],
            ...profile
          });
        } catch (err) {
          console.error('Failed to load user profile from Firestore:', err);
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Firebase Register
  const register = async (userData) => {
    const res = await registerUserWithFirebase(userData);
    if (res.success && res.user) {
      setUser(res.user);
    }
    return res;
  };

  // Firebase Login
  const login = async (email, password) => {
    const res = await loginUserWithFirebase(email, password);
    if (res.success && res.user) {
      setUser(res.user);
    }
    return res;
  };

  // Firebase Logout
  const logout = useCallback(async () => {
    const res = await logoutUserFromFirebase();
    setUser(null);
    return res;
  }, []);

  // Update Profile in Firestore
  const updateProfile = async (updateFields) => {
    if (!user?.uid) return { success: false, message: 'No active user session.' };
    const res = await updateUserProfileInFirestore(user.uid, updateFields);
    if (res.success) {
      setUser((prev) => ({ ...prev, ...updateFields }));
    }
    return res;
  };

  const value = {
    user,
    isAuthenticated: Boolean(user),
    loading,
    login,
    register,
    logout,
    updateProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
