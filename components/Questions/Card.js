import React, { useState, useEffect, forwardRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  Image,
  Switch,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Keyboard,
} from "react-native";
import { MotiView, motify } from "moti";
import BCAI from "../../assets/constants/BCAIStyles";
import NavBarSecondary from "../../components/NavBarSecondary";
import NavMenu from "../../components/NavMenu";
import ArrowButton from "../../components/ArrowButton";
import {
  CardOne,
  CardTwo,
  CardThree,
  MicIcon,
  KeyboardIcon,
  SkipIcon,
  HelpIcon,
} from "../../icons/BCAIIcons";
import InputButton from "./InputButton";
import SecondaryButton from "./SecondaryButton";
import ControlPanel from "./ControlPanel";
import QuestionNote from "./QuestionNote";
import BigQuestion from "./BigQuestion";

import Header from "./Header";

import { Svg, Defs, Rect, Mask, Circle } from "react-native-svg";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;
const CARD_TOTAL = 3;

const MotiTextInput = motify(TextInput)();

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

const FullHeightSvg = ({ children, cardPos, completed }) => (
  <MotiView
    animate={{ translateX: completed ? -SCREEN_WIDTH : 0 }}
    style={{
      ...styles.fullHeightSVG,
      zIndex: cardPos,
    }}
  >
    <Svg height="100%" width="100%" viewBox="0 0 375 812">
      {children}
    </Svg>
  </MotiView>
);

const Card = (
  {
    children,
    navigation,
    keyboardActive,
    header,
    order,
    question,
    note,
    controlPanel,
    primaryColor,
    secondaryColor,
    completed,
    inputRef,
    responses,
    setResponses,
    currentCard,
    isSettingStack,
  },
  ref
) => {
  const cardPos = CARD_TOTAL + 1 - order;
  const cardPosScaled = 10 * cardPos;
  // useEffect(() => {
  //   console.log("-------");
  //   console.log(order);
  //   console.log(cardPosScaled);
  //   console.log(cardPosScaled + 1);

  //   console.log("-------");
  // }, [completed]);

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

  //const rgbPrimary = hexToRgb(primaryColor)
  const rgbSecondary = hexToRgb(secondaryColor);

  const rgbaSecondaryTransparent = `rgba(${rgbSecondary.r},${rgbSecondary.g},${rgbSecondary.b},0)`;
  const rgbaSecondaryOpaque = `rgba(${rgbSecondary.r},${rgbSecondary.g},${rgbSecondary.b},1)`;
  console.log(rgbaSecondaryOpaque);
  return (
    <>
      <MotiView
        animate={{ translateX: completed ? -SCREEN_WIDTH : 0 }}
        style={{ ...styles.container, zIndex: cardPosScaled + 1 }}
      >
        <View style={{ ...styles.containerInner }}>
          <Header prefix={header.prefix} topic={header.topic} />
          {(currentCard === order - 1 || isSettingStack) && (
            <>
              <BigQuestion
                text={question}
                active={keyboardActive || responses[order - 1] !== null}
              />
              <QuestionNote
                text={note}
                active={keyboardActive || responses[order - 1] !== null}
              />
            </>
          )}
          <ScrollView
            style={{ height: 300 }}
            showsVerticalScrollIndicator={false}
          >
            <MotiTextInput
              ref={ref}
              focus={keyboardActive}
              onChangeText={handleTextChange}
              value={responses[order - 1]}
              multiline={true}
              scrollEnabled={false}
              pointerEvents="none"
              onSubmitEditing={() => Keyboard.dismiss()}
              underlineColorAndroid="transparent"
              animate={{
                backgroundColor:
                  responses[order - 1] === null
                    ? rgbaSecondaryTransparent
                    : rgbaSecondaryOpaque,
              }}
              style={{
                ...BCAI.t.body,
                padding: 12 * BCAI.screenRatio,
                paddingVertical: 6 * BCAI.screenRatio,
                borderRadius: 15,
                marginBottom: 200 * BCAI.screenRatio,
              }}
              autoCompleteType="off"
              autoCorrect={false}
            />
          </ScrollView>
        </View>
      </MotiView>
      <FullHeightSvg cardPos={cardPosScaled} completed={completed}>
        {order === 1 && <CardThree color={primaryColor} />}
        {order === 2 && <CardTwo color={primaryColor} />}
        {order === 3 && <CardOne color={primaryColor} />}
      </FullHeightSvg>
    </>
  );
};
const forwardRefCard = forwardRef(Card);
const memoForwardRefCard = React.memo(forwardRefCard);
export default memoForwardRefCard;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 50 * BCAI.screenRatio,
    alignItems: "center",
  },
  containerInner: {
    width: 323 * BCAI.screenRatio,
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
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
