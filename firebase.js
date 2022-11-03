import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const SPEND_COLLECTION = "spends";

const firebaseConfig = {
  apiKey: "AIzaSyAm6I3DbEZoEUNlrhH6bjuUcnIPkXY9pAA",
  authDomain: "vue-crm-learn-b9979.firebaseapp.com",
  databaseURL: "https://vue-crm-learn-b9979-default-rtdb.firebaseio.com",
  projectId: "vue-crm-learn-b9979",
  storageBucket: "vue-crm-learn-b9979.appspot.com",
  messagingSenderId: "506692574135",
  appId: "1:506692574135:web:e36c6372b72fcd7cb7a632",
  measurementId: "G-QL4YPBMVEP"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export {
    auth,
    db,
    SPEND_COLLECTION
}