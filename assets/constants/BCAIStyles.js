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
      fontFamily: "Manrope-Medium",
      fontSize: 34 * screenRatio,
      color: "#262626",
    },
    onboardingTitle: {
      fontFamily: "Manrope-SemiBold",
      fontSize: 28 * screenRatio,
      color: "#262626",
    },
    title1: {
      fontFamily: "Manrope-Bold",
      fontSize: 24 * screenRatio,
      color: "#262626",
    },
    title1Alt: {
      fontFamily: "Manrope-Medium",
      fontSize: 24 * screenRatio,
      color: "#262626",
    },
    title2: {
      fontFamily: "Manrope-Bold",
      fontSize: 22 * screenRatio,
      color: "#262626",
    },
    title2Alt: {
      fontFamily: "Manrope-Medium",
      fontSize: 22 * screenRatio,
      color: "#262626",
    },
    title3: {
      fontFamily: "Manrope-Bold",
      fontSize: 20 * screenRatio,
      color: "#262626",
    },
    title3Alt: {
      fontFamily: "Manrope-Medium",
      fontSize: 20 * screenRatio,
      color: "#262626",
    },
    subtitle: {
      fontFamily: "Manrope-Bold",
      fontSize: 18 * screenRatio,
      color: "#262626",
    },
    navTitle: {
      fontFamily: "Manrope-Bold",
      fontSize: 17 * screenRatio,
      color: "#262626",
    },
    navItem: {
      fontFamily: "Manrope-Medium",
      fontSize: 17 * screenRatio,
      color: "#262626",
    },
    navItemEmphasis: {
      fontFamily: "Manrope-Bold",
      fontSize: 17 * screenRatio,
      color: "#262626",
    },
    body: {
      fontFamily: "Manrope-Medium",
      fontSize: 15 * screenRatio,
      color: "#262626",
    },
    bodyEmphasis: {
      fontFamily: "Manrope-Bold",
      fontSize: 15 * screenRatio,
      color: "#262626",
    },
    headline: {
      fontFamily: "Manrope-Bold",
      fontSize: 15 * screenRatio,
      color: "#262626",
    },
    label: {
      fontFamily: "Manrope-SemiBold",
      fontSize: 16 * screenRatio,
      color: "#262626",
    },
    callout: {
      fontFamily: "Manrope-Medium",
      fontSize: 14 * screenRatio,
      color: "#262626",
    },
    disclaimer: {
      fontFamily: "Manrope-Medium",
      fontSize: 11 * screenRatio,
      color: "#262626",
    },
    subhead: {
      fontFamily: "Manrope-Bold",
      fontSize: 13 * screenRatio,
      color: "#262626",
    },
    caption: {
      fontFamily: "Manrope-Medium",
      fontSize: 13 * screenRatio,
      color: "#262626",
    },

    grayCaption: {
      fontFamily: "Manrope-SemiBold",
      fontSize: 12 * screenRatio,
      color: "#555555",
    },
    button: {
      fontFamily: "Manrope-Medium",
      fontSize: 15 * screenRatio,
      color: "#262626",
    },
    question: {
      fontFamily: "Manrope-SemiBold",
      fontSize: 26 * screenRatio,
      color: "#262626",
    },
    answer: {
      fontFamily: "Manrope-Regular",
      fontSize: 17 * screenRatio,
      color: "#262626",
    },
    next: {
      fontFamily: "Manrope-Bold",
      fontSize: 20 * screenRatio,
      color: "#262626",
    },
    chat: {
      fontFamily: "Manrope-Medium",
      fontSize: 16 * screenRatio,
      lineHeight: 22 * screenRatio,
      color: "#262626",
    },
  },
  // c for color
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
    secondary: {},
  },
};

export default BCAI;
