// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAGoLMTv_Sd_JIZgver2krIcr8n9dpSg3I",
  authDomain: "namemanagement-daa95.firebaseapp.com",
  projectId: "namemanagement-daa95",
  storageBucket: "namemanagement-daa95.firebasestorage.app",
  messagingSenderId: "138266283559",
  appId: "G-MJRFZEE229"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
