import { initializeApp } from "firebase/app";
import { getAuth, sendSignInLinkToEmail, signInWithEmailLink, isSignInWithEmailLink } from "firebase/auth";
import process from "process";

{console.log(process.env.REACT_APP_FIREBASE_API_KEY)}
const firebaseConfig = {
  apiKey: 'AIzaSyDThI2apXiWXj-xLvRwgxHsPX88D2UBWnM',
  authDomain: "rydo-636aa.firebaseapp.com",
  projectId: "rydo-636aa",
  storageBucket: "rydo-636aa.firebasestorage.app",
  messagingSenderId: "843567514235",
  appId: "1:843567514235:web:9a9aa5835d846699d818de",
  measurementId: "G-KYZXG2822E"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, sendSignInLinkToEmail, signInWithEmailLink, isSignInWithEmailLink };
