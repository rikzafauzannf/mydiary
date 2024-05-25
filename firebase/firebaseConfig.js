// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAxAmjHfu6Pw-2bvyz8haNPEF81BB4BRZo",
  authDomain: "mydiary-85c9d.firebaseapp.com",
  projectId: "mydiary-85c9d",
  storageBucket: "mydiary-85c9d.appspot.com",
  messagingSenderId: "442456900034",
  appId: "1:442456900034:web:045beae3cc23f32c22965b",
  measurementId: "G-ZFGG7450S3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

let analytics;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, db, auth, analytics };
