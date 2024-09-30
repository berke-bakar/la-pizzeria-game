import {
  Animated,
  Easing,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import React, { useEffect, useRef } from "react";
import CustomText from "../CustomText";
import { useSetAtom } from "jotai";
import {
  INGREDIENTS,
  IngredientType,
  overlayTextAtom,
} from "@/constants/constants";
import AnimatedButton from "./AnimatedButton";
import PizzaCoin from "./PizzaCoin";
import useGameStore from "@/hooks/useGameStore";
import StoreCard from "../StoreCard";
import { horizontalScale, moderateScale } from "../Scaling";
type Props = {};

const Store = (props: Props) => {
  const setOverlayText = useSetAtom(overlayTextAtom);
  const { wallet, boughtToppings } = useGameStore();
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
      <CustomText style={styles.header}>Store</CustomText>
      <SafeAreaView style={styles.pizzaCoinContainer}>
        <PizzaCoin height={moderateScale(35)} width={moderateScale(30)} />
        <CustomText style={styles.currencyText}>
          ${wallet.toFixed(1)}
        </CustomText>
      </SafeAreaView>
      <CustomText style={styles.info}>
        Surprise your customers with new delicious toppings...
      </CustomText>
      <ScrollView
        style={{
          width: "100%",
        }}
        contentContainerStyle={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: Platform.select({ web: 15, native: 10 }),
        }}
      >
        {Object.keys(INGREDIENTS).map((val) => {
          const Icon = INGREDIENTS[val as IngredientType].icon;
          const alreadyBought = boughtToppings[val as IngredientType];
          return (
            <StoreCard
              key={val}
              disabled={alreadyBought}
              icon={Icon}
              price={INGREDIENTS[val as IngredientType].price}
              title={val}
            />
          );
        })}
      </ScrollView>
      <View
        style={{
          alignSelf: "flex-end",
        }}
      >
        <AnimatedButton
          onPress={() => {
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
    maxHeight: "80%",
    width: "70%",
    borderRadius: 8,
    backgroundColor: "#FF9800",
    userSelect: "none",
    gap: 12,
  },

  header: {
    color: "#B80000",
    fontSize: moderateScale(18),
    textAlign: "center",
    includeFontPadding: false,
  },

  info: {
    color: "#820300",
    maxWidth: "65%",
    fontSize: Platform.select({
      web: 16,
      native: 12,
    }),
    includeFontPadding: false,
    alignSelf: "center",
  },

  pizzaCoinContainer: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    right: 15,
    top: 0,
  },

  currencyText: {
    fontSize: moderateScale(18),
    color: "white",
    userSelect: "none",
  },
});
