import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { ArrowRight, ArrowLeft } from "../icons/BCAIIcons";
import BCAI from "../assets/constants/BCAIStyles";

function ArrowButton({ direction, theme, onPress, label, style }) {
  const backgroundColor =
    theme === "light" ? BCAI.c.primary.White : BCAI.c.secondary.Black;
  const opacity = theme === "light" ? 1 : 0.33;
  const color = theme === "light" ? BCAI.c.primary.Black : BCAI.c.primary.White;
  const textMarginRight = direction === "right" ? 8 * BCAI.screenRatio : 0;
  const textMarginLeft = direction === "right" ? 0 : 8 * BCAI.screenRatio;
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <TouchableOpacity
        style={{
          ...styles.button,
          backgroundColor,

          flexDirection: direction === "right" ? "row-reverse" : "row",
          ...style,
        }}
        onPress={onPress}
      >
        <View style={styles.icon}>
          {direction === "right" && <ArrowRight color={color} />}
          {direction === "left" && <ArrowLeft color={color} />}
        </View>
        <Text
          style={{
            ...styles.label,
            color,
            marginRight: textMarginRight,
            marginLeft: textMarginLeft,
          }}
        >
          {label}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

ArrowButton.propTypes = {
  direction: PropTypes.oneOf(["left", "right"]),
  theme: PropTypes.oneOf(["light", "dark"]),
};

export default ArrowButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 100,
    alignItems: "center",
    paddingVertical: 6 * BCAI.screenRatio,
    paddingHorizontal: 12 * BCAI.screenRatio,
    width: "auto",
  },
  icon: {},
  label: { ...BCAI.t.body },
});
