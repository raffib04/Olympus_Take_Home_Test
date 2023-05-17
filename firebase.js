import firebase from "firebase/compat/app";
import "firebase/compat/auth";

import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCDc761AVEHQIApm5twN2iqG2DAz7hpkro",
    authDomain: "olympus-auth-3c9e0.firebaseapp.com",
    projectId: "olympus-auth-3c9e0",
    storageBucket: "olympus-auth-3c9e0.appspot.com",
    messagingSenderId: "1032929806343",
    appId: "1:1032929806343:web:1e240f99e93e268a92c2a2",
};

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

const db = getFirestore(app);

export { auth, db };
