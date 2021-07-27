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
import InputButton from "./InputButton";
import SecondaryButton from "./SecondaryButton";

import { Svg, Defs, Rect, Mask, Circle } from "react-native-svg";

const Header = ({ prefix, topic }) => {
  return (
    <View
      style={{
        marginTop: 20,
        marginBottom: 10,
        paddingVertical: 10,
        flexDirection: "row",
      }}
    >
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <Text style={BCAI.t.body}>{prefix} </Text>

        <Text
          style={{
            ...BCAI.t.bodyEmphasis,
          }}
        >
          {topic}
        </Text>
      </View>
      <View style={{ backgroundColor: "transparent" }}></View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BCAI.c.primary.Blue,
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
