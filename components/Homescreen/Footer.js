import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";

import BCAI from "../../assets/constants/BCAIStyles";

const Footer = () => {
  return (
    <View style={styles.footer}>
      <View
        style={{
          width: 140,
        }}
      >
        <Text
          style={{
            ...BCAI.t.footerLabel,
            color: BCAI.c.primary.White,
            maxWidth: 90,
          }}
        >
          By:
        </Text>
        <Text
          style={{
            ...BCAI.t.footerName,
            color: BCAI.c.primary.White,
            maxWidth: 100,
          }}
        >
          Stephanie{"\n"}
          Dinkins{"\n"}
          Studio
        </Text>
      </View>
      <View
        style={{
          width: 190,
        }}
      >
        <Text
          style={{
            ...BCAI.t.footerLabel,
            color: BCAI.c.primary.White,
            maxWidth: 100,
          }}
        >
          With:
        </Text>
        <Text
          style={{
            ...BCAI.t.footerName,
            color: BCAI.c.primary.White,
            maxWidth: 140,
          }}
        >
          Mozilla Foundation Visions 2030 Knight Foundation{" "}
        </Text>
      </View>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  footer: {
    alignSelf: "stretch",
    alignItems: "flex-end",
    height: 85 * BCAI.screenRatio,
    width: 323 * BCAI.screenRatio,
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
  },
});
