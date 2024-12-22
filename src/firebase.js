import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // if using Firestore
import { getStorage } from "firebase/storage"; // if using Firebase Storage
import { getDatabase } from "firebase/database"; // if using Firebase Realtime Database
import { getAnalytics } from "firebase/analytics"; // if you want to use Analytics

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsVGY76nf-BpVOaU8USwAbyt6_nXgenB4",
  authDomain: "vtu-notes-e1d8d.firebaseapp.com",
  databaseURL: "https://vtu-notes-e1d8d-default-rtdb.firebaseio.com",
  projectId: "vtu-notes-e1d8d",
  storageBucket: "vtu-notes-e1d8d.appspot.com",
  messagingSenderId: "572338268953",
  appId: "1:572338268953:web:b99b118dda90819a817388",
  measurementId: "G-79CH5X9VL3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
const database = getDatabase(app);
const googleAuthProvider = new GoogleAuthProvider();
const analytics = getAnalytics(app); // If using analytics

// Export services
export {
  auth,
  firestore,
  storage,
  database,
  googleAuthProvider, // Export googleAuthProvider
  createUserWithEmailAndPassword, // Export createUserWithEmailAndPassword
  signInWithEmailAndPassword, 
  signInWithPopup,
  onAuthStateChanged,
  analytics // Export analytics if you use it
};
