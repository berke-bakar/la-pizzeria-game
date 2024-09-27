import { Animated, Easing, StyleSheet, View } from "react-native";
import React, { useCallback, useEffect, useRef } from "react";
import CustomText from "../CustomText";
import { useSetAtom } from "jotai";
import {
  cameraStateIndexAtom,
  currentSceneAtom,
  gamePhaseControllerAtom,
  overlayTextAtom,
} from "@/constants/constants";
import AnimatedButton from "./AnimatedButton";
import { useResetAtom } from "jotai/utils";
type Props = {};

const BackToHome = (props: Props) => {
  const setOverlayText = useSetAtom(overlayTextAtom);
  const setCurrentSceneInfo = useSetAtom(currentSceneAtom);
  const resetCameraStateIndex = useResetAtom(cameraStateIndexAtom);
  const updateGamePhase = useSetAtom(gamePhaseControllerAtom);
  const animRef = useRef(new Animated.Value(0.5)).current;
  const closeOverlay = useCallback(() => {
    return setOverlayText((prev) => ({ ...prev, show: false }));
  }, [setOverlayText]);

  useEffect(() => {
    Animated.timing(animRef, {
      toValue: 1,
      useNativeDriver: true,
      easing: Easing.bounce,
    }).start();
    return () => {};
  }, [animRef]);

  return (
    <Animated.View
      style={{ ...styles.container, transform: [{ scale: animRef }] }}
      onPointerDown={(e) => {
        e.stopPropagation();
      }}
    >
      <CustomText style={styles.title}>Are you sure?</CustomText>
      <CustomText style={styles.subtitle}>
        You will lose today's earnings, but day count won't increase.
      </CustomText>
      <View style={styles.buttonContainer}>
        <AnimatedButton onPress={closeOverlay}>Cancel</AnimatedButton>
        <AnimatedButton
          onPress={() => {
            setCurrentSceneInfo({
              currentScene: "menu",
              transitionNeeded: false,
            });
            resetCameraStateIndex();
            updateGamePhase("reset");
            closeOverlay();
          }}
        >
          Return Home
        </AnimatedButton>
      </View>
    </Animated.View>
  );
};

export default BackToHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    maxHeight: "30%",
    width: "30%",
    borderRadius: 8,
    backgroundColor: "#FF9800",
    userSelect: "none",
    // gap: 15,
  },

  title: {
    color: "#B80000",
    fontSize: 30,
    maxWidth: "50%",
    textAlign: "center",
  },

  subtitle: {
    color: "#1a1a1a",
    fontSize: 15,
    maxWidth: "50%",
    textAlign: "center",
  },

  buttonContainer: {
    flexDirection: "row",
    gap: 25,
  },

  info: {
    color: "#820300",
    maxWidth: "65%",
    // fontSize: 16,
  },
});
