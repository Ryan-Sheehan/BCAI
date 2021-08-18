import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";

import {
  StyleSheet,
  Text,
  Button,
  SafeAreaView,
  Image,
  Switch,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { AnimatePresence, View } from "moti";
import BCAI from "../../assets/constants/BCAIStyles";
import NavBarSecondary from "../../components/NavBarSecondary";
import NavMenu from "../../components/NavMenu";
import ArrowButton from "../../components/ArrowButton";

import Footer from "../../components/Homescreen/Footer";
import { handleNotch } from "../../utils/handleNotch";

import {
  MicIcon,
  KeyboardIcon,
  SkipIcon,
  HelpIcon,
  Person,
  Settings,
  Smiley,
  Database,
} from "../../icons/BCAIIcons";

import Card from "../../components/Questions/Card";
import ControlPanel from "../../components/Questions/ControlPanel";
import NavBarPrimary from "../../components/NavBarPrimary";
import EnablePushNotificationsButton from "./EnablePushNotificationsButton";
import { Svg, Defs, Rect, Mask, Circle } from "react-native-svg";

const BaseCard = ({
  navigation,
  currentStack,
  setCurrentStack,
  handlePress,
  noMoreStacks,
}) => {
  const animationMoreCards = require("../../assets/media/thankYou.gif");
  const animationNoMoreCards = require("../../assets/media/stackEmpty.gif");
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  // const handlePress = () => {
  //   setCurrentStack((p) => p + 1);
  // };

  const goHome = () => {
    navigation.navigate("Home", { hamburgerOpenInitial: true });
  };
  const goToSettings = () => {
    navigation.navigate("Settings", { pushNotifications: true });
  };

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
  return (
    <SafeAreaView style={{ ...styles.baseCard, zIndex: 0 }}>
      <View
        style={{
          width: 323 * BCAI.screenRatio,
          flex: 1,
          zIndex: 0,
        }}
      >
        <NavBarPrimary
          onLogoPress={goHome}
          hamburgerOpen={hamburgerOpen}
          onHamburgerPress={() => setHamburgerOpen((p) => !p)}
        />

        {hamburgerOpen && (
          <>
            <Text style={{ ...BCAI.t.body, color: BCAI.c.primary.White }}>
              A project to create and model data built on comprehensive
              representa- tions of our lives, beliefs, and cultures through
              intimate knowledge, love-based labeling, and prioritizing
              community support.
            </Text>
            <NavMenu navigation={navigation} menuItems={menuItems} />
            <Footer />
          </>
        )}

        {!hamburgerOpen && (
          <View>
            {!noMoreStacks && (
              <>
                <Text
                  style={{
                    ...BCAI.t.largeTitle,
                    marginTop: 10 * BCAI.screenRatio,
                    color: BCAI.c.primary.White,
                  }}
                >
                  You are helping craft a better future!
                </Text>
                <ArrowButton
                  style={{ marginVertical: 16 * BCAI.screenRatio }}
                  theme="light"
                  direction="right"
                  label="Give more"
                  onPress={handlePress}
                />
              </>
            )}
            {noMoreStacks && (
              <>
                <Text
                  style={{
                    ...BCAI.t.warning,
                    color: BCAI.c.primary.White,
                    marginTop: 15 * BCAI.screenRatio,
                    marginBottom: 20 * BCAI.screenRatio,
                  }}
                >
                  Great Job!
                </Text>
                <Text
                  style={{
                    ...BCAI.t.warning,
                    color: BCAI.c.primary.White,
                    marginBottom: 20 * BCAI.screenRatio,
                  }}
                >
                  You’ve made it through all our current questions.
                </Text>
                <Text
                  style={{
                    ...BCAI.t.warning,
                    color: BCAI.c.primary.White,
                    marginBottom: 10 * BCAI.screenRatio,
                  }}
                >
                  Can we notify you when more input is needed?
                </Text>
                <EnablePushNotificationsButton
                  onPress={goToSettings}
                  style={{ marginTop: 20 * BCAI.screenRatio }}
                />
              </>
            )}
          </View>
        )}
        <StatusBar style="auto" />
      </View>
      {/*<View
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 500,
          duration: 1200,
        }}
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          left: 0,
          top: 0,
          zIndex: -1,
        }}
      >
        <Image
          style={{
            position: "absolute",

            bottom: 0,
            left: 0,
            right: 0,

            width: 373 * BCAI.screenRatio,
          }}
          source={noMoreStacks ? animationNoMoreCards : animationMoreCards}
        />
      </View>*/}
    </SafeAreaView>
  );
};

export default BaseCard;

const styles = handleNotch({
  baseCard: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    paddingVertical: {
      notched: 40 * BCAI.screenRatio,
      notchless: 10 * BCAI.screenRatio,
    },
    alignItems: "center",
  },
});
