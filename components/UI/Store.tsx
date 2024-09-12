import {
  Animated,
  Easing,
  PointerEvent,
  Pressable,
  PressableProps,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import CustomText from "../CustomText";
import { useSetAtom } from "jotai";
import { INGREDIENTS, overlayTextAtom } from "@/constants/constants";
import AnimatedButton from "./AnimatedButton";
import PizzaCoin from "./PizzaCoin";
import useGameStore from "@/hooks/useGameStore";
type Props = {};

const Store = (props: Props) => {
  const setOverlayText = useSetAtom(overlayTextAtom);
  const { money } = useGameStore();
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
          // flex: 1,
          justifyContent: "flex-start",
          alignItems: "center",
          width: "100%",
        }}
      >
        <CustomText style={styles.header}>Store</CustomText>
        <View style={styles.pizzaCoinContainer}>
          <PizzaCoin height={"100%"} width={100} />
          <CustomText style={styles.currencyText}>{money}$</CustomText>
        </View>
        <CustomText style={styles.info}>
          Surprise your customers with new delicious toppings...
        </CustomText>
      </View>
      <View
        style={{
          flex: 1,
          // justifyContent: "center",
          alignItems: "center",
          width: "100%",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
        id="testing"
      >
        {Object.keys(INGREDIENTS).map((val) => {
          return <AnimatedButton key={val}>{val}</AnimatedButton>;
        })}
      </View>
      <View
        style={{
          alignSelf: "flex-end",
        }}
      >
        <AnimatedButton
          onPointerDown={() => {
            setOverlayText((prev) => ({ ...prev, show: false }));
          }}
        >
          Close
        </AnimatedButton>
      </View>
    </Animated.View>
  );
};

export default Store;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    maxHeight: "70%",
    width: "70%",
    borderRadius: 8,
    backgroundColor: "#FF9800",
    userSelect: "none",
  },

  header: {
    color: "#B80000",
    fontSize: 50,
    flex: 1,
    textAlign: "center",
  },

  info: {
    color: "#820300",
    maxWidth: "65%",
    // fontSize: 16,
  },
  pizzaCoinContainer: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
    right: 0,
    top: 0,
  },

  currencyText: {
    fontSize: 50,
    color: "white",
  },
});
