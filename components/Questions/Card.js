import React, { useState, useEffect, forwardRef, useRef } from "react";
import {
  StyleSheet,
  Text,
  Button,
  SafeAreaView,
  Image,
  Switch,
  ScrollView,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  Keyboard,
  ActivityIndicator,
  Platform,
} from "react-native";
import { Audio } from "expo-av";

import { View, motify, AnimatePresence } from "moti";
import BCAI from "../../assets/constants/BCAIStyles";
import NavBarSecondary from "../../components/NavBarSecondary";
import NavMenu from "../../components/NavMenu";
import ArrowButton from "../../components/ArrowButton";
import formatMilliseconds from "../../utils/formatMilliseconds";
import { handleNotch } from "../../utils/handleNotch";

import hexToRgb from "../../utils/hexToRgb";

import {
  CardOne,
  CardTwo,
  CardThree,
  SmallCardOne,
  SmallCardTwo,
  SmallCardThree,
  MicIcon,
  KeyboardIcon,
  SkipIcon,
  HelpIcon,
  CloseIcon,
  SmallCloseIcon,
  EditIcon,
  PlayIcon,
  PauseIcon,
} from "../../icons/BCAIIcons";
import InputButton from "./InputButton";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";
import ControlPanel from "./ControlPanel";
import QuestionNote from "./QuestionNote";
import BigQuestion from "./BigQuestion";

import Header from "./Header";

import { Svg, Defs, Rect, Mask, Circle } from "react-native-svg";

const { height, width } = Dimensions.get("window");

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;
const CARD_TOTAL = 3;

const MotiTextInput = motify(TextInput)();

const MotiImage = motify(Image)();

