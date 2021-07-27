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

const EnablePushNotificationsButton = ({ onPress, style }) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity
        onPress={onPress}
        style={{
          ...styles.button,
          ...style,
        }}
      >
        <Text style={{ ...BCAI.t.body, color: BCAI.c.primary.White }}>
          Enable Push Notifications
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default EnablePushNotificationsButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "rgba(255,255,255,0.33)",
    borderRadius: 100,

    paddingVertical: 6 * BCAI.screenRatio,
    paddingHorizontal: 12 * BCAI.screenRatio,
    alignItems: "center",
    justifyContent: "center",
  },
});
