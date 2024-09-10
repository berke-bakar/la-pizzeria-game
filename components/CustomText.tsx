import { View, Text, Platform, TextProps } from "react-native";
import React from "react";

type Props = {};

const CustomText = (
  props: React.JSX.IntrinsicAttributes &
    React.JSX.IntrinsicClassAttributes<Text> &
    Readonly<TextProps>
) => {
  return (
    <Text
      {...props}
      style={[
        props.style,
        {
          fontFamily: Platform.select({
            android: "Bungee_400Regular",
            ios: "Bungee-Regular",
            web: "Bungee_400Regular",
          }),
        },
      ]}
    >
      {props.children}
    </Text>
  );
};

export default CustomText;
