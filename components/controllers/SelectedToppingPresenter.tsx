import { StyleSheet, Animated } from "react-native";
import React, { useEffect, useRef } from "react";
import { useAtomValue } from "jotai";
import { selectedToppingAtom } from "../models/ToppingsContainer";
import CustomText from "../CustomText";
import { showFooterAtom } from "@/constants/constants";

const SelectedToppingPresenter = () => {
  const selectedTopping = useAtomValue(selectedToppingAtom);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const showFooter = useAtomValue(showFooterAtom);

  useEffect(() => {
    const animation = Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        useNativeDriver: true,
        duration: 500,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        useNativeDriver: true,
        duration: 500,
      }),
    ]);
    const loopAnim = Animated.loop(animation, {
      resetBeforeIteration: true,
      iterations: 2,
    });
    loopAnim.start();

    return () => {
      loopAnim.stop();
      animation.stop();
    };
  }, [fadeAnim, selectedTopping]);

  return (
    !showFooter && (
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <CustomText style={styles.text}>{selectedTopping}</CustomText>
      </Animated.View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    userSelect: "none",
    position: "absolute",
    top: "15%",
    width: "100%",
  },

  text: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 35,
    color: "white",
  },
});

export default SelectedToppingPresenter;
