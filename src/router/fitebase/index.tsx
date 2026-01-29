import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB3bEdUkRk01VaBVFKGpDpx04vnTar9vcE",
  authDomain: "vercalin-1cfdd.firebaseapp.com",
  projectId: "vercalin-1cfdd",
  storageBucket: "vercalin-1cfdd.firebasestorage.app",
  messagingSenderId: "127624363101",
  appId: "1:127624363101:web:e044e132745db6a99161b4",
  measurementId: "G-B8G1CMDHGQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
