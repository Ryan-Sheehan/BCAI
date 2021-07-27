import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  Image,
  Switch,
} from "react-native";
import BCAI from "../assets/constants/BCAIStyles";
import NavBarSecondary from "../components/NavBarSecondary";

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
