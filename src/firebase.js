// src/firebase.js
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database'; // Import Realtime Database
import { getAnalytics } from 'firebase/analytics'; // Import Analytics

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsVGY76nf-BpVOaU8USwAbyt6_nXgenB4",
  authDomain: "vtu-notes-e1d8d.firebaseapp.com",
  projectId: "vtu-notes-e1d8d",
  storageBucket: "vtu-notes-e1d8d.appspot.com",
  messagingSenderId: "572338268953",
  appId: "1:572338268953:web:b99b118dda90819a817388",
  measurementId: "G-79CH5X9VL3"
};

// Initialize Firebase app if not already initialized
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase services
const auth = getAuth(app);
const storage = getStorage(app);
const firestore = getFirestore(app);
const database = getDatabase(app); // Initialize Realtime Database
const analytics = getAnalytics(app); // Initialize Analytics

export { auth, storage, firestore, database, analytics }; // Export analytics
