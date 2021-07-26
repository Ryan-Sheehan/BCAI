import { StatusBar } from "expo-status-bar";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Navigator from "./screens/Navigator";

const initFonts = async () => {
  await Font.loadAsync({
    "Inktrap-Bold": require("./assets/fonts/Inktrap/ABCWhyteInktrap-Bold-Trial.otf"),
    "Inktrap-Regular": require("./assets/fonts/Inktrap/ABCWhyteInktrap-Regular-Trial.otf"),
    "Inktrap-Light": require("./assets/fonts/Inktrap/ABCWhyteInktrap-Light-Trial.otf"),
  });
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
  return <Navigator />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
