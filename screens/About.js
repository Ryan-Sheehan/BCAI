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
            marginBottom: 15,
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
          are helpful, countless others are harmful, and most algorithmic
          systems are informed by data that incompletely describe most
          inhabitants of the planet. Common datasets used for AI-assisted
          medical diagnose, for example, often under-represent people with
          darker skin.
        </Text>
        <Text
          style={{
            ...BCAI.t.body,
            color: BCAI.c.primary.White,
            marginBottom: 80,
          }}
        >
          Data extracted and often augmented with biased historical information
          is used to assess, control, serve, appease and even titillate. Our
          needs, hopes, dreams, and desires, along with multitudes of cultural
          nuance, get averaged to uphold and serve the demands of the status
          quo. Binary Calculations aims to push algorithmic networks to become
          less reductive and encourage complexity, plurality, kindness, and
          generosity instead.
        </Text>
        <Text
          style={{
            ...BCAI.t.largeTitle,
            color: BCAI.c.primary.White,
            marginBottom: 15,
          }}
        >
          FAQ
        </Text>
        <Text
          style={{
            ...BCAI.t.headline,
            color: BCAI.c.primary.White,
            marginBottom: 10,
          }}
        >
          Why is this important
        </Text>
        <Text
          style={{
            ...BCAI.t.body,
            color: BCAI.c.primary.White,
            marginBottom: 30,
          }}
        >
          Our lives are increasingly controlled by artificially intelligent (AI)
          technologies that try to predict the future based on what has happened
          in the past. These technologies are redefining our relationships with
          each other and also redefining society at large. While they are often
          ultimately geared toward making money, AI technologies can also help
          shape our understanding of humanity with complexity and democratic
          principles. By providing precise data, people globally can help define
          what the technological future should look like, how it should
          function, and help design methods to define and achieve our collective
          goals.
        </Text>
        <Text
          style={{
            ...BCAI.t.body,
            color: BCAI.c.primary.White,
            marginBottom: 80,
          }}
        >
          At present algorithmic systems tend to be technically complex,
          preventing most people from understanding or challenging many
          algorithmic outcomes. The ways they influence society are usually
          hidden, giving more power to the institutions that build and maintain
          them and less to the people governed by them. This is unsustainable.
          We, the majority, need more influence over the AI tools and
          algorithmic ecosystems that govern us. Our attention, advocacy for,
          and participation in AI development is crucial to creating a world
          that will care for and support the sum of us, rather than a select
          few.
        </Text>
        <Text
          style={{
            ...BCAI.t.headline,
            color: BCAI.c.primary.White,
            marginBottom: 10,
          }}
        >
          Why should I help?
        </Text>
        <Text
          style={{
            ...BCAI.t.body,
            color: BCAI.c.primary.White,
            marginBottom: 30,
          }}
        >
          Every answer you provide contributes to a people’s data commons of
          ideas, content, and more precise labeling. We aim to create more
          holistic, broadly representative, inclusive datasets reflecting the
          depth and artifacts of the communities we care about.
        </Text>
        <Text
          style={{
            ...BCAI.t.body,
            color: BCAI.c.primary.White,
            marginBottom: 80,
          }}
        >
          The data commons—one for images and one for text—created through
          Binary Calculations will model how supportive databases of care can be
          curated, maintained, and disseminated while centering the idea of
          building public trust and equity in the technosphere. Our datasets
          will be open and available to anyone wanting to develop data-centric
          projects without relying exclusively on big data or tech
        </Text>

        <Text
          style={{
            ...BCAI.t.largeTitle,
            color: BCAI.c.primary.White,
            marginBottom: 15,
          }}
        >
          Credits
        </Text>
        <Text
          style={{
            ...BCAI.t.body,
            color: BCAI.c.primary.White,
          }}
        >
          Artist:{" "}
          <Text
            style={{
              ...BCAI.t.bodyEmphasis,
              color: BCAI.c.primary.White,
            }}
          >
            Stephanie Dinkins
          </Text>
        </Text>
        <Text
          style={{
            ...BCAI.t.body,
            color: BCAI.c.primary.White,
          }}
        >
          Advisor and collaborator:{" "}
          <Text
            style={{
              ...BCAI.t.bodyEmphasis,
              color: BCAI.c.primary.White,
            }}
          >
            Surya Mattu
          </Text>
        </Text>
        <Text
          style={{
            ...BCAI.t.body,
            color: BCAI.c.primary.White,
          }}
        >
          Collaborator:{" "}
          <Text
            style={{
              ...BCAI.t.bodyEmphasis,
              color: BCAI.c.primary.White,
            }}
          >
            Neta Bomani
          </Text>
        </Text>
        <Text
          style={{
            ...BCAI.t.body,
            color: BCAI.c.primary.White,
          }}
        >
          Designer:{" "}
          <Text
            style={{
              ...BCAI.t.bodyEmphasis,
              color: BCAI.c.primary.White,
            }}
          >
            Pedro Sanches
          </Text>
        </Text>
        <Text
          style={{
            ...BCAI.t.body,
            color: BCAI.c.primary.White,
          }}
        >
          Web designer and front-end developers:{" "}
          <Text
            style={{
              ...BCAI.t.bodyEmphasis,
              color: BCAI.c.primary.White,
            }}
          >
            Andrew Herzog & Nicky Tesla & Ryan Sheehan
          </Text>
        </Text>
        <Text
          style={{
            ...BCAI.t.body,
            color: BCAI.c.primary.White,
            marginBottom: 80,
          }}
        >
          Back-end developers:{" "}
          <Text
            style={{
              ...BCAI.t.bodyEmphasis,
              color: BCAI.c.primary.White,
            }}
          >
            Sukanya Aneja & Brent Bailey
          </Text>
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
