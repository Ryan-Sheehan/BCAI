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
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";

import { pushDonation } from "../utils/firebase";

import BCAI from "../assets/constants/BCAIStyles";
import NavBarSecondary from "../components/NavBarSecondary";
import NavMenu from "../components/NavMenu";
import ArrowButton from "../components/ArrowButton";
import { MicIcon, KeyboardIcon, SkipIcon, HelpIcon } from "../icons/BCAIIcons";
import Card from "../components/Questions/Card";
import BaseCard from "../components/Questions/BaseCard";
import BCAICamera from "../components/Questions/BCAICamera";
import BCAIVoiceMemo from "../components/Questions/BCAIVoiceMemo";
import DisclaimerToast from "../components/Questions/DisclaimerToast";

import ControlPanel from "../components/Questions/ControlPanel";
import NavBarPrimary from "../components/NavBarPrimary";
import animateValue from "../utils/animateValue";
import { Svg, Defs, Rect, Mask, Circle } from "react-native-svg";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;
const CARD_TOTAL = 3;
const ANIMATION_TIME = 1500;
const CAMERA_HEIGHT = 350;
const VOICE_MEMO_HEIGHT = 350;

const cardOptions1 = {
  topic: "Care",
  order: 1,
  question:
    "What would be the best to way to make sure all of our neighbors are cared for?",
  note:
    "* Care is close attention, concern, and responsibility for one another. Care is a deliberate, never-ending pursuit.",

  primaryColor: BCAI.c.primary.Blue,
  secondaryColor: BCAI.c.primary.Yellow,
  mode: "text",
};

const cardOptions2 = {
  topic: "Care",
  order: 2,
  question: "How do you define care?",
  note:
    "* This can be a little helping text that gives context to the current question.",

  primaryColor: BCAI.c.primary.Green,
  secondaryColor: BCAI.c.primary.Orange,
  mode: "text",
};

const cardOptions3 = {
  topic: "Care",
  order: 3,
  question:
    "Upload an image that illustrates close attention, concern, or responsibility in any way you see fit. Describe it in detail ",
  note:
    "* This can be a little helping text that gives context to the current question.",

  primaryColor: BCAI.c.primary.Yellow,
  secondaryColor: BCAI.c.primary.Lavender,
  mode: "image",
};
const cardOptions4 = {
  topic: "Thriving",
  order: 1,
  question: "How can your community take better care of itself?",
  note:
    "* Thriving is to flourish, grow. To thrive is to know you’re cared for and supported—so much that care overflows from you and spill onto others. To thrive is to be generous and plentiful.",

  primaryColor: BCAI.c.primary.Pink,
  secondaryColor: BCAI.c.primary.Cyan,
  mode: "text",
};

const cardOptions5 = {
  topic: "Thriving",
  order: 2,
  question: "How do you care for black women?",
  note:
    "* This can be a little helping text that gives context to the current question.",

  primaryColor: BCAI.c.primary.Orange,
  secondaryColor: BCAI.c.primary.White,
  mode: "image",
};

const cardOptions6 = {
  topic: "Thriving",
  order: 3,
  question: "What question should we ask of others donating data?",
  note:
    "* This can be a little helping text that gives context to the current question.",

  primaryColor: BCAI.c.primary.Cyan,
  secondaryColor: BCAI.c.primary.Blue,
  mode: "text",
};

const stack1 = [cardOptions1, cardOptions2, cardOptions3];
const stack2 = [cardOptions4, cardOptions5, cardOptions6];

let allStackss = [stack1, stack2];

const INIT_RESPONSES = new Array(CARD_TOTAL).fill(null);

const IMAGE_INPUT_INFO =
  "Take a photo or select a photo from your library to answer this question.";
const TEXT_INPUT_INFO = "Choose to Answer \nwith Text or Audio";

