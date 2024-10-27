import { getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
    apiKey: "AIzaSyAq97yIGvx3-sTPA0KQuuNeUwTPJ_Jmj6w",
    authDomain: "contact-details-48503.firebaseapp.com",
    projectId: "contact-details-48503",
    storageBucket: "contact-details-48503.appspot.com",
    messagingSenderId: "209582268057",
    appId: "1:209582268057:web:189de925f8b7348526e208",
    measurementId: "G-14NPTG4M3D"
};
// Initialize Firebase
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);