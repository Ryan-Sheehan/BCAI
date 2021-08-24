import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import BCAI from "../../assets/constants/BCAIStyles";
const { height, width } = Dimensions.get("window");

const Footer = () => {
  return (
    <View style={styles.footer}>
      <View style={{ marginRight: 50 }}>
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
          }}
        >
          Stephanie{"\n"}
          Dinkins{"\n"}
          Studio
        </Text>
      </View>
      <View>
        <Text
          style={{
            ...BCAI.t.footerLabel,
            color: BCAI.c.primary.White,

            flexDirection: "row",
          }}
        >
          With Support From:
        </Text>
        <Text
          style={{
            ...BCAI.t.footerName,
            color: BCAI.c.primary.White,
          }}
        >
          Mozilla Foundation {"\n"}
          Visions 2030 {"\n"}
          Knight Foundation{" "}
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
    width,
    paddingHorizontal: 25 * BCAI.screenRatio,
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
  },
});
