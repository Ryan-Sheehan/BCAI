import { StatusBar } from "expo-status-bar";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

import React, { useState, useEffect } from "react";
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
import NavBarPrimary from "../components/NavBarPrimary";

import Footer from "../components/Homescreen/Footer";
import { getActiveDeck, isDeckPublished } from "../utils/firebase";

import { Person, Settings, Smiley, Database } from "../icons/BCAIIcons";
import BCAI from "../assets/constants/BCAIStyles";

function HomeScreenMain({ navigation, handle, activeDeck }) {
  const animation = require("../assets/media/homepage.gif");
  return (
    <>
      <View style={{ marginVertical: 8 * BCAI.screenRatio }}>
        <ArrowButton
          style={{ marginVertical: 8 * BCAI.screenRatio }}
          theme="light"
          direction="right"
          label="Donate"
          disabled={activeDeck === null}
          onPress={handle}
        />
        <ArrowButton
          style={{ marginVertical: 8 * BCAI.screenRatio }}
          theme="dark"
          direction="left"
          label="Learn More"
          onPress={handle}
        />
      </View>
      <Image style={{ width: 323 * BCAI.screenRatio }} source={animation} />
    </>
  );
}

function HomeScreen({ navigation }) {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const [activeDeck, setActiveDeck] = useState(null);

  const menuItems = [
    {
      icon: <Smiley />,
      label: "Binary Calculations?",
      navigateTo: "About",
    },
    {
      icon: <Person />,
      label: "Your Privacy",
      navigateTo: "Privacy",
    },
    {
      icon: <Database />,
      label: "Database",
      navigateTo: "Database",
    },
    {
      icon: <Settings />,
      label: "App Settings",
      navigateTo: "Settings",
    },
  ];

  const handle = async () => {
    const deck = await getActiveDeck();
    //setActiveDeck(deck);
    const isPublished = await isDeckPublished();
    if (isPublished) {
      console.log("---------");
      console.log("DECK IS PUBLISHED");
      console.log("---------");
    } else {
      console.log("---------");
      console.log("DECK IS NOT PUBLISHED");
      console.log("---------");
    }
    navigation.navigate("Main", {
      screen: "Questions",
      params: { activeDeck: deck },
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      {/*<Image
        style={{
          marginTop: 20 * BCAI.screenRatio,
          width: 375 * BCAI.screenRatio,
          height: 65 * BCAI.screenRatio,
        }}
        source={header}
      />*/}
      <View style={{ width: 323 * BCAI.screenRatio, flex: 1 }}>
        <NavBarPrimary
          navigation={navigation}
          onLogoPress={() => setHamburgerOpen(false)}
          onHamburgerPress={() => setHamburgerOpen((prev) => !prev)}
        />
        <Text style={styles.info}>
          An app that asks how we can make the data-driven algorithms that
          increasingly control our daily lives more caring.
        </Text>
        {!hamburgerOpen ? (
          <HomeScreenMain
            navigation={navigation}
            handle={handle}
            activeDeck={activeDeck}
          />
        ) : (
          <NavMenu navigation={navigation} menuItems={menuItems} />
        )}
        {hamburgerOpen && <Footer />}
      </View>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BCAI.c.primary.Black,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  info: {
    ...BCAI.t.body,
    color: BCAI.c.primary.White,
  },
});
