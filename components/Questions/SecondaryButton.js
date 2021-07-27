import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  Image,
  Switch,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import BCAI from "../../assets/constants/BCAIStyles";
import NavBarSecondary from "../../components/NavBarSecondary";
import NavMenu from "../../components/NavMenu";
import ArrowButton from "../../components/ArrowButton";
import {
  Card,
  MicIcon,
  KeyboardIcon,
  SkipIcon,
  HelpIcon,
} from "../../icons/BCAIIcons";

import { Svg, Defs, Rect, Mask, Circle } from "react-native-svg";

const SecondaryButton = ({ label, icon, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.secondaryButton}>
      <Text style={BCAI.t.secondaryButton}>{label}</Text>
      {icon}
    </TouchableOpacity>
  );
};

export default SecondaryButton;

const styles = StyleSheet.create({
  secondaryButton: {
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 100,

    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",

    paddingHorizontal: 10,
    height: 34,
  },
});