const FullHeightSvg = ({
  children,
  ratio,
  cardPos,
  completed,
  backgroundColor,
}) => {
  const fillers = SCREEN_WIDTH - 353;
  const fillersIOS = SCREEN_WIDTH - 333;

  console.log(fillers);
  return (
    <>
      <View
        animate={{ translateX: completed ? -SCREEN_WIDTH * 1.2 : 0 }}
        style={{
          ...styles.fullHeightSVG,
          zIndex: cardPos,
          elevation: cardPos,
        }}
      >
        <Svg
          height="100%"
          width="100%"
          viewBox="0 0 375 812"
          style={{
            transform: [
              { scale: ratio === 0.56 ? 1.2 : 1 },
              { translateY: ratio === 0.56 ? 50 : 0 },
            ],
          }}
        >
          {children}
        </Svg>
      </View>
      {Platform.OS !== "ios" && (
        <>
          <View
            animate={{ translateX: completed ? -SCREEN_WIDTH * 1.2 : 0 }}
            style={{
              position: "absolute",
              right: 0,
              bottom: 0,
              top: 0,
              zIndex: cardPos,
              elevation: cardPos,
              width: fillers,
              backgroundColor,
            }}
          />
          <View
            animate={{ translateX: completed ? -SCREEN_WIDTH * 1.2 : 0 }}
            style={{
              position: "absolute",
              left: 0,
              bottom: 0,
              top: 0,
              zIndex: cardPos,
              elevation: cardPos,
              width: fillers,
              backgroundColor,
            }}
          />
        </>
      )}
      {ratio === 0.75 && (
        <>
          <View
            animate={{ translateX: completed ? -SCREEN_WIDTH * 1.2 : 0 }}
            style={{
              position: "absolute",
              right: 0,
              bottom: 0,
              top: 0,
              zIndex: cardPos,
              elevation: cardPos,
              width: fillersIOS,
              backgroundColor,
            }}
          />
          <View
            animate={{ translateX: completed ? -SCREEN_WIDTH * 1.2 : 0 }}
            style={{
              position: "absolute",
              left: 0,
              bottom: 0,
              top: 0,
              zIndex: cardPos,
              elevation: cardPos,
              width: fillersIOS,
              backgroundColor,
            }}
          />
        </>
      )}
    </>
  );
};
const CardVoiceMemo = ({
  voiceMemoLoading,
  secondaryColor,
  response,
  setResponses,
  order,
}) => {
  if (response === null) return null;
  if (response !== null && response.type === "text") return null;

  const [sound, setSound] = useState();
  const [loading, setLoading] = useState(false);

  const [playing, setPlaying] = useState(false);

  const [duration, setDuration] = useState(null);

  const clearVoiceMemo = () => {
    const update = (p) => {
      const newResponses = [...p];
      newResponses[order - 1] = null;
      return newResponses;
    };
    setResponses(update);
  };

  const onPlaybackStatusUpdate = async (status) => {
    if (status.didJustFinish) {
      setPlaying(false);
    }
  };

  const setupSound = async () => {
    setLoading(true);
    console.log("Loading Sound");
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    const { sound } = await Audio.Sound.createAsync({
      uri: response.response,
    });

    const { durationMillis } = await sound.getStatusAsync();

    await sound.setVolumeAsync(1);
    await sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);

    setDuration(durationMillis);

    setSound(sound);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    setupSound();
  }, []);

  async function playSound() {
    console.log("Playing Sound");

    await sound.playAsync();
    setPlaying(true);
  }

  const stopSound = async () => {
    await sound.pauseAsync();
    setPlaying(false);
  };

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : () => {};
  }, [sound]);

  return (
    <View
      key="whoa"
      from={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 600 }}
      style={{ flexDirection: "row" }}
    >
      {duration !== null && (
        <View
          style={{
            backgroundColor: secondaryColor,
            borderRadius: 100,
            paddingVertical: 4,
            paddingHorizontal: 10,
            height: 35,
            alignSelf: "stretch",
            alignItems: "center",
            justifyContent: "center",
          }}
          animate={{ width: loading ? 80 : 170 }}
        >
          <AnimatePresence exitBeforeEnter>
            {loading ? (
              <View
                key="loader"
                from={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 400 }}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ActivityIndicator size="small" color={BCAI.c.primary.Black} />
              </View>
            ) : (
              <>
                <View
                  key="audio-file"
                  from={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 400 }}
                  style={{
                    flexDirection: "row",
                    alignSelf: "stretch",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <TouchableOpacity onPress={playing ? stopSound : playSound}>
                      {playing ? <PauseIcon /> : <PlayIcon />}
                    </TouchableOpacity>
                    <Text style={{ ...BCAI.t.body }}>
                      {formatMilliseconds(duration, "m", "s")}
                    </Text>
                  </View>

                  <TouchableOpacity
                    onPress={clearVoiceMemo}
                    style={{
                      marginLeft: 0,
                    }}
                  >
                    <SmallCloseIcon
                      color={BCAI.c.primary.Black}
                      crossColor={secondaryColor}
                    />
                  </TouchableOpacity>
                </View>
              </>
            )}
          </AnimatePresence>
        </View>
      )}
    </View>
  );
};

const CardTextInput = forwardRef(
  (
    {
      inputActive,
      handleKeyboard,
      handleTextChange,
      response,
      order,
      secondaryColor,
      closeInputs,
    },
    ref
  ) => {
    if (response !== null && response.type === "voice") return null;

    const rgbSecondary = hexToRgb(secondaryColor);

    const rgbaSecondaryTransparent = `rgba(${rgbSecondary.r},${rgbSecondary.g},${rgbSecondary.b},0)`;
    const rgbaSecondaryOpaque = `rgba(${rgbSecondary.r},${rgbSecondary.g},${rgbSecondary.b},1)`;
    return (
      <ScrollView
        style={{
          height: 300,
        }}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity activeOpacity={1} onPress={handleKeyboard}>
          <MotiTextInput
            ref={ref}
            focus={inputActive}
            onChangeText={handleTextChange}
            onBlur={closeInputs}
            multiline={true}
            scrollEnabled={false}
            pointerEvents="none"
            returnKeyType="done"
            blurOnSubmit={true}
            onSubmitEditing={(e) => {
              e.preventDefault();
              handleKeyboard();
            }}
            underlineColorAndroid="transparent"
            animate={{
              backgroundColor:
                response === null
                  ? rgbaSecondaryTransparent
                  : rgbaSecondaryOpaque,
            }}
            style={styles.textInput}
            autoCompleteType="off"
            autoCorrect={false}
          />
        </TouchableOpacity>
      </ScrollView>
    );
  }
);

