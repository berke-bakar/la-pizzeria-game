import { SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { currentSceneAtom, overlayTextAtom } from "@/constants/constants";
import AnimatedButton from "./AnimatedButton";
import PizzaCoin from "./PizzaCoin";
import CustomText from "../CustomText";
import useGameStore from "@/hooks/useGameStore";
import BackToHome from "./BackToHome";
import SpecialButton from "./SpecialButton";
import NextButton from "./NextButton";

type Props = {};

const HUD = (props: Props) => {
  const currentSceneInfo = useAtomValue(currentSceneAtom);

  const { wallet, dayCount } = useGameStore();
  const setOverLayText = useSetAtom(overlayTextAtom);

  if (currentSceneInfo.currentScene != "game") {
    return null;
  }

  return (
    <>
      <SafeAreaView style={styles.upper}>
        <AnimatedButton
          onPointerDown={() => {
            setOverLayText({
              OverlayItem: BackToHome,
              show: true,
              closeable: true,
            });
          }}
        >
          Home
        </AnimatedButton>
        <CustomText style={styles.hudText}>DAY #{dayCount}</CustomText>
        <SafeAreaView style={styles.pizzaCoinContainer}>
          <PizzaCoin height={"100%"} width={100} />
          <CustomText style={styles.hudText}>${wallet}</CustomText>
        </SafeAreaView>
      </SafeAreaView>
      <SafeAreaView style={styles.lower}>
        <AnimatedButton
          onPointerDown={() => {
            // advanceCamera("retreat");
          }}
        >
          Prev
        </AnimatedButton>
        <SpecialButton />
        <NextButton />
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
    userSelect: "none",
  },
});
