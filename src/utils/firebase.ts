// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAvClg_MEUBo7qw8NLB2MCyJQicMhzBKKU",
  authDomain: "task-shot.firebaseapp.com",
  projectId: "task-shot",
  storageBucket: "task-shot.firebasestorage.app",
  messagingSenderId: "515508301608",
  appId: "1:515508301608:web:20d2860d9e891ca8a22a1d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const base = getFirestore(app);
export const tasksCol = collection(base, "tasks");
export const usersCol = collection(base, "users");
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();