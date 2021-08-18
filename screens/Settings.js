import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  Image,
  Switch,
  Linking,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Chevron } from "../icons/BCAIIcons";
import BCAI from "../assets/constants/BCAIStyles";
import NavBarSecondary from "../components/NavBarSecondary";
import { getActiveDeck } from "../utils/firebase";

import { resetCardsRespondedTo, resetDonations } from "../utils/localStorage";

const SettingsLineItemToggle = ({ label, value, onValueChange }) => {
  const thumbColor = value ? "#fff" : "#000";
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 62 * BCAI.screenRatio,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: BCAI.c.secondary.SwitchGray,
      }}
    >
      <Text
        style={{
          ...BCAI.t.headline,
          color: BCAI.c.primary.White,
        }}
      >
        {label}
      </Text>
      <Switch
        trackColor={{
          true: BCAI.c.secondary.SwitchGray,
          false: BCAI.c.secondary.SwitchGray,
        }}
        thumbColor={thumbColor}
        ios_backgroundColor={BCAI.c.secondary.SwitchGray}
        onValueChange={onValueChange}
        value={value}
      />
    </View>
  );
};

const SettingsLineItemChevron = ({ label, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 62 * BCAI.screenRatio,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: BCAI.c.secondary.SwitchGray,
      }}
    >
      <Text
        style={{
          ...BCAI.t.headline,
          color: BCAI.c.primary.White,
        }}
      >
        {label}
      </Text>
      <Chevron />
    </TouchableOpacity>
  );
};

function SettingsScreen({ navigation, route }) {
  const turnPushNotifsOn = route.params.pushNotifications;
  useEffect(() => {
    setTimeout(() => {
      if (turnPushNotifsOn) {
        setPushNotifications(true);
        setTimeout(() => {
          navigation.navigate("Home");
        }, 800);
      }
    }, 800);
  }, []);
  const [pushNotifications, setPushNotifications] = useState(false);
  const resetQuestions = async () => {
    const deck = await getActiveDeck();
    const { cardGroups } = deck;

    await resetCardsRespondedTo(cardGroups);
    await resetDonations();
    navigation.navigate("Home");
  };

  const resetQuestionsAlert = () => {
    console.log("hey");
    Alert.alert(
      "Confirm Reset",
      "Resetting questions will not delete your donations. You will be able to submit new responses to any of the questions you have already seen. ",
      [
        {
          text: "Cancel",

          style: "cancel",
        },
        { text: "Confirm", onPress: async () => await resetQuestions() },
      ]
    );
  };

  const contactUs = () => Linking.openURL("mailto:dinkinsstudio@gmail.com");
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ width: 323 * BCAI.screenRatio, flex: 1 }}>
        <NavBarSecondary navigation={navigation} />
        <Text
          style={{
            ...BCAI.t.largeTitle,
            color: BCAI.c.primary.White,
            marginBottom: 30,
          }}
        >
          App Settings
        </Text>
        <SettingsLineItemToggle
          label="Push Notifications"
          value={pushNotifications}
          onValueChange={setPushNotifications}
        />
        <SettingsLineItemChevron
          label="Reset Questions"
          onPress={resetQuestionsAlert}
        />
        <SettingsLineItemChevron label="Contact Us" onPress={contactUs} />
      </View>
    </SafeAreaView>
  );
}

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BCAI.c.primary.Black,
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
