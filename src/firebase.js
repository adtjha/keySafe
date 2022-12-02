// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { connectFirestoreEmulator, enableIndexedDbPersistence, getFirestore } from "firebase/firestore";
import { connectFunctionsEmulator, getFunctions, httpsCallable } from 'firebase/functions'
import { connectStorageEmulator, getStorage } from "firebase/storage"
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

export const functions = getFunctions(app)
connectFunctionsEmulator(functions, "localhost", 5001)

export const auth = getAuth(app);
connectAuthEmulator(auth, "http://localhost:9099");

export const db = getFirestore(app);
connectFirestoreEmulator(db, 'localhost', 8080);

export const storage = getStorage(app, "gs://apikeysafe.appspot.com");
connectStorageEmulator(storage, "localhost", 9199);

export const googleProvider = new GoogleAuthProvider();

export const loginWithGoogle = () => signInWithPopup(auth, googleProvider)

export const generateSecret = httpsCallable(functions, 'generateSecret');

// console.log('here')
// generateSecret({ hello: 'world' }).then(e => console.log(e)).catch(e => console.error(e))


enableIndexedDbPersistence(db)
    .catch((err) => {
        if (err.code === 'failed-precondition') {
            console.log(`
            Multiple tabs open, persistence can only be enabled
            in one tab at a a time.
            `)
            // ...
        } else if (err.code === 'unimplemented') {
            console.log(`
            The current browser does not support all of the
            features required to enable persistence.
            `)
            // ...
        }
    });
