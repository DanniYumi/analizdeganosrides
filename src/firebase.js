
import {getFirestore} from "firebase/firestore"
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbHZ-sj2D13lCYvnUxF7jUA4BofFBfUK4",
  authDomain: "analizproject-bd2c9.firebaseapp.com",
  projectId: "analizproject-bd2c9",
  storageBucket: "analizproject-bd2c9.appspot.com",
  messagingSenderId: "1076564534613",
  appId: "1:1076564534613:web:8cea0c04688da52f32bbdc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const user = auth.currentUser;
export {db, auth, user};

