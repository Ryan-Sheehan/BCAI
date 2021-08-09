import { Dimensions } from "react-native";

const fixRatio = () => {
  if (Dimensions.get("window").width > 600) {
    // 414 is the iPhoneX width
    return Dimensions.get("window").width / 375 / 1.3;
  }
  if (Dimensions.get("window").width < 600) {
    // 414 is the iPhoneX width
    return Dimensions.get("window").width / 375;
  }
  return 1;
};

const screenRatio = fixRatio();

const BCAI = {
  screenRatio,
  t: {
    largeTitle: {
      fontFamily: "Inktrap-Bold",
      fontSize: 36 * screenRatio,
      lineHeight: 44 * screenRatio,
    },
    body: {
      fontFamily: "Inktrap-Regular",
      fontSize: 18 * screenRatio,
    },
    bodyEmphasis: {
      fontFamily: "Inktrap-Bold",
      fontSize: 18 * screenRatio,
    },
    headline: {
      fontFamily: "Inktrap-Regular",
      fontSize: 22 * screenRatio,
    },
    footerLabel: {
      fontFamily: "Inktrap-Regular",
      fontSize: 14 * screenRatio,
    },
    secondaryButton: {
      fontFamily: "Inktrap-Bold",
      fontSize: 14 * screenRatio,
    },
    footerName: {
      fontFamily: "Inktrap-Bold",
      fontSize: 14 * screenRatio,
    },
    callout: {
      fontFamily: "Inktrap-Bold",
      fontSize: 18 * screenRatio,
    },
    warning: {
      fontFamily: "Inktrap-Bold",
      fontSize: 24 * screenRatio,
    },
    toastHeader: {
      fontFamily: "Inktrap-Bold",
      fontSize: 28 * screenRatio,
    },
  },
  c: {
    primary: {
      Black: "#131313",
      White: "#FFFFFF",
      Yellow: "#FFDF6B",
      Pink: "#FEBFFF",
      Lavender: "#B8AAFF",
      Orange: "#FF6F1E",
      Cyan: "#61F8F8",
      Blue: "#6194F8",
      Green: "#7CDE7A",
      Gray: "#DDE0E5",
    },
    secondary: {
      Black: "#333333",
      SwitchGray: "#2B2B2B",
    },
  },
};

export default BCAI;
