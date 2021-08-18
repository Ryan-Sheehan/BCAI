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
import { useNavigation } from "@react-navigation/native";

import { View, AnimatePresence } from "moti";
import { Camera } from "expo-camera";
import ArrowButton from "../../components/ArrowButton";
import BCAI from "../../assets/constants/BCAIStyles";

const { height, width } = Dimensions.get("window");

const ReadMoreButton = () => {
  return (
    <View>
      <Text>Read More</Text>
    </View>
  );
};

const DisclaimerToast = ({ toastOpen, setToastOpen, setToastCleared }) => {
  const navigation = useNavigation();
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
            marginBottom: 15,
            lineHeight: 32,
          }}
        >
          Hold up! Y(our) privacy is important!
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
          remember any information you offer will become public data. It will be
          anonymous, but available for anyone to use. Think twice before
          contributing information you normally wouldn't share with strangers.
          Inappropriate content will be removed.{" "}
          <TouchableOpacity
            onPress={() => navigation.navigate("PrivacyPolicyWebView")}
          >
            <Text
              style={{
                ...BCAI.t.bodyEmphasis,
                color: BCAI.c.primary.White,
                textDecorationLine: "underline",
                lineHeight: 24,
              }}
            >
              Learn More
            </Text>
          </TouchableOpacity>
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
