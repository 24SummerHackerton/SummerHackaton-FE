// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBp6GQXl5z_pJs1fOpPjEsqA8Zv6daccEw",
  authDomain: "chepl-67aa6.firebaseapp.com",
  projectId: "chepl-67aa6",
  storageBucket: "chepl-67aa6.appspot.com",
  messagingSenderId: "549179713305",
  appId: "1:549179713305:web:45fa4c1aa678d7373e8788",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const database = getFirestore(app);
