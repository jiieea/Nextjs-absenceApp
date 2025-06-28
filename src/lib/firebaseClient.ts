// Import the functions you need from the SDKs you need
import { getApps, initializeApp , getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {  getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


const firebaseConfig = {
  apiKey: "AIzaSyAMlrOpHFUVdf9o86Dl5Zq5Qv8oNTJVGdY",
  authDomain: "class-attendence-14a62.firebaseapp.com",
  projectId: "class-attendence-14a62",
  storageBucket: "class-attendence-14a62.firebasestorage.app",
  messagingSenderId: "825381034972",
  appId: "1:825381034972:web:8c2912d67cfbd6000bcd19",
  measurementId: "G-NEX3W9SZ9T"
};

const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();
let analytics;
if(typeof window !== "undefined") {
  analytics = getAnalytics(app)}
// Initialize Firebase

export { analytics } 
export const db = getFirestore()
export const auth = getAuth();