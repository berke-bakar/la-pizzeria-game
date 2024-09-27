import {
  Animated,
  Easing,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import React, { useEffect, useRef } from "react";
import CustomText from "../CustomText";
import { useSetAtom } from "jotai";
import { overlayTextAtom } from "@/constants/constants";
import AnimatedButton from "./AnimatedButton";
import { moderateScale } from "../Scaling";
type Props = {};

const HowToPlay = (props: Props) => {
  const setOverlayText = useSetAtom(overlayTextAtom);

  const animRef = useRef(new Animated.Value(0.5)).current;

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
          gap: Platform.select({
            web: 0,
            native: 10,
          }),
        }}
      >
        <CustomText style={styles.header}>How To Play</CustomText>
        <ScrollView style={styles.scrollable}>
          <CustomText style={styles.info}>
            Welcome to La Pizzeria, a fun pizza cooking game where you will
            challenge yourself against time for customer satisfaction and pizza
            bucks for more exciting toppings you can use for your amazing
            pizzas.
            {"\n\n"}
            Each episode of the game is a new day where your customers arrive
            and order their pizza. You need to keep in mind what they ordered
            and prepare their pizza accordingly. If you follow customers wishes
            and create their dream pizza, they will be satisfied accordingly and
            you may get a tip. Using your earnings you can unlock toppings and
            other upgrades. However, if you wish to be an agent of chaos and
            create horrific pizzas beyond our mortal comprehension...go for it.
            You will make a lot of customers sad, of course, however they will
            still pay at least a fair amount. Keep in mind that sad customers
            usually don't return to place of their sadness and lost hope. This
            will result in running a lonely, customerless and slowly growing
            pizzeria in a fast manner.
          </CustomText>
        </ScrollView>
      </View>
      <AnimatedButton
        onPress={() => {
          setOverlayText((prev) => ({ ...prev, show: false }));
        }}
      >
        Close
      </AnimatedButton>
    </Animated.View>
  );
};

export default HowToPlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    padding: moderateScale(20),
    maxHeight: "70%",
    width: "60%",
    borderRadius: 8,
    backgroundColor: "#FF9800",
    userSelect: "none",
    gap: 10,
  },

  header: {
    color: "#B80000",
    fontSize: moderateScale(18),
    includeFontPadding: false,
  },

  scrollable: {
    maxWidth: "80%",
  },

  info: {
    color: "#820300",
    fontSize: Platform.select({
      web: 16,
      native: 12,
    }),
    includeFontPadding: false,
    alignSelf: "center",
  },
});
