// firebaseConfig.js

// Import des fonctions dont vous avez besoin
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyActD4nIliMutVLMQIhIaXgWKE-93jIo50",
  authDomain: "lacartouche-97361.firebaseapp.com",
  projectId: "lacartouche-97361",
  storageBucket: "lacartouche-97361.firebasestorage.app",
  messagingSenderId: "423479436173",
  appId: "1:423479436173:web:e849d1852aa78e9077d3c4",
  measurementId: "G-HLLSJJQGPQ"
};

// Initialisation de l'app Firebase
const app = initializeApp(firebaseConfig);

// Initialisation de Firestore
export const db = getFirestore(app);

// Initialisation de l'authentification
export const auth = getAuth(app);