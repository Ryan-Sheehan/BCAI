import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { ArrowRight, ArrowLeft, BackArrow } from "../icons/BCAIIcons";
import BCAI from "../assets/constants/BCAIStyles";

function Hamburger({ navigation, onHamburgerPress }) {
	return (
		<TouchableOpacity onPress={onHamburgerPress}>
			<View style={styles.hamburger} />
		</TouchableOpacity>
	);
}

export default Hamburger;

const styles = StyleSheet.create({
	hamburger: {
		width: 20 * BCAI.screenRatio,
		height: 20 * BCAI.screenRatio,
		backgroundColor: BCAI.c.primary.White,
		borderRadius: 200,
	},
});
