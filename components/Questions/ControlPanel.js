import React, { useState, useEffect } from "react";
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
  KeyboardAvoidingView,
} from "react-native";
import { AnimatePresence, MotiView, motify } from "moti";

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
  SendIcon,
} from "../../icons/BCAIIcons";
import InputButton from "./InputButton";
import PrimaryButton from "./PrimaryButton";

import SecondaryButton from "./SecondaryButton";

import { Svg, Defs, Rect, Mask, Circle } from "react-native-svg";

const MotiKeyboardAvoidingView = motify(KeyboardAvoidingView)();

const ControlPanel = ({
  color,
  inputInfo,
  onSkip,
  onKeyboard,
  onMic,
  onHelp,
  onDonate,
  keyboardHeight,
  keyboardActive,
  response,
}) => {
  return (
    <MotiKeyboardAvoidingView
      from={{
        opacity: 0,
        translateY: 20,
      }}
      animate={{
        opacity: 1,
        translateY: 0,
        bottom: keyboardHeight + 40 * BCAI.screenRatio,
      }}
      exit={{
        opacity: 0,
        translateY: 20,
      }}
      style={{
        ...styles.controlPanelContainer,
      }}
      transition={{ type: "timing", duration: 250 }}
    >
      <AnimatePresence>
        {inputInfo !== null && (
          <View style={styles.controlPanelInfoContainer}>
            <MotiView
              from={{
                opacity: 0,
                scale: 0.9,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{ delay: 300, duration: 200 }}
              exitTransition={{ delay: 0, duration: 100 }}
              style={{ ...styles.controlPanelInfo, backgroundColor: color }}
            >
              <Text
                style={{
                  ...BCAI.t.bodyEmphasis,
                  textAlign: "center",
                  lineHeight: 22,
                }}
              >
                {inputInfo}
              </Text>
            </MotiView>
          </View>
        )}
      </AnimatePresence>
      <View style={styles.actionBar}>
        <SecondaryButton label={"Help"} icon={<HelpIcon />} onPress={onHelp} />
        <View style={styles.inputButtons}>
          <InputButton
            color={color}
            onPress={onKeyboard}
            active={keyboardActive}
            mode={"keyboard"}
          />
          <InputButton color={color} onPress={onMic} mode={"mic"} />
        </View>
        {response !== null ? (
          <PrimaryButton
            label={"Donate"}
            color={color}
            icon={<SendIcon />}
            onPress={onDonate}
          />
        ) : (
          <SecondaryButton
            label={"Skip"}
            icon={<SkipIcon />}
            onPress={onSkip}
          />
        )}
      </View>
    </MotiKeyboardAvoidingView>
  );
};

export default ControlPanel;

const styles = StyleSheet.create({
  controlPanelContainer: {
    position: "absolute",

    width: 323 * BCAI.screenRatio,
    flex: 1,
    zIndex: 100,
  },
  controlPanelInfoContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",
  },
  controlPanelInfo: {
    maxWidth: 290 * BCAI.screenRatio,
    borderRadius: 20,
    padding: 12 * BCAI.screenRatio,
    paddingBottom: 8 * BCAI.screenRatio,

    alignItems: "center",
    justifyContent: "center",

    marginBottom: 18 * BCAI.screenRatio,
  },
  actionBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",
  },
  inputButtons: {
    flexDirection: "row",
  },
});
