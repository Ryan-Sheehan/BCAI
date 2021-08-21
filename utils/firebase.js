import firebase from "../firebase/index";

// Optionally import the services that you want to use
//import "firebase/auth";
import "firebase/app";
import "firebase/database";
import "firebase/firestore";
//import "firebase/functions";
import "firebase/storage";
import * as FileSystem from "expo-file-system";

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

	const uploadDonation = async (donation, questionKey) => {
		const snapshot = await firebase
			.database()
			.ref("/" + key)
			.push({
				donation,
			});
		const { key: snapshotKey } = snapshot;

		const donations = await AsyncStorage.getItem("donations");
		if (donations !== null) {
			const donationArr = JSON.parse(donations);

			await AsyncStorage.setItem(
				"donations",
				JSON.stringify([{ questionKey, snapshotKey }, ...donationArr])
			);
		} else {
			await AsyncStorage.setItem(
				"donations",
				JSON.stringify([{ questionKey, snapshotKey }])
			);
		}
	};

	if (needsToBeUploaded) {
		console.log("----image donation-----");
		console.log(donation);
		console.log("----image donation-----");
		const ref = firebase
			.storage()
			.ref(`${donation.type}/${new Date().getTime()}`);
		// const file = await FileSystem.readAsStringAsync(donation.response.uri, {
		// 	encoding: FileSystem.EncodingType.Base64,
		// });
		const localFile =
			donation.type === "image"
				? donation.response.uri
				: donation.response;

		const blob = await new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.onload = function () {
				resolve(xhr.response);
			};
			xhr.onerror = function (e) {
				console.log(e);
				reject(new TypeError("Network request failed"));
			};
			xhr.responseType = "blob";
			xhr.open("GET", localFile, true);
			xhr.send(null);
		});
		console.log("----file-----");
		console.log(blob);
		console.log("----file-----");
		const snapshot = await ref.put(blob);

		// We're done with the blob, close and release it
		blob.close();
		const remoteURL = await snapshot.ref.getDownloadURL();
		// console.log("----image download link-----");
		// console.log(remoteURL);
		// console.log("----image download link-----");

		await uploadDonation(
			{
				type: donation.type,
				file: remoteURL,
				altText: donation?.altText ? donation.altText : null,
			},
			key
		);
	} else {
		await uploadDonation(donation, key);
	}
};

const deleteFromFirebase = async (questionKey, snapshotKey) => {
	let donationRef = firebase
		.database()
		.ref("/" + questionKey + "/" + snapshotKey);

	await donationRef.remove();
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

export { pushDonation, getActiveDeck, isDeckPublished, deleteFromFirebase };
