// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMGIVbfPfTm4hPh0z_KbSmNYde3DQW6AA",
  authDomain: "functionfind2.firebaseapp.com",
  projectId: "functionfind2",
  storageBucket: "functionfind2.firebasestorage.app",
  messagingSenderId: "291212491912",
  appId: "1:291212491912:web:5dbae16c99c011e269b33d",
  measurementId: "G-PY6VW9NDY9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export {db, auth}