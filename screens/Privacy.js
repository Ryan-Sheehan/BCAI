import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  Button,
  SafeAreaView,
  Image,
  Switch,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
} from "react-native";
import { getActiveDeck } from "../utils/firebase";
import { View } from "moti";
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
  const [isDeleted, setIsDeleted] = useState(false);

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
    const deck = await getActiveDeck();
    const { cardGroups } = deck;
    console.log(cardGroups);

    const donations = await getDonations();
    if (donations !== null) {
      setIsDeleting(true);
      await Promise.all(
        donations.map(
          async (d) => await deleteFromFirebase(d.questionKey, d.snapshotKey)
        )
      );
    }

    await resetDonations();
    await resetCardsRespondedTo(cardGroups);
    setUserDonations(null);
    setIsDeleting(false);
    setIsDeleted(true);
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
            marginBottom: 15,
          }}
        >
          Your Privacy
        </Text>
        <Text
          style={{
            ...BCAI.t.body,
            color: BCAI.c.primary.White,
            marginBottom: 50,
          }}
        >
          By answering questions anonymously, you are donating data. Be
          intentional. Your offering will help create nuanced datasets that
          center and honor lives, cultures and values often under considered or
          ignored in the{" "}
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                "https://en.unesco.org/courier/2018-2/unbearable-burden-technosphere"
              )
            }
          >
            <Text
              style={{
                ...BCAI.t.body,
                color: BCAI.c.primary.White,
                textDecorationLine: "underline",
              }}
            >
              technosphere.
            </Text>
          </TouchableOpacity>
        </Text>
        <Text
          style={{
            ...BCAI.t.body,
            color: BCAI.c.primary.White,
            marginBottom: 10,
          }}
        >
          Your donation will help:
        </Text>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "rgba(255,255,255,0.15)",
            padding: 10,
            borderRadius: 15,
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              ...BCAI.t.body,
              color: BCAI.c.primary.White,
            }}
          >
            Build a data commons of concepts, needs, and values defined by
            everyday people.
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            backgroundColor: "rgba(255,255,255,0.15)",
            padding: 10,
            borderRadius: 15,
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              ...BCAI.t.body,
              color: BCAI.c.primary.White,
            }}
          >
            Create more descriptive, comprehensive, and supportive datasets that
            represent our communities with complexity, love and deep-seated
            understanding.
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            backgroundColor: "rgba(255,255,255,0.15)",
            padding: 10,
            borderRadius: 15,
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              ...BCAI.t.body,
              color: BCAI.c.primary.White,
            }}
          >
            Shape new ways of building more holistic algorithmic ecosystems that
            support that support our daily lives.
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            marginBottom: 15,
            backgroundColor: "rgba(255,255,255,0.15)",
            padding: 10,
            borderRadius: 15,
          }}
        >
          <Text
            style={{
              ...BCAI.t.body,
              color: BCAI.c.primary.White,
            }}
          >
            Co-create community-centered systems informed by the people, for the
            people in support of the people.
          </Text>
        </View>
        <ArrowButton
          style={{
            marginTop: 12 * BCAI.screenRatio,
            marginVertical: 8 * BCAI.screenRatio,
            marginBottom: 80,
          }}
          theme="light"
          direction="right"
          label="Read Our Full Privacy Policy"
          onPress={() => navigation.navigate("PrivacyPolicyWebView")}
        />

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
              ...BCAI.t.largeTitleRegular,
              color: BCAI.c.primary.White,
              marginBottom: 15,
            }}
          >
            My Data
          </Text>

          <>
            {isDeleted ? (
              <View
                from={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ type: "timing", duration: 1000 }}
              >
                <Text
                  style={{
                    ...BCAI.t.body,
                    color: BCAI.c.primary.White,
                    marginBottom: 25,
                    backgroundColor: "rgba(0,0,0,0.4)",
                  }}
                >
                  Your data has been successfully deleted
                </Text>
              </View>
            ) : isDeleting ? (
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
              <>
                <ArrowButton
                  style={{
                    marginTop: 12 * BCAI.screenRatio,
                    marginVertical: 8 * BCAI.screenRatio,
                    marginBottom: 30,
                  }}
                  theme="light"
                  direction="right"
                  label="Ask to Have Your Data Deleted *"
                  onPress={deleteDonations}
                />
                <Text
                  style={{
                    ...BCAI.t.body,
                    color: BCAI.c.primary.White,
                    marginBottom: 30,
                    paddingLeft: 25,
                  }}
                >
                  * Donations are periodically published. We cannot gaurantee
                  your anonymous contributions have not already downloaded and
                  deployed.
                </Text>
              </>
            )}
          </>
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
