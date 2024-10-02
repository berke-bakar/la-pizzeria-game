import { useCallback, useMemo } from "react";
import {
  Animated,
  GestureResponderEvent,
  Pressable,
  PressableProps,
  StyleSheet,
} from "react-native";
import CustomText from "../CustomText";
import { moderateScale } from "../Scaling";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type AnimatedButtonProps = React.JSX.IntrinsicAttributes &
  React.JSX.IntrinsicClassAttributes<PressableProps> &
  Readonly<PressableProps> & { children: string; disabled?: boolean };

const AnimatedButton = ({
  disabled = false,
  ...props
}: AnimatedButtonProps) => {
  const scaleAnim = useMemo(() => new Animated.Value(1), []);

  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      const anim = Animated.timing(scaleAnim, {
        toValue: 1.3,
        useNativeDriver: true,
        easing: (val) => -4 * val * val + 4 * val,
        duration: 240,
      });
      anim.start((result) => {
        if (result.finished && props.onPress) {
          props.onPress(event);
        }
      });
    },
    [props.onPress, scaleAnim]
  );

  return (
    <AnimatedPressable
      style={[
        styles.button,
        { transform: [{ scale: scaleAnim }] },
        disabled ? styles.buttonDisabled : styles.buttonActive,
      ]}
      onPress={handlePress}
    >
      <CustomText
        style={{
          color: "white",
          userSelect: "none",
          includeFontPadding: false,
        }}
      >
        {props.children}
      </CustomText>
    </AnimatedPressable>
  );
};

export default AnimatedButton;

const styles = StyleSheet.create({
  button: {
    borderStyle: "dashed",
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(10),
    borderWidth: moderateScale(3),
    borderRadius: moderateScale(8),
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
