import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { ArrowRight, ArrowLeft, BackArrow } from "../icons/BCAIIcons";
import BCAI from "../assets/constants/BCAIStyles";
import Hamburger from "./Hamburger";

function NavBarSecondary({ navigation }) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "stretch",
        justifyContent: "space-between",
        marginTop: 20 * BCAI.screenRatio,
        marginBottom: 20 * BCAI.screenRatio,
        height: 65 * BCAI.screenRatio,
      }}
    >
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <BackArrow color={BCAI.c.primary.White} />
      </TouchableOpacity>
      <Hamburger />
    </View>
  );
}

export default NavBarSecondary;

const styles = StyleSheet.create({});
