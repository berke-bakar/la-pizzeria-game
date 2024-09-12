import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  currentCameraStateAtom,
  currentSceneAtom,
} from "@/constants/constants";
import AnimatedButton from "./AnimatedButton";

type Props = {};

const HUD = (props: Props) => {
  const [currentSceneInfo, setCurrentSceneInfo] = useAtom(currentSceneAtom);
  const advanceCamera = useSetAtom(currentCameraStateAtom);

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
});
