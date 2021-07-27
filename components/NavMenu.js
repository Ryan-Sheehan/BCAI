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
      navigation.navigate(navigateTo);
    };

    return (
      <TouchableOpacity
        onPress={handlePress}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingVertical: 16,
          borderTopWidth: 1,
          borderColor: BCAI.c.primary.White,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            height: 32,
          }}
        >
          {item?.icon && (
            <View style={{ marginRight: 8, paddingTop: 4 }}>
              <Text>{item.icon}</Text>
            </View>
          )}
          <Text
            style={{
              ...BCAI.t.body,
              color: BCAI.c.primary.White,
            }}
          >
            {label}
          </Text>
        </View>
        <Chevron />
      </TouchableOpacity>
    );
  };
  return (
    <FlatList
      style={{
        alignSelf: "stretch",
        marginTop: 16,
      }}
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
});
