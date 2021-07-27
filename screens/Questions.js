import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  Image,
  Switch,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Keyboard,
  TextInput,
} from "react-native";
import { AnimatePresence } from "moti";
import BCAI from "../assets/constants/BCAIStyles";
import NavBarSecondary from "../components/NavBarSecondary";
import NavMenu from "../components/NavMenu";
import ArrowButton from "../components/ArrowButton";
import { MicIcon, KeyboardIcon, SkipIcon, HelpIcon } from "../icons/BCAIIcons";
import Card from "../components/Questions/Card";
import BaseCard from "../components/Questions/BaseCard";

import ControlPanel from "../components/Questions/ControlPanel";
import NavBarPrimary from "../components/NavBarPrimary";
import animateValue from "../utils/animateValue";
import { Svg, Defs, Rect, Mask, Circle } from "react-native-svg";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;
const CARD_TOTAL = 3;
const ANIMATION_TIME = 1500;

const cardOptions1 = {
  header: { prefix: "On", topic: "Care" },
  order: 1,
  question:
    "What would be the best to way to make sure all of our neighbors are cared for?",
  note:
    "* Care is close attention, concern, and responsibility for one another. Care is a deliberate, never-ending pursuit.",
  inputInfo: "Choose to Answer \nwith Text or Audio",
  primaryColor: BCAI.c.primary.Blue,
  secondaryColor: BCAI.c.primary.Yellow,
  mode: "text",
};

const cardOptions2 = {
  header: { prefix: "Question On", topic: "Care" },
  order: 2,
  question: "How do you define care?",
  note:
    "* This can be a little helping text that gives context to the current question.",
  inputInfo: null,
  primaryColor: BCAI.c.primary.Green,
  secondaryColor: BCAI.c.primary.Orange,
  mode: "text",
};

const cardOptions3 = {
  header: { prefix: "Question On", topic: "Care" },
  order: 3,
  question:
    "Upload an image that illustrates close attention, concern, or responsibility in any way you see fit. Describe it in detail ",
  note:
    "* This can be a little helping text that gives context to the current question.",
  inputInfo:
    "Take a photo or select a photo from your library to answer this question.",
  primaryColor: BCAI.c.primary.Yellow,
  secondaryColor: BCAI.c.primary.Lavender,
  mode: "image",
};
const cardOptions4 = {
  header: { prefix: "On", topic: "Thriving" },
  order: 1,
  question: "How can your community take better care of itself?",
  note:
    "* Thriving is to flourish, grow. To thrive is to know you’re cared for and supported—so much that care overflows from you and spill onto others. To thrive is to be generous and plentiful.",
  inputInfo: "Choose to Answer \nwith Text or Audio",
  primaryColor: BCAI.c.primary.Pink,
  secondaryColor: BCAI.c.primary.Cyan,
  mode: "text",
};

const cardOptions5 = {
  header: { prefix: "Question On", topic: "Thriving" },
  order: 2,
  question: "How do you care for black women?",
  note:
    "* This can be a little helping text that gives context to the current question.",
  inputInfo: null,
  primaryColor: BCAI.c.primary.Orange,
  secondaryColor: BCAI.c.primary.White,
  mode: "text",
};

const cardOptions6 = {
  header: { prefix: "Question On", topic: "Thriving" },
  order: 3,
  question: "What question should we ask of others donating data?",
  note:
    "* This can be a little helping text that gives context to the current question.",
  inputInfo:
    "Take a photo or select a photo from your library to answer this question.",
  primaryColor: BCAI.c.primary.Cyan,
  secondaryColor: BCAI.c.primary.Blue,
  mode: "text",
};

const stack1 = [cardOptions1, cardOptions2, cardOptions3];
const stack2 = [cardOptions4, cardOptions5, cardOptions6];

const allStacks = [stack1, stack2];

const INIT_RESPONSES = new Array(CARD_TOTAL).fill(null);

const Questions = ({ navigation }) => {
  const [currentCard, setCurrentCard] = useState(0);
  const [currentStack, setCurrentStack] = useState(0);
  const [isSettingStack, setIsSettingStack] = useState(true);
  const [keyboardActive, setKeyboardActive] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const inputRefs = useRef([]);
  const [responses, setResponses] = useState(INIT_RESPONSES);

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
      Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
    };
  }, []);

  const getInputInfo = () => allStacks[currentStack][currentCard].inputInfo;
  const getSecondaryColor = () =>
    allStacks[currentStack][currentCard].secondaryColor;

  const [keyboardStatus, setKeyboardStatus] = useState(undefined);
  const _keyboardDidShow = (e) => {
    setKeyboardHeight(e.endCoordinates.height - 20);
  };
  const _keyboardDidHide = (e) => {};

  useEffect(() => {
    if (currentStack > 0) {
      setResponses(INIT_RESPONSES);
      animateValue(
        setCurrentCard,
        setIsSettingStack,
        CARD_TOTAL,
        0,
        ANIMATION_TIME
      );
    }
  }, [currentStack]);

  // useEffect(() => {
  //   console.log(responses);
  // }, [responses]);

  useEffect(() => {
    console.log("------------");
    console.log(isSettingStack);
    console.log("------------");
  }, [isSettingStack]);

  const closeKeyboard = () => {
    setKeyboardHeight(0);
    setKeyboardActive(false);
    Keyboard.dismiss();
  };

  const goToNextCard = () => {
    if (keyboardActive) {
      setKeyboardHeight(0);
      Keyboard.dismiss();
      setTimeout(() => {
        setKeyboardActive(false);
      }, 210);

      setTimeout(() => {
        setCurrentCard((p) => p + 1);
      }, 640);
    } else {
      setCurrentCard((p) => p + 1);
    }
  };

  const handleSkip = () => {
    goToNextCard();
  };

  const currentRef = inputRefs.current[currentCard];

  const handleKeyboard = () => {
    if (keyboardActive) {
      closeKeyboard();
      currentRef.blur();
    } else {
      currentRef.focus();
      setKeyboardActive(true);
    }
  };

  // TODO
  const handleMic = () => {};
  const handleHelp = () => {};
  const handleDonate = () => {
    goToNextCard();
  };

  return (
    <SafeAreaView style={styles.container}>
      {allStacks[currentStack].map((c, i) => {
        return (
          <Card
            {...c}
            question={c.question}
            key={c.question + i + c.primaryColor}
            keyboardActive={keyboardActive}
            completed={i < currentCard}
            ref={(el) => (inputRefs.current[i] = el)}
            responses={responses}
            setResponses={setResponses}
            currentCard={currentCard}
            isSettingStack={isSettingStack}
          ></Card>
        );
      })}

      <BaseCard
        navigation={navigation}
        currentStack={currentStack}
        setCurrentStack={setCurrentStack}
        animationTime={ANIMATION_TIME}
      />
      <AnimatePresence>
        {currentCard < CARD_TOTAL && (
          <ControlPanel
            inputInfo={isSettingStack || keyboardActive ? null : getInputInfo()}
            color={getSecondaryColor()}
            onSkip={handleSkip}
            onKeyboard={handleKeyboard}
            onMic={handleMic}
            onHelp={handleHelp}
            onDonate={handleDonate}
            keyboardHeight={keyboardHeight}
            keyboardActive={keyboardActive}
            response={responses[currentCard]}
          />
        )}
      </AnimatePresence>
    </SafeAreaView>
  );
};

export default Questions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BCAI.c.primary.Black,
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
