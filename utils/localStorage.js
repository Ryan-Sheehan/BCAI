import AsyncStorage from "@react-native-async-storage/async-storage";

const TOAST = "data-anonymity-info-toast";
const TEXT_MODAL = "text-modal-seen";
const IMAGE_MODAL = "image-modal-seen";
const resetAreModalsCleared = async () => {
	await AsyncStorage.removeItem(TOAST);

	await AsyncStorage.removeItem(TEXT_MODAL);

	await AsyncStorage.removeItem(IMAGE_MODAL);
};

const resetCardsRespondedTo = async (cardGroups) => {
	const cardKeys = cardGroups.map((cg, i) => {
		return cg.cards.map((c, i) => c._key);
	});

	const answeredCardKeys = await Promise.all(
		cardKeys.map(
			async (k) =>
				await Promise.all(
					k.map(async (c) => await AsyncStorage.removeItem(c))
				)
		)
	);
};

const resetDonations = async () => {
	await AsyncStorage.removeItem("donations");
};

export { resetAreModalsCleared, resetCardsRespondedTo, resetDonations };