const CardImage = ({
  secondaryColor,
  uri,
  handleAltTextChange,
  clearPhoto,
  response,

  editingImageDescription,
  setEditingImageDescription,
  hasBegunEditing,
  setHasBegunEditing,
  closeInputs,
}) => {
  const altTextRef = useRef();

  useEffect(() => {
    console.log(response);
  }, [response.altText]);

  useEffect(() => {
    if (editingImageDescription) {
      altTextRef.current.focus();
    }
  }, [editingImageDescription]);

  const rgbSecondary = hexToRgb(secondaryColor);

  const rgbaSecondaryTransparent = `rgba(${rgbSecondary.r},${rgbSecondary.g},${rgbSecondary.b},0)`;
  const rgbaSecondaryOpaque = `rgba(${rgbSecondary.r},${rgbSecondary.g},${rgbSecondary.b},1)`;
  return (
    <>
      <View
        from={{ opacity: 0, translateY: 25 }}
        animate={{
          opacity: 1,
          translateY: 0,
          height: editingImageDescription ? 120 : 267,
        }}
        exit={{ opacity: 0 }}
        transition={{ type: "timing", delay: 300, duration: 500 }}
        exitTransition={{ type: "timing", duration: 0 }}
        style={{
          zIndex: 100,

          marginTop: 10,
          borderRadius: 13,
          overflow: "hidden",
          borderWidth: 5,
          borderColor: secondaryColor,
        }}
      >
        <MotiImage
          style={{
            height: 267,
          }}
          source={{ uri }}
        />
        <TouchableOpacity
          onPress={clearPhoto}
          style={{ position: "absolute", right: 10, top: 10 }}
        >
          <CloseIcon color={secondaryColor} />
        </TouchableOpacity>
      </View>
      <View
        from={{ opacity: 0, translateY: 25 }}
        animate={{ opacity: 1, translateY: 0 }}
        exit={{ opacity: 0 }}
        transition={{ type: "timing", delay: 200, duration: 500 }}
        exitTransition={{ type: "timing", delay: 0, duration: 0 }}
        style={{
          marginTop: 12,
          flexDirection: "row",
        }}
      >
        {editingImageDescription || response.altText !== null ? (
          <MotiTextInput
            key="add-desc-input"
            from={{ opacity: 0 }}
            animate={{
              opacity: 1,
              backgroundColor: !hasBegunEditing
                ? response.altText !== null
                  ? rgbaSecondaryOpaque
                  : rgbaSecondaryTransparent
                : rgbaSecondaryOpaque,
            }}
            exit={{ opacity: 0 }}
            ref={altTextRef}
            onChangeText={handleAltTextChange}
            multiline={true}
            scrollEnabled={false}
            pointerEvents="none"
            returnKeyType="done"
            blurOnSubmit={true}
            onSubmitEditing={(e) => {
              e.preventDefault();

              setEditingImageDescription(false);
              setHasBegunEditing(false);
              closeInputs();
            }}
            underlineColorAndroid="transparent"
            style={styles.textInput}
            autoCompleteType="off"
            autoCorrect={false}
          />
        ) : (
          <PrimaryButton
            key="add-desc-button"
            from={{ opacity: 0 }}
            animate={{
              opacity: 1,
            }}
            exit={{ opacity: 0 }}
            transition={{ type: "timing", delay: 200, duration: 500 }}
            label={"Describe Your Image in Detail"}
            color={secondaryColor}
            icon={<EditIcon />}
            onPress={() => setEditingImageDescription(true)}
          />
        )}
      </View>
    </>
  );
};

