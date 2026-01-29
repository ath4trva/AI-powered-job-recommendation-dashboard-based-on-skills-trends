// src/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Firestore Database
import { getStorage } from "firebase/storage";   // Storage for PDFs

// Replace with your actual config from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyAhDVKbwq9ASWcj4NGA3YBIsp2Ml3tMs_I",
  authDomain: "jobsync-ai-a5a36.firebaseapp.com",
  databaseURL: "https://jobsync-ai-a5a36-default-rtdb.firebaseio.com",
  projectId: "jobsync-ai-a5a36",
  storageBucket: "jobsync-ai-a5a36.firebasestorage.app",
  messagingSenderId: "428755090796",
  appId: "1:428755090796:web:ad4071bfa56257db3b0749",
  measurementId: "G-LL17C3ZF6S"
};

const app = initializeApp(firebaseConfig);

// Export the instances
export const auth = getAuth(app);
export const db = getFirestore(app); // Exported as 'db' (Firestore)
export const storage = getStorage(app);