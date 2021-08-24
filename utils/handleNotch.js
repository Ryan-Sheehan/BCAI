import { Dimensions } from "react-native";
import { StyleSheet } from "react-native";

const getStyle = (inputStyle) => {
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;

  const ratios = {
    notchless: 0.56,
    notched: 0.46,
    iPadA: 0.75,
    iPadB: 0.7,
  };
  const roundToHundreth = (num) => {
    return Math.round(100 * num) / 100;
  };
  const getScreenRatClass = (width, height, ratios) => {
    const rat = roundToHundreth(width / height);
    //console.log(rat);
    let device = "other";
    Object.keys(ratios).forEach((e) => {
      if (rat === ratios[e]) {
        device = e;
      }
    });
    // fixes android ratios
    if (device === "other" || device === "iPadA" || device === "iPadB") {
      device = "notchless";
    }

    return device;
  };
  const styleTypes = Object.keys(inputStyle);
  const outputClasses = {};
  Object.keys(ratios).forEach((e) => {
    outputClasses[e] = { ...inputStyle };
    styleTypes.forEach((a) => {
      if (typeof inputStyle[a] === "object") {
        if (inputStyle[a][e] == null) {
          outputClasses[e][a] = inputStyle[a].default;
        } else {
          outputClasses[e][a] = inputStyle[a][e];
        }
      }
    });
  });
  return outputClasses[getScreenRatClass(width, height, ratios)];
};

export const handleNotch = (styleSheetInput) => {
  const styleSheetOutput = {};
  const oldStyleSheet = Object.keys(styleSheetInput);
  oldStyleSheet.forEach((e) => {
    styleSheetOutput[e] = getStyle(styleSheetInput[e]);
  });
  return StyleSheet.create(styleSheetOutput);
};
