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
import ArrowButton from "../components/ArrowButton";

function SettingsScreen({ navigation }) {
  const menuItems = [
    {
      label: "What is this for?",
      navigateTo: "Database",
    },
    {
      label: "Is my data secure?",
      navigateTo: "Settings",
    },
    {
      label: "Can I delete my answers",
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
          Your Privacy
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
        <View style={{ marginBottom: 60 }}>
          <Text
            style={{
              ...BCAI.t.largeTitle,
              color: BCAI.c.primary.White,
            }}
          >
            FAQ
          </Text>
          <NavMenu navigation={navigation} menuItems={menuItems} />
        </View>

        <View style={{ marginBottom: 60 }}>
          <Text
            style={{
              ...BCAI.t.largeTitle,
              color: BCAI.c.primary.White,
            }}
          >
            My Data
          </Text>
          <ArrowButton
            style={{ marginVertical: 8 * BCAI.screenRatio, marginBottom: 30 }}
            theme="light"
            direction="right"
            label="Go to Database on Github"
            onPress={() => Linking.openURL("https://github.com/")}
          />
          <Text
            style={{
              ...BCAI.t.body,
              color: BCAI.c.primary.White,
              marginBottom: 30,
            }}
          >
            *Remember that your donations are published every month. We cannot
            guarantee that someone has not made copies of your answers.
          </Text>
        </View>
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
