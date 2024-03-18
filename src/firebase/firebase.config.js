// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHKDttE-3eoEsPGT8rK3gQSArfxHHmYVQ",
  authDomain: "user-email-password-auth-cb572.firebaseapp.com",
  projectId: "user-email-password-auth-cb572",
  storageBucket: "user-email-password-auth-cb572.appspot.com",
  messagingSenderId: "554714346676",
  appId: "1:554714346676:web:1e5412001b471c1c1953e1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
