import { GestureResponderEvent, StyleSheet, View } from "react-native";
import React, { useCallback } from "react";
import CustomText from "./CustomText";
import { SvgProps } from "react-native-svg";
import AnimatedButton from "./UI/AnimatedButton";
import useGameStore from "@/hooks/useGameStore";
import { IngredientType } from "@/constants/constants";

type Props = {
  icon: React.FC<SvgProps>;
  disabled: boolean;
  price: number;
  title: string;
};

const StoreCard = ({ icon: Icon, disabled = false, price, title }: Props) => {
  const { buyTopping } = useGameStore();

  const handleBuyClick = useCallback(
    (topping: string, toppingPrice: number) => {
      return (event: GestureResponderEvent) => {
        buyTopping(topping as IngredientType, toppingPrice);
      };
    },
    [buyTopping]
  );

  return (
    <View
      style={[
        styles.cardContainer,
        disabled ? styles.cardContainerDisabled : styles.cardContainerActive,
      ]}
    >
      <CustomText style={styles.cardText}>{title.toUpperCase()}</CustomText>
      <Icon
        height={100}
        width={100}
        style={{ maxHeight: 100, maxWidth: 100 }}
      />
      <CustomText style={styles.cardText}>${price}</CustomText>
      <AnimatedButton
        onPress={!disabled ? handleBuyClick(title, price) : undefined}
        disabled={disabled}
      >
        {!disabled ? "BUY" : "BOUGHT"}
      </AnimatedButton>
    </View>
  );
};

export default StoreCard;

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    width: "12%",
  },

  cardContainerActive: {
    backgroundColor: "#d5660d",
  },

  cardContainerDisabled: {
    backgroundColor: "#a8a8a8",
  },

  cardText: {
    color: "white",
    fontSize: 20,
  },
});
