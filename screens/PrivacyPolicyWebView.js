import React from "react";

import { View, Linking, StyleSheet, TouchableOpacity } from "react-native";
import { WebView } from "react-native-webview";
import { useNavigation } from "@react-navigation/native";
import BCAI from "../assets/constants/BCAIStyles";
import { BackArrow } from "../icons/BCAIIcons";

const GoBack = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={styles.header} onPress={() => navigation.goBack()}>
      <BackArrow color={BCAI.c.primary.White} />
    </TouchableOpacity>
  );
};

const PrivacyPolicyWebView = () => {
  const uri = "https://binarycalculationsareinadequate.org/privacy";
  return (
    <>
      <GoBack />

      <WebView source={{ uri }} />
    </>
  );
};
export default PrivacyPolicyWebView;

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    top: 40 * BCAI.screenRatio,
    left: 20 * BCAI.screenRatio,
    zIndex: 12000,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
    justifyContent: "space-between",
    marginTop: 20 * BCAI.screenRatio,
    marginBottom: 20 * BCAI.screenRatio,
    height: 65 * BCAI.screenRatio,
  },
});