const Questions = ({ navigation, route }) => {
  const {
    activeDeck: { cardGroups },
  } = route.params;

  const stacks = cardGroups.map((cg) => cg.cards);
  const stacksWithOrder = cardGroups.map((cg, i) => {
    return cg.cards.map((c, i) => ({
      ...c,
      topic: cg.topic,
      order: 1 + i,
      primaryColor: c.primaryColor.value,
      secondaryColor: c.secondaryColor.value,
    }));
  });

  const allStacks = [...stacksWithOrder];
  const stackLengths = cardGroups.map((cg) => cg.cards.length);

  console.log(stackLengths);
  console.log(stacks.length);
  const [currentCard, setCurrentCard] = useState(0);
  const [currentStack, setCurrentStack] = useState(0);
  const [isSettingStack, setIsSettingStack] = useState(false);
  const [inputHeight, setInputHeight] = useState(0);

  const [toastOpen, setToastOpen] = useState(false);
  const [toastCleared, setToastCleared] = useState(false);

  /* KEYBOARD STATE START */
  const [keyboardActive, setKeyboardActive] = useState(false);
  const inputRefs = useRef([]);
  /* KEYBOARD STATE END */

  /* CAMERA STATE START */
  const [cameraActive, setCameraActive] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [hasPermission, setHasPermission] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);
  /* CAMERA STATE END */

  /* VOICE MEMO STATE START */
  const [voiceMemoActive, setVoiceMemoActive] = useState(false);
  const [recording, setRecording] = useState();
  /* VOICE MEMO STATE END */

  const [inputInfo, setInputInfo] = useState(null);
  const [secondaryColor, setSecondaryColor] = useState(null);
  const [mode, setMode] = useState(null);

  const [responses, setResponses] = useState(INIT_RESPONSES);

  /* UPDATE CURRENT CARD INFO WHEN INDEX CHANGES */
  useEffect(() => {
    if (currentCard < 3) {
      const card = allStacks[currentStack][currentCard];

      setInputInfo(null);

      setSecondaryColor(card.secondaryColor);
      setMode(card.mode);
    }
  }, [currentCard, currentStack]);

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

    return () => {
      Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
      Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
    };
  }, []);

  const [keyboardStatus, setKeyboardStatus] = useState(undefined);
  const _keyboardDidShow = (e) => {
    setInputHeight(e.endCoordinates.height - 20);
  };
  const _keyboardDidHide = (e) => {};

  /* RESET STACK OF CARDS */
  useEffect(() => {
    setRecording(undefined);
    if (currentStack > 0) {
      setResponses(INIT_RESPONSES);
      animateValue(
        setCurrentCard,
        setIsSettingStack,
        CARD_TOTAL,
        0,
        ANIMATION_TIME
      );
      setTimeout(() => {
        setIsSettingStack(false);
      }, 2 * ANIMATION_TIME);
    }
  }, [currentStack]);

  const goToNextCard = () => {
    setIsSettingStack(true);
    if (keyboardActive || cameraActive || voiceMemoActive) {
      closeInputs();

      setTimeout(() => {
        setCurrentCard((p) => p + 1);
      }, 800);
    } else {
      setCurrentCard((p) => p + 1);
    }
    setTimeout(() => {
      setIsSettingStack(false);
    }, 800);
  };

  const handleSkip = () => {
    goToNextCard();
  };

  /* EVENT HANDLERS */
  const closeKeyboard = () => {
    setKeyboardActive(false);
    setInputHeight(0);

    Keyboard.dismiss();
  };

  const closeVoiceMemo = () => {
    setVoiceMemoActive(false);
    setInputHeight(0);
  };
  const closeCamera = () => {
    setCameraActive(false);
    setInputHeight(0);
  };

  const closeInputs = () => {
    closeKeyboard();
    closeVoiceMemo();
    closeCamera();
  };

  const handleKeyboard = () => {
    console.log("hello");
    if (voiceMemoActive) {
      setVoiceMemoActive(false);
      setInputHeight(0);
    }
    if (keyboardActive) {
      closeKeyboard();
      inputRefs.current[currentCard].blur();
    } else {
      setKeyboardActive(true);

      setTimeout(() => {
        inputRefs.current[currentCard].focus();
      }, 500);
    }
  };

  // TODO
  const handleMic = () => {
    if (keyboardActive) {
      closeKeyboard();
    }
    if (voiceMemoActive) {
      setVoiceMemoActive(false);
      setInputHeight(0);
    } else {
      setVoiceMemoActive(true);
      setInputHeight(VOICE_MEMO_HEIGHT - 40);
    }
  };

  const reqeustCameraAccess = async () => {};
  useEffect(() => {
    if (photo !== null) {
      setCameraActive(false);
      setInputHeight(0);
    }
  }, [photo]);

  const handleCamera = async () => {
    if (!hasPermission) {
      await requestPermissions();
    }
    if (cameraActive) {
      setCameraActive(false);
      setInputHeight(0);
    } else {
      setCameraActive(true);
      setInputHeight(CAMERA_HEIGHT - 40);
    }
  };
  const handlePhoto = async () => {
    if (!hasPermission) {
      await requestPermissions();
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,

      quality: 1,
    });

    if (!result.cancelled) {
      setPhoto(result);
      const update = (p) => {
        const newResponses = [...p];
        newResponses[currentCard] = {
          type: "image",
          response: result,
          altText: "",
        };
        return newResponses;
      };
      setResponses(update);
    }
  };
  const handleHelp = () => {};

  const handleDonate = async () => {
    const hasAlreadyDonated = responses.filter((r) => r !== null).length > 1;
    if (!hasAlreadyDonated && !toastCleared) {
      if (keyboardActive) {
        closeKeyboard();
      }
      setToastOpen(true);
      return;
    }

    const card = allStacks[currentStack][currentCard];

    await pushDonation(card.question, responses[currentCard]);

    goToNextCard();
  };

  const requestPermissions = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    setHasPermission(status === "granted");
  };

  return (
    <SafeAreaView style={styles.container}>
      {allStacks[currentStack].map((c, i) => {
        return (
          <Card
            {...c}
            question={c.question}
            key={c.question + i + c.primaryColor}
            handleKeyboard={handleKeyboard}
            inputActive={keyboardActive || cameraActive || voiceMemoActive}
            completed={i < currentCard}
            ref={(el) => (inputRefs.current[i] = el)}
            response={responses[c.order - 1]}
            setResponses={setResponses}
            currentCard={currentCard}
            isSettingStack={isSettingStack}
            active={c.order === currentCard + 1}
            mode={mode}
            setPhoto={setPhoto}
          />
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
            inputInfo={inputInfo}
            color={secondaryColor}
            mode={mode}
            onSkip={handleSkip}
            onKeyboard={handleKeyboard}
            onMic={handleMic}
            onCamera={handleCamera}
            onPhoto={handlePhoto}
            onHelp={handleHelp}
            onDonate={handleDonate}
            recording={recording}
            inputHeight={inputHeight}
            inputActive={keyboardActive || cameraActive || voiceMemoActive}
            leftInputActive={keyboardActive || cameraActive}
            rightInputActive={voiceMemoActive}
            response={responses[currentCard]}
          />
        )}
      </AnimatePresence>
      <BCAICamera
        cameraActive={cameraActive}
        cameraHeight={CAMERA_HEIGHT}
        photo={photo}
        setPhoto={setPhoto}
        setResponses={setResponses}
        color={secondaryColor}
        currentCard={currentCard}
        setHasPermission={setHasPermission}
        hasPermission={hasPermission}
      />
      <BCAIVoiceMemo
        recording={recording}
        setRecording={setRecording}
        handleVoiceMemo={handleMic}
        setResponses={setResponses}
        color={secondaryColor}
        currentCard={currentCard}
        closeVoiceMemo={closeVoiceMemo}
        voiceMemoActive={voiceMemoActive}
        voiceMemoHeight={VOICE_MEMO_HEIGHT}
      />
      <DisclaimerToast
        setToastOpen={setToastOpen}
        toastOpen={toastOpen}
        setToastCleared={setToastCleared}
      />
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
