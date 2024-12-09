// Import the functions you need from the SDKs you need
import { collection, getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfQpFO_CphDcVf0GyyuCP2lHVcIaOadiw",
  authDomain: "task-shot.firebaseapp.com",
  projectId: "task-shot",
  storageBucket: "task-shot.firebasestorage.app",
  messagingSenderId: "515508301608",
  appId: "1:515508301608:web:b2326b08a4a31effa22a1d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const base = getFirestore(app);
export const tasksCol = collection(base, "tasks");
export const usersCol = collection(base, "users");
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();