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
  ActivityIndicator,
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
import { motify } from "moti";

import { Svg, Defs, Rect, Mask, Circle } from "react-native-svg";
const MotiTouchableOpacity = motify(TouchableOpacity)();

const PrimaryButton = ({
  label,
  color,
  icon,
  onPress,
  style,
  from,
  animate,
  exit,
  transition,
  isLoading,
}) => {
  return (
    <MotiTouchableOpacity
      from={from}
      animate={animate}
      exit={exit}
      transition={transition}
      onPress={onPress}
      style={{ ...styles.primaryButton, ...style, backgroundColor: color }}
    >
      <Text style={BCAI.t.body}>{label} </Text>
      {!isLoading ? icon : <ActivityIndicator color={BCAI.c.primary.Black} />}
    </MotiTouchableOpacity>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  primaryButton: {
    borderRadius: 100,

    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",

    paddingVertical: 8 * BCAI.screenRatio,
    paddingHorizontal: 16 * BCAI.screenRatio,
  },
});
