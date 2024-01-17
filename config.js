import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import { initializeApp } from "firebase/app";
const firebaseConfig = {
    apiKey: "AIzaSyBJegiHEmtBfT06_JggnPD_tY_1kiaZsRk",
    authDomain: "todolist-3bbf1.firebaseapp.com",
    projectId: "todolist-3bbf1",
    storageBucket: "todolist-3bbf1.appspot.com",
    messagingSenderId: "627319146832",
    appId: "1:627319146832:web:e85c9c7dcfcfd3639b0455"
  };
  
  // Initialize Firebase
  if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
  }

  export {firebase};