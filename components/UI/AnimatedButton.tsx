import { useRef } from "react";
import {
  Animated,
  PointerEvent,
  PressableProps,
  StyleSheet,
} from "react-native";
import CustomText from "../CustomText";

type AnimatedButtonProps = React.JSX.IntrinsicAttributes &
  React.JSX.IntrinsicClassAttributes<PressableProps> &
  Readonly<PressableProps> & { children: string; disabled?: boolean };

const AnimatedButton = ({
  disabled = false,
  ...props
}: AnimatedButtonProps) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleClick = (event: PointerEvent) => {
    const anim = Animated.timing(scaleAnim, {
      toValue: 1.3,
      useNativeDriver: true,
      easing: (val) => -4 * val * val + 4 * val,
      duration: 240,
    });
    anim.start((result) => {
      if (result.finished && props.onPointerDown) {
        props.onPointerDown(event);
      }
    });
  };

  return (
    <Animated.View
      style={[
        styles.button,
        { transform: [{ scale: scaleAnim }] },
        disabled ? styles.buttonDisabled : styles.buttonActive,
      ]}
      onPointerDown={handleClick}
    >
      <CustomText style={{ color: "white", userSelect: "none" }}>
        {props.children}
      </CustomText>
    </Animated.View>
  );
};

export default AnimatedButton;

const styles = StyleSheet.create({
  button: {
    borderStyle: "dashed",
    paddingHorizontal: 50,
    paddingVertical: 20,
    borderWidth: 8,
    borderRadius: 10,
    userSelect: "none",
  },

  buttonActive: {
    borderColor: "#f4511e",
    backgroundColor: "#820300",
    cursor: "pointer",
  },

  buttonDisabled: {
    borderColor: "#565656dc",
    backgroundColor: "#7d7d7d",
  },
});
