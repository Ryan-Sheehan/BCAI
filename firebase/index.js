import firebase from "firebase/app";

// Initialize Firebase

var firebaseConfig = {
	apiKey: "AIzaSyCNzf_NoIKsgLX_RUxTHqZ0-5HafwE6y2g",
	authDomain: "bcai-86741.firebaseapp.com",
	databaseURL: "https://bcai-86741-default-rtdb.firebaseio.com",
	projectId: "bcai-86741",
	storageBucket: "bcai-86741.appspot.com",
	messagingSenderId: "190651307049",
	appId: "1:190651307049:web:dd12b7172743ed52043838",
	measurementId: "G-M1JK49HZMJ",
};
firebase.initializeApp(firebaseConfig);

export default firebase;
