import {
  GestureResponderEvent,
  Platform,
  StyleSheet,
  View,
} from "react-native";
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
      return !disabled
        ? (event: GestureResponderEvent) => {
            buyTopping(topping as IngredientType, toppingPrice);
          }
        : undefined;
    },
    [buyTopping, disabled]
  );

  const iconSize = Platform.select({
    web: 100,
    native: 50,
  });

  return (
    <View
      style={[
        styles.cardContainer,
        disabled ? styles.cardContainerDisabled : styles.cardContainerActive,
      ]}
    >
      <CustomText style={styles.cardText}>{title.toUpperCase()}</CustomText>
      <Icon
        height={iconSize}
        width={iconSize}
        style={{ maxHeight: 100, maxWidth: 100 }}
      />
      <CustomText style={styles.cardText}>${price}</CustomText>
      <AnimatedButton
        onPress={handleBuyClick(title, price)}
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
    // width: "12%",
  },

  cardContainerActive: {
    backgroundColor: "#d5660d",
  },

  cardContainerDisabled: {
    backgroundColor: "#a8a8a8",
  },

  cardText: {
    color: "white",
    // fontSize: 20,
    // fontSize: moderateScale(20),
    fontSize: Platform.select({
      web: 16,
      native: 12,
    }),
  },
});
