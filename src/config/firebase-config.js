import firebase from "firebase/compat/app";

const firebaseConfig = {
    apiKey: "AIzaSyBUDmg3AksREzBVJhn7bCimYIfKI9MrflY",
    authDomain: "jobchat-35964.firebaseapp.com",
    projectId: "jobchat-35964",
    storageBucket: "jobchat-35964.appspot.com",
    messagingSenderId: "611452187892",
    appId: "1:611452187892:web:a04344cf26d4aecba95aa1",
    measurementId: "G-7H8P02Y87P"
};



export const firebaseConnect = firebase.initializeApp(firebaseConfig);