// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";
import * as firebaseui from 'firebaseui'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB8Mw7Fku0mO_PsUiv1d-DxAuWvMVhvgCg",
    authDomain: "apikeysafe.firebaseapp.com",
    projectId: "apikeysafe",
    storageBucket: "apikeysafe.appspot.com",
    messagingSenderId: "839041484167",
    appId: "1:839041484167:web:b22639e5adb8b9fc09ff22",
    measurementId: "G-VJLYX2FW7Q"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();

export const loginWithGoogle = () => signInWithPopup(auth, googleProvider)
