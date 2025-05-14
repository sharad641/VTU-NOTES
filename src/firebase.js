import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    GoogleAuthProvider, 
    signInWithPopup, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    onAuthStateChanged, 
    signInAnonymously 
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

// Your Firebase configuration
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

// Initialize Firebase services
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
const database = getDatabase(app);
const googleAuthProvider = new GoogleAuthProvider();
const analytics = getAnalytics(app);

// Export Firebase services and methods
export {
    auth,
    firestore,
    storage,
    database,
    googleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    signInAnonymously,
    onAuthStateChanged,
    analytics
};