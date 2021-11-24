// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCT0S-82iAtESzFCtUkYkAYdaVr-bBQw9A",
  authDomain: "next-auth-ad0e4.firebaseapp.com",
  projectId: "next-auth-ad0e4",
  storageBucket: "next-auth-ad0e4.appspot.com",
  messagingSenderId: "538011789470",
  appId: "1:538011789470:web:2237927ba295207ab5738f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

//add providers

// provider.setCustomParameters({ prompt: "select_account" });

export { auth };
