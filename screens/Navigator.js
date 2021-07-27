import * as React from "react";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

function HomeScreen() {
	return (
		<View style={styles.container}>
			<Text style={{ fontFamily: "Inktrap-Light" }}>
				Open up App.js to start working on your app!
			</Text>
			<StatusBar style="auto" />
		</View>
	);
}

const Stack = createStackNavigator();

function Navigator() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="Home" component={HomeScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default Navigator;
