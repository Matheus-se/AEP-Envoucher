import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyAFhx13C1oaCeCfDuWc7KEYWRY9kvAWETc",
    authDomain: "envoucher-e7364.firebaseapp.com",
    databaseURL: "https://envoucher-e7364.firebaseio.com",
    projectId: "envoucher-e7364",
    storageBucket: "envoucher-e7364.appspot.com",
    messagingSenderId: "634506467878",
    appId: "1:634506467878:web:1b2edeaa4853d5dffba4e7",
    measurementId: "G-TRE8L5SYY4"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;