import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { ArrowRight, ArrowLeft, BackArrow } from "../icons/BCAIIcons";
import BCAI from "../assets/constants/BCAIStyles";
import Hamburger from "./Hamburger";

function NavBarSecondary({ navigation }) {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <BackArrow color={BCAI.c.primary.White} />
      </TouchableOpacity>
      {/*<Hamburger onHamburgerPress={() => navigation.navigate("Home")} />*/}
    </View>
  );
}

export default NavBarSecondary;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
    justifyContent: "space-between",
    marginTop: 20 * BCAI.screenRatio,
    marginBottom: 20 * BCAI.screenRatio,
    height: 65 * BCAI.screenRatio,
  },
});
