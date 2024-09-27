import { Dimensions, SafeAreaView, StyleSheet, View } from "react-native";
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
import { horizontalScale, moderateScale, verticalScale } from "../Scaling";

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
          onPress={() => {
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
    top: 0,
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
