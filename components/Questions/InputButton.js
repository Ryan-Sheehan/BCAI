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
import { MicIcon, KeyboardIcon } from "../../icons/BCAIIcons";

import { Svg, Defs, Rect, Mask, Circle } from "react-native-svg";

const InputButton = ({ children, color, onPress, active, mode }) => {
  const iconColor = active ? "#fff" : "#000";
  const backgroundColor = active ? "#000" : color;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        ...styles.button,
        backgroundColor,
      }}
    >
      {mode === "keyboard" && <KeyboardIcon color={iconColor} />}
      {mode === "mic" && <MicIcon color={iconColor} />}
    </TouchableOpacity>
  );
};

export default InputButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 100,
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
  },
});
