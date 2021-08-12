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
import { View, AnimatePresence } from "moti";
import { Camera } from "expo-camera";
import BCAI from "../../assets/constants/BCAIStyles";

const DOUBLE_PRESS_DELAY = 400;

const BCAICamera = ({
  color,
  currentCard,
  photo,
  setPhoto,
  cameraActive,
  cameraHeight,
  setResponses,
  hasPermission,
  setHasPermission,
  pictureTaken,
  setPictureTaken,
}) => {
  if (!hasPermission) return null;

  const cameraRef = useRef();

  const [type, setType] = useState(Camera.Constants.Type.back);
  let lastPress = 0;

  const onDoublePress = () => {
    const time = new Date().getTime();
    const delta = time - lastPress;

    if (delta < DOUBLE_PRESS_DELAY) {
      // Success double press
      console.log("double press");
      setType(
        type === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back
      );
    }
    lastPress = time;
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePicture = async () => {
    try {
      console.log("photo taken");
      console.log("");
      const currentPhoto = await cameraRef.current.takePictureAsync();
      console.log(currentPhoto);
      setPictureTaken(true);
      setPhoto(currentPhoto);
      const update = (p) => {
        const newResponses = [...p];
        newResponses[currentCard] = {
          type: "image",
          response: currentPhoto,
          altText: null,
        };
        return newResponses;
      };
      setResponses(update);
    } catch (e) {
      setPictureTaken(false);
    }
  };

  return (
    <AnimatePresence>
      {cameraActive && (
        <View
          style={{ ...styles.container, borderColor: color }}
          from={{ height: 0 }}
          animate={{ height: cameraHeight * BCAI.screenRatio }}
          transition={{ type: "timing", duration: 200 }}
          exit={{ height: 0 }}
        >
          <View style={styles.cameraContainer}>
            {pictureTaken && photo !== null ? (
              <Image
                style={{
                  ...styles.camera,
                  height: cameraHeight * BCAI.screenRatio,
                }}
                source={{ uri: photo.uri }}
              />
            ) : (
              <Camera
                ref={cameraRef}
                style={{
                  ...styles.camera,
                  height: cameraHeight * BCAI.screenRatio,
                }}
                type={type}
                onStartShouldSetResponder={() => onDoublePress()}
              >
                <View style={styles.takePictureContainer}>
                  <TouchableOpacity
                    style={styles.takePicture}
                    onPress={takePicture}
                  />
                </View>
              </Camera>
            )}
          </View>
        </View>
      )}
    </AnimatePresence>
  );
};

export default BCAICamera;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: -30,
    zIndex: 100,
    elevation: 100,
    borderWidth: 8,
    borderRadius: 30,

    overflow: "hidden",
  },
  camera: {
    zIndex: 100,
    marginTop: 0,
    justifyContent: "flex-end",
  },
  cameraContainer: {},
  takePictureContainer: {
    alignSelf: "stretch",
    alignItems: "center",

    marginBottom: 80 * BCAI.screenRatio,
    zIndex: 100000,
    elevation: 100000,
  },
  takePicture: {
    borderRadius: 200,
    backgroundColor: BCAI.c.primary.White,
    height: 58 * BCAI.screenRatio,
    width: 58 * BCAI.screenRatio,
  },
});
