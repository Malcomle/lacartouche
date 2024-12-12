// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyActD4nIliMutVLMQIhIaXgWKE-93jIo50",
  authDomain: "lacartouche-97361.firebaseapp.com",
  projectId: "lacartouche-97361",
  storageBucket: "lacartouche-97361.firebasestorage.app",
  messagingSenderId: "423479436173",
  appId: "1:423479436173:web:e849d1852aa78e9077d3c4",
  measurementId: "G-HLLSJJQGPQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };