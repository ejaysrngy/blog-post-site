// Import the functions you need from the SDKs you need

import { initializeApp, getApps } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyDnQFYPpX2TY4MlX7UDWCvVT3Do9TblbmY",

  authDomain: "blog-post-site-763de.firebaseapp.com",

  projectId: "blog-post-site-763de",

  storageBucket: "blog-post-site-763de.appspot.com",

  messagingSenderId: "437035677977",

  appId: "1:437035677977:web:b497b06c23f0ff647dad88",

  measurementId: "G-4Q8EW5QC7M",
};

// const firebaseConfig = {
//   apiKey: process.env._API_KEY,

//   authDomain: process.env._AUTH_DOMAIN,

//   projectId: process.env._PROJECT_ID,

//   storageBucket: process.env._STORAGE_BUCKET,

//   messagingSenderId: process.env._MESSAGING_SENDER_ID,

//   appId: process.env._APP_ID,

//   measurementId: process.env._MEASUREMENT_ID,
// };

// Initialize Firebase

const firebase_app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export default firebase_app;