const Card = (
  {
    children,
    navigation,
    inputActive,
    handleKeyboard,

    topic,

    order,
    question,
    note,
    controlPanel,
    primaryColor,
    secondaryColor,
    completed,
    inputRef,
    response,
    setResponses,
    currentCard,
    isSettingStack,
    active,
    mode,
    setPhoto,
    voiceMemoLoading,
    clearPhoto,
    editingImageDescription,
    setEditingImageDescription,
    hasBegunEditing,
    setHasBegunEditing,
    closeInputs,
  },
  ref
) => {
  const cardPos = CARD_TOTAL + 1 - order;
  const cardPosScaled = 10 * cardPos;

  const handleTextChange = (text) => {
    const update = (p) => {
      const newResponses = [...p];
      if (text.length === 0) {
        newResponses[order - 1] = null;
      } else {
        newResponses[order - 1] = { type: "text", response: text };
      }

      return newResponses;
    };
    setResponses(update);
  };

  const handleAltTextChange = (text) => {
    const update = (p) => {
      const newResponses = [...p];
      if (text.length === 0 && hasBegunEditing) {
        setEditingImageDescription(false);
        setHasBegunEditing(false);
        newResponses[order - 1] = { ...newResponses[order - 1], altText: null };
      } else {
        setHasBegunEditing(true);
        newResponses[order - 1] = { ...newResponses[order - 1], altText: text };
      }

      return newResponses;
    };
    setResponses(update);
  };

  const showQuestion = active || isSettingStack;

  const roundToHundreth = (num) => {
    return Math.round(100 * num) / 100;
  };

  const ratio = roundToHundreth(width / height);

  console.log("------ratio------");
  console.log(ratio);
  console.log("------ratio------");

  return (
    <>
      <View
        animate={{ translateX: completed ? -SCREEN_WIDTH * 1.2 : 0 }}
        style={{
          ...styles.container,
          zIndex: cardPosScaled + 1,
          elevation: cardPosScaled + 1,
        }}
      >
        <View style={styles.containerInner}>
          <Header topic={topic} />

          <View>
            <BigQuestion
              text={question}
              active={inputActive || response !== null}
              showQuestion={showQuestion}
            />

            <QuestionNote
              text={note}
              active={inputActive || response !== null}
            />
          </View>

          {mode === "text" && (
            <>
              <CardTextInput
                ref={ref}
                inputActive={inputActive}
                handleKeyboard={handleKeyboard}
                handleTextChange={handleTextChange}
                response={response}
                order={order}
                secondaryColor={secondaryColor}
                closeInputs={closeInputs}
              />

              <CardVoiceMemo
                voiceMemoLoading={voiceMemoLoading}
                response={response}
                setResponses={setResponses}
                order={order}
                secondaryColor={secondaryColor}
              />
            </>
          )}
          <AnimatePresence>
            {mode === "image" && response !== null && (
              <CardImage
                uri={response.response.uri}
                handleAltTextChange={handleAltTextChange}
                clearPhoto={clearPhoto}
                secondaryColor={secondaryColor}
                response={response}
                editingImageDescription={editingImageDescription}
                setEditingImageDescription={setEditingImageDescription}
                hasBegunEditing={hasBegunEditing}
                setHasBegunEditing={setHasBegunEditing}
                closeInputs={closeInputs}
              />
            )}
          </AnimatePresence>
        </View>
      </View>

      <FullHeightSvg
        cardPos={cardPosScaled}
        completed={completed}
        backgroundColor={primaryColor}
        ratio={ratio}
      >
        {order === 1 && <CardThree color={primaryColor} />}
        {order === 2 && <CardTwo color={primaryColor} />}
        {order === 3 && <CardOne color={primaryColor} />}
      </FullHeightSvg>
    </>
  );
};
const forwardRefCard = forwardRef(Card);
const memoForwardRefCard = React.memo(forwardRefCard);
export default forwardRefCard;

const styles = handleNotch({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    top: {
      notched: 50 * BCAI.screenRatio,
      notchless: 35 * BCAI.screenRatio,
    },

    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  containerInner: {
    width,
    height,

    paddingHorizontal: 25 * BCAI.screenRatio,
    alignSelf: "flex-start",
    flex: 1,
  },
  fullHeightSVG: {
    aspectRatio: 1,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,

    borderRadius: 20,
    overflow: "visible",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  textInput: {
    ...BCAI.t.body,
    padding: 12 * BCAI.screenRatio,
    paddingVertical: 6 * BCAI.screenRatio,
    borderRadius: 15,
    marginBottom: 200 * BCAI.screenRatio,
  },
});
