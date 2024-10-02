import {
  Animated,
  Easing,
  Platform,
  PointerEvent,
  StyleSheet,
  View,
} from "react-native";
import React, { useCallback, useEffect, useMemo } from "react";
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
import { moderateScale } from "../Scaling";
type Props = {};

const BackToHome = (props: Props) => {
  const setOverlayText = useSetAtom(overlayTextAtom);
  const setCurrentSceneInfo = useSetAtom(currentSceneAtom);
  const resetCameraStateIndex = useResetAtom(cameraStateIndexAtom);
  const updateGamePhase = useSetAtom(gamePhaseControllerAtom);
  const animRef = useMemo(() => new Animated.Value(0.5), []);
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

  const handlePointerDown = useCallback((e: PointerEvent) => {
    e.stopPropagation();
  }, []);

  const handleOnPress = useCallback(() => {
    setCurrentSceneInfo({
      currentScene: "menu",
      transitionNeeded: false,
    });
    resetCameraStateIndex();
    updateGamePhase("reset");
    closeOverlay();
  }, [
    setCurrentSceneInfo,
    resetCameraStateIndex,
    updateGamePhase,
    closeOverlay,
  ]);

  return (
    <Animated.View
      style={{ ...styles.container, transform: [{ scale: animRef }] }}
      onPointerDown={handlePointerDown}
    >
      <CustomText style={styles.title}>Are you sure?</CustomText>
      <CustomText style={styles.subtitle}>
        You will lose today's earnings, but day count won't increase.
      </CustomText>
      <View style={styles.buttonContainer}>
        <AnimatedButton onPress={closeOverlay}>Cancel</AnimatedButton>
        <AnimatedButton onPress={handleOnPress}>Return Home</AnimatedButton>
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
    maxHeight: "45%",
    // width: "30%",
    width: Platform.select({
      web: "30%",
      native: "45%",
    }),
    borderRadius: 8,
    backgroundColor: "#FF9800",
    userSelect: "none",
  },

  title: {
    color: "#B80000",
    textAlign: "center",
    fontSize: moderateScale(18),
    includeFontPadding: false,
  },

  subtitle: {
    color: "#1a1a1a",
    fontSize: Platform.select({
      web: 16,
      native: 12,
    }),
    textAlign: "center",
    includeFontPadding: false,
  },

  buttonContainer: {
    flexDirection: "row",
    // gap: 25,
    gap: Platform.select({
      web: 25,
      native: 10,
    }),
  },
});
