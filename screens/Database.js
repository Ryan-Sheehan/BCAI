import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  Image,
  Switch,
  ScrollView,
  Linking,
} from "react-native";
import BCAI from "../assets/constants/BCAIStyles";
import NavBarSecondary from "../components/NavBarSecondary";
import NavMenu from "../components/NavMenu";
import { Person, Settings, Smiley, Database } from "../icons/BCAIIcons";
import ArrowButton from "../components/ArrowButton";

function SettingsScreen({ navigation }) {
  const [pushNotifications, setPushNotifications] = useState(false);
  const menuItems = [
    {
      label: "Why is this important?",
      navigateTo: "Database",
    },
    {
      label: "Why should I help?",
      navigateTo: "Settings",
    },
  ];
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{ width: 323 * BCAI.screenRatio, flex: 1 }}
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
      >
        <NavBarSecondary navigation={navigation} />
        <Text
          style={{
            ...BCAI.t.largeTitle,
            color: BCAI.c.primary.White,
            marginBottom: 30,
          }}
        >
          Database
        </Text>
        <Text
          style={{
            ...BCAI.t.body,
            color: BCAI.c.primary.White,
            marginBottom: 30,
          }}
        >
          All answers are submitted completely anonmously but please make sure
          you don’t include any information in your answers that can be used to
          personally identify you or people you know.
        </Text>

        <ArrowButton
          style={{ marginVertical: 8 * BCAI.screenRatio }}
          theme="light"
          direction="right"
          label="Go to Database on Github"
          onPress={() => Linking.openURL("https://github.com/")}
        />
      </ScrollView>
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
