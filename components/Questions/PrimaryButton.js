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

const PrimaryButton = ({ label, color, icon, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ ...styles.primaryButton, backgroundColor: color }}
    >
      <Text style={BCAI.t.body}>{label}</Text>
      {icon}
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  primaryButton: {
    borderRadius: 100,

    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",

    paddingLeft: 20,
    paddingLeft: 10,
    height: 47 * BCAI.screenRatio,
    width: 120 * BCAI.screenRatio,
  },
});
