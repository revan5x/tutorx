import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAY3PGnkMM6-MCCW5OV5V3pzXtjej39lDQ",
  authDomain: "turtorsphere.firebaseapp.com",
  projectId: "turtorsphere",
  storageBucket: "turtorsphere.firebasestorage.app",
  messagingSenderId: "1075533256648",
  appId: "1:1075533256648:web:9d2b1befcb6e926a8652fd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
