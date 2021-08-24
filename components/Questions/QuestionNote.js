import React from "react";
import { StyleSheet } from "react-native";
import BCAI from "../../assets/constants/BCAIStyles";
import { AnimatePresence, Text, View } from "moti";

const QuestionNote = ({ text, active }) => {
	if (!text) return null;
	return (
		<AnimatePresence from={false} exitBeforeEnter>
			{!active && (
				<View
					style={{ flexDirection: "row" }}
					key={text}
					from={{
						opacity: 0,
					}}
					animate={{
						opacity: 1,
					}}
					exit={{
						opacity: 0,
					}}
					transition={{
						type: "timing",
						delay: 400,
						duration: 400,
					}}
					exitTransition={{ delay: 0, duration: 200 }}
				>
					<Text
						style={{
							...BCAI.t.body,
							marginRight: 10 * BCAI.screenRatio,
						}}
					>
						*
					</Text>
					<Text style={styles.note}>{text}</Text>
				</View>
			)}
		</AnimatePresence>
	);
};

export default QuestionNote;

const styles = StyleSheet.create({
	note: {
		...BCAI.t.body,
		lineHeight: 22 * BCAI.screenRatio,
		alignSelf: "stretch",

		marginBottom: 30 * BCAI.screenRatio,
		paddingRight: 10 * BCAI.screenRatio,
	},
});
