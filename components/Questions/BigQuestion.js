import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  Button,
  SafeAreaView,
  Image,
  Switch,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import BCAI from "../../assets/constants/BCAIStyles";
import NavBarSecondary from "../../components/NavBarSecondary";
import NavMenu from "../../components/NavMenu";
import ArrowButton from "../../components/ArrowButton";
import { AnimatePresence, View } from "moti";

import {
  Card,
  MicIcon,
  KeyboardIcon,
  SkipIcon,
  HelpIcon,
} from "../../icons/BCAIIcons";
import InputButton from "./InputButton";
import SecondaryButton from "./SecondaryButton";

import { Svg, Defs, Rect, Mask, Circle } from "react-native-svg";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

const BigQuestion = ({ text, active }) => {
  return (
    <AnimatePresence exitBeforeEnter>
      {!active && (
        <View
          key="big"
          from={{
            translateX: -SCREEN_WIDTH,
          }}
          animate={{
            translateX: 0,
          }}
          exit={{
            translateX: -SCREEN_WIDTH,
          }}
          transition={{
            type: "timing",
            duration: 160,
          }}
          style={styles.bigQuestion}
        >
          <Text style={BCAI.t.largeTitle}>{text}</Text>
        </View>
      )}
      {active && (
        <View
          key="small"
          from={{
            translateX: SCREEN_WIDTH,
            opacity: 0,
          }}
          animate={{
            translateX: 0,
            opacity: 1,
          }}
          exit={{
            translateX: SCREEN_WIDTH,
            opacity: 0,
          }}
          transition={{
            type: "timing",
            opacity: {
              delay: 100,
            },
            duration: 160,
          }}
          style={styles.bigQuestion}
        >
          <Text style={BCAI.t.bodyEmphasis}>{text}</Text>
        </View>
      )}
    </AnimatePresence>
  );
};

export default BigQuestion;

const styles = StyleSheet.create({
  bigQuestion: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: BCAI.c.primary.Black,

    marginBottom: 10 * BCAI.screenRatio,
    paddingTop: 10 * BCAI.screenRatio,
    paddingBottom: 10 * BCAI.screenRatio,
  },
});
