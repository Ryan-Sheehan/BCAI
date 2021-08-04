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
import ArrowButton from "../components/ArrowButton";
import NavMenu from "../components/NavMenu";
import Hamburger from "../components/Hamburger";

import Footer from "../components/Homescreen/Footer";

import { Person, Settings, Smiley, Database } from "../icons/BCAIIcons";
import BCAI from "../assets/constants/BCAIStyles";

const NavBarPrimary = ({ onLogoPress, onHamburgerPress }) => {
  const header = require("../assets/media/headerLight.png");
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onLogoPress}>
        <Image style={styles.headerLogo} source={header} />
      </TouchableOpacity>
      <Hamburger onHamburgerPress={onHamburgerPress} />
    </View>
  );
};

export default NavBarPrimary;

const styles = StyleSheet.create({
  header: {
    marginTop: 20 * BCAI.screenRatio,
    marginBottom: 20 * BCAI.screenRatio,
    height: 65 * BCAI.screenRatio,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
    justifyContent: "space-between",
  },
  headerLogo: {
    marginTop: 20 * BCAI.screenRatio,

    width: 164 * BCAI.screenRatio,
    height: 35 * BCAI.screenRatio,
  },
  hamburger: {
    width: 20 * BCAI.screenRatio,
    height: 20 * BCAI.screenRatio,
    backgroundColor: BCAI.c.primary.White,
    borderRadius: 200,
  },
});
