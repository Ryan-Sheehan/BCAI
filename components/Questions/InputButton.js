import React, { useState } from "react";
import {
  StyleSheet,
  Text,
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
  MicIcon,
  KeyboardIcon,
  CameraIcon,
  PhotoIcon,
} from "../../icons/BCAIIcons";
import { View } from "moti";
import { Svg, Defs, Rect, Mask, Circle } from "react-native-svg";

const InputButton = ({
  children,
  color,
  onPress,
  visible,
  disabled,
  active,
  mode,
}) => {
  const iconColor = active ? "#fff" : "#000";
  const backgroundColor = active ? "#000" : color;
  console.log(visible);
  return (
    <View
      animate={{ opacity: visible ? (disabled ? 0.4 : 1) : 0 }}
      transition={{ duration: 500 }}
    >
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        style={{
          ...styles.button,

          backgroundColor,
        }}
      >
        {mode === "keyboard" && <KeyboardIcon color={iconColor} />}
        {mode === "mic" && <MicIcon color={iconColor} />}
        {mode === "camera" && <CameraIcon color={iconColor} />}
        {mode === "photo" && <PhotoIcon color={iconColor} />}
      </TouchableOpacity>
    </View>
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
