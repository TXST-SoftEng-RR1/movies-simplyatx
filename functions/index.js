const functions = require('firebase-functions');

const firebaseConfig = {
    apiKey: "AIzaSyDtt3Yuz864i09jw5bztgfB_1Q4OQ54ZM0",
    authDomain: "movies-simplyatx.firebaseapp.com",
    databaseURL: "https://movies-simplyatx.firebaseio.com",
    projectId: "movies-simplyatx",
    storageBucket: "movies-simplyatx.appspot.com",
    messagingSenderId: "357033553685",
    appId: "1:357033553685:web:6a9768c02f0b907f11831c",
    measurementId: "G-FHBLZJVSQ2"
};

firebase.initializeApp(firebaseConfig);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
