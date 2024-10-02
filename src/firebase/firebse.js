// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBM3LjVhavulvjpDvl2craVkEUrhH6C_aE",
  authDomain: "ai-trip-generator-8dbab.firebaseapp.com",
  projectId: "ai-trip-generator-8dbab",
  storageBucket: "ai-trip-generator-8dbab.appspot.com",
  messagingSenderId: "382106833985",
  appId: "1:382106833985:web:26662de7a394b3abf262c0",
  measurementId: "G-E2FR3LG1K3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app); 

export { auth, provider, signInWithPopup,db };