import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged 
} from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
import { getAnalytics } from 'firebase/analytics';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsVGY76nf-BpVOaU8USwAbyt6_nXgenB4",
  authDomain: "vtu-notes-e1d8d.firebaseapp.com",
  databaseURL: "https://vtu-notes-e1d8d-default-rtdb.firebaseio.com", // Realtime Database URL
  projectId: "vtu-notes-e1d8d",
  storageBucket: "vtu-notes-e1d8d.appspot.com",
  messagingSenderId: "572338268953",
  appId: "1:572338268953:web:b99b118dda90819a817388",
  measurementId: "G-79CH5X9VL3"
};

// Initialize Firebase app (singleton pattern)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase services
const auth = getAuth(app);
const storage = getStorage(app);
const firestore = getFirestore(app);
const database = getDatabase(app); // Realtime Database
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null; // Analytics (only in browser environment)

// Export the initialized services and authentication methods
export { 
  auth, 
  storage, 
  firestore, 
  database, 
  analytics, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider,
  onAuthStateChanged 
};
