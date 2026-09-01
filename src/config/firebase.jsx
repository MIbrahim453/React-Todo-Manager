// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAgnAeLqEHttzjvkE7OdGB0uJsRAarCppo",
  authDomain: "react-todo-213.firebaseapp.com",
  projectId: "react-todo-213",
  storageBucket: "react-todo-213.firebasestorage.app",
  messagingSenderId: "708009679363",
  appId: "1:708009679363:web:2f415c54b7c9560be6cc36",
  measurementId: "G-LFR2EB32CT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const analytics = getAnalytics(app);

export { analytics, auth }