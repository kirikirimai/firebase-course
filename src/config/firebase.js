// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCxGMBFP22NA07KMI1KGgApaRELejJREAE",
  authDomain: "fir-couse-d206e.firebaseapp.com",
  projectId: "fir-couse-d206e",
  storageBucket: "fir-couse-d206e.appspot.com",
  messagingSenderId: "520728062984",
  appId: "1:520728062984:web:bfa141ec876551c723b5bd",
  measurementId: "G-ZQBY9N5QSJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const googleProvider=new GoogleAuthProvider()