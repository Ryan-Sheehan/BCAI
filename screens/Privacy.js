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
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import BCAI from "../assets/constants/BCAIStyles";
import NavBarSecondary from "../components/NavBarSecondary";
import NavMenu from "../components/NavMenu";
import ArrowButton from "../components/ArrowButton";
import { deleteFromFirebase } from "../utils/firebase";
import { resetCardsRespondedTo, resetDonations } from "../utils/localStorage";

function SettingsScreen({ navigation }) {
  const [userDonations, setUserDonations] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

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

  useEffect(() => {
    const getDonationsOnLoad = async () => {
      const donations = await getDonations();
      setUserDonations(donations);
    };
    getDonationsOnLoad();
  }, [userDonations]);

  const getDonations = async () => {
    return new Promise(async (resolve, reject) => {
      const donations = await AsyncStorage.getItem("donations");
      if (donations !== null) {
        const donationArr = JSON.parse(donations);
        resolve(donationArr);
      } else {
        resolve(null);
      }
    });
  };
  useEffect(() => {}, []);

  const deleteDonations = async () => {
    setIsDeleting(true);
    const donations = await getDonations();
    await Promise.all(
      donations.map(
        async (d) => await deleteFromFirebase(d.questionKey, d.snapshotKey)
      )
    );
    await resetDonations();
    setUserDonations(null);
    setIsDeleting(false);

    console.log(donations);
  };

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

        <View style={{ marginBottom: 60 }}>
          <Text
            style={{
              ...BCAI.t.largeTitle,
              color: BCAI.c.primary.White,
            }}
          >
            My Data
          </Text>
          {userDonations !== null && (
            <>
              {isDeleting ? (
                <View
                  style={{
                    marginTop: 12 * BCAI.screenRatio,
                    marginVertical: 8 * BCAI.screenRatio,
                    marginBottom: 30,
                    flexDirection: "row",
                    ustifyContent: "flex-start",
                  }}
                >
                  <ActivityIndicator />
                </View>
              ) : (
                <ArrowButton
                  style={{
                    marginTop: 12 * BCAI.screenRatio,
                    marginVertical: 8 * BCAI.screenRatio,
                    marginBottom: 30,
                  }}
                  theme="light"
                  direction="right"
                  label="Request my data to be deleted"
                  onPress={deleteDonations}
                />
              )}
            </>
          )}
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
        <View style={{ marginBottom: 60 }}>
          <Text
            style={{
              ...BCAI.t.largeTitle,
              color: BCAI.c.primary.White,
            }}
          >
            My Data
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
