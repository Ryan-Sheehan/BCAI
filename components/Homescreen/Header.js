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
  TouchableOpacity,
} from "react-native";
import FastImage from "react-native-fast-image";

import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import ArrowButton from "../../components/ArrowButton";
import { LightHeader } from "../../icons/BCAIIcons";
import BCAI from "../../assets/constants/BCAIStyles";

function Header({ navigation }) {
  const header = require("../../assets/media/headerLight.png");
  return (
    <View style={{ width: 323 * BCAI.screenRatio }}>
      <View
        style={{
          marginTop: 64 * BCAI.screenRatio,

          height: 65 * BCAI.screenRatio,
          flexDirection: "row",
          alignItems: "center",
          alignSelf: "stretch",
          justifyContent: "space-between",
        }}
      >
        <Image
          style={{
            width: 164 * BCAI.screenRatio,
            height: 35 * BCAI.screenRatio,
          }}
          source={header}
        />
        <TouchableOpacity
          style={{
            width: 20 * BCAI.screenRatio,
            height: 20 * BCAI.screenRatio,
            backgroundColor: BCAI.c.primary.White,
            borderRadius: 200,
          }}
        />
      </View>
      <Text
        style={{
          ...BCAI.t.body,
          color: BCAI.c.primary.White,
        }}
      >
        An app that asks how we can make the data-driven algorithms that
        increasingly control our daily lives more caring.
      </Text>
    </View>
  );
}

export default Header;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BCAI.c.primary.Black,
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
