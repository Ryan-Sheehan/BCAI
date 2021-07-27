import React from "react";
import { StyleSheet } from "react-native";
import BCAI from "../../assets/constants/BCAIStyles";
import { AnimatePresence, Text } from "moti";

const QuestionNote = ({ text, active }) => {
	return (
		<AnimatePresence from={false} exitBeforeEnter>
			{!active && (
				<Text
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
						delay: 160,
						duration: 100,
					}}
					exitTransition={{ delay: 0, duration: 10 }}
					style={styles.note}
				>
					{text}
				</Text>
			)}
		</AnimatePresence>
	);
};

export default QuestionNote;

const styles = StyleSheet.create({
	note: {
		...BCAI.t.body,
		lineHeight: 22 * BCAI.screenRatio,
		maxWidth: 300 * BCAI.screenRatio,
		marginBottom: 30 * BCAI.screenRatio,
	},
});
