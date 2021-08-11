import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  Button,
  SafeAreaView,
  Image,
  Switch,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";
import { View, AnimatePresence } from "moti";
import { Camera } from "expo-camera";
import ArrowButton from "../../components/ArrowButton";
import BCAI from "../../assets/constants/BCAIStyles";

const { height, width } = Dimensions.get("window");

const DisclaimerToast = ({ toastOpen, setToastOpen, setToastCleared }) => {
  return (
    <View
      animate={{ translateY: toastOpen ? 0 : height + 200 }}
      transition={{ type: "timing", duration: 800 }}
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,

        zIndex: 10000,
        elevation: 10000,
        alignSelf: "stretch",
        alignItems: "center",
        justifyContent: "center",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 40,
        backgroundColor: BCAI.c.primary.Black,
      }}
    >
      <View style={{ width: 323 * BCAI.screenRatio }}>
        <Text
          style={{
            ...BCAI.t.toastHeader,
            color: BCAI.c.primary.White,
            marginBottom: 30,
            lineHeight: 32,
          }}
        >
          Hold up! Your privacy is important
        </Text>
        <Text
          style={{
            ...BCAI.t.body,
            color: BCAI.c.primary.White,
            marginBottom: 30,
            lineHeight: 24,
          }}
        >
          We hope you’ll contribute to Binary Calculations Are Inadequate, but
          be mindful. Think twice before sharing sensitive information you
          usually would not share with others. Your privacy is vital to us, so
          your answers will be anonymized. Inappropriate content will be
          removed. On the upside, data donated will be used to create less
          biassed, full-spectrum datasets that inform algorithmic systems more
          deeply, broadly, and carefully. These data sets are intended to
          support but will eventually be made available to be used by any
          project. We hope you’ll donate so we can craft our digital future
          together.
        </Text>
        <View
          style={{
            alignSelf: "stretch",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <ArrowButton
            style={{ marginVertical: 8 * BCAI.screenRatio }}
            theme="light"
            direction="right"
            label="I understand"
            onPress={() => {
              setToastOpen(false);
              setToastCleared(true);
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default DisclaimerToast;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: -30,
    zIndex: 100,
    borderWidth: 8,
    borderRadius: 30,

    overflow: "hidden",
  },
  camera: {
    zIndex: 100,
    marginTop: 0,
    justifyContent: "flex-end",
  },
  cameraContainer: {},
  takePictureContainer: {
    alignSelf: "stretch",
    alignItems: "center",

    marginBottom: 80 * BCAI.screenRatio,
    zIndex: 1000,
  },
  takePicture: {
    borderRadius: 200,
    backgroundColor: BCAI.c.primary.White,
    height: 58 * BCAI.screenRatio,
    width: 58 * BCAI.screenRatio,
  },
});
