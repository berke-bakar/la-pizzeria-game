import { View, StyleSheet, Animated, Platform } from "react-native";
import React, { useEffect, useMemo } from "react";
import { progressAtom } from "@/constants/constants";
import { useAtomValue } from "jotai";

type Props = {};

const LoadingText = (props: Props) => {
  const { progress, active } = useAtomValue(progressAtom);
  // Initial value for opacity: 0
  const fadeAnim = useMemo(() => new Animated.Value(0), []);
  // Initial value for width: 0
  const progressAnim = useMemo(() => new Animated.Value(0), []);

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
    });
    loopAnim.start();

    return () => {
      loopAnim.stop();
      animation.stop();
    };
  }, [fadeAnim]);

  useEffect(() => {
    const prevAnim = Animated.timing(progressAnim, {
      toValue: progress,
      useNativeDriver: true,
      duration: 100,
    });
    prevAnim.start();

    return () => {
      prevAnim.stop();
    };
  }, [progress]);
  if (!active) return null;

  return (
    <View style={{ ...styles.loadingContainer }}>
      <Animated.Text
        style={{
          ...styles.loadingText,
          opacity: fadeAnim,
          fontFamily: Platform.select({
            android: "Bungee_400Regular",
            ios: "Bungee-Regular",
            web: "Bungee_400Regular",
          }),
          fontSize: Platform.select({
            native: 40,
            web: 50,
          }),
        }}
      >
        Loading...{progress.toFixed(0)}%
      </Animated.Text>
      <Animated.View
        style={{ ...styles.loadingProgressContainer, opacity: fadeAnim }}
      >
        <Animated.View
          style={{
            ...styles.loadingProgressIndicator,
            transform: [
              {
                scaleX: progressAnim.interpolate({
                  inputRange: [0, 100],
                  outputRange: [0, 1],
                }),
              },
            ],
          }}
        ></Animated.View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    position: "absolute",
    zIndex: 9999,
    backgroundColor: "rgba(244, 80, 30, 1)",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    gap: 10,
    opacity: 1,
  },

  loadingText: {
    color: "white",
  },

  loadingProgressContainer: {
    width: "50%",
    maxWidth: 500,
    height: 75,
    borderWidth: 10,
    borderColor: "white",
  },
  loadingProgressIndicator: {
    backgroundColor: "white",
    height: "100%",
    width: "100%",
    transformOrigin: "0% 50%",
  },
});

export default LoadingText;
