import { Platform, SafeAreaView, StyleSheet } from "react-native";
import React, { useCallback } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { currentSceneAtom, overlayTextAtom } from "@/constants/constants";
import AnimatedButton from "./AnimatedButton";
import PizzaCoin from "./PizzaCoin";
import CustomText from "../CustomText";
import useGameStore from "@/hooks/useGameStore";
import BackToHome from "./BackToHome";
import SpecialButton from "./SpecialButton";
import NextButton from "./NextButton";
import { horizontalScale, moderateScale } from "../Scaling";
import MusicSettingsButton from "./MusicSettingsButton";

const HUD = () => {
  const currentSceneInfo = useAtomValue(currentSceneAtom);

  const { wallet, dayCount } = useGameStore();
  const setOverLayText = useSetAtom(overlayTextAtom);

  const handleHomeButton = useCallback(() => {
    setOverLayText({
      OverlayItem: BackToHome,
      show: true,
      closeable: true,
    });
  }, [setOverLayText]);

  if (currentSceneInfo.currentScene != "game") {
    return (
      <>
        <MusicSettingsButton />
      </>
    );
  }

  return (
    <>
      <SafeAreaView style={styles.upper}>
        <AnimatedButton onPress={handleHomeButton}>Home</AnimatedButton>
        <CustomText style={styles.hudText}>DAY #{dayCount}</CustomText>
        <SafeAreaView style={styles.pizzaCoinContainer}>
          <PizzaCoin height={horizontalScale(35)} width={horizontalScale(20)} />
          <CustomText style={styles.hudText}>${wallet.toFixed(1)}</CustomText>
        </SafeAreaView>
      </SafeAreaView>
      <SafeAreaView style={styles.lower}>
        <AnimatedButton disabled>Prev</AnimatedButton>
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
    top: Platform.select({ web: 0, native: 10 }),
    width: "90%",
    height: "10%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
  },

  lower: {
    position: "absolute",
    zIndex: 8000,
    bottom: 30,
    width: "90%",
    height: "10%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
  },

  pizzaCoinContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    gap: 15,
    padding: 0,
  },

  hudText: {
    fontSize: moderateScale(18),
    color: "white",
    userSelect: "none",
  },
});
