import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDiO9NJTI7Mm-bC2RGUFyu4EZ9mFL-E2GU",
  authDomain: "react-js-adrian-diego.firebaseapp.com",
  projectId: "react-js-adrian-diego",
  storageBucket: "react-js-adrian-diego.appspot.com",
  messagingSenderId: "473763408775",
  appId: "1:473763408775:web:c05ebda5410b84dc4a4122",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)