// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCiJLcTfO8ruFNo0qpetAqrSU8XgK2BT2c",
    authDomain: "buildthis-1af24.firebaseapp.com",
    projectId: "buildthis-1af24",
    storageBucket: "buildthis-1af24.appspot.com",
    messagingSenderId: "1001512498454",
    appId: "1:1001512498454:web:1a9e6d250fedc6d66f8c37",
    measurementId: "G-EY70RL4X8N"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore()