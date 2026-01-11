// firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDtffGycfqklrtpqrtUSHKpCYItU1g9txA",
  authDomain: "nyaymitra-69a4a.firebaseapp.com",
  projectId: "nyaymitra-69a4a",
  storageBucket: "nyaymitra-69a4a.firebasestorage.app",
  messagingSenderId: "287137696182",
  appId: "1:287137696182:web:995aa1c42f9c8ea45e9917",
  measurementId: "G-C1N0B10Q28"
};

const app = initializeApp(firebaseConfig);

// These are the two tools we will use:
export const auth = getAuth(app);      // For Login/Sign-up
export const db = getFirestore(app);   // For storing user data
