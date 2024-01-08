import { initializeApp } from "firebase/app";
import { auth } from "firebase/app";
//var firebase = require('firebase')
//import firebase from 'firebase/app'

const firebaseConfig = {
  apiKey: "AIzaSyBc10ugt9naJF8inUrXolzyIqYwRetmXjg",
  authDomain: "eng-ver-2.firebaseapp.com",
  projectId: "eng-ver-2",
  storageBucket: "eng-ver-2.appspot.com",
  messagingSenderId: "11804727838",
  appId: "1:11804727838:web:e6dfa01e1a7a2d2bdaec0f",
  measurementId: "G-VB1N43YKPT",
};

/*
const firebaseConfig = {
  apiKey: "AIzaSyAxq1xv_u1lQD0YW2wb3eYruozbH2GHufE",
  authDomain: "dndk-cf5f1.firebaseapp.com",
  projectId: "dndk-cf5f1",
  storageBucket: "dndk-cf5f1.appspot.com",
  messagingSenderId: "315392848441",
  appId: "1:315392848441:web:ec12b7122508edad5c13e8",
  measurementId: "G-YN62E3SJ0G"
};
*/
export const firebaseApp = initializeApp(firebaseConfig);
