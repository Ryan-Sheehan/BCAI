import React, { useState, useEffect, forwardRef } from "react";
import {
  StyleSheet,
  Text,
  Button,
  SafeAreaView,
  Image,
  Switch,
  ScrollView,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import { Audio } from "expo-av";

import { View, motify, AnimatePresence } from "moti";
import BCAI from "../assets/constants/BCAIStyles";
import NavBarSecondary from "../components/NavBarSecondary";
import NavMenu from "../components/NavMenu";
import ArrowButton from "../components/ArrowButton";
import formatMilliseconds from "../utils/formatMilliseconds";
import hexToRgb from "../utils/hexToRgb";

import {
  CardOne,
  CardTwo,
  CardThree,
  MicIcon,
  KeyboardIcon,
  SkipIcon,
  HelpIcon,
  CloseIcon,
  SmallCloseIcon,
  EditIcon,
  PlayIcon,
  PauseIcon,
} from "../icons/BCAIIcons";

import { Svg, Defs, Rect, Mask, Circle } from "react-native-svg";

const MotiTextInput = motify(TextInput)();

const CardTextInput = (
  {
    focus,
    onPress,
    handleTextChange,
    value,

    color,
  },
  ref
) => {
  const rgb = hexToRgb(color);

  const rgbaTransparent = `rgba(${rgb.r},${rgb.g},${rgb.b},0)`;
  const rgbaOpaque = `rgba(${rgb.r},${rgb.g},${rgb.b},1)`;
  return (
    <TouchableOpacity activeOpacity={1} onPress={onPress}>
      <MotiTextInput
        ref={ref}
        focus={focus}
        onChangeText={handleTextChange}
        value={response.response}
        multiline={true}
        scrollEnabled={false}
        pointerEvents="none"
        returnKeyType="done"
        blurOnSubmit={true}
        onSubmitEditing={(e) => {
          e.preventDefault();
          handleKeyboard();
        }}
        underlineColorAndroid="transparent"
        animate={{
          backgroundColor: response === null ? rgbaTransparent : rgbaOpaque,
        }}
        style={styles.textInput}
        autoCompleteType="off"
        autoCorrect={false}
      />
    </TouchableOpacity>
  );
};

const forwardRefTextInput = forwardRef(CardTextInput);

export default forwardRefTextInput;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 50 * BCAI.screenRatio,
    alignItems: "center",
  },
  containerInner: {
    width: 323 * BCAI.screenRatio,
    flex: 1,
  },
  fullHeightSVG: {
    aspectRatio: 1,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,

    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  textInput: {
    ...BCAI.t.body,
    padding: 12 * BCAI.screenRatio,
    paddingVertical: 6 * BCAI.screenRatio,
    borderRadius: 15,
    marginBottom: 200 * BCAI.screenRatio,
  },
});
