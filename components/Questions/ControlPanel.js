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
import { Camera } from "expo-camera";

import { AnimatePresence, MotiView, motify } from "moti";

import BCAI from "../../assets/constants/BCAIStyles";
import NavBarSecondary from "../../components/NavBarSecondary";
import NavMenu from "../../components/NavMenu";
import BCAICamera from "./BCAICamera";

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

const TextInputMode = ({
  mode,
  color,
  onKeyboard,
  inputActive,
  leftInputActive,
  rightInputActive,
  onMic,
  recording,
  response,
}) => {
  if (mode === "image") return null;
  return (
    <View style={styles.inputButtons}>
      <InputButton
        color={color}
        onPress={onKeyboard}
        active={leftInputActive}
        mode={"keyboard"}
        disabled={recording}
        visible={response === null}
      />
      <InputButton
        color={color}
        onPress={onMic}
        active={rightInputActive}
        mode={"mic"}
        disabled={recording}
        visible={response === null}
      />
    </View>
  );
};

const PhotoInputMode = ({
  mode,
  color,
  onCamera,
  inputActive,
  leftInputActive,
  rightInputActive,
  onPhoto,
  response,
}) => {
  if (mode === "text") return null;
  return (
    <View
      from={{ opacity: 0, translateY: 25 }}
      animate={{ opacity: 1, translateY: 0 }}
      exit={{ opacity: 0 }}
      transition={{ type: "timing", duration: 800 }}
      style={styles.inputButtons}
    >
      <InputButton
        color={color}
        onPress={onCamera}
        active={leftInputActive}
        mode={"camera"}
        visible={response === null}
      />
      <InputButton
        color={color}
        onPress={onPhoto}
        active={rightInputActive}
        mode={"photo"}
        visible={response === null}
      />
    </View>
  );
};

const ActionBar = ({
  color,
  recording,
  onSkip,
  onKeyboard,
  onMic,
  onHelp,
  onDonate,
  onCamera,
  onPhoto,
  inputHeight,
  inputActive,
  cameraActive,
  response,
  mode,
  leftInputActive,
  rightInputActive,
}) => {
  return (
    <View style={{ ...styles.actionBar }}>
      <SecondaryButton
        label={"Help"}
        visible={true}
        icon={<HelpIcon />}
        onPress={onHelp}
        disabled={recording}
      />

      <TextInputMode
        color={color}
        onKeyboard={onKeyboard}
        inputActive={inputActive}
        leftInputActive={leftInputActive}
        rightInputActive={rightInputActive}
        onMic={onMic}
        mode={mode}
        recording={recording}
        response={response}
      />
      <PhotoInputMode
        color={color}
        onCamera={onCamera}
        inputActive={inputActive}
        leftInputActive={leftInputActive}
        rightInputActive={rightInputActive}
        onPhoto={onPhoto}
        mode={mode}
        response={response}
      />
      <AnimatePresence exitBeforeEnter>
        {response !== null && (
          <View
            key="donate"
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 600 }}
          >
            <PrimaryButton
              label={"Donate"}
              color={color}
              icon={<SendIcon />}
              onPress={onDonate}
            />
          </View>
        )}
        {response === null && (
          <View
            key="skip"
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 600 }}
          >
            <SecondaryButton
              label={"Skip"}
              visible={response === null}
              icon={<SkipIcon />}
              onPress={onSkip}
              disabled={recording}
            />
          </View>
        )}
      </AnimatePresence>
    </View>
  );
};

const InputInfo = ({ color, inputActive, response, inputInfo }) => {
  const showInfo = !inputActive && response === null && inputInfo !== null;

  return (
    <AnimatePresence>
      {showInfo && (
        <View style={styles.controlPanelInfoContainer}>
          <MotiView
            from={{
              opacity: 0,
              translateY: 15,
            }}
            animate={{
              opacity: 1,
              translateY: 0,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{ delay: 1200, duration: 400 }}
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
  );
};

const ControlPanelWrapper = ({
  children,
  inputActive,

  inputHeight,
  cameraHeight,
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
        bottom: inputHeight * BCAI.screenRatio + 40 * BCAI.screenRatio,
      }}
      exit={{
        opacity: 0,
        translateY: 20,
      }}
      style={{
        ...styles.controlPanelContainer,
      }}
      transition={{ type: "timing", duration: 200 }}
    >
      {children}
    </MotiKeyboardAvoidingView>
  );
};

const ControlPanel = ({
  color,
  inputInfo,
  onSkip,
  onKeyboard,
  onMic,
  onHelp,
  onDonate,
  onCamera,
  onPhoto,
  inputHeight,
  inputActive,
  recording,
  response,
  leftInputActive,
  rightInputActive,
  mode,
}) => {
  return (
    <ControlPanelWrapper inputActive={inputActive} inputHeight={inputHeight}>
      <InputInfo
        color={color}
        inputActive={inputActive}
        inputInfo={inputInfo}
        response={response}
      />
      <ActionBar
        mode={mode}
        recording={recording}
        color={color}
        response={response}
        inputActive={inputActive}
        onKeyboard={onKeyboard}
        onCamera={onCamera}
        onPhoto={onPhoto}
        onDonate={onDonate}
        onSkip={onSkip}
        onMic={onMic}
        leftInputActive={leftInputActive}
        rightInputActive={rightInputActive}
      />
    </ControlPanelWrapper>
  );
};

export default ControlPanel;

const styles = StyleSheet.create({
  controlPanelContainer: {
    position: "absolute",

    width: 323 * BCAI.screenRatio,
    flex: 1,
    zIndex: 100,
    elevation: 100,
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
