import firebase from "../firebase/index";

// Optionally import the services that you want to use
//import "firebase/auth";
import "firebase/app";
import "firebase/database";
import "firebase/firestore";
//import "firebase/functions";
import "firebase/storage";

import AsyncStorage from "@react-native-async-storage/async-storage";

// Initialize Firebase

// Get a reference to the database service
var database = firebase.database();

const pushDonation = async (key, donation) => {
	// const questionSlug = question
	// 	.replaceAll(" ", "-")
	// 	.replaceAll(".", "")
	// 	.replaceAll("#", "")
	// 	.replaceAll("$", "")
	// 	.replaceAll("[", "")
	// 	.replaceAll("]", "")
	// 	.replaceAll("?", "")
	// 	.toLowerCase();

	const needsToBeUploaded =
		donation.type === "image" || donation.type === "voice";

	if (needsToBeUploaded) {
		const ref = firebase
			.storage()
			.ref(`${donation.type}/${new Date().getTime()}`);
		await ref.put(blob);
		donation.response;
		const snapshot = await firebase
			.database()
			.ref("/" + key)
			.push({
				donation,
			});
		const { key } = snapshot;
	} else {
		const snapshot = await firebase
			.database()
			.ref("/" + key)
			.push({
				donation,
			});
		const { key } = snapshot;

		const donations = await AsyncStorage.getItem("donations");
		if (donations !== null) {
			const donationArr = JSON.parse(donations);
			await AsyncStorage.setItem(
				"donations",
				JSON.stringify([key, ...donationArr])
			);
		} else {
			await AsyncStorage.setItem("donations", JSON.stringify([key]));
		}
	}
};

const isDeckPublished = async () => {
	const controlPanel = await firebase
		.firestore()
		.collection("sanity")
		.doc("docs")
		.collection("controlPanel")
		.doc("controlPanel")
		.get();
	return controlPanel.data().published;
};

const getActiveDeck = async () => {
	const controlPanel = await firebase
		.firestore()
		.collection("sanity")
		.doc("docs")
		.collection("controlPanel")
		.doc("controlPanel")
		.get();
	const activeDeckID = controlPanel.data().activeDeck._ref;

	const activeDeck = await firebase
		.firestore()
		.collection("sanity")
		.doc("docs")
		.collection("deck")
		.doc(activeDeckID)
		.get();

	return activeDeck.data();
};

export { pushDonation, getActiveDeck, isDeckPublished };
