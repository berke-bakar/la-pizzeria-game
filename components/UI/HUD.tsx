import { SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import { useAtom, useSetAtom } from "jotai";
import {
  currentCameraStateAtom,
  currentSceneAtom,
} from "@/constants/constants";
import AnimatedButton from "./AnimatedButton";
import PizzaCoin from "./PizzaCoin";
import CustomText from "../CustomText";
import useGameStore from "@/hooks/useGameStore";

type Props = {};

const HUD = (props: Props) => {
  const [currentSceneInfo, setCurrentSceneInfo] = useAtom(currentSceneAtom);
  const advanceCamera = useSetAtom(currentCameraStateAtom);
  const { money, dayCount } = useGameStore();

  if (currentSceneInfo.currentScene != "game") {
    return null;
  }

  return (
    <>
      <SafeAreaView style={styles.upper}>
        <AnimatedButton
          onPointerDown={() => {
            setCurrentSceneInfo({
              currentScene: "menu",
              transitionNeeded: false,
            });
          }}
        >
          Home
        </AnimatedButton>
        <CustomText style={styles.hudText}>DAY #{dayCount}</CustomText>
        <SafeAreaView style={styles.pizzaCoinContainer}>
          <PizzaCoin height={"100%"} width={100} />
          <CustomText style={styles.hudText}>${money}</CustomText>
        </SafeAreaView>
      </SafeAreaView>
      <SafeAreaView style={styles.lower}>
        <AnimatedButton
          onPointerDown={() => {
            advanceCamera("retreat");
          }}
        >
          Prev
        </AnimatedButton>
        <AnimatedButton
          onPointerDown={() => {
            advanceCamera("advance");
          }}
        >
          Next
        </AnimatedButton>
      </SafeAreaView>
    </>
  );
};

export default HUD;

const styles = StyleSheet.create({
  upper: {
    position: "absolute",
    zIndex: 8000,
    top: 0,
    width: "90%",
    height: "10%",
    right: 0,
    left: 0,
    flexDirection: "row",
    marginHorizontal: "auto",
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: "rgba(255, 255, 255, 0.5)",
  },

  lower: {
    position: "absolute",
    zIndex: 8000,
    bottom: 30,
    width: "90%",
    height: "10%",
    right: 0,
    left: 0,
    flexDirection: "row",
    marginHorizontal: "auto",
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: "rgba(255, 255, 255, 0.5)",
  },

  pizzaCoinContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
  },

  hudText: {
    fontSize: 50,
    color: "white",
  },
});
