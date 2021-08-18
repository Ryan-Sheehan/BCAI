import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import FastImage from "react-native-fast-image";

import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import ArrowButton from "../components/ArrowButton";
import {
  Chevron,
  Person,
  Settings,
  Smiley,
  Database,
} from "../icons/BCAIIcons";
import BCAI from "../assets/constants/BCAIStyles";

function NavMenu({ navigation, menuItems }) {
  const keyExtractor = (item) => item.label;
  const renderItem = ({ item, index }) => {
    const { label, navigateTo } = item;
    const handlePress = () => {
      navigation.navigate(navigateTo, item?.params ? item?.params : {});
    };

    return (
      <TouchableOpacity onPress={handlePress} style={styles.menuButton}>
        <View style={styles.menuButtonInner}>
          {item?.icon && (
            <View style={styles.icon}>
              <Text>{item.icon}</Text>
            </View>
          )}
          <Text style={styles.label}>{label}</Text>
        </View>
        <Chevron />
      </TouchableOpacity>
    );
  };
  return (
    <FlatList
      style={styles.menu}
      contentContainerStyle={{}}
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
      data={menuItems}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
    />
  );
}

export default NavMenu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BCAI.c.primary.Black,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  menu: {
    alignSelf: "stretch",
    marginTop: 16,
  },
  label: {
    ...BCAI.t.body,
    color: BCAI.c.primary.White,
  },
  icon: { marginRight: 8, paddingTop: 4 },
  menuButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderTopWidth: 1,
    borderColor: BCAI.c.primary.White,
  },
  menuButtonInner: {
    flexDirection: "row",
    alignItems: "center",
    height: 32,
  },
});
