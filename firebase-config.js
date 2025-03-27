// firebase-config.js (same as client-side)
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";
import { getFirestore, collection, query, onSnapshot, updateDoc, doc } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAiWgYVu7J4p0hXWZlZuswEAcYEy_Hvpak",
    authDomain: "kerala-5707b.firebaseapp.com",
    projectId: "kerala-5707b",
    storageBucket: "kerala-5707b.appspot.com",
    messagingSenderId: "559614265575",
    appId: "1:559614265575:web:9e3de8dbc23b94006afa42"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, db, auth, collection, query, onSnapshot, updateDoc, doc };