// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA3C42BPfbfySUFrYbjnF5Ceczf6XlEiGA",
    authDomain: "finalproject-curated.firebaseapp.com",
    projectId: "finalproject-curated",
    storageBucket: "finalproject-curated.firebasestorage.app",
    messagingSenderId: "782526374722",
    appId: "1:782526374722:web:5eafa75209733ca02f5edb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);