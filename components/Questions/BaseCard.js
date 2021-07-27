import React, { useState, useEffect } from "react";
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
  Dimensions,
} from "react-native";
import { AnimatePresence } from "moti";
import BCAI from "../../assets/constants/BCAIStyles";
import NavBarSecondary from "../../components/NavBarSecondary";
import NavMenu from "../../components/NavMenu";
import ArrowButton from "../../components/ArrowButton";
import {
  MicIcon,
  KeyboardIcon,
  SkipIcon,
  HelpIcon,
} from "../../icons/BCAIIcons";
import Card from "../../components/Questions/Card";
import ControlPanel from "../../components/Questions/ControlPanel";
import NavBarPrimary from "../../components/NavBarPrimary";
import EnablePushNotificationsButton from "./EnablePushNotificationsButton";
import { Svg, Defs, Rect, Mask, Circle } from "react-native-svg";

const BaseCard = ({
  navigation,
  currentStack,
  setCurrentStack,
  animationTime,
}) => {
  const animation = require("../../assets/media/homepage.gif");
  const [noMoreStacks, setNoMoreStacks] = useState(false);
  useEffect(() => {
    console.log(noMoreStacks);
  }, [noMoreStacks]);
  const handlePress = () => {
    setCurrentStack((p) => p + 1);
    setTimeout(() => {
      setNoMoreStacks(true);
    }, animationTime);
  };
  const goToSettings = () => {
    navigation.navigate("Settings", { pushNotifications: true });
  };
  return (
    <View style={{ ...styles.baseCard, zIndex: 0 }}>
      <View style={{ width: 323 * BCAI.screenRatio, flex: 1, zIndex: 0 }}>
        <NavBarPrimary onHamburgerPress={() => {}} />

        {!noMoreStacks && (
          <>
            <Text style={{ ...BCAI.t.largeTitle, color: BCAI.c.primary.White }}>
              Thank you! Your answers are helping craft a better future!
            </Text>
            <ArrowButton
              style={{ marginVertical: 16 * BCAI.screenRatio }}
              theme="light"
              direction="right"
              label="Give more"
              onPress={handlePress}
            />
            <Image
              style={{ width: 323 * BCAI.screenRatio }}
              source={animation}
            />
          </>
        )}
        {noMoreStacks && (
          <>
            <Text
              style={{
                ...BCAI.t.warning,
                color: BCAI.c.primary.White,
                marginTop: 40 * BCAI.screenRatio,
                marginBottom: 20 * BCAI.screenRatio,
              }}
            >
              Oops!
            </Text>
            <Text style={{ ...BCAI.t.warning, color: BCAI.c.primary.White }}>
              No more questions left! Would it be ok if we notify you when new
              questions pop up?
            </Text>
            <EnablePushNotificationsButton
              onPress={goToSettings}
              style={{ marginTop: 40 * BCAI.screenRatio }}
            />
          </>
        )}
      </View>
    </View>
  );
};

export default BaseCard;

const styles = StyleSheet.create({
  baseCard: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 50,
    alignItems: "center",
  },
});
