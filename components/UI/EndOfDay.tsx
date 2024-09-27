import { Animated, Easing, StyleSheet, View } from "react-native";
import React, { useCallback, useEffect, useRef } from "react";
import CustomText from "../CustomText";
import { useAtom, useSetAtom } from "jotai";
import {
  cameraStateIndexAtom,
  currentSceneAtom,
  gamePhaseControllerAtom,
  overlayTextAtom,
  todaysCustomerRatings,
} from "@/constants/constants";
import AnimatedButton from "./AnimatedButton";
import { RESET, useResetAtom } from "jotai/utils";
import useGameStore from "@/hooks/useGameStore";
import { useToppings } from "@/hooks/useToppings";
type Props = {};

const EndOfDay = (props: Props) => {
  const setOverlayText = useSetAtom(overlayTextAtom);
  const [dayCount, incrementDay, addMoney] = useGameStore((state) => [
    state.dayCount,
    state.incrementDay,
    state.addMoney,
  ]);
  const [todaysRatings, setTodaysRatings] = useAtom(todaysCustomerRatings);
  const [total, clearTotal] = useToppings((state) => [
    state.total,
    state.clearTotal,
  ]);
  const animRef = useRef(new Animated.Value(0.5)).current;
  const closeOverlay = useCallback(() => {
    return setOverlayText((prev) => ({ ...prev, show: false }));
  }, [setOverlayText]);
  const setCurrentSceneInfo = useSetAtom(currentSceneAtom);
  const resetCameraStateIndex = useResetAtom(cameraStateIndexAtom);
  const updateGamePhase = useSetAtom(gamePhaseControllerAtom);

  const avgRatings =
    todaysRatings.reduce((acc, curr) => acc + curr, 0) /
    todaysRatings.length /
    25;

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
      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <CustomText style={styles.header}>End of Day #{dayCount}</CustomText>
        <CustomText style={styles.info}>
          The day ended. Let's close the pizzeria
        </CustomText>
        <CustomText style={styles.info}>
          You earned ${total.toFixed(2)} today!
        </CustomText>
        <CustomText style={styles.info}>
          Today's Rating: {avgRatings.toFixed(2)}/5
        </CustomText>
      </View>
      <AnimatedButton
        onPress={() => {
          closeOverlay();
          setCurrentSceneInfo({
            currentScene: "menu",
            transitionNeeded: false,
          });
          resetCameraStateIndex();
          updateGamePhase("reset");
          addMoney(total);
          clearTotal();
          incrementDay();
          setTodaysRatings(RESET);
        }}
      >
        Home
      </AnimatedButton>
    </Animated.View>
  );
};

export default EndOfDay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    maxHeight: "70%",
    width: "50%",
    borderRadius: 8,
    backgroundColor: "#FF9800",
    userSelect: "none",
  },

  header: {
    color: "#B80000",
    fontSize: 50,
  },

  info: {
    color: "#820300",
    maxWidth: "65%",
  },
});
