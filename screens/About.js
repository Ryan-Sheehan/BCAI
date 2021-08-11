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
} from "react-native";
import BCAI from "../assets/constants/BCAIStyles";
import NavBarSecondary from "../components/NavBarSecondary";
import NavMenu from "../components/NavMenu";
import { Person, Settings, Smiley, Database } from "../icons/BCAIIcons";

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
      params: { pushNotifications: false },
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
          What are Binary Calculations Are Inadequate?
        </Text>
        <Text
          style={{
            ...BCAI.t.body,
            color: BCAI.c.primary.White,
            marginBottom: 30,
          }}
        >
          The algorithmic ecologies surrounding us are increasingly complex,
          extractive, and embedded into every aspect of our lives. We empower
          companies, big tech, and governments to track us with the trail of
          information we leave behind with each encounter. Some of these systems
          are helpful, some of them are harmful, most are built atop data that
          incompletely describe most inhabitants on the planet.{" "}
        </Text>
        <Text
          style={{
            ...BCAI.t.body,
            color: BCAI.c.primary.White,
            marginBottom: 30,
          }}
        >
          Data extracted and often augmented with biased historical information
          is used to assess, control, serve, appease and even titillate.. Our
          needs, hopes, dreams, and desires, along with multitudes of cultural
          nuance, get averaged to uphold and serve the demands of the status
          quo. Binary Calculations help algorithmic networks become less
          reductive and encourage complexity, plurality, kindness, and
          generosity instead.
        </Text>

        {/*<View style={{ marginBottom: 60 }}>
          <Text
            style={{
              ...BCAI.t.largeTitle,
              color: BCAI.c.primary.White,
            }}
          >
            FAQ
          </Text>
          <NavMenu navigation={navigation} menuItems={menuItems} />
        </View>*/}
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
