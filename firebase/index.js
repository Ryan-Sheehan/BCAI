import firebase from "firebase/app";

// Initialize Firebase

var firebaseConfig = {
	apiKey: "AIzaSyB1yTyug9_ZRofVuZ1wF5NnYdQhVWRCGA4",
	authDomain: "binarycalculations.firebaseapp.com",
	databaseURL: "https://binarycalculations-default-rtdb.firebaseio.com/",
	projectId: "binarycalculations",
	storageBucket: "binarycalculations.appspot.com",
	messagingSenderId: "856912895280",
	appId: "1:856912895280:web:01b55268c7399df21fbcf5",
};
firebase.initializeApp(firebaseConfig);

export default firebase;
