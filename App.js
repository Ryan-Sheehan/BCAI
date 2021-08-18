import { StatusBar } from "expo-status-bar";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  Image,
  Switch,
} from "react-native";
import FastImage from "react-native-fast-image";

import HomeScreen from "./screens/HomeScreen";
import SettingsScreen from "./screens/Settings";
import DatabaseScreen from "./screens/Database";
import PrivacyScreen from "./screens/Privacy";
import QuestionsScreen from "./screens/Questions";
import PrivacyPolicyWebView from "./screens/PrivacyPolicyWebView";

import AboutScreen from "./screens/About";

import { NavigationContainer } from "@react-navigation/native";

import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import ArrowButton from "./components/ArrowButton";
import { LightHeader } from "./icons/BCAIIcons";
import BCAI from "./assets/constants/BCAIStyles";
import Header from "./components/Homescreen/Header";

const initFonts = async () => {
  await Font.loadAsync({
    "Inktrap-Bold": require("./assets/fonts/Inktrap/ABCWhyteInktrap-Bold-Trial.otf"),
    "Inktrap-Regular": require("./assets/fonts/Inktrap/ABCWhyteInktrap-Regular-Trial.otf"),
    "Inktrap-Light": require("./assets/fonts/Inktrap/ABCWhyteInktrap-Light-Trial.otf"),
  });
};

const vertical = {
  gestureDirection: "vertical",
  cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
};

function DetailsScreen({ navigation }) {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: BCAI.c.primary.Orange,
        borderRadius: 18 * BCAI.screenRatio,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text>Details Screen</Text>
      <Button title="Go to Home" onPress={() => navigation.goBack()} />
    </SafeAreaView>
  );
}

const Stack = createStackNavigator();

function LogoTitle() {
  const header = require("./assets/media/headerLight.png");
  return (
    <Image
      style={{
        marginTop: 20 * BCAI.screenRatio,
        width: 375 * BCAI.screenRatio,
        height: 65 * BCAI.screenRatio,
      }}
      source={header}
    />
  );
}

const Main = () => {
  return (
    <Stack.Navigator headerMode={false}>
      <Stack.Screen name="Questions" component={QuestionsScreen} />
    </Stack.Navigator>
  );
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={initFonts}
        onFinish={() => setFontLoaded(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: {
            backgroundColor: "rgba(0,0,0,0)",
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            cardStyle: { backgroundColor: BCAI.c.primary.Black },
          }}
        />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={vertical}
        />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Privacy" component={PrivacyScreen} />
        <Stack.Screen name="Database" component={DatabaseScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen
          name="PrivacyPolicyWebView"
          component={PrivacyPolicyWebView}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BCAI.c.primary.Black,
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
