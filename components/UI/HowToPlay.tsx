import {
  Animated,
  Easing,
  PointerEvent,
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import CustomText from "../CustomText";
import { useSetAtom } from "jotai";
import { overlayTextAtom } from "@/constants/constants";
import AnimatedButton from "./AnimatedButton";
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
        }}
      >
        <CustomText style={styles.header}>How To Play</CustomText>
        <CustomText style={styles.info}>
          Welcome to La Pizzeria, a fun pizza cooking game where you will
          challenge yourself against time for customer satisfaction and pizza
          bucks for more exciting toppings you can use for your amazing pizzas.
          {"\n\n"}
          Each episode of the game is a new day where your customers arrive and
          order their pizza. You need to keep in mind what they ordered and
          prepare their pizza accordingly. If you follow customers wishes and
          create their dream pizza, they will be satisfied accordingly and you
          may get a tip. Using your earnings you can unlock toppings and other
          upgrades. However, if you wish to be an agent of chaos and create
          horrific pizzas beyond our mortal comprehension...go for it. You will
          make a lot of customers sad, of course, however they will still pay at
          least a fair amount. Keep in mind that sad customers usually don't
          return to place of their sadness and lost hope. This will result in
          running a lonely, customerless and slowly growing pizzaria in a fast
          manner.
        </CustomText>
      </View>
      <AnimatedButton
        onPointerDown={() => {
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
    // fontSize: 16,
  },
});
