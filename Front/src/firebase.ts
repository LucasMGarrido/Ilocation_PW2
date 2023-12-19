import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAu_Q6QKU_l57KqTjvALfDksXNZApNjiA",
  authDomain: "imagesimoveis.firebaseapp.com",
  projectId: "imagesimoveis",
  storageBucket: "imagesimoveis.appspot.com",
  messagingSenderId: "674661864063",
  appId: "1:674661864063:web:de79818b86eea30953254a",
  measurementId: "G-TYMZH0K95C"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
