import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase.init";
import axios from "axios";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Store users from the database
  const [allUsers, setAllUsers] = useState([]);
  const [currentUserFromDB, setCurrentUserFromDB] = useState(null);

  // Fetch users from database
  useEffect(() => {
    fetch(`https://tutor-sphere-server-side.vercel.app/users`)
      .then((res) => res.json())
      .then((data) => setAllUsers(data))
      .catch((error) => console.error("Failed to fetch users:", error));
  }, []);

  // Find the currently logged-in user from the fetched users
  useEffect(() => {
    if (user && allUsers.length > 0) {
      const foundUser = allUsers.find((u) => u.email === user.email);
      setCurrentUserFromDB(foundUser || null);
    }
  }, [user, allUsers]);

  // AUTHENTICATION FUNCTIONS
  const createUser = async (email, password) => {
    setLoading(true);
    try {
      return await createUserWithEmailAndPassword(auth, email, password);
    } finally {
      setLoading(false);
    }
  };

  const signInUser = async (email, password) => {
    setLoading(true);
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } finally {
      setLoading(false);
    }
  };

  const signOutUser = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setCurrentUserFromDB(null);
    } finally {
      setLoading(false);
    }
  };

  const googleProvider = new GoogleAuthProvider();
  const handleGoogleAuth = async () => {
    setLoading(true);
    try {
      return await signInWithPopup(auth, googleProvider);
    } finally {
      setLoading(false);
    }
  };

  // On Auth State Changed
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
      if (currentUser?.email) {
        const user = { email: currentUser.email };
        axios
          .post(`https://tutor-sphere-server-side.vercel.app/jwt`, user, { withCredentials: true })
          .then((res) => {
            // console.log("Login", res.data);
            setLoading(false);
          });
      } else {
        axios
          .post(`https://tutor-sphere-server-side.vercel.app/logout`, {}, { withCredentials: true })
          .then((res) => {
            // console.log("Logout", res.data);
            setLoading(false);
          });
      }
    });
    return () => unsubscribe();
  }, []);

  // Context Value
  const authInfo = {
    user,
    currentUserFromDB,
    loading,
    createUser,
    signInUser,
    signOutUser,
    handleGoogleAuth,
  };

  // RENDERING
  return (
    <AuthContext.Provider value={authInfo}>
      {loading ? (
        <div className="flex items-center justify-center h-screen bg-gray-100">
          <div className="relative flex items-center justify-center">
            <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-blue-500 border-dotted"></div>
          </div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
