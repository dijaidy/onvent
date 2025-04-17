// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0Opyw1NxZrNRs6Qmi35WLPYFpGXdOw5c",
  authDomain: "snufeonline.firebaseapp.com",
  projectId: "snufeonline",
  storageBucket: "snufeonline.firebasestorage.app",
  messagingSenderId: "375062114605",
  appId: "1:375062114605:web:e00b4e3a325a1ad86163a4",
  measurementId: "G-EYG7LMPMW4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);