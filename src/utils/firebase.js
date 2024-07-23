// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpFSahQhrPKYrRoI0Vq_X_8cj_BaexMwE",
  authDomain: "netflixgpt-429eb.firebaseapp.com",
  projectId: "netflixgpt-429eb",
  storageBucket: "netflixgpt-429eb.appspot.com",
  messagingSenderId: "641451104286",
  appId: "1:641451104286:web:d51312f345e6b2e0b6760f",
  measurementId: "G-SN1PBRJMJE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
