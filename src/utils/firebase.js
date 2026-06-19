// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAbr11zD4Xa1cWEExqJ7VsC2tbyFZHDY3o",
  authDomain: "netflix-gpt-a1e38.firebaseapp.com",
  projectId: "netflix-gpt-a1e38",
  storageBucket: "netflix-gpt-a1e38.firebasestorage.app",
  messagingSenderId: "398171838063",
  appId: "1:398171838063:web:44c85e8260cd58b1b81f9a",
  measurementId: "G-3M6HCLXPYZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
