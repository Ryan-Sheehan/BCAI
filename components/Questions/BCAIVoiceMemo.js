import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  Button,
  SafeAreaView,
  Image,
  Switch,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { Audio } from "expo-av";

import { View, AnimatePresence } from "moti";
import { Camera } from "expo-camera";
import { BigMicIcon, SineIcon, CloseIcon } from "../../icons/BCAIIcons";
import BCAI from "../../assets/constants/BCAIStyles";
import formatMilliseconds from "../../utils/formatMilliseconds";

const BCAIVoiceMemo = ({
  color,
  currentCard,
  recording,
  setRecording,
  closeVoiceMemo,
  voiceMemoActive,
  voiceMemoHeight,
  handleVoiceMemo,
  setResponses,
}) => {
  const [recordingTimeElapsed, setRecordingTimeElapsed] = useState(0);
  const [timerID, setTimerID] = useState(null);
  const incrementTimeElapsed = () => {
    setRecordingTimeElapsed((p) => p + 1);
  };

  let timer = null;

  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const update = (p) => {
        const newResponses = [...p];
        newResponses[currentCard] = null;
        return newResponses;
      };
      setResponses(update);

      setRecordingTimeElapsed(0);
      timer = setInterval(incrementTimeElapsed, 1000);
      setTimerID(timer);
      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );

      setRecording(recording);
    } catch (err) {}
  };

  const stopRecording = async () => {
    setRecordingTimeElapsed(0);
    clearInterval(timerID);
    setRecording(undefined);
    setTimeout(() => {
      closeVoiceMemo();
    }, 500);

    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    const update = (p) => {
      const newResponses = [...p];
      newResponses[currentCard] = { type: "voice", response: uri };
      return newResponses;
    };
    setResponses(update);
  };

  return (
    <AnimatePresence>
      {voiceMemoActive && (
        <View
          style={{ ...styles.container, backgroundColor: color }}
          from={{ height: 0 }}
          animate={{ height: voiceMemoHeight * BCAI.screenRatio }}
          transition={{ type: "timing", duration: 200 }}
          exit={{ height: 0 }}
        >
          <View style={styles.cameraContainer}>
            <View style={styles.takePictureContainer}>
              <View style={styles.voiceMemoHeader}>
                <Text style={BCAI.t.body}>
                  {formatMilliseconds(
                    recordingTimeElapsed * 1000,
                    " min",
                    " sec"
                  )}
                </Text>
                <TouchableOpacity
                  disabled={recording}
                  style={{ opacity: recording ? 0.4 : 1 }}
                  onPress={handleVoiceMemo}
                >
                  <CloseIcon color={BCAI.c.primary.Black} crossColor={color} />
                </TouchableOpacity>
              </View>
              <AnimatePresence exitBeforeEnter>
                {recording && (
                  <View
                    key="recording"
                    from={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 150 }}
                    exitTransition={{ duration: 0 }}
                  >
                    <SineIcon />
                  </View>
                )}
                {!recording && (
                  <View
                    key="notrecording"
                    from={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0 }}
                    exitTransition={{ duration: 150 }}
                  >
                    <BigMicIcon />
                  </View>
                )}
              </AnimatePresence>
              <TouchableOpacity
                onPress={recording ? stopRecording : startRecording}
                style={styles.takePicture}
              >
                <Text style={{ ...BCAI.t.body, color: BCAI.c.primary.White }}>
                  {recording ? "Stop Recording" : "Start Recording"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </AnimatePresence>
  );
};

export default BCAIVoiceMemo;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: -30,
    zIndex: 100,
    elevation: 100,
    borderWidth: 0,
    borderRadius: 30,

    overflow: "hidden",
    justifyContent: "space-between",
  },
  camera: {
    zIndex: 100,
    marginTop: 0,
  },
  cameraContainer: {},
  takePictureContainer: {
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "space-between",
    height: 300,
    paddingTop: 20,
    paddingBottom: 10,
    marginBottom: 70 * BCAI.screenRatio,
    zIndex: 1000,
  },
  voiceMemoHeader: {
    alignSelf: "stretch",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 25,
  },
  takePicture: {
    borderRadius: 200,
    backgroundColor: BCAI.c.primary.Black,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
});
