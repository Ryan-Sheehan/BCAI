import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { Hamburger as HamburgerIcon, Close } from "../icons/BCAIIcons";
import BCAI from "../assets/constants/BCAIStyles";

function Hamburger({ navigation, hamburgerOpen, onHamburgerPress }) {
	return (
		<TouchableOpacity onPress={onHamburgerPress}>
			{hamburgerOpen ? <Close /> : <HamburgerIcon />}
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
