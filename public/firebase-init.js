// please use your own firebase config
var firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
}

firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();