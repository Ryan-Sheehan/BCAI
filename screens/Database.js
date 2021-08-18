import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  Button,
  SafeAreaView,
  Image,
  Switch,
  ScrollView,
  Linking,
  Dimensions,
} from "react-native";
import { View } from "moti";
import BCAI from "../assets/constants/BCAIStyles";
import NavBarSecondary from "../components/NavBarSecondary";
import NavMenu from "../components/NavMenu";
import { Person, Settings, Smiley, Database } from "../icons/BCAIIcons";
import ArrowButton from "../components/ArrowButton";

const { width } = Dimensions.get("window");

function SettingsScreen({ navigation }) {
  const [pushNotifications, setPushNotifications] = useState(false);
  const animation = require("../assets/media/hug.gif");

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
          All data donations are submitted completely anonmously. Still, be
          careful. Don't provide information others can easily trace back to you
          or your people.
        </Text>

        <ArrowButton
          style={{ marginVertical: 8 * BCAI.screenRatio }}
          theme="light"
          direction="right"
          label="See What Donated Data Creates"
          onPress={() => Linking.openURL("https://github.com/")}
        />
      </ScrollView>
      <View
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          type: "timing",
          duration: 1000,
        }}
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          left: 0,
          top: 0,
          zIndex: -1,
        }}
      >
        <Image
          style={{
            width,
            position: "absolute",
            bottom: 0,

            zIndex: -1,
          }}
          source={animation}
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
